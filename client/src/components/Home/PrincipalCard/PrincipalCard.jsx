import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const PrincipalCard = () => {
    return (
        <Card className='principalCard-container'>
            <Row>
                <Col>
                    <div className='principalCard-text-two'>
                        <Card.Title>"UNA OBRA MAESTRA"  9.3/10 - IGN</Card.Title>
                        <Card.Text>
                                Disfruta de una experiencia de juego de rol intensa y gratificante
                                que incluye un combate táctico muy variado. Fusiona equipamiento primitivo
                                con tecnología de avanzada para elaborar dispositivos que conviertan a los
                                depredadores en presas. Desarrolla estrategias únicas para acabar con diferentes
                                Máquinas, y apodérate de los especímenes atrapados para doblegar su voluntad.
                        </Card.Text>
                    </div>
                    <Card.Img src="https://wallpapercave.com/wp/wp1897911.jpg" />
                </Col>
                <Col>
                    <div className='principalCard-text-one'>
                        <Card.Title>Horizon Zero Dawn</Card.Title>
                        <Card.Text>
                                Un estimulante
                                y nuevo juego de acción y de rol
                                exclusivo para el sistema PlayStation® 4, desarrollado
                                por la galardonada empresa Guerrilla Games, creadores
                                de la venerada franquicia Killzone de PlayStation.
                        </Card.Text>
                    </div>
                    <Card.Img src="https://wallpaperset.com/w/full/2/1/2/453698.jpg" />
                </Col>
            </Row>
        </Card>
    );
};

export default PrincipalCard;