import axios from "axios";


const axiosInstance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});


// Add a request interceptor to include the token in headers
axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
);
  
// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error("Unauthorized access, please log in again.");
      }
      return Promise.reject(error);
    }
);


export default axiosInstance;
