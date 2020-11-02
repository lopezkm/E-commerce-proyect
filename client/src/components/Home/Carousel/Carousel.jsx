import React, { useEffect } from 'react';
import axios from 'axios';
import { Container, Image } from 'react-bootstrap';
import defaultCarousel from '../../../assets/portrait.jpg';

const API_URL = process.env.REACT_APP_API_URL;


const Carousel = () => {

    const [products, setProducts] = React.useState([]);

    let itemCarousel = products.sort(() => Math.random() - 0.5).splice(0, 4);
    
    const getProducts = () => {
        axios.get(`${API_URL}/products`)
            .then(response => setProducts(response.data))
            .catch(err => console.log(err))
    }

    const getProductCarousel = (media) => {
        if (!media || (media.length === 0)) {
            return defaultCarousel;
        }

        const portrait = media.find(m => m.type === 'carousel');

        if (!portrait) {
            return defaultCarousel;
        }

        if (!portrait.path.includes('/')) {
            return `${API_URL}/${portrait.path}`;
        }

        return portrait.path;
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <Container className='carousel-container'>
            {
                itemCarousel.map(item => (
                    <div>
                        <Image src={getProductCarousel(item.media)} />
                        <div className='carousel-text'>
                            <h2>{item.name}</h2>
                            <span>{item.price}US$</span>
                        </div>
                    </div>
                ))
            }
        </Container>
    );
};

export default Carousel;


            //Codigo de prueba//

            {/*<div>
                <Image src='https://generacionxbox.com/wp-content/uploads/2017/12/assassinscreed_rougue.jpg' />
                <div className='carousel-text'>
                    <h2>Assassin's Creed Rogue</h2>
                    <span>$50</span>
                </div>
            </div>
            <div>
                <Image src='https://images3.alphacoders.com/751/thumb-1920-751195.jpg' />
                <div className='carousel-text'>
                    <h2>TITANFALL 2</h2>
                    <span>$50</span>
                </div>
            </div>
            <div>
                <Image src='https://i.pinimg.com/originals/c2/49/f1/c249f14eccea62157e7e65461cb15708.jpg' />
                <div className='carousel-text'>
                    <h2>The Whitcher III: Wild Hunt</h2>
                    <span>$50</span>
                </div>
            </div>
            <div>
                <Image src='https://wallpaperaccess.com/full/2386947.jpg' />
                <div className='carousel-text'>
                    <h2>PLAYERUNKNOWN'S BATTLEGROUNDS</h2>
                    <span>$50</span>
                </div>
            </div> */}