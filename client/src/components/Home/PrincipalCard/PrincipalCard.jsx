import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const PrincipalCard = ({ titleLeft, imgLeft, textLeft, titleRight, imgRight, textRight}) => {
    return (
        <Card className='principalCard-container'>
            <Row>
                <Col>
                    <div className='principalCard-text-two'>
                        <Card.Title>{titleLeft}</Card.Title>
                        <Card.Text>{textLeft}</Card.Text>
                    </div>
                    <Card.Img src={imgLeft} />
                </Col>
                <Col>
                    <div className='principalCard-text-one'>
                        <Card.Title>{titleRight}</Card.Title>
                        <Card.Text>{textRight}</Card.Text>
                    </div>
                    <Card.Img src={imgRight} />
                </Col>
            </Row>
        </Card>
    );
};

export default PrincipalCard;