import * as actionTypes from '../action-types';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function addCategory( name )
{
	return function( dispatch ) {
		axios.post( `${ API_URL }/products/category`, {
			name
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

export function modifyCategory( id, name )
{
	return function( dispatch ) {
		axios.put( `${ API_URL }/products/category/${ id }`, {
			name
		} )
		.then( ( response ) => {
			dispatch( {
				type: actionTypes.MODIFY_CATEGORY,
				payload: response.data,
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.MODIFY_CATEGORY,
				payload: null,
				error: error
			} );
		} );
	};
}

export function deleteCategory( id )
{
	return function( dispatch ) {
		axios.delete( `${ API_URL }/products/category/${ id }` ).then( ( response ) => {
			dispatch( {
				type: actionTypes.DELETE_CATEGORY,
				payload: { id },
				error: null
			} );
		} )
		.catch( ( error ) => {
			dispatch( {
				type: actionTypes.DELETE_CATEGORY,
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