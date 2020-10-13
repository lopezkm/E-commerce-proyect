import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard/ProductCard.jsx';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

let SaveData;

const Result = ({ products }) => {

    const [result, setResult] = useState("")
    const [loading, setLoading] = useState(true);

    if (SaveData !== products) {
        setLoading(true);
        SaveData = products;
    }

    const getResult = () => {
        axios.get(`http://localhost:3000/search?query=${products}`)
            .then(response => {
                setResult(response);
            })
    };

    useEffect(() => {
        getResult();
        setLoading(false);

    }, [loading]);


    if (result.data) {
        if (result.data.length > 0) {
            return (
                <Container className='catalogue__container'>
                    <Row>
				        <Col xs={ 10 }>
                            <Row>
                            {
                                result.data.map(x =>
                                    <Col xs={ 3 } className='catalogue__product-col'>
										<Link to={ `/product/${ x.id }` } className='catalogue__product-link'>
											<ProductCard
												key={ x.id }
												name={ x.name }
												price={ x.price }
												developer={ x.developer }
												media={ `../${x.media[ 0 ].path}` }
											/>
										</Link>
									</Col>
                                )
                            }
                            </Row>
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
            <Alert variant="danger">
                <Alert.Heading>Ups ha habido un error!</Alert.Heading>
                <p>
                  No se encontro ningun producto o descripción que contengan tu busqueda :(
                </p>
            </Alert>
            )
        }
    }

    else {
        return (
            <h1>Cargando...</h1>
        )
    }
};

export default Result;