import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, DropdownButton, Dropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function OrderTable( ) {
    const [orderTable, setOrderTable] = useState();
    const [loading, setLoading] = useState();
    const [orderSelector, setOrderSelector] = useState();

	const getOrders = ( ) => {
		axios.get( `http://localhost:3000/orders`)
        .then( response => {
            setOrderTable(response.data);
    })}; 

    useEffect(() => {
        getOrders();
        setLoading(false);
    }, [loading]);

    const handleStatusChange = (e) =>  {
       let dropdown = document.getElementById('dropdown-basic-button');
       let name = e.target.innerText;
       let status = e.target.name; 
       dropdown.innerText = name;
       if(status !== 'allStatus') {
        setOrderSelector(orderTable.filter(order => order.status === status));
       } else {
        setOrderSelector(orderTable);
       }
    }
    
	return (
        <Container className="orderTable">
            <div className='orderTable-divConatiner'>
                <h1>Seleccione el estado de las ordenes que desea filtrar :</h1>
                <div className= 'dropdown'>
                    <DropdownButton bsPrefix="orderTable-selector-button" variant= "secondary" id="dropdown-basic-button" title="Estados de Ordenes">
                        <Dropdown.Item name='allStatus' onClick= {(e) => handleStatusChange(e)}>Todos los estados</Dropdown.Item>
                        <Dropdown.Item name='cart' onClick= {(e) => handleStatusChange(e)}>Carrito</Dropdown.Item>
                        <Dropdown.Item name='created' onClick= {(e) => handleStatusChange(e)}>Creada</Dropdown.Item>
                        <Dropdown.Item name='processing' onClick= {(e) => handleStatusChange(e)}>En proceso</Dropdown.Item>
                        <Dropdown.Item name='canceled' onClick= {(e) => handleStatusChange(e)}>Cancelada</Dropdown.Item>
                        <Dropdown.Item name='completed' onClick= {(e) => handleStatusChange(e)}>Completa</Dropdown.Item> 
                    </DropdownButton>
                </div>
            </div>
            <Table className='orderTable-table' striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Orden N°</th>
                    <th>Estado de la Orden</th>
                    <th>Pertenece a usuario Id</th>
                    </tr>
                </thead>
                <tbody>
                    {orderSelector && orderSelector.map((order,i) => { 
                        return( 
                                <tr key={i}> 
                                    <Link to={ `/orders/${ order.id }` } className="orderTable-orderLink"> 
                                        <td>{order.id}</td> 
                                    </Link>
                                    <Link to={ `/orders/${ order.id }` } className="orderTable-orderLink"> 
                                        <td>{order.status}</td>
                                    </Link>    
                                    <Link to={ `/orders/${ order.id }` } className="orderTable-orderLink">     
                                        <td>{order.userId}</td>
                                    </Link>
                                </tr>  
                        )
                    })}
                </tbody>
            </Table>
        </Container>
	);
}

export default OrderTable;