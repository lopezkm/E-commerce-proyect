import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import defaultPortrait from '../../assets/portrait.jpg';
<<<<<<< HEAD
=======
import store from '../../redux/store/store.js';
import CartButton from '../CartButton.jsx';
console.log('productCard',store.getState());
>>>>>>> master

const API_URL = process.env.REACT_APP_API_URL;

function ProductCard( { id, name, price, media, developer, stock } )
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
	
	const getProductPrice = ( ) => {
		return price.toLocaleString( 'es-ES', { minimumFractionDigits: 2 } );
	};
	
	const handleCartButtonClick = ( e ) => {
		e.preventDefault( );
		
		axios.post( `${ API_URL }/users/1/cart`, {
			productId: id,
			quantity: 1
		} );
	};

	return (
		<Card bsPrefix='productCard__card'>
			<Card.Header bsPrefix='productCard__card-header'>
				<Card.Img bsPrefix='productCard__card-img' src={ getProductPortrait( ) } alt={ `Portrait of ${ name }` } />
			</Card.Header>
			<Card.Body bsPrefix='productCard__card-body'>
				<div>
					<OverlayTrigger overlay={ <Tooltip id="tooltip-disabled">{ name }</Tooltip> }>
						<p className='productCard__card-name'>{ name }</p>
					</OverlayTrigger>

					<p className='productCard__card-developer'>{ developer }</p>
				</div>
				
				<div>
					{ ( stock > 0 ) ?
						<div className='productCard__card-price'>
							<p>{ getProductPrice( ) } US$</p>
							
							<button className="productCard__cart-button" onClick={ handleCartButtonClick }>
								<FontAwesomeIcon icon={ faCartPlus }/>
							</button>
						</div> :
						
						<p className='productCard__card-noStock'>SIN STOCK</p> }
				</div>
			<CartButton/>
			</Card.Body>
		</Card>
	);
}

export default ProductCard;