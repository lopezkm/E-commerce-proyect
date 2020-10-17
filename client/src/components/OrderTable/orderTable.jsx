import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Dropdown, DropdownButton, Container } from 'react-bootstrap';

function OrderTable( ) {
    const [orderTable, setOrderTable] = useState();
    const [loading, setLoading] = useState();
    const [orderSelector, setOrderSelector] = useState();
    /* const [orderCart, setOrderCart] = useState();
    const [orderCreated, setOrderCreated] = useState();
    const [orderProcessing, setOrderProcessing] = useState();
    const [orderCanceled, setOrderCanceled] = useState();
    const [orderCompleted, setOrderCompleted] = useState(); */

	const getOrders = ( ) => {
		axios.get( `http://localhost:3000/orders`)
        .then( response => {
            setOrderTable(response.data);
            /* let cart = response.data.filter(order => order.status === "cart");
            let created = response.data.filter(order => order.status === "created");
            let processing = response.data.filter(order => order.status === "processing");
            let canceled = response.data.filter(order => order.status === "canceled");
            let completed = response.data.filter(order => order.status === "completed");
            setOrderCart(cart);
            setOrderCreated(created);
            setOrderProcessing(processing);
            setOrderCanceled(canceled);
            setOrderCompleted(completed); */
    })}; 

    useEffect(() => {
        getOrders();
        setLoading(false);
    }, [loading]);

    const handleStatusChange = (e) =>  {
       let dropdown = document.getElementById('dropdown-basic-button');
       let status = e.target.name; 
       let name = e.target.innerText;
       dropdown.innerText = name; 
       setOrderSelector(orderTable.filter(order => order.status === status));
    }
    
	return (
        <Container>
            <DropdownButton bsPrefix="orderTable-selector-button" variant= "secondary" id="dropdown-basic-button" title="Estados de Ordenes">
                <Dropdown.Item name='cart' onClick= {(e) => handleStatusChange(e)}>Carrito</Dropdown.Item>
                <Dropdown.Item name='created' onClick= {(e) => handleStatusChange(e)}>Creada</Dropdown.Item>
                <Dropdown.Item name='processing' onClick= {(e) => handleStatusChange(e)}>En proceso</Dropdown.Item>
                <Dropdown.Item name='canceled' onClick= {(e) => handleStatusChange(e)}>Cancelada</Dropdown.Item>
                <Dropdown.Item name='completed' onClick= {(e) => handleStatusChange(e)}>Completa</Dropdown.Item> 
            </DropdownButton>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th className='orderTable-row'>Orden N°</th>
                    <th className='orderTable-row'>Estado de la Orden</th>
                    <th className='orderTable-row'>Pertenece a usuario</th>
                    </tr>
                </thead>
                <tbody>
                    {orderSelector && orderSelector.map(order => { 
                        return( 
                            <tr> 
                                <td className='orderTable-row'>{order.id}</td>
                                <td className='orderTable-row'>{order.status}</td>
                                <td className='orderTable-row'>{order.userId}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
	);
}

export default OrderTable;