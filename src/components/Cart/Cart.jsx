import React, { useId } from 'react'
import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartCheckboxId = useId();
  const { cart, addToCart, clearCart } = useCart()

  const CartItem = ({ images, price, name, quantity, addToCart }) => {
    return (
      <li>
        <img src={images} alt={name} />
        <div>
          <strong>{name}</strong> - ${price}
        </div>

        <footer>
          <small>
            quantity: {quantity}
          </small>
        </footer>
      </li>
    )
  }

  return (
    <>
      <div>
        <Link to='/home'>
          <button>HOME</button>
        </Link>
      </div>
      <label htmlFor={cartCheckboxId}>
        Poner cart icon
      </label>
      <input id={cartCheckboxId} type='checkbox' hidden />

      <aside className='cart'>
        <ul>
          {Array.isArray(cart) ? cart.map(product => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          )) : null}
        </ul>

        <button onClick={clearCart}>clear</button>
      </aside>
    </>
  )
}

export default Cart;