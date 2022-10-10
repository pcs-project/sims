import React, { useState, useRef, useEffect } from "react";

import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import AddressService from "../../security/api/services/AddressService";
import i18n from "../../il8n/il8n";
import { LANGUAGE } from "../constants/ITMISConstansts";

const HomeAddress = (props) => {
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
    if (props.getValues("homeProvince")) {
      getDistrictValue(props.getValues("homeProvince"));
      getMunicipalitiesList(props.getValues("homeDistrict"));
      props.setValue("homeProvince", parseInt(props.getValues("homeProvince")));
      props.setValue("homeDistrict", parseInt(props.getValues("homeDistrict")));
      props.setValue("homeMunicipality", parseInt(props.getValues("homeMunicipality")));
      props.setValue("homeWardNo", parseInt(props.getValues("homeWardNo")));
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
      <div className="p-field p-col-12 p-md-12 float-left main-label">{t("address")}</div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="homeProvince"
          placeholder={t("province")}
          {...props.register("homeProvince"
        //   , {
        //     required: "Province is Required",
        //   }
          )}
          value={props.getValues("homeProvince")}
          options={provincesList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "provinceDescEng" : "provinceDescNep"}
          optionValue="id"
          onChange={(e) => {
            props.setValue("homeProvince", e.value);
            getDistrictValue(e.value);
          }}
        />
        {props.error.homeProvince && props.error.homeProvince.type === "required" && (
          <small className="p-error">{props.error.homeProvince.message}</small>
        )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="homeDistrict"
          value={props.getValues("homeDistrict")}
          placeholder={t("district")}
          {...props.register("homeDistrict"
        //   , {
        //     required: "District is Required",
        //   }
          )}
          onChange={(e) => {
            props.setValue("homeDistrict", e.value);
            getMunicipalitiesList(e.value);
          }}
          options={districtsList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "districtDescEng" : "districtDescNep"}
          optionValue="id"
        />
        {props.error.homeDistrict && props.error.homeDistrict.type === "required" && (
          <small className="p-error">{props.error.homeDistrict.message}</small>
        )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="homeMunicipality"
          value={props.getValues("homeMunicipality")}
          placeholder={t("municipality")}
          {...props.register("homeMunicipality"
        //   , {
        //     required: "Municipality is Required",
        //   }
          )}
          onChange={(e) => {
            props.setValue("homeMunicipality", e.value);
            getTotalWard(e.value);
            setAddressValue(e.value);
          }}
          options={municipalitiesList}
          optionLabel={i18n.language == LANGUAGE.ENGLISH ? "municipalityDescEng" : "municipalityDescNep"}
          optionValue="id"
        />
        {props.error.homeMunicipality && props.error.homeMunicipality.type === "required" && (
          <small className="p-error">{props.error.homeMunicipality.message}</small>
        )}
      </div>
      <div className="p-field p-col-12 p-md-3 float-left">
        <Dropdown
          name="homeWardNo"
          value={props.getValues("homeWardNo")}
          placeholder={t("wardNo")}
          {...props.register("homeWardNo"
        //   , {
        //     required: "Ward No is Required",
        //   }
          )}
          onChange={(e) => {
            props.setValue("homeWardNo", e.value);
            setAddressValue(e.value);
          }}
          options={wardList}
          optionLabel="wardId"
          optionValue="wardId"
        />
        {props.error.homeWardNo && props.error.homeWardNo.type === "required" && (
          <small className="p-error">{props.error.homeWardNo.message}</small>
        )}
      </div>
    </div>
    </div>
  );
};
export default HomeAddress;
