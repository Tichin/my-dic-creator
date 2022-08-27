import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Definition from '../definition/definition.component';
import { WordContext } from '../../contexts/word.context';
import './dictionary.styles.scss';

export default function Dictionary() {
  const { currentWord } = useContext(WordContext);
  const [meanings, setMeanings] = useState([]);
  let text = currentWord.text || '';

  useEffect(() => {
    const getDefinition = async () => {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`
      );

      if (response) {
        setMeanings([...response.data[0].meanings]);
        // meanings:[{…}, {…}]
      } else {
        console.alert('Word definition not in the dictionary');
      }
    };

    getDefinition();
  }, [text]);

  let renderDefinitions = 'loading...';

  if (meanings) {
    renderDefinitions = meanings.map((meaning) => {
      const partOfSpeech = meaning.partOfSpeech;
      return meaning.definitions.map((definitions, index) => (
        <li key={index}>
          <Definition
            partOfSpeech={partOfSpeech}
            definition={definitions.definition}
            example={definitions.example}
          />
        </li>
      ));
    });
  }
  return (
    <div className='definitions-container'>
      <ul>{renderDefinitions}</ul>
    </div>
  );
}
