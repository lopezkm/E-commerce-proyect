import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import CartCard from '../CartCard/CartCard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBacksspanace, faCashRegister } from '@fortawesome/free-solid-svg-icons';
import loadingCircle from '../../assets/loading.svg';
import { useEffect } from 'react';

const TAXES_PERCENT = 0.75;
const SHIPPING_COST = 100;

function Cart( )
{
	const [ products, setProducts ] = useState( [ ] );
	const [ loading, setLoading ] = useState( true );
	
	const cart = useSelector( ( state ) => state.cart );
	const user = useSelector( ( state ) => state.user );
	
	const productsPrice = useMemo( ( ) => products.reduce( ( a, p ) => a + p.price, 0.0 ), [ products ] );
	const shippingCost = useMemo( ( ) => ( productsPrice && SHIPPING_COST ), [ productsPrice ] );
	const taxesCost = useMemo( ( ) => ( productsPrice * TAXES_PERCENT ), [ productsPrice ] );
	const totalPrice = useMemo( ( ) => ( productsPrice + shippingCost + taxesCost ), [ productsPrice ] );
	
	const dispatch = useDispatch( );
	
	const handleBuyCartClick = ( e ) => {
		e.preventDefault( );
		
		if ( user.id === 0 ) {
			toast.error( `¡Regístrate o ingresa con tu cuenta para proceder a pagar!`, {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			} );
		}
	};
	
	return (
		<Container className='cart-container'>
			<Row>
				<Col xs={8}>
					<Card className="cart-list">
						<Card.Header><h1>Carrito de compra</h1></Card.Header>
						<Card.Body>
							<Row>
								<CartCard>
								</CartCard>
							</Row>
							<Row>
								<CartCard>
								</CartCard>
							</Row>
						</Card.Body>
					</Card>
				</Col>
				<Col xs={4}>
					<Card className="cart-summary">
						<Card.Header>
							<span>Resumen del pedido</span>
						</Card.Header>
						<Card.Body>
							<Row>
								<Col><span>Articulos (2):</span></Col>
								<Col><span>${ productsPrice }</span></Col>
							</Row>
							<Row>
								<Col><span>Envio:</span></Col>
								<Col><span>${ shippingCost }</span></Col>
							</Row>
							<Row>
								<Col><span>Impuestos:</span></Col>
								<Col><span>${ taxesCost }</span></Col>
							</Row>
						</Card.Body>
						<Card.Footer>
							<Row className="cart-total">
								<Col><span>Total:</span></Col>
								<Col><span>{ totalPrice }</span></Col>
							</Row>
							<Row className="cart-button">
								<Col xs={12}>
									<Button className='cart-button-buy w-100' onClick={ handleBuyCartClick }>Proceder a pagar</Button>
								</Col>
							</Row>    
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

export default Cart;