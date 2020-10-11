import React from 'react';
import ProdCard from './components/product_card.jsx';
import Product from './components/product.jsx';
import './App.css';
import NavBar from './components/nav_bar.jsx';
import FormAdmin from './components/form_admin.jsx';
import { Route } from 'react-router-dom';
import Catalogue from './components/Catalogue/catalogue.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import FormAdd from './components/form_add_category.jsx'

function App() {
	return (
		<div className= 'container-fluid' style={{ padding: 0}}>
			<Route path="/" component={ NavBar } />
			
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
