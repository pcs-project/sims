import axios from "axios";
import AppProps from "../../../AppProps";
class ConsolidatedReportService {
    getGenderWiseReport(data) {
        console.log("called getGenderWiseReport");
        return axios.post(
            AppProps.API_BASE_URL + AppProps.REPORT_CONSOLIDATED + "gender-wise", data,
            {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            }
        );
    }

    getTotalReport(data) {
        return axios.post(
            AppProps.API_BASE_URL + AppProps.REPORT_CONSOLIDATED + "total", data,
            {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
            }
        );
    }
}
export default new ConsolidatedReportService();