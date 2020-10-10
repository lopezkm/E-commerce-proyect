import React from 'react';
import { Card } from 'react-bootstrap';

const ProductCard = ({ name, price, media, developer}) => {
    return(
            <Card bsPrefix='product_card-card'>
                <Card.Header bsPrefix='product_card-card-header'>
                    <Card.Img bsPrefix='product_card-card-img' src={media} alt={`img Game ${name}`}/>
                </Card.Header>
                <Card.Body bsPrefix='product_card-card-body'>
                    <Card.Title bsPrefix='product_card-card-title'> {name}</Card.Title>
                </Card.Body>
                <Card.Footer>
                    <Card.Text> 
                        <h3> ${price} </h3>
                        <span> Desarrollado por: {developer}</span>
                     </Card.Text>
                </Card.Footer>
            </Card>
    )
}

export default ProductCard;