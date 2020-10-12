import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Result from './search_results'
import axios from 'axios';
let result;

const SearchBar = ({ findProducts }) => {
    const [input, setInput] = React.useState({
        searchInput: ""
    })

    const handleInputChange = (event) =>{
        setInput({
          ...input,
          [event.target.name] : event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        findProducts( input.searchInput );
        setInput({searchInput: ""})  
    };

    return (
        <Form onSubmit={(event) => handleSubmit(event)}>
            <FormControl 
                type="text" 
                placeholder="Search your game" 
                className="mr-sm-2"  
                name="searchInput" 
                onChange={(event) => handleInputChange(event)}/>
                <Link to={`/search/${input.searchInput}`}>
                    <Button type="submit" variant="outline-info" >Search</Button>
                </Link>
            
        </Form>
    );
};

export default SearchBar;
