import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
    cart: JSON.parse(localStorage.getItem("cart") || "[]"),
};


const reducer = (state, action) => {
    console.log("Current cart:", state.cart);
    const { type, payload } = action;

    const generateUniqueId = (id, size) => `${id}-${size}`;

    switch (type) {
        case 'ADD_TO_CART': {
            const uniqueId = generateUniqueId(payload.id, payload.selectedSize);

            // Buscar el índice del producto en el carrito
            const productInCartIndex = state.cart.findIndex(item => generateUniqueId(item.id, item.selectedSize) === uniqueId);

            if (productInCartIndex >= 0) {
                // Producto ya está en el carrito, actualiza la cantidad
                const newCart = structuredClone(state.cart); // Clona el estado del carrito
                newCart[productInCartIndex].quantity += payload.quantity; // Aumenta la cantidad según la payload
                return { ...state, cart: newCart }; // Retorna el nuevo estado con el carrito actualizado
            } else {
                // Producto no está en el carrito, agrégalo
                return {
                    ...state,
                    cart: [
                        ...state.cart,
                        {
                            ...payload,
                            quantity: payload.quantity // Usa la cantidad desde la payload
                        }
                    ]
                };
            }
        }
        case 'REMOVE_FROM_CART': {
            const uniqueId = generateUniqueId(payload.id, payload.selectedSize);
            return { cart: state.cart.filter(item => generateUniqueId(item.id, item.selectedSize) !== uniqueId) };
        }
        case 'CLEAR_CART': {
            return { cart: [] };
        }
        case 'INCREASE_QUANTITY': {
            const uniqueId = generateUniqueId(payload.id, payload.selectedSize);
            return {
                cart: state.cart.map(item =>
                    generateUniqueId(item.id, item.selectedSize) === uniqueId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };
        }
        case 'DECREASE_QUANTITY': {
            const uniqueId = generateUniqueId(payload.id, payload.selectedSize);
            return {
                cart: state.cart.map(item =>
                    generateUniqueId(item.id, item.selectedSize) === uniqueId
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

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }, [state.cart]);

    const addToCart = product => dispatch({
        type: 'ADD_TO_CART',
        payload: product
    });

    const removeFromCart = (id, size) => dispatch({
        type: 'REMOVE_FROM_CART',
        payload: { id, selectedSize: size }
    });

    const clearCart = () => dispatch({
        type: 'CLEAR_CART'
    });

    const increaseQuantity = (id, size) => dispatch({
        type: 'INCREASE_QUANTITY',
        payload: { id, selectedSize: size }
    });

    const decreaseQuantity = (id, size) => dispatch({
        type: 'DECREASE_QUANTITY',
        payload: { id, selectedSize: size }
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
