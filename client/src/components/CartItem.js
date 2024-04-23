import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ product }) => {
    const { dispatch } = useCart();

    // Function to handle removing an item from the cart
    const handleRemoveItem = () => {
        dispatch({ type: 'REMOVE_ITEM', payload: { id: product.productId } });
    };

    // Function to handle changes in the quantity of a cart item
    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value);
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: product.productId, quantity } });
    };

    // Component layout
    return (
        <div>
            <p>{product.name} - {product.price}</p>
            <input type="number" value={product.quantity} onChange={handleQuantityChange} />
            <button onClick={handleRemoveItem}>Remove</button>
        </div>
    );
};

export default CartItem;