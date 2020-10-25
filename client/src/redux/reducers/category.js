import * as actionTypes from '../action-types';

const initialState = {
	categories: [ ]
};

function reducer( state = initialState, action )
{
	switch ( action.type )
	{
		case actionTypes.ADD_CATEGORY:
		
			return {
				...state,
				categories: [ ...state.categories, action.payload ]
			};
		
		case actionTypes.MODIFY_CATEGORY:
			
			return {
				...state,
				categories: [ ...state.categories.filter( c => c.id !== action.payload.id ), action.payload ]
			}
		
		case actionTypes.DELETE_CATEGORY:
			
			return {
				...state,
				categories: state.categories.filter( c => c.id !== action.payload.id )
			}
		
		case actionTypes.LOAD_CATEGORIES:
			
			return {
				...state,
				categories: action.payload
			}
		
		default:
			
			return state;
	}
}

export default reducer;