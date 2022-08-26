import React, { createContext, useState, useEffect } from 'react';

export const addCartItem = (cartItems, itemToAdd) => {
  // cartItems { id:{textDic}, id:{textDic}...}

  const itemId = itemToAdd.id;

  if (!cartItems[itemId]) {
    cartItems[itemId] = itemToAdd;
    return { ...cartItems };
  }

  return cartItems;
};
export const removeCartItem = (cartItems, itemToRemove) => {
  const itemId = itemToRemove.id;

  if (!cartItems[itemId]) {
    return cartItems;
  }

  delete cartItems[itemId];

  return { ...cartItems };
};

export const updateCartItem = (cartItems, itemToUpdate) => {
  const itemId = itemToUpdate.id;
  if (!cartItems[itemId]) {
    return cartItems;
  }

  cartItems[itemId] = itemToUpdate;
  return { ...cartItems };
};

export const CartContext = createContext({
  cartItems: {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  updateItemToCart: () => {},
  clearItemFromCart: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
});

const getInitialItemState = () => {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : {};
};

export const CartProvider = ({ children }) => {
  // isOpen needed??
  const [cartItems, setCartItems] = useState(getInitialItemState());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const addItemToCart = (item) => setCartItems(addCartItem(cartItems, item));
  const removeItemFromCart = (item) =>
    setCartItems(removeCartItem(cartItems, item));
  const updateItemToCart = (item) =>
    setCartItems(updateCartItem(cartItems, item));
  const clearItemFromCart = () => {
    setCartItems({});
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateItemToCart,
    clearItemFromCart,
    cartCount,
  };

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setCartCount(Object.keys(cartItems).length);
  }, [cartItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
