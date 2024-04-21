import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ReorderIcon from '@material-ui/icons/Reorder';

// Defines a navigation bar component
const Navbar = () => {
  // tracks whether the navigation links are showing (expanded) or hidden
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  // React hook that closes the navigation menu when the route changes
  useEffect(() => {
    setExpanded(false);
  }, [location]);

//render navbar
  return (
    <NavbarContainer expanded={expanded}>
      <div className='toggleButton'>
        <button onClick={() => setExpanded((prev) => !prev)}>
          <ReorderIcon />
        </button>
      </div>
      <div className='links'>
        <Link to="/">Home</Link> {/* Points to the main page */}
        <Link to="/#products">Products</Link> {/* Points to the products section on the main page */}
        <Link to='/cart'>Cart</Link> {/* Points to a separate cart page */}
      </div>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div.withConfig({
  // Function to filter out the 'expanded' prop from being passed to the DOM element and styling component for Navbar
  shouldForwardProp: (prop) => !['expanded'].includes(prop),
})`
  width: 100%;
  height: 100px;
  position: fixed;
  background: skyblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 100;

  .links {
    display: flex;
    align-items: center;
    font-family: "Libre Barcode 39 Text", system-ui;
    font-style: normal;

    a {
      color: white;
      text-decoration: none;
      margin: 0 15px;
      font-size: 28px;
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
      display: ${props => props.expanded ? 'flex' : 'none'};
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

export default Navbar;