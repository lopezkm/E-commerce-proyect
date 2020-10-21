import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import defaultStorage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';

/* =================================================================================
* 		[ Añade la posibilidad de usar Redux DevTools ]
* ================================================================================= */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* =================================================================================
* 		[ Se configura el persistor para únicamente guardar el carrito ]
* ================================================================================= */

const persistConfig = {
	key: 'root',
	storage: defaultStorage,
	whitelist: [ 'cart' ]
}

const persistedReducer = persistReducer(
	persistConfig,
	rootReducer
);

/* =================================================================================
* 		[ Se crea un store con sus middlewares y un persistor del mismo ]
* ================================================================================= */

const store = createStore(
	persistedReducer,
	composeEnhancers( applyMiddleware( thunk ) )
);

const persistor = persistStore(
	store
);

/* =================================================================================
* 		[ Se exporta el store y el persistor ]
* ================================================================================= */

export {
	store,
	persistor
};