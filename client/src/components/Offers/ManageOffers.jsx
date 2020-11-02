import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const ManageOffers = () => {

    /*Crear una nueva oferta */
    const [formInput, setformInput] = useState({
        offerAlias: "",
        offerDiscount: 0,
        offerStartDate: "",
        offerEndDate: "",
    })

    /*Modificar una oferta */
    const [selectedOffer, setSelectedOffer] = useState({})

    const handleInputChangeModify = (event) => {
        setSelectedOffer({
            ...selectedOffer,
            [event.target.name]: event.target.value
        });
    }; 

    const handleModifySubmit = (id) => {
        axios.put(`http://localhost:3000/offers/${id}`, {
            alias: selectedOffer.alias,
            discount: selectedOffer.discount,
            startDate: selectedOffer.startDate,
            endDate: selectedOffer.endDate,
        }, { withCredentials: true }).then(() => window.location.reaload())
    }

    /*Eliminar una oferta */

    const handleDeleteOnClick = (id) => {
        if(!id)
        {
            return alert("Seleccione la oferta que quiere eliminar")     
        }
        axios.delete(`http://localhost:3000/offers/${id}`, { withCredentials: true })
        .then(window.location.reload())
    }

    const searchOfferInput = useRef(null);
    /*Guardar todas las ofertas para mostrarlas */
    const [allOffers, setAllOffers] = useState([])
    const [loading, setLoading] = useState(true);
    /*Cuando una oferta es seleccionada se muestra el formulario para modificar */
    const [isSelected, setIsSelected] = useState(false)

    /*Guarda lo que escribe el usuario cuando busca una oferta */
    const [inputSearch, setInputSearch] = useState({ searchOfferInput: "" })

    const handleformInputChange = (event) => {
        setformInput({
            ...formInput,
            [event.target.name]: event.target.value
            
        });
    };

    /*Creacion de la nueva oferta */
    const handleSubmitNewOffer = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/offers/create', {
            alias: formInput.offerAlias,
            discount: formInput.offerDiscount,
            startDate: formInput.offerStartDate,
            endDate: formInput.offerEndDate
        }, { withCredentials: true })
            .then(response => {
                if (!alert(`La oferta "${response.data.alias}" ha sido creada exitosamente`)) window.location.reload()
            })// Respuesta del servidor
            .catch(e => {
                if (!alert(`Ya existe una oferta con el nombre ingresado`)) window.location.reload()
            })

    }
    /*capturar los datos de una oferta seleccionada */

    let selectedOff;

    const handleSelectChange = (e) => {
        let selector = document.getElementById("offerList");
        let clickedOption = selector.options[selector.selectedIndex].id;
        selectedOff = allOffers.filter(item => item.id === parseInt(clickedOption))[0];
        setSelectedOffer(selectedOff)
        setIsSelected(true);

    }
    /*Activacion/desactivación de los input a traves de los checks */
    const handleCheckChange = (event) => {
        let formCheck = document.getElementById(event.target.name);
        formCheck.disabled = !formCheck.disabled

    }

    /*Guarda lo que escribe la persona en la barra de busqueda para hacer el filtro */
    const handleInputChangeSearch = (event) => {
        setInputSearch({
        ...inputSearch,
        [event.target.name]: event.target.value
    });
};

let searchedOffer = allOffers.filter(offer => offer.alias.toLowerCase().includes(inputSearch.searchOfferInput.toLowerCase()))

/* Obtener todas las ofertas y guardarlas en un estado para mostrarlas */
const getOffers = () => {
    axios.get('http://localhost:3000/offers/')
        .then(response => {
            setAllOffers(response.data)
        });
}
useEffect(() => {
    getOffers()
    setLoading(false)
}, [loading])


