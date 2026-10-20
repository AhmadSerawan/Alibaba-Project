import { useState } from "react";

// ONE place for the pricing rules, used by both CartViewComp and Checkout

export const TAX = 14; // flat tax added when there is at least one item

// Valid coupons (case-insensitive). type: "fixed" = $ off, "percent" = % off
export const COUPONS = {
  may26: { type: "fixed", value: 60 },
};

const STORAGE_KEY = "applied_coupon";

const normalize = (code) => String(code ?? "").trim().toLowerCase();

export const isValidCoupon = (code) =>
  Object.prototype.hasOwnProperty.call(COUPONS, normalize(code));

const readCoupon = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && isValidCoupon(saved) ? normalize(saved) : "";
  } catch {
    return "";
  }
};

export const unitPrice = (item) => Number(item?.price || item?.numericPrice || 0);
export const itemQty = (item) => Number(item?.qty || 1);

export const formatMoney = (value) => `$${Number(value || 0).toFixed(2)}`;

export const calculateTotals = (items, couponCode) => {
  const subtotal = items.reduce((sum, item) => sum + unitPrice(item) * itemQty(item), 0);

  const coupon = COUPONS[normalize(couponCode)];
  let discount = 0;
  if (coupon && items.length > 0) {
    discount = coupon.type === "percent" ? (subtotal * coupon.value) / 100 : coupon.value;
  }
  discount = Math.min(discount, subtotal);

  const tax = items.length > 0 ? TAX : 0;
  const total = Math.max(0, subtotal - discount + tax);

  return { subtotal, discount, tax, total };
};

// Applied coupon is remembered, so the cart and the checkout always agree
export const useCoupon = () => {
  const [code, setCode] = useState(readCoupon);

  const apply = (input) => {
    if (!isValidCoupon(input)) {
      return { ok: false, message: "Invalid coupon code." };
    }
    const normalized = normalize(input);
    try {
      localStorage.setItem(STORAGE_KEY, normalized);
    } catch {
      /* ignore */
    }
    setCode(normalized);
    return { ok: true, message: "Coupon applied." };
  };

  const remove = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setCode("");
  };

  return { code, apply, remove };
};
