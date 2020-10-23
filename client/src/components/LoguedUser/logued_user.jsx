import React, { useState, useEffect } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';


const LoguedUser = ({ userId }) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState();

    useEffect( ( ) => {
		axios.get( `http://localhost:3000/users/:${userId}` ).then( ( response ) => {
			setUser( response.data );
            setLoading( false ); 
		} );
	}, [] );

    return (
            <Container>
                <Card>
                    <Card.Header bsPrefix="card-header">
    <Card.Title bsPrefix="card-title">Hola  {/* {user.firstName} */} Matias</Card.Title>
                    </Card.Header>
                    
                    <Card.Body bsPrefix="card-body">
                        <Link>
                            <Card.Text bsPrefix="card-text">Mis Compras</Card.Text>
                        </Link>
                        <div>
                            <hr/>
                        </div>
                        <Link>
                            <Card.Text>Mis Datos</Card.Text>
                        </Link>
                        <div>
                            <hr/>
                        </div>
                        <Link>
                            <Card.Text>Seguridad</Card.Text>
                        </Link>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="ligth" className="card-button">Salir</Button>
                    </Card.Footer>
                </Card>
            </Container>
    );
};

export default LoguedUser;