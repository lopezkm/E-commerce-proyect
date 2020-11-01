import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FloatingLabelInput from 'react-floating-label-input';
import axios from 'axios';
import { loadUser } from '../../redux/action-creators/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { ReactComponent as Logo } from '../../assets/logofull.svg';

const API_URL = process.env.REACT_APP_API_URL;
const API_URL_GOOGLE = API_URL + '/auth/google';
const API_URL_FACEBOOK = API_URL + '/auth/facebook';

function FormUserLogin( )
{
	const history = useHistory( );
	const dispatch = useDispatch( );
	
	const [ input, setInput ] = useState( {
		email: '',
		password: ''
	} );

	const handleInputChange = ( event ) => {
		setInput( {
			...input,
			[ event.target.name ]: event.target.value
		} );
	};

	const handleSumbit = ( event ) => {
		event.preventDefault( );
		
		axios.post( `${ API_URL }/auth/login`, input, {
			withCredentials: true
		} )
		.then( ( response ) => {
			dispatch( loadUser( response.data ) );
			
			setTimeout( ( ) => {
				history.push( '/products' );
			}, 1500 );
			
			toast.success( `¡Bienvenido ${response.data.firstName}!`, {
				position: 'top-center',
				autoClose: 1500,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			} );
		} )
		.catch( ( error ) => {
			toast.error( `¡Email o clave incorrectos!`, {
				position: 'top-center',
				autoClose: 1500,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			} );
		} );
	};

	const googleAuth = () => {
		window.location.href = API_URL_GOOGLE;
	}

	const facebookAuth = () =>{
		window.location.href = API_URL_FACEBOOK;
	}

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
						<Button variant="primary" type="submit">Ingresar</Button>
						<h6>Continuar con:</h6>
						<Button className="google-button" onClick={googleAuth}>
							<FontAwesomeIcon className="button-space" icon={faGoogle} /> Google
						</Button>
						<Button className="facebook-button"  onClick={facebookAuth}>
							<FontAwesomeIcon className="button-space" icon={faFacebook} /> Facebook
						</Button>
						<Link to="/register" className="linkUserLogin">Crear cuenta</Link>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default FormUserLogin;

