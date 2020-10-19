import React, { } from 'react';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';
import CartCard from '../CartCard/CartCard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBacksspanace, faCashRegister } from '@fortawesome/free-solid-svg-icons';

function Cart() {
    return (
        <Container className='cart-container'>
            <Row>
                <Col xs={8}>
                    <Card className="cart-list">
                        <Card.Header><h1>Carrito de compra</h1></Card.Header>
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
                    <Card className="cart-summary">
                        <Card.Header>
                            <span>Resumen del pedido</span>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col><span>Articulos (2):</span></Col>
                                <Col><span>$100</span></Col>
                            </Row>
                            <Row>
                                <Col><span>Envio:</span></Col>
                                <Col><span>$50</span></Col>
                            </Row>
                            <Row>
                                <Col><span>Impuestos:</span></Col>
                                <Col><span>$50</span></Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Row className="cart-total">
                                <Col>
                                    <span>Total:</span>
                                </Col>
                                <Col>
                                    <span>$200</span>
                                </Col>
                            </Row>
                            <Row className="cart-button">
                                <Col xs={12}>
                                    <Button className='cart-button-buy w-100'>{/* <FontAwesomeIcon icon={ faCashRegister }/> */}Proceder a pagar</Button>
                                </Col>
                            </Row>    
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;