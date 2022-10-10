import axios from "axios";
import AppProps from "../../../AppProps";
class IndicatorReportService {
  getWomenAndMinoritiesData(data) {
    console.log("called here");
    return axios.post(
      AppProps.API_BASE_URL +
      AppProps.REPORT_WOMEN + "indicator", data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getChildrenAndAdolescentData(data) {
    console.log("called here");
    return axios.post(
      AppProps.API_BASE_URL +
      AppProps.REPORT_CHILDREN + "indicator", data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getDisabledData(data) {
    console.log("called here");
    return axios.post(
      AppProps.API_BASE_URL +
      AppProps.REPORT_DISABLED + "indicator", data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getSeniorCitizenData(data) {
    console.log("called here");
    return axios.post(
      AppProps.API_BASE_URL +
      AppProps.REPORT_SENIOR_CITIZEN + "indicator", data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getChildHomeData(data) {
    console.log("called here");
    return axios.post(
      AppProps.API_BASE_URL +
      AppProps.REPORT_CHILD_HOME + "indicator", data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getChildCorrectionHomeData(data) {
    console.log("called here");
    return axios.post(
      AppProps.API_BASE_URL +
      AppProps.REPORT_CHILD_CORRECTION_HOME + "indicator", data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getOldAgeHomeData(data) {
    console.log("called here");
    return axios.post(
      AppProps.API_BASE_URL +
      AppProps.REPORT_OLD_AGE_HOME + "indicator", data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }
  
  getShelterHomeData(data) {
    console.log("called here");
    return axios.post(
      AppProps.API_BASE_URL +
      AppProps.REPORT_SHELTER_HOME + "indicator", data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getSewaKendraData(data) {
    console.log("called here");
    return axios.post(
      AppProps.API_BASE_URL +
      AppProps.REPORT_SEWA_KENDRA + "indicator", data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getLabourMigrationData(data) {
    console.log("called here");
    return axios.post(
      AppProps.API_BASE_URL +
      AppProps.REPORT_LABOUR_MIGRATION + "indicator", data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getComplaintRegistrationData(data) {
    console.log("called here");
    return axios.post(
      AppProps.API_BASE_URL +
      AppProps.REPORT_COMPLAINT_REGISTRATION + "indicator", data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }
}

export default new IndicatorReportService();
