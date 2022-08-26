import './cart-item.styles.scss';
//import stickynote from '../../assets/stickynote1.png';
import { Link } from 'react-router-dom';

const CartItem = ({ cartItem }) => {
  const { text, id } = cartItem;
  return (
    <div className='cart-item-container'>
      <Link className='text' to={`${id}`}>
        <span>{text}</span>
      </Link>
      <div className='item-details'>
        <span className='name'>{text}</span>
        <span className='price'>definition</span>
      </div>
    </div>
  );
};

export default CartItem;
