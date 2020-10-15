const initialState = {
    init: 'initial state'
};


function rootReducer(state = initialState, action) {

    switch (action.type) {
    
        default:
        return state;
    }

}
  
export default rootReducer;