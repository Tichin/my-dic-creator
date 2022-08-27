import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  //const  useParams
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToBasketHandler = () => {
    navigate('basket');
  };

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {Object.values(cartItems).map((textDic) => {
          const { text, paragraph, sentence, id } = textDic;
          const lastIndex = paragraph.length - 1;
          const lastTwoIndex = paragraph.length - 2;
          const lastChar = paragraph[lastIndex];
          const lastTwoChar = paragraph[lastTwoIndex];
          const p = lastTwoChar === '0' ? lastChar : lastTwoChar + lastChar;
          const marker = `p${p}-s${sentence}`;
          return (
            <div key={id}>
              {text}--{marker}
            </div>
          );
        })}
      </div>
      <button onClick={goToBasketHandler}>Go To Baskit</button>
    </div>
  );
};

export default CartDropdown;
