import React from 'react';
import ProductCard from './product_card.jsx'

const Result = ({ products }) => {
    if(products.data){
        return (
            <div>
                {
                    products.data.map(x =>{
                        return (
                            <ProductCard
                                name={x.name}
                                price={x.price}
                                media={x.media[ 0 ].path}
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