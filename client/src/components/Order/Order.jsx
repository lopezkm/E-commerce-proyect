import React, { useState, useEffect } from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import axios from 'axios';

const Order = ( { orderId } ) => {

	const [ order, setOrder ] 		= useState( { } );
	const [ loading, setLoading ] 	= useState( true );

	useEffect( ( ) => {
		axios.get( `http://localhost:3000/orders/${ orderId }`, { withCredentials: true } ).then( ( response ) => {
			setOrder( response.data );
			setLoading( false ); 
		} );
	}, [ orderId ] );

	let dateFormat = order.createdAt && order.createdAt.substring( 0, 10 ).split( '-' ).reverse( ).join( '/' );
	let totalOrderPrice = 0;
	
	order.products && order.products.map( ( product ) => {
		if ( product.price && product.OrderProduct.quantity ) {
			totalOrderPrice += ( product.price * product.OrderProduct.quantity );
		}
		
		return totalOrderPrice;
	} );

	let totalDecimalLimit = totalOrderPrice.toFixed( 2 );
	
	if ( loading ) {
		return (
			<div>
				<h1>Cargando...</h1>
			</div>
		);
	}
	
	return (
		<Container className='order-container'>
			<Card>
				<Card.Body>
					<Card.Title style={{ color: 'white'}}>Usuario: {order.user.firstName +' '+ order.user.lastName}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">Fecha de cración: {dateFormat}</Card.Subtitle>
					<Table striped bordered hover variant="dark">
						<thead>
							<tr>
								<th>Id</th>
								<th>Nombre del producto</th>
								<th>Cantidad</th>
								<th>Precio unitario</th>
								<th>Precio total</th>
							</tr>
						</thead>
						<tbody>
							{order.products && order.products.map((product,i) => { 
								return( 
									<tr key={i}>
										<td>{product.id}</td>
										<td>{product.name}</td>
										<td>{product.OrderProduct.quantity}</td>
										<td>{product.price}</td>
										<td>{product.price * product.OrderProduct.quantity}</td>
									</tr>
								)
							})}
						</tbody>
					</Table>
					<Card.Text style={{ color: 'white'}}>Costo total de la orden: {totalDecimalLimit} </Card.Text>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default Order;