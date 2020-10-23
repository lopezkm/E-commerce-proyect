import React from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";

const API_URL = process.env.REACT_APP_API_URL;

const Review = ({ title, description, date, user, stars, productId, userId, deleteReview }) => {

    const dateFormat = date.substring(0, 10).split('-').reverse().join('/');


    return (
        <Card style = {{ color: "black"}}>
            <Card.Header>
                <Button onClick={() => deleteReview(productId, userId)}>X</Button>
                <Card.Title>{ user }</Card.Title>
                <Card.Text>{ dateFormat }</Card.Text>
                <ReactStars
                    value = { stars }
                    count={5}
                    size={25}
                    edit= { false }
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
            </Card.Header>
            <Card.Body>
                <Card.Title>{ title }</Card.Title>
                <Card.Text>{ description }</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Review;