import axios from "axios";
const axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
});
axiosInstance.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem("API_CONFIG.TOKEN");
        if (token) {
            req.headers.API_CONFIG.AUTHORIZATION = `${API_CONFIG.BARER} ${token}`;
        }
        return req;
    },

);


axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        return Promise.reject(err);
    }
);
export default axiosInstance;

