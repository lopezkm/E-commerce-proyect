import React from 'react';
import { Form, Button, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const FormAddCategory = () => {
    return (
        <div>
            {/* Formulario para agregar categorías */}
            <h1>Agregar nueva categoría</h1>
            <Form>
                <Form.Group >
                    <Form.Label>Nombre de la categoria</Form.Label>
                    <Form.Control type="text" placeholder="Ingresa nombre de categoría..." />
                    <Form.Label> Descripción</Form.Label>
                    <Form.Control type="text" placeholder="Agrega una breve descripción..." />
                </Form.Group>

                <Button variant="primary" type="submit"> Agregar </Button>
            </Form>
        </div>
    );
};

export default FormAddCategory;