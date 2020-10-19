import * as actionTypes from '../action-types';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

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