import * as actionTypes from '../action-types';

const initialState = {
	cart: [ ],
	created: false
};

function reducer( state = initialState, action )
{
	switch ( action.type )
	{
		case actionTypes.CREATE_CART:
		
			return {
				...state,
				cart: [ ]
			};
		
		case actionTypes.EMPTY_CART:
		
			return {
				...state,
				cart: [ ],
				created: true
			};
		
		default:
			
			return state;
	}
}

export default reducer;