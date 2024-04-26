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
                                <StyleHead>Your cart is empty now!</StyleHead>
                                <StyleP>Dive in our TROVE, get what you like!</StyleP>
                                <StyledButtontwo onClick={handleAddMore}>Go Shopping →</StyledButtontwo>
                            </CartContainer>
                        ) : (
                            <CartContainer>
                            <StyleHead>Your cart:</StyleHead>
                            
                                <List>
                                    {cart.map((product) => (
                                        <List key={product._id}>
                                            <CartItem product={product} />
                                            <DashedLine></DashedLine>
                                        </List>
                                    ))}
                                </List>
                                <StyledButtontwo onClick={handleAddMore}>Continue Shopping </StyledButtontwo>
                                <Total>Total: ${calculateTotalPrice()}</Total>
                                <StyledButtontwo onClick={handleCheckout}>Proceed to Checkout</StyledButtontwo>
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

const List = styled.ul`
list-style-type: style none;
font-size:20px;
`;

const StyleHead = styled.h2`
font-size:48px;
`;

const StyleP = styled.p`
font-size:20px;
`;

const DashedLine = styled.p`
border-top: 3px dashed white;
width:40vw;
`;

const Total = styled.p`
font-size:32px;
margin-top:150px;
`;

const StyledButtontwo = styled.button`
    font-family: "Jersey 10", sans-serif;
    border: solid 2px;
    border-radius: 30px;
    background-color: skyblue;
    color: gold;
    font-size: 24px;
    padding: 20px;
    margin-top:20px;
`;

export default Cart;