import axios from 'axios'

export const backendAxiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
    headers: {
        Accept: 'application/json',
        'content-Type': 'application/json'
    }
})