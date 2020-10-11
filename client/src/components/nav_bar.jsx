import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import SearchBar from '../components/search_bar.jsx';

const NavBar = ( { findProducts }) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Toni Games</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/admin">Admin</Nav.Link>
        <Nav.Link href="/catalogue">Catalogo</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <SearchBar findProducts={findProducts}/>
    </Navbar>
  );
};

export default NavBar;