return (
    <div>
        <h1>Nueva oferta</h1>
        <Form onSubmit={(e) => handleSubmitNewOffer(e)}>
            <Form.Label>Alias de oferta</Form.Label>
            <Form.Control type="text"
                name="offerAlias"
                placeholder="Nombre con el que identificar la oferta"
                onChange={(event) => handleformInputChange(event)}
            />
            <Form.Label>% de descuencto</Form.Label>
            <Form.Control type="text"
                name="offerDiscount"
                placeholder="porcentaje de rebaja al precio de lista"
                onChange={(event) => handleformInputChange(event)}
            />

            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control type="date"
                name="offerStartDate"
                onChange={(event) => handleformInputChange(event)}
            />

            <Form.Label>Fecha de cierre</Form.Label>
            <Form.Control type="date"
                name="offerEndDate"
                onChange={(event) => handleformInputChange(event)}
            />

            <Button className="mb-3" variant="primary" type="submit"> Crear nueva oferta </Button>

        </Form>

        <h1>Modificar o borrar una oferta</h1>
        <Container>
            <Form>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Seleccione la oferta que quiera modificar"
                        name="searchOfferInput"
                        ref={searchOfferInput}
                        onChange={(event) => handleInputChangeSearch(event)} />

                    <Form.Control as="select" multiple id="offerList" onChange={(e) => handleSelectChange(e)} >
                        {
                            searchedOffer.map((offer, i) => {
                                return (
                                    <option key={i} id={offer.id} >
                                        {offer.alias} ({offer.discount}%)
                                    </option>)
                            })
                        }
                    </Form.Control>
                </Form.Group>
            </Form>
        </Container>



        { isSelected &&
            (
                <Form onSubmit={() => handleModifySubmit(selectedOffer.id)} >
                    <Form.Group >
                        <div>
                            <label>Alias</label>
                            <Form.Switch
                                type="switch"
                                id="switch-alias"
                                name="formAlias"
                                label=""
                                onChange={(event) => handleCheckChange(event)}
                            />
                        </div>

                        <Form.Control type="text"
                            placeholder="Nombre de la oferta"
                            value={selectedOffer.alias}
                            name="alias"
                            id="formAlias"
                            onChange = {(event) => handleInputChangeModify(event)} disabled />
                    </Form.Group>

                    <Form.Group >
                        <div>
                            <label>% de descuento</label>
                            <Form.Switch
                                type="switch"
                                id="switch-discount"
                                name="formDiscount"
                                label=""
                                onChange={(event) => handleCheckChange(event)}
                            />
                        </div>

                        <Form.Control type="text"
                            placeholder="porcentaje de descuento"
                            value={selectedOffer.discount}
                            name="discount"
                            id="formDiscount"
                            onChange={(event) => handleInputChangeModify(event)} disabled />
                    </Form.Group>

                    <Form.Group >
                        <div>
                            <label>Fecha de inicio</label>
                            <Form.Switch
                                type="switch"
                                id="switch-startDate"
                                name="formStartDate"
                                label=""
                                onChange={(event) => handleCheckChange(event)}
                            />
                        </div>

                        <Form.Control type="text"
                            placeholder="¿Cuando empieza la oferta?"
                            value={selectedOffer.startDate}
                            name="startDate"
                            id="formStartDate"
                            onChange={(event) => handleInputChangeModify(event)} disabled />
                    </Form.Group>

                    <Form.Group >
                        <div>
                            <label>Fecha de finalización</label>
                            <Form.Switch
                                type="switch"
                                id="switch-endDate"
                                name="formEndDate"
                                label=""
                                onChange={(event) => handleCheckChange(event)}
                            />
                        </div>

                        <Form.Control type="text"
                            placeholder="¿Cuando termina la oferta?"
                            value={selectedOffer.endDate}
                            name="endDate"
                            id="formEndDate"
                            onChange={(event) => handleInputChangeModify(event)} disabled />
                    </Form.Group>



                    <div>
                        <Button variant="primary" type="submit">
                            Modificar oferta
                        </Button>

                        <Button type="button" variant="danger" onClick= {() => handleDeleteOnClick(selectedOffer.id)}>
                            Eliminar oferta
                        </Button>


                    </div>
                </Form>

            )
        }
    </div>
)
};

export default ManageOffers;
