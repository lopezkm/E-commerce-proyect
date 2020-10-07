import React from 'react';
import { Card, Button } from 'react-bootstrap'

const Product = ({ name, description, price, stock, media, developer, publisher, publishDate}) => {
    return(

        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={media} alt={`img Game ${name}`} />
                <Card.Body>
                    <Card.Title> {name} </Card.Title>
                    <Card.Text> 
                        <h3> ${price} </h3>
                        <p> {description} </p>
                        <span> Stock disponible: {stock} </span>
                        <br/>
                        <span>Desarrollado por: {developer}</span>
                        <br/>
                        <span>Publicado por: {publisher}</span>
                        <br/>
                        <span>Fecha de publicación: {publishDate}</span>
                        <br/>
                        <Button>ADD to Cart</Button>
                     </Card.Text>
                </Card.Body>
            </Card>
        </div>

    )
}

export default Product;