import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FloatingLabelInput from 'react-floating-label-input';
import axios from 'axios';
import { ReactComponent as Logo } from '../../assets/logofull.svg';
import { loadUser } from '../../redux/action-creators/user';



function CreateUser( )
{
	const history = useHistory( );
	const dispatch = useDispatch( );
	
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

	const handleSumbit = ( event ) => {
		event.preventDefault( );
		
		axios.post( `http://localhost:3000/auth/signup`, input, {
			withCredentials: true
		} )
		.then( ( response ) => {
			dispatch( loadUser( response.data ) );
			
			setTimeout( ( ) => {
				history.push( '/products' );
			}, 1500 );
			
			toast.info( 'Usuario creado con exito', {
				position: "top-right",
				autoClose: 1500,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			} );
		} )
		.catch( ( error ) => {
			const message = ( error.request.status === 409 ) ? '¡Ya existe una cuenta con ese email!' : 'Ocurrió un error inesperado';
			
			toast.error( message, {
				position: "top-right",
				autoClose: 3000,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			} );
		} );
	};

	const testGoogle = ( ) => {
		axios.get( `http://localhost:3000/auth/google`, { withCredentials: true }).catch(
			( error ) => console.log(error)
		); 
	}

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
						<Button variant="primary" onClick={() => testGoogle()}>
							Google
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default CreateUser;