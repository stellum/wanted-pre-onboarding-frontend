import axios from "axios";

export const clientServer = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop",
});

clientServer.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
