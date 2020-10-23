import * as actionTypes from '../action-types';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

/* =================================================================================
* 		[ Busca y carga un usuario por email y clave ]
* ================================================================================= */

export function LoadUser( user )
{
	return {
		type: actionTypes.LOAD_USER,
		payload: user,
		error: null
	};
}

/* =================================================================================
* 		[ Remover un usuario (limpia el store, nada con la API) ]
* ================================================================================= */

export function RemoveUser( )
{
	return {
		type: actionTypes.REMOVE_USER,
		error: null
	};
}