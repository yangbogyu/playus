import React from "react";
import styled from "styled-components";
import Burger from "./Burger";
import logo from "../../img/PLAYUS.png";

const Nav = styled.nav`
  width: 100%;
  height: 60px;
  border-bottom: 2px solid #f1f1f1;
  padding: 15px 15px;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.img`
  padding: 3px;
  width: 8%;
  @media (max-width: 768px) {
    width: 25%;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <Logo src={logo} />
      <Burger />
    </Nav>
  );
};

export default Navbar;
