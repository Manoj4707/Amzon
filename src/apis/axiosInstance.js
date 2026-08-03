import axios from "axios";
import { API_CONFIG } from "../constants/api";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

export default axiosInstance;
