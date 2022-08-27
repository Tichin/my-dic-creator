import React, { useContext } from 'react';
import { WordContext } from '../../contexts/word.context';
import './definition.styles.scss';

const Definition = ({ partOfSpeech, definition, example }) => {
  const { currentWord, setCurrentWord } = useContext(WordContext);
  const onPassToFormClick = () => {
    setCurrentWord({ ...currentWord, partOfSpeech, definition, example });
  };
  // await updateDocument(collectionKey, docRef, definition);
  // updateCardToBox({ ...currentWord.word, definition: props.definition });

  // textDic/currentWord:{
  // bookTitle: "AnneOfGreenGables"
  // chapter: "chapter01"
  // collectionKey: "AnneOfGreenGables-ch01-p31"
  // definition: ""
  // docRef: "074-latter-p31-ch01-AnneOfGreenGables"
  // id: "AnneOfGreenGables-chapter01-paragraph31-074-latter"
  // paragraph: "paragraph31"
  // sentenceExample: ""
  // text: "latter" }

  return (
    <div className='cards-container'>
      <div className='card-container'>
        <h5>
          ({partOfSpeech}) {definition}
        </h5>
        <p>{example}</p>

        <button className='saveToDic' onClick={onPassToFormClick}>
          Pass To Form
        </button>
      </div>
    </div>
  );
};

export default Definition;
