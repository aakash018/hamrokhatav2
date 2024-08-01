import axios from "axios";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_ENDPOINT}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
