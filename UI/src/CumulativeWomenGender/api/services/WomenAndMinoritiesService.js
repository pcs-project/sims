import axios from 'axios';
import AppProps from '../../../AppProps';
class WomenAndMinoritiesService {

  //Api to get women and minorities list of particular fiscal year
  getListByFiscalYear(fiscalYear) {
    return axios.get(AppProps.API_BASE_URL + AppProps.WOMEN_AND_MINORITIES + fiscalYear, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  //Api to get women and minorities list of particular fiscal year and quarter
  getListByFiscalYearAndQuarter(fiscalYear, quarter) {
    return axios.get(AppProps.API_BASE_URL + AppProps.WOMEN_AND_MINORITIES + fiscalYear + '/' + quarter, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  //Api to get women and minorities list of particular fiscal year, quarter and organization selected
  getListByOrganization(fiscalYear,quarter, organizationId) {
    return axios.get(AppProps.API_BASE_URL + AppProps.WOMEN_AND_MINORITIES + fiscalYear + '/' + quarter + '/' + organizationId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  //Api to save women and minorities details
  saveData(data) {
    console.log(data, "inside post api");
    return axios.post(AppProps.API_BASE_URL + AppProps.WOMEN_AND_MINORITIES, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  //Api to update women and minorities details
  updateData(data) {
    console.log(data, "inside put api");
    return axios.put(AppProps.API_BASE_URL + AppProps.WOMEN_AND_MINORITIES, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
}
export default new WomenAndMinoritiesService()