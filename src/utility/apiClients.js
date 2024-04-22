import axios from 'axios'

export const backendAxiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
    // baseURL: `http://localhost:5000/`,
    headers: {
        Accept: 'application/json',
        'content-Type': 'application/json'
    }
})