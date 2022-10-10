import axios from 'axios';
import AppProps from '../../../AppProps';
class OldAgeHomeCaseService {

  getById(id) {
    return axios.get(AppProps.API_BASE_URL + AppProps.OLD_AGE_HOME_CASE + id, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getAllList() {
    return axios.get(AppProps.API_BASE_URL + AppProps.OLD_AGE_HOME_CASE, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  saveData(data) {
    console.log(data, "inside post api");
    return axios.post(AppProps.API_BASE_URL + AppProps.OLD_AGE_HOME_CASE, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  updateData(data) {
    console.log(data, "inside put api");
    return axios.put(AppProps.API_BASE_URL + AppProps.OLD_AGE_HOME_CASE, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
}
export default new OldAgeHomeCaseService()