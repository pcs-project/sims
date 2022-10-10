import axios from 'axios';
import AppProps from '../../../AppProps';
class SewaKendraService{

    getListByFiscalYearAndQuarter(fiscalYear, quarter){
      return  axios.get(AppProps.API_BASE_URL + AppProps.SEWA_KENDRA + fiscalYear + '/' + quarter, {
       headers: {
         Authorization: "Bearer " + sessionStorage.getItem("token"),
       },
     });
   }

   getListByOrganization(fiscalYear, quarter, organizationId) {
    return axios.get(AppProps.API_BASE_URL + AppProps.SEWA_KENDRA + fiscalYear + '/' + quarter + '/' + organizationId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

    saveData(data) {
        console.log(data, "inside post api");
        return axios.post(AppProps.API_BASE_URL + AppProps.SEWA_KENDRA, data, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        });
    }

    updateData(data) {
        console.log(data, "inside put api");
        return axios.put(AppProps.API_BASE_URL + AppProps.SEWA_KENDRA, data, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        });
    }
}
export default new SewaKendraService()