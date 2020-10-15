import React, { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../SearchBar/SearchBar.jsx';
import logo from '../../assets/logo.png';
import store from '../../redux/store/store.js';
console.log('navBar',store.getState());

function NavBar( )
{
	return (
		<Navbar collapseOnSelect expand="md" fixed="top" variant="dark" className="navbar-main">
			<Navbar.Brand href="#home">
				<img src={ logo } className="navbar-logo" alt="Logo"/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbarCollapse">
				<FontAwesomeIcon icon={ faBars } className="navbar-open-menu"/>
				<FontAwesomeIcon icon={ faTimes } className="navbar-close-menu"/>
			</Navbar.Toggle>
			<Navbar.Collapse id="navbarCollapse">
				<Nav className="mr-auto">
					<Nav.Link href="/products">
						<p className="navbar-option-text">Catálogo</p>
					</Nav.Link>
					<div class="navbar-separator"></div>
					<Nav.Link href="/categories">
						<p className="navbar-option-text">Panel Categorías</p>
					</Nav.Link>
					<div class="navbar-separator"></div>
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
