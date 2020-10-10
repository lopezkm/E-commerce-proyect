import React from 'react';
import ProductCard from './product_card';
import sc from '../styles/catalogue.module.css'
import { Container, Row, Col } from 'react-bootstrap';


const Catalogue = () => {
    const arr = [
        {
            name: "Assassin's Creed Syndicate",
            price: 50000,
            developer: "Ubisoft",
            media: "https://static.wikia.nocookie.net/theassassinscreed/images/9/94/Assassins_Creed_Syndicate.jpg/revision/latest/top-crop/width/360/height/450?cb=20150512190332&path-prefix=es"
        },
        {
            name: "Assassin's Creed II",
            price: 30000,
            developer: "Ubisoft",
            media: "https://static.wikia.nocookie.net/theassassinscreed/images/4/41/Ac2cover.jpg/revision/latest/top-crop/width/360/height/450?cb=20100918031210&path-prefix=es"
        },
        {
            name: "Call of Duty Modern Warfare",
            price: 10000,
            developer: "Santa Monica",
            media: "https://vignette.wikia.nocookie.net/cod/images/7/76/ModernWarfare2019_Artwork.jpg/revision/latest/top-crop/width/360/height/450?cb=20190530231942&path-prefix=es"
        },
        {
            name: "Call of Duty WWII",
            price: "free to play",
            developer: "Infinity Ward",
            media: "https://vignette.wikia.nocookie.net/cod/images/3/36/Codww2.jpg/revision/latest/top-crop/width/360/height/450?cb=20190318214417&path-prefix=es"
        },
        {
            name: "Call of Duty",
            price: 50000,
            developer: "Activision",
            media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
        },
        {
            name: "Mario",
            price: 30000,
            developer: "Nintendo",
            media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
        },
        {
            name: "God of War",
            price: 10000,
            developer: "Santa Monica",
            media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
        },
        {
            name: "Call of Duty WWII",
            price: "free to play",
            developer: "Infinity Ward",
            media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
        },
    ]
    /* Recordatorio: agregar los estilos denuevo a productCard */
    return (
            <Row>
                {arr.map(game => {
                    return <Col sm={12} md={4} lg={3}>
                                <ProductCard 
                                    name={game.name}
                                    price={game.price}
                                    developer={game.developer}
                                    media={game.media}
                                />
                            </Col>
                })}
            </Row>
    );
};

export default Catalogue;