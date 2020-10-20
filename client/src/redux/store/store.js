import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js';

/* =================================================================================
* 		[ Añade la posibilidad de usar Redux DevTools ]
* ================================================================================= */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* =================================================================================
* 		[ Se crea un store con los reducers y los middlewares ]
* ================================================================================= */

const store = createStore(
	rootReducer,
	composeEnhancers( applyMiddleware( thunk ) )
);

/* =================================================================================
* 		[ Se exporta el store ]
* ================================================================================= */

export default store;