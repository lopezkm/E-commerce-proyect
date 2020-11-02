import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PrincipalCard from './PrincipalCard/PrincipalCard.jsx'
import SecondCard from './SecondCard/SecondCard.jsx'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';
import Carousel from './Carousel/Carousel.jsx';
import axios from 'axios';
import defaultHome from '../../assets/portrait.jpg';

const API_URL = process.env.REACT_APP_API_URL;


const Home = () => {

    const [products, setProducts] = React.useState([]);

    let secondCards = products.sort(() => Math.random() - 0.5).splice(0, 4);

    const getProducts = () => {
        axios.get(`${API_URL}/products`)
            .then(response => setProducts(response.data))
            .catch(err => console.log(err))
    }

    const getProductHome = (media) => {
        if (!media || (media.length === 0)) {
            return defaultHome;
        }

        const portrait = media.find(m => m.type === 'home');

        if (!portrait) {
            return defaultHome;
        }

        if (!portrait.path.includes('/')) {
            return `${API_URL}/${portrait.path}`;
        }

        return portrait.path;
    }

    useEffect(() => {
        getProducts();
    }, []);

    const titleLeft = '"UNA OBRA MAESTRA"  9.3/10 - IGN"';
    const imgLeft = 'https://wallpapercave.com/wp/wp1897911.jpg';
    const textLeft = 'Disfruta de una experiencia de juego de rol intensa y gratificante que incluye un combate táctico muy variado. Fusiona equipamiento primitivo con tecnología de avanzada para elaborar dispositivos que conviertan a los depredadores en presas.';
    const titleRight = 'Horizon Zero Dawn';
    const imgRight = 'https://wallpaperset.com/w/full/2/1/2/453698.jpg';
    const textRight = 'Un estimulante y nuevo juego de acción y de rol exclusivo para el sistema PlayStation® 4, desarrollado por la galardonada empresa Guerrilla Games, creadores de la venerada franquicia Killzone de PlayStation.';


    return (
        <Container className='home-container' fluid>
            <PrincipalCard 
                titleLeft   = {titleLeft}
                imgLeft     = {imgLeft}
                textLeft    = {textLeft}
                titleRight  = {titleRight}
                imgRight    = {imgRight}
                textRight   = {textRight}
            />
            <Carousel/>
            <Row className='home-secondCard-container'>
                {
                    secondCards.map((card, i) => (

                        <Col xs={6}>
                            <Link to={`/product/${card.id}`}>
                                <SecondCard
                                    img={getProductHome(card.media)}
                                    name={card.name}
                                    offer={"30$"}
                                    price={card.price}
                                    key={i}
                                />
                            </Link>
                        </Col>
                    ))
                }
            </Row>
            <div className='home-button-container'>
                <FontAwesomeIcon icon={faGamepad} />
                <Button href='/products'>¡Echale un vistazo a nuestro catálogo!</Button>
            </div>

        </Container>
    );
};

export default Home;