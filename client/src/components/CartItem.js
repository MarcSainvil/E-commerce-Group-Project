import React from 'react';
import { useCart } from '../context/CartContext';
import styled from "styled-components";

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
        <Stylediv>
            <p>{product.name} - {product.price}</p>
            <StyleInput type="number" value={product.quantity} onChange={handleQuantityChange} />
            <StyleButton onClick={handleRemoveItem}>Remove</StyleButton>
        </Stylediv>
    );
};

export default CartItem;

const Stylediv = styled.div`
width: 100%;
`;

const StyleInput = styled.input`
width:50px;
height:25px;
border-radius:30px;
border:0px;
text-align:center;
`;

const StyleButton = styled.button`
margin-left:10px;
height:25px;
border-radius:30px;
width:75px;
`;