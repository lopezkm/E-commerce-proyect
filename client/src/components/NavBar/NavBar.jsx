import React from 'react';
import { useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';
import { Nav, Navbar, Card, DropdownButton, ButtonGroup,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../../assets/logofull.svg';
import SearchBar from '../SearchBar/SearchBar.jsx';

function NavBar(props) {

	const cartProductsCount = useSelector((state) => (state.cart.count > 0) ? `${state.cart.count}` : null);
	const userFirstName = useSelector((state) => (state.user.id > 0) ? state.user.firstName : null);

	return (
		<Navbar collapseOnSelect expand="lg" fixed="top" variant="dark" className="navbar-main">
			<Navbar.Brand>
				<Logo className="navbar-logo" />
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="navbarCollapse">
				<FontAwesomeIcon icon={faBars} className="navbar-open-menu" />
				<FontAwesomeIcon icon={faTimes} className="navbar-close-menu" />
			</Navbar.Toggle>
			<Navbar.Collapse id="navbarCollapse">
				<Nav className="navbar-nav-left">

					<NavLink as={ Link }  exact activeClassName= "active"  to="/products">
						<p className="navbar-text navbar-text-outline">Tienda</p>
					</NavLink>
					<div className="navbar-separator"></div>
					<NavLink as={ Link }  exact activeClassName="active" to="/admin">
						<p className="navbar-text navbar-text-outline">Administración</p>
					</NavLink>
				</Nav>
				<Nav className="navbar-nav-right">

					<NavLink as={ Link } exact activeClassName="active" to="/cart" className="navbar-nav-cart">
						<FontAwesomeIcon icon={ faShoppingCart }/>
						<p className="navbar-text">
							Carrito <span className="cart-count">{cartProductsCount && cartProductsCount}</span>
						</p>
					</NavLink>
					{userFirstName ? 
					<DropdownButton
						as={ButtonGroup}
						menuAlign={{ lg: 'right' }}
						icon = {<FontAwesomeIcon icon={ faUser }/>}
						title={
							<p className="navbar-text">
								{ userFirstName }
							</p>}
						id="dropdown-menu-align-responsive-1"
						>
						<Card>
							<Card.Header bsPrefix="card-header">
								<Card.Title bsPrefix="card-title">Hola  {/* {user.firstName} */} Matias</Card.Title>
							</Card.Header>
							
							<Card.Body bsPrefix="card-body">
								<Link to="/login/logued/shops">
									<Card.Text bsPrefix="card-text">Mis Compras</Card.Text>
								</Link>
								<div>
									<hr/>
								</div>
								<Link>
									<Card.Text>Mis Datos</Card.Text>
								</Link>
								<div>
									<hr/>
								</div>
								<Link>
									<Card.Text>Seguridad</Card.Text>
								</Link>
							</Card.Body>
							<Card.Footer>
								<Button variant="ligth" className="card-button">Salir</Button>
							</Card.Footer>
						</Card>
					</DropdownButton> :
					<NavLink as={ Link } className="navbar-nav-user" exact activeClassName="active" to="/register" >
						<FontAwesomeIcon icon={ faUser }/>
						<p className="navbar-text">
							{ userFirstName || 'Ingresar' }
						</p>
					</NavLink>}
					<SearchBar/>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
