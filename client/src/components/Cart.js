import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';  // Adjust this path as necessary
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Cart = () => {
    const { cart, dispatch } = useCart();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/cart")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                dispatch({ type: 'SET_CART', payload: data });
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [dispatch]);

    const handleAddMore = () => {
        navigate('/#products');
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <Main>
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {cart.length === 0 ? (
                            <CartContainer>
                                <h2>Your cart is empty now!</h2>
                                <p>Dive in our TROVE, get what you like! </p>
                                <StyledButton onClick={handleAddMore}>Go Shopping →</StyledButton>
                            </CartContainer>
                        ) : (
                            <CartContainer>
                                <ul>
                                    {cart.map((item) => (
                                        <li key={item._id}>
                                            <CartItem item={item} />
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={handleAddMore}>Continue Shopping</button>
                                <p>Total: ${calculateTotalPrice()}</p>
                                <StyledButton>Proceed to Checkout</StyledButton>
                            </CartContainer>
                        )}
                    </div>
                )}
            </div>
        </Main>
    );
};

export default Cart;

const Main = styled.main`
    background-color: skyblue;
    color: white;
    height: 100vh;
`;

const CartContainer = styled.div`
    padding: 100px 50px;
    font-family: 'Franklin Gothic Medium';
    width: 100vw;
`;

const StyledButton = styled.button`
    font-family: "Jersey 10", sans-serif;
    border: solid 2px;
    border-radius: 30px;
    background-color: skyblue;
    color: gold;
    font-size: 24px;
    padding: 20px;
    float: right;
    margin-right: 10%;
`;