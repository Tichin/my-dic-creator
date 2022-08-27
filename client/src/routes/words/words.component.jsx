import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../../components/cart-item/cart-item.component';
import './words.styles.scss';

export default function Words() {
  const { cartItems } = useContext(CartContext);
  const { book_title, chapter } = useParams();
  const PATHTOEDIT = `/${book_title}/${chapter}/edit`;
  const PATHTOSLIDE = `/${book_title}/${chapter}/slides`;

  const renderWords = Object.values(cartItems).map((textDic) => {
    return <CartItem key={textDic.id} cartItem={textDic} />;
  });
  return (
    <div>
      <ul>
        <li>
          <Link to={PATHTOEDIT}>TO EDIT </Link>
        </li>
        <li>
          <Link to={PATHTOSLIDE}>TO SLIDES</Link>
        </li>
      </ul>

      {renderWords}
    </div>
  );
}
