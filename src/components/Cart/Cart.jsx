import React, { useEffect, useId, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { Link, useNavigate } from "react-router-dom";
import style from "./Cart.module.css";
import LogoCart from "../../assets/CART-32.png";

const Cart = () => {
  const cartCheckboxId = useId();
  const {
    cart,
    addToCart,
    clearCart,
    decreaseQuantity,
    increaseQuantity,
    removeFromCart,
  } = useCart();
  const navigate = useNavigate();

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

  const CartItem = ({ id, images, price, name, quantity, selectedSize, stock }) => {
    return (
      <div className={style.containerCart}>
        <img src={images} alt={name} className={style.cartImg} />
        <div className={style.detailCart}>
          <strong>{name}</strong> <strong>$ {price}</strong>
          <footer>
            <p>
              Size: <strong>{selectedSize}</strong> Quantity: <strong>{quantity}</strong>{" "}
            </p>
          </footer>
          <div>
            <button
              onClick={() => decreaseQuantity(id, selectedSize)}
              className={style.buttonContainer}
              disabled={quantity <= 1}
            >
              -
            </button>
            <button
              onClick={() => increaseQuantity(id, selectedSize)}
              className={style.buttonContainer}
              disabled={quantity >= stock}
            >
              +
            </button>
            <button
              onClick={() => removeFromCart(id, selectedSize)}
              className={style.buttonContainer2}
            >
              Remove All
            </button>
          </div>
        </div>
      </div>
    );
  };



  const handleMouseEnter = () => {
    if (calculateTotal() > 0) {
      setButtonText("Buy");
    }
  };

  const handleMouseLeave = () => {
    setButtonText(`Total: $${calculateTotal().toFixed(2)}`);
  };

  const handlePayment = () => {
    const totalAmount = calculateTotal();
    if (totalAmount > 0) {
      navigate("/Payment", { state: { total: totalAmount, cart: cart } });
    }
  };

  return (
    <div className={style.containerGeneralCart}>
      <div className={style.navCon}>
        <div>
          <img src={LogoCart} className={style.LogoCart} />
        </div>
        <div className={style.ContainerButtonCart}>
          <Link to="/home">
            <button className={style.buttonCart}>HOME</button>
          </Link>
          <button onClick={clearCart} className={style.buttonCart}>
            CLEAR
          </button>
        </div>
      </div>
      <input
        id={cartCheckboxId}
        type="checkbox"
        hidden
        className={style.inputcon}
      />
      <aside>
        <ul className={style.conteienrCards}>
          {Array.isArray(cart)
            ? cart.map((product) => (
              <CartItem
                key={`${product.id}-${product.selectedSize}`}
                {...product}
                stock={product.stock[product.selectedSize]} // Asegúrate de que esto esté disponible
              />
            ))
            : null}
        </ul>
        <div className={style.totalCart}>
          <button
            className={style.totalCartButton}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handlePayment}
          >
            {buttonText}
          </button>
        </div>
      </aside>
    </div>
  );
};

export default Cart;
