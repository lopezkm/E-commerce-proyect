import { ADD_TO_CART } from '../actions/action-types.js'

const initialState = {
    cartCounter: 0
};


function rootReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_TO_CART:
        return ({
            
        })
        default:
        return state;
    }

}
  
export default rootReducer;