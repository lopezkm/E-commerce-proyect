import React, { } from 'react';
import { Container, Col, Row, Card, Figure } from 'react-bootstrap';

function CartCard () {
    return (
        <Container className='card-cart-container'>
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs={3}>
                            <Figure>
                                <Figure.Image
                                    width={150}
                                    height={200}
                                    src="http://localhost:3000/ab9db99a6fd0856e014085625390fdcc.jpg"
                                />
                            </Figure>    
                        </Col>
                        <Col xs={8}>
                            <h1>Rocket League</h1>
                            <p>Combina el fútbol de estilo arcade con el caos a cuatro ruedas, unos controles fáciles y una competición fluida y basada en la física.</p>
                            <span>Cantidad: </span> 
                            <input type="number" id="quantity" name="quantity" placeholder="1" min="1" max="5"/>                 
                        </Col>
                        <Col xs={1}>
                            <span>$50</span>  
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default CartCard;