import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, FormControl, Container, Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import MediaForm from './MediaForm/MediaForm.jsx';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import NavAdmin from '../NavAdmin/nav_admin.jsx';

toast.configure();

const FormAdminModify = () => {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productSelected, setProductSelected] = useState(false);
    const [inputSearch, setInputSearch] = useState({ searchInput: "" });
    const searchInput = useRef(null);
    const [inputAdminForm, setInputAdminForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        developer: "",
        publisher: "",
        publishDate: ""
    });
    const [allCategories, setAllCategories] = useState([]);

    const getCategories = () => {
        axios.get(`http://localhost:3000/products/category/`)
            .then(response => {
                setAllCategories(response.data);
                setCategories(response.data);
            });
    }

    const getProducts = () => {
        axios.get(`http://localhost:3000/products/`)
            .then(response => {
                setProducts(response.data);
            });
    }

    useEffect(() => {
        getCategories();
        getProducts();
        setLoading(false);
        searchInput.current.focus()
    }, [loading]);

    const handleInputChangeForm = (event) => {
        setInputAdminForm({
            ...inputAdminForm,
            [event.target.name]: event.target.value
        });
    };

    const handleInputChangeSearch = (event) => {
        setInputSearch({
            ...inputSearch,
            [event.target.name]: event.target.value
        });
    };

    const handleSelectChange = (event) => {
        let selector = document.getElementById("productList");
        let clickedOption = selector.options[selector.selectedIndex].id;
        refreshData(clickedOption);
    }

    const refreshData = (id) => {

        axios.get(`http://localhost:3000/products/${id}`).then(response => {
            setInputAdminForm(response.data);
            setProductSelected(true);
            setProductCategories(response.data.categories);
            let prodCat = response.data.categories;
            let loadedCat = categories.filter((item) => {
                return !prodCat.find(el => el.name === item.name);
            })
            setCategories(loadedCat);
        })
    }

    const handleSubmit = (id) => {
        axios.put(`http://localhost:3000/products/${id}`, {
            name: inputAdminForm.name,
            description: inputAdminForm.description,
            price: inputAdminForm.price,
            stock: inputAdminForm.stock,
            developer: inputAdminForm.developer,
            publisher: inputAdminForm.publisher,
            publishDate: inputAdminForm.publishDate
        })
    }

    const handleCheckChange = (event) => {
        console.log('EVENT', event.target.name);
        let formCheck = document.getElementById(event.target.name);
        formCheck.disabled = !formCheck.disabled
    }

    const handleCategoryDelete = () => {
        let selector = document.getElementById("formProductCategories");

        if (selector.options.length > 0) {
            let categorySelectedToDelete = selector.options[selector.selectedIndex].id;
            setProductCategories(productCategories.filter(cat => cat.id !== parseInt(categorySelectedToDelete)));
            deleteCategoryProduct(categorySelectedToDelete);
        }
    }

    const deleteCategoryProduct = (idC) => {
        let selector = document.getElementById("productList");
        let idP = selector.options[selector.selectedIndex].id;
        axios.delete(`http://localhost:3000/products/${idP}/category/${idC}`)
            .then(() => {
                axios.get(`http://localhost:3000/products/${idP}`)
                    .then(response => {

                        let prodCat = response.data.categories;
                        let filteredCat = allCategories.filter((item) => {
                            return !prodCat.find(el => el.name === item.name);
                        })
                        setCategories(filteredCat);
                        notifyDeleted();
                    })
            })
    }

    const handleCategoryAdd = () => {
        let selector = document.getElementById("formCategories");

        if (selector.options.length > 0) {
            let categorySelectedToAdd = selector.options[selector.selectedIndex].id;
            setCategories(categories.filter(cat => cat.id !== parseInt(categorySelectedToAdd)));
            addCategoryProduct(categorySelectedToAdd);
        }
    }

    const addCategoryProduct = (idC) => {
        let selector = document.getElementById("productList");
        let idP = selector.options[selector.selectedIndex].id;
        axios.post(`http://localhost:3000/products/${idP}/category/${idC}`)
            .then(() => {
                axios.get(`http://localhost:3000/products/${idP}`)
                    .then((response) => {
                        setProductCategories(response.data.categories);
                        notifyAdded();
                    })
            })
    }

    const notifyAdded = () => {
        toast.info('Categoría agregada');
    }

    const notifyDeleted = () => {
        toast.error('Categoría eliminada');
    }

    let searchedProduct = products.filter(product => product.name.toLowerCase().includes(inputSearch.searchInput.toLowerCase()))

    return (
        <div>
            <NavAdmin />

            <h1 className='formAdmin-title'>Modificar datos del producto</h1>

            <Container>
                <Form className='formAdmin-delete-container'>
                    <Form.Group>
                        <FormControl
                            type="text"
                            placeholder="Buscar el juego a modificar"
                            className="mr-sm-2"
                            name="searchInput"
                            ref={searchInput}
                            onChange={(event) => handleInputChangeSearch(event)} />

                        <Form.Control as="select" multiple id="productList" onChange={(e) => handleSelectChange(e)}>
                            {
                                searchedProduct.map((product, i) => {
                                    return (
                                    <option key={i} id={product.id} >
                                        {product.name}
                                    </option>)
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Container>

            { productSelected &&
                (
                    <Form onSubmit={() => handleSubmit(inputAdminForm.id)} className='formAdmin-container'>
                        <Form.Group className='formAdmin-group'>
                            <Row>
                                <Col>
                                    <div className='label-switch'>
                                        <label>Nombre</label>
                                        <Form.Switch
                                            type="switch"
                                            id="switch-name"
                                            name="formName"
                                            label=""
                                            onChange={(event) => handleCheckChange(event)}
                                        />
                                    </div>
                                    <Form.Control type="text"
                                        placeholder="Nombre del juego"
                                        value={inputAdminForm.name}
                                        name="name"
                                        id="formName"
                                        onChange={(event) => handleInputChangeForm(event)} disabled />
                                </Col>
                                <Col>
                                    <div className='label-switch'>
                                        <label>Precio</label>
                                        <Form.Switch
                                            type="switch"
                                            id="switch-price"
                                            name="formPrice"
                                            label=""
                                            onChange={(event) => handleCheckChange(event)}
                                        />
                                    </div>
                                    <Form.Control type="number"
                                        placeholder="Precio del juego"
                                        value={inputAdminForm.price}
                                        name="price"
                                        id="formPrice"
                                        onChange={(event) => handleInputChangeForm(event)} disabled />
                                </Col>
                                <Col>
                                    <div className='label-switch'>
                                        <label>Stock</label>
                                        <Form.Switch
                                            type="switch"
                                            id="switch-stock"
                                            name="formStock"
                                            label=""
                                            onChange={(event) => handleCheckChange(event)}
                                        />
                                    </div>
                                    <Form.Control type="number"
                                        placeholder="Stock disponible del juego"
                                        value={inputAdminForm.stock}
                                        name="stock"
                                        id="formStock"
                                        onChange={(event) => handleInputChangeForm(event)} disabled />
                                </Col>
                            </Row>
                            <div className='label-switch'>
                                <label>Descripcion</label>
                                <Form.Switch
                                    type="switch"
                                    id="switch-description"
                                    name="formDescription"
                                    label=""
                                    onChange={(event) => handleCheckChange(event)}
                                />
                            </div>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Descripcion del juego"
                                value={inputAdminForm.description}
                                name="description"
                                id="formDescription"
                                onChange={(event) => handleInputChangeForm(event)} disabled />

                            <Row>
                                <Col>
                                    <div className='label-switch'>
                                        <label>Desarrollador</label>
                                        <Form.Switch
                                            type="switch"
                                            id="switch-developer"
                                            name="formDeveloper"
                                            label=""
                                            onChange={(event) => handleCheckChange(event)}
                                        />
                                    </div>
                                    <Form.Control type="text"
                                        placeholder="Desarrolladora del juego"
                                        value={inputAdminForm.developer}
                                        name="developer"
                                        id="formDeveloper"
                                        onChange={(event) => handleInputChangeForm(event)} disabled />
                                </Col>
                                <Col>
                                    <div className='label-switch'>
                                        <label>Publicado por</label>
                                        <Form.Switch
                                            type="switch"
                                            id="switch-publisher"
                                            name="formPublisher"
                                            label=""
                                            onChange={(event) => handleCheckChange(event)}
                                        />
                                    </div>
                                    <Form.Control type="text"
                                        placeholder="Publicadora del juego"
                                        value={inputAdminForm.publisher}
                                        name="publisher"
                                        id="formPublisher"
                                        onChange={(event) => handleInputChangeForm(event)} disabled />
                                </Col>
                                <Col>
                                    <div className='label-switch'>
                                        <label>Lanzamiento</label>
                                        <Form.Switch
                                            type="switch"
                                            id="switch-publish-date"
                                            name="formPublishDate"
                                            label=""
                                            onChange={(event) => handleCheckChange(event)}
                                        />
                                    </div>
                                    <Form.Control type="date"
                                        placeholder="Fecha de lanzamiento del juego"
                                        value={inputAdminForm.publishDate.substring(0,10)}
                                        name="publishDate"
                                        id="formPublishDate"
                                        onChange={(event) => handleInputChangeForm(event)} disabled />
                                </Col>
                            </Row>

                            <Form.Label>Categorias del producto:</Form.Label>
                            <Form.Control as="select" multiple id="formProductCategories"
                                onClick={(e) => handleCategoryDelete(e)}>
                                {
                                    productCategories.map((cat, i) => (
                                        <option key={i} id={cat.id}> × {cat.name}</option>
                                    ))
                                }
                            </Form.Control>

                            <Form.Label>Categorias disponibles:</Form.Label>
                            <Form.Control as="select" multiple id="formCategories"
                                onClick={(e) => handleCategoryAdd(e)}>
                                {
                                    categories.map((cat, i) => (
                                        <option key={i} id={cat.id}> + {cat.name} </option>
                                    ))
                                }
                            </Form.Control>

                        </Form.Group>
                        <div className="formAdmin-updateButton">
                            <Button variant="primary" type="submit" className='formAdmin-submit-button'>
                                Actualizar
                        </Button>
                        </div>
                        <MediaForm productId={inputAdminForm.id} productMedias={inputAdminForm.media} />
                    </Form>
                )
            }
        </div>
    )

}

export default FormAdminModify;