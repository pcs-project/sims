import axios from "axios";
import AppProps from "../../../AppProps";
import errorComposer from "../../../utilities/components/errorComposer";
class UserCreationService {
  saveUser(data) {
    console.log(JSON.stringify(data), "inside saveUser post api");
    return axios.post(AppProps.API_BASE_URL + "/security/users/save", data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
  getUserList() {
    return axios.get(AppProps.API_BASE_URL + "/security/users/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getLoginUserDetails() {
    return axios.get(AppProps.API_BASE_URL + "/security/users/logged-user-details", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  changePassword(password, newPassword, reEnterPassword) {
    console.log("inside changePassword post api");
    return axios.post(AppProps.API_BASE_URL + "/security/users/change-password", null, {
      params: {
        password,
        newPassword,
        reEnterPassword,
      },
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  sendNewPassword(email) {
    console.log("inside sendNewPassword method of ChangePassword");
    return axios.post(AppProps.API_BASE_URL + "/security/email/reset-password/" + email, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
}
export default new UserCreationService();
axios.interceptors.response.use(undefined, function (error) {
  error.handleGlobally = errorComposer(error);
  return Promise.reject(error);
});
