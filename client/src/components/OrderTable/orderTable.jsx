import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Dropdown, DropdownButton, Container } from 'react-bootstrap';

function OrderTable( )
{
    const [orderTable, setOrderTable] = useState();
    const [loading, setLoading] = useState(false);

    let cart;
    let created;
    let processing;
    let canceled;
    let complited;

	
	const getOrders = ( ) => {
		axios.get( `http://localhost:3000/orders`)
        .then( response => {
            setOrderTable(response.data);
                cart = response.data.filter(order => order.status === "cart");
                created = response.data.filter(order => order.status === "created");
                processing = response.data.filter(order => order.status === "processing");
                canceled = response.data.filter(order => order.status === "canceled");
                complited = response.data.filter(order => order.status === "complited");
            console.log(cart); 
            console.log(response.data);   
    })};
    
    useEffect(() => {
        getOrders();
    }, [loading]);

    /* const handleOrderStatus() */
    

	return (
        <Container>
            <DropdownButton bsPrefix="orderTable-selector-button" variant= "secondary" id="dropdown-basic-button" title="Estados de Ordenes" /* onClick={(e) => handleOrderStatus(e)} */>
                <Dropdown.Item href="#/action-1">Carrito</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Creada</Dropdown.Item>
                <Dropdown.Item href="#/action-3">En proceso</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Cancelada</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Completa</Dropdown.Item>
            </DropdownButton>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Orden N°</th>
                    <th>Estado de la Orden</th>
                    <th>Pertenece a usuario</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    {/* <td>{order.id}</td>
                    <td>{order.status}</td>
                    <td>{order.userId}</td> */}
                    <td></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
	);
}

export default OrderTable;