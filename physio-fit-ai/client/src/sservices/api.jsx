import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getPlan = async (payload) => {
  return api.post("/plan", payload);
};
