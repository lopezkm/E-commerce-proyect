import React from 'react';
import { Card } from 'react-bootstrap';

const SecondCard = ({ img, price, name, offer }) => {
    return (
        <Card className='secondCard-container'>
            <Card.Header>
                <Card.Img src={img} />
            </Card.Header>
            <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text className='seconCard-price-offer'>{price}US$</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SecondCard;