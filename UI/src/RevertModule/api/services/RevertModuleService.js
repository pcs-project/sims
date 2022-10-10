import axios from "axios";
import AppProps from "../../../AppProps";
class RevertModuleService {
  //Api to revert women and minorities data
  revertWomenAndMinorites(data) {
    console.log(data, "inside put api");
    return axios.put(
      AppProps.API_BASE_URL + AppProps.WOMEN_AND_MINORITIES + "revert",
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  //Api to revert children data
  revertChildrenData(data) {
    console.log(data, "inside put api");
    return axios.put(
      AppProps.API_BASE_URL + AppProps.CHILDREN + "revert",
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  revertDisabledData(data) {
    console.log(data, "inside put api");
    return axios.put(
      AppProps.API_BASE_URL + AppProps.DISABLED + "revert",
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  revertSeniorCitizenData(data) {
    console.log(data, "inside put api");
    return axios.put(
      AppProps.API_BASE_URL + AppProps.SENIOR_CITIZEN + "revert",
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  revertShelterHomeData(data) {
    console.log(data, "inside put api");
    return axios.put(
      AppProps.API_BASE_URL + AppProps.SHELTER_HOME + "revert",
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  revertSewaKendraData(data) {
    console.log(data, "inside put api");
    return axios.put(
      AppProps.API_BASE_URL + AppProps.SEWA_KENDRA + "revert",
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  revertChildHomeData(data) {
    console.log(data, "inside put api");
    return axios.put(
      AppProps.API_BASE_URL + AppProps.CHILD_HOME + "revert",
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  
  revertChildCorrectionHomeData(data) {
    console.log(data, "inside put api");
    return axios.put(
      AppProps.API_BASE_URL + AppProps.CHILD_CORRECTON_HOME + "revert",
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  
  revertOldAgeHomeData(data) {
    console.log(data, "inside put api");
    return axios.put(
      AppProps.API_BASE_URL + AppProps.OLD_AGE_HOME + "revert",
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  
  revertLabourMigrationData(data) {
    console.log(data, "inside put api");
    return axios.put(
      AppProps.API_BASE_URL + AppProps.LABOUR_MIGRATION + "indicator/revert",
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  
  revertComplaintRegistrationData(data) {
    console.log(data, "inside put api");
    return axios.put(
      AppProps.API_BASE_URL + AppProps.COMPLAINT_REGISTRATION + "revert",
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }
}
export default new RevertModuleService();
