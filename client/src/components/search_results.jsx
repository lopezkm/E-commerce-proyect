import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard/ProductCard.jsx';
import axios from 'axios';

let SaveData;

const Result = ({ products }) => {

    const [result, setResult] = useState("")
    const [loading, setLoading] = useState(true);

    if (SaveData !== products) {
        setLoading(true);
        SaveData = products;
    }

    const getResult = () => {
        axios.get(`http://localhost:3000/search?query=${products}`)
            .then(response => {
                setResult(response);
            })
    };

    useEffect(() => {
        getResult();
        setLoading(false);

    }, [loading]);


    if (result.data) {
        if (result.data.length > 0) {
            return (
                <div>
                    {
                        result.data.map(x => {
                            return (
                                <ProductCard
                                    name={x.name}
                                    price={x.price}
                                    media={'/' + x.media[0].path}
                                    developer={x.developer}
                                    key={x.id}
                                />
                            )
                        })
                    }
                </div>
            );
        } else {
            return (
            <h1>No se encontraron resultados para: {products}</h1>
            )
        }
    }

    else {
        return (
            <h1>Cargando...</h1>
        )
    }
};

export default Result;