import React from 'react';
import { Card } from 'react-bootstrap';

const ProductCard = ({ name, price, media, developer}) => {
    return(
        <Card style={{ width: '100%' }}>
            <Card.Img variant="top" src={media} alt={`img Game ${name}`} />
            <Card.Body>
                <Card.Title> {name} </Card.Title>
                <Card.Text> 
                    <h3> ${price} </h3>
                    <span> Desarrollado por: {developer}</span>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard;