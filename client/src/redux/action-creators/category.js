import * as actionTypes from '../action-types';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function addCategory( name, description )
{
	return function( dispatch ) {
		axios.post( `${ API_URL }/products/category`, {
			name, description
		} )
		.then( ( response ) => {
			dispatch( {
				type: actionTypes.ADD_CATEGORY,
				payload: response.data,
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.ADD_CATEGORY,
				payload: null,
				error: error
			} );
		} );
	};
}

export function getCategories( )
{
	return function( dispatch ) {
		axios.get( `${ API_URL }/products/category` ).then( ( response ) => {
			dispatch( {
				type: actionTypes.GET_CATEGORIES,
				payload: response.data,
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.GET_CATEGORIES,
				payload: null,
				error: error
			} );
		} );
	};
}

/*export function removeMovieFavorite( payload )
{
	return {
		type: REMOVE_MOVIE_FAVORITE,
		payload
	};
}*/