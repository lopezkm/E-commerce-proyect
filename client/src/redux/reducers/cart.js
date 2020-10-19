import * as actionTypes from '../action-types';

const initialState = {
	cart: [ ]
};

function reducer( state = initialState, action )
{
	switch ( action.type )
	{
		case actionTypes.CREATE_CART:
		
			return {
				...state,
				cart: action.payload
			};
		
		default:
			
			return state;
	}
}

export default reducer;