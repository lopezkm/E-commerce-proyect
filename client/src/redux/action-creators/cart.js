import * as actionTypes from '../action-types';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function createCart( user )
{
	if ( user <= 0 )
	{
		return {
			type: actionTypes.CREATE_CART,
			payload: response.data,
			error: null
		};
	}
	
	return function( dispatch ) {
		axios.post( `${ API_URL }/users/${ user }/cart` ).then( ( response ) => {
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

/*

export const CREATE_CART 				= 'CREATE_CART';
export const EMPTY_CART 				= 'EMPTY_CART';
export const ADD_PRODUCT_TO_CART 		= 'ADD_PRODUCT_TO_CART';
export const EDIT_PRODUCT_IN_CART 		= 'EDIT_PRODUCT_TO_CART';
export const GET_PRODUCTS_FROM_CART 	= 'GET_PRODUCTS_FROM_CART';

*/