import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';

const UserShops = ({ userId }) => {

    const [orders, setOrders] = useState();
    const [loading, setLoading] = useState();

    /* useEffect( ( ) => {
		axios.get( `http://localhost:3000/users/:${userId}` ).then( ( response ) => {
			setUser( response.data );
            setLoading( false ); 
		} );
	}, [] ); */  //ORDENES COMPLETADAS (PRODUCTOS)!!

    return (
        <Container className='cart__container'>
        <Row>
            <Col xs={8}>
                <Card className="cart__list">
                    <Card.Header>
                        <h1>Tus compras</h1>
                    </Card.Header>
                    <Card.Body>
                       {/*  {
                            products.map( ( p, i ) => (
                                
                        }  ) )}
                        <Row key={ i }>
                            <CartCard
                                key={ i }
                                id={ p.id }
                                name={ p.name }
                                description={ p.description }
                                price={ p.price }
                                quantity={ p.quantity }
                                media={ p.media }
                                onQuantityChange={ handleProductQuantityChange }
                            />
                        </Row>*/}
                    </Card.Body>
                </Card>
            </Col>  
        </Row>
    </Container>
);
}


export default UserShops;