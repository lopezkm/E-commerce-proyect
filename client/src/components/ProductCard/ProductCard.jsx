import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { AddProductToCart } from '../../redux/action-creators/cart';
import defaultPortrait from '../../assets/portrait.jpg';

const API_URL = process.env.REACT_APP_API_URL;

function ProductCard( { id, name, price, media, developer, stock } )
{
	const userId = useSelector( ( state ) => state.user.id );
	const dispatch = useDispatch( );
	
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
		
		dispatch( AddProductToCart( userId, id ) );
		
		toast.info( `¡${ name } añadido al carrito!`, {
			position: 'top-center',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined
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
			</Card.Body>
		</Card>
	);
}

export default ProductCard;