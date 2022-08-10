import { apiurl } from './helpers/variables.js';
import axios from 'axios'

export const CustomerGroupService = {
    listCustomerGroups,
    createCustomerGroup,
    readCustomerGroup,
    updateCustomerGroup,
    deleteCustomerGroup

}

function listCustomerGroups() {

    const url = `${apiurl}/customergroups`;

    return axios.get(url).then((response) => {
        return Promise.resolve(response.data);
    }).catch((error) => {
        return Promise.reject(error);
    })
}

function createCustomerGroup(body) {

    const url = `${apiurl}/customergroups`;

    return axios.post(url,body).then((response) => {
        return Promise.resolve(response.data);
    }).catch((error) => {
        return Promise.reject(error);
    })
}

function readCustomerGroup(id) {

    const url = `${apiurl}/customergroups/${id}`;

    return axios.get(url).then((response) => {
        return Promise.resolve(response.data);
    }).catch((error) => {
        return Promise.reject(error);
    })
}

function updateCustomerGroup(id,body) {

    const url = `${apiurl}/customergroups/${id}`;

    return axios.put(url,body).then((response) => {
        return Promise.resolve(response.data);
    }).catch((error) => {
        return Promise.reject(error);
    })
}

function deleteCustomerGroup(id) {

    const url = `${apiurl}/customergroups/${id}`;

    return axios.delete(url).then((response) => {
        return Promise.resolve(response.data);
    }).catch((error) => {
        return Promise.reject(error);
    })
}

