import axios from "axios";
import AuthService from "./services/AuthService";

const axiosObject = axios.create({
  baseURL: import.meta.env.VITE_REACTJS_BACKEND,
  timeout: 5000,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosObject.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.response.data.detail !==
        "No active account found with the given credentials" &&
      error.config.url !== "api/token/refresh/"
    ) {
      const refresh_token = localStorage.getItem("refresh_token");

      if (refresh_token) {
        try {
          const response = await axiosObject.post("api/token/refresh/", {
            refresh: refresh_token,
          });

          if (response.status === 200) {
            localStorage.setItem("access_token", response.data.access);

            axiosObject.defaults.headers["Authorization"] =
              "Bearer " + response.data.access;
            originalRequest.headers["Authorization"] =
              "Bearer " + response.data.access;

            if (error.config.url === "api/token/verify/") {
              originalRequest.data = JSON.stringify({
                token: response.data.access,
              });
            }

            return axiosObject(originalRequest);
          }
        } catch (err) {
          AuthService.logout();
          console.log(err);
        }
      }
    }

    return Promise.reject(error.response);
  }
);

export default axiosObject;
