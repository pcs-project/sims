import AppProps from "../../../AppProps";
import axios from "axios";
class ModuleService {
  getModuleListByUserId(userId) {
    return axios.get(AppProps.API_BASE_URL + "/security/modules/" + userId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  saveUserModuleFunc(data) {
    console.log(data, "inside post api");
    return axios.post(AppProps.API_BASE_URL + "/security/user/module/", data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
}
export default new ModuleService();
