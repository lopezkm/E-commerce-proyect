import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../assets/logofull.svg';
import SearchBar from '../SearchBar/SearchBar.jsx';

import axios from 'axios';

function NavBar( )
{
	const cartProductsCount = useSelector( ( state ) => ( state.cart.count > 0 ) ? `[${ state.cart.count }]` : null );
	
	const handleLoginClick = ( e ) => {
		e.preventDefault( );
		
		axios.post( `${ process.env.REACT_APP_API_URL }/auth/login`, {
			email: 'huguito@masgrande.com',
			password: '111111111',
			withCredentials: true,
			credentials: 'include'
		} )
		.then( ( response ) => {
			console.log( 'Response', response );
		} )
		.catch( ( error ) => {
			console.log( 'Error', error );
		} );
	}
	
	const handleTestClick = ( e ) => {
		e.preventDefault( );
		
		axios.get( `${ process.env.REACT_APP_API_URL }/auth/test`, {
			withCredentials: true,
			credentials: 'include'
		} )
		.then( ( response ) => {
			console.log( 'Response', response );
		} )
		.catch( ( error ) => {
			console.log( 'Error', error );
		} );
	}
	
	return (
		<Navbar collapseOnSelect expand="lg" fixed="top" variant="dark" className="navbar-main">
			<Navbar.Brand>
				<Logo className="navbar-logo"/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbarCollapse">
				<FontAwesomeIcon icon={ faBars } className="navbar-open-menu"/>
				<FontAwesomeIcon icon={ faTimes } className="navbar-close-menu"/>
			</Navbar.Toggle>
			<Navbar.Collapse id="navbarCollapse">
				<Nav className="navbar-nav-left">
					<Nav.Link as={ Link } to="/products">
						<p className="navbar-text navbar-text-outline">Tienda</p>
					</Nav.Link>
					<div className="navbar-separator"></div>
					<Nav.Link as={ Link } to="/admin">
						<p className="navbar-text navbar-text-outline">Administración</p>
					</Nav.Link>
					<div className="navbar-separator"></div>
					<Nav.Link onClick={ handleLoginClick }>
						<p className="navbar-text navbar-text-outline">Login</p>
					</Nav.Link>
					<div className="navbar-separator"></div>
					<Nav.Link onClick={ handleTestClick }>
						<p className="navbar-text navbar-text-outline">Test</p>
					</Nav.Link>
				</Nav>
				<Nav className="navbar-nav-right">
					<Nav.Link as={ Link } to="/cart" className="navbar-nav-cart">
						<FontAwesomeIcon icon={ faShoppingCart }/>
						<p className="navbar-text">
							Carrito { cartProductsCount && cartProductsCount }
						</p>
					</Nav.Link>
					<Nav.Link as={ Link } to="/register" className="navbar-nav-user">
						<FontAwesomeIcon icon={ faUser }/>
						<p className="navbar-text">Ingresar</p>
					</Nav.Link>
					<SearchBar/>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
