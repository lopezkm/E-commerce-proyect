import React, { useEffect, useState, useRef } from 'react';
import style from './checkable.module.css';

function Checkable( { name, id, onChange, initial } )
{
	const [ checked, setChecked ] = useState( !!initial );
	const firstRender = useRef( true );
	
	useEffect( ( ) => {
		firstRender.current ?
			( firstRender.current = false ) : onChange( checked, id );
	}, [ checked ] );
	
	return (
		<div className={ `${style.checkable} ${checked ? style.active : ''}` } onClick={ ( ) => setChecked( !checked ) }>
			<span>{ name }</span>
			{ checked && <span>✓</span> }
		</div>
	);
}

export default Checkable;