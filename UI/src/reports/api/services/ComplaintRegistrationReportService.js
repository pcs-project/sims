import axios from "axios";
import AppProps from "../../../AppProps";
class ComplaintRegistrationReportService {
    getCumulativeData(fiscalYear) {
        console.log("called here");
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_COMPLAINT_REGISTRATION + "cumulative",
            {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            }
        );
    }

    getComplaintRegProvinceData(fiscalYear) {
        console.log("called here");
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_COMPLAINT_REGISTRATION + "province-wise",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getComplaintRegDistrictData(provinceId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_COMPLAINT_REGISTRATION + "district-wise/" + provinceId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getComplaintRegLocalWiseData(districtId) {
        console.log("called getComplaintRegLocalWiseData");
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_COMPLAINT_REGISTRATION + "municipality-wise/" + districtId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }
}
export default new ComplaintRegistrationReportService();