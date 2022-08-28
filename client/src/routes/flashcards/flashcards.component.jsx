import React from 'react';
import './flashcards.styles.scss';
import getCh01CollectionKeys from '../../utils/firebase/AnneOfGreenGables.firebase';
import { getWordDocuments } from '../../utils/firebase/firebase.utils';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Flashcards() {
  const [textDicList, setTextDicList] = useState([]);
  const [pointerIndex, setPointerIndex] = useState(0);

  useEffect(() => {
    const doclist = async () => {
      const docs = await getWordDocuments('AnneOfGreenGables-ch01-p01');
      setTextDicList(docs);
    };

    doclist();
  }, []);

  const goToPre = () => {
    setPointerIndex(pointerIndex - 1);
  };

  const goToNext = () => {
    setPointerIndex(pointerIndex + 1);
  };

  const handleKeyDown = (e) => {
    const arrayLength = textDicList.length;
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

  const doclist = textDicList.map((textDic, flashCardIndex) => (
    <div className={pointerIndex === flashCardIndex ? 'active' : 'hidden'}>
      {' '}
      <FlashCard key={textDic.id} textDic={textDic} />
    </div>
  ));
  return (
    <div>
      {doclist}
      <div className='button-container'>
        <button onClick={goToPre} onKeyDown={handleKeyDown}>
          pre
        </button>
        <button onClick={goToNext} onKeyDown={handleKeyDown}>
          next
        </button>
      </div>
    </div>
  );
}

const FlashCard = ({ textDic }) => {
  const { text, partOfSpeech, definition, example } = textDic;
  return (
    <div>
      <div>{text}</div>
      <div>
        {partOfSpeech}
        {definition}
      </div>
      <div></div>
      {example}
    </div>
  );
};
