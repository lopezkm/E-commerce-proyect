import React, { } from 'react';
import { Container, Col, Row, Card, Figure } from 'react-bootstrap';

function CartCard () {
    return (
        <Container className='card-cart-container'>
            <Card>
                <Card.Body>
                    <Row>
                        <Col>
                            <Figure>
                                <Figure.Image
                                    width={150}
                                    height={200}
                                />
                            </Figure>    
                        </Col>
                        <Col>
                            <h2>Rocket League</h2>
                            <p>AAAAAAAAAAAAAAAAAAAAAAAAAAA</p>
                            <span>$50</span>                   
                        </Col>
                        <Col>
                            <input type="number" id="quantity" name="quantity" value="1" min="1" max="5"/>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default CartCard;