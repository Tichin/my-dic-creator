import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';

import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const { book_title } = useParams();
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [vocCount, setVocCount] = useState(0);
  const UNDERSCORE = '_';
  const NOSPACE = '';
  const bookTitleFromParam = book_title.split(UNDERSCORE).join(NOSPACE);

  useEffect(() => {
    let count = 0;

    Object.values(cartItems).forEach((textDic) => {
      if (textDic.bookTitle === bookTitleFromParam) count = count + 1;
    });

    setVocCount(count);
  }, [vocCount]);

  const goToBasketHandler = () => {
    navigate('basket');
  };

  const renderCartItems = Object.values(cartItems).map((textDic) => {
    const { text, paragraph, sentence, id, bookTitle } = textDic;
    const lastIndex = paragraph.length - 1;
    const lastTwoIndex = paragraph.length - 2;
    const lastChar = paragraph[lastIndex];
    const lastTwoChar = paragraph[lastTwoIndex];
    const p = lastTwoChar === '0' ? lastChar : lastTwoChar + lastChar;
    const marker = `p${p}-s${sentence}`;
    return bookTitle === bookTitleFromParam ? (
      <li className='basket-list' key={id}>
        {text}--{marker}
      </li>
    ) : null;
  });

  return (
    <div className='cart-dropdown-container'>
      <ul className='cart-items'>{renderCartItems}</ul>
      <h3>{vocCount}</h3>
      <button onClick={goToBasketHandler}>Go To Baskit</button>
    </div>
  );
};

export default CartDropdown;
