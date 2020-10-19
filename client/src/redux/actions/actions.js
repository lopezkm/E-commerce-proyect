import { ADD_TO_CART } from './action-types.js'


export const AddToCart = () => {
    
    return (dispatch) => {
        console.log('Add to cart');
        dispatch({
            type: ADD_TO_CART
        });
    }
}


// export function name (args) {
//     return function(dispatch) {
//       return fetch("url" + args)
//         .then(res => res.json())
//         .then(json => {

//           dispatch({ type: "ACTION_TYPE", payload: json });
        
//         });    
//     };
// }