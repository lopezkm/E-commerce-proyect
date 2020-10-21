import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const PrincipalCard = () => {
    return (
        <Card className='principalCard-container'>
            <Row>
                {/* <Col lg={7}>
                    <div className='hola'>
                        <Card.Img src="https://wallpapercave.com/wp/wp1897911.jpg"></Card.Img>
                    </div>
                </Col>
                <Col>
                    <Card.Title>Horizon Zero Down</Card.Title>
                    <Card.Text>Horizon Zero Dawn es un estimulante y nuevo juego de acción y de rol exclusivo para el sistema PlayStation® 4, desarrollado por la galardonada empresa Guerrilla Games, creadores de la venerada franquicia Killzone de PlayStation. </Card.Text>
                </Col> */}
                    <Col>
                        <Card.Img src="https://wallpapercave.com/wp/wp1897911.jpg" />
                    </Col>
                    <Col>
                        <Card.Img src="https://wallpaperset.com/w/full/2/1/2/453698.jpg" />
                    </Col>
            </Row>
        </Card>
    );
};

export default PrincipalCard;