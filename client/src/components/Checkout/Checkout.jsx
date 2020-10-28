import React, { useState, useEffect, useMemo } from "react";
import { Button, Form, Container, Col, Row, Figure } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import defaultPortrait from '../../assets/portrait.jpg';
import Promise from 'bluebird';
import axios from 'axios';

const TAXES_PERCENT = 0.75;
const SHIPPING_COST = 3.0;
const API_URL = process.env.REACT_APP_API_URL;

const Checkout = () => {
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    console.log(products)

    const productsPrice = useMemo(() => products.reduce((a, p) => a + (p.price * p.quantity), 0.0), [products]);
    const shippingCost = useMemo(() => (productsPrice && SHIPPING_COST), [productsPrice]);
    const taxesCost = useMemo(() => (productsPrice * TAXES_PERCENT), [productsPrice]);
    const totalPrice = useMemo(() => (productsPrice + shippingCost + taxesCost), [productsPrice, shippingCost, taxesCost]);


    const handleCheckChangeOne = (e) => {
        const { name } = e.target;

        let formCheckOne = document.getElementById(name);
        let formCheckTwo = document.getElementById("otherEmail");
        let formCheckTwoConfirm = document.getElementById("otherEmailConfirm");

        formCheckOne.disabled = !formCheckOne.disabled;

        formCheckTwo.disabled = true;
        formCheckTwoConfirm.disabled = true;
    };

    const handleCheckChangeTwo = () => {

        let formCheckTwo = document.getElementById("otherEmail")
        let formCheckTwoConfirm = document.getElementById("otherEmailConfirm")
        let formCheckOne = document.getElementById("emailUser");

        formCheckTwo.disabled = !formCheckTwo.disabled;
        formCheckTwoConfirm.disabled = !formCheckTwoConfirm.disabled;

        formCheckOne.disabled = true;
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


    return (
        <Container>
            <Row>
                <Col>
                    <Form style={{ backgroundColor: "white" }}>
                        <h1>Finalizar compra</h1>
                        <Form.Group>
                            <Form.Label>Usar mi email</Form.Label>
                            <div style={{ display: 'flex', justifyContent: "space-around" }}>
                                <Form.Check
                                    type="radio"
                                    name="emailUser"
                                    onChange={(e) => handleCheckChangeOne(e)}
                                />
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={user.email}
                                    name="finalConsumerEmail"
                                    id="emailUser"
                                    disabled
                                />
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Usar otro email</Form.Label>
                            <div style={{ display: 'flex' }}>
                                <Form.Check
                                    type="radio"
                                    name="otherEmail"
                                    onChange={() => handleCheckChangeTwo()}
                                />
                                <div>
                                    <Form.Control
                                        type="email"
                                        id="otherEmail"
                                    />
                                    <Form.Label>Confirmar email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        id="otherEmailConfirm"
                                    />
                                </div>
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Pago mediante Mercado Pago</Form.Label>
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Col>
                <Col>
                    {
                        products.map((product, i) => (
                            <Figure>
                                <Row>
                                    <Col>
                                        <Figure.Image
                                            width={60}
                                            height={60}
                                            alt="50x50"
                                            src={getProductPortrait(product.media)}
                                        />
                                    </Col>
                                    <Col>
                                        <Row>
                                            <div style={{display: 'flex', justifyContent: 'space-around'}}>
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
        </Container>
    );
};

export default Checkout;
