import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'query-string';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard.jsx';
import Checkable from '../Checkable/Checkable.jsx';
import loadingCircle from '../../assets/loading.svg';
import { loadUser } from '../../redux/action-creators/user';

const API_URL = process.env.REACT_APP_API_URL;

function Catalogue( props )
{
	const [ products, setProducts ] = useState( [ ] );
	const [ checked, setChecked ] = useState( [ ] );
	const [ expanded, setExpanded ] = useState( false );
	const [ loading, setLoading ] = useState( { products: true, categories: true } );
	
	const firstRender = useRef( true );
	const categories = useSelector( ( state ) => state.category.categories );
	const dispatch = useDispatch( );
	
	const onChangeHandler = useCallback( ( status, id ) => {
		setChecked( ( state ) => {
			return status ? [ ...state, id ] : state.filter( c => c !== id );
		} );
	}, [ ] );
	
	useEffect( ( ) => {
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