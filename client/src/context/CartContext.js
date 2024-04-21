import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
    case 'ADD_ITEM':
        return [...state, action.payload];
    case 'REMOVE_ITEM':
        //debugger
        return state.filter(item => item.productId !== action.payload.id);
    case 'UPDATE_QUANTITY':
        return state.map(item => {
            if (item.productId === action.payload.id) {
                return { ...item, quantity: action.payload.quantity };
            }
        return item;
        });
    default:
        return state;
    }
};

const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
        {children}
        </CartContext.Provider>
    );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart }