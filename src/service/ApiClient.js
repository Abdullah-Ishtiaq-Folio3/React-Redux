import axios from "axios";
import { BASE_URL } from "../constants/Constants";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((request) => {
  request.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  return request;
});

export default apiClient;
