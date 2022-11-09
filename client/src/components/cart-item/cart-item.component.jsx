import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/cart.context";
import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { text, id, definition } = cartItem;

  const PATHTOWORD = `${id}`;
  const { removeItemFromCart } = useContext(CartContext);
  const onRemoveClick = () => {
    removeItemFromCart(cartItem);
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
    </div>
  );
};

export default CartItem;
