import { Fragment, useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount, clearItemFromCart } =
    useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  const onClearClick = () => {
    clearItemFromCart();
  };

  return (
    // <div className='cart-icon-container' onClick={toggleIsCartOpen}>
    //   <ShoppingIcon className='shopping-icon' />
    //   <span className='item-count'>{cartCount}</span>
    // </div>
    // css 需要修改２０２２/8/25
    <div className='cart-icon-container'>
      <Fragment>
        <ShoppingIcon className='shopping-icon' onClick={toggleIsCartOpen} />
        <span className='item-count'>{cartCount}</span>
      </Fragment>
      <button onClick={onClearClick}>clear the cart</button>
    </div>
  );
};

export default CartIcon;
