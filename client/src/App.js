import React, { useState } from 'react';
import Product from './components/product.jsx';
import './App.css';
import NavBar from './components/nav_bar.jsx';
import FormAdmin from './components/form_admin.jsx';
import { Route, Redirect } from 'react-router-dom';
import Catalogue from './components/catalogue.jsx'
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
			<Route exact path="/catalogue" component={ Catalogue } />
			<Route exact path ='/product/:productId' render={ ( { match } ) =>
				<Product 
					productId = { match.params.productId }
				/>
			} />
		</div>
	);
}

export default App;
