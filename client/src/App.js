import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.scss';

import Product from './components/product.jsx';
import NavBar from './components/nav_bar.jsx';
import FormAdmin from './components/form_admin.jsx';
import Catalogue from './components/Catalogue/catalogue.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import FormAdd from './components/form_add_category.jsx'
import Result from './components/search_results.jsx'


function App() {
	
	return (
		<div className= 'container-fluid' style={{ padding: 0}}>
			<Route path="/" component={() => <NavBar/>} />
			<Route path="/search/:product" render={({ match }) => <Result products={ match.params.product }/>} />
			<Route path='/admin' component={ FormAdmin } />
			<Route exact path="/categories" component={ FormAdd } />
			<Route exact path="/products" component={ Catalogue } />
			<Route exact path ='/product/:productId' render={ ( { match } ) =>
				<Product 
					productId = { match.params.productId }
				/>
			} />
		</div>
	);
}

export default App;
