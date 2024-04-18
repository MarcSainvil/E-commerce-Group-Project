import React from 'react';
import styled from 'styled-components';




const Products = () => (
  <ProductsContainer>
    <h1 className='productTitle'>Our Products</h1>
    
    <div className='productList'>
      <ProductItem>
        
      </ProductItem>
      
      <ProductItem>
      
      </ProductItem>
    
    </div>
  </ProductsContainer>
);

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
    font-size: 50px;

    font-family: 'Poppins', sans-serif;
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
    }

    @media only screen and (max-width: 800px) {
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
    font-family: 'Poppins', sans-serif;
  }
`;

export default Products;