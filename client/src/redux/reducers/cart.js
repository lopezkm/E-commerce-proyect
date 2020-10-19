import * as actionTypes from '../action-types';

const initialState = {
	cart: [ ],
	count: 0
};

function reducer( state = initialState, action )
{
	switch ( action.type )
	{
		case actionTypes.EDIT_PRODUCT_IN_CART:
		{
			const list = [ ...state.cart.filter( ( value ) => value.productId !== action.payload.productId ) ];
			
			if ( action.payload.quantity > 0 )
			{
				list.push( action.payload );
			}
			
			return {
				cart: list,
				count: ( list.length )
			};
		}
		case actionTypes.REMOVE_PRODUCTS_FROM_CART:
		{
			return {
				cart: [ ],
				count: 0
			};
		}
		default:
		{
			return state;
		}
	}
}

export default reducer;