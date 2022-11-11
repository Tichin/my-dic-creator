import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../contexts/cart.context";
import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { text, id, definition, bookTitle } = cartItem;
  const { chapter } = useParams();
  const PATHTOWORD = `${id}`;
  const { removeItemFromCart, setIsCartOpen } = useContext(CartContext);
  const onRemoveClick = () => {
    removeItemFromCart(cartItem);
  };

  const onSaveClick = () => {
    axios
      .post(`http://localhost:5001/api/${bookTitle}/${chapter}`, {
        textDics: { id: { ...cartItem } },
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
    removeItemFromCart(cartItem);
    setIsCartOpen(false);
  };
  return (
    <div className="cart-item-container">
      <div className="text">
        <Link to={PATHTOWORD}>{text}</Link>
      </div>
      <div className="item-details">
        <span className="name">{text}</span>
        <span>{definition || "definition"}</span>
      </div>
      <button onClick={onRemoveClick} style={{ borderRadius: "10px" }}>
        Remove from Basket
      </button>
      <button onClick={onSaveClick} style={{ borderRadius: "10px" }}>
        Save to Dictionary
      </button>
    </div>
  );
};

export default CartItem;
