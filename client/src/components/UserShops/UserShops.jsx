import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Container, Col, Row, Figure } from 'react-bootstrap';
import axios from 'axios';
import Promise from 'bluebird';

const API_URL = process.env.REACT_APP_API_URL;

const UserShops = () => {

    const [orders, setOrders] = useState();
    const [loading, setLoading] = useState();
    const [products, setProducts] = useState();
    const userId = useSelector(state => state.user.id);

    const getOrders = ( ) => {
        axios.get( `http://localhost:3000/users/${userId}/orders`, {withCredentials: true})
        .then( ( response ) => {
            let filteredOrders = response.data.filter( order => order.status !== 'cart' && order.status !== 'created' && order.status !== 'processing');
            setOrders( filteredOrders );
            return filteredOrders
        } )
        .then((res) => {
            let array = res.map(order => order.products.map(product =>  product.id));
            let process = array.reduce((acc, element) => acc.concat(element,[])); 
            let ids = process.filter(unique);
            setProducts(ids);
            return ids;
        })
        .then()  
        
    }

    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    } 
    

   
    
    useEffect( () => {
        getOrders();
        setLoading(false);
    }, [loading])

    return (

        <Container className='user-shop-container'>
			{orders && orders.map( ( order, i ) =>  
				<Card>
                    <Row>
                        <Col className="user-shop-col-main"> 
                            <div>Número de orden: {order.id} </div>
                            <div>Fecha de compra: {order.createdAt.substring( 0, 10 ).split( '-' ).reverse( ).join( '/' )} </div>
                            <div>Oreden en estado: {order.status}</div>
                        </Col>
                        {order.products.map(product => 
                                    <Col className="user-shop-col-one" xs={ 3 } lg={ 2 }>
                                        <h6>{ product.name }</h6>
                                        <Figure className="figure">
                                            <Figure.Image bsPrefix="figure-img"
                                                width={ 50 }
                                                height={ 70 }
                                                src={ product.media }
                                            />
                                        </Figure> 
                                        <div> <span> Precio: { product.price } US$</span>  </div>
                                    </Col>
                    )}
                    </Row>
                </Card>
            )}
		</Container>
)
}


export default UserShops;