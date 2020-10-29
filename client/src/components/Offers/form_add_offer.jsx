import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const FormAddOffer = () =>{
    return(
        <div>
            <h1>Nueva oferta</h1>
            <Form>
                <Form.Label>Alias de oferta</Form.Label>
                    <Form.Control type="text"
                        name="offerName"
                        placeholder="oferta de Hallowenn, Navidad, Año Nuevo"
                        /* onChange= */
                    />
                <Form.Label>% de descuencto</Form.Label>
                    <Form.Control type="text"
                        name="offerDiscount"
                        placeholder="porcentaje de rebaja al precio de lista"
                        /* onChange= */
                    />

                <Form.Label>Fecha de inicio</Form.Label>
                    <Form.Control type="date"
                        name="startDate"
                        /* onChange= */
                    />

                <Form.Label>Fecha de cierre</Form.Label>
                    <Form.Control type="date"
                        name="endDate"
                        /* onChange= */
                    />

                <Button className="mb-3" variant="primary" type="submit"> Crear nueva oferta </Button>

            </Form>
        </div>
    )
};

export default FormAddOffer;