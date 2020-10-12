import React from 'react';
import { Form, Button, FormControl, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchBar = ({ findProducts }) => {
    const [input, setInput] = React.useState({
        searchInput: ""
    })

    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        findProducts(input.searchInput);
        setInput({ searchInput: "" })
    };

    return (
        <Form onSubmit={(event) => handleSubmit(event)}>
            <Form.Row>
                <Col sm={12} md={8}>
                    <FormControl 
                        type="text"
                        placeholder="Search your game"
                        className="mr-sm-2"
                        name="searchInput"
                        onChange={(event) => handleInputChange(event)} />
                </Col>
                <Col sm={12} md={4}>
                    <Link to={`/search/${input.searchInput}`}>
                        <Button type="submit" variant="outline-info" block className="mt-2 mt-md-0 searchBar-button">Buscar</Button>
                    </Link>
                </Col>
            </Form.Row>
        </Form>
    );
};

export default SearchBar;
