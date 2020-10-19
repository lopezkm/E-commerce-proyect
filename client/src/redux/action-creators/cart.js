import * as actionTypes from '../action-types';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function createCart( userId )
{
	if ( userId <= 0 )
	{
		return {
			type: actionTypes.CREATE_CART,
			payload: [ ],
			error: null
		};
	}
	
	return function( dispatch ) {
		axios.post( `${ API_URL }/users/${ userId }/cart` ).then( ( response ) => {
			dispatch( {
				type: actionTypes.CREATE_CART,
				payload: response.data,
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.CREATE_CART,
				payload: null,
				error: error
			} );
		} );
	};
}

export function emptyCart( userId )
{
	if ( userId <= 0 )
	{
		return {
			type: actionTypes.EMPTY_CART,
			error: null
		};
	}
	
	return function( dispatch ) {
		axios.post( `${ API_URL }/users/${ userId }/cart` ).then( ( response ) => {
			dispatch( {
				type: actionTypes.EMPTY_CART,
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.EMPTY_CART,
				error: error
			} );
		} );
	};
}

export function editProductInCart( userId, productId, quantity )
{
	if ( userId <= 0 )
	{
		return {
			type: actionTypes.EDIT_PRODUCT_IN_CART,
			payload: productId,
			error: null
		};
	}
	
	return function( dispatch ) {
		axios.post( `${ API_URL }/users/${ userId }/cart` ).then( ( response ) => {
			dispatch( {
				type: actionTypes.EDIT_PRODUCT_IN_CART,
				payload: productId,
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

/*

export const CREATE_CART 				= 'CREATE_CART';
export const EMPTY_CART 				= 'EMPTY_CART';
export const EDIT_PRODUCT_IN_CART 		= 'EDIT_PRODUCT_TO_CART';
export const GET_PRODUCTS_FROM_CART 	= 'GET_PRODUCTS_FROM_CART';

*/