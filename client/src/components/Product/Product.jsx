import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Carousel, Container, Col, Row, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { AddProductToCart } from '../../redux/action-creators/cart';
import ProductCard from '../ProductCard/ProductCard.jsx';
import defaultBanner from '../../assets/banner.jpg';

const API_URL = process.env.REACT_APP_API_URL;

function Product( { productId } )
{
	const [ product, setProduct ] = useState( { } );
	const [ isLoading, setLoading ] = useState( true );
	const [ recommendedProducts, setRecommendedProducts ] = useState( [ ] );
	
	const userId = useSelector( ( state ) => state.user.id );
	const dispatch = useDispatch( );

	const getProduct = useCallback( ( ) => {
		axios.get( `${API_URL}/products/${ productId }` ).then( ( response ) => {
			const productData = response.data;
			
			processMedia( productData );
			setProduct( productData );
			
			setLoading( false );
		} );
	}, [ productId ] );
	
	const getRecommendedProducts = useCallback( ( ) => {
		if ( !product.categories || ( product.categories.length === 0 ) )
		{
			return;
		}
		
		axios.get( `${ API_URL }/products/category/${ product.categories[ 0 ].name }` ).then( ( response ) => {
			const products = response.data.filter( p => p.id !== productId );
			
			setRecommendedProducts( products );
		} );
	}, [ productId, product.categories ] );
	
	const processMedia = ( { media } ) => {
		if ( !media || ( media.length === 0 ) ) {
			media = [ {
				type: 'image-big',
				path: defaultBanner
			} ];
			
			return;
		}
		
		media.forEach( ( m ) => {
			if ( !m.path.includes( '/' ) ) {
				m.path = `${ API_URL }/${ m.path }`;
			}
		} );
	}
	
	const handleAddToCartClick = ( e ) => {
		e.preventDefault( );
		
		dispatch( AddProductToCart( userId, product.id ) );
	}

	useEffect( ( ) => {
		getProduct( );
	}, [ getProduct ] );
	
	useEffect( ( ) => {
		if ( !product.id ) {
			return;
		}
		
		getRecommendedProducts( );
	}, [ product, getRecommendedProducts ] );

	if ( isLoading ) {
		return (
			<div className="App">
				Loading...
			</div>
		);
	}

	const dateFormat = product.publishDate && product.publishDate.substring( 0, 10 ).split( '-' ).reverse( ).join( '/' );

	return (
		<Container>
			<Carousel interval={5000} className="product-carousel-main">
				{
					product.media.map((media, i) => media.type.includes("image-big") &&
						<Carousel.Item key={i}>
							<img src={media.path} className="d-block w-100" alt="" />
						</Carousel.Item>
					)
				}
			</Carousel>
			<Card bsPrefix="product-card">
				<Card.Body bsPrefix="product-card-info">
					<Card.Title><h1>{product.name}</h1></Card.Title>
					<div className="product-card-text">
						<Row>
							<Col sm={10}>
								{
									product.categories.map((c, i) => (
										<Badge pill variant="secondary" key={i}>{c.name}</Badge>
									))
								}
							</Col>
						</Row>
						<Row>
							<Col sm={8}>
								<p>{product.description}</p>
							</Col>
							<Col sm={4}>
								{product.stock > 0 ?
									<div className="action-buttons">
										<Button className="d-flex ml-auto mr-3">Comprar por ${product.price}</Button>
										<Button variant="success" onClick={ handleAddToCartClick }>Agregar al carrito</Button>
									</div>
									:
									<Button className="d-flex ml-auto btn btn-secondary" disabled>Comprar por ${product.price}</Button>
								}
							</Col>
						</Row>
						<Row className="product-row-border-top">
							<Col sm={3}>
								<h2>Desarrollado por:</h2>
								<p>{product.developer}</p>
							</Col>
							<Col sm={3}>
								<h2> Publicado por:</h2>
								<p>{product.publisher}</p>
							</Col>
							<Col sm={3}>
								<h2>Fecha de publicación:</h2>
								<p>{dateFormat}</p>
							</Col>
							<Col sm={3}>
								<h2>Stock disponible:</h2>
								<p>{product.stock}</p>
							</Col>
						</Row>

						{product.stock > 0 &&
							(<Row ><h2> Otros juegos que te pueden interesar:</h2>

								<Row >
									{
										recommendedProducts.map( ( p, i ) => (
											<Col xs={12} sm={6} md={4} lg={3} key={i} className='catalogue__product-col'>
												<Link to={`/product/${p.id}`}  className='catalogue__product-link'>

													<ProductCard
														key={p.id}
														name={p.name}
														price={p.price}
														developer={p.developer}
														media={p.media}
														stock={p.stock}
													/>

												</Link>
											</Col>
										))

									}
								</Row>
							</Row>
							)

						}
					</div>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default Product;