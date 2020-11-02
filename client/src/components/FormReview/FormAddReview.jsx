import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Figure } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import defaultPortrait from '../../assets/portrait.jpg';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const FormAddReview = ({ productId }) => {

    const userId = useSelector(state => state.user.id);

    const [product, setProduct] = React.useState({})
    const [formInput, setformInput] = React.useState({
        qualification: "",
        description: "",
    });

    const handleInputChange = (e) => {
        setformInput({
            ...formInput,
            [e.target.name]: e.target.value
        });
    };

    const setRatingStars = (num) => {
        setformInput({
            ...formInput,
            qualification: num.toString()
        })
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/products/${productId}/review/${userId}`, formInput, { withCredentials: true })
            .then(() => {
                toast.info( 'Review añadida con exito ;)', {
                    position: "top-center",
                    autoClose: 1500,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            })
            .catch(error => {
            console.log(error)
            const message = ( error.request.status === 409 ) ? 'No puede usar este campo para modificar su review :(' : 'Usted nunca ha adquirido este producto :|';
			toast.error( message, {
				position: "top-center",
				autoClose: 5000,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			});
        })

        setTimeout(() => window.location.href=`/product/${productId}`, 1510 );
    };

    const getProduct = () => {
        axios.get(`${API_URL}/products/${productId}`)
            .then(product => {
                console.log(product.data);
                setProduct(product.data)
            })
    }

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

    useEffect(() => {
        getProduct();
    }, []);

    if(userId === 0) {
        return (
            <Redirect to="/"/>
        )
    };

    return (
        <Container className='formReview-container'>
            <Figure>
                <Row>
                    <Col xs={12} md={6}>
                        <Figure.Image
                            width={900}
                            height={180}
                            alt="171x180"
                            src={getProductPortrait(product.media)}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <Figure.Caption bsPrefix='review-productName'>{product.name}</Figure.Caption>
                        <Figure.Caption bsPrefix='review-productDeveloper'>{product.developer}</Figure.Caption>
                        <Form onSubmit={(e) => handleSubmit(e)}>
                            <Form.Group>
                                <ReactStars
                                    count={5}
                                    onChange={newValue => setRatingStars(newValue)}
                                    size={50}
                                    isHalf={false}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Danos tu opinión sobre el producto :D</Form.Label>
                                <Form.Control
                                    name='description'
                                    type='text'
                                    as="textarea"
                                    rows={4} 
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">Subir</Button>
                        </Form>
                    </Col>
                </Row>
            </Figure>
        </Container>
    );
};

export default FormAddReview;