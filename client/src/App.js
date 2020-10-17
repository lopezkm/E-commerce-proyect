import React from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.scss';

import Product from './components/Product/Product.jsx';
import Catalogue from './components/Catalogue/Catalogue.jsx'
import NavBar from './components/NavBar/NavBar.jsx';
import Result from './components/search_results.jsx'
import Order from './components/Order/Order.jsx'
import CreateUser from './components/FormCreateUser/FormCreateUser.jsx'
import FormAdd from './components/FormAdmin/form_add_category.jsx'
import FormAdminCreate from './components/FormAdmin/form_admin_create.jsx';
import FormAdminDelete from './components/FormAdmin/form_admin_delete.jsx';
import FormAdminModify from './components/FormAdmin/form_admin_modify.jsx';
import Cart from './components/Cart/Cart.jsx';
import PanelAdmin from './components/PanelAdmin/PanelAdmin.jsx';

function App( )
{
	return (
		<Container fluid>
			<Route path="/" component={ ( ) => <NavBar/> }/>
			<Route path="/search/:product" render={ ( { match } ) => <Result products={ match.params.product }/> }/>
			<Route exact path='/Admin' component={ PanelAdmin } />
			<Route exact path='/Admin/create' component={ FormAdminCreate } />
			<Route exact path='/Admin/delete' component={ FormAdminDelete } />
			<Route exact path='/Admin/modify' component={ FormAdminModify } />
			<Route exact path="/Admin/categories" component={ FormAdd } />
			<Route exact path='/order' component={ Order } />
			<Route exact path='/createUser' component={ CreateUser } />
			<Route exact path="/products" component={ Catalogue } />
			<Route exact path ='/product/:productId' render={ ( { match } ) =>
				<Product 
					productId = { match.params.productId }
				/>
			} />
			<Route exact path='/Cart' component={ Cart } />
		</Container>
	);
}

export default App;