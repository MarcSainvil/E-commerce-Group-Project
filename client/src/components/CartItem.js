import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ product }) => {
    const { dispatch } = useCart();

    const handleRemoveItem = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: product.id } });
    };

    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value);
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: product.id, quantity } });
    };

    return (
    <div>
        <img src={product.imageSrc} alt={product.name} />
        <p>{product.name} - ${product.price}</p>
        <input type="number" value={product.quantity} onChange={handleQuantityChange} />
        <button onClick={handleRemoveItem}>Remove</button>
    </div>
    );
    };

export default CartItem;