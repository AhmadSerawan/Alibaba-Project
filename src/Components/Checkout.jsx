import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { ArrowClockwise } from "react-bootstrap-icons";
import { useCart } from "../Contexts/CartContext";
import syriatel from "../assets/imgs/syriatel.jpg";
import NavBarComp from "./NavBarComp";
const PaymentOption = ({ id, label, selected, onSelect, icon }) => (
  <button
    type="button"
    onClick={() => onSelect(id)}
    className={`checkout-payment-option ${icon ? "has-icon" : ""}`}
    aria-pressed={selected}
  >
    <span className="checkout-payment-label">
      {icon}
      <span>{label}</span>
    </span>
    <span
      className={`checkout-radio ${selected ? "selected" : ""}`}
      aria-hidden="true"
    />
  </button>
);

const SyriatelIcon = () => (
  <span className="checkout-provider-icon syriatel-icon" aria-hidden="true">
    <img src={syriatel} alt=""  className="syriatel-logo" />
  </span>
);

const MtnIcon = () => (
  <span className="checkout-provider-icon mtn-icon" aria-hidden="true">
    <span className="mtn-logo">MTN</span>
  </span>
);

const OrderItem = ({ title, subtitle, qty, price, img }) => (
  <div className="checkout-order-item">
    <div className="checkout-product-details">
      <img className="checkout-product-image" src={img} alt={title} />
      <div className="checkout-product-copy">
        <h3 className="checkout-product-title">{title}</h3>
        <p className="checkout-product-subtitle">
          {subtitle || "Special Backed Bread made in the oven"}
        </p>
      </div>
    </div>
    <div className="checkout-product-pricing">
      <span className="checkout-quantity">{qty}</span>
      <span className="checkout-item-price">
        {(Number(price) * Number(qty)).toFixed(0)} AED
      </span>
    </div>
  </div>
);

const SuccessModal = ({ show, onClose }) => (
  <Modal
    show={show}
    onHide={onClose}
    centered
    dialogClassName="checkout-success-dialog"
    contentClassName="checkout-success-content"
    aria-labelledby="payment-success-message"
  >
    <div className="checkout-success-header">
      <Button
        variant="link"
        className="checkout-modal-close"
        onClick={onClose}
        aria-label="Close success message"
      >
        ×
      </Button>
    </div>

    <div className="checkout-success-badge" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <polygon
          points="50,0 62,8 77,3 81,19 96,24 91,39 100,50 91,62 96,77 81,82 77,97 62,92 50,100 38,92 23,97 19,82 4,77 9,62 0,50 9,38 4,23 19,18 23,3 38,8"
          fill="#00e676"
        />
        <path
          d="M30 51 L43 64 L70 36"
          fill="none"
          stroke="#fff"
          strokeWidth="6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
      </svg>
    </div>

    <Modal.Body className="checkout-success-body">
      <p id="payment-success-message">
        you have successfully paid for your order
      </p>
      <div className="checkout-success-footer">
        <Button className="checkout-continue-button" onClick={onClose}>
          Continue
        </Button>
      </div>
    </Modal.Body>
  </Modal>
);

const WATCH_IMG =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80";

const fallbackItems = [1, 2, 3].map((id) => ({
  id,
  title: "Smart Watches",
  subtitle: "Special Backed Bread made in the oven",
  qty: 2,
  price: 300,
  img: WATCH_IMG,
}));

const formatMoney = (value) => (value === 0 ? "0" : value.toFixed(3));

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [selectedMethod, setSelectedMethod] = useState("cash");
  const [discountCode, setDiscountCode] = useState("5601");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);

  const itemsToDisplay =
    cartItems && cartItems.length > 0 ? cartItems : fallbackItems;

  const subtotal = itemsToDisplay.reduce(
    (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 0),
    0
  );
  const tax = 4;
  const netTotal = subtotal - discountAmount + tax;

  const handleCheckDiscount = (event) => {
    event.preventDefault();
    if (discountCode.trim() === "5601") {
      setDiscountAmount(0);
      setDiscountMessage("Discount code applied.");
    } else {
      setDiscountMessage("Invalid discount code.");
    }
  };

  return (
    <>
      <NavBarComp/>
      <main className="checkout-page">
        <Row className="g-0 checkout-layout">
          <Col xs={12} lg={6} className="checkout-payment-panel">
            <div className="checkout-payment-overlay" />
            <Container fluid className="checkout-payment-content">
              <div className="checkout-panel-heading">
                <h1>Payment Method</h1>
                <p>Pick your payment method</p>
              </div>

              <div className="checkout-payment-options">
                <PaymentOption
                  id="cash"
                  label="Cash"
                  selected={selectedMethod === "cash"}
                  onSelect={setSelectedMethod}
                />
                <PaymentOption
                  id="syriatel"
                  label="Syriatel"
                  selected={selectedMethod === "syriatel"}
                  onSelect={setSelectedMethod}
                  icon={<SyriatelIcon />}
                />
                <PaymentOption
                  id="mtn"
                  label="MTN"
                  selected={selectedMethod === "mtn"}
                  onSelect={setSelectedMethod}
                  icon={<MtnIcon />}
                />
              </div>

              <Form
                onSubmit={handleCheckDiscount}
                className="checkout-discount-form"
              >
                <Form.Label htmlFor="discount-code">Discount Code</Form.Label>
                <div className="checkout-discount-row">
                  <Form.Control
                    id="discount-code"
                    type="text"
                    value={discountCode}
                    onChange={(event) => {
                      setDiscountCode(event.target.value);
                      setDiscountMessage("");
                    }}
                    aria-label="Discount code"
                  />
                  <Button type="submit" className="checkout-check-button">
                    <ArrowClockwise aria-hidden="true" />
                    <span>Check</span>
                  </Button>
                </div>
                {discountMessage && (
                  <div className="checkout-discount-message" role="status">
                    {discountMessage}
                  </div>
                )}
              </Form>

              {isPaidSuccess && (
                <Button
                  variant="outline-light"
                  className="checkout-view-orders"
                  onClick={() => navigate("/orders")}
                >
                  View ordered Items
                </Button>
              )}
            </Container>
          </Col>

          <Col xs={12} lg={6} className="checkout-summary-panel">
            <div className="checkout-summary-inner">
              <div className="checkout-order-list">
                {itemsToDisplay.map((item, index) => (
                  <OrderItem
                    key={item.id ?? index}
                    title={item.title}
                    subtitle={item.subtitle}
                    qty={item.qty}
                    price={item.price}
                    img={item.img}
                  />
                ))}
              </div>

              <div className="checkout-totals">
                <div className="checkout-total-row">
                  <span>Total</span>
                  <span>{subtotal.toFixed(3)}</span>
                </div>
                <div className="checkout-total-row">
                  <span>Discount</span>
                  <span>{formatMoney(discountAmount)}</span>
                </div>
                <div className="checkout-total-row">
                  <span>Tax</span>
                  <span>{tax.toFixed(3)}</span>
                </div>
                <div className="checkout-net-total">
                  <span>Net Total</span>
                  <span>{netTotal.toFixed(3)}</span>
                </div>
              </div>

              <Button
                type="button"
                className="checkout-confirm-button"
                onClick={() => setIsPaidSuccess(true)}
              >
                Confirm Payment
              </Button>
            </div>
          </Col>
        </Row>
      </main>

      <SuccessModal
        show={isPaidSuccess}
        onClose={() => setIsPaidSuccess(false)}
      />
    </>
  );
};

export default Checkout;
