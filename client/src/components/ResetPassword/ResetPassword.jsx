import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ReactComponent as Logo } from '../../assets/logofull.svg';

const API_URL = process.env.REACT_APP_API_URL;

function ResetPassword( { token } )
{
	const [ input, setInput ] = useState( {
		password: '',
		confirm: ''
	} );
	
	const history = useHistory( );

	const handleInputChange = ( event ) => {
		setInput( {
			...input,
			[ event.target.name ]: event.target.value
		} );
	};

	const handleSumbit = ( event ) => {
		event.preventDefault( );
		
		const { password, confirm } = input;
		
		if ( password.length < 5 ) {
			toast.error( `¡La clave debe tener al menos cinco caracteres!`, {
				position: 'top-right',
				autoClose: 3000,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			} );
			
			return;
		}
		
		if ( password !== confirm ) {
			toast.error( `¡Las claves que ingresaste no coinciden!`, {
				position: 'top-right',
				autoClose: 3000,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			} );
			
			return;
		}
		
		if ( !token || ( token.length !== 64 ) ) {
			toast.error( `¡El token de recuperación es inválido!`, {
				position: 'top-right',
				autoClose: 3000,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			} );
			
			return;
		}
		
		axios.post( `${ API_URL }/auth/reset/${ token }`, {
			password
		} )
		.then( ( response ) => {
			setTimeout( ( ) => {
				history.push( '/login' );
			}, 3000 );
			
			toast.success( `¡Cambiaste correctamente la clave de tu cuenta!`, {
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
			toast.error( `Token de recuperación vencido o inexistente`, {
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
	
	if ( !token || ( token.length !== 64 ) ) {
		return renderInvalidToken( );
	}

	return (
		<Container className="resetPassword__wrapper" noGutters>
			<div className="resetPassword__modal">
				<Logo className='resetPassword__logo'/>
				<p className="resetPassword__info">
					Reestablecer la clave de tu cuenta
				</p>
				<Form className="resetPassword__form" onSubmit={ ( event ) => handleSumbit( event ) }>
					<Form.Group>
						<Form.Control
							name="password"
							type="password"
							value={ input.password }
							placeholder="Ingresa tu nueva clave"
							onChange={ handleInputChange }
						/>
					</Form.Group>
					
					<Form.Group>
						<Form.Control
							name="confirm"
							type="password"
							placeholder="Repite la clave anterior"
							value={ input.confirm }
							onChange={ handleInputChange }
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Cambiar clave ahora
					</Button>
				</Form>
				<div className="resetPassword__links">
					<p>¿No necesitas cambiar tu clave? <Link to="/login">Iniciar sesión</Link></p>
					<p>Si quieres puedes <Link to="/">volver al inicio</Link></p>
				</div>
			</div>
		</Container>
	);
};

function renderInvalidToken( )
{
	return (
		<div className="resetPassword__invalidToken">
			<h2>El token de recuperación es inválido</h2>
			<p>Si quieres puedes <Link to="/">volver al inicio</Link>.</p>
		</div>
	);
}

export default ResetPassword;