import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';  // Adjust this path as necessary
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, dispatch } = useCart();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/cart")
            .then(response => response.json())
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
        navigate('/products');
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

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
                                    {cart.map((item) => (
                                        <li key={item.id}>
                                            <CartItem item={item} />
                                        </li>
                                    ))}
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
    );
};

export default Cart;