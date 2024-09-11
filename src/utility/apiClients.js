import axios from 'axios'

export const backendAxiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
    // baseURL: `http://localhost:5000/`,
    headers: {
        Accept: 'application/json',
        'content-Type': 'application/json'
    }
})

export const backendFileClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API,
    // baseURL: `http://localhost:5000/`,
    headers: {
        Accept: 'application/json',
        'content-Type': 'multipart/form-data'
    }
})

backendAxiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response && error.response.status === 401) {
        window.open(`/login`, "_self")
    }
    if (error.response && (error.response.status > 400 && error.response.status < 500)) {
        // window.open(`${authUrl}/logout`, "_self")
        console.timeLog("API ERROR:", error)
        // alert("API Error occured, check logs")
    }
    return Promise.reject(error)
}
)

backendFileClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response && error.response.status === 401) {
        window.open(`/login`, "_self")
    }
    if (error.response && (error.response.status > 400 && error.response.status < 500)) {
        // window.open(`${authUrl}/logout`, "_self")
        console.timeLog("API ERROR:", error)
        // alert("API Error occured, check logs")
    }
    return Promise.reject(error)
}
)