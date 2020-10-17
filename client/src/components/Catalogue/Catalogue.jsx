import React, { useCallback, useEffect, useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import qs from 'query-string';
import axios from 'axios';

import ProductCard from '../ProductCard/ProductCard.jsx';
import Checkable from '../Checkable/Checkable.jsx';

import loadingCircle from '../../assets/loading.svg';

function Catalogue( props )
{	
	const [ categories, setCategories ] = useState( [ ] );
	const [ products, setProducts ] = useState( [ ] );
	const [ checked, setChecked ] = useState( [ ] );
	const [ expanded, setExpanded ] = useState( false );
	const [ loading, setLoading ] = useState( { products: true, categories: true } );
	
	const firstRender = useRef( true );
	
	const onChangeHandler = useCallback( ( status, id ) => {
		setChecked( prevState => {
			const pos = prevState.findIndex( c => c === id );
			
			return ( pos > -1 ) ? prevState.filter( c => c !== id ) : [ ...prevState, id ];
		} );
	}, [ ] );
	
	useEffect( ( ) => {
		axios.get( `http://localhost:3000/products/category` )
			.then( response => {
				setCategories( response.data );
				setLoading( state => ( { ...state, categories: false } ) );
			} );
		
		/*const checkedCategories = qs.parse( props.location.search, { arrayFormat: 'comma' } ).categories.map( c => c.id );
		
		setChecked( checkedCategories );*/
	}, [ ] );
	
	useEffect( ( ) => {
		let query = qs.parse( props.location.search, { arrayFormat: 'comma' } );
		
		if ( !firstRender.current )
		{
			query.categories = [ ...checked ];
			query = '?' + qs.stringify( query, { arrayFormat: 'comma' } );
			
			props.history.push( `/products${ query }` );
		}
		else
		{
			console.log( query.categories );
			
			if ( Array.isArray( query.categories ) )
			{
				setChecked( query.categories.map( c => parseInt( c ) ) );
			}
			
			query = props.location.search;
			firstRender.current = false;
		}
		
		axios.get( `http://localhost:3000/products${ query }` )
			.then( response => {
				setProducts( response.data );
				setLoading( state => ( { ...state, products: false } ) );
			} );
		
		setLoading( state => ( { ...state, products: true } ) );
	}, [ checked ] );
	
	if ( loading.categories )
	{
		return renderLoadingCircle( );
	}
	
	return (
		<Container className='catalogue__container'>
			<Row>
				<Col xs={ 7 } sm={ 8 } md={ 9 } lg={ 10 }>
					<Row>
						{
							!loading.products ?
								products.map( ( p, i ) => (
									<Col xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } key={ i } className='catalogue__product-col'>
										<Link to={ `/product/${ p.id }` } className='catalogue__product-link'>
											<ProductCard
												key={ p.id }
												name={ p.name }
												price={ p.price }
												developer={ p.developer }
												media={ p.media }
												stock={ p.stock }
											/>
										</Link>
									</Col>
								) ) :
								
								<Col xs={ 12 }>{ renderLoadingCircle( ) }</Col>
						}
					</Row>
				</Col>
				<Col xs={ 5 } sm={ 4 } md={ 3 } lg={ 2 }>
					<div className='catalogue__categories-list'>
						<div className='catalogue__categories-section-title'>
							Categorías
						</div>
						{
							categories.map( ( c, i ) => (
								<div className='catalogue__categories-list-item' style={ { display: ( i < 7 || expanded ) ? 'block' : 'none' } }>
									<Checkable
										key = { i }
										name = { c.name }
										id = { c.id }
										initial = { !!checked.find( ck => ck === c.id ) }
										onChange = { onChangeHandler }
									/>
								</div>
							) )
						}
						
						<button className='catalogue__expand-button' onClick={ ( ) => setExpanded( !expanded ) }>
							{ expanded ? 'Contraer' : 'Expandir' }
						</button>
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
			<img src={ loadingCircle } className='catalogue__loading' alt='Loading Circle'/>
		</div>
	);
}

export default Catalogue;