import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./redux/store/store.js";
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
	<Provider store={ store }>
		<PersistGate persistor={ persistor }>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	
	document.getElementById( 'root' )
);

serviceWorker.unregister( );