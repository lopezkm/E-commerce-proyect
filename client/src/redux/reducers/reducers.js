import { ADD_TO_CART } from '../actions/action-types.js'

const initialState = {
    cartCounter: 2
};


function rootReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_TO_CART:
        return ({
            cartCounter: state.cartCounter + 1
        })
        default:
        return state;
    }

}
  
export default rootReducer;