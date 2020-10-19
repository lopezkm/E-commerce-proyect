import * as actionTypes from '../action-types';

const initialState = {
	categories: [ ],
	error: ''
};

function reducer( state = initialState, action )
{
	switch ( action.type )
	{
		case actionTypes.ADD_CATEGORY:
		
			return {
				...state,
				categories: [ ...state.categories, action.payload ],
				error: action.error
			};
		
		case actionTypes.GET_CATEGORIES:
			
			return {
				...state,
				categories: action.payload,
				error: action.error
			}
		
		default:
			
			return state;
	}
}

export default reducer;