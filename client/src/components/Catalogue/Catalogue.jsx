import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'query-string';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard.jsx';
import Checkable from '../Checkable/Checkable.jsx';
import loadingCircle from '../../assets/loading.svg';
import { loadUser } from '../../redux/action-creators/user';
import { toast } from 'react-toastify';
import Promise from 'bluebird';

const API_URL = process.env.REACT_APP_API_URL;

function Catalogue( props )
{
	const [ product, setProduct ] = useState( [ ] );
	const [ products, setProducts ] = useState( [ ] );
	const [ checked, setChecked ] = useState( [ ] );
	const [ expanded, setExpanded ] = useState( false );
	const [ loading, setLoading ] = useState( { products: true, categories: true } );
	
	const user = useSelector( ( state ) => state.user );
	const cart = useSelector( ( state ) => state.cart );
	const firstRender = useRef( true );
	const categories = useSelector( ( state ) => state.category.categories );
	const dispatch = useDispatch( );
	const history = useHistory( );
	
	const onChangeHandler = useCallback( ( status, id ) => {
		setChecked( ( state ) => {
			return status ? [ ...state, id ] : state.filter( c => c !== id );
		} );
	}, [ ] );

	const SetOrderToCarStatus = () => {
		axios.get(`${API_URL}/users/${user.id}/orders`, {withCredentials: true})
		.then(response =>  { 
			let CartOrder = response.data.filter(order => order.status === 'processing');
			return CartOrder;
			
		})
		.then(CartOrder => { if(CartOrder.length === 0) return; 
			return axios.put(`${API_URL}/orders/${CartOrder[0].id}`, {status: 'cart'}, {withCredentials: true})
		})
		.then(() => {
			return Promise.map( product, ( { id, stock, quantity } ) => {
				 return axios.put( `${ API_URL }/products/${ id }`,{ stock: stock + quantity}, { withCredentials: true });
			})
		})
	}

	useEffect( ( ) => {
		if ( !cart.products || ( cart.products.length === 0 ) ) {
			setProduct( [ ] );
			setLoading( false );
			
			return;
		}
		
		setLoading( true );
		
		Promise.map( cart.products, ( { productId } ) => {
			return axios.get( `${ API_URL }/products/${ productId }` );
		} )
		.then( ( responses ) => {
			const prodArray = responses.map( ( response, pos ) => {
				return { ...response.data, quantity: cart.products[ pos ].quantity };
			} );
			setProduct( prodArray );
			setLoading( false );
		} )
		.catch( ( ) => {
			toast.error( `¡Ha ocurrido un error al recuperar la información de los productos!`, {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			} );
		} );
	}, [ cart.count, cart.products ] );
	
	useEffect( ( ) => {

		SetOrderToCarStatus();

		if ( categories && ( categories.length > 0 ) ) {
			setLoading( ( state ) => ( { ...state, categories: false } ) );
		}
	}, [ categories ] );
	
	useEffect( ( ) => {
		if ( firstRender.current ) {
			firstRender.current = false;
			
			return;
		}
		
		let query = qs.parse( props.location.search, { arrayFormat: 'comma' } );
		
		query.categories = [ ...checked ];
		query = qs.stringify( query, { arrayFormat: 'comma' } );
		
		props.history.push( `/products?${ query }` );
	}, [ checked ] ); // eslint-disable-line
	
	useEffect( ( ) => {
		const { search } = props.location;
		
		axios.get( `${ API_URL }/products${ search }` ).then( ( response ) => {
			setProducts( response.data );
			setLoading( state => ( { ...state, products: false } ) );
		} );

		axios.get( `${ API_URL }/auth/logged`, { withCredentials: true })
		.then ( response => {	
			
			if (response.data) {
				return axios.get( `${ API_URL }/auth/me`, { withCredentials: true });
			}
		})
		.then(response => {
			if (response) {
				dispatch( loadUser( response.data ) )

				if (history.location.search === '?third'){

					toast.success( `¡Bienvenido ${response.data.firstName}!`, {
						position: 'top-center',
						autoClose: 1500,
						hideProgressBar: true,
						closeOnClick: true,
						pauseOnHover: false,
						draggable: true,
						progress: undefined
					} );
				}
			}
		})
		.catch(e => console.log(e))

		setLoading( state => ( { ...state, products: true } ) );
	}, [ props.location.search ] );  // eslint-disable-line
	
	if ( loading.categories )
	{
		return renderLoadingCircle( );
	}
	
			
	return (
		<Container className='catalogue__container'>
			<Row>
				<Col xs={ 7 } sm={ 8 } md={ 9 } xl={ 10 }>
					<Row>
						{
							!loading.products ?
								products.map( ( p, i ) => (
									<Col xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } key={ i } className='catalogue__product-col'>
										<Link to={ `/product/${ p.id }` } className='catalogue__product-link'>
											<ProductCard
												key={ i }
												id={ p.id }
												name={ p.name }
												price={ p.price }
												stock={ p.stock }
												media={ p.media }
												developer={ p.developer }
											/>
										</Link>
									</Col>
								) ) :
								
								<Col xs={ 12 }>{ renderLoadingCircle( ) }</Col>
						}
					</Row>
				</Col>
				<Col xs={ 5 } sm={ 4 } md={ 3 } xl={ 2 }>
					<div className='catalogue__filters'>
						<div className='catalogue__categories-list'>
							<div className='catalogue__categories-section-title'>
								Categorías
							</div>
							{
								categories.map( ( c, i ) => (
									<div key = { i } className='catalogue__categories-list-item' style={ { display: ( i < 7 || expanded ) ? 'block' : 'none' } }>
										<Checkable
											name={ c.name }
											id={ c.id }
											initial={ !!checked.find( ck => ck === c.id ) }
											onChange={ onChangeHandler }
										/>
									</div>
								) )
							}
							
							<button className='catalogue__expand-button' onClick={ ( ) => setExpanded( !expanded ) }>
								{ expanded ? 'Contraer' : 'Expandir' }
							</button>
						</div>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

function renderLoadingCircle( )
{
	return (
		<div>
			<img src={ loadingCircle } className='customLoadingSpinner' alt='Loading Circle'/>
		</div>
	);
}

export default Catalogue;