import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, FormControl, Container } from 'react-bootstrap';
import axios from 'axios';

const FormDeleteCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState({ searchInput: "" })
    const searchInput =useRef(null);
    let clickedOption;

    const getCategories = () => {
        axios.get(`http://localhost:3000/products/category/`)
            .then(response => {
                setCategories(response.data);
            })
    }

    useEffect(() => {
        getCategories();
        setLoading(false);
    }, [loading]);

    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });

    };

    const handleSelectChange = (event) => {

        let selector = document.getElementById("categoryList");
        clickedOption = selector.options[selector.selectedIndex].id;

    }

    const deleteCategory = (id) => {
        if(!id)
        {
            return alert("Seleccione la categoria que quiere eliminar")     
        }
        axios.delete(`http://localhost:3000/products/category/${id}`, { withCredentials: true }) 
        window.location.reload()
    }

    let showCategories = categories.filter(category => category.name.toLowerCase().includes(input.searchInput.toLowerCase()))

    return (
        <div>
            {/* Formulario para eliminar categorías */}
            
            <h1 className='formAdmin-title'>Eliminar una categoria</h1>

            <Container >

                <Form className='formAdmin-delete-container'>
                    <Form.Group>
                        <FormControl
                            type="text"
                            placeholder="Search the require category"
                            className="mr-sm-2"
                            name="searchInput"
                            ref={searchInput}
                            onChange={(event) => handleInputChange(event)} />

                        <Form.Control as="select" multiple id="categoryList" onClick={(e) => handleSelectChange(e)}>
                            {
                                showCategories.map((category,i) => (
                                    <option key={i} id={category.id} >
                                        {category.name}
                                    </option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                </Form>

                <Button type="submit" variant="danger" onClick={() => deleteCategory(clickedOption)} >Borrar</Button>

            </Container>
        </div>
    )

}

export default FormDeleteCategory;