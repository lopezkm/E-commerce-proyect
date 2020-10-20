import * as actionTypes from '../action-types';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

/* =================================================================================
* 		[ Agrega un producto al carrito ]
* ================================================================================= */

/*
	Si no hay producto, y se agrega un producto, se agrega con cantidad 1.
	Si un producto existe, se edita ese producto incrementando su cantidad en 1.
*/

export function AddProductToCart( userId, productId )
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
		const quantity = cartProduct ? 1 : ( cartProduct.quantity + 1 );
		
		axios.put( `${ API_URL }/users/${ userId }/cart`, {
			productId,
			quantity
		} ).then( ( response ) => {
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

export function EditProductInCart( userId, productId, quantity )
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
		} ).then( ( response ) => {
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

export function RemoveProductsFromCart( userId )
{
	if ( userId <= 0 )
	{
		return {
			type: actionTypes.REMOVE_PRODUCTS_FROM_CART,
			error: null
		};
	}
	
	return function( dispatch ) {
		axios.delete( `${ API_URL }/users/${ userId }/cart` ).then( ( response ) => {
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