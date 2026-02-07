import axios from "axios";

/* ================= BASE URL ================= */
const BASE_URL = "http://localhost:5000/api/candidates";

/* ================= AXIOS INSTANCE ================= */
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= HELPERS ================= */
const handleResponse = (res) => res.data;
const handleError = (err) => {
  console.error("API ERROR:", err.response?.data || err.message);
  throw err;
};

/* ================= API METHODS ================= */

// GET ALL
export const getCandidates = async () => {
  try {
    const res = await api.get("/");
    return handleResponse(res);
  } catch (err) {
    handleError(err);
  }
};

// CREATE
export const createCandidate = async (data) => {
  try {
    const res = await api.post("/", data);
    return handleResponse(res);
  } catch (err) {
    handleError(err);
  }
};

// UPDATE
export const updateCandidate = async (id, data) => {
  try {
    const res = await api.put(`/${id}`, data);
    return handleResponse(res);
  } catch (err) {
    handleError(err);
  }
};

// DELETE
export const deleteCandidate = async (id) => {
  try {
    const res = await api.delete(`/${id}`);
    return handleResponse(res);
  } catch (err) {
    handleError(err);
  }
};
