import React from 'react';
import { Form, Button } from 'react-bootstrap';
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
        .then(response => {
            if(!alert(`La categoria ${response.data.name} ha sido creada exitosamente`)) window.location.reload()})// Respuesta del servidor
        .catch(e => {
            if(!alert(`Ya existe una categoria con el nombre ingresado`)) window.location.reload()})
        
    } 
    
    

    return (
        <div>
            {/* Formulario para agregar categorías */}
            <h1 className='formAdmin-title'>Nueva categoría</h1>
            <Form className='formAdmin-container' onSubmit= {(e) => handleSubmit(e)}>
                <Form.Group bsPrefix='formAdmin-group'>
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

                <Button className="mb-3" variant="primary" type="submit"> Agregar </Button>
            </Form>
        </div>
    );
};

export default FormAddCategory;