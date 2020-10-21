import React, { useState, useEffect } from 'react';
import FloatingLabelInput from 'react-floating-label-input';
import { Form, Button, Card } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import defaultPortrait from '../../assets/portrait.jpg';

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
        axios.post(`${API_URL}/products/${productId}/review/${userId}`, formInput)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    };

    const getProduct = () => {
        axios.get(`${API_URL}/products/${productId}`)
            .then(product => {
                console.log(product.data);
                setProduct(product.data)
            })
    }

    const getProductPortrait = (media) => {
		if ( !media || ( media.length === 0 ) ) {
			return defaultPortrait;
		}
		
		const portrait = media.find( m => m.type === 'portrait' );
		
		if ( !portrait ) {
			return defaultPortrait;
		}
		
		if ( !portrait.path.includes( '/' ) ) {
			return `${ API_URL }/${ portrait.path }`;
		}
		
		return portrait.path;
	};

    useEffect(() => {
        getProduct();
    }, []);


    //Validacion en caso que el usuario no este logueado (UserId = 0);
    //El post no va a funcionar cuando el UserId sea = 0;

    /* if(!userId) {
        return (
           <Container>
               <Row>
                   <Col>
                   <img style={{ width: "50rem", height: "25rem"}} src='https://i.pinimg.com/736x/3f/35/dc/3f35dcddc7162660ed561a2f5faa99bb.jpg'></img>
                    <h1 style={{color: "white", padding: "4px"}}>Uy! Debes comprar algo para acceder a este sitio.<br/> 
                        ¿Porque no le echas un vistazo a nuestro
                        <Button href={`${BASE_URL}/products`}>Catalogo</Button>  :)</h1>
                   </Col>
               </Row>
           </Container>
        )
    } */

    return (
        <Container>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={ getProductPortrait(product.media)} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.developer}</Card.Text>
                </Card.Body>
            </Card>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label>¿Cuantos estrellas le darias?</Form.Label>
                    <ReactStars
                        count={5}
                        onChange={newValue => setRatingStars(newValue)}
                        size={24}
                        isHalf={false}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                    />
                </Form.Group>

                <Form.Group>
                    <FloatingLabelInput
                        name='description'
                        label='¿Que opinas del producto?'
                        type='text'
                        onChange={(e) => handleInputChange(e)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default FormAddReview;