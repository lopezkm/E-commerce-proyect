import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button, Carousel } from 'react-bootstrap';


function Product({productId})
{
    const [ product, setProduct ] = useState({});
    const [isLoading, setLoading] = useState(true);

    const getProduct = () => {
        axios.get(`http://localhost:3000/products/${productId}`)
            .then( response => {
                setProduct(response.data);
                setLoading(false);
                console.log(response.data);
            });
    }

    useEffect( () => {
        getProduct();
    }, []);    

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    return (
        <div className="container">
            <Carousel interval={null}>
            {
                product.media.map( (media) => media.type.includes("image-big") && 
                <Carousel.Item>
                    <img src={`../${media.path}`} className="d-block w-100"/>
                </Carousel.Item>)
            }
            </Carousel>
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title className="text-center"> {product.name} </Card.Title>
                        <Card.Text >
                            <p className="text-center"> {product.description} </p>
                            <p> Stock disponible: {product.stock} </p>
                            <p> Desarrollado por: {product.developer}   </p>
                            <p> Categorías: {product.categories.map( c => c.name ).reduce( ( a, n ) => a + `, ${n}` )}. </p>
                            <div className= "d-flex">
                                <p>Publicado por: {product.publisher}  |  Fecha de publicación: {product.publishDate} </p>
                                <Button className="d-flex ml-auto">Comprar por ${product.price} </Button>
                            </div>
                        </Card.Text>
                </Card.Body>
            </Card>
        </div>

    )
}

export default Product;