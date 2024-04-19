import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ReorderIcon from '@material-ui/icons/Reorder';

const NavbarContainer = styled.div`
  width: 100%;
  height: 100px;
  background: #38393d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;

  .links {
    display: flex;
    align-items: center;

    a {
      color: white;
      text-decoration: none;
      margin: 0 15px;
      font-size: 18px;
    }
  }

  .toggleButton {
    display: none;

    button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      font-size: 24px;
    }
  }

  @media only screen and (max-width: 600px) {
    .links {
      display: ${(props) => (props.expanded ? 'flex' : 'none')};
      flex-direction: column;
      position: absolute;
      top: 100px;
      left: 0;
      width: 100%;
      background: #38393d;
      padding: 20px;
      z-index: 10;

      a {
        margin: 10px 0;
      }
    }

    .toggleButton {
      display: flex;
    }
  }
`;

const Navbar = () => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <NavbarContainer expanded={expanded}>
      <div className='toggleButton'>
        <button onClick={() => setExpanded((prev) => !prev)}>
          <ReorderIcon />
        </button>
      </div>
      <div className='links'>
        <a href="#home">Home</a>
        <a href="#products">Products</a>
        <Link to='/cart'>Cart</Link>
      </div>
    </NavbarContainer>
  );
};

export default Navbar;