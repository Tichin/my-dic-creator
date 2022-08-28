import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { WordContext } from '../../contexts/word.context';
import './sentence.styles.scss';

export default function Sentence() {
  const { book_title, chapter } = useParams();
  const [sentenceObjectList, setSentenceObjectList] = useState([]);
  const UNDERSCORE = '_';
  const NOSPACE = '';
  const bookTitle = book_title.split(UNDERSCORE).join(NOSPACE);
  const { currentWord } = useContext(WordContext);
  const { paragraph, sentence } = currentWord;
  const pNumber = Number(paragraph?.slice(-2));
  const sentenceMarker = `p${pNumber}-s${sentence}`;

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

  const renderSentence = sentenceObjectList.map((sentenceObject) => {
    // sentenceObject: {'p1-s1':[{textDic},{textDic}...]}
    const sentenceObjectKey = Object.keys(sentenceObject)[0]; //'p1-s1'
    const sentenceObjectValues = Object.values(sentenceObject)[0]; // [{textDic},{textDic}...]

    if (sentenceObjectKey === sentenceMarker) {
      return (
        <div key={sentenceObjectKey}>
          <SentenceComponent
            textDicArray={sentenceObjectValues}
            currentWord={currentWord}
          />
        </div>
      );
    }
  });

  return (
    <div>
      <div className='word'>{currentWord.text}</div>
      <div>{renderSentence}</div>
    </div>
  );
}

const SentenceComponent = (props) => {
  const { textDicArray, currentWord } = props;
  const { id } = currentWord;

  const renderSentence = textDicArray.map((textDic) => {
    const isSeparator = textDic.isSeparator;
    let className = textDic.id === id ? 'bg-pink' : '';
    className += isSeparator ? 'separator-span' : '';

    return (
      <span key={textDic.id} className={className}>
        {textDic.text}
      </span>
    );
  });

  return (
    <div>
      <p className='indent'>{renderSentence}</p>
    </div>
  );
};
