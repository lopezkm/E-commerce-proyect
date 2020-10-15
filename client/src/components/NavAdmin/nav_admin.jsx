import React from 'react';
import { Nav } from 'react-bootstrap';
import store from '../../redux/store/store.js';
console.log('navAdmin',store.getState());

const NavAdmin = () => {

    return (
        <div>
            <Nav fill variant="tabs" className='navAdmin-container'>
                <Nav.Item>
                    <Nav.Link href="/Admin/create" eventKey="1">Crear</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/Admin/modify" eventKey="2">Modificar</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/Admin/delete" eventKey="3">Borrar</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default NavAdmin;