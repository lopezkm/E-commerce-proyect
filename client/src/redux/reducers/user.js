import * as actionTypes from '../action-types';

const initialState = {
	id: 0,
	firstName: 'Invitado',
	lastName: '',
	email: '',
	isAdmin: false
};

function reducer( state = initialState, action )
{
	switch ( action.type )
	{
		case actionTypes.LOAD_USER:
		{
			return {
				...state,
				id: action.payload.id,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				email: action.payload.email,
				isAdmin: action.payload.isAdmin
			};
		}
		case actionTypes.REMOVE_USER:
		{
			return initialState;
		}
		default:
		{
			return state;
		}
	}
}

export default reducer;