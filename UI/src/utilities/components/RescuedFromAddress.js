import React, { useState, useRef, useEffect } from "react";

import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import AddressService from "../../security/api/services/AddressService";
import i18n from "../../il8n/il8n";
import { LANGUAGE } from "../constants/ITMISConstansts";

const RescuedFromAddress = (props) => {
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
    if (props.getValues("rescuedFromProvince")) {
      getDistrictValue(props.getValues("rescuedFromProvince"));
      getMunicipalitiesList(props.getValues("rescuedFromDistrict"));
      props.setValue("rescuedFromProvince", parseInt(props.getValues("rescuedFromProvince")));
      props.setValue("rescuedFromDistrict", parseInt(props.getValues("rescuedFromDistrict")));
      props.setValue("rescuedFromMunicipality", parseInt(props.getValues("rescuedFromMunicipality")));
      props.setValue("rescuedFromWardNo", parseInt(props.getValues("rescuedFromWardNo")));
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
      <div className="p-field p-col-12 p-md-12 float-left main-label">{t("address")}</div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="rescuedFromProvince"
          placeholder={t("province")}
          {...props.register("rescuedFromProvince"
        //   , {
        //     required: "Province is Required",
        //   }
          )}
          value={props.getValues("rescuedFromProvince")}
          options={provincesList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "provinceDescEng" : "provinceDescNep"}
          optionValue="id"
          onChange={(e) => {
            props.setValue("rescuedFromProvince", e.value);
            getDistrictValue(e.value);
          }}
        />
        {props.error.rescuedFromProvince && props.error.rescuedFromProvince.type === "required" && (
          <small className="p-error">{props.error.rescuedFromProvince.message}</small>
        )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="rescuedFromDistrict"
          value={props.getValues("rescuedFromDistrict")}
          placeholder={t("district")}
          {...props.register("rescuedFromDistrict"
        //   , {
        //     required: "District is Required",
        //   }
          )}
          onChange={(e) => {
            props.setValue("rescuedFromDistrict", e.value);
            getMunicipalitiesList(e.value);
          }}
          options={districtsList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "districtDescEng" : "districtDescNep"}
          optionValue="id"
        />
        {props.error.rescuedFromDistrict && props.error.rescuedFromDistrict.type === "required" && (
          <small className="p-error">{props.error.rescuedFromDistrict.message}</small>
        )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="rescuedFromMunicipality"
          value={props.getValues("rescuedFromMunicipality")}
          placeholder={t("municipality")}
          {...props.register("rescuedFromMunicipality"
        //   , {
        //     required: "Municipality is Required",
        //   }
          )}
          onChange={(e) => {
            props.setValue("rescuedFromMunicipality", e.value);
            getTotalWard(e.value);
            setAddressValue(e.value);
          }}
          options={municipalitiesList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "municipalityDescEng" : "municipalityDescNep"}
          optionValue="id"
        />
        {props.error.rescuedFromMunicipality && props.error.rescuedFromMunicipality.type === "required" && (
          <small className="p-error">{props.error.rescuedFromMunicipality.message}</small>
        )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="rescuedFromWardNo"
          value={props.getValues("rescuedFromWardNo")}
          placeholder={t("wardNo")}
          {...props.register("rescuedFromWardNo"
        //   , {
        //     required: "Ward No is Required",
        //   }
          )}
          onChange={(e) => {
            props.setValue("rescuedFromWardNo", e.value);
            setAddressValue(e.value);
          }}
          options={wardList}
          optionLabel="wardId"
          optionValue="wardId"
        />
        {props.error.rescuedFromWardNo && props.error.rescuedFromWardNo.type === "required" && (
          <small className="p-error">{props.error.rescuedFromWardNo.message}</small>
        )}
      </div>
    </div>
  );
};
export default RescuedFromAddress;
