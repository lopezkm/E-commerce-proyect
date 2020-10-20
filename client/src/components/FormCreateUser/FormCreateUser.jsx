import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FloatingLabelInput from 'react-floating-label-input';
import { ReactComponent as Logo } from '../../assets/logofull.svg';
import axios from 'axios';
import { toast } from 'react-toastify';



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

    const handleSumbit = (event) => {
        event.preventDefault();
        axios.post(`http://localhost:3000/users`, input)
        .then(response => {
            console.log(response);
            toast.info('Usuario creado con exito :)', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
        .catch(err => {
            console.log(err)
            toast.error('ERROR: Email ya existente :(', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    };

    return (
        <Container className='containerUserCreate'>
            <Row>
                <Col>
                    <Form className='formUserCreate' onSubmit={(event) => handleSumbit (event)}>
                        <div className='formCreateUser-title'>
                        <h1>Crea tu cuenta de</h1>
                        <Logo className='formCreateUser-logo'/>
                        </div>
                        <Form.Group>
                            <FloatingLabelInput
                                name='firstName'
                                label='Nombre'
                                onChange={(event) => handleInputChange(event)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <FloatingLabelInput
                                name='lastName'
                                label='Apellido'
                                onChange={(event) => handleInputChange(event)}
                            />
                        </Form.Group>

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
                            Registrarse
                            </Button>
                        <Link to="/login" className="linkUserLogin">Prefiero iniciar sesión</Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateUser;