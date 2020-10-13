import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import SearchBar from '../SearchBar/SearchBar.jsx';
import logo from '../../assets/logo.png';

const NavBar = () => {
	return (
		<Navbar collapseOnSelect expand="lg" className="navbar-main">
			<Navbar.Brand href="#home">
				<img src={ logo } className="navbar-logo" alt="Logo"/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbarCollapse" />
			<Navbar.Collapse id="navbarCollapse">
				<Nav className="mr-auto">
					<Nav.Link href="/products">
						<p className="navbar-option-text">Catálogo</p>
					</Nav.Link>
					<Nav.Link href="/categories">
						<p className="navbar-option-text">Panel Categorías</p>
					</Nav.Link>
					<Nav.Link href="/admin/create">
						<p className="navbar-option-text">Panel Productos</p>
					</Nav.Link>
				</Nav>
				<SearchBar/>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
