import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-store-app-b200c.firebaseio.com/'
})


export default instance;