import React from 'react';
import { Form, Button, FormControl, Col } from 'react-bootstrap'

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
<<<<<<< HEAD
        <Form inline>
            <FormControl 
                type="text" 
                placeholder="Search your game" 
                className="mr-sm-2"  
                name="searchInput" 
                onChange={() => handleInputChange()}/>
            <Button variant="outline-info">Search</Button>
=======
        <Form>
            <Form.Row>
                <Col sm={12} md={8}>
                    <FormControl 
                        type="text" 
                        placeholder="Search your game" 
                        className="mr-sm-2"  
                        name="searchInput" 
                        onChange={handleInputChange}/>
                </Col>
                <Col sm={12} md={4}>
                    <Button variant="outline-info" block className="mt-2 mt-md-0">Search</Button>
                </Col>
            </Form.Row>
>>>>>>> a907fcc34bc159c489a270c45525ea01e6091951
        </Form>
    );
};

export default SearchBar;