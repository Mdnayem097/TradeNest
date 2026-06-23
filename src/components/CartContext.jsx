"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client"; // Your project's auth client

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  
  // Fetch current logged-in user session
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id; // Unique ID for each user

  // 1. Load user-specific cart from localStorage when the userId changes
  useEffect(() => {
    if (userId) {
      // Dynamic key configuration (e.g., cart_user123ab)
      const userSpecificCartKey = `cart_${userId}`;
      const storedCart = localStorage.getItem(userSpecificCartKey);

      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      } else {
        setCartItems([]);
      }
    } else {
      // Fallback to standard 'cart' key for guest users (not logged in)
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      } else {
        setCartItems([]);
      }
    }
  }, [userId]);

  // 2. Save cart items to the specific user key whenever cartItems or userId changes
  useEffect(() => {
    if (userId) {
      const userSpecificCartKey = `cart_${userId}`;
      localStorage.setItem(userSpecificCartKey, JSON.stringify(cartItems));
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item._id === product._id);

    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);