import * as actionTypes from '../action-types';

const initialState = {
	products: [ ],
	count: 0
};

function reducer( state = initialState, action )
{
	switch ( action.type )
	{
		case actionTypes.EDIT_PRODUCT_IN_CART:
		{
			const productsList = [ ...state.products.filter( ( value ) => value.productId !== action.payload.productId ) ];
			
			if ( action.payload.quantity > 0 )
			{
				productsList.push( action.payload );
			}
			
			const productsCount = productsList.reduce( ( a, p ) => a + p.quantity, 0 );
			
			return {
				products: productsList,
				count: productsCount
			};
		}
		case actionTypes.REMOVE_PRODUCTS_FROM_CART:
		{
			return {
				products: [ ],
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