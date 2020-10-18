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
                <Col>
                    <Form className='formUserCreate'>
                        <div className='formCreateUser-title'>
                        <h1>Crea tu cuenta de</h1>
                        <Logo className='formCreateUser-logo'/>
                        </div>
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
            </Row>
        </Container>
    );
};

export default CreateUser;