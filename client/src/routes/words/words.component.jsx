import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../../components/cart-item/cart-item.component';
import './words.styles.scss';

export default function Words() {
  const { cartItems } = useContext(CartContext);

  const renderWords = Object.values(cartItems).map((textDic) => {
    return <CartItem key={textDic.id} cartItem={textDic} />;
  });
  return <div>{renderWords}</div>;
}
