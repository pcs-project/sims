import axios from "axios";
import AppProps from "../../../AppProps";

class DisabledIdCardService {
  saveDisabledIdCardService(data) {
    console.log(JSON.stringify(data), "inside saveDisabledIdCardService post api");
    return axios.post(AppProps.API_BASE_URL + "/id-card/disabled/", data, {
      headers: {
        //   "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getAllDisabledIdCardList(data) {
    console.log("inside getAllDisabledIdCardList get api");
    return axios.get(AppProps.API_BASE_URL + "/id-card/disabled/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getDisabledIdCardDetailsById(id) {
    console.log("inside getDisabledIdCardDetailsById get api");
    return axios.get(AppProps.API_BASE_URL + "/id-card/disabled/" + id, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  searchDisabledIdCardDetails(name, district, citizenshipNo) {
    console.log("inside searchDisabledIdCardDetails get api");
    return axios.get(AppProps.API_BASE_URL + "/id-card/disabled/search-by", {
      params: {
        name,
        district,
        citizenshipNo,
      },
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  updateDisabledIdCardService(data) {
    console.log(JSON.stringify(data), "inside updateDisabledIdCardService post api");
    return axios.post(AppProps.API_BASE_URL + "/id-card/disabled/update", data, {
      headers: {
        //   "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
}
export default new DisabledIdCardService();
