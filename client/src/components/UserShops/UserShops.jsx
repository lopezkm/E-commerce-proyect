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
                                
                        }  ) )}*/}
                        <Row /* key={ i } */>
                            <Card>
                                {//key={ i } 
                                 //id={ p.id } 
                                {name: "Spartacus"},//{ p.name }
                                {description: "Supremo, imposible dejar de jugar"}, //{ p.description }
                                {price: "$45"}, //{ p.price }
                                {quantity:"2"}, //{ p.quantity }
                                {media:"FOTO AQUI"} //{ p.media }
                                /* onQuantityChange={ handleProductQuantityChange } */}
                            </Card>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>  
        </Row>
    </Container>
);
}


export default UserShops;