import axios from "axios";

export const clientServer = axios.create({
  baseURL: "https://www.pre-onboarding-selection-task.shop",
});

clientServer.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
