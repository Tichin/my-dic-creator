import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";

import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
  const { book_title } = useParams();
  const { cartItems, removeItemFromCart, setIsCartOpen, clearItemFromCart } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [vocCount, setVocCount] = useState(0);
  const UNDERSCORE = "_";
  const NOSPACE = "";
  const bookTitleFromParam = book_title.split(UNDERSCORE).join(NOSPACE);

  useEffect(() => {
    let count = 0;

    Object.values(cartItems).forEach((textDic) => {
      if (textDic.bookTitle === bookTitleFromParam) count = count + 1;
    });

    setVocCount(count);
  }, [vocCount]);

  const goToBasketHandler = () => {
    navigate("basket");
  };
  const removeItem = (item) => {
    removeItemFromCart(item);
  };
  const closeCart = () => {
    setIsCartOpen(false);
  };
  const clearCart = () => {
    clearItemFromCart();
  };

  const renderCartItems = Object.values(cartItems).map((textDic, index) => {
    const { text, paragraph, sentence, id, bookTitle } = textDic;
    const lastIndex = paragraph.length - 1;
    const lastTwoIndex = paragraph.length - 2;
    const lastChar = paragraph[lastIndex];
    const lastTwoChar = paragraph[lastTwoIndex];
    const p = lastTwoChar === "0" ? lastChar : lastTwoChar + lastChar;
    const marker = `p${p}-s${sentence}`;
    return bookTitle === bookTitleFromParam ? (
      <li className="basket-list" key={id}>
        <span style={{ paddingRight: "10px", fontWeight: "bold" }}>
          {index + 1}
        </span>
        <span>
          {text}--{marker}
        </span>
        <button
          onClick={() => removeItem(textDic)}
          style={{
            marginLeft: "10px",
            paddingLeft: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "beige",
            cursor: "pointer",
          }}
        >
          remove
        </button>
      </li>
    ) : null;
  });

  return (
    <div className="cart-dropdown-container">
      <ul className="cart-items">{renderCartItems}</ul>
      <button
        onClick={clearCart}
        style={{
          height: "3vh",
          paddingLeft: "10px",
          border: "none",
          backgroundColor: "red",
          cursor: "pointer",
        }}
      >
        Clear the Cart
      </button>
      <button
        onClick={closeCart}
        style={{
          height: "3vh",
          paddingLeft: "10px",
          border: "none",
          backgroundColor: "gray",
          cursor: "pointer",
        }}
      >
        Close the Cart
      </button>
      <button
        onClick={goToBasketHandler}
        style={{
          height: "3vh",
          paddingLeft: "10px",
          border: "none",
          backgroundColor: "bisque",
          cursor: "pointer",
        }}
      >
        Go To Baskit
      </button>
    </div>
  );
};

export default CartDropdown;
