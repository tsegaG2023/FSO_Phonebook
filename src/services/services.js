import axios from "axios";
const baseURL = "http://localhost:3001/phonebook";
const create = (newObj) => {
  return axios.post(baseURL, newObj);
};
const update = (id, newObj) => {
  return axios.put(`${baseURL}/${id}`, newObj);
};

const getAll = () => {
  return axios.get(baseURL);
};

const deleteRecord = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export default { create, update, getAll, deleteRecord };
