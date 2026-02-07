import axios from "axios";

const API = "http://localhost:5000/api/candidates";

export const getCandidates = () => axios.get(API);
export const createCandidate = (data) => axios.post(API, data);
export const deleteCandidate = (id) => axios.delete(`${API}/${id}`);
