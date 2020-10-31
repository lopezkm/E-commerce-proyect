import React, { useState, useEffect, useMemo } from "react";
import { Redirect } from 'react-router-dom';
import { Button, Form, Container, Col, Row, Figure, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import defaultPortrait from '../../assets/portrait.jpg';
import CreditCardInput from 'react-credit-card-input';
import Promise from 'bluebird';
import axios from 'axios';
import mpLogo from '../../assets/mp-small.png'
import PaypalCheckoutButton from '../../components/Checkout/PayPal/Paypal.jsx'

const TAXES_PERCENT = 0.25;
//const SHIPPING_COST = 3.00;
const API_URL = process.env.REACT_APP_API_URL;

const Checkout = () => {

    const [products, setProducts] = useState([]);
    const productsPrice = useMemo(() => products.reduce((a, p) => a + (p.price * p.quantity), 0.0), [products]);
    
    const subtotal = productsPrice;
    const tax = subtotal * TAXES_PERCENT;
    const totalPrice = subtotal + tax;
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);

    const [loading, setLoading] = useState(true);
    const [emailValidation, setEmailValidation] = useState("");
    const [checkoutInput, setCheckoutInput] = useState({
        totalPrice,
        firstName: user.firstName,
        lastName: user.lastName,
        userEmail: '',
        adressOne: '',
        adressTwo: '',
        country: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiration: '',
        cvc: ''
    })

    const optionOne = document.getElementById('optionOne');
    const optionTwo = document.getElementById('optionTwo');

    const formOne = document.getElementById('userEmail');
    const formTwo = document.getElementById('otherEmail');
    const formTwoConfirm = document.getElementById('otherEmailConfirm');

    const totalMount = document

    const handleCheckChangeOne = () => {

        formOne.disabled = !formOne.disabled;

        if (formTwo.disabled && formTwoConfirm.disabled) {
            if (optionOne.checked) {
                setCheckoutInput({
                    ...checkoutInput,
                    userEmail: user.email
                });
            }
            else {
                setCheckoutInput({
                    ...checkoutInput,
                    userEmail: ''
                });
            }

            return;
        }

        else if (formOne.disabled) {
            formTwo.disabled = false;
            formTwoConfirm.disabled = false;
            optionTwo.checked = true;
        }

        else {
            formTwo.disabled = true;
            formTwoConfirm.disabled = true;
            optionTwo.checked = false;
            setCheckoutInput({
                ...checkoutInput,
                userEmail: user.email
            });
        }

    };

    const handleCheckChangeTwo = () => {

        formTwo.disabled = !formTwo.disabled;
        formTwoConfirm.disabled = !formTwoConfirm.disabled;

        if (formOne.disabled) {
            if (optionTwo.checked) {
                setCheckoutInput({
                    ...checkoutInput,
                    userEmail: formTwo.value
                });
            }
            else {
                setCheckoutInput({
                    ...checkoutInput,
                    userEmail: ''
                });
            }

            return;
        }

        else if (formTwo.disabled && formTwoConfirm.disabled) {
            formOne.disabled = false;
            optionOne.checked = true;
        }

        else {
            formOne.disabled = true;
            optionOne.checked = false;
            setCheckoutInput({
                ...checkoutInput,
                userEmail: formTwo.value
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'confirmEmail') setEmailValidation(value)

        else {
            setCheckoutInput({
                ...checkoutInput,
                [name]: value,
                totalPrice
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (checkoutInput.userEmail === emailValidation || checkoutInput.userEmail === user.email) {
            console.log(checkoutInput);
            //PETICION A LA API DE MP :>
        }
        else {
            toast.error(`¡Uy, verifique que los correos coincidan :o!`, {
                position: 'top-right',
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        }
    };

    const getProductPortrait = (media) => {
        if (!media || (media.length === 0)) {
            return defaultPortrait;
        }

        const portrait = media.find(m => m.type === 'portrait');

        if (!portrait) {
            return defaultPortrait;
        }

        if (!portrait.path.includes('/')) {
            return `${API_URL}/${portrait.path}`;
        }

        return portrait.path;
    };

    useEffect(() => {
        if (!cart.products || (cart.products.length === 0)) {
            setProducts([]);
            setLoading(false);

            return;
        }

        setLoading(true);

        Promise.map(cart.products, ({ productId }) => {
            return axios.get(`${API_URL}/products/${productId}`);
        })
            .then((responses) => {
                const prodArray = responses.map((response, pos) => {
                    return { ...response.data, quantity: cart.products[pos].quantity };
                });

                setProducts(prodArray);
                setLoading(false);
            })
            .catch(() => {
                toast.error(`¡Ha ocurrido un error al recuperar la información de los productos!`, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
            });
    }, [cart.count, cart.products]);

    const order = {
        customer: user.id.toString(),
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        total: totalPrice.toFixed(2),
        items: products.map(prod => (
            {
                sku: prod.id.toString(),
                name: prod.name,
                price: prod.price,
                quantity: prod.quantity.toString(),
                currency: 'USD',
            }
        ))  
    };

    if(user.id === 0) {
        return (
            <Redirect to="/"/>
        )
    };

    return (
        <Container className='checkout-container'>
            <Row>
                <Col>
                    <Form className='checkout-form-container' onSubmit={(e) => handleSubmit(e)}>
                        <h1>Finalizar compra</h1>
                        <Form.Group>
                            <Form.Label>Usar mi email</Form.Label>
                            <div style={{ display: 'flex', justifyContent: "space-around" }}>
                                <Form.Check
                                    id='optionOne'
                                    type='switch'
                                    onChange={() => handleCheckChangeOne()}
                                    name="switchOptionOne"
                                    label=""

                                />
                                <Form.Control
                                    type='email'
                                    value={user.email}
                                    id='userEmail'
                                    disabled
                                />
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Usar otro email</Form.Label>
                            <Row>
                                <Col xs={1}>
                                    <Form.Check
                                        id='optionTwo'
                                        type='switch'
                                        name='switchOptionTwo'
                                        label=''
                                        onChange={() => handleCheckChangeTwo()}
                                    />
                                </Col>
                                <Col className='checkout-form-otherEmail'>
                                    <Form.Control
                                        type='email'
                                        id='otherEmail'
                                        name='userEmail'
                                        disabled
                                        placeholder='Ingrese el email donde desea recibir los codigos'
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </Col>
                            </Row>
                            <Form.Control
                                className='checkout-form-confirmEmail'
                                type='email'
                                id='otherEmailConfirm'
                                name='confirmEmail'
                                disabled
                                placeholder='Por favor, confirme el email'
                                onChange={(e) => handleInputChange(e)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Row>
                                <Col>
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        placeholder='First name'
                                        value={checkoutInput.firstName}
                                        name='firstName'
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        placeholder="Last name"
                                        value={checkoutInput.lastName}
                                        name='lastName'
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Dirección de facturación</Form.Label>
                            <Form.Control
                                placeholder="1234 Main St"
                                name='adressOne'
                                onChange={(e) => handleInputChange(e)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress2">
                            <Form.Label>Segunda dirección de facturación (opcional)</Form.Label>
                            <Form.Control
                                placeholder="Departamento, estudio o piso..."
                                name='adressTwo'
                                onChange={(e) => handleInputChange(e)}
                            />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control
                                    name='city'
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Pais</Form.Label>
                                <Form.Control
                                    name='country'
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control
                                    name='zip'
                                    onChange={(e) => handleInputChange(e)}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group>
                            <div className='checkout-paymethod-title'>
                                <Form.Label>Pago mediante</Form.Label>
                                <Image src={mpLogo} />
                            </div>
                            <CreditCardInput
                                cardNumberInputProps={{ onChange: e => setCheckoutInput({ ...checkoutInput, cardNumber: e.target.value }) }}
                                cardExpiryInputProps={{ onChange: e => setCheckoutInput({ ...checkoutInput, expiration: e.target.value }) }}
                                cardCVCInputProps={{ onChange: e => setCheckoutInput({ ...checkoutInput, cvc: e.target.value }) }}
                                fieldClassName="input"
                            />
                        </Form.Group>

                        <div>
                            <h3>Resumen de compra</h3>
                            <p>Articulos ({products.length}): {subtotal.toFixed(2)}US$</p>
                            {/* <p>Envio: {shippingCost.toFixed(2)}US$</p> */}
                            <p>Impuestos: {tax.toFixed(2)}US$</p>
                            <h4 id='checkout-total'>Total:{totalPrice.toFixed(2)}US$</h4>
                        </div>
                        <PaypalCheckoutButton order={order}/>
                        <Button variant="primary" type="submit">Comprar</Button>
                    </Form>
                </Col>
                <Col className='checkout-column-product'>
                    {
                        products.map((product, i) => (
                            <Figure className='checkout-product-card' key={i}>
                                <Row>
                                    <Col xs={2}>
                                        <Figure.Image
                                            width={80}
                                            height={80}
                                            alt="60x60"
                                            src={getProductPortrait(product.media)}
                                        />
                                    </Col>
                                    <Col>
                                        <Row>
                                            <div>
                                                <Figure.Caption>{product.name}</Figure.Caption>
                                                <Figure.Caption>Cantidad: {product.quantity}</Figure.Caption>
                                                <Figure.Caption>Precio: ${(product.quantity * product.price).toFixed(2)}</Figure.Caption>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </Figure>
                        ))
                    }
                </Col>
            </Row>
        </Container >
    );
};

export default Checkout;
