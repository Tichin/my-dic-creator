import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../contexts/cart.context';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import './edit.styles.scss';

export default function Edit() {
  const { book_title, chapter } = useParams();
  const [paragraphObjectList, setParagraphObjectList] = useState([]);
  const [subtitle, setSubtitle] = useState('');
  const chapterSlidesPath = `/${book_title}/${chapter}/slides`;
  const UNDERSCORE = '_';
  const NOSPACE = '';
  const bookTitle = book_title.split(UNDERSCORE).join(NOSPACE);
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

  // paragraphObjectList: [{'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...},{'p2-s1':{sentence},'p2-s2':{sentenceDic}...}]
  // paragraphObject: {'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...}

  const renderParagraph = paragraphObjectList.map((paragraphObject, index) => {
    const pIndex = index + 1;
    const paragraphMarker = `paragraph-${pIndex}`;
    return (
      <div className='paragraph-container' key={index}>
        <span className='sub'>{paragraphMarker}</span>
        <p className='indent'>
          <Paragraph paragraphObject={paragraphObject} pIndex={pIndex} />
        </p>
      </div>
    );
  });

  return (
    <div className='page-container'>
      <div className='chapter-container'>
        <div className='subtitle-container'>{subtitle}</div>
        <div>{renderParagraph}</div>
      </div>
      <Link to={chapterSlidesPath}>Show Slides</Link>
      <Link to='/'>Previous Chapter</Link>
      <Link to='/'>Next Chapter</Link>
      <a>update pages</a>
      <CartIcon />
    </div>
  );
}

const Paragraph = (props) => {
  // paragraphObject: {'p1-s1':{sentenceDic},'p1-s2':{sentenceDic}...}
  const { paragraphObject, pIndex } = props;
  const { addItemToCart, cartItems } = useContext(CartContext);

  const onTextDoubleClick = (textDic) => {
    const { isSeparator } = textDic;

    if (!isSeparator) {
      addItemToCart({
        ...textDic,
      });
    }
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
            className={className}
            onDoubleClick={() => onTextDoubleClick(textDic)}
          >
            {textDic.text}
          </span>
          {textDic.end && <sub className='sub'>{sentenceMarker} </sub>}
        </Fragment>
      );
    });
  });

  return <Fragment>{renderParagraphTextDic}</Fragment>;
};
