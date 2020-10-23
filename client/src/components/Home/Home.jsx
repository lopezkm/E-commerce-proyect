import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PrincipalCard from './PrincipalCard/PrincipalCard.jsx'
import SecondCard from './SecondCard/SecondCard.jsx'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;


const Home = () => {

    const [products, setProducts] = React.useState([]);
    console.log(products)

    let secondCards = products.sort( ( ) => Math.random( ) - 0.5 ).splice( 0, 4 );
    console.log(secondCards)

    const getProducts = () => {
        axios.get(`${API_URL}/products`)
        .then(response => setProducts(response.data))
        .catch(err => console.log(err))
    }

    useEffect( () => {
		getProducts();
	}, [] );

    

    return (
        <Container className='home-container' fluid>
            <PrincipalCard />
            <Row className='home-secondCard-container'>
                {
                    secondCards.map((card, i) => (

                        <Col xs={6}>
                            <Link to={`/product/${card.id}`}>
                                <SecondCard
                                    img={'https://steamcdn-a.akamaihd.net/steam/apps/287700/capsule_616x353.jpg?t=1591740509'}
                                    name={card.name}
                                    offer={"30$"}
                                    price={card.price}
                                    key={i}
                                />
                            </Link>
                        </Col>
                    ))
                }

                {/* <Col xs={6}>
                    <SecondCard
                        img={'https://steamcdn-a.akamaihd.net/steam/apps/287700/capsule_616x353.jpg?t=1591740509'}
                        name={"Metal Gear Solid V: The Phantom Pain"}
                        offer={"30$"}
                        price={"50$"}

                    />
                </Col>
                <Col xs={6}>
                    <SecondCard img={'https://cdn.cloudflare.steamstatic.com/steam/apps/1030840/capsule_616x353.jpg?t=1600210047'}
                        name={"Mafia: Definitive Edition"}
                        price={"50$"}
                    />
                </Col>
                <Col xs={6}>
                    <Link to='/product/6'>
                        <SecondCard img={'https://steamcdn-a.akamaihd.net/steam/apps/1222730/capsule_616x353.jpg?t=1593539249'}
                            name={"Star Wars: Squadrons"}
                            price={"50$"}
                        />
                    </Link>
                </Col>
                <Col xs={6}>
                    <SecondCard img={'https://steamcdn-a.akamaihd.net/steam/apps/289650/capsule_616x353.jpg?t=1602601508'}
                        name={"Assassin's Creed: Unity"}
                        price={"50$"}
                    />
                </Col> */}
            </Row>
            <div className='home-button-container'>
                <FontAwesomeIcon icon={faGamepad} />
                <Button href='/products'>¡Echale un vistazo a nuestro catalogo!</Button>
            </div>

        </Container>
    );
};

export default Home;