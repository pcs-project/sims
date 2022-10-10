import AppProps from "../../../AppProps";
import axios from "axios";
class AddressService {
  getAllProvinces() {
    return axios.get(AppProps.API_BASE_URL + "/lookup/address/provinces/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getAllDistrictsByProvinceId(provinceId) {
    return axios.get(AppProps.API_BASE_URL + "/lookup/address/districts/" + provinceId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
  getAllMunicipalitiessByDistrictId(districtId) {
    return axios.get(AppProps.API_BASE_URL + "/lookup/address/municipalities/" + districtId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getProvinceByProvinceId(provinceId) {
    return axios.get(AppProps.API_BASE_URL + "/lookup/address/province/" + provinceId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }
  getDistrictbyProvinceCdAndDistrictCd(provinceId, districtId) {
    console.log("Inside getAllMunicipalitiessByDistrictId method AddressService");
    return axios.get(
      AppProps.API_BASE_URL + "/lookup/address/districts/" + provinceId + "/" + districtId,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getFullAddressEng(provinceId, districtId, municipality, ward) {
    console.log("Inside getFullAddress method AddressService");
    return axios.get(
      AppProps.API_BASE_URL +
        "/lookup/address/full-address-eng/" +
        provinceId +
        "/" +
        districtId +
        "/" +
        municipality +
        "/" +
        ward,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }

  getAllDistrict() {
    console.log("Inside getAllDistrict method AddressService");
    return axios.get(AppProps.API_BASE_URL + "/lookup/address/districts/", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getTotalWard(municipalityId) {
    console.log("Inside getTotalWard method AddressService");
    return axios.get(AppProps.API_BASE_URL + "/lookup/address/wards/" + municipalityId, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  }

  getFullAddressNep(provinceId, districtId, municipality, ward) {
    console.log("Inside getFullAddress method AddressService");
    return axios.get(
      AppProps.API_BASE_URL +
        "/lookup/address/full-address-nep/" +
        provinceId +
        "/" +
        districtId +
        "/" +
        municipality +
        "/" +
        ward,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
  }
}
export default new AddressService();
