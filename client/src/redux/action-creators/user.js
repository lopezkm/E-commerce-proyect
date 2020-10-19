import * as actionTypes from '../action-types';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function loadUser( email, password )
{
	return function( dispatch ) {
		axios.post( `${ API_URL }/users/auth`, {
			email, password
		} )
		.then( ( response ) => {
			dispatch( {
				type: actionTypes.LOAD_USER,
				payload: response.data,
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.LOAD_USER,
				payload: null,
				error: error
			} );
		} );
	};
}

export function removeUser( )
{
	return {
		type: actionTypes.REMOVE_USER,
		error: null
	};
}