import React, { useState, useEffect } from "react";

import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import AddressService from "../../security/api/services/AddressService";
import i18n from "../../il8n/il8n";
import { LANGUAGE, USER_LEVEL } from "../constants/ITMISConstansts";
import OrganizationService from "../../security/api/services/OrganizationService";
import UserService from "../../security/api/services/UserService";

const LocalProvinceDistrict = (props) => {
  const { t } = useTranslation();
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [localLevelList, setLocalLevelList] = useState([]);

  useEffect(() => {
    AddressService.getAllProvinces().then((response) => {
      setProvinceList(response.data.data);
    });
    let organizationAddress = {};
    OrganizationService.getLoggedInUserOrganizaitonDetails().then((response) => {
      console.log("response.data.data.name", response.data);
      organizationAddress = response.data.data.organizationAddress;
      UserService.getUserLevel().then((response) => {
        if (response.data.data == USER_LEVEL.LOCAL_LEVEL || response.data.data == USER_LEVEL.LOCAL_LEVEL_VERIFIER ) {
          // AddressService.getAllProvinces().then((response) => {
          //   setProvincesList(response.data.data);
          // });
          getDistrictValue(organizationAddress.province);
          getMunicipalitiesList(organizationAddress.district);
          props.handleProvinceState(parseInt(organizationAddress.province));
          props.handleDistrictState(parseInt(organizationAddress.district));
          props.handleLocalLevelState(parseInt(organizationAddress.municipality));
        }
      });
    });
  }, []);

  const handleProvince = (e) => {
    console.log("content  ", e.value);
    props.handleProvinceState(e.value);
    getDistrictValue(e.value);
  };

  const getDistrictValue = (provinceId) => {
    AddressService.getAllDistrictsByProvinceId(provinceId).then((response) => {
      setDistrictList(response.data.data);
    });
  };

  const handleDistrict = (e) => {
    console.log("content  ", e.value);
    props.handleDistrictState(e.value);
    getMunicipalitiesList(e.value);
  };

  const getMunicipalitiesList = (districtId) => {
    AddressService.getAllMunicipalitiessByDistrictId(districtId).then((response) => {
      setLocalLevelList(response.data.data);
    });
  };

  const handleLocalLevel = (e) => {
    console.log("content  ", e.value);
    props.handleLocalLevelState(e.value);
  };

  return (
    <>
      <div
        class="p-field p-col-12 p-md-12"
        style={{
          justifyContent: "center",
        }}
      >
        <div className="p-field p-col-12 p-md-3 float-left main-label">
          {t("province")}
        </div>
        <div className="p-field p-col-12 p-md-3 float-left">
          <Dropdown
            value={props.provinceValue}
            options={provinceList}
            optionLabel={i18n.language == LANGUAGE.ENGLISH ? "provinceDescEng" : "provinceDescNep"}
            optionValue="id"
            onChange={handleProvince}
            placeholder={t("select")}
          />
        </div>
        <div className="p-field p-col-12 p-md-3 float-left main-label">
          {t("district")}
        </div>
        <div className="p-field p-col-12 p-md-3 float-left">
          <Dropdown
            value={props.districtValue}
            options={districtList}
            optionLabel={i18n.language == LANGUAGE.ENGLISH ? "districtDescEng" : "districtDescNep"}
            optionValue="id"
            onChange={handleDistrict}
            placeholder={t("select")}
          />
        </div>
        <div className="p-field p-col-12 p-md-3 float-left main-label">
          {t("localLevel")}
        </div>
        <div className="p-field p-col-12 p-md-3 float-left">
          <Dropdown
            value={props.localLevelValue}
            options={localLevelList}
            optionLabel={i18n.language == LANGUAGE.ENGLISH ? "municipalityDescEng" : "municipalityDescNep"}
            optionValue="id"
            onChange={handleLocalLevel}
            placeholder={t("select")}
          />
        </div>
      </div>
    </>
  );
};
export default LocalProvinceDistrict;
