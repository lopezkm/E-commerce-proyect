import React from 'react';
import ProductCard from './product_card';
import sc from '../styles/catalogue.module.css'

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
        <div className={sc.container}>
            {arr.map(game => {
                return <ProductCard 
                    name={game.name}
                    price={game.price}
                    developer={game.developer}
                    media={game.media}
                />
            })}
        </div>
    );
};

export default Catalogue;