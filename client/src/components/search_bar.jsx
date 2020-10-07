import React from 'react';
import { Nav, Form, Button, FormControl, Navbar } from 'react-bootstrap'

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
        <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl 
        type="text" 
        placeholder="Search your game" 
        className="mr-sm-2"  
        name="searchInput" 
        onChange={handleInputChange}/>
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
    );
};

export default SearchBar;