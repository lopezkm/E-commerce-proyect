import React, { useEffect, useState } from 'react';
import ProductCard from './product_card';
import { Container, Row, Col } from 'react-bootstrap';
import sc from '../styles/catalogue.module.css'; 

function Catalogue () {
    const [categories, setCategories] = useState([]);
    const arr = [];

    // useEffect(() => {getCategories()})
    async function postCategories () {
        await fetch('http://localhost:3000/products/category', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:"shooter",description:"tiros"})
        })
        await fetch('http://localhost:3000/products/category', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:"moba",description:"stress"})
        })
        await fetch('http://localhost:3000/products/category', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:"aventura",description:"wow"})
        })
        getCategories();
    }

    function getCategories() {
        fetch('http://localhost:3000/products/category')
        .then(data => data.json())
        .then(dataCat => {
                setCategories(dataCat);
            }
        );
    }

    function searchProductsByCategory(e) {
        const {value, checked} = e.target
        if(checked){
            arr.push(value);
        }
        else{
            arr = arr.filter((id) => id !== value);
        }

        console.log(value, checked);
    }
    
    // const arr = [
    //     {
    //         name: "Call of Duty",
    //         price: 50000,
    //         developer: "Activision",
    //         media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
    //     },
    //     {
    //         name: "Mario",
    //         price: 30000,
    //         developer: "Nintendo",
    //         media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
    //     },
    //     {
    //         name: "God of War",
    //         price: 10000,
    //         developer: "Santa Monica",
    //         media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
    //     },
    //     {
    //         name: "Call of Duty Mobile",
    //         price: "free to play",
    //         developer: "Infinity Ward",
    //         media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
    //     },
    //     {
    //         name: "Call of Duty",
    //         price: 50000,
    //         developer: "Activision",
    //         media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
    //     },
    //     {
    //         name: "Mario",
    //         price: 30000,
    //         developer: "Nintendo",
    //         media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
    //     },
    //     {
    //         name: "God of War",
    //         price: 10000,
    //         developer: "Santa Monica",
    //         media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
    //     },
    //     {
    //         name: "Call of Duty Mobile",
    //         price: "free to play",
    //         developer: "Infinity Ward",
    //         media: "https://media.vandal.net/i/200x200/78025/call-of-duty-mobile-2019102104887_1.jpg"
    //     },
    // ]
    /* Recordatorio: agregar los estilos denuevo a productCard */
    return (
        <Container fluid>
            <Row>
                <Col xs={2}>
                    <button onClick={postCategories}>Add Categories</button>
                    <ul>
                        {categories.map(category =>
                            <li>
                                <input 
                                    type="checkbox" 
                                    value={category.id} 
                                    onChange={(e) => searchProductsByCategory(e)}
                                /> 
                                 {category.name}
                            </li>  
                        )}
                        
                    </ul>
                </Col>
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