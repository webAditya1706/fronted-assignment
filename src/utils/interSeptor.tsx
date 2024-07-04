import axios from "axios";
import Cookies from 'js-cookie';


// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API base URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    let token =   Cookies.get('assignToken');

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
