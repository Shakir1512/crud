import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8001' });

export const getAllDetails = () => {
    return API.get('/user');
}
