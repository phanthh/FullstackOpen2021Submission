import axios from "axios";

const baseUrl = "/api/persons";
const getAll = async () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const create = async (newObj) => {
  const req = axios.post(baseUrl, newObj);
  return req.then((res) => res.data);
};

const update = async (id, newObj) => {
  const req = axios.put(`${baseUrl}/${id}`, newObj);
  return req.then((res) => res.data);
};

const deleting = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`);
  return req;
};

const personService = { getAll, create, update, deleting };

export default personService;
