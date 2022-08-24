import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './slides.styles.scss';

export default function Slides() {
  const { book_title, chapter } = useParams();
  const [sentenceObjectList, setSentenceObjectList] = useState([]);
  const [pointerIndex, setPointerIndex] = useState(0);
  const UNDERSCORE = '_';
  const NOSPACE = '';
  const bookTitle = book_title.split(UNDERSCORE).join(NOSPACE);

  useEffect(() => {
    axios //api/AnneOfGreenGables/:chapter/slides
      .get(`http://localhost:5001/api/${bookTitle}/${chapter}/slides`)
      .then((response) => {
        setSentenceObjectList(response.data.sentenceObjectList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookTitle, chapter]);

  const goToPre = () => {
    setPointerIndex(pointerIndex - 1);
  };

  const goToNext = () => {
    setPointerIndex(pointerIndex + 1);
  };

  const handleKeyDown = (e) => {
    const arrayLength = sentenceObjectList.length;
    const LAST = arrayLength - 1;

    if (e.keyCode === 37) {
      // keyleft: e.keyCode === 37
      const isFirstSlide = pointerIndex === 0 ? true : false;
      const newPointerIndex = isFirstSlide ? LAST : pointerIndex - 1;
      setPointerIndex(newPointerIndex);
    } else if (e.keyCode === 39) {
      // keyright: e.keyCode === 39
      const isLastSlide = pointerIndex === arrayLength - 1 ? true : false;
      const newPointerIndex = isLastSlide ? 0 : pointerIndex + 1;
      setPointerIndex(newPointerIndex);
    }
  };

  const renderSentenceAndDefinition = sentenceObjectList.map(
    (sentenceObject, sentenceIndex) => {
      // sentenceObject: {'p1-s1':[{textDic},{textDic}...]}
      const sentenceObjectKey = Object.keys(sentenceObject)[0]; //'p1-s1'
      const sentenceObjectValues = Object.values(sentenceObject)[0]; // [{textDic},{textDic}...]
      return (
        <div key={sentenceObjectKey}>
          <div className='sentence-container'>
            <SentenceComponent
              textDicArray={sentenceObjectValues}
              sentenceMarker={sentenceObjectKey}
              sentenceIndex={sentenceIndex}
              pointerIndex={pointerIndex}
            />
          </div>
          <div className='definition-container'>
            {' '}
            <DefinitionComponent
              textDicArray={sentenceObjectValues}
              sentenceIndex={sentenceIndex}
              pointerIndex={pointerIndex}
            />
          </div>
        </div>
      );
    }
  );

  return (
    <div className='slide-container'>
      <div>{renderSentenceAndDefinition}</div>

      <div className='button-container'>
        <button onClick={goToPre} onKeyDown={handleKeyDown}>
          pre
        </button>
        <button onClick={goToNext} onKeyDown={handleKeyDown}>
          next
        </button>
      </div>
      <div className='left-lower-corner'>
        {' '}
        <Link to={`/${book_title}/${chapter}/edit`}>BACK TO EDIT</Link>
      </div>
    </div>
  );
}

const SentenceComponent = (props) => {
  let { textDicArray, sentenceIndex, pointerIndex, sentenceMarker } = props;

  const renderSentence = textDicArray.map((textDic) => {
    const hasDefinition = textDic.definition ? true : false;
    const isSeparator = textDic.isSeparator;
    let className = hasDefinition ? 'pink' : '';
    className += isSeparator ? 'separator-span' : '';

    return (
      <span key={textDic.id} className={className}>
        {textDic.text}
      </span>
    );
  });

  return (
    <div
      className={pointerIndex === sentenceIndex ? 'active' : 'hidden'}
      tabIndex={0}
    >
      <p className='indent'>{renderSentence}</p>
      <br />
      <br />
      <span className='right-lower-corner'>{sentenceMarker}</span>
    </div>
  );
};

const DefinitionComponent = (props) => {
  let { textDicArray, sentenceIndex, pointerIndex } = props;

  const renderDefinition = textDicArray.map((textDic) => {
    const hasDefinition = textDic.definition ? true : false;

    return hasDefinition ? (
      <div key={textDic.id}>
        <span className='capitalize underline'>{textDic.text}</span> :{' '}
        {textDic.definition}
      </div>
    ) : null;
  });

  return (
    <div className={sentenceIndex === pointerIndex ? 'active' : 'hidden'}>
      {renderDefinition}
    </div>
  );
};
