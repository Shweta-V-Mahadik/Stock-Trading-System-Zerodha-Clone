import axios from "axios";

const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) ||
  process.env.VITE_API_URL ||
  process.env.REACT_APP_API_URL ||
  "https://stock-trading-backend-azb1.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
