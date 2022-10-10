import axios from "axios";
import AppProps from "../../../AppProps";
class ReportService {
    getChildrenCumulativeData(fiscalYear) {
        console.log("called here");
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_CHILDREN + "cumulative",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getChildrenProvinceData(fiscalYear) {
        console.log("called here");
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_CHILDREN + "province-wise",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getChildrenDistrictData(provinceId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_CHILDREN + "district-wise/" + provinceId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getChildrenLocalWiseData(districtId) {
        console.log("called getChildrenLocalWiseData");
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_CHILDREN + "municipality-wise/" + districtId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }
    getWomenCumulativeData(fiscalYear) {
        console.log("called here");
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_WOMEN + "cumulative",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }
    getWomenProvinceData(fiscalYear) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_WOMEN + "province-wise",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getWomenDistrictData(provinceId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_WOMEN + "district-wise/" + provinceId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getWomenLocalWiseData(districtId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_WOMEN + "municipality-wise/" + districtId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }
    getDisabledCumulativeData(fiscalYear) {
        console.log("called here");
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_DISABLED + "cumulative",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }
    getDisabledProvinceData(fiscalYear) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_DISABLED + "province-wise",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getDisabledDistrictData(provinceId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_DISABLED + "district-wise/" + provinceId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getDisabledLocalWiseData(districtId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_DISABLED + "municipality-wise/" + districtId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getSeniorCitizenCumulativeData(fiscalYear) {
        console.log("called here");
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_SENIOR_CITIZEN + "cumulative",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getSeniorCitizenProvinceData(fiscalYear) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_SENIOR_CITIZEN + "province-wise",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getSeniorCitizenDistrictData(provinceId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_SENIOR_CITIZEN + "district-wise/" + provinceId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getSeniorCitizenLocalWiseData(districtId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_SENIOR_CITIZEN + "municipality-wise/" + districtId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getShelterHomeCumulativeData(fiscalYear) {
        console.log("called here");
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_SHELTER_HOME + "cumulative",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getShelterHomeProvinceData(fiscalYear) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_SHELTER_HOME + "province-wise",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getShelterHomeDistrictData(provinceId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_SHELTER_HOME + "district-wise/" + provinceId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getShelterHomeLocalWiseData(districtId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_SHELTER_HOME + "municipality-wise/" + districtId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getLabourMigrationCumulativeData(fiscalYear) {
        console.log("called here");
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_LABOUR_MIGRATION + "cumulative",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getLabourMigrationProvinceData(fiscalYear) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_LABOUR_MIGRATION + "province-wise",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getLabourMigrationDistrictData(provinceId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_LABOUR_MIGRATION + "district-wise/" + provinceId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getLabourMigrationLocalWiseData(districtId) {
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_LABOUR_MIGRATION + "municipality-wise/" + districtId,
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

    getComplaintRegistrationCumulativeData(fiscalYear) {
        console.log("called here");
        return axios.get(
            AppProps.API_BASE_URL + AppProps.REPORT_COMPLAINT_REGISTRATION + "cumulative",
            {
                // headers: {
                //     Authorization: "Bearer " + sessionStorage.getItem("token"),
                // },
            }
        );
    }

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
}
export default new ReportService();
