import * as actionTypes from './actionTypes';
import axios from 'axios';

export const updateCart = cart =>{
    return{
        type: actionTypes.updateCart,
        cart: cart
    }
}

export const addItem = id =>{
    return {
        type: actionTypes.addItemToCart,
        itemId: id
    }
}
export const removeItem = id =>{
    return {
        type: actionTypes.removeItemCart,
        itemId: id
    }
}

export const addOrder = data => {
    return {
        type: actionTypes.addOrder,
        data: data
    }
}

export const removeOrder = id => {
    return {
        type: actionTypes.removeOrder,
        id: id
    }
}

export const openAddingCart = item =>{
    return {
        type: actionTypes.openAddingCart
    }
}
export const cancelAddingCart = itemID =>{
    return {
        type: actionTypes.closeAddingCart
    }
}
export const setUser = info =>{
    return {
        type: actionTypes.setUserInfo,
        data: info
    }
}

export const setUserDataFromServer = userName =>{
    return dispatch => {
        axios.get(`http://localhost:3000/users/${userName}`)
        .then(response => {
            dispatch(setUser(response.data[0]));
            return response.data[0];
        })
        .catch(error => console.log(error));
    }
}

export const login = () =>{
    return {type: actionTypes.login}
}

export const setAuthentication = () => {
    return dispatch => {
        dispatch(login());
    }
}

export const logout = () =>{
    return {type: actionTypes.logout}
}