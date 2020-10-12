import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.scss';

import Product from './components/product.jsx';
import NavBar from './components/nav_bar.jsx';
import FormAdmin from './components/form_admin.jsx';
import Catalogue from './components/Catalogue/Catalogue.jsx'
import FormAdd from './components/form_add_category.jsx'
import Result from './components/search_results.jsx'

function App( )
{
	const [products, setProducts] = useState({});
	const [redirect, setRedirect] = useState({
		validate: false
	})

	const findProducts = ( product ) => {
        axios.get( `http://localhost:3000/search?query=${product}` )
			.then( response => {
				setProducts(response);
		});	
	};

	return (
		<div className= 'container-fluid' style={{ padding: 0}}>
			<Route path="/" render={() => <NavBar findProducts={findProducts}/>} />
			<Route path="/searched" render={() => <Result products={products}/>} />
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
