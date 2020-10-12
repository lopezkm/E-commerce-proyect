import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import SearchBar from '../components/search_bar.jsx';

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Toni Games</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/admin/create">Admin</Nav.Link>
        <Nav.Link href="/products">Catalogo</Nav.Link>
      </Nav>
      <SearchBar/>
    </Navbar>
  );
};

export default NavBar;
