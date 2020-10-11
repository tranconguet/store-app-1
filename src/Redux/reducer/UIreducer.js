import * as actionTypes from '../action/actionTypes';

const initialState = {
    isAddingCart : false
}

const reducer = (state = initialState, action) =>{
    // eslint-disable-next-line default-case
    switch(action.type){
        case actionTypes.openAddingCart:
            return {isAddingCart: true}
        case actionTypes.closeAddingCart:
            return {isAddingCart: false}
    }
    return state;
}

export default reducer;