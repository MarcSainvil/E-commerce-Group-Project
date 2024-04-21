import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useCart } from "../context/CartContext";

const Products = () => {
  // State hooks to store products and error messages
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const { dispatch } = useCart();

    // Fetch products from the server when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/items');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError('Failed to fetch products: ' + error.message);
            }
        };
        fetchProducts();
    }, []);

    // Function to handle adding items to the cart
    const addToCart = async (productId, name, price, quantity, event) => {
      event.preventDefault();
      event.stopPropagation();
      try {
          const response = await fetch('http://localhost:4000/api/cart/add', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ productId, name, price, quantity }),
          });
          if (!response.ok) {
              throw new Error('Failed to add item to cart');
          }
          dispatch({ type: 'ADD_ITEM', payload: { productId, name, price, quantity } });
      } catch (error) {
          console.error('Error adding item to cart:', error);
      }
  };

    // Render the products on the page
    return (
        <ProductsContainer>
            <h1 className='productTitle'>Our Products</h1>
            <div className='productList'>
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductItem key={product._id} onClick={() => addToCart(product._id, product.name, product.price, 1)}>
                            <div className="bgImage" style={{ backgroundImage: `url(${product.imageSrc})` }}></div>
                            <h1>{product.name}</h1>
                            <p>{product.price}</p>
                            <button onClick={(e) => addToCart(product._id, product.name, product.price, 1, e)}>Add to Cart</button>
                        </ProductItem>
                    ))
                ) : (
                    <p>{error || "Loading..."}</p>
                )}
            </div>
        </ProductsContainer>
    );
};

const ProductsContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Poppins', sans-serif;

    .productTitle {
        text-align: center;
        color: #27282b;
        font-size: 80px;
        font-family: 'Jersey 10', sans-serif;
        font-weight: 400;
        font-style: normal;
    }

    .productList {
        width: 70vw;
        height: auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        place-items: center;
        font-family: 'Poppins', sans-serif;

        @media only screen and (max-width: 1300px) {
            grid-template-columns: 1fr 1fr;
        }

        @media only screen and (max-width: 800px) {
            grid-template-columns: 1fr;
            width: 100%;
        }
    }
`;

const ProductItem = styled.div`
    border-radius: 15px;
    width: 300px;
    height: 300px;
    margin: 40px;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
    text-align: center;
    transition: box-shadow 0.3s ease-in;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;

    &:hover {
        box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.5);
        cursor: pointer;
    }

    .bgImage {
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        width: 100%;
        height: 200px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    h1 {
        font-size: 25px;
        margin-top: 20px;
        font-family: 'MedievalSharp', cursive;
        font-weight: 400;
        font-style: normal;
    }

    p {
        font-size: 20px;
        color: #333;
        font-family: 'Poppins', sans-serif;
    }
`;

export default Products;