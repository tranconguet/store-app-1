import axios from 'axios';

const phoneData = require('../data/phone-data.json');
const acsData = require('../data/acs-data.json');
const watchData = require('../data/watch-data.json');
const tabletData = require('../data/tablet-data.json');

export const getProductCodeFromUrl = productUrl =>{
    const url = [...productUrl];
    let results = url.slice(30,url.length);
    results = results.join('');
    return results;
}
export const getDataFromId = id => {
    const list = phoneData.concat(acsData,watchData,tabletData);
    const data = list.findIndex(el => el.url.includes(id));
    return list[data];   
}
export const convertPrice = price =>{
    const str = price.substring(0, price.length - 1);
    const arr = str.split('.');
    const res = arr.join('');
    return +res;
}

export const convertPriceToString = price =>{
    let arr = [];
    const str = "" + price;
    for( let i = str.length - 1 ; i >= 0 ; i-=3){
        arr.push(str.substring(i-2,i+1));
    }
    arr = arr.reverse();
    const res = arr.join('.');
    return res+"₫";
}

export const getAllData = () =>{
    const list = phoneData.concat(acsData,watchData,tabletData);
    return list;
}

export const getLoginResultFromServer = async data =>{
    return await axios.post(`http://localhost:3000/users/login`,data)
}


export const updateUserData = async (data) =>{
    axios.patch(`http://localhost:3000/users/${data.userName}`,data)
    .then(response => {
          console.log(data);
    })
    .catch(error => console.log(error));
}

export const addUser = async data => {
    return await axios.post(`http://localhost:3000/users/register`,data)
}
export function isEmailValid(str) {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    str = "azamsharp@gmail.com";      

    return str.match(pattern);    

}
