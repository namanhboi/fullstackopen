import axios from "axios";

const baseURL = "http://localhost:3001/persons"


const getAll = () => {
    return axios.get(baseURL).then((response) => response.data);
}

const addContact = (contact) => {
    return axios.post(baseURL, contact).then((response) => response.data);
}

const deleteContact = (id) => {
    return axios.delete(`${baseURL}/${id}`).then((response) => response.data);
}

const updateContact = (id, contact) => {
    return axios.put(`${baseURL}/${id}`, contact).then(response => response.data)
} 

export default {getAll, addContact, deleteContact, updateContact}