import axios from "axios";
import AppProps from "../../../AppProps";

class OrganizationService {
  saveOrganizaitonDetails(data) {
    return axios.post(AppProps.API_BASE_URL + "/security/organizations/", data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getAllOrganizaitonsList() {
    console.log("inside getAllOrganizaitonsList  method of Organization Service");
    return axios.get(AppProps.API_BASE_URL + "/security/organizations/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getLoggedInUserOrganizaitonDetails() {
    return axios.get(AppProps.API_BASE_URL + "/security/organizations/by-logged-in-user", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getOrganizaitonDetailsByLoggedUser() {
    return axios.get(AppProps.API_BASE_URL + "/security/organizations//by-logged-in-user/all", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getOrganizaitonListByUserRole() {
    return axios.get(AppProps.API_BASE_URL + "/security/organizations/by-role/all", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getSocialServiceOrganization() {
    return axios.get(AppProps.API_BASE_URL + "/security/organizations/social-service", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
  getOrganizationByAddress(provinceId, districtId, municipalityId, wardId) {
    return axios.get(AppProps.API_BASE_URL + "/security/organizations/by-address", {
      params: {
        provinceId,
        districtId,
        municipalityId,
        wardId,
      },
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getAllOrganization() {
    return axios.get(AppProps.API_BASE_URL + "/security/organizations", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getAllOrganizationByLevel() {
    return axios.get(
      AppProps.API_BASE_URL + "/security/organizations/organization-list/local-level",
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  updateSubDetailsOrganizationDetails(data) {
    return axios.put(AppProps.API_BASE_URL + "/security/organizations/sub-text", data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
}
export default new OrganizationService();
