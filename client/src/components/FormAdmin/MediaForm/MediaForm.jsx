import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import bsCustomFileInput from 'bs-custom-file-input';
import MediaRow from '../MediaRow/MediaRow.jsx';

const API_URL = process.env.REACT_APP_API_URL;

function MediaUploader( { productId, productMedias } )
{
	const [ error, setError ] = useState( '' );
	const [ medias, setMedias ] = useState( productMedias );
	const [ input, setInput ] = useState( {
		alias: '',
		file: '',
		type: '',
		path: ''
	} );
	
	const handleInputChange = ( e ) => {
		const { name } = e.target;
		const value = ( name === 'file' ) ? e.target.files[ 0 ] : e.target.value;
		
		setInput( ( state ) => ( {
			...state, [ name ]: value
		} ) );
	}
	
	const handleMediaDelete = ( e, id ) => {
		e.preventDefault( );
		
		axios.delete( `${ API_URL }/medias/${ id }` )
			.then( ( response ) => setMedias( medias.filter( m => m.id !== id ) ) )
			.catch( ( error ) => console.log( error ) );
	}
	
	const handleFormSubmit = ( e ) => {
		e.preventDefault( );
		
		const error = validate( input );
		
		if ( !error )
		{
			input.file ?
				uploadFile( ) : addMediaToProduct( );
			
			setInput( { } );
		}
		
		setError( error );
	}
	
	const addMediaToProduct = ( url ) => {
		axios.post( `${ API_URL }/medias/`, {
			alias: input.alias,
			type: input.type,
			path: url || input.path,
			productId
		} )
		.then( ( response ) => setMedias( [ ...medias, response.data ] ) )
		.catch( ( error ) => console.log( error ) );
	}
	
	const uploadFile = ( ) => {
		const formData = new FormData( );
		
		formData.append( 'file', input.file );
		
		axios.post( `${ API_URL }/uploads/`, formData )
			.then( ( response ) => addMediaToProduct( `${API_URL}/${response.data}` ) )
			.catch( ( error ) => console.log( error ) );
	};
	
	useEffect( ( ) => {
		bsCustomFileInput.init( );
	}, [ ] );
	
	return (
		<Container>
			{ !medias.length || <div className="mediaForm__separator"></div> }
			<Row className="mediaContainer">
				<Col xs={ 12 } lg={ 5 }>
					{ !medias.length || <div className="mediaForm__separator mediaForm__form-separator"></div> }
					<Form className="mediaForm" onSubmit={ handleFormSubmit }>
						<Form.Row style={ { alignItems: 'center' } }>
							<Col xs={ 12 }>
								{ error && <span className="mediaForm__error">{ error }</span> }
							</Col>
							
							<Col xs={ 12 }>
								<Form.Group>
									<Form.Control
										as="select"
										name="type"
										value={ input.type }
										onChange={ handleInputChange }
										custom
									>
										<option value="none">Seleccionar un tipo</option>
										<option value="portrait">Portada</option>
										<option value="image-small">Imagen chica</option>
										<option value="video-small">Video chico</option>
										<option value="image-big">Imagen grande</option>
										<option value="video-big">Video grande</option>
									</Form.Control>
								</Form.Group>
							</Col>
							<Col xs={ 12 }>
								<Form.Group>
									<Form.Control 
										name="path"
										type="text"
										value={ input.path }
										placeholder="Ingresar una ruta de archivo"
										disabled={ input.file ? true : null }
										onChange={ handleInputChange }
									/>
								</Form.Group>
							</Col>
							<Col xs={ 12 }>
								<Form.Group>
									<Form.File 
										custom
										id="custom-file"
										name="file"
										label="Seleccionar un archivo"
										disabled={ input.path ? true : null }
										data-browse="Buscar media"
										onChange={ handleInputChange }
									/>
								</Form.Group>
							</Col>
						</Form.Row>
						<button type="submit" className="mediaForm__button-submit">
							Agregar
						</button>
					</Form>
				</Col>
				<Col xs={ { span: 12, order: 'first' } } lg={ { span: 7, order: 'last' } }>
					<Row>
						{
							medias.map( ( m, i ) => (
								<Col xs={ 12 } sm={ 6 }>
									<MediaRow key={ i } media={ m } onDelete={ handleMediaDelete }/>
								</Col>
							) )
						}
					</Row>
				</Col>
			</Row>
		</Container>
	);
}

function validate( input )
{
	if ( !input.alias )
	{
		return 'Debes ingresar un alias';
	}
	
	if ( !input.file && !input.path )
	{
		return 'Debes ingresar una ruta o un achivo';
	}
	
	if ( input.type === 'none' )
	{
		return 'Debes elegir un tipo de media';
	}

	return '';
}

export default MediaUploader;