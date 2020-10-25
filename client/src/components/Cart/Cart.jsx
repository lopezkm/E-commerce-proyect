import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import Promise from 'bluebird';
import CartCard from '../CartCard/CartCard.jsx';
import { EditProductInCart } from '../../redux/action-creators/cart';
import loadingCircle from '../../assets/loading.svg';

const API_URL = process.env.REACT_APP_API_URL;

const TAXES_PERCENT = 0.75;
const SHIPPING_COST = 3.0;

function Cart( )
{
	const [ products, setProducts ] = useState( [ ] );
	const [ loading, setLoading ] = useState( true );
	
	const cart = useSelector( ( state ) => state.cart );
	const user = useSelector( ( state ) => state.user );
	
	const productsPrice = useMemo( ( ) => products.reduce( ( a, p ) => a + ( p.price * p.quantity ), 0.0 ), [ products ] );
	const shippingCost = useMemo( ( ) => ( productsPrice && SHIPPING_COST ), [ productsPrice ] );
	const taxesCost = useMemo( ( ) => ( productsPrice * TAXES_PERCENT ), [ productsPrice ] );
	const totalPrice = useMemo( ( ) => ( productsPrice + shippingCost + taxesCost ), [ productsPrice, shippingCost, taxesCost ] );
	
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
	
	const handleProductQuantityChange = ( id, value ) => {
		const product = products.find( ( p ) => p.id === id );
		
		if ( !product || ( product.stock < value ) ) {
			toast.error( `¡No hay suficiente stock!`, {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				limit: 1,
				progress: undefined
			} );
			
			return;
		}
		
		dispatch( EditProductInCart( user.id, product.id, value ) );
	}
	
	useEffect( ( ) => {
		if ( !cart.products || ( cart.products.length === 0 ) ) {
			setProducts( [ ] );
			setLoading( false );
			
			return;
		}
		
		setLoading( true );
		
		Promise.map( cart.products, ( { productId } ) => {
			return axios.get( `${ API_URL }/products/${ productId }` );
		} )
		.then( ( responses ) => {
			const prodArray = responses.map( ( response, pos ) => {
				return { ...response.data, quantity: cart.products[ pos ].quantity };
			} );
			
			setProducts( prodArray );
			setLoading( false );
		} )
		.catch( ( ) => {
			toast.error( `¡Ha ocurrido un error al recuperar la información de los productos!`, {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			} );
		} );
	}, [ cart.count, cart.products ] );
	
	if ( loading ) {
		return renderLoadingCircle( );
	}
	
	if ( !products || !products.length ) {
		return renderEmptyCart( );
	}
	
	return (
		<Container className='cart__container'>
			<Row>
				<Col xs={8}>
					<Card className="cart__list">
						<Card.Header>
							<h1>Carrito de compra</h1>
						</Card.Header>
						<Card.Body>
							{
								products.map( ( p, i ) => (
									<Row key={ i }>
										<CartCard
											key={ i }
											id={ p.id }
											name={ p.name }
											description={ p.description }
											price={ p.price }
											quantity={ p.quantity }
											media={ p.media }
											onQuantityChange={ handleProductQuantityChange }
										/>
									</Row>
								) )
							}
						</Card.Body>
					</Card>
				</Col>
				<Col xs={4}>
					<Card className="cart__summary">
						<Card.Header>
							<span>Resumen del pedido</span>
						</Card.Header>
						<Card.Body>
							<Row>
								<Col><span>Articulos ({ cart.count }):</span></Col>
								<Col><span>{ productsPrice.toFixed( 2 ) } US$</span></Col>
							</Row>
							<Row>
								<Col><span>Envio:</span></Col>
								<Col><span>{ shippingCost.toFixed( 2 ) } US$</span></Col>
							</Row>
							<Row>
								<Col><span>Impuestos:</span></Col>
								<Col><span>{ taxesCost.toFixed( 2 ) } US$</span></Col>
							</Row>
						</Card.Body>
						<Card.Footer>
							<Row className="cart__total">
								<Col><span>Total:</span></Col>
								<Col><span>{ totalPrice.toFixed( 2 ) } US$</span></Col>
							</Row>
							<Row className="cart__button">
								<Col xs={12}>
									<Button className='cart__button-buy w-100' onClick={ handleBuyCartClick }>Proceder a pagar</Button>
								</Col>
							</Row>    
						</Card.Footer>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

function renderLoadingCircle( )
{
	return (
		<div>
			<img src={ loadingCircle } className='customLoadingSpinner' alt='Loading Circle'/>
		</div>
	);
}

function renderEmptyCart( )
{
	return (
		<div className="cart__emptyCart">
			<h2>No tienes artículos en el carrito.</h2>
			<p>¿Tienes una cuenta? <Link to='/login'>Inicia sesión</Link> para ver tus artículos.</p>
		</div>
	);
}

export default Cart;