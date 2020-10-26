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
			let productsList = [ ...state.products.filter( ( value ) => value.productId !== action.payload.productId ) ];
			let productsCount = productsList.reduce( ( a, p ) => ( a + p.quantity ), 0 );
			
			if ( action.payload.quantity > 0 )
			{
				productsList.push( action.payload );
				productsCount += action.payload.quantity;
			}
			
			productsList = productsList.sort( ( a, b ) => a.productId - b.productId );
			
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
		case actionTypes.VERIFY_CART_SUCCESS:
		{
			let productsList = action.payload.sort( ( a, b ) => a.productId - b.productId );
			let productsCount = productsList.reduce( ( a, p ) => ( a + p.quantity ), 0 );
			
			return {
				products: productsList,
				count: productsCount
			};
		}
		case actionTypes.CART_ERROR:
		{
			return state;
		}
		default:
		{
			return state;
		}
	}
}

export default reducer;