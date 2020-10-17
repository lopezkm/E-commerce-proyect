import React, { useState, useEffect } from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import axios from 'axios';

const Order = ({ orderId }) => {

    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);

    const getOrder = ( orderId ) => {
        axios.get(`http://localhost:3000/orders/${orderId}`)
            .then(response => {
                setOrder(response.data);
            })
    };

    useEffect(() => {
        getOrder();
        setLoading(false);

    }, [loading]);

    return (
        <Container className='mt-3'>
            <Card bg='dark'>
                <Card.Body>
                    <Card.Title style={{ color: 'white'}}>Pepito Landa</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Fecha de emision: 16/10/2020</Card.Subtitle>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre del producto</th>
                                <th>Cantidad</th>
                                <th>Precio unitario</th>
                                <th>Precio total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Assassin's Creed Rogue</td>
                                <td>2</td>
                                <td>$200</td>
                                <td>$400</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>I am dead</td>
                                <td>1</td>
                                <td>$100</td>
                                <td>$100</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Dead Stranding</td>
                                <td>1</td>
                                <td>$300</td>
                                <td>$300</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Card.Text style={{ color: 'white'}}>Costo total de la orden: $800</Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Order;