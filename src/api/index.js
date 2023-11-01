import axios from "axios";

const baseURL = axios.create({ baseURL: process.env.REACT_APP_API_URL });
baseURL.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("userToken")}`;
  return config;
});
export default baseURL;
