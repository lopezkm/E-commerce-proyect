import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import defaultPortrait from '../../assets/portrait.jpg';

const API_URL = process.env.REACT_APP_API_URL;

function ProductCard( { name, price, media, developer, stock } )
{
	const getProductPortrait = ( ) => {
		if ( !media || ( media.length === 0 ) ) {
			return defaultPortrait;
		}
		
		const portrait = media.find( m => m.type === 'portrait' );
		
		if ( !portrait ) {
			return defaultPortrait;
		}
		
		console.log( portrait );
		
		if ( !portrait.path.includes( '/' ) ) {
			return `${ API_URL }/${ portrait.path }`;
		}
		
		return portrait.path;
	}
	
	const getProductPrice = ( ) => {
		return price.toLocaleString( 'es-ES', { minimumFractionDigits: 2 } );
	}

	return (
		<Card bsPrefix='productCard-card'>
			<Card.Header bsPrefix='productCard-card-header'>
				<Card.Img bsPrefix='productCard-card-img' src={ getProductPortrait( ) } alt={`Portrait of ${name}`} />
			</Card.Header>
			<Card.Body bsPrefix='productCard-card-body'>
				<div>
					<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{name}</Tooltip>}>
						<p className='productCard-card-name'>{name}</p>
					</OverlayTrigger>

					<p className='productCard-card-developer'>{developer}</p>
				</div>
				
				<div>
					{ ( stock > 0 ) ?
						<p className='productCard-card-price'>{getProductPrice( )} US$</p> :
						<p className='productCard-card-noStock'>SIN STOCK</p> }
				</div>
			</Card.Body>
		</Card>
	);
}

export default ProductCard;