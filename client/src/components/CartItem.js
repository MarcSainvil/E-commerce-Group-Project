import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { dispatch } = useCart();

    const handleRemoveItem = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: item.id } });
    };

    const handleQuantityChange = (e) => {
        const quantity = parseInt(e.target.value);
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity } });
    };

    return (
    <div>
        <img src={item.imageSrc} alt={item.name} />
        <p>{item.name} - ${item.price}</p>
        <input type="number" value={item.quantity} onChange={handleQuantityChange} />
        <button onClick={handleRemoveItem}>Remove</button>
    </div>
    );
    };

export default CartItem;