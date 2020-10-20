import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import { Container, Col, Row, Card, Figure } from 'react-bootstrap';
import defaultPortrait from '../../assets/portrait.jpg';

const API_URL = process.env.REACT_APP_API_URL;

function CartCard( { id, name, description, quantity, price, media, onQuantityChange } )
{
	const getProductPortrait = ( ) => {
		if ( !media || ( media.length === 0 ) ) {
			return defaultPortrait;
		}
		
		const portrait = media.find( m => m.type === 'portrait' );
		
		if ( !portrait ) {
			return defaultPortrait;
		}
		
		if ( !portrait.path.includes( '/' ) ) {
			return `${ API_URL }/${ portrait.path }`;
		}
		
		return portrait.path;
	};
	
	const productQuantity = useState( quantity );
	const firstRender = useRef( true );
	const portrait = getProductPortrait( );
	
	useEffect( ( ) => {
		if ( !firstRender.current ) {
			onQuantityChange( id, quantity );
		}
		
		firstRender.current = false;
	}, [ onQuantityChange ] );
	
	return (
		<Container className='card-cart-container'>
			<Card>
				<Card.Body>
					<Row>
						<Col xs={ 3 }>
							<Figure>
								<Figure.Image
									width={ 150 }
									height={ 200 }
									src={ portrait }
								/>
							</Figure>    
						</Col>
						<Col xs={ 8 }>
							<h1>{ name }</h1>
							<p>{ description }</p>
							<span>Cantidad: </span> 
							<input value={ productQuantity } type="number" id="quantity" name="quantity" min="1" max="5"/>                 
						</Col>
						<Col xs={ 1 }>
							<span>${ price }</span>  
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default CartCard;