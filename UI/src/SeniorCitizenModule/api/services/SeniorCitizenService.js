import axios from 'axios';
import AppProps from '../../../AppProps';
class SeniorCitizenService {

  getListByFiscalYear(fiscalYear) {
    return axios.get(AppProps.API_BASE_URL + AppProps.SENIOR_CITIZEN + fiscalYear, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getListByFiscalYearAndQuarter(fiscalYear, quarter) {
    return axios.get(AppProps.API_BASE_URL + AppProps.SENIOR_CITIZEN + fiscalYear + '/' + quarter, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getListByOrganization(fiscalYear,quarter, organizationId) {
    return axios.get(AppProps.API_BASE_URL + AppProps.SENIOR_CITIZEN + fiscalYear + '/' + quarter + '/' + organizationId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  saveData(data) {
    console.log(data, "inside post api");
    return axios.post(AppProps.API_BASE_URL + AppProps.SENIOR_CITIZEN, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  updateData(data) {
    console.log(data, "inside put api");
    return axios.put(AppProps.API_BASE_URL + AppProps.SENIOR_CITIZEN, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
}
export default new SeniorCitizenService()