import axios from "axios";
import AppProps from "../../../AppProps";

class SeniorCitizenIdCardService {
  saveSeniorCitizenIdCardService(data) {
    console.log(JSON.stringify(data), "inside saveDisabledIdCardService post api");
    return axios.post(AppProps.API_BASE_URL + "/id-card/senior-citizen/", data, {
      headers: {
        //   "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getAllSeniorCitizenIdCardList() {
    console.log("inside getAllDisabledIdCardList get api");
    return axios.get(AppProps.API_BASE_URL + "/id-card/senior-citizen/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getSeniorCitizenIdCardDetailsById(id) {
    console.log("inside getSeniorCitizenIdCardDetailsById get api");
    return axios.get(AppProps.API_BASE_URL + "/id-card/senior-citizen/" + id, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  searchSeniorCitizenIdCardDetails(name, district, citizenshipNo) {
    console.log("inside searchSeniorCitizenIdCardDetails get api");
    return axios.get(AppProps.API_BASE_URL + "/id-card/senior-citizen/search-by", {
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

  updateSeniorCitizenIdCardService(data) {
    console.log(JSON.stringify(data), "inside updateSeniorCitizenIdCardService post api");
    return axios.post(AppProps.API_BASE_URL + "/id-card/senior-citizen/update", data, {
      headers: {
        //   "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
}
export default new SeniorCitizenIdCardService();
