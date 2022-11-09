import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import { WordContext } from "../../contexts/word.context";
import "./word-save-form1.styles.scss";

const defaultFormFields = {
  verb: "",
  singular: "",
  phrasal: "",
  text: "",
  partOfSpeech: "",
  pastTense: "",
  pastParticiple: "",
  plural: "",
  definition: "",
  example: "", // from dictionanry
};

export default function WordSaveForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { currentWord } = useContext(WordContext);
  const { updateItemToCart } = useContext(CartContext);
  const navigate = useNavigate();
  useEffect(() => {
    setFormFields({ ...formFields, ...currentWord });
  }, [currentWord]);

  const {
    verb,
    singular,
    phrasal,
    text,
    partOfSpeech,
    pastTense,
    pastParticiple,
    plural,
    definition,
    example,
  } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    updateItemToCart({ ...formFields });
    resetFormFields();
    alert("save to basket successfully!");
    navigate(-1);
  };

  return (
    <div className="container">
      <form onSubmit={onFormSubmit}>
        <ul className="flex-outer">
          <li>
            <label>Text</label>
            <input
              type="text"
              onChange={handleChange}
              value={text}
              name="text"
            ></input>
          </li>
          <li>
            <label>Verb</label>
            <input
              type="text"
              onChange={handleChange}
              value={verb}
              name="verb"
            ></input>
          </li>
          <li>
            <label>Singular</label>
            <input
              type="text"
              onChange={handleChange}
              value={singular}
              name="singular"
            ></input>
          </li>
          <li>
            <label>Phrasal</label>
            <input
              type="text"
              onChange={handleChange}
              value={phrasal}
              name="phrasal"
            ></input>
          </li>
          <li>
            <label>Part Of Speech</label>
            <input
              type="text"
              onChange={handleChange}
              value={partOfSpeech}
              name="partOfSpeech"
            ></input>
          </li>
          <li>
            <label>Past Tense</label>
            <input
              type="text"
              onChange={handleChange}
              value={pastTense}
              name="pastTense"
            ></input>
          </li>
          <li>
            <label>Past Participle</label>
            <input
              type="text"
              onChange={handleChange}
              value={pastParticiple}
              name="pastParticiple"
            />
          </li>
          <li>
            <label>Plural</label>
            <input
              type="text"
              onChange={handleChange}
              name="plural"
              value={plural}
            />
          </li>
          <li>
            <label>Definition</label>
            <textarea
              type="text"
              onChange={handleChange}
              name="definition"
              value={definition}
            />
          </li>
          <li>
            <label>Example</label>
            <textarea
              rows="4"
              cols="200"
              onChange={handleChange}
              name="example"
              value={example}
            >
              exmaples...
            </textarea>
          </li>
          <li>
            <button type="submit">Save to Basket</button>
          </li>
        </ul>
      </form>
      <button onClick={resetFormFields}>Reset</button>
    </div>
  );
}
