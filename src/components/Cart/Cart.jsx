import React, { useId } from "react";
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
import style from "./Cart.module.css";
import LogoCart from "../../assets/CART-32.png";
const Cart = () => {
  const cartCheckboxId = useId();
  const { cart, addToCart, clearCart } = useCart();

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
      </aside>
    </div>
  );
};

export default Cart;
