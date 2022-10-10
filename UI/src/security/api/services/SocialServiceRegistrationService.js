import axios from "axios";
import AppProps from "../../../AppProps";
import errorComposer from "../../../utilities/components/errorComposer";
class SocialServiceRegistrationService {
  saveSocialServiceRegistration(data) {
    console.log("inside saveSocialServiceRegistration method of SocialServiceRegistrationService");
    return axios.post(AppProps.API_BASE_URL + "/security/social-service-registartion/", data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
  getAllSocialServiceRegistration(data) {
    console.log("inside getSocialServiceRegistration method of SocialServiceRegistrationService");
    return axios.get(AppProps.API_BASE_URL + "/security/social-service-registartion/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
  updateSocialServiceRegistration(id, data) {
    console.log(
      "inside updateSocialServiceRegistration method of SocialServiceRegistrationService"
    );
    return axios.put(AppProps.API_BASE_URL + "/security/social-service-registartion/" + id, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
  deleteSocialServiceRegistration(id) {
    console.log(
      "inside deleteSocialServiceRegistration method of SocialServiceRegistrationService"
    );
    return axios.delete(AppProps.API_BASE_URL + "/security/social-service-registartion/" + id, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
}
export default new SocialServiceRegistrationService();

axios.interceptors.response.use(undefined, function (error) {
  error.handleGlobally = errorComposer(error);
  return Promise.reject(error);
});
