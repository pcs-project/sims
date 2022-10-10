import axios from "axios";
import AppProps from "../../../AppProps";
class IdcardReportService {

    getIdCardProvinceData() {
        console.log("called here");
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_ID_CARD + "province-wise",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getIdCardDistrictData(provinceId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_ID_CARD + "district-wise/" + provinceId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getIdCardLocalWiseData(districtId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_ID_CARD + "municipality-wise/" + districtId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }
}
export default new IdcardReportService();