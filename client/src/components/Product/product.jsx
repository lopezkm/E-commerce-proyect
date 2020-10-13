import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button, Carousel, Container, Col, Row, Badge } from 'react-bootstrap';


function Product({productId})
{
    const [ product, setProduct ] = useState({});
    const [isLoading, setLoading] = useState(true);

    const getProduct = () => {
        axios.get(`http://localhost:3000/products/${productId}`)
            .then( response => {
                const productData = response.data;
                
                if ( !Array.isArray( productData.media ) || ( productData.media.length === 0 ) )
                {
                    productData.media = [
                        {
                            type: 'image-big',
                            path: 'http://i.imgur.com/ltcQkzI.jpg',
                            width: 1920,
                            height: 1080
                        }
                    ];
                    
                    console.log( 'Si esta bien' );
                    console.log( productData );
                }
                else
                {
                    console.log( 'No esta bien' );
                    console.log( productData );
                }
                
                setProduct( productData );
                setLoading( false );
            });
    }

    useEffect( () => {
        getProduct();
    }, []);    

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <Container>
            <Carousel interval={5000} className="product-carousel-main">
            {
                product.media.map( ( media ) => media.type.includes("image-big") && 
                    <Carousel.Item>
                        <img src={ media.path.includes( 'http' ) ? media.path : `../${media.path}` } className="d-block w-100"/>
                    </Carousel.Item>
                )
            }
            </Carousel>
            <Card bsPrefix="product-card">
                <Card.Body bsPrefix="product-card-info">
                    <Card.Title> <h1>{product.name}</h1> </Card.Title>
                        <Card.Text bsPrefix="product-card-text">
                            <Row>
                                <Col sm={10}>
                                    {product.categories.map( c => 
                                    <Badge pill variant="secondary">
                                        {c.name}
                                    </Badge>)}
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={8}>
                                    <p> {product.description} </p>
                                </Col>
                                <Col sm={2}>
                                    <Button className="d-flex ml-auto">Comprar por ${product.price}</Button>
                                </Col>
                            </Row>
                            <Row className="product-row-border-top">
                                <Col sm={3}>
                                    <h2> Desarrollado por:</h2>
                                    <p>{product.developer}</p>
                                </Col>
                                <Col sm={3}>
                                    <h2> Publicado por:</h2>
                                    <p>{product.publisher}</p>
                                </Col>
                                <Col sm={3}>
                                    <h2> Fecha de publicación:</h2>
                                    <p>{product.publishDate.slice(0,10)}</p>
                                </Col>
                                <Col sm={3}>
                                    <h2> Stock disponible:</h2> 
                                    <p>{product.stock}</p>
                                </Col>
                            </Row>
                        </Card.Text>
                </Card.Body>
            </Card>
        </Container>

    )
}

export default Product;