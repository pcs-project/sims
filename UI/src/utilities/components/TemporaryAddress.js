import React, { useState, useEffect } from "react";

import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import AddressService from "../../security/api/services/AddressService";
import i18n from "../../il8n/il8n";
import { LANGUAGE } from "../constants/ITMISConstansts";

const TemporaryAddress = (props) => {
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
    if (props.getValues("temporaryProvince")) {
      getDistrictValue(props.getValues("temporaryProvince"));
      getMunicipalitiesList(props.getValues("temporaryDistrict"));
      props.setValue("temporaryProvince", parseInt(props.getValues("temporaryProvince")));
      props.setValue("temporaryDistrict", parseInt(props.getValues("temporaryDistrict")));
      props.setValue("temporaryMunicipality", parseInt(props.getValues("temporaryMunicipality")));
      props.setValue("temporaryWardNo", parseInt(props.getValues("temporaryWardNo")));
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
  
  const [addressValue, setAddressValue] = useState();
  return (
    <div className="p-grid p-col-12 p-md-12 ">
    <div class="p-col-12 p-md-12">
      <div className="p-field p-col-12 p-md-12 float-left main-label">{t("tempAddress")}<span style={{ color: "#d00000"}}> * </span></div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="temporaryProvince"
          placeholder={t("province")}
          {...props.register("temporaryProvince"
          , {
            required: "Province is Required",
          }
          )}
          value={props.getValues("temporaryProvince")}
          options={provincesList}
          optionLabel={i18n.language === LANGUAGE.ENGLISH ? "provinceDescEng" : "provinceDescNep"}
          optionValue="id"
          onChange={(e) => {
            props.setValue("temporaryProvince", e.value);
            getDistrictValue(e.value);
          }}
        />
        {props.error.temporaryProvince && props.error.temporaryProvince.type === "required" && (
          <small className="p-error">{props.error.temporaryProvince.message}</small>
        )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="temporaryDistrict"
          value={props.getValues("temporaryDistrict")}
          placeholder={t("district")}
          {...props.register("temporaryDistrict"
          , {
            required: "District is Required",
          }
          )}
          onChange={(e) => {
            props.setValue("temporaryDistrict", e.value);
            getMunicipalitiesList(e.value);
          }}
          options={districtsList}
          optionLabel={i18n.language === LANGUAGE.ENGLISH ? "districtDescEng" : "districtDescNep"}
          optionValue="id"
        />
        {props.error.temporaryDistrict && props.error.temporaryDistrict.type === "required" && (
          <small className="p-error">{props.error.temporaryDistrict.message}</small>
        )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="temporaryMunicipality"
          value={props.getValues("temporaryMunicipality")}
          placeholder={t("municipality")}
          {...props.register("temporaryMunicipality"
          , {
            required: "Municipality is Required",
          }
          )}
          onChange={(e) => {
            props.setValue("temporaryMunicipality", e.value);
            getTotalWard(e.value);
            setAddressValue(e.value);
          }}
          options={municipalitiesList}
          optionLabel={i18n.language === LANGUAGE.ENGLISH ? "municipalityDescEng" : "municipalityDescNep"}
          optionValue="id"
        />
        {props.error.temporaryMunicipality && props.error.temporaryMunicipality.type === "required" && (
          <small className="p-error">{props.error.temporaryMunicipality.message}</small>
        )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="temporaryWardNo"
          value={props.getValues("temporaryWardNo")}
          placeholder={t("wardNo")}
          {...props.register("temporaryWardNo"
          , {
            required: "Ward No is Required",
          }
          )}
          onChange={(e) => {
            props.setValue("temporaryWardNo", e.value);
            setAddressValue(e.value);
          }}
          options={wardList}
          optionLabel="wardId"
          optionValue="wardId"
        />
        {props.error.temporaryWardNo && props.error.temporaryWardNo.type === "required" && (
          <small className="p-error">{props.error.temporaryWardNo.message}</small>
        )}
      </div>
    </div>
    </div>
  );
};
export default TemporaryAddress;
