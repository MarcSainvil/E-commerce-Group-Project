import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Cart = () => {
    const { cart } = useCart();
    const { dispatch } = useCart();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/cart");
                
                const data = await response.json();
                dispatch({ type: 'SET_CART', payload: data });
                setIsLoading(false); 
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false); 
            }
        };
    
        fetchData();
    }, [dispatch]);

//handlers

    const handleAddMore = () => {
        // Navigate to the products page or home page
        navigate('/#products');; //actual links later need doublecheck!
    };

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


//show on web
    return(
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
                                <StyledButton onClick={handleAddMore}>Go Shopping</StyledButton>
                            </CartContainer>
                        ) : (
                            <CartContainer>
                                <ul>
                                    {cart.map((product) => {
                                        console.log(product._id); 
                                        return (
                                        <li key={product._id}>
                                            
                                            <CartItem product={product} />
                                        </li>
                                        );
                                })}
                                </ul>

                                <StyledButton onClick={handleAddMore}>Continue Shopping</StyledButton>

                                <p>Total: ${calculateTotalPrice()}</p>

                                <StyledButton>Proceed to Checkout</StyledButton>
                            </CartContainer>
                        )}
                    </div>
                )}
            </div>

        </Main>
    )
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