import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, FormControl, Container, Row, Col} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faKey, faChevronUp, faChevronDown  } from '@fortawesome/free-solid-svg-icons';

const FormManageUser = () => {

    const [isUserSelected, setIsUserSelected] = useState(false);
    const [selectedUser, setSelectedUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputSearch, setInputSearch] = useState({ searchInput: "" });
    const searchInput = useRef(null);
    const userAccessLevel = useSelector((state) => (state.user.id > 0) ? state.user.accessLevel : null);
    
    const getUsers = () => {
        axios.get(`http://localhost:3000/users/`, { withCredentials: true })
            .then(response => {
                let arrUsers = response.data.filter( ( user ) => ( user.accessLevel < userAccessLevel ));
                setUsers(arrUsers);
                setLoading(false);
            });
    }

    useEffect(() => {
        getUsers();
        searchInput.current.focus();
    }, [loading]);

    const refreshData = ( ) => {
        axios.get(`http://localhost:3000/users/${selectedUser.id}`, { withCredentials: true }).then(response => {
            setSelectedUser(response.data);
        })
    }

    const handleInputChangeSearch = (event) => {
        setInputSearch({
            ...inputSearch,
            [event.target.name]: event.target.value
        });
    };

    const handleSelectChange = (event) => {
        let selector = document.getElementById("userList");
        let clickedOption = selector.options[selector.selectedIndex].id;
        let user = (users.filter(user => user.id === parseInt(clickedOption)));
        console.log(user[0]);
        setSelectedUser(user[0]);
        setIsUserSelected(true);
    }  
    
    const handleUserDelete = ( ) => {
        axios.delete(`http://localhost:3000/users/${selectedUser.id}`, { withCredentials: true })
            .then( ( ) => {
                setSelectedUser([]);
                setIsUserSelected(false);
                setLoading(true);
            });
    }   

    const handleUserPromote = ( ) => {
        axios.get(`http://localhost:3000/auth/promote/${selectedUser.id}`, { withCredentials: true })
            .then( ( ) => {
                refreshData( );
            });
    } 

    const handleUserDemote = ( ) => {
        axios.get(`http://localhost:3000/auth/demote/${selectedUser.id}`, { withCredentials: true })
            .then( ( ) => {
                refreshData( );
            });
    } 

    const handleUserForcePasswordReset = ( ) => {
        axios.post(`http://localhost:3000/auth/forgot`, { email: selectedUser.email }, { withCredentials: true })
            .then( ( ) => {
                refreshData( );
            });
    } 

    let searchInputLowerCase = inputSearch.searchInput.toLowerCase( );
    let searchedUser = users.filter( ( user ) => ( user.firstName + ' ' + user.lastName ).toLowerCase( ).includes( searchInputLowerCase ) );

    return (
        <div>
            {/* Formulario para modificar categorías */}
            <h1 className='formAdmin-title'>Control de usuarios</h1>

            <Container>
                <Form className='formAdmin-delete-container'>
                    <Form.Group>
                        <FormControl
                            type="text"
                            placeholder="Buscar usuario"
                            className="mr-sm-2"
                            name="searchInput"
                            ref={searchInput}
                            onChange={(event) => handleInputChangeSearch(event)} />

                        <Form.Control as="select" multiple id="userList" onChange={(e) => handleSelectChange(e)}>
                            {
                                searchedUser.map((user, i) => {
                                    return (
                                    <option key={i} id={user.id} >
                                        { user.firstName + ' ' + user.lastName }
                                    </option>)
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Container>

            { !loading && isUserSelected &&
                (
                    <Container className="manage-user-fullName">
                        <h1>{ selectedUser.firstName + ' ' + selectedUser.lastName }</h1>
                        <Row className="justify-content-between">
                            <Col xs={4} className="button-user-accessLevel">
                                { userAccessLevel === 2 ? selectedUser.accessLevel === 0 ? 
                                        <Button variant="success" onClick={ ( ) => handleUserPromote( ) }><FontAwesomeIcon icon={faChevronUp} /> Promover a admin</Button> :
                                        <Button variant="secondary" onClick={ ( ) => handleUserDemote( ) }><FontAwesomeIcon icon={faChevronDown} /> Degradar a usuario</Button> :
                                        <Button variant="success" disabled><FontAwesomeIcon icon={faChevronUp} /> Promover a admin</Button>
                                }
                            </Col>
                            <Col xs={6} className="button-user-passwordReset"><Button variant="warning" onClick={ ( ) => handleUserForcePasswordReset( ) }><FontAwesomeIcon icon={faKey} /> Forzar password-reset</Button></Col>
                            <Col xs={2} className="button-user-delete"><Button variant="danger" onClick={ ( ) => handleUserDelete( ) }><FontAwesomeIcon icon={faTrashAlt} /> Eliminar usuario</Button></Col>
                        </Row>
                    </Container>
                )
            }
        </div>
    )

}

export default FormManageUser;