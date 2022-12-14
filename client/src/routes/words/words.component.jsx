import React, { useContext } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../../components/cart-item/cart-item.component";
// import { addCollectionAndDocuments } from "../../utils/firebase/firebase.utils";
import "./words.styles.scss";

export default function Words() {
  const { cartItems, setIsCartOpen, clearItemFromCart } =
    useContext(CartContext);
  const { book_title, chapter } = useParams();
  const PATHTOEDIT = `/${book_title}/${chapter}/edit`;
  // const PATHTOSLIDE = `/${book_title}/${chapter}/slides`;
  const UNDERSCORE = "_";
  const NOSPACE = "";
  const bookTitle = book_title.split(UNDERSCORE).join(NOSPACE);

  const onSaveClick = () => {
    axios
      .post(`http://localhost:5001/api/${bookTitle}/${chapter}`, {
        textDics: cartItems,
        chapter: chapter,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // addCollectionAndDocuments(Object.values(cartItems));
    alert("save to dictionary successfully");
    clearItemFromCart();
    setIsCartOpen(false);
  };
  const renderWords = Object.values(cartItems).map((textDic) => {
    return textDic.bookTitle === bookTitle ? (
      <CartItem key={textDic.id} cartItem={textDic} />
    ) : null;
  });
  return (
    <div>
      <button style={{ margin: "40px", borderRadius: "10px" }}>
        <Link to={PATHTOEDIT}>TO EDIT </Link>
      </button>
      <div>
        {" "}
        <h4>Click the word to search for the definition</h4>
        <div>{renderWords}</div>
      </div>
      <button onClick={onSaveClick}>save words to dictionary</button>
    </div>
  );
}
