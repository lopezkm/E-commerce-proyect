import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, FormControl, Container} from 'react-bootstrap';
import axios from 'axios';
import store from '../../redux/store/store.js';
import { useSelector, useDispatch } from 'react-redux';
import { GetCategories } from '../../redux/action-creators/category.js';

const FormModifyCategory = () => {

    const [categorySelected, setCategorySelected] = useState(false);
    const [inputSearch, setInputSearch] = useState({ searchInput: "" });
    const searchInput = useRef(null);
    const [inputAdminForm, setInputAdminForm] = useState({
        name: "",
        description: ""
    });

    const categories = useSelector( ( state ) => state.category.categories );

    useEffect(() => {
        searchInput.current.focus()
    }, []);

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

    let selectedCategory;

    const handleSelectChange = (event) => {
        let selector = document.getElementById("categoryList");
        let clickedOption = selector.options[selector.selectedIndex].id;
        selectedCategory = categories.filter(item => item.id === parseInt(clickedOption));
        setInputAdminForm(selectedCategory[0]);
        setCategorySelected(true);
    }   

    const handleSubmit = (id) => {
        axios.put(`http://localhost:3000/products/category/${id}`, {
            name: inputAdminForm.name,
            description: inputAdminForm.description,
        }, { withCredentials: true }).then(() => window.location.reaload())
    }

    const handleCheckChange = (event) => {
        let formCheck = document.getElementById(event.target.name);
        formCheck.disabled = !formCheck.disabled
    }

    let searchedCategory = categories.filter(category => category.name.toLowerCase().includes(inputSearch.searchInput.toLowerCase()))

    return (
        <div>
            {/* Formulario para modificar categorías */}
            <h1 className='formAdmin-title'>Modificar datos de la categoria</h1>

            <Container>
                <Form className='formAdmin-delete-container'>
                    <Form.Group>
                        <FormControl
                            type="text"
                            placeholder="Buscar la categoria a modificar"
                            className="mr-sm-2"
                            name="searchInput"
                            ref={searchInput}
                            onChange={(event) => handleInputChangeSearch(event)} />

                        <Form.Control as="select" multiple id="categoryList" onChange={(e) => handleSelectChange(e)}>
                            {
                                searchedCategory.map((category, i) => {
                                    return (
                                    <option key={i} id={category.id} >
                                        {category.name}
                                    </option>)
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Container>

            { categorySelected &&
                (
                    <Form onSubmit={() => handleSubmit(inputAdminForm.id)} className='formAdmin-container'>
                        <Form.Group className='formAdmin-group'>
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
                                placeholder="Nombre de la categoria"
                                value={inputAdminForm.name}
                                name="name"
                                id="formName"
                                onChange={(event) => handleInputChangeForm(event)} disabled />
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
                                placeholder="Descripcion de la categoria"
                                value={inputAdminForm.description}
                                name="description"
                                id="formDescription"
                                onChange={(event) => handleInputChangeForm(event)} disabled />
                        </Form.Group>
                        <div className="formAdmin-updateButton">
                            <Button variant="primary" type="submit" className='formAdmin-submit-button'>
                                Actualizar
                            </Button>
                        </div>
                    </Form>
                )
            }
        </div>
    )

}

export default FormModifyCategory;