import React, { } from 'react';
import { Container, Col, Row, Card, Figure } from 'react-bootstrap';

function CartCard () {
    return (
        <Container>
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
                            <h2>Product Name</h2>
                            <p>DescDescDescDescDescDescDescDescDesc</p>
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