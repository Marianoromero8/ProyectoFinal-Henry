import React, { useEffect, useId, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import style from "./Cart.module.css";
import LogoCart from "../../assets/CART-32.png";
const Cart = () => {
  const cartCheckboxId = useId();
  const { cart, addToCart, clearCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const [buttonText, setButtonText] = useState("");

  useEffect(() => {
    const total = calculateTotal();
    if (total > 0) {
      setButtonText(`Total: $${total.toFixed(2)}`);
    } else {
      setButtonText("Total: $0.00");
    }
  }, [cart]);

  const CartItem = ({ images, price, name, quantity, addToCart }) => {
    return (
      <div className={style.containerCart}>
        <img src={images} alt={name} className={style.cartImg} />
        <div className={style.detailCart}>
          <strong>{name}</strong> ${price}
          <footer>
            <small>Quantity: {quantity}</small>
          </footer>
        </div>
      </div>
    );
  };

  const handleMouseEnter = () => {
    if (calculateTotal() > 0) {
      setButtonText("Pagar");
    }
  };

  const handleMouseLeave = () => {
    setButtonText(`Total: $${calculateTotal().toFixed(2)}`);
  };

  return (
    <div className={style.containerGeneralCart}>
      <div className={style.ContainerButtonCart}>
        <img src={LogoCart} className={style.LogoCart} />
        <Link to="/home">
          <button className={style.buttonCart}>HOME</button>
        </Link>
        <button onClick={clearCart} className={style.buttonCart}>
          CLEAR
        </button>
      </div>
      <input id={cartCheckboxId} type="checkbox" hidden />
      <aside>
        <ul className={style.conteienrCards}>
          {Array.isArray(cart)
            ? cart.map((product) => (
              <CartItem
                key={product.id}
                addToCart={() => addToCart(product)}
                {...product}
              />
            ))
            : null}
        </ul>
        <div className={style.totalCart}>
          <button
            className={style.totalCartButton}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>{buttonText}</button>
        </div>
      </aside>
    </div>
  );
};

export default Cart;
