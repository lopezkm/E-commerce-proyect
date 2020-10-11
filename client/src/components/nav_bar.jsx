import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import SearchBar from '../components/search_bar.jsx';

const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" sticky="top">
  <Navbar.Brand href="#home">ToniBlack Games</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">Home</Nav.Link>
      <Nav.Link href="#pricing">Destacados</Nav.Link>
      <NavDropdown title="Categorias" id="collasible-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <SearchBar/>
  </Navbar.Collapse>
</Navbar>
  );
};

export default NavBar;
