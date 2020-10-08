import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap'

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

    return (
        <Form inline>
            <FormControl 
                type="text" 
                placeholder="Search your game" 
                className="mr-sm-2"  
                name="searchInput" 
                onChange={handleInputChange}/>
            <Button variant="outline-info">Search</Button>
        </Form>
    );
};

export default SearchBar;