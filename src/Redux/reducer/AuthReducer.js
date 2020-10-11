import * as actionTypes from '../action/actionTypes';

const initialState = {
    isAuth: false
}

const reducer = (state = initialState, action) =>{
    // eslint-disable-next-line default-case
    switch(action.type){
        case actionTypes.login:
            return {isAuth: true}
        case actionTypes.logout:
            return {isAuth: false}
    }
    return state;
}

export default reducer;