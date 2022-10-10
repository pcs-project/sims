import React, { useState, useRef, useEffect } from "react";

import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import AddressService from "../../security/api/services/AddressService";
import i18n from "../../il8n/il8n";
import { LANGUAGE } from "../constants/ITMISConstansts";

const PermanentAddress = (props) => {
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
    if (props.getValues("permanentProvince")) {
      getDistrictValue(props.getValues("permanentProvince"));
      getMunicipalitiesList(props.getValues("permanentDistrict"));
      props.setValue("permanentProvince", parseInt(props.getValues("permanentProvince")));
      props.setValue("permanentDistrict", parseInt(props.getValues("permanentDistrict")));
      props.setValue("permanentMunicipality", parseInt(props.getValues("permanentMunicipality")));
      props.setValue("permanentWardNo", parseInt(props.getValues("permanentWardNo")));
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
  const [municipalityVal, setMunicipalityVal] = useState();
  const [addressValue, setAddressValue] = useState();
  return (
    <div className="p-grid p-col-12 p-md-12 ">
    <div class="p-col-12 p-md-12">
      <div className="p-field p-col-12 p-md-12 float-left main-label">{t("permanentAddress")}<span style={{ color: "#d00000"}}> * </span></div>
      <div className="p-field p-col-3 p-md-3 float-left">
        <Dropdown
          name="permanentProvince"
          placeholder={t("province")}
          {...props.register("permanentProvince"
          , {
            required: "Province is Required",
          }
          )}
          value={props.getValues("permanentProvince")}
          options={provincesList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "provinceDescEng" : "provinceDescNep"}
          optionValue="id"
          onChange={(e) => {
            props.setValue("permanentProvince", e.value);
            getDistrictValue(e.value);
          }}
        />
        {props.error.permanentProvince && props.error.permanentProvince.type === "required" && (
          <small className="p-error">{props.error.permanentProvince.message}</small>
        )}
      </div>
      <div className="p-field p-col-3 p-md-3 float-left">
        <Dropdown
          name="permanentDistrict"
          value={props.getValues("permanentDistrict")}
          placeholder={t("district")}
          {...props.register("permanentDistrict"
          , {
            required: "District is Required",
          }
          )}
          onChange={(e) => {
            props.setValue("permanentDistrict", e.value);
            getMunicipalitiesList(e.value);
          }}
          options={districtsList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "districtDescEng" : "districtDescNep"}
          optionValue="id"
        />
        {props.error.permanentDistrict && props.error.permanentDistrict.type === "required" && (
          <small className="p-error">{props.error.permanentDistrict.message}</small>
        )}
      </div>
      <div className="p-field p-col-3 p-md-3 float-left">
        <Dropdown
          name="permanentMunicipality"
          value={props.getValues("permanentMunicipality")}
          placeholder={t("municipality")}
          {...props.register("permanentMunicipality"
          , {
            required: "Municipality is Required",
          }
          )}
          onChange={(e) => {
            props.setValue("permanentMunicipality", e.value);
            getTotalWard(e.value);
            setAddressValue(e.value);
          }}
          options={municipalitiesList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "municipalityDescEng" : "municipalityDescNep"}
          optionValue="id"
        />
        {props.error.permanentMunicipality && props.error.permanentMunicipality.type === "required" && (
          <small className="p-error">{props.error.permanentMunicipality.message}</small>
        )}
      </div>
      <div className="p-field p-col-3 p-md-3 float-left">
        <Dropdown
          name="permanentWardNo"
          value={props.getValues("permanentWardNo")}
          placeholder={t("wardNo")}
          {...props.register("permanentWardNo"
          , {
            required: "Ward No is Required",
          }
          )}
          onChange={(e) => {
            props.setValue("permanentWardNo", e.value);
            setAddressValue(e.value);
          }}
          options={wardList}
          optionLabel="wardId"
          optionValue="wardId"
        />
        {props.error.permanentWardNo && props.error.permanentWardNo.type === "required" && (
          <small className="p-error">{props.error.permanentWardNo.message}</small>
        )}
      </div>
    </div>
    </div>
  );
};
export default PermanentAddress;
