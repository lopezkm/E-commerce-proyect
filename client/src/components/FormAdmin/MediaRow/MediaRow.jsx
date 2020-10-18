import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const API_URL = process.env.REACT_APP_API_URL;

const getRealPath = ( path ) => {
	if ( !path ) {
		return null;
	}
	
	if ( !path.includes( '/' ) ) {
		path = `${ API_URL }/${ path }`;
	}
	
	return path;
}

function MediaRow( { media, onDelete } )
{
	const { path, type, id } = media;
	
	return (
		<div className="mediaRow">
			{
				( type.substring( 0, 5 ) === 'video' ) ?
					<video controls>
						<source src={ getRealPath( path ) } type="video/mp4" />
					</video> :
					
					<img src={ getRealPath( path ) } />
			}
			<div className="mediaRow__tile-overlay">
				<span className="mediaRow__tile-text">{ type }</span>
				<button className="mediaRow__tile-button">
					<FontAwesomeIcon icon={ faTimes } onClick={ ( ) => onDelete( id ) }/>
				</button>
			</div>
		</div>
	);
}

export default MediaRow;