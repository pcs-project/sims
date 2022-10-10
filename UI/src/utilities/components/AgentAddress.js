import React, { useState, useRef, useEffect } from "react";

import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import AddressService from "../../security/api/services/AddressService";
import i18n from "../../il8n/il8n";
import { LANGUAGE } from "../constants/ITMISConstansts";

const AgentAddress = (props) => {
  const [provincesList, setProvincesList] = useState([]);
  const [districtsList, setDistrictList] = useState([]);
  const [municipalitiesList, setMunicipalitiesList] = useState([]);
  const [wardList, setWardList] = useState([
    { wardId: 1 },
    { wardId: 2 },
    { wardId: 3 },
    { wardId: 4 },
    { wardId: 5 },
  ]);
  const { t } = useTranslation();
  useEffect(() => {
    if (props.getValues("agentDetails.recAgencyProvince")) {
      getDistrictValue(props.getValues("agentDetails.recAgencyProvince"));
      getMunicipalitiesList(props.getValues("agentDetails.recAgencyDistrict"));
      props.setValue(
        "agentDetails.recAgencyProvince",
        parseInt(props.getValues("agentDetails.recAgencyProvince"))
      );
      props.setValue(
        "agentDetails.recAgencyDistrict",
        parseInt(props.getValues("agentDetails.recAgencyDistrict"))
      );
      props.setValue(
        "agentDetails.recAgencyMunicipality",
        parseInt(props.getValues("agentDetails.recAgencyMunicipality"))
      );
      props.setValue(
        "agentDetails.recAgencyWardNo",
        parseInt(props.getValues("agentDetails.recAgencyWardNo"))
      );
    }
    AddressService.getAllProvinces().then((response) => {
      setProvincesList(response.data.data);
    });
  }, [props]);

  const getDistrictValue = (provinceId) => {
    AddressService.getAllDistrictsByProvinceId(provinceId).then((response) => {
      setDistrictList(response.data.data);
    });
  };

  const getMunicipalitiesList = (districtId) => {
    AddressService.getAllMunicipalitiessByDistrictId(districtId).then((response) => {
      setMunicipalitiesList(response.data.data);
    });
  };
  const [addressValue, setAddressValue] = useState();
  const getTotalWard = (municipalityId) => {
    AddressService.getTotalWard(municipalityId).then((response) => {
      const totalWard = response.data.data;
      const list = [];
      for (var i = 1; i <= response.data.data; i++) {
        list.push({
          wardId: i,
        });
      }
      setWardList(list);
    });
  };
  return (
    <div className="p-field p-col-12 p-md-12 ">
      <div className="p-field p-col-12 p-md-12 float-left main-label">{t("address")}</div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="province"
          placeholder={t("province")}
          value={props.getValues("agentDetails.recAgencyProvince")}
          {...props.register("agentDetails.recAgencyProvince", {
           // required: "Province is Required",
          })}
          options={provincesList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "provinceDescEng" : "provinceDescNep"}
          optionValue="id"
          onChange={(e) => {
            props.setValue("agentDetails.recAgencyProvince", e.value);
            getDistrictValue(e.value);
          }}
        />

        {props.error.agentDetails &&
          props.error.agentDetails.recAgencyProvince &&
          props.error.agentDetails.recAgencyProvince.type === "required" && (
            <small className="p-error">{props.error.agentDetails.recAgencyProvince.message}</small>
          )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="district"
          value={props.getValues("agentDetails.recAgencyDistrict")}
          placeholder={t("district")}
          {...props.register("agentDetails.recAgencyDistrict", {
           // required: "District is Required",
          })}
          onChange={(e) => {
            props.setValue("agentDetails.recAgencyDistrict", e.value);
            getMunicipalitiesList(e.value);
          }}
          options={districtsList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "districtDescEng" : "districtDescNep"}
          optionValue="id"
        />
        {props.error.agentDetails &&
          props.error.agentDetails.recAgencyDistrict &&
          props.error.agentDetails.recAgencyDistrict.type === "required" && (
            <small className="p-error">{props.error.agentDetails.recAgencyDistrict.message}</small>
          )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="municipality"
          value={props.getValues("agentDetails.recAgencyMunicipality")}
          placeholder={t("municipality")}
          {...props.register("agentDetails.recAgencyMunicipality", {
          //  required: "Municipality is Required",
          })}
          onChange={(e) => {
            props.setValue("agentDetails.recAgencyMunicipality", e.value);
            setAddressValue(e.value);
            getTotalWard(e.value);
          }}
          options={municipalitiesList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "municipalityDescEng" : "municipalityDescNep"}
          optionValue="id"
        />
        {props.error.agentDetails &&
          props.error.agentDetails.recAgencyMunicipality &&
          props.error.agentDetails.recAgencyMunicipality.type === "required" && (
            <small className="p-error">
              {props.error.agentDetails.recAgencyMunicipality.message}
            </small>
          )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="wardNo"
          value={props.getValues("agentDetails.recAgencyWardNo")}
          placeholder={t("wardNo")}
          {...props.register("agentDetails.recAgencyWardNo", {
          //  required: "Ward No is Required",
          })}
          onChange={(e) => {
            props.setValue("agentDetails.recAgencyWardNo", e.value);
            setAddressValue(e.value);
          }}
          options={wardList}
          optionLabel="wardId"
          optionValue="wardId"
        />
        {props.error.agentDetails &&
          props.error.agentDetails.recAgencyWardNo &&
          props.error.agentDetails.recAgencyWardNo.type === "required" && (
            <small className="p-error">{props.error.agentDetails.recAgencyWardNo.message}</small>
          )}
      </div>
    </div>
  );
};
export default AgentAddress;
