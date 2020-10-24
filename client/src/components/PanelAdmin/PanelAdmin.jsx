import React, { } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faPlus, faPlusSquare, faSortAmountUpAlt, faTrash } from '@fortawesome/free-solid-svg-icons';


function PanelAdmin() {
    return (
        <div className='panelAdmin-container'>
            <h1>Panel del administrador</h1>
            <Container bsPrefix='panelAdmin-internal-container'>  
                <Row> 
                    <Col xs={10} lg={2}>
                        <Link to="/admin/create">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Agregar producto</Card.Title>
                                    <Card.Text><FontAwesomeIcon icon={faPlus} /> </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col xs={10} lg={2}>
                        <Link to="/admin/modify">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Modificar producto</Card.Title>
                                    <Card.Text><FontAwesomeIcon icon={faExchangeAlt} /> </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col xs={10} lg={2}>
                        <Link to="/admin/delete">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Eliminar producto</Card.Title>
                                    <Card.Text> <FontAwesomeIcon icon={faTrash} /> </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} lg={2}>
                        <Link to="/admin/categories">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Agregar categorias</Card.Title>
                                    <Card.Text><FontAwesomeIcon icon={faPlusSquare} /></Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col xs={10} lg={2}>
                        <Link to="/admin/categoriesM">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Modificar categorias</Card.Title>
                                    <Card.Text><FontAwesomeIcon icon={faExchangeAlt} /></Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                    <Col xs={10} lg={2}>
                        <Link to="/admin/categoriesD">
                            <Card>
                                <Card.Body >
                                    <Card.Title>Eliminar categorias</Card.Title>
                                    <Card.Text><FontAwesomeIcon icon={faTrash} /></Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row> 
                <Row className="row-filter">   
                    <Col xs={10} lg={2}>
                        <Link to="/admin/orders">
                            <Card className="card-filter">
                                <Card.Body bsPrefix="card-filter-body">
                                    <Card.Title bsPrefix="card-filter-title">Filtrar ordenes</Card.Title>
                                    <Card.Text bsPrefix="card-filter-text"><FontAwesomeIcon icon={faSortAmountUpAlt} /> </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                </Row>     
            </Container>
        </div >
    );
}

export default PanelAdmin;