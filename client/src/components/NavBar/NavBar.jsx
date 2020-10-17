import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { ReactComponent as Logo } from '../../assets/logofull.svg';
import store from '../../redux/store/store.js';
console.log('navBar',store.getState());

function NavBar( )
{
	return (
		<Navbar collapseOnSelect expand="md" fixed="top" variant="dark" className="navbar-main">
			<Navbar.Brand href="#home">
				<Logo className="navbar-logo"/>
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
					<div className="navbar-separator"></div>
					<Nav.Link href="/admin">
						<p className="navbar-option-text">Panel Admin</p>
					</Nav.Link>
				</Nav>
				<SearchBar/>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
