import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../product_card';
import Checkable from './Checkable/checkable.jsx';
import style from './catalogue.module.css';

function Catalogue( )
{
	const [ categories, setCategories ] = useState( [ ] );
	const [ products, setProducts ] = useState( [ ] );
	const [ checked, setChecked ] = useState( [ ] );
	const [ expanded, setExpanded ] = useState( false );
	const [ loading, setLoading ] = useState( { products: true, categories: true } );
	
	const getCategories = ( ) => {
		axios.get( `http://localhost:3000/products/category/` )
			.then( response => {
				setCategories( response.data );
				setLoading( state => ( { ...state, categories: false } ) );
			} );
	}
	
	const getProducts = ( ) => {
		axios.get( `http://localhost:3000/products/` )
			.then( response => {
				let products = response.data;
				
				if ( checked.length > 0 )
				{
					products = products.filter( p => {
						return checked.every( ck => {
							return ( p.categories.findIndex( c => c.id === ck ) > -1 );
						} );
					} );
				}
				
				setProducts( products );
				setLoading( state => ( { ...state, products: false } ) );
			} );
	}
	
	const onChangeHandler = ( status, id ) => {
		setChecked( prevState => {
			const pos = prevState.findIndex( c => c === id );
			
			return ( pos > -1 ) ? prevState.filter( c => c !== id ) : [ ...prevState, id ];
		} );
		
		setLoading( state => ( { ...state, products: true } ) );
	}
	
	useEffect( ( ) => {
		loading.categories && getCategories( );
		loading.products && getProducts( );
		
	}, [ loading.products ] );
	
	if ( loading.categories )
	{
		return (
			<div>
				<img src='assets/images/loading.svg'/>
			</div>
		)
	}
	
	return (
		<Container>
			<Row>
				<Col xs={ 10 }>
					<Row>
						{
							products.map( ( p, i ) => (
								<Col xs={ 3 } key={ i }>
									<Link to={ `/product/${ p.id }` }>
										<ProductCard
											key={ p.id }
											name={ p.name }
											price={ p.price }
											developer={ p.developer }
											media={ p.media[ 0 ].path }
										/>
									</Link>
								</Col>
							) )
						}
					</Row>
				</Col>
				<Col xs={ 2 }>
					<div className={ style.categoriesList }>
						{
							categories.map( ( c, i ) => (
								<div style={ { display: ( i < 7 || expanded ) ? 'block' : 'none' } }>
									<Checkable
										key = { i }
										name = { c.name }
										id = { c.id }
										onChange = { onChangeHandler }
									/>
								</div>
							) )
						}
						
						<button className={ style.expandButton } onClick={ ( ) => setExpanded( !expanded ) }>
							{ expanded ? 'Contraer' : 'Expandir' }
						</button>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Catalogue;