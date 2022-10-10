import axios from "axios";
import AppProps from "../../../AppProps";

class SynchronizationModuleService {
  getDisabledModuleLastSynchronizedDate() {
    return axios.get(AppProps.API_BASE_URL + "/disabled/synchronized-date", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getDisabledModuleFromDateToDate(fromDate, toDate) {
    return axios.get(
      AppProps.API_BASE_URL + "/disabled/synchronized-date/" + fromDate + "/" + toDate,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  updateDisabledModuleFromDateToDate(fromDate, toDate) {
    return axios.put(
      AppProps.API_BASE_URL + "/disabled/update/synchronized-date/" + fromDate + "/" + toDate,
      null,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getChildCorrectionHomeSynchronizedDate() {
    return axios.get(AppProps.API_BASE_URL + "/child-correction-home/synchronized-date", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getChildCorrectionHomeFromDateToDate(fromDate, toDate) {
    return axios.get(
      AppProps.API_BASE_URL + "/child-correction-home/synchronized-date/" + fromDate + "/" + toDate,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  updateChildCorrectionHomeFromDateToDate(fromDate, toDate) {
    return axios.put(
      AppProps.API_BASE_URL +
        "/child-correction-home/update/synchronized-date/" +
        fromDate +
        "/" +
        toDate,
      null,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getChildHomeSynchronizedDate() {
    return axios.get(AppProps.API_BASE_URL + "/child-home/synchronized-date", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getChildHomeFromDateToDate(fromDate, toDate) {
    return axios.get(
      AppProps.API_BASE_URL + "/child-home/synchronized-date/" + fromDate + "/" + toDate,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  updateChildHomeFromDateToDate(fromDate, toDate) {
    return axios.put(
      AppProps.API_BASE_URL + "/child-home/update/synchronized-date/" + fromDate + "/" + toDate,
      null,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getChildrenSynchronizedDate() {
    return axios.get(AppProps.API_BASE_URL + "/children/synchronized-date", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getChildrenFromDateToDate(fromDate, toDate) {
    return axios.get(
      AppProps.API_BASE_URL + "/children/synchronized-date/" + fromDate + "/" + toDate,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  updateChildrenFromDateToDate(fromDate, toDate) {
    return axios.put(
      AppProps.API_BASE_URL + "/children/update/synchronized-date/" + fromDate + "/" + toDate,
      null,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getShelterHomeSynchronizedDate() {
    return axios.get(AppProps.API_BASE_URL + "/shelter-home/synchronized-date", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getSewaKendraSynchronizedDate() {
    return axios.get(AppProps.API_BASE_URL + "/sewa-kendra/synchronized-date", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getShelterHomeFromDateToDate(fromDate, toDate) {
    return axios.get(
      AppProps.API_BASE_URL + "/shelter-home/synchronized-date/" + fromDate + "/" + toDate,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  
  getSewaKendraFromDateToDate(fromDate, toDate) {
    return axios.get(
      AppProps.API_BASE_URL + "/sewa-kendra/synchronized-date/" + fromDate + "/" + toDate,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }


  updateShelterHomeFromDateToDate(fromDate, toDate) {
    return axios.put(
      AppProps.API_BASE_URL + "/shelter-home/update/synchronized-date/" + fromDate + "/" + toDate,
      null,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }


  updateSewaKendraFromDateToDate(fromDate, toDate) {
    return axios.put(
      AppProps.API_BASE_URL + "/sewa-kendra/update/synchronized-date/" + fromDate + "/" + toDate,
      null,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getComplaintRegistrationSynchronizedDate() {
    return axios.get(AppProps.API_BASE_URL + "/complaint-registration/synchronized-date", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getComplaintRegistrationFromDateToDate(fromDate, toDate) {
    return axios.get(
      AppProps.API_BASE_URL +
        "/complaint-registration/synchronized-date/" +
        fromDate +
        "/" +
        toDate,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  updateComplaintRegistrationFromDateToDate(fromDate, toDate) {
    return axios.put(
      AppProps.API_BASE_URL +
        "/complaint-registration/update/synchronized-date/" +
        fromDate +
        "/" +
        toDate,
      null,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getLabourMigrationCaseFormSynchronizedDate() {
    return axios.get(AppProps.API_BASE_URL + "/labour-migration/case-form/synchronized-date", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getLabourMigrationCaseFormFromDateToDate(fromDate, toDate) {
    return axios.get(
      AppProps.API_BASE_URL +
        "/labour-migration/case-form/synchronized-date/" +
        fromDate +
        "/" +
        toDate,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  updateLabourMigrationCaseFormFromDateToDate(fromDate, toDate) {
    return axios.put(
      AppProps.API_BASE_URL +
        "/labour-migration/case-form/update/synchronized-date/" +
        fromDate +
        "/" +
        toDate,
      null,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getLabourMigrationIndicatorSynchronizedDate() {
    return axios.get(AppProps.API_BASE_URL + "/labour-migration/indicator/synchronized-date", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getLabourMigrationIndicatorFromDateToDate(fromDate, toDate) {
    return axios.get(
      AppProps.API_BASE_URL +
        "/labour-migration/indicator/synchronized-date/" +
        fromDate +
        "/" +
        toDate,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  updateLabourMigrationIndicatorFromDateToDate(fromDate, toDate) {
    return axios.put(
      AppProps.API_BASE_URL +
        "/labour-migration/indicator/update/synchronized-date/" +
        fromDate +
        "/" +
        toDate,
      null,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }
  getOldAgeHomeSynchronizedDate() {
    return axios.get(AppProps.API_BASE_URL + "/old-age-home/synchronized-date", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getOldAgeHomeFromDateToDate(fromDate, toDate) {
    return axios.get(
      AppProps.API_BASE_URL + "/old-age-home/synchronized-date/" + fromDate + "/" + toDate,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  updateOldAgeHomeFromDateToDate(fromDate, toDate) {
    return axios.put(
      AppProps.API_BASE_URL + "/old-age-home/update/synchronized-date/" + fromDate + "/" + toDate,
      null,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getSeniorCitizenSynchronizedDate() {
    return axios.get(AppProps.API_BASE_URL + "/senior-citizen/synchronized-date", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getSeniorCitizenFromDateToDate(fromDate, toDate) {
    return axios.get(
      AppProps.API_BASE_URL + "/senior-citizen/synchronized-date/" + fromDate + "/" + toDate,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  updateSeniorCitizenFromDateToDate(fromDate, toDate) {
    return axios.put(
      AppProps.API_BASE_URL + "/senior-citizen/update/synchronized-date/" + fromDate + "/" + toDate,
      null,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getWomenAndMinoritiesSynchronizedDate() {
    return axios.get(AppProps.API_BASE_URL + "/women-and-minorities/synchronized-date", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getWomenAndMinoritiesFromDateToDate(fromDate, toDate) {
    return axios.get(
      AppProps.API_BASE_URL + "/women-and-minorities/synchronized-date/" + fromDate + "/" + toDate,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  updateWomenAndMinoritiesFromDateToDate(fromDate, toDate) {
    return axios.put(
      AppProps.API_BASE_URL +
        "/women-and-minorities/update/synchronized-date/" +
        fromDate +
        "/" +
        toDate,
      null,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }
}

export default new SynchronizationModuleService();
