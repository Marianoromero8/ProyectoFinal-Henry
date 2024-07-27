import React from 'react'
import Loader from '../Loader/Loader';

const Cart = () => {
  return (
    <div>
    <h1>CHANGUITO DE COMPRAS</h1>
    <Loader/>
    </div>
    // <div>
    //   <h2>Shopping Cart</h2>
    //   {items.length === 0 ? (
    //     <p>Your cart is empty</p>
    //   ) : (
    //     <ul>
    //       {items.map((item) => (
    //         <li key={item.id}>
    //           <div>{item.name}</div>
    //           <div>{item.price}</div>
    //           <div>
    //             <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
    //             <input
    //               type="number"
    //               value={item.quantity}
    //               onChange={(e) => handleUpdateCartItem(item.id, parseInt(e.target.value, 10))}
    //             />
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    //   <div>
    //     <strong>Total Quantity:</strong> {totalQuantity}
    //   </div>
    //   <div>
    //     <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
    //   </div>
    //   <button onClick={handleClearCart}>Clear Cart</button>
    // </div>
  )
}

export default Cart;