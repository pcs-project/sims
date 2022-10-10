import axios from "axios";
import AppProps from "../../../AppProps";

class UserService {
  saveUser(data) {
    console.log(JSON.stringify(data), "inside saveUser post api");
    return axios.post(AppProps.API_BASE_URL + "/security/users/", data, {
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

  deleteUser(id) {
    return axios.delete(AppProps.API_BASE_URL + "/security/users/" + id, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  updateUser(userId, data) {
    console.log(JSON.stringify(data), "inside updateUser post api");
    return axios.put(AppProps.API_BASE_URL + "/security/users/" + userId, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
  
  resetUser(id) {
    return axios.post(AppProps.API_BASE_URL + "/security/users/reset-password/" + id, id, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getUserLevel() {
    console.log("inside getUserLevel post api");
    return axios.get(AppProps.API_BASE_URL + "/security/users/user-level", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
}
export default new UserService();
