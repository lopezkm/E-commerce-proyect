import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const PrincipalCard = () => {
    return (
        <Card className='principalCard-container'>
            <Row>
                <Col lg={7}>
                    <div className='hola'>
                        <Card.Img src="https://wallpapercave.com/wp/wp1897911.jpg"></Card.Img>
                    </div>
                </Col>
                <Col>
                    <Card.Title>Horizon Zero Down</Card.Title>
                    <Card.Text>Descripcion</Card.Text>
                </Col>
            </Row>
        </Card>
    );
};

export default PrincipalCard;