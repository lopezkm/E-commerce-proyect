import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, Container, Col, Row, Figure } from 'react-bootstrap';
import axios from 'axios';
import defaultPortrait from '../../assets/portrait.jpg';

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
            return filteredOrders;
        } )
        .then((res) => {
            let array = res.map(order => order.products.map(product =>  product.id));
            let process = array.reduce((acc, element) => acc.concat(element,[])); 
            let ids = process.filter(unique);
            return ids;
        })
        .then(ids => (axios.post(`${API_URL}/products/some`, {ids}))
         )
        .then(response => {
            let product = response.data.map( prod => [prod.id, prod.media]);
            setProducts(product);

        })
        .catch(err => console.log(err));         
        
    }

    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    } 
    
    useEffect( () => {
        getOrders();
        setLoading(false);
    }, [loading])

    const getProductPortrait = (media) => {
        if (!media || (media.length === 0)) {
            return defaultPortrait;
        }

        const portrait = media.find(m => m.type === 'portrait');

        if (!portrait) {
            return defaultPortrait;
        }

        if (!portrait.path.includes('/')) {
            return `${API_URL}/${portrait.path}`;
        }

        return portrait.path;
    };


    return (

        <Container className='user-shop-container'>
            <h1>Historial de compras</h1>
			{orders ? orders.map( ( order, i ) =>  
				<Card>
                    <Row>
                        <Col className="user-shop-col-main"> 
                            <div>Número de orden: {order.id} </div>
                            <div>Fecha de compra: {order.createdAt.substring( 0, 10 ).split( '-' ).reverse( ).join( '/' )} </div>
                            <div>Hora de compra: {order.createdAt.substring( 11, 19 )} </div>
                            {order.status === 'completed' ? 
                            <div className="user-shop-div-completed"> Orden en estado: {order.status} </div> :
                            <div className="user-shop-div-canceled"> Orden en estado: {order.status} </div>}
                        </Col>
                        {products && order.products.map(product => products.map(prod => prod[0] === product.id ?
                            <Col className="user-shop-col-one" xs={ 3 } lg={ 2 }>
                                <Link className="link" to= {`/product/${product.id}`} >
                                    <h6> { product.name } </h6>
                                    <Figure className="figure">
                                            <Figure.Image bsPrefix="figure-img"
                                                width={ 70 }
                                                height={ 100 }
                                                src={ getProductPortrait(prod[1]) }
                                            />                
                                    </Figure> 
                                </Link>
                                <div> 
                                    <span> Precio: { product.price } US$ </span> 
                                    <span> Cantidad: { product.OrderProduct.quantity } </span> 
                                </div>
                            </Col> : null
                        ))}
                    </Row>
                </Card>
            ) : <h1> No has realizado ninguna compra hasta el momento </h1> }
		</Container>
)
}


export default UserShops;