import React from 'react';
import { Card } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";

const Review = ({ title, description, date, user, stars }) => {

    const dateFormat = date.substring(0, 10).split('-').reverse().join('/');

    return (
        <Card style = {{ color: "black"}}>
            <Card.Header>
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