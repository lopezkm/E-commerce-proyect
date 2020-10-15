import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, FormControl, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import NavAdmin from '../NavAdmin/nav_admin.jsx';
import store from '../../redux/store/store.js';
console.log('formAdminDelete',store.getState());

const FormAdminDelete = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState({ searchInput: "" })
    const searchInput =useRef(null);
    let clickedOption;

    const getProducts = () => {
        axios.get(`http://localhost:3000/products/`)
            .then(response => {
                setProducts(response.data);
            })
    }

    useEffect(() => {
        getProducts();
        setLoading(false);
        searchInput.current.focus()
    }, [loading]);

    const handleInputChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });

    };

    const handleSelectChange = (event) => {

        let selector = document.getElementById("productList");
        clickedOption = selector.options[selector.selectedIndex].id;

    }

    const deleteProduct = (id) => {
        if(!id)
        {
            return alert("Seleccione el juego que quiere eliminar")     
        }
        axios.delete(`http://localhost:3000/products/${id}`) 
        window.location.reload()
    }

    let showProducts = products.filter(product => product.name.toLowerCase().includes(input.searchInput.toLowerCase()))

    return (
        <div>

            <NavAdmin />
            <h1 className='formAdmin-title'>Eliminar un producto</h1>
            <Container >

                <Form className='formAdmin-delete-container'>
                    <Form.Group>
                        <FormControl
                            type="text"
                            placeholder="Search your game"
                            className="mr-sm-2"
                            name="searchInput"
                            ref={searchInput}
                            onChange={(event) => handleInputChange(event)} />


                        <Form.Control as="select" multiple id="productList" onClick={(e) => handleSelectChange(e)}>
                            {
                                showProducts.map(product => (
                                    <option id={product.id} >
                                        {product.name}
                                    </option>
                                ))
                            }



                        </Form.Control>
                    </Form.Group>
                </Form>

                <Button type="submit" variant="danger" onClick={() => deleteProduct(clickedOption)} >Borrar</Button>


            </Container>
        </div>
    )

}

export default FormAdminDelete;