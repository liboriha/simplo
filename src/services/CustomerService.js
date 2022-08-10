import { apiurl } from './helpers/variables.js';
import axios from 'axios'

export const CustomerService = {
    listCustomers,
    createCustomer,
    readCustomer,
    updateCustomer,
    deleteCustomer,
}

function listCustomers() {
    const url = `${apiurl}/customers`;
    return axios.get(url).then((response) => {
        return Promise.resolve(response.data);
    }).catch((error) => {
        return Promise.reject(error);
    })
}

function createCustomer(body) {

    const url = `${apiurl}/customers`;

    return axios.post(url,body).then((response) => {
        return Promise.resolve(response.data);
    }).catch((error) => {
        return Promise.reject(error);
    })
}

function readCustomer(id) {

    const url = `${apiurl}/customers/${id}`;

    return axios.get(url).then((response) => {
        return Promise.resolve(response.data);
    }).catch((error) => {
        return Promise.reject(error);
    })
}

function updateCustomer(id,body) {

    const url = `${apiurl}/customers/${id}`;

    return axios.put(url,body).then((response) => {
        return Promise.resolve(response.data);
    }).catch((error) => {
        return Promise.reject(error);
    })
}

function deleteCustomer(id) {

    const url = `${apiurl}/customers/${id}`;

    return axios.delete(url).then((response) => {

        return Promise.resolve(response.data);
    }).catch((error) => {
        return Promise.reject(error);
    })
}


