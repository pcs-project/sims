import axios from "axios";
import AppProps from "../../../AppProps";

class RoleService {
  saveRole(data) {
    console.log(data, "inside post api");
    return axios.post(AppProps.API_BASE_URL + "/security/roles/", data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getModuleList() {
    console.log("inside getModuleList method of RoleService");
    return axios.get(AppProps.API_BASE_URL + "/security/modules/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
  getAllRoleList() {
    console.log("inside getAllRoleList method of RoleService");
    return axios.get(AppProps.API_BASE_URL + "/security/roles/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getAllModuleByRoleId(roleId) {
    console.log("inside getAllRoleList method of RoleService");
    return axios.get(AppProps.API_BASE_URL + "/security/roles/" + roleId + "/module/list", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  updateRole(roleId, data) {
    console.log(data, "inside put api");
    return axios.put(AppProps.API_BASE_URL + "/security/roles/" + roleId, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  deleteRole(roleId) {
    console.log(roleId, "inside delete api");
    return axios.delete(AppProps.API_BASE_URL + "/security/roles/" + roleId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getAllParentModuleList() {
    console.log("inside getModuleList method of RoleService");
    return axios.get(AppProps.API_BASE_URL + "/security/modules/parent-module", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getRoleByRoleDesc(role) {
    console.log("inside getRoleByRoleDesc method of RoleService");
    return axios.get(AppProps.API_BASE_URL + "/security/roles/by-role-desc/" + role, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
}
export default new RoleService();
