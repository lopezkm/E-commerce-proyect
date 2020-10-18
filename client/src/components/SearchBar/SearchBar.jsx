import React, { useState, useRef, useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'query-string';
import { useEffect } from 'react';

function SearchBar( )
{
	const [ input, setInput ] = useState( null );
	
	const inputWrapper = useRef( null );
	const inputElement = useRef( null );
	
	const location = useLocation( );
	const history = useHistory( );
	
	const updateHistory = ( empty ) => {
		let query = qs.parse( location.search, { arrayFormat: 'comma' } );
		
		( empty || !input ) ?
			delete query.query : query.query = input;
		
		query = qs.stringify( query, { arrayFormat: 'comma' } );
		
		history.push( `/products?${ query }` );
	};
	
	const handleSubmit = ( e ) => {
		e.preventDefault( );
		
		updateHistory( );
	};
	
	const handleInputBlur = ( e ) => {
		if ( !input ) {
			inputWrapper.current.style.display = null;
		}
		
		updateHistory( );
	}
	
	const handleCloseClick = ( e ) => {
		e.preventDefault( );
		
		setInput( '' );
		updateHistory( true );
		
		inputWrapper.current.style.display = null;
	};
	
	const handleSearchClick = ( e ) => {
		if ( input || ( window.innerWidth < 992 ) ) {
			return;
		}
		
		e.preventDefault( );
		
		if ( !inputWrapper.current.style.display ) {
			inputWrapper.current.style.display = 'block';
			inputElement.current.focus( );
		}
		else {
			inputWrapper.current.style.display = null;
		}
	}

	const handleInputChange = ( e ) => {
		setInput( e.target.value );
	};
	
	useEffect( ( ) => {
		const { query } = qs.parse( location.search, { arrayFormat: 'comma' } );
		
		if ( query ) {
			setInput( query );
		}
	}, [ ] );
	
	useLayoutEffect( ( ) => {
		if ( input ) {
			inputWrapper.current.style.display = 'block';
		}
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

export default SearchBar;