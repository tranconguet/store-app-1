import * as actionTypes from '../action/actionTypes';
import * as Utility from '../../utility/utility';

const initalState = {
  userName: '',
  password: '',
  cart: [],
  firstName: '',
  lastName: '',
  email: '',
  orders: ''
};

const reducer = ( state = initalState , action) =>{
    // eslint-disable-next-line default-case
    switch(action.type){
        case actionTypes.setUserInfo:
          return action.data;
        case actionTypes.updateCart:
          return updateCart(state, action.cart);
        case actionTypes.addItemToCart:
          return addItem(state,action.itemId);
        case actionTypes.removeItemCart:
          return removeItem(state, action.itemId);
        case actionTypes.addOrder:
          return addOrder(state,action.data);
        case actionTypes.removeOrder:
          return removeOrder(state, action.id);
    }
    return state;
}

const updateCart = (state, cart) => {
  let newState = {...state};
  newState.cart = cart;
  Utility.updateUserData(newState);
  return newState;
}

const addItem = (state, id) => {
    let newState = {...state};
    const index = newState.cart.findIndex(cur => cur[0] === id);
    if(index < 0){
      newState.cart.push([id,1]);
    }else{
      newState.cart[index][1]++;
    }
    Utility.updateUserData(newState);
    return newState; 
}

const addOrder = (state, data) =>{
  let newState = {...state};
  newState.orders.push(data);
  Utility.updateUserData(newState);
  return newState; 
}

const removeOrder = (state, id) =>{
  return state;
}

const removeItem = (state, id) =>{
    let newState = {...state};
    const index = newState.cart.findIndex(cur => cur[0] === id);
    newState.cart.splice(index,1);
    Utility.updateUserData(newState);
    return newState;
}

export default reducer;