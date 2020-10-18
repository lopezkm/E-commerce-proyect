import React, { } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

function PanelAdmin(){
    return (
        <Container className='panelAdmin-container'>
            <Row className='panelAdmin-row '>
                <Col xs={4}>
                    <Link to="/admin/categories">
                        <Card bg="primary" text="white">
                            <Card.Body>
                                <Card.Title bsPrefix='panelAdmin-cardTitle'> Agregar categorias <FontAwesomeIcon icon={ faChevronCircleRight } /> </Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col xs={4}>
                    <Link to="/admin/create">
                        <Card bg="primary" text="white">
                            <Card.Body>
                                <Card.Title bsPrefix='panelAdmin-cardTitle'> Agregar producto <FontAwesomeIcon icon={ faChevronCircleRight } /> </Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col xs={4}>
                    <Link to="/admin/modify">
                        <Card bg="primary" text="white">
                            <Card.Body>
                                <Card.Title bsPrefix='panelAdmin-cardTitle'> Modificar producto <FontAwesomeIcon icon={ faChevronCircleRight } /> </Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col xs={4}>
                    <Link to="/admin/delete">
                        <Card bg="primary" text="white">
                            <Card.Body>
                                <Card.Title bsPrefix='panelAdmin-cardTitle'> Eliminar producto <FontAwesomeIcon icon={ faChevronCircleRight } /> </Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col xs={4}>
                    <Link to="/admin/orders">
                        <Card bg="primary" text="white">
                            <Card.Body>
                                <Card.Title bsPrefix='panelAdmin-cardTitle'> Filtrar ordenes <FontAwesomeIcon icon={ faChevronCircleRight } /> </Card.Title>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </Container>
            
    );
}

export default PanelAdmin;