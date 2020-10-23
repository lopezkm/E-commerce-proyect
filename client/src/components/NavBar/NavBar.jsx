import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../assets/logofull.svg';
import SearchBar from '../SearchBar/SearchBar.jsx';

function NavBar( props ){

	const cartProductsCount = useSelector( ( state ) => ( state.cart.count > 0 ) ? `${ state.cart.count }` : null );
	const userFirstName = useSelector( ( state ) => ( state.user.id > 0 ) ? state.user.firstName : null );

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
				</Nav>
				<Nav className="navbar-nav-right">
					<Nav.Link as={ Link } to="/cart" className="navbar-nav-cart">
						<FontAwesomeIcon icon={ faShoppingCart }/>
						<p className="navbar-text">
							Carrito <span className="cart-count">{ cartProductsCount && cartProductsCount }</span>
						</p>
					</Nav.Link>
					<Nav.Link as={ Link } to="/register" className="navbar-nav-user">
						<FontAwesomeIcon icon={ faUser }/>
						<p className="navbar-text">
							{ userFirstName || 'Ingresar' }
						</p>
					</Nav.Link>
					<SearchBar/>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
