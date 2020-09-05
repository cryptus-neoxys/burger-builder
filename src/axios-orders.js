import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-fa4a0.firebaseio.com/'
});

export default instance;