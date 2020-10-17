import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Dropdown, DropdownButton, Container } from 'react-bootstrap';

function OrderTable( )
{
    const [ orderTable, setOrderTable ] = useState( );
    const [loading, setLoading] = useState(false);

	
	const getOrders = ( ) => {
		axios.get( `http://localhost:3000/orders`)
        .then( response => {
            setOrderTable( response.data );
    })};
    
    useEffect(() => {
        getOrders();
    }, [loading]);
	
	
	return (
        <Container>
            <DropdownButton variant= "secondary" id="dropdown-basic-button" title="Dropdown button">
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Order Id</th>
                    <th>Order Satatus</th>
                    <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
	);
}

export default OrderTable;