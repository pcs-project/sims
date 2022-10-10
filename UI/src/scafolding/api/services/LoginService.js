import axios from "axios";
import AppProps from "../../../AppProps";

class LoginService {
  auth(username, password) {
    console.log("Inside  method of Login Service");
    var bodyFormData = new FormData();
    bodyFormData.append("username", username);
    bodyFormData.append("password", password);
    bodyFormData.append("grant_type", "password");
    bodyFormData.append("user_type", "admin");

    return axios.post(AppProps.API_BASE_URL + "/security/oauth/token", bodyFormData, {
      auth: {
        username: "itmis",
        password: "itmis",
      },
    });
  }

  getMenu() {
    return axios.get(AppProps.API_BASE_URL + "/security/menu", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getValidationForPassword(username, token) {
    console.log("username", username);
    return axios.get(AppProps.API_BASE_URL + "/security/users/validation/" + username, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
}
export default new LoginService();
