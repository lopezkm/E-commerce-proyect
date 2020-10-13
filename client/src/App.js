import React from 'react';
import { Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.scss';

import Product from './components/Product/product.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import FormAdminCreate from './components/FormAdmin/form_admin_create.jsx';
import FormAdminDelete from './components/FormAdmin/form_admin_delete.jsx';
import FormAdminModify from './components/FormAdmin/form_admin_modify.jsx';
import Catalogue from './components/Catalogue/Catalogue.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import FormAdd from './components/form_add_category.jsx'
import Result from './components/search_results.jsx'


function App( )
{
	return (
		<div className= 'container-fluid' style={{ padding: 0}}>
			<Route path="/" component={() => <NavBar/>} />
			<Route path="/search/:product" render={({ match }) => <Result products={ match.params.product }/>} />
			<Route path='/Admin/create' component={ FormAdminCreate } />
			<Route path='/Admin/delete' component={ FormAdminDelete } />
			<Route path='/Admin/modify' component={ FormAdminModify } />
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