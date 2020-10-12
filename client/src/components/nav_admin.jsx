import React from 'react';
import { Nav } from 'react-bootstrap';

const NavAdmin = () => {

    return (
        <div>
            <Nav variant="pills">
                <Nav.Item>
                    <Nav.Link href="/Admin/create">Crear</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/Admin/modify">Modificar</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/Admin/delete">Borrar</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default NavAdmin;