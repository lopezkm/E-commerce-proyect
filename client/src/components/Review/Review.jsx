import React from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const API_URL = process.env.REACT_APP_API_URL;

const Review = ({ title, description, date, user, stars, productId, userId, deleteReview, actualUser }) => {

    const history = useHistory();

    const dateFormat = date.substring(0, 10).split('-').reverse().join('/');


    return (
        <Card className='review-container'>
            <Card.Header>
                {actualUser === userId ? 
                <div>
                <FontAwesomeIcon className='review-delete-button' icon={ faTrash } onClick={() => deleteReview(productId, userId)}/>
                <FontAwesomeIcon className='review-modify-button' icon={ faPenSquare } onClick={() => history.push(`/product/${productId}/modifyReview`)}/>
                </div>
                : null } 
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