import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import './cart-item.styles.scss';

const CartItem = ({ cartItem }) => {
  const { text, id, definition } = cartItem;
  const PATHTOWORD = `${id}`;
  const { removeItemFromCart } = useContext(CartContext);
  const onRemoveClick = () => {
    removeItemFromCart(cartItem);
  };
  return (
    <div className='cart-item-container'>
      <Link className='text' to={PATHTOWORD}>
        <span>{text}</span>
      </Link>
      <div className='item-details'>
        <span className='name'>{text}</span>
        <span className='price'>{definition || 'definition'}</span>
      </div>
      <button onClick={onRemoveClick}>Remove from Basket</button>
    </div>
  );
};

export default CartItem;
