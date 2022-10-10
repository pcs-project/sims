import axios from "axios";
import AppProps from "../../../AppProps";
import errorComposer from "../../../utilities/components/errorComposer";
class LabourMigrationCaseFormService {
  saveData(data) {
    console.log(data, "inside post api");
    return axios.post(AppProps.API_BASE_URL + AppProps.LABOUR_MIGRATION + "case-form/", data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getAllList() {
    console.log("inside get api");
    return axios.get(AppProps.API_BASE_URL + AppProps.LABOUR_MIGRATION + "case-form/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getLabourMigrationById(id) {
    console.log("inside get api");
    return axios.get(AppProps.API_BASE_URL + AppProps.LABOUR_MIGRATION + "case-form/" + id, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  updateData(id, data) {
    console.log(data, "inside put api");
    return axios.put(AppProps.API_BASE_URL + AppProps.LABOUR_MIGRATION + "case-form/" + id, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
}

export default new LabourMigrationCaseFormService();
axios.interceptors.response.use(undefined, function (error) {
  error.handleGlobally = errorComposer(error);
  return Promise.reject(error);
});
