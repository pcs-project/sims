import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import AddressService from "../../security/api/services/AddressService";
import i18n from "../../il8n/il8n";
import { LANGUAGE } from "../constants/ITMISConstansts";

const Address = (props) => {
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
    if (props.getValues("province")) {
      getDistrictValue(props.getValues("province"));
      getMunicipalitiesList(props.getValues("district"));
      props.setValue("province", parseInt(props.getValues("province")));
      props.setValue("district", parseInt(props.getValues("district")));
      props.setValue("municipality", parseInt(props.getValues("municipality")));
      props.setValue("wardNo", parseInt(props.getValues("wardNo")));
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
    <div className="p-field p-col-12 p-md-12 ">
      <div className="p-field p-col-12 p-md-12 float-left main-label">{t("address")}<span style={{ color: "#d00000"}}> * </span></div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="province"
          placeholder={t("province")}
          {...props.register("province", {
            required: "Province is Required",
          })}
          value={props.getValues("province")}
          options={provincesList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "provinceDescEng" : "provinceDescNep"}
          optionValue="id"
          onChange={(e) => {
            props.setValue("province", e.value);
            getDistrictValue(e.value);
          }}
        />
        {props.error.province && props.error.province.type === "required" && (
          <small className="p-error">{props.error.province.message}</small>
        )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="district"
          value={props.getValues("district")}
          placeholder={t("district")}
          {...props.register("district", {
            required: "District is Required",
          })}
          onChange={(e) => {
            props.setValue("district", e.value);
            getMunicipalitiesList(e.value);
          }}
          options={districtsList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "districtDescEng" : "districtDescNep"}
          optionValue="id"
        />
        {props.error.district && props.error.district.type === "required" && (
          <small className="p-error">{props.error.district.message}</small>
        )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="municipality"
          value={props.getValues("municipality")}
          placeholder={t("municipality")}
          {...props.register("municipality", {
            required: "Municipality is Required",
          })}
          onChange={(e) => {
            props.setValue("municipality", e.value);
            getTotalWard(e.value);
            setAddressValue(e.value);
          }}
          options={municipalitiesList}
          optionLabel={
            i18n.language == LANGUAGE.ENGLISH ? "municipalityDescEng" : "municipalityDescNep"
          }
          optionValue="id"
        />
        {props.error.municipality && props.error.municipality.type === "required" && (
          <small className="p-error">{props.error.municipality.message}</small>
        )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="wardNo"
          value={props.getValues("wardNo")}
          placeholder={t("wardNo")}
          {...props.register("wardNo", {
            required: "Ward No is Required",
          })}
          onChange={(e) => {
            props.setValue("wardNo", e.value);
            setAddressValue(e.value);
          }}
          options={wardList}
          optionLabel="wardId"
          optionValue="wardId"
        />
        {props.error.wardNo && props.error.wardNo.type === "required" && (
          <small className="p-error">{props.error.wardNo.message}</small>
        )}
      </div>
    </div>
  );
};
export default Address;
