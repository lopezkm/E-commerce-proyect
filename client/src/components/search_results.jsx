import React, { useState, useEffect } from 'react';
import ProductCard from './product_card.jsx';
import axios from 'axios';

let SaveData;

const Result = ({ products }) => {

    const [result, setResult] = useState ("")
    const [ loading, setLoading ] = useState( true );

    if(SaveData !== products){
        setLoading (true);
        SaveData = products;
    }  

    const getResult = () => {
        axios.get( `http://localhost:3000/search?query=${products}` )
            .then( response => {
                setResult(response);
        });
    };
    
    useEffect( () => {
        getResult();
        setLoading (false);

    }, [ loading ]);

    
    if(result.data){
        return (
            <div>
                {
                    result.data.map(x =>{
                        return (
                            <ProductCard
                                name={x.name}
                                price={x.price}
                                media={'/' + x.media[ 0 ].path}
                                developer={x.developer}  
                                key={x.id} 
                            />
                        )
                    })
                }
            </div> 
        );
    }



    else{
        return(
            <h1>PAILA</h1>
        )
    }
};

export default Result;