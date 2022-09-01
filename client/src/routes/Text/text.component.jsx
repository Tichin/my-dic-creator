import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../contexts/cart.context';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import './text.styles.scss';

export default function Text() {
  const { book_title, chapter } = useParams();
  const { addItemToCart, cartItems, isCartOpen, cartCount } =
    useContext(CartContext);
  const [paragraphObjectList, setParagraphObjectList] = useState([]);
  const [subtitle, setSubtitle] = useState('');
  const PATHTOSLIDES = `/${book_title}/${chapter}/slides`;
  const PATHTOFLASHCARD = `/${book_title}/${chapter}/flashcards`;
  const UNDERSCORE = '_';
  const NOSPACE = '';
  const bookTitle = book_title.split(UNDERSCORE).join(NOSPACE);
  const Zero = cartCount === 0 ? true : false;
  // function to chapter++
  // re-render only after chapter changed or ask for re-fresh
  // to avoid to many rerenders
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/${bookTitle}/${chapter}/edit`)
      .then((response) => {
        const { subtitle, paragraphObjectList } = response.data;
        setParagraphObjectList(paragraphObjectList);
        setSubtitle(subtitle);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookTitle, chapter]);

  useEffect(() => {}, [Zero]);

  // paragraphObjectList: [{'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...},{'p2-s1':{sentence},'p2-s2':{sentenceDic}...}]
  // paragraphObject: {'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...}

  const renderParagraph = paragraphObjectList.map((paragraphObject, index) => {
    const pIndex = index + 1;
    const paragraphMarker = `paragraph-${pIndex}`;
    return (
      <div className='paragraph-container' key={index}>
        <span className='sub'>{paragraphMarker}</span>
        <p className='indent'>
          <Paragraph
            paragraphObject={paragraphObject}
            pIndex={pIndex}
            addItemToCart={addItemToCart}
            cartItems={cartItems}
          />
        </p>
      </div>
    );
  });

  return (
    <div className='page-container'>
      <Link to={PATHTOSLIDES}>Show Slides</Link>
      <Link to={PATHTOFLASHCARD}>Show Flashcards</Link>
      <div className='chapter-container'>
        <div className='subtitle-container'>{subtitle}</div>
        <div>{renderParagraph}</div>
      </div>
      <Link to='/'>Previous Chapter</Link>
      <Link to='/'>Next Chapter</Link>
      <a>update pages</a>
      <CartIcon />
      {isCartOpen && <CartDropdown />}
    </div>
  );
}

const Paragraph = (props) => {
  // paragraphObject: {'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...}
  const { paragraphObject, pIndex, addItemToCart, cartItems } = props;
  const [hover, setHover] = useState(false);

  const onTextClick = (textDic) => {
    const { isSeparator } = textDic;

    if (!isSeparator) {
      addItemToCart({
        ...textDic,
      });
    }
  };

  const onWordMouseOver = () => {
    setHover(true);
  };

  const sentenceDicArray = Object.values(paragraphObject); //[{sentenceDic},{sentenceDic}]
  const renderParagraphTextDic = sentenceDicArray.map((sentenceDic, index) => {
    const sIndex = index + 1;

    return Object.values(sentenceDic).map((textDic, keyIndex) => {
      const sentenceMarker = `p${pIndex}-s${sIndex}`;
      const { id } = textDic;
      let { definition } = textDic;

      let className = '';

      if (cartItems[id]) {
        className += ' bg-lightpink';
      }

      if (definition) {
        className += ' bg-lightblue';
      }

      return (
        <Fragment key={keyIndex}>
          <span
            className={`${className}  tooltip`}
            onClick={() => onTextClick(textDic)}
            onMouseOver={() => onWordMouseOver()}
          >
            {textDic.text}
            {hover && definition && (
              <span className='tooltiptext'>{definition}</span>
            )}
          </span>
          {textDic.end && <sub className='sub'>{sentenceMarker} </sub>}
        </Fragment>
      );
    });
  });

  return <Fragment>{renderParagraphTextDic}</Fragment>;
};
