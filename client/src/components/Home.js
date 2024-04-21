import React from 'react';
import styled from 'styled-components';

const Home = () => {
  return (
    <HomeContainer>
      <div className='hero'>
        <h2>WELCOME TO TECH TROVE!</h2>
        <div className='prompt'>
          <p>
          
          </p>
      </div>
      
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  width: 100%;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  color: gold;

  .hero {
    margin-top: 10px;
    width: 100%;
    height: calc(50vh - 100px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: skyblue;
    color: #f0f0f0;
    position: relative;

    h2 {
      font-family: "Jersey 10", sans-serif;
      font-weight: 400;
      font-style: normal;
      font-size: 80px;
      color: sandybrown;
      height: 50px;
      margin-top: 50px;
      @media (max-width: 800px){ 
        font-size: 50px;
      }
    }

    .prompt {
      width: 40%;
      font-size: 30px;

      svg {
        font-size: 60px;
        margin: 5px;
        color: white;
      }
    }
  }

  .skills {
    font-size: 35px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    h1 {
      color: white;
      font-size: 20px;
    }

    .list {
      list-style: none;
      width: 60%;
    }

    span {
      font-size: 20px;
    }
  }

  @media only screen and (max-width: 600px) {
    .hero h2 {
      font-size: 40px;
    }

    .hero .prompt {
      margin-top: 10px;
      font-size: 20px;
      width: 80%;
    }

    .skills {
      text-align: center;

      .list {
        padding: 0;
      }

      h2 {
        font-size: 30px;
      }
    }
  }
`;
export default Home;