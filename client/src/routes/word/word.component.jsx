import React, { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sentence from '../../components/sentence/sentence.component';
import Dictionary from '../../components/dictionary/dictionary.component';
import WordSaveForm from '../../components/word-save-form/word-save-form.component';
import { CartContext } from '../../contexts/cart.context';
import { WordContext } from '../../contexts/word.context';
import './word.styles.scss';

export default function Word() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cartItems } = useContext(CartContext);
  const { currentWord, setCurrentWord } = useContext(WordContext);

  useEffect(() => {
    const textDic = cartItems[id];
    setCurrentWord({ ...textDic });
  }, [cartItems, id]);

  return (
    <div>
      <div className='word-container'>
        {currentWord && (
          <div>
            <Sentence />
          </div>
        )}
      </div>
      <div className='word-detail-container'>
        <div className='dictionary-container'>
          <Dictionary />
        </div>
        <div>
          <WordSaveForm />
        </div>
      </div>
      <button onClick={() => navigate(-1)}>Go Back to Basket</button>
    </div>
  );
}
