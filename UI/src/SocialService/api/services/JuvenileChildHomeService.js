import axios from 'axios';
import AppProps from '../../../AppProps';
class JuvenileChildHomeService {

  getById(id) {
    return axios.get(AppProps.API_BASE_URL + AppProps.JUVENILE_CHILD_HOME + id, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getAllList() {
    return axios.get(AppProps.API_BASE_URL + AppProps.JUVENILE_CHILD_HOME, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  saveData(data) {
    console.log(data, "inside post api");
    return axios.post(AppProps.API_BASE_URL + AppProps.JUVENILE_CHILD_HOME, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  updateData(data) {
    console.log(data, "inside put api");
    return axios.put(AppProps.API_BASE_URL + AppProps.JUVENILE_CHILD_HOME, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
}
export default new JuvenileChildHomeService()