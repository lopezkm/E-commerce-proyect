import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar( )
{
	const history = useHistory( );
	const [ input, setInput ] = useState( '' );

	const handleSubmit = ( e ) => {
		e.preventDefault( );
		
		if(input !== '') {

			history.push( `/search/${ input }` );
			setInput( '' );

		}
	};

	const handleInputChange = ( e ) => {
		setInput( e.target.value );
	};
	
	const handleOnClick = ( e ) => {
		e.preventDefault( );
	};
	
	return (
		<form className="searchBar" onSubmit={ handleSubmit }>
			<button type="submit" className="searchBar__button">
				<FontAwesomeIcon icon={ faSearch } />
			</button>
			<input type="text" value={ input } placeholder="Busca un juego..." name="search" autoComplete="off" className="searchBar__input" onChange={ handleInputChange }/>
		</form>
	);
}

export default SearchBar;