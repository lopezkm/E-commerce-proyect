import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import SearchBar from '../components/search_bar.jsx';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <SearchBar/>
    </Navbar>
  );
};

export default NavBar;
