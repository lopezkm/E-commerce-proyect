import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FloatingLabelInput from 'react-floating-label-input';
import { ReactComponent as Logo } from '../../assets/logofull.svg';
import axios from 'axios';

const FormUserLogin = () => {

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    };

    const handleSumbit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3000/auth/login`, input)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
    };

    return (
        <Container className='containerUserLogin'>
            <Row>
                <Col>
                    <Form className='formUserLogin' onSubmit={(event) => handleSumbit (event)}>
                        <div className='formUserLogin-title'>
                        <h1>Ingresa a tu cuenta de</h1>
                        <Logo className='formUserLogin-logo'/>
                        </div>

                        <Form.Group>
                            <FloatingLabelInput
                                name='email'
                                label='Email'
                                onChange={(event) => handleInputChange(event)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <FloatingLabelInput
                                name='password'
                                type='password'
                                autoComplete='password'
                                label='Contraseña'
                                onChange={(event) => handleInputChange(event)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Ingresar
                            </Button>
                        <Link to="/register" className="linkUserLogin">Crear cuenta</Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default FormUserLogin;