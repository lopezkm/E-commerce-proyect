import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import defaultStorage from 'redux-persist/lib/storage';
import sessionStorage from 'redux-persist/lib/storage/session';

import cartReducer from '../reducers/cart';
import categoryReducer from '../reducers/category';
import userReducer from '../reducers/user';

/* =================================================================================
* 		[ Se combinan y configuran los distintos reducers ]
* ================================================================================= */

const rootPersistConfig = {
	key: 'root',
	storage: defaultStorage,
	whitelist: [ 'cart' ]
};

const authPersistConfig = {
	key: 'user',
	storage: sessionStorage
};

const rootReducer = combineReducers( {
	cart: cartReducer,
	category: categoryReducer,
	user: persistReducer( authPersistConfig, userReducer )
} );

const persistedReducer = persistReducer(
	rootPersistConfig,
	rootReducer
);

/* =================================================================================
* 		[ Se crea el store y un persistor del mismo ]
* ================================================================================= */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	persistedReducer,
	composeEnhancers( applyMiddleware( thunk ) )
);

const persistor = persistStore(
	store
);

/* =================================================================================
* 		[ Se exporta store y persistor ]
* ================================================================================= */

export {
	store,
	persistor
};