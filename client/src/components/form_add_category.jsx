import React from 'react';
import { Form, Button, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const FormAddCategory = () => {

    const [formInput, setformInput] = React.useState ({
        categoryName: "",
        categoryDescription: ""
    })

    const handleformInputChange = (event) =>{
        setformInput({
          ...formInput,
          [event.target.name] : event.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/products/category', {
            name: formInput.categoryName,
            description: formInput.categoryDescription
        })
        .then(response => console.log(response))// Respuesta del servidor
        .catch(e => console.log(e))
    } 

    return (
        <div>
            {/* Formulario para agregar categorías */}
            <h1>Agregar nueva categoría</h1>
            <Form onSubmit= {(e) => handleSubmit(e)}>
                <Form.Group >
                    <Form.Label>Nombre de la categoria</Form.Label>
                    <Form.Control type="text"
                        name= "categoryName" 
                        placeholder="Ingresa nombre de categoría..." 
                        onChange= {(event) => handleformInputChange(event)}/>
                    <Form.Label> Descripción </Form.Label>
                    <Form.Control type="text" 
                        name= "categoryDescription" 
                        placeholder="Agrega una breve descripción..." 
                        onChange= {(event) => handleformInputChange(event)} />
                </Form.Group>

                <Button variant="primary" type="submit"> Agregar </Button>
            </Form>
        </div>
    );
};

export default FormAddCategory;