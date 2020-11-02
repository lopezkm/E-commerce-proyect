import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';
import { toast } from 'react-toastify';
import axios from 'axios';
import { removeProductsFromCart } from '../../../redux/action-creators/cart';

const API_URL = process.env.REACT_APP_API_URL;

const  PAYPAL_CLIENT_ID = 'AUupUI17YSCIIUg94t3uJGxU3ycZgIobjEeA82gt-EQ4VR_ikydiB8-h-Cm935yN3_2_93WbyAIW16EF'

const PaypalCheckoutButton = ({ order }) => {

    const userId = useSelector( ( state ) => state.user.id );
    const dispatch = useDispatch( );

    const paypaConf = {
        currency: 'USD',
        env: 'sandbox',
        client: {
            sandbox: PAYPAL_CLIENT_ID,
            production: '-- id --'
        },
        style: {
            color: 'silver',
            shape: 'pill',
            size:  'small',
            label: 'pay'
        }
    };

    const PaypalButton = paypal.Button.driver ('react', { React, ReactDOM });

    const payment = (data, actions) => {
        const payment = {
            transactions: [
                {
                    amount: {
                        total: order.total,
                        currency: paypaConf.currency,
                        details: {
                            subtotal: order.subtotal,
                            tax: order.tax,
                        }
                    },
                    description: 'Compra en Six Games',
                    custom: order.customer || '',
                    item_list: {
                        items: order.items
                    }
                }
            ],
            note_to_payer: 'Contáctanos para cualquier aclaración'
        };

        return actions.payment.create ({ payment });
    };

    const onAuthorize = (data, actions) => {
        return actions.payment.execute()
        .then(response => {

            toast.success( `El pago se procesó correctamente, ID: ${response.id}`, {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
            } );
           
            return axios.get(`${API_URL}/users/${userId}/orders`, { withCredentials: true })
        })
        .then(response =>  { 

			let CartOrder = response.data.filter(order => order.status === 'processing');
            return axios.put(`${API_URL}/orders/${CartOrder[0].id}`, { status: 'completed' }, { withCredentials: true })
		})
        .then(() => {

            dispatch(removeProductsFromCart(order.customer));
            setTimeout(() => window.location.href= '/', 2010);
        })
        .catch(error =>{
            console.log(error);
            toast.error( `¡Ocurrió un error al procesar el pago con Paypal!`, {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            } );
            setTimeout(() => window.location.href= '/checkout', 2010);
        });
    };

    const onError = (error) => {
        console.log(error);
        toast.error( `¡El pago no fue realizado, vuelva a intentarlo!`, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
        } );
        setTimeout(() => window.location.href= '/checkout', 2010);
    };

    const onCancel = (data, actions) => {
            console.log(data)
            window.location.href= '/cancel';
    
    };

    
    return(
        <PaypalButton
            env={paypaConf.env}
            client={paypaConf.client}
            payment={(data, actions) => payment(data, actions)}
            onAuthorize={(data, actions) => onAuthorize(data, actions)}
            onCancel={(data, actions) => onCancel(data, actions)}
            onError={(error) => onError(error)}
            style={paypaConf.style}
            commit
            locale="es_CO"
        />
    );
};

export default PaypalCheckoutButton;