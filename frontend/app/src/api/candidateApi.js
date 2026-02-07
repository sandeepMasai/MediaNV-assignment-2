import axios from "axios";

const BASE_URL = "http://localhost:5000/api/candidates";

// process.env.REACT_APP_API_URL ||

// GET ALL
export const getCandidates = () => axios.get(BASE_URL);

// CREATE
export const createCandidate = (data) => axios.post(BASE_URL, data);

// UPDATE
export const updateCandidate = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data);

// DELETE
export const deleteCandidate = (id) => axios.delete(`${BASE_URL}/${id}`);
