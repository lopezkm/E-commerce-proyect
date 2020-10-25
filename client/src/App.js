import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { GetCategories } from './redux/action-creators/category';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

import Product from './components/Product/Product.jsx';
import Catalogue from './components/Catalogue/Catalogue.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import Order from './components/Order/Order.jsx';
import FormAdd from './components/FormAdmin/form_add_category.jsx';
import FormDelete from './components/FormAdmin/form_delete_category.jsx';
import FormModify from './components/FormAdmin/form_modify_category.jsx';
import FormAdminCreate from './components/FormAdmin/form_admin_create.jsx';
import FormAdminDelete from './components/FormAdmin/form_admin_delete.jsx';
import FormAdminModify from './components/FormAdmin/form_admin_modify.jsx';
import FormCreateUser from './components/FormCreateUser/FormCreateUser.jsx';
import OrderTable from './components/FormAdmin/OrderTable/orderTable.jsx';
import Cart from './components/Cart/Cart.jsx';
import PanelAdmin from './components/PanelAdmin/PanelAdmin.jsx';
import Home from './components/Home/Home.jsx'
import FormAddReview from './components/FormReview/FormAddReview.jsx';
import FormModifyReview from './components/FormReview/FormModifyReview.jsx';
import FormUserLogin from './components/FormUserLogin/FormUserLogin.jsx';

import  UserShops from './components/UserShops/UserShops.jsx';

function App( )
{
	const dispatch = useDispatch( );
	
	useEffect( ( ) => {
		dispatch( GetCategories( ) );
	}, [ dispatch ] );
	
	return (
		<Container fluid className="app">
			<Route exact path='/login/logued/shops' component={ UserShops } />
			
			<Route path='/' component={ ( ) => <NavBar/> }/>
			<Route exact path='/' component={ Home }/>
			<Route exact path='/Admin' component={ PanelAdmin } />
			<Route exact path='/Admin/create' component={ FormAdminCreate } />
			<Route exact path='/Admin/delete' component={ FormAdminDelete } />
			<Route exact path='/Admin/modify' component={ FormAdminModify } />
			<Route exact path="/Admin/categories" component={ FormAdd } />
			<Route exact path="/Admin/categoriesD" component={ FormDelete } />
			<Route exact path="/Admin/categoriesM" component={ FormModify } />
			<Route exact path='/register' component={ FormCreateUser } />
			<Route exact path='/login' component={ FormUserLogin } />
			<Route exact path="/Admin/orders" component={ OrderTable } />
			<Route exact path="/products" component={ Catalogue } />
			<Route exact path ='/product/:productId/modifyReview' render={ ( { match } ) =>
				<FormModifyReview productId={ match.params.productId }/>
			} />
			<Route exact path ='/product/:productId/review' render={ ( { match } ) =>
				<FormAddReview productId={ match.params.productId }/>
			} />
			<Route exact path ='/orders/:orderId' render={ ( { match } ) =>
				<Order orderId={ match.params.orderId }/>
			} />
			<Route exact path='/product/:productId' render={ ( { match } ) =>
				<Product productId={ match.params.productId }/>
			} />
			<Route exact path='/Cart' component={ Cart } />
		</Container>
	);
}

export default App;