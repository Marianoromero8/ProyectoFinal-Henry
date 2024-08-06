import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
};

const reducer = (state, action) => {
    console.log("Current cart:", state.cart);
    const { type, payload } = action

    switch (type) {
        case 'ADD_TO_CART': {
            const { id } = payload;
            const productInCartIndex = state.cart.findIndex(item => item.id === id);

            if (productInCartIndex >= 0) {
                // Una forma usando structuredClone
                const newState = structuredClone(state);
                newState.cart[productInCartIndex].quantity += 1;
                return { cart: newState.cart };
            }
            return {
                ...state,
                cart: [
                    ...state.cart,
                    {
                        ...payload,
                        quantity: 1
                    }
                ]
            };
        }
        case 'REMOVE_FROM_CART': {
            const { id } = payload;
            return { cart: state.cart.filter(item => item.id !== id) };
        }
        case 'CLEAR_CART': {
            return { cart: [] };
        }
        case 'INCREASE_QUANTITY': {
            const { id } = payload;
            return {
                cart: state.cart.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };
        }
        case 'DECREASE_QUANTITY': {
            const { id } = payload;
            return {
                cart: state.cart.map(item =>
                    item.id === id
                        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity }
                        : item
                )
            };
        }
        default: {
            return state;
        }
    }
};

// Sirve para testear
// expect(
//     reducer([], { type: 'ADD_TO_CART', payload: { id:1 } })
// ).toEqual([{ id:1, quantity: 1 }]);

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }, [state.cart]);

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    });

    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: { id: product }
    });

    const clearCart = () => dispatch({
        type: 'CLEAR_CART'
    });

    const increaseQuantity = (id) => dispatch({
        type: 'INCREASE_QUANTITY',
        payload: { id }
    });

    const decreaseQuantity = (id) => dispatch({
        type: 'DECREASE_QUANTITY',
        payload: { id }
    });

    return (
        <CartContext.Provider value={{
            cart: state.cart,
            addToCart,
            removeFromCart,
            clearCart,
            increaseQuantity,
            decreaseQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
}
