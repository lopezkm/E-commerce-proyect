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
				cart: [ ],
				created: true
			};
		
		case actionTypes.EMPTY_CART:
		
			return {
				...state,
				cart: [ ]
			};
		
		case actionTypes.EDIT_PRODUCT_IN_CART:
	
			return {
				...state,
				cart: [ ...cart, action.payload ]
			};
		
		default:
			
			return state;
	}
}

export default reducer;