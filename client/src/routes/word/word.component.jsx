import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sentence from "../../components/sentence/sentence.component";
import Dictionary from "../../components/dictionary/dictionary.component";
import WordSaveForm from "../../components/word-save-form/word-save-form.component";
import { CartContext } from "../../contexts/cart.context";
import { WordContext } from "../../contexts/word.context";
import "./word.styles.scss";
import axios from "axios";

export default function Word() {
  const { id, book_title, chapter } = useParams();
  const { cartItems } = useContext(CartContext);
  const { currentWord, setCurrentWord } = useContext(WordContext);
  const [meanings, setMeanings] = useState([]);
  const PATHTOBASKET = `/${book_title}/${chapter}/edit/basket`;
  const textDic = cartItems[id];

  useEffect(() => {
    setCurrentWord({ ...textDic });
  }, [textDic.id]);

  useEffect(() => {
    const getDefinition = async () => {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${textDic.text}`
      );

      if (response) {
        setMeanings([...response.data[0].meanings]);
        // meanings:[{…}, {…}]
      } else {
        console.alert("Word definition not in the dictionary");
      }
    };

    getDefinition();
  }, [textDic.text]);

  return (
    <div>
      <div className="word-container">
        {currentWord && (
          <div>
            <Sentence />
          </div>
        )}
        <Link to={PATHTOBASKET}>
          <span
            style={{
              border: "1px solid gray",
              display: "inline-block",
              borderRadius: "10px",
              marginLeft: "10px",
              padding: "5px",
            }}
          >
            Go Back to Basket
          </span>
        </Link>
      </div>

      <div className="word-detail-container">
        <div className="dictionary-container">
          <Dictionary meanings={meanings} />
        </div>
        <div className="word-form-container">
          <WordSaveForm />
        </div>
      </div>
    </div>
  );
}
