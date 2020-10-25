import * as actionTypes from '../action-types';
import { removeProductsFromCart, verifyCart } from './cart';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

/* =================================================================================
* 		[ Busca y carga un usuario por email y clave ]
* ================================================================================= */

export function loadUser( user )
{
	return function( dispatch ) {
		dispatch( {
			type: actionTypes.LOAD_USER,
			payload: user
		} );
		
		dispatch( verifyCart( user.id ) );
	};
}

/* =================================================================================
* 		[ Verifica que el usuario esté autorizado ]
* ================================================================================= */

export function verifyUser( user )
{
	return function( dispatch, getState ) {
		const isLogged = getState( ).user.isLogged;
		
		if ( !isLogged ) {
			dispatch( {
				type: actionTypes.VERIFY_USER_FAILED
			} );
			
			return;
		}
		
		axios.get( `${ API_URL }/auth/me`, {
			withCredentials: true
		} )
		.then( ( response ) => {
			const user = response.data;
			
			dispatch( {
				type: actionTypes.VERIFY_USER_SUCCESS,
				payload: user
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.VERIFY_USER_FAILED,
				error: error
			} );
		} );
	};
}

/* =================================================================================
* 		[ Remover un usuario (limpia el store, nada con la API) ]
* ================================================================================= */

export function removeUser( )
{
	return function( dispatch ) {
		dispatch( {
			type: actionTypes.REMOVE_USER
		} );
		
		dispatch( removeProductsFromCart( 0 ) );
	};
}