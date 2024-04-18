import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);//??? 
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        
        fetch("/cart")
            .then(response => response.json())
            .then(data => {
                setCartItems(data); 
                setIsLoading(false); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false); 
            });
    }, []);

//handlers

    const removeItemFromCart = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    };

    const handleAddMore = () => {
        // Navigate to the products page or home page
        history.push('/products'); //actual links later need doublecheck!
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };


//show on web
    return(
        <main>
        <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {cartItems.length === 0 ? (
                            <div>
                                <h2>Your cart is empty now!</h2>
                                <p>Dive in our TROVE, get what you like! </p>
                                <button onClick={handleAddMore}>Go Shopping</button>
                            </div>
                        ) : (
                            <div>
                                <ul>
                                    {cartItems.map((item, index) => (
                                        <li key={index}>
                                            <img src={item.imageSrc} alt={item.name} />
                                            <div>
                                                <h3>{item.name}</h3>
                                                <p>Price: ${item.price}</p>
                                                <button onClick={() => removeItemFromCart(index)}>Remove</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <button onClick={handleAddMore}>Continue Shopping</button>

                                <p>Total: ${calculateTotalPrice()}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

        </main>
    )
}

export default Cart;