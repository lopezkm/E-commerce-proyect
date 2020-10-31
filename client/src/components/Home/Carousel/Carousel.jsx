import React from 'react';
import { Container, Image } from 'react-bootstrap';

const Carousel = () => {
    return (
        <Container className='carousel-container'>
            <div>
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
            </div>
        </Container>
    );
};

export default Carousel;