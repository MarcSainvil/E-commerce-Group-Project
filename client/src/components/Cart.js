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
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };


//show on web
    return(
        <main>
        <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {cart.length === 0 ? (
                            <div>
                                <h2>Your cart is empty now!</h2>
                                <p>Dive in our TROVE, get what you like! </p>
                                <button onClick={handleAddMore}>Go Shopping</button>
                            </div>
                        ) : (
                            <div>
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

                                <button onClick={handleAddMore}>Continue Shopping</button>

                                <p>Total: ${calculateTotalPrice()}</p>

                                <button>Proceed to Checkout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </main>
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