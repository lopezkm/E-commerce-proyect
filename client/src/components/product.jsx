import React from 'react';

const Product = ({ name, description, price, stock, media, developer, publisher, publishDate}) => {
    return(

        <div>
            <h1>{name}</h1>
            <p>{description}</p>
            <span>${price}</span>
            <p>Stock disponible: {stock}</p>
            <img src={media}/>
            <span>Desarrollado por: {developer}</span>
            <span>Publicado por: {publisher}</span>
            <span>Fecha de publicación: {publishDate}</span>
        </div>
    )
}

export default Product;