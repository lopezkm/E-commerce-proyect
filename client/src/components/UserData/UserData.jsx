import React, { useState, useEffect } from 'react';
import { Card, Container, Row} from 'react-bootstrap';
import axios from 'axios';

const UserData = () => {

    const [loading, setLoading] = useState();
    const [user, setUser] = useState({});

    const getUserData = ( ) => {
        axios.get( `http://localhost:3000/auth/me`, {withCredentials: true})
        .then( ( response ) => { 
            let myData = response.data;
            setUser( myData );
            console.log(myData)
        } )        
        
    }

    useEffect( () => {
        getUserData();
        setLoading(false);
    }, [loading])

    let dateFormat = user.createdAt && user.createdAt.substring( 0, 10 ).split( '-' ).reverse( ).join( '/' );

    return (
        <Container className="user-data-container">
            <h1>Datos personales</h1>
				<Card>
                    <Card.Title bsPrefix="user-data-cardTitle"> Nombres: {user.firstName} </Card.Title>
                    <Card.Title bsPrefix="user-data-cardTitle-under"> Apellidos: {user.lastName} </Card.Title>
                </Card>
            <h1>Datos de la cuenta</h1>
            <Card>
                <Card.Title bsPrefix="user-data-cardTitle"> Fecha de creación: {dateFormat} </Card.Title> 
                <Card.Title bsPrefix="user-data-cardTitle-under"> Email de registro: {user.email} </Card.Title>
            </Card>
		</Container>
    )
}


export default UserData;