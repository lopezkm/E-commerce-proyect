import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FloatingLabelInput from 'react-floating-label-input';
import axios from 'axios';
import { LoadUser, RemoveUser } from '../../redux/action-creators/user';

import { ReactComponent as Logo } from '../../assets/logofull.svg';

const API_URL = process.env.REACT_APP_API_URL;

function FormUserLogin( )
{
	const history = useHistory( );
	const dispatch = useDispatch( );
	const isLogged = useSelector( ( state ) => state.user.isLogged );
	
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
			dispatch( LoadUser( response.data ) );
			
			setTimeout( ( ) => {
				history.push( '/products' );
			}, 3000 );
			
			toast.success( `¡Ingresaste correctamente en tu cuenta!`, {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			} );
		} )
		.catch( ( error ) => {
			toast.error( `¡Email o clave incorrectos!`, {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			} );
		} );
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

/*

//LOGOUT

doLogOut( )
{
	dispatch( ResetUser( ) );

	axios.get( `${ API_URL }/auth/logout`, {
		withCredentials: true
	} )
	.then( ( response ) => {
		setTimeout( ( ) => {
			history.push( '/products' );
		}, 3000 );
		
		toast.success( `¡Cerraste sesión correctamente!`, {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined
		} );
	} )
	.catch( ( error ) => {
		toast.error( `Ocurrió un error inesperado`, {
			position: 'top-right',
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: false,
			draggable: true,
			progress: undefined
		} );
	} );
}

*/