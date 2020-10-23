import * as actionTypes from '../action-types';

const initialState = {
	id: 0,
	firstName: '',
	lastName: '',
	email: '',
	accessLevel: 0,
	isLogged: false
};

function reducer( state = initialState, action )
{
	switch ( action.type )
	{
		case actionTypes.LOAD_USER:
		{
			return {
				...action.payload,
				isLogged: true
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