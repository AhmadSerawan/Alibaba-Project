import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

const INITIAL_CART_ITEMS = [
  {
    id: 1,
    title: "T-shirts with multiple colors, for men and lady",
    size: "medium",
    color: "blue",
    material: "Cotton",
    seller: "Artel Market",
    price: 78.99,
    qty: 1,
    img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    title: "Ergonomic Backpack - Urban Explorer",
    size: "large",
    color: "black",
    material: "Polyester",
    seller: "Best factory LLC",
    price: 39.0,
    qty: 2,
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60",
  },
];

const safeLocalStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      return null;
    }
    return null;
  },
  setItem: (key, value) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      // Ignore storage errors
    }
  },
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = safeLocalStorage.getItem("cartItems");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        return INITIAL_CART_ITEMS;
      }
    }
    return INITIAL_CART_ITEMS;
  });

  const [savedItems, setSavedItems] = useState(() => {
    const savedLater = safeLocalStorage.getItem("savedForLaterItems");
    if (savedLater) {
      try {
        return JSON.parse(savedLater);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    safeLocalStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    safeLocalStorage.setItem("savedForLaterItems", JSON.stringify(savedItems));
  }, [savedItems]);

  const handleQtyChange = (id, newQty) => {
    if (newQty <= 0) {
      handleRemove(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const handleIncreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const handleDecreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRemoveAll = () => {
    setCartItems([]);
  };

  const handleSaveForLater = (item) => {
    if (!item) return;

    // Remove from active cart if it exists there
    handleRemove(item.id);

    // Safely derive numerical price value
    const rawPrice = item.numericPrice ?? item.price;
    const numPrice = typeof rawPrice === "number" 
      ? rawPrice 
      : parseFloat(String(rawPrice || 0).replace(/[^0-9.-]+/g, "")) || 0;

    setSavedItems((prev) => {
      const exists = prev.some((s) => s.id === item.id);
      if (exists) return prev;

      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          price: `$${numPrice.toFixed(2)}`,
          numericPrice: numPrice,
          image: item.image || item.img,
          img: item.img || item.image,
        },
      ];
    });
  };

  const handleMoveToCart = (item) => {
    if (!item) return;

    // Remove from saved items list
    setSavedItems((prev) => prev.filter((s) => s.id !== item.id));

    // Safely derive numerical price value
    const rawPrice = item.numericPrice ?? item.price;
    const numPrice = typeof rawPrice === "number" 
      ? rawPrice 
      : parseFloat(String(rawPrice || 0).replace(/[^0-9.-]+/g, "")) || 0;

    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          title: item.title,
          size: item.size || "medium",
          color: item.color || "blue",
          material: item.material || "Cotton",
          seller: item.seller || "Artel Market",
          price: numPrice,
          numericPrice: numPrice,
          qty: 1,
          img: item.img || item.image,
          image: item.image || item.img,
        },
      ];
    });
  };

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedItems,
        totalItemCount,
        handleQtyChange,
        handleIncreaseQty,
        handleDecreaseQty,
        handleRemove,
        handleRemoveAll,
        handleSaveForLater,
        handleMoveToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};