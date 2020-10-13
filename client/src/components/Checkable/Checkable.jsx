import React, { useEffect, useState, useRef } from 'react';

function Checkable( { name, id, onChange, initial } )
{
	const [ checked, setChecked ] = useState( !!initial );
	const firstRender = useRef( true );
	
	useEffect( ( ) => {
		firstRender.current ?
			( firstRender.current = false ) : onChange( checked, id );
	}, [ checked, id, onChange ] );
	
	return (
		<div className={ `checkable ${checked ? 'checkable-active' : ''}` } onClick={ ( ) => setChecked( !checked ) }>
			<span>{ name }</span>
			{ checked && <span>✓</span> }
		</div>
	);
}

export default Checkable;