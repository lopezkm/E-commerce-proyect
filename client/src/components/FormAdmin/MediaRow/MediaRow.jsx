import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function MediaRow( { name, id, onDelete } )
{
	return (
		<div className="mediaRow">
			<span>{name}</span>
			<button className="mediaRow__button">
				<FontAwesomeIcon icon={ faTimes } onClick={ ( ) => onDelete( id ) }/>
			</button>
		</div>
	);
}

export default MediaRow;