import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import NavAdmin from '../NavAdmin/nav_admin.jsx'
//import store from '../../redux/store/store.js';
import { toast } from 'react-toastify';

const FormAdminCreate = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [validated, setValidated] = useState(false);
    const nameInput = useRef(null);
    let selectedCategories = [];

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

    const [inputAdminForm, setInputAdminForm] = useState({
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

    const handleCategoryChange = (event) => {
        let selected = document.getElementById(event.target.id)
        let selectedId = selected.id
        let statusCheck = selected.checked;

        console.log(selected);
        if (statusCheck && !selectedCategories.includes(selectedId)) {
            selectedCategories.push(selectedId);
        }
        else {
            selectedCategories = selectedCategories.filter(id => id !== selectedId);
        }
    }

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
            .then(response => response.data.id)// Respuesta del servidor con producto creado
            .then(idP => axios.post(`http://localhost:3000/products/${idP}/category/`, { categories: selectedCategories }))
            .then(success => {

                toast.info('Juego creado con exito', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setTimeout(function () { window.location.reload(); }, 3100);

            })
            .catch(e => {
                console.log(e);
                toast.error('ERROR: Producto ya existe', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })

    }

    return (
        <div>
            <NavAdmin />

            <h1 className='formAdmin-title'>Agregue un juego a su catalogo</h1>

            <Form noValidate validated={validated} onSubmit={(event) => handleSubmit(event)} className='formAdmin-container'>
                <Form.Group controlId="formBasicEmail" bsPrefix="formAdmin-group">

                    <Row>
                        <Col xs={12} md={4}>
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
                        <Col xs={12} md={4}>
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
                        <Col xs={12} md={4}>
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
                        <Col xs={12} md={4}>
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
                        <Col xs={12} md={4}>
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
                        <Col xs={12} md={4}>
                            <Form.Group>
                                <Form.Control type="date"
                                    required={true}
                                    name="publishDate"
                                    onChange={(event) => handleInputChange(event)} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className='categories-container'>
                        <Form.Row inline>
                            {
                                categories.map((cat, i) => (

                                    <Col lg={3}  >
                                        <Form.Switch bsPrefix='custom-control-label'
                                            key={i}
                                            type="switch"
                                            id={cat.id}
                                            label={cat.name}
                                            onChange={(e) => handleCategoryChange(e)}
                                        />
                                    </Col>

                                ))
                            }
                        </Form.Row>
                    </div>

                    <Button className="mb-2" variant="secondary" type="submit">
                        Cancelar
                        </Button>
                    <Button className="mb-2 create-product-button-submit" variant="primary" type="submit">
                        Crear producto
                        </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default FormAdminCreate;