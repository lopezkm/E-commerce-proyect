import React, {useState,useEffect, useRef } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

const FormAddOffer = () =>{

    const [formInput, setformInput] = useState ({
        offerAlias: "",
        offerDiscount: 0,
        offerStartDate:"",
        offerEndDate:"",
    })

    const [allOffers, setAllOffers] = useState ([])
    const [loading, setLoading] = useState(true);
    const [selectedOff, setSelectedOff] = useState({})
    const searchOfferInput = useRef(null);


    const handleformInputChange = (event) =>{
        setformInput({
          ...formInput,
          [event.target.name] : event.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/offers/create', {
            alias: formInput.offerAlias,
            discount:formInput.offerDiscount,
            startDate: formInput.offerStartDate,
            endDate: formInput.offerEndDate
        }, { withCredentials: true })
        .then(response => {
            console.log("respuesta:",  response.data)
            if(!alert(`La oferta "${response.data.alias}" ha sido creada exitosamente`)) window.location.reload()})// Respuesta del servidor
        .catch(e => {
            if(!alert(`Ya existe una oferta con el nombre ingresado`)) window.location.reload()})
        
    }

    let selectedOffer;

    const handleSelectChange = (e) => {
        let selector = document.getElementById("offerList");
        let clickedOption = selector.options[selector.selectedIndex].id;
        selectedOffer = allOffers.filter(item => item.id === parseInt(clickedOption))[0];
    } 
    
    useEffect(() => {
        getOffers()
        setLoading(false)
    }, [loading])

        
    const getOffers = () => {
        axios.get('http://localhost:3000/offers/')
        .then(response => {
            setAllOffers(response.data)
        });
    }




    return(
        <div>
            <h1>Nueva oferta</h1>
                <Form onSubmit= {(e) => handleSubmit(e)}>
                    <Form.Label>Alias de oferta</Form.Label>
                        <Form.Control type="text"
                            name="offerAlias"
                            placeholder="oferta de Hallowenn, Navidad, Año Nuevo"
                            onChange= {(event) => handleformInputChange(event)}
                        />
                    <Form.Label>% de descuencto</Form.Label>
                        <Form.Control type="text"
                            name="offerDiscount"
                            placeholder="porcentaje de rebaja al precio de lista"
                            onChange= {(event) => handleformInputChange(event)}
                        />

                    <Form.Label>Fecha de inicio</Form.Label>
                        <Form.Control type="date"
                            name="offerStartDate"
                            onChange= {(event) => handleformInputChange(event)}
                        />

                    <Form.Label>Fecha de cierre</Form.Label>
                        <Form.Control type="date"
                            name="offerEndDate"
                            onChange= {(event) => handleformInputChange(event)}
                        />

                    <Button className="mb-3" variant="primary" type="submit"> Crear nueva oferta </Button>

                </Form>

            <h1>Modificar una oferta</h1>
            <Container>
                <Form>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Seleccione la oferta que quiera modificar"
                            name="searchOfferInput"
                            ref={searchOfferInput}
                            /* onChange={(event) => handleInputChangeSearch(event)}  *//>

                        <Form.Control as="select" multiple id="offerList"  onChange={(e) => handleSelectChange(e)} >
                            {
                                allOffers.map((offer, i) => {
                                    return (
                                    <option key={i} id={offer.id} >
                                        {offer.alias}
                                    </option>)
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
};

export default FormAddOffer;