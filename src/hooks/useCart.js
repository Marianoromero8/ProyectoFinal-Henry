import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () => {
    const context = useContext(CartContext)

    if(context === undefined){
        throw new Error('userCart must be used within a CartProvider')
    }

    return context 
}