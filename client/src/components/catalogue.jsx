import React from 'react';
import ProductCard from './product_card';
import { Container, Row, Col } from 'react-bootstrap';
import sc from '../styles/catalogue.module.css'; 

const postMethod = {
    method: 'POST',
    body: JSON.stringify({name:"So",description:"ter"})
} 

function getCategories() {
    fetch('http://localhost:3000/products/category', {postMethod}).then(prueba => console.log(prueba));
    fetch('http://localhost:3000/products/category').then(prueba => console.log(prueba))
}

const Catalogue = () => {
    const arr = [
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
            name: "Call of Duty Mobile",
            price: "free to play",
            developer: "Infinity Ward",
            media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
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
            name: "Call of Duty Mobile",
            price: "free to play",
            developer: "Infinity Ward",
            media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
        },
    ]
    /* Recordatorio: agregar los estilos denuevo a productCard */
    return (
        <Container fluid>
            <Row>
                <Col xs={2}><button onClick={() => getCategories()}>Prueba</button></Col>
                <Col xs={10}>
                    <Row>
                        {arr.map(game => {
                            return <Col xs={2}>
                                <ProductCard
                                name={game.name}
                                price={game.price}
                                developer={game.developer}
                                media={game.media}
                                />
                            </Col>
                        })}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default Catalogue;