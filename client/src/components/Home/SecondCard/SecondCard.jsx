import React from 'react';
import { Card } from 'react-bootstrap';

const SecondCard = ({ img, description, price, developer, name }) => {
    return (
        <Card className='secondCard-container'>
            <Card.Header>
                <Card.Img src={ img } />
            </Card.Header>
            <Card.Body>
                <Card.Title>{ name }</Card.Title>
                <Card.Text>{ description }</Card.Text>
                <Card.Text className='seconCard-developer'>{ developer }</Card.Text>
                <Card.Text className='seconCard-price'>{ price }</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SecondCard;