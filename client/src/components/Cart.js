import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Cart = () => {
    const { cart, dispatch } = useCart();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    // Fetch cart data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/cart");
                if (!response.ok) {
                    throw new Error('Failed to load the cart');
                }
                const data = await response.json();
                dispatch({ type: 'SET_CART', payload: data });
                console.log(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching cart:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    // Redirect to product list when "add more items" button is clicked
    const handleAddMore = () => {
        navigate('/#products');
    };

    // Calculate total price of items in the cart
    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => {
            // Remove the currency symbol and parse the price string into a float
            const price = parseFloat(item.price.replace('$', ''));
            const quantity = parseInt(item.quantity);
            if (!isNaN(price) && !isNaN(quantity)) {
                return total + (price * quantity);
            } else {
                console.error('Invalid price or quantity:', item);
                return total;
            }
        }, 0).toFixed(2);
    };

    // Handle the checkout process
    const handleCheckout = async () => {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Checkout failed.');
        }
        const result = await response.json();
        alert(result.message);
        dispatch({ type: 'CLEAR_CART' });
      } catch (error) {
        console.error('Error during checkout:', error);
        alert('Out of Stock: ' + error.message);
      }
    };

    // Render the cart page
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
                                <p>Dive in our TROVE, get what you like!</p>
                                <StyledButton onClick={handleAddMore}>Go Shopping →</StyledButton>
                            </CartContainer>
                        ) : (
                            <CartContainer>
                                <ul>
                                    {cart.map((product) => (
                                        <li key={product._id}>
                                            <CartItem product={product} />
                                        </li>
                                    ))}
                                </ul>
                                <StyledButton onClick={handleAddMore}>Continue Shopping</StyledButton>
                                <p>Total: ${calculateTotalPrice()}</p>
                                <StyledButton onClick={handleCheckout}>Proceed to Checkout</StyledButton>
                            </CartContainer>
                        )}
                    </div>
                )}
            </div>
        </Main>
    );
};

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

export default Cart;