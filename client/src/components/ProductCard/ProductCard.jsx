import React from 'react';
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap';

function ProductCard({ name, price, media, developer, stock }) {
	const getProductPrice = () => {
		return price.toLocaleString('es-ES', { minimumFractionDigits: 2 });
	}
	if (stock > 0) {
		return (

			<Card bsPrefix='productCard-card'>
				<Card.Header bsPrefix='productCard-card-header'>
					<Card.Img bsPrefix='productCard-card-img' src={media || 'https://i.imgur.com/X7HDtwN.jpg'} alt={`img Game ${name}`} />
				</Card.Header>
				<Card.Body bsPrefix='productCard-card-body'>
					<div>
						<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{name}</Tooltip>}>
							<p className='productCard-card-name'>{name}</p>
						</OverlayTrigger>

						<p className='productCard-card-developer'>{developer}</p>
					</div>

					<div>
						<p className='productCard-card-price'>{getProductPrice()} US$</p>
					</div>
				</Card.Body>
			</Card>
		)
	} else {
		return (

			<Card bsPrefix='productCard-card'>
				<Card.Header bsPrefix='productCard-card-header'>
					<Card.Img bsPrefix='productCard-card-img' src={media || 'https://i.imgur.com/X7HDtwN.jpg'} alt={`img Game ${name}`} />
				</Card.Header>
				<Card.Body bsPrefix='productCard-card-body'>
					<div>
						<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">{name}</Tooltip>}>
							<p className='productCard-card-name'>{name}</p>
						</OverlayTrigger>

						<p className='productCard-card-developer'>{developer}</p>
					</div>

					<div className='productCard-card-noStock'>
						SIN STOCK
					</div>
				</Card.Body>
			</Card>
		)
	}
}

export default ProductCard;