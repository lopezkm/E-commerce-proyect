import React, {useState, useEffect} from 'react';
import {Container, Card, Button} from 'react-bootstrap';
import axios from 'axios';
import Promise from 'bluebird';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { removeProductsFromCart } from '../../redux/action-creators/cart';

const API_URL = process.env.REACT_APP_API_URL;


const ConfirmCancelOrder = () => {

    const cart = useSelector( ( state ) => state.cart );
    const [ loading, setLoading ] = useState( true );
    const [ products, setProducts ] = useState( [ ] );
    const userId = useSelector( ( state ) => state.user.id );
    const dispatch = useDispatch( );


    const cancelOrder = () => {

        toast.error( `¡Orden cancelada!`, {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined
        } );

        return axios.get(`${API_URL}/users/${userId}/orders`, { withCredentials: true })
        .then(response =>  { console.log('estoy en la respuesta de axios')

			let CartOrder = response.data.filter(order => order.status === 'processing');
            return axios.put(`${API_URL}/orders/${CartOrder[0].id}`, {status: 'canceled'}, { withCredentials: true })
		})
        .then(() => {
			return Promise.map( products, ( { id, stock, quantity } ) => {
				 return axios.put( `${ API_URL }/products/${ id }`,{ stock: stock + quantity}, { withCredentials: true });
			})
		})
        .then(() => {

            dispatch(removeProductsFromCart(userId));
            setTimeout(() => window.location.href= '/', 2010);
        })
    }

    const modifyCart = () => {
        window.location.href= '/cart';
    }

    useEffect( ( ) => {
		if ( !cart.products || ( cart.products.length === 0 ) ) {
			setProducts( [ ] );
			setLoading( false );
			
			return;
		}
		
		setLoading( true );
		
		Promise.map( cart.products, ( { productId } ) => {
			return axios.get( `${ API_URL }/products/${ productId }` );
		} )
		.then( ( responses ) => {
			const prodArray = responses.map( ( response, pos ) => {
				return { ...response.data, quantity: cart.products[ pos ].quantity };
			} );
			setProducts( prodArray );
			setLoading( false );
		} )
		.catch( ( ) => {
			toast.error( `¡Ha ocurrido un error al recuperar la información de los productos!`, {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: true,
				progress: undefined
			} );
		} );
	}, [ cart.count, cart.products ] );


    return (
        <Container className="confirm-cancel-container">
            <Card>
                <h4>¿Como desea proceder?</h4>
                <Button className="button-cancel" onClick={cancelOrder}>Cancelar la orden</Button>
                <Button className="button" onClick={modifyCart}>Editar mi carrito</Button>
            </Card>
        </Container>
    )

}

export default ConfirmCancelOrder;