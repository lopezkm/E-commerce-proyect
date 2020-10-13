import React, { useEffect, useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import NavAdmin from '../NavAdmin/nav_admin.jsx'


const FormAdminCreate = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const nameInput =useRef(null);

    function getCategories() {
        axios.get(`http://localhost:3000/products/category/`)
            .then(response => {
                setCategories(response.data);
            });
    }

    useEffect(() => {
        getCategories();
        setLoading(false);
        nameInput.current.focus()

    }, [loading]);


    const [inputAdminForm, setInputAdminForm] = React.useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        developer: "",
        publisher: "",
        publishDate: ""
    });

    const handleInputChange = (event) => {
        setInputAdminForm({
            ...inputAdminForm,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/products', {
            name: inputAdminForm.name,
            description: inputAdminForm.description,
            price: inputAdminForm.price,
            stock: inputAdminForm.stock,
            developer: inputAdminForm.developer,
            publisher: inputAdminForm.publisher,
            publishDate: inputAdminForm.publishDate
        })
            .then(response => console.log(response))// Respuesta del servidor
            .catch(e => console.log(e))
    }

    return (
        <div>
            {/* Opciones para CRUD del producto */}
            <NavAdmin />

            <h1 className='formAdmin-title'>Agregue un juego a su catalogo</h1>

            {/* Formulario para modificar o crear el producto */}
            <Form onSubmit={(event) => handleSubmit(event)} className='formAdmin-container'>
                <Form.Group controlId="formBasicEmail" bsPrefix="formAdmin-group">
                    <Form.Control type="text"
                        placeholder="Nombre de su videojuego..."
                        name="name"
                        ref={nameInput}
                        onChange={(event) => handleInputChange(event)} />
                 
                    <Form.Control 
                        as = "textarea"
                        rows={ 4 }
                        placeholder="Descripcion para su videojuego..."
                        name="description"
                        onChange={(event) => handleInputChange(event)} />
                
                    <Form.Control type="number"
                        placeholder="Costo del videojuego. Ej: 39.99"
                        name="price"
                        onChange={(event) => handleInputChange(event)} />
                
                    <Form.Control type="number"
                        placeholder="Cantidad disponible..."
                        name="stock"
                        onChange={(event) => handleInputChange(event)} />
                 
                    <Form.Control type="text"
                        placeholder="Desarrolladora"
                        name="developer"
                        onChange={(event) => handleInputChange(event)} />
                
                    <Form.Control type="text"
                        placeholder="Publicadora"
                        name="publisher"
                        onChange={(event) => handleInputChange(event)} />
              
                    <Form.Control type="date"
                        name="publishDate"
                        onChange={(event) => handleInputChange(event)} />
               
                    <Form.Control as="select" multiple>
                        {
                            categories.map(cat => (
                                <option>{cat.name}</option>
                            ))
                        }

                    </Form.Control>
                </Form.Group>

                <Button className="mb-2" variant="primary" type="submit">
                    Subir
                </Button>
            </Form>
        </div>
    );
};

export default FormAdminCreate;