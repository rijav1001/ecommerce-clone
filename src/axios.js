import axios from 'axios';

const instance = axios.create({
    baseURL: '...'   //API (cloud func) URL
})

export default instance;