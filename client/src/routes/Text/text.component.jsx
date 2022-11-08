import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../contexts/cart.context";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import "./text.styles.scss";

export default function Text() {
  const { book_title, chapter } = useParams();
  const { addItemToCart, cartItems, isCartOpen, cartCount } =
    useContext(CartContext);
  const [paragraphObjectList, setParagraphObjectList] = useState([]);
  // const PATHTOSLIDES = `/${book_title}/${chapter}/slides`;
  // const PATHTOFLASHCARD = `/${book_title}/${chapter}/flashcards`;
  const UNDERSCORE = "_";
  const NOSPACE = "";
  const bookTitle = book_title.split(UNDERSCORE).join(NOSPACE);
  const Zero = cartCount === 0 ? true : false;
  // function to chapter++
  // re-render only after chapter changed or ask for re-fresh
  // to avoid to many rerenders
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/${bookTitle}/${chapter}/edit`)
      .then((response) => {
        setParagraphObjectList(response.data.paragraphObjectList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookTitle, chapter]);

  useEffect(() => {}, [Zero]);

  // paragraphObjectList: [{'1':{sentenceDic},'2':{sentenceDic}...},{'1':{sentence},'2':{sentenceDic}...}]
  // paragraphObject: {'1':{sentenceDic},'2':{sentenceDic}...}

  const renderParagraph = paragraphObjectList.map((paragraphObject, index) => {
    const pIndex = index + 1;
    const paragraphMarker = `paragraph-${pIndex}`;
    return (
      <div className="paragraph-container" key={index}>
        <span className="sub">{paragraphMarker}</span>
        <p className="indent">
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
    <div className="page-container">
      <div className="chapter-container">
        <div className="GoToButton subtitle-container">
          <Link to={`/${book_title}/${chapter}`}>Go to Read</Link>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "6vw",
            textAlign: "center",
            marginTop: "2vh",
          }}
        >
          <div
            style={{
              backgroundColor: "lightblue",
              marginBottom: "1vh",
            }}
          >
            Had definition
          </div>
          <div style={{ backgroundColor: "pink" }}>In the baskit</div>
        </div>
        <div>{renderParagraph}</div>
      </div>
      <CartIcon /> {isCartOpen && <CartDropdown />}
    </div>
  );
}
//*************************Paragraph component****************************/
const Paragraph = (props) => {
  // paragraphObject: {'1':{sentenceDic},'2':{sentenceDic}...}
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

      let className = "";

      if (cartItems[id]) {
        className += " bg-lightpink";
      }

      if (definition) {
        className += " bg-lightblue";
      }

      return (
        <Fragment key={keyIndex}>
          <span
            className={`${className}  tooltip`}
            onClick={() => onTextClick(textDic)}
            onMouseOver={() => onWordMouseOver()}
          >
            {textDic.text}
            {hover && (
              <span className="tooltiptextEdit tooltiptextEdit-container">
                <span className="definition">
                  {" "}
                  {definition ? definition : "No Definition Yet"}
                </span>
                <span>
                  <button className="editButton">add to cart</button>
                  <button
                    className="editButton"
                    onClick={() => onTextClick(textDic)}
                  >
                    edit
                  </button>
                </span>
              </span>
            )}
          </span>
          {textDic.end && <sub className="sub">{sentenceMarker} </sub>}
        </Fragment>
      );
    });
  });

  return <Fragment>{renderParagraphTextDic}</Fragment>;
};
