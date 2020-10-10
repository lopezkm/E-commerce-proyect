import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './product_card';
import { Container, Row, Col } from 'react-bootstrap';
import sc from '../styles/catalogue.module.css';

function Catalogue( )
{
	const [ categories, setCategories ] = useState( [ ] );
	const [ products, setProducts ] = useState( [ ] );
	const [ loading, setLoading ] = useState( true );
	const [ checkboxes, setCheckboxes ] = useState( { } );
	
	useEffect( ( ) => {
		getCategories( );
		getProducts( );
		
		setLoading( false );
	}, [ loading ] );
	
	function getCategories( ) {
		axios.get( `http://localhost:3000/products/category/` )
			.then( response => {
				setCategories(  response.data );
			} );
	}
	
	function getProducts( ) {
		axios.get( `http://localhost:3000/products/` )
			.then( response => {
				let products = response.data;
				let checked = Object.keys( checkboxes ).filter( k => checkboxes[ k ] );
				
				if ( checked.length > 0 )
				{
					products = products.filter( p => {
						return checked.every( cb => {
							return p.categories.some( c => {
								return c.id == cb;
							} );
						} );
					} );
				}
				
				setProducts( products );
			} );
	}
	
	function onChangeHandler( e )
	{
		const { value } = e.target;
		
		setCheckboxes( {
			...checkboxes, [ value ]: !checkboxes[ value ]
		} );
		
		setLoading( true );
	}
	
	return (
		<Container fluid>
			<Row>
				<Col xs={ 2 }>
					<ul>
						{
							categories.map( ( category, i ) => (
								<li key={ i }>
									<input 
										type="checkbox" 
										value={ category.id }
										key={ category.id }
										onChange={ ( e ) => onChangeHandler( e ) }
									/> 
									{ category.name }
								</li>  
							) )
						}
					</ul>
				</Col>
				<Col xs={10}>
					<Row>
						{
							products.map( ( p, i ) => (
								<Col xs={ 4 } key={ i }>
									<ProductCard
										name={ p.name }
										price={ p.price }
										developer={ p.developer }
										media={ p.media[ 1 ].path }
										key={ p.id }
									/>
								</Col>
							) )
						}
					</Row>
				</Col>
			</Row>
		</Container>
	);
};

export default Catalogue;