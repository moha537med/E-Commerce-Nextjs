import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
      console.log("Sending token in 'token' header:", token.substring(0, 20) + "...");
    } else {
      console.log("No token in localStorage");
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("401 → Possible invalid/expired token");
    }
    return Promise.reject(error);
  }
);

export default api;