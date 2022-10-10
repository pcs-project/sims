import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import AddressService from "../../security/api/services/AddressService";
import UserService from "../../security/api/services/UserService";
import { LANGUAGE, USER_LEVEL } from "../constants/ITMISConstansts";
import { useForm, Controller } from "react-hook-form";
import OrganizationService from "../../security/api/services/OrganizationService";
import i18n from "../../il8n/il8n";
const Organization = (props) => {
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
  const [userLevel, setUserLevel] = useState();
  const [Organization, setOrganization] = useState();
  const { t } = useTranslation();
  useEffect(() => {
    // if (getValues("province")) {
    //   getDistrictValue(getValues("province"));
    //   getMunicipalitiesList(getValues("district"));
    //   setValue("province", parseInt(getValues("province")));
    //   setValue("district", parseInt(getValues("district")));
    //   setValue("municipality", parseInt(getValues("municipality")));
    //   setValue("wardNo", parseInt(getValues("wardNo")));
    // }
    AddressService.getAllProvinces().then((response) => {
      setProvincesList(response.data.data);
    });
    let organizationAddress = {};
    OrganizationService.getLoggedInUserOrganizaitonDetails().then((response) => {
      console.log("response.data.data.name", response.data);
      setOrganization(response.data.data.name);
      organizationAddress = response.data.data.organizationAddress;
      UserService.getUserLevel().then((response) => {
        if (response.data.data == USER_LEVEL.PROVINCE) {
          reset({
            province: parseInt(organizationAddress.province),
          });
          getDistrictValue(organizationAddress.province);
        } else if (response.data.data == USER_LEVEL.DISTRICT) {
          reset({
            province: parseInt(organizationAddress.province),
            district: parseInt(organizationAddress.district),
          });
          getDistrictValue(organizationAddress.province);
          getMunicipalitiesList(organizationAddress.district);
        } else {
          // AddressService.getAllProvinces().then((response) => {
          //   setProvincesList(response.data.data);
          // });
          getDistrictValue(organizationAddress.province);
          getMunicipalitiesList(organizationAddress.district);
          reset({
            province: parseInt(organizationAddress.province),
            district: parseInt(organizationAddress.district),
            municipality: parseInt(organizationAddress.municipality),
          });
        }
        setUserLevel(response.data.data);
      });
    });
  }, []);

  const getDistrictValue = (provinceId) => {
    AddressService.getAllDistrictsByProvinceId(provinceId).then((response) => {
      setDistrictList(response.data.data);
    });
  };
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm({});
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
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
    getOrganizationId();
  };
  const getOrganizationId = () => {
    OrganizationService.getOrganizationByAddress(
      getValues("province"),
      getValues("district"),
      getValues("municipality"),
      null
    ).then((response) => {
      if (response.data.data && response.data.data.organizationId)
        props.submitOrganizationId(response.data.data.organizationId);
      else props.submitOrganizationId(0);
    });
  };
  const [addressValue, setAddressValue] = useState();
  const onSubmit = (data) => {
    console.log("---", data);
  };
  return (
    <div className="p-field p-col-12 p-md-12" style={{ justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-field p-col-12 p-md-3 float-left main-label">{t("organization")}</div>
        <div className="p-field p-col-12 p-md-3 float-left">
          <Dropdown
            name="province"
            placeholder={t("province")}
            value={getValues("province")}
            options={provincesList}
            optionLabel={i18n.language == LANGUAGE.ENGLISH ? "provinceDescEng" : "provinceDescNep"}
            optionValue="id"
            {...register("province", {
              required: "Province is Required",
            })}
            onChange={(e) => {
              setValue("province", e.value);
              getDistrictValue(e.value);
            }}
            disabled={
              userLevel == USER_LEVEL.PROVINCE ||
              userLevel == USER_LEVEL.DISTRICT ||
              userLevel == USER_LEVEL.LOCAL_LEVEL ||
              userLevel == USER_LEVEL.LOCAL_LEVEL_VERIFIER
            }
          />
          {/* {error.province && error.province.type === "required" && (
                <small className="p-error">{error.province.message}</small>
              )} */}
        </div>
        <div className="p-field p-col-12 p-md-3 float-left">
          <Dropdown
            name="district"
            value={getValues("district")}
            placeholder={t("district")}
            {...register("district", {
              required: "District is Required",
            })}
            onChange={(e) => {
              setValue("district", e.value);
              getMunicipalitiesList(e.value);
            }}
            options={districtsList}
            optionLabel={i18n.language == LANGUAGE.ENGLISH ? "districtDescEng" : "districtDescNep"}
            optionValue="id"
            disabled={userLevel == USER_LEVEL.DISTRICT || userLevel == USER_LEVEL.LOCAL_LEVEL ||
              userLevel == USER_LEVEL.LOCAL_LEVEL_VERIFIER}
          />{" "}
          {/* {error.district && error.district.type === "required" && (
                <small className="p-error">{error.district.message}</small>
              )} */}
        </div>
        <div className="p-field p-col-12 p-md-3 float-left">
          <Dropdown
            name="municipality"
            value={getValues("municipality")}
            placeholder={t("municipality")}
            {...register("municipality", {
              required: "Municipality is Required",
            })}
            onChange={(e) => {
              setValue("municipality", e.value);
              getTotalWard(e.value);
              setAddressValue(e.value);
            }}
            options={municipalitiesList}
            optionLabel={i18n.language == LANGUAGE.ENGLISH ? "municipalityDescEng" : "municipalityDescNep"}
            optionValue="id"
            disabled={userLevel == USER_LEVEL.LOCAL_LEVEL ||
              userLevel == USER_LEVEL.LOCAL_LEVEL_VERIFIER}
          />
          {/* {error.municipality && error.municipality.type === "required" && (
                <small className="p-error">{error.municipality.message}</small>
              )} */}
        </div>
        {/* {userLevel == USER_LEVEL.MINISTRY ? (
          <>
            <div className="p-field p-col-12 p-md-3 float-left">
              <Dropdown
                name="province"
                placeholder={t("province")}
                value={getValues("province")}
                options={provincesList}
                optionLabel="provinceDescEng"
                optionValue="id"
                {...register("province", {
                  required: "Province is Required",
                })}
                onChange={(e) => {
                  setValue("province", e.value);
                  getDistrictValue(e.value);
                }} 
        /> */}
        {/* {error.province && error.province.type === "required" && (
                <small className="p-error">{error.province.message}</small>
              )} */}
        {/* </div> */}
        {/* <div className="p-field p-col-12 p-md-3 float-left">
              <Dropdown
                name="wardNo"
                value={getValues("wardNo")}
                placeholder={t("wardNo")}
                {...register("wardNo", {
                  required: "Ward No is Required",
                })}
                onChange={(e) => {
                  setValue("wardNo", e.value);
                  setAddressValue(e.value);
                }}
                options={wardList}
                optionLabel="wardId"
                optionValue="wardId"
              /> */}
        {/* {error.wardNo && error.wardNo.type === "required" && (
                <small className="p-error">{error.wardNo.message}</small>
              )} */}
        {/* </div> */}
        {/* </>
        ) : (
          <></>
        )}
        {userLevel == USER_LEVEL.MINISTRY || userLevel == USER_LEVEL.PROVINCE ? (
          <>
            <div className="p-field p-col-12 p-md-3 float-left">
              <Dropdown
                name="district"
                value={getValues("district")}
                placeholder={t("district")}
                {...register("district", {
                  required: "District is Required",
                })}
                onChange={(e) => {
                  setValue("district", e.value);
                  getMunicipalitiesList(e.value);
                }}
                options={districtsList}
                optionLabel="districtDescEng"
                optionValue="id"
              /> */}
        {/* {error.district && error.district.type === "required" && (
                <small className="p-error">{error.district.message}</small>
              )} */}
        {/* </div>
          </>
        ) : (
          <></>
        )}
        {userLevel == USER_LEVEL.MINISTRY ||
        userLevel == USER_LEVEL.PROVINCE ||
        userLevel == USER_LEVEL.DISTRICT ? (
          <>
            <div className="p-field p-col-12 p-md-3 float-left">
              <Dropdown
                name="municipality"
                value={getValues("municipality")}
                placeholder={t("municipality")}
                {...register("municipality", {
                  required: "Municipality is Required",
                })}
                onChange={(e) => {
                  setValue("municipality", e.value);
                  getTotalWard(e.value);
                  setAddressValue(e.value);
                }}
                options={municipalitiesList}
                optionLabel="municipalityDescEng"
                optionValue="id"
              /> */}
        {/* {error.municipality && error.municipality.type === "required" && (
                <small className="p-error">{error.municipality.message}</small>
              )} */}
        {/* </div>
          </>
        ) : (
          <></>
        )} */}
      </form>
    </div>
  );
};
export default Organization;
