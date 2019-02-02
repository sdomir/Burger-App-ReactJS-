import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-66d54.firebaseio.com/'
});

export default instance;