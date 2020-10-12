import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import SearchBar from '../SearchBar/search_bar.jsx';

const NavBar = () => {
  return (
    <Navbar expand="md" bg="dark" variant="dark" sticky="top" className="navBar-container">
      <Navbar.Brand href="/">Toni Games</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto navBar-options">
          <Nav.Link href="/admin/create">Admin</Nav.Link>
          <Nav.Link href="/products">Catalogo</Nav.Link>
        </Nav>
        <SearchBar />
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
