import React from 'react';
import { Container, Col, Row, Card, Figure, Button } from 'react-bootstrap';
import defaultPortrait from '../../assets/portrait.jpg';

const API_URL = process.env.REACT_APP_API_URL;

function CartCard( { id, name, quantity, price, media, onQuantityChange } )
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
	
	const portrait = getProductPortrait( );
	
	const handleInputChange = ( e ) => {
		const { name } = e.target;
		name === '+' ? quantity++ : name === '-' ? quantity-- : quantity=0;
		onQuantityChange( id, parseInt( quantity ) );
	}
	
	return (
		<Container className='cartCard__container'>
			<Card className="h-100">
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
						<Col xs={ 7 } className="cartCard__body">
							<h1>{ name }</h1>
							<div>
								<span>Cantidad: </span> 
							 	<Button className="mod-qty-btn" name="-" size="sm" onClick={ handleInputChange }>-</Button>
								<span> { quantity } </span>
								<Button className="mod-qty-btn" name="+" size="sm" onClick={ handleInputChange }>+</Button>
								<Button variant="link" name="del" size="sm" onClick={ handleInputChange }>Quitar del carrito</Button>
							</div>
						</Col>
						<Col xs={ 2 }>
							<span className="cartCard__price">{ price } US$</span>
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</Container>
	);
}

export default CartCard;   