import React, { } from 'react';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import CartCard from '../CartCard/CartCard.jsx';

function Cart () {
    return (
        <Container>
            <Row>
                <Col xs={8}>
                    <Card>
                        <Card.Header><h1>Shopping Cart</h1></Card.Header>
                        <Card.Body>
                            <Row>
                                <CartCard>                          
                                </CartCard>
                            </Row>
                            <Row>
                                <CartCard>                          
                                </CartCard>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={4}>
                    <Card>
                        <Card.Header>
                            <h1>Summary</h1>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col><h2>SubTotal</h2></Col>
                                <Col><p>$100</p></Col>
                            </Row>
                            <Row>
                                <Col><h2>Envios</h2></Col>
                                <Col><p>$50</p></Col>
                            </Row>
                            <Row>
                                <Col><h2>Impuestos</h2></Col>
                                <Col><p>$50</p></Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col>
                                    <h1>Total:</h1>
                                </Col>
                                <Col>
                                    <h1>$200</h1>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
            <Button variant="primary">Comprar</Button><Button variant="danger">Cancelar</Button>
        </Container>
    );
}

export default Cart;