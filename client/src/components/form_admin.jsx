import React, { useEffect, useState } from 'react';
import { Nav, Form, Button } from 'react-bootstrap';
import axios from 'axios';


const FormAdmin = () => {

    const [ categories, setCategories ] = useState( [] );
    const [ loading, setLoading ] = useState( true );

    function getCategories() {
        axios.get( `http://localhost:3000/products/category/` )
            .then( response => {
                setCategories(  response.data );
            } );
    }

    useEffect( () => {
        getCategories();
        setLoading (false);

    }, [ loading ]);
    
    
    const [inputAdminForm, setInputAdminForm] = React.useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        developer: "",
        publisher: "",
        publishDate: ""
    });

    const handleInputChange = (event) =>{
        setInputAdminForm({
          ...inputAdminForm,
          [event.target.name] : event.target.value
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
            <Nav variant="pills">
                <Nav.Item>
                    <Nav.Link href="/Admin/Crear">Crear</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/Admin/Modificar">Modificar</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/Admin/Borrar">Borrar</Nav.Link>
                </Nav.Item>
            </Nav>
            <br/>

            {/* Formulario para modificar o crear el producto */}
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control   type="text" 
                                    placeholder="Ingrese el nombre de su videojuego..."
                                    name="name"
                                    onChange={(event) => handleInputChange(event)} />
                    <br/>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control   type="text" 
                                    placeholder="Ingrese la descripcion para su videojuego..."
                                    name="description"
                                    onChange={(event) => handleInputChange(event)} />
                    <br/>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control   type="number"  
                                    placeholder="Cuanto queres afanar?..."
                                    name="price"
                                    onChange={(event) => handleInputChange(event)} />
                    <br/>
                    <Form.Label>Stock disponible</Form.Label>
                    <Form.Control   type="number"  
                                    placeholder="Cantidad disponible..."
                                    name="stock"
                                    onChange={(event) => handleInputChange(event)} />
                    <br/>
                    <Form.Label>Desarrollado por:</Form.Label>
                    <Form.Control   type="text" 
                                    placeholder="Desarrolladora"
                                    name="developer"
                                    onChange={(event) => handleInputChange(event)} />
                    <br/>
                    <Form.Label>Publicado por:</Form.Label>
                    <Form.Control   type="text"     
                                    placeholder="Publicadora"
                                    name="publisher"
                                    onChange={(event) => handleInputChange(event)} />
                    <br/>
                    <Form.Label>Fecha de lanzamiento:</Form.Label>
                    <Form.Control   type="date" 
                                    placeholder="Fecha de lanzamiento"
                                    name="publishDate"
                                    onChange={(event) => handleInputChange(event)} />
                    <br/>
                    <Form.Control as="select" multiple>
                        {
                            categories.map(cat => (
                                <option>{cat.name}</option>
                            ))
                        }

                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default FormAdmin;