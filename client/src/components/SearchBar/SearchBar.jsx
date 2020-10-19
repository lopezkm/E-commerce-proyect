import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';

function SearchBar( )
{
	const [ input, setInput ] = useState( '' );
	
	const inputWrapper = useRef( null );
	const inputElement = useRef( null );
	
	const location = useLocation( );
	const history = useHistory( );
	
	const updateHistory = ( empty ) => {
		let query = qs.parse( location.search, { arrayFormat: 'comma' } );
		
		if ( empty || !input ) {
			if ( location.pathname !== '/products' ) {
				return;
			}
			
			delete query.query
		}
		else {
			query.query = input;
		}
		
		query = qs.stringify( query, { arrayFormat: 'comma' } );
		
		history.push( `/products?${ query }` );
	};
	
	const handleSubmit = ( e ) => {
		e.preventDefault( );
		
		updateHistory( );
	};
	
	const handleInputBlur = ( e ) => {
		if ( !input ) {
			hideInputElement( inputWrapper.current );
		}
	}
	
	const handleCloseClick = ( e ) => {
		e.preventDefault( );
		
		setInput( '' );
		updateHistory( true );
		
		if ( window.innerWidth >= 992 ) {
			hideInputElement( inputWrapper.current );
		}
	};
	
	const handleSearchClick = ( e ) => {
		if ( input || ( window.innerWidth < 992 ) ) {
			return;
		}
		
		e.preventDefault( );
		
		if ( inputWrapper.current.style.opacity < 1.0 ) {
			showInputElement( inputWrapper.current );
			
			inputElement.current.focus( );
		}
		else {
			hideInputElement( inputWrapper.current );
		}
	}

	const handleInputChange = ( e ) => {
		setInput( e.target.value );
	};
	
	useEffect( ( ) => {
		const { query } = qs.parse( location.search, { arrayFormat: 'comma' } );
		
		if ( !query ) {
			return;
		}
		
		setInput( query );
		showInputElement( inputWrapper.current );
	}, [ ] );
	
	return (
		<form className="searchBar" onSubmit={ handleSubmit }>
			<button type="submit" className="searchBar__submit-button" onClick={ handleSearchClick }>
				<FontAwesomeIcon icon={ faSearch } />
			</button>
			
			<div ref={ inputWrapper } className="searchBar__input-wrapper">
				<input ref={ inputElement } type="text" value={ input } placeholder="Busca un juego..." name="search" autoComplete="off" className="searchBar__input" onBlur={ handleInputBlur } onChange={ handleInputChange }/>
				<button className="searchBar__close-button" onClick={ handleCloseClick }>
					<FontAwesomeIcon icon={ faTimes } />
				</button>
			</div>
		</form>
	);
}

function hideInputElement( element )
{
	element.style.width = '0';
	element.style.opacity = '0.0';
	element.style.zIndex = '-1';
}

function showInputElement( element )
{
	element.style.width = '100%';
	element.style.opacity = '1.0';
	element.style.zIndex = '1';
}

export default SearchBar;