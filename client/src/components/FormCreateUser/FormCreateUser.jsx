import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FloatingLabelInput from 'react-floating-label-input';
import { ReactComponent as Logo } from '../../assets/logofull.svg';




const CreateUser = () => {

    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Container className='containerUserCreate'>
            <Row>
                <Col lg={6}>
                    <Form className='formUserCreate'>
                        <h1>Crea tu cuenta de Six Games</h1>
                        <Form.Group controlId="formBasicEmail">
                            <FloatingLabelInput
                                name='firstName'
                                label='Nombre'
                                onChange={(event) => handleInputChange(event)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <FloatingLabelInput
                                name='lastName'
                                label='Apellido'
                                onChange={(event) => handleInputChange(event)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <FloatingLabelInput
                                name='email'
                                label='Email'
                                onChange={(event) => handleInputChange(event)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <FloatingLabelInput
                                name='password'
                                label='Contraseña'
                                onChange={(event) => handleInputChange(event)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Registrarse
                            </Button>
                        <Link className='linkUserLogin'>Prefiero iniciar sesión</Link>
                    </Form>
                </Col>
                <Col>
                    <Logo className='formCreateUser-logo'/>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateUser;