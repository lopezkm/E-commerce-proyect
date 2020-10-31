import React from 'react';
import ReactDOM from 'react-dom';
import paypal from 'paypal-checkout';

const  PAYPAL_CLIENT_ID = 'AUupUI17YSCIIUg94t3uJGxU3ycZgIobjEeA82gt-EQ4VR_ikydiB8-h-Cm935yN3_2_93WbyAIW16EF'

const PaypalCheckoutButton = ({ order }) => {

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

    const PaypalButton = paypal.Button.driver ('react', { React, ReactDOM});

    const payment = (data, actions) => {
        const payment = {
            transactions: [
                {
                    amount: {
                        total: order.total,
                        currency: paypaConf.currency
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
            //respuesta de paypal
            console.log(response);
            alert('El pago se procesó correctamente, ID: ', response.id);
        })
        .catch(error =>{
            console.log(error);
            alert('Ocurrió un error al procesar el pago con PayPal');
        });
    };

    const onError = (error) => {
        console.log(error);
        alert('El pago no fue realizado, vuelva a intentarlo');
    };

    const onCancel = (data, actions) => {
        alert('Pago no realizado, usuario canceló el proceso');
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