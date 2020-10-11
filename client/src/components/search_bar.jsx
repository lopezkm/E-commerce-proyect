import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import axios from 'axios';

const SearchBar = () => {
    const [input, setInput] = React.useState({
        searchInput: "",
    });

    const handleInputChange = (event) =>{
        setInput({
          ...input,
          [event.target.name] : event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.get( `http://localhost:3000/search?query=${input.searchInput}` )
			.then( response => {
                console.log(response);
		});
    }

    return (
        <Form onSubmit={(event) => handleSubmit(event)}>
            <FormControl 
                type="text" 
                placeholder="Search your game" 
                className="mr-sm-2"  
                name="searchInput" 
                onChange={(event) => handleInputChange(event)}/>
            <Button type="submit" variant="outline-info">Search</Button>
        </Form>
    );
};

export default SearchBar;