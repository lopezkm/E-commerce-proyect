import React, { useEffect, useState } from 'react';
import { Nav, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import NavAdmin from './nav_admin';

const FormAdminModify = () => {
    return (
        <div>
            <NavAdmin/>

            <h1>MODIFY</h1>

        </div>
    )

}

export default FormAdminModify;