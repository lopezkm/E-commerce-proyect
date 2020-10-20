import { combineReducers } from 'redux';

import cartReducer from './cart';
import categoryReducer from './category';
import userReducer from './user';

export default combineReducers( {
	cart: cartReducer,
	category: categoryReducer,
	user: userReducer
} );