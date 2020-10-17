import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import NavAdmin from '../NavAdmin/nav_admin.jsx'
import store from '../../redux/store/store.js';
console.log('formAdminCreate',store.getState());


const FormAdminCreate = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [validated, setValidated] = useState(false);
    const nameInput = useRef(null);

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
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

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
            <Form noValidate validated={validated} onSubmit={(event) => handleSubmit(event)} className='formAdmin-container'>
                <Form.Group controlId="formBasicEmail" bsPrefix="formAdmin-group">
                    
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control type="text"
                                    required={true}
                                    placeholder="Nombre de su videojuego..."
                                    name="name"
                                    ref={nameInput}
                                    onChange={(event) => handleInputChange(event)} />
                                <Form.Control.Feedback type="invalid">
                                    Agregue el nombre del producto
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    required={true}
                                    placeholder="Costo del videojuego. Ej: 39.99"
                                    name="price"
                                    onChange={(event) => handleInputChange(event)} />
                                <Form.Control.Feedback type="invalid">
                                    Debe indicar el precio
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type="number"
                                    required={true}
                                    placeholder="Cantidad disponible..."
                                    name="stock"
                                    onChange={(event) => handleInputChange(event)} />
                                <Form.Control.Feedback type="invalid">
                                    Debe indicar stock
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            placeholder="Descripcion para su videojuego..."
                            required={true}
                            minLength="15"
                            name="description"
                            onChange={(event) => handleInputChange(event)} />
                        <Form.Control.Feedback type="invalid">
                            La descripción debe tener más de 15 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control type="text"
                                    required={true}
                                    placeholder="Desarrolladora"
                                    name="developer"
                                    onChange={(event) => handleInputChange(event)} />
                                <Form.Control.Feedback type="invalid">
                                    Debe agregar desarrolladora
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type="text"
                                    required={true}
                                    placeholder="Publicadora"
                                    name="publisher"
                                    onChange={(event) => handleInputChange(event)} />
                                <Form.Control.Feedback type="invalid">
                                    Debe agregar publisher
                            </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type="date"
                                    required={true}
                                    name="publishDate"
                                    onChange={(event) => handleInputChange(event)} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group>
                        <Form.Control required={true} as="select" multiple bsPrefix="custom-select"  >
                            {
                                categories.map((cat,i) => (
                                    <option key={i}>{cat.name}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>

                    <Button className="mb-2" variant="primary" type="submit">
                        Subir
                </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default FormAdminCreate;