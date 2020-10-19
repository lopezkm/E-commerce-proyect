import React, { useEffect } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../assets/logofull.svg';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { connect } from 'react-redux';
import store from '../../redux/store/store.js'
import { useState } from 'react';
console.log(store.getState());

function NavBar( props ){

	const [cartCounter, setCartCounter] = useState(store.getState().cartCounter);
	
	useEffect(() => {
		
		store.subscribe(() => { 
			setCartCounter(store.getState().cartCounter) 
		});
		
    }, []);

	return (
		<Navbar collapseOnSelect expand="lg" fixed="top" variant="dark" className="navbar-main">
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
						<p className="navbar-text navbar-text-outline">Catálogo</p>
					</Nav.Link>
					<div className="navbar-separator"></div>
					<Nav.Link href="/admin">
						<p className="navbar-text navbar-text-outline">Administración</p>
					</Nav.Link>
				</Nav>
				<Nav.Link className="navbar-cart" href="/cart">
	<FontAwesomeIcon icon={ faShoppingCart }/> <p className="navbar-text">Carrito {cartCounter}</p>
				</Nav.Link>
				<Nav.Link className="navbar-user" href="/user">
					<FontAwesomeIcon icon={ faUser }/> <p className="navbar-text">Mi cuenta</p>
				</Nav.Link>
				<SearchBar/>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
