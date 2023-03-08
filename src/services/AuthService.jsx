import axiosObject from "../ConfigAxios";

export default class AuthService {
  static login = async (values) => {
    const data = await axiosObject.post("api/token/", values);

    if (data) {
      axiosObject.defaults.headers["Authorization"] =
        "Bearer " + data.data.access;

      localStorage.setItem("access_token", data.data.access);
      localStorage.setItem("refresh_token", data.data.refresh);

      window.location.pathname = "/";
    }
  };

  static verifyToken = async () => {
    let token = localStorage.getItem("access_token");

    if (token) {
      try {
        let response = await axiosObject.post("api/token/verify/", {
          token,
        });

        if (response.status === 200) {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    }

    return false;
  };

  static logout = () => {
    if (localStorage.getItem("refresh_token"))
      localStorage.removeItem("refresh_token");

    if (localStorage.getItem("access_token"))
      localStorage.removeItem("access_token");
  };
}
