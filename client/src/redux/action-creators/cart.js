import * as actionTypes from '../action-types';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

/* =================================================================================
* 		[ Verifica y sincroniza el carrito de un usuario ]
* ================================================================================= */

/*
	Si no tiene un carrito creado, le crea uno.
	Si tiene un carrito creado, lo sincroniza con su carrito actual de invitado.
*/

export function verifyCart( userId )
{
	if ( userId <= 0 )
	{
		return {
			type: actionTypes.VERIFY_CART_FAILED
		};
	}
	
	return function( dispatch, getState ) {
		const { products } = getState( ).cart;
		
		axios.get( `${ API_URL }/users/${ userId }/cart`, {
			withCredentials: true
		} )
		.then( ( response ) => {
			const mergedProducts = UTIL_MergeProducts( products, response.data );
			
			dispatch( {
				type: actionTypes.VERIFY_CART_SUCCESS,
				payload: mergedProducts
			} );
		} )
		.catch( ( error ) => {
			if ( !error.request || ( error.request.status !== 404 ) ) {
				dispatch( {
					type: actionTypes.VERIFY_CART_FAILED,
					error: error
				} );
				
				return null;
			}
			
			return axios.post( `${ API_URL }/users/${ userId }/cart`, { }, {
				withCredentials: true
			} );
		} )
		.then( ( response ) => {
			if ( !response ) {
				return;
			}
			
			dispatch( {
				type: actionTypes.VERIFY_CART_SUCCESS,
				payload: products
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.VERIFY_CART_FAILED,
				error: error
			} );
		} );
	};
}

/* =================================================================================
* 		[ Agrega un producto al carrito ]
* ================================================================================= */

/*
	Si no hay producto, y se agrega un producto, se agrega con cantidad 1.
	Si un producto existe, se edita ese producto incrementando su cantidad en 1.
*/

export function addProductToCart( userId, productId )
{
	if ( userId <= 0 )
	{
		return function( dispatch, getState ) {
			const cartProduct = getState( ).cart.products.find( ( value ) => value.productId === productId );
			const quantity = !cartProduct ? 1 : ( cartProduct.quantity + 1 );
			
			dispatch( {
				type: actionTypes.EDIT_PRODUCT_IN_CART,
				payload: { productId, quantity },
				error: null
			} );
		};
	}
	
	return function( dispatch, getState ) {
		const cartProduct = getState( ).cart.products.find( ( value ) => value.productId === productId );
		const quantity = !cartProduct ? 1 : ( cartProduct.quantity + 1 );
		
		axios.put( `${ API_URL }/users/${ userId }/cart`, {
			productId,
			quantity
		}, {
			withCredentials: true
		} )
		.then( ( response ) => {
			dispatch( {
				type: actionTypes.EDIT_PRODUCT_IN_CART,
				payload: { productId, quantity },
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.EDIT_PRODUCT_IN_CART,
				payload: null,
				error: error
			} );
		} );
	};
}

/* =================================================================================
* 		[ Editar un producto del carrito ]
* ================================================================================= */

/*
	Si no hay producto, y se edita un producto, se agrega con esa cantidad.
	Si un producto existe, se edita ese producto con la cantidad ingresada.
	Si la cantidad es nula, el producto se elimina del carrito.
*/

export function editProductInCart( userId, productId, quantity )
{
	if ( userId <= 0 )
	{
		return {
			type: actionTypes.EDIT_PRODUCT_IN_CART,
			payload: { productId, quantity },
			error: null
		};
	}
	
	return function( dispatch ) {
		axios.put( `${ API_URL }/users/${ userId }/cart`, {
			productId,
			quantity
		}, {
			withCredentials: true
		} )
		.then( ( response ) => {
			dispatch( {
				type: actionTypes.EDIT_PRODUCT_IN_CART,
				payload: { productId, quantity },
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.EDIT_PRODUCT_IN_CART,
				payload: null,
				error: error
			} );
		} );
	};
}

/* =================================================================================
* 		[ Remover productos del carrito ]
* ================================================================================= */

export function removeProductsFromCart( userId )
{
	if ( userId <= 0 )
	{
		return {
			type: actionTypes.REMOVE_PRODUCTS_FROM_CART,
			error: null
		};
	}
	
	return function( dispatch ) {
		axios.delete( `${ API_URL }/users/${ userId }/cart`, {
			withCredentials: true
		} )
		.then( ( response ) => {
			dispatch( {
				type: actionTypes.REMOVE_PRODUCTS_FROM_CART,
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.REMOVE_PRODUCTS_FROM_CART,
				error: error
			} );
		} );
	};
}

/* =================================================================================
* 		[ Función de utilidad para realizar un merge entre los
* 		  productos que tiene el usuario en su carrito actual
*		 y los que tenía guardados anteriormente en su cuenta ]
* ================================================================================= */

function UTIL_MergeProducts( cartProducts, userProducts )
{
	const merger = ( acc, curr ) => {
		if ( !acc.includes( curr ) ) {
			acc.push( { productId: curr.id, quantity: curr.OrderProduct.quantity } );
		}
		
		return acc;
	};
	
	return userProducts.reduce( merger, cartProducts );
}