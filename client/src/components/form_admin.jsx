import React from 'react';
import { Nav, Form, Button, Navbar, FormControl } from 'react-bootstrap';
const catTest = [
    { name: 'Shooter', description: 'descripcion' },
    { name: 'Terror', description: 'descripcion' },
    { name: 'Primera Persona', description: 'descripcion' }
];

const FormAdmin = () => {
    return (
        <div>
            {/* Opciones para CRUD del producto */}
            <Nav variant="pills">
                <Nav.Item>
                    <Nav.Link href="/Admin/Crear">Crear</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/Admin/Modificar">Modificar</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/Admin/Borrar">Borrar</Nav.Link>
                </Nav.Item>
            </Nav>
            <br/>

            {/* Barra de busqueda del producto (para borrar y modificar) */}
            <Navbar>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                    <Button type="submit">Submit</Button>
                </Form>
            </Navbar>
            <br/>

            {/* Formulario para modificar o crear el producto */}
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese el nombre de su videojuego..." />
                    <br/>
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese la descripcion para su videojuego..." />
                    <br/>
                    <Form.Label>Stock disponible</Form.Label>
                    <Form.Control type="number" placeholder="Cantidad disponible..."/>
                    <br/>
                    <Form.Label>Desarrollado por:</Form.Label>
                    <Form.Control type="text" placeholder="Desarrolladora"/>
                    <br/>
                    <Form.Label>Publicado por:</Form.Label>
                    <Form.Control type="text" placeholder="Publicadora" />
                    <br/>
                    <Form.Label>Fecha de lanzamiento:</Form.Label>
                    <Form.Control type="date" placeholder="Fecha de lanzamiento" />
                    <br/>
                    <Form.Control as="select" multiple>
                        {
                            catTest.map(cat => (
                                <option>{cat.name}</option>
                            ))
                        }

                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default FormAdmin;