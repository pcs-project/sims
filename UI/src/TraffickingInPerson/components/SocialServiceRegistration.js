import React, { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";

import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import AddressService from "../../security/api/services/AddressService";
import {
  SOCIAL_SERVICE_MODULES,
  TRUE_FALSE,
  YES_NO,
} from "../../utilities/constants/ITMISConstansts";
import SocialServiceRegistrationService from "../api/services/SocialServiceRegistrationService";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
const SocialServiceRegistration = () => {
  const { t } = useTranslation();
  const [buttonLabel, setButtonLabel] = useState("Create");
  const [socialServiceList, setSocialServiceList] = useState([]);
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
  const [serviceTypeList, setServiceTypeList] = useState([
    {
      value: "counselling",
      engName: "Counselling",
    },
    {
      value: "medical",
      engName: "Medical",
    },
    {
      value: "lifeskill",
      engName: "LifeSkill",
    },
  ]);
  const [sourceOfFundingList, setSourceOfFundingList] = useState([
    {
      value: "donation",
      engName: "Donation",
    },
    {
      value: "salary",
      engName: "Salary",
    },
    {
      value: "buySellAssets",
      engName: "BuySellAssets",
    },
    {
      value: "others",
      engName: "Others",
    },
  ]);
  const [managementTypeList, setManagementTypeList] = useState([
    {
      value: "board",
      engName: "Board",
    },
    {
      value: "public",
      engName: "Public",
    },
    {
      value: "private",
      engName: "Private",
    },
  ]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});
  const toast = useRef(null);
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };
  useEffect(() => {
    AddressService.getAllProvinces().then((response) => {
      setProvincesList(response.data.data);
    });
    SocialServiceRegistrationService.getAllSocialServiceRegistration().then((response) => {
      var index = 0;
      const list = [];
      const length = response.data.data.length;

      response.data.data.forEach((socialService) => {
        AddressService.getProvinceByProvinceId(socialService.province).then((response) => {
          socialService.provinceName = response.data.data.provinceName;
        });
        AddressService.getDistrictbyProvinceCdAndDistrictCd(
          socialService.province,
          socialService.district
        ).then((response) => {
          socialService.districtName = response.data.data.districtName;
          index += 1;
          list.push(socialService);
          if (index == length) {
            setSocialServiceList(list);
          }
        });
      });
    });
  }, []);
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
  const onSubmit = (data) => {
    console.log("Data", JSON.stringify(data));
    buttonLabel == "Update" ?
    SocialServiceRegistrationService.updateSocialServiceRegistration(data.registrationId,data).then((response) => {
      if (response.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "Save Successful",
          life: 3000,
        });
        window.location.reload(false);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Save UnSuccessful",
          life: 3000,
        });
      }
    })
    :
    SocialServiceRegistrationService.saveSocialServiceRegistration(data).then((response) => {
      if (response.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "Save Successful",
          life: 3000,
        });
        window.location.reload(false);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Save UnSuccessful",
          life: 3000,
        });
      }
    });
  };
  const confirmUpdate = (socialService) => {
    confirmDialog({
      message: "Are you sure you want to Update?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => acceptUpdate(socialService),
      reject: () => rejectFunc(),
    });
  };
  const acceptUpdate = (socialService) =>{
    console.log("socialService");
    setButtonLabel("Update");
    getDistrictValue(socialService.province)
    getMunicipalitiesList(socialService.district);
    reset({
      registrationId:socialService.registrationId,
      category:socialService.category,
      name:socialService.name,
      province:parseInt(socialService.province),
      district:parseInt(socialService.district),
      municipality:parseInt(socialService.municipality),
      ward:parseInt(socialService.ward),
      phoneNo:socialService.phoneNo,
      email:socialService.email,
      website:socialService.website,
      nameOfHead:socialService.nameOfHead,
      emailOfHead:socialService.emailOfHead,
      mobileNoOfHead:socialService.mobileNoOfHead,
      registrationNumber:socialService.registrationNumber,
      registrationPlace:socialService.registrationPlace,
      registrationDate:socialService.registrationDate,
      isOwnBuilding:socialService.isOwnBuilding,
      isRented:socialService.isRented,
      typeOfService:socialService.typeOfService,
      physicalInfrastructure:socialService.physicalInfrastructure, isRented:socialService.isRented,
      noOfMaleStaff:socialService.noOfMaleStaff,
      noOfFemaleStaff:socialService.noOfFemaleStaff,
      noOfOtherStaff:socialService.noOfOtherStaff,
      managementType:socialService.managementType,
      sourceOfFunding:socialService.sourceOfFunding,
    })

  }
  const acceptDelete = (socialService) => {
    SocialServiceRegistrationService.deleteSocialServiceRegistration(socialService.registrationId).then((response) => {
      if (response.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "Delete Successful",
          life: 3000,
        });
        window.location.reload(false);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Delete UnSuccessful",
          life: 3000,
        });
      }
    });
  };
  const confirmDelete = (socialService) => {
    confirmDialog({
      message: "Are you sure you want to Delete?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => acceptDelete(socialService),
      reject: () => rejectFunc(),
    });
  };

  const rejectFunc = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };
  return (
    <>
      <Toast ref={toast} />
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className=" p-card-content">
          <h4 className="p-pt-0">{t("regOfShelter")}</h4>
        </div>
      </Card>
      <Card className="p-mt-0">
        <div className=" datatable-scroll-demo">
          <div className="card p-col-12 p-md-8" style={{ float: "left" }}>
            <h4 style={{ paddingTop: "0px" }}> {t("list")} </h4>

            <table border="1" className="ucTable" style={{ border: "1px solid #CCC" }}>
              <thead>
                <tr>
                  <th> {t("category")} </th>
                  <th> {t("name")} </th>
                  <th> {t("address")} </th>
                  <th> {t("typeOfService")} </th>
                  <th> {t("action")} </th>
                </tr>
              </thead>

              <tbody>
                {socialServiceList.map((socialService) => {
                  return (
                    <>
                      <tr>
                        <td>{socialService.category} </td>
                        <td>{socialService.name}</td>
                        <td>{socialService.provinceName + "    " + socialService.districtName}</td>
                        <td>{socialService.typeOfService}</td>
                        <td>
                          {" "}
                          <i
                          className="pi pi-user-edit float-left"
                          onClick={(e) => confirmUpdate(socialService)}
                        ></i>
                        <i
                          className="pi pi-trash float-right"
                          onClick={(e) => confirmDelete(socialService)}
                        ></i>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="card p-col-12 p-md-4" style={{ float: "left" }}>
            <h4 className="p-ml-3" style={{ paddingTop: "0px" }}>
              {t("shelterCreation")}
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left"> {t("category")} :</div>
                <div class="p-field p-col-8 p-md-8 float-left">
                  {/* <RadioButton name="city" /> {t("shelterHome")} <br></br>
                  <RadioButton name="city" /> {t("childHome")} <br></br>
                  <RadioButton name="city" /> {t("childCorrection")} <br></br>
                  <RadioButton name="city" /> {t("oldAgeHome")} &nbsp; */}
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is  required." }}
                    render={({ field, fieldState }) => (
                      <div>
                        <RadioButton
                          inputId={SOCIAL_SERVICE_MODULES.SHELTER_HOME}
                          name={SOCIAL_SERVICE_MODULES.SHELTER_HOME}
                          value={SOCIAL_SERVICE_MODULES.SHELTER_HOME}
                          checked={field.value == SOCIAL_SERVICE_MODULES.SHELTER_HOME}
                          onChange={(e) => field.onChange(e.value)}
                        />
                        <label
                          htmlFor={SOCIAL_SERVICE_MODULES.SHELTER_HOME}
                          className="p-ml-1 p-mr-2"
                        >
                          {t("shelterHome")}
                        </label>
                        <br></br>
                        <RadioButton
                          inputId={SOCIAL_SERVICE_MODULES.CHILD_HOME}
                          name={SOCIAL_SERVICE_MODULES.CHILD_HOME}
                          value={SOCIAL_SERVICE_MODULES.CHILD_HOME}
                          checked={field.value == SOCIAL_SERVICE_MODULES.CHILD_HOME}
                          onChange={(e) => field.onChange(e.value)}
                        />
                        <label
                          htmlFor={SOCIAL_SERVICE_MODULES.CHILD_HOME}
                          className="p-ml-1 p-mr-2"
                        >
                          {t("childHome")}
                        </label>
                        <br></br>
                        <RadioButton
                          inputId={SOCIAL_SERVICE_MODULES.CHILD_CORRECTION}
                          name={SOCIAL_SERVICE_MODULES.CHILD_CORRECTION}
                          value={SOCIAL_SERVICE_MODULES.CHILD_CORRECTION}
                          checked={field.value == SOCIAL_SERVICE_MODULES.CHILD_CORRECTION}
                          onChange={(e) => field.onChange(e.value)}
                        />
                        <label
                          htmlFor={SOCIAL_SERVICE_MODULES.CHILD_CORRECTION}
                          className="p-ml-1 p-mr-2"
                        >
                          {t("childCorrection")}
                        </label>
                        <br></br>
                        <RadioButton
                          inputId={SOCIAL_SERVICE_MODULES.OLD_AGE_HOME}
                          name={SOCIAL_SERVICE_MODULES.OLD_AGE_HOME}
                          value={SOCIAL_SERVICE_MODULES.OLD_AGE_HOME}
                          checked={field.value == SOCIAL_SERVICE_MODULES.OLD_AGE_HOME}
                          onChange={(e) => field.onChange(e.value)}
                        />
                        <label
                          htmlFor={SOCIAL_SERVICE_MODULES.OLD_AGE_HOME}
                          className="p-ml-1 p-mr-2"
                        >
                          {t("oldAgeHome")}
                        </label>
                      </div>
                    )}
                  />
                  {getFormErrorMessage("userLevel")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left"> {t("name")} :</div>
                <div class="p-field p-col-8 p-md-8 float-left">
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: "Name is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className="rounded-input p-mb-1"
                      />
                    )}
                  />
                  {getFormErrorMessage("name")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left">
                  <strong> {t("address")} </strong>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left"> {t("province")} :</div>
                <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                  <Controller
                    name="province"
                    control={control}
                    rules={{ required: "Province is required." }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        placeholder={"Select Province"}
                        onChange={(e) => {
                          field.onChange(e.value);
                          getDistrictValue(e.value);
                        }}
                        style={{ width: "100%" }}
                        options={provincesList}
                        optionLabel="provinceName"
                        optionValue="provinceId"
                      />
                    )}
                  />
                  {getFormErrorMessage("province")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left"> {t("district")} :</div>
                <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                  <Controller
                    name="district"
                    control={control}
                    rules={{ required: "District is required." }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        placeholder={"Select District"}
                        onChange={(e) => {
                          field.onChange(e.value);
                          getMunicipalitiesList(e.value);
                        }}
                        style={{ width: "100%" }}
                        options={districtsList}
                        optionLabel="districtName"
                        optionValue="districtId"
                      />
                    )}
                  />
                  {getFormErrorMessage("district")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left"> {t("localLevel")} :</div>
                <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                  <Controller
                    name="municipality"
                    control={control}
                    rules={{ required: "Municipal is required." }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        placeholder={"Select Municipality"}
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        style={{ width: "100%" }}
                        options={municipalitiesList}
                        optionLabel="municipalityName"
                        optionValue="municipalityId"
                      />
                    )}
                  />
                  {getFormErrorMessage("municipality")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left"> {t("ward")} :</div>
                <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                  <Controller
                    name="ward"
                    control={control}
                    rules={{ required: "Ward is required." }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        placeholder={"Select Ward"}
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        style={{ width: "100%" }}
                        options={wardList}
                        optionLabel="wardId"
                        optionValue="wardId"
                      />
                    )}
                  />
                  {getFormErrorMessage("ward")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left"> {t("phoneNo")} :</div>
                <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                  <Controller
                    name="phoneNo"
                    control={control}
                    rules={{ required: "Phone No is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className="rounded-input p-mb-1"
                      />
                    )}
                  />
                  {getFormErrorMessage("phoneNo")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left"> {t("email")} :</div>
                <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className="rounded-input p-mb-1"
                      />
                    )}
                  />
                  {getFormErrorMessage("email")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left"> {t("website")} :</div>
                <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                  <Controller
                    name="website"
                    control={control}
                    rules={{ required: "Website is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className="rounded-input p-mb-1"
                      />
                    )}
                  />
                  {getFormErrorMessage("website")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-12 p-md-12 float-left">
                  <strong> {t("contactOfHead")} </strong>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left"> {t("nameOfHead")} :</div>
                <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                  <Controller
                    name="nameOfHead"
                    control={control}
                    rules={{ required: "Name Of Head is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className="rounded-input p-mb-1"
                      />
                    )}
                  />
                  {getFormErrorMessage("nameOfHead")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left"> {t("email")} :</div>
                <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                  <Controller
                    name="emailOfHead"
                    control={control}
                    rules={{ required: "Email is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className="rounded-input p-mb-1"
                      />
                    )}
                  />
                  {getFormErrorMessage("emailOfHead")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left"> {t("mobile")} :</div>
                <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                  <Controller
                    name="mobileNoOfHead"
                    control={control}
                    rules={{ required: "Website is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className="rounded-input p-mb-1"
                      />
                    )}
                  />
                  {getFormErrorMessage("mobileNoOfHead")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-12 p-md-12 float-left">
                  <strong> {t("registrationDetails")} </strong>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left"> {t("number")} :</div>
                <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                  <Controller
                    name="registrationNumber"
                    control={control}
                    rules={{ required: "Registration Number is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className="rounded-input p-mb-1"
                      />
                    )}
                  />
                  {getFormErrorMessage("registrationNumber")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-right">
                  <Controller
                    name="registrationPlace"
                    control={control}
                    rules={{ required: "Registration Place is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        style={{ width: "100px" }}
                        className="rounded-input p-mb-1"
                        placeholder={t("place")}
                      />
                    )}
                  />
                  {getFormErrorMessage("registrationPlace")}
                  {/* <InputText placeholder={t("place")} style={{ width: "100px" }}></InputText> */}
                </div>
                <div class="p-field p-col-4 p-md-4 float-right p-pr-0">
                  <Controller
                    name="registrationDate"
                    control={control}
                    rules={{ required: "Registration Date is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        style={{ width: "100px" }}
                        className="rounded-input p-mb-1"
                        placeholder={t("date")}
                      />
                    )}
                  />
                  {getFormErrorMessage("website")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-12 p-md-12 float-left">
                  <strong> {t("otherDetails")} </strong>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-6 p-md-6 float-left"> {t("ownBuilding")} ?</div>
                <div class="p-field p-col-6 p-md-6 float-left">
                  {/* <RadioButton name="city" /> {t("yes")}
                  <RadioButton name="city" /> {t("no")} */}
                  <Controller
                    name="isOwnBuilding"
                    control={control}
                    rules={{ required: "User Level is  required." }}
                    render={({ field, fieldState }) => (
                      <div>
                        <RadioButton
                          inputId={YES_NO.YES}
                          name={YES_NO.YES}
                          value={TRUE_FALSE.TRUE}
                          checked={field.value == TRUE_FALSE.TRUE}
                          onChange={(e) => field.onChange(e.value)}
                        />
                        <label htmlFor={YES_NO.YES} className="p-ml-1 p-mr-2">
                          {t(YES_NO.YES)}
                        </label>

                        <RadioButton
                          inputId={YES_NO.NO}
                          name={YES_NO.NO}
                          value={TRUE_FALSE.NO}
                          checked={field.value == TRUE_FALSE.NO}
                          onChange={(e) => field.onChange(e.value)}
                        />
                        <label htmlFor={YES_NO.NO} className="p-ml-1 p-mr-2">
                          {t(YES_NO.NO)}
                        </label>
                      </div>
                    )}
                  />
                  {getFormErrorMessage("isOwnBuilding")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-6 p-md-6 float-left"> {t("rent")} ?</div>
                <div class="p-field p-col-6 p-md-6 float-left">
                  <Controller
                    name="isRented"
                    control={control}
                    rules={{ required: "Is Rented is  required." }}
                    render={({ field, fieldState }) => (
                      <div>
                        <RadioButton
                          inputId={YES_NO.YES}
                          name={YES_NO.YES}
                          value={TRUE_FALSE.TRUE}
                          checked={field.value == TRUE_FALSE.TRUE}
                          onChange={(e) => field.onChange(e.value)}
                        />
                        <label htmlFor={YES_NO.YES} className="p-ml-1 p-mr-2">
                          {t(YES_NO.YES)}
                        </label>

                        <RadioButton
                          inputId={YES_NO.NO}
                          name={YES_NO.NO}
                          value={TRUE_FALSE.NO}
                          checked={field.value == TRUE_FALSE.NO}
                          onChange={(e) => field.onChange(e.value)}
                        />
                        <label htmlFor={YES_NO.NO} className="p-ml-1 p-mr-2">
                          {t(YES_NO.NO)}
                        </label>
                      </div>
                    )}
                  />
                  {getFormErrorMessage("isRented")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-6 p-md-6 float-left"> {t("typeOfService")} :</div>
                <div class="p-field p-col-6 p-md-6 float-left p-pr-0">
                  <Controller
                    name="typeOfService"
                    control={control}
                    rules={{ required: "Service Type is required." }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        placeholder={"Select Service Type"}
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        style={{ width: "100%" }}
                        options={serviceTypeList}
                        optionLabel="engName"
                        optionValue="value"
                      />
                    )}
                  />
                  {getFormErrorMessage("typeOfService")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-6 p-md-6 float-left">
                  {" "}
                  {t("physicalInfrastructure")} .
                </div>
                <div class="p-field p-col-6 p-md-6 float-left p-pr-0">
                  <Controller
                    name="physicalInfrastructure"
                    control={control}
                    rules={{ required: "Physical Infrastructure is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className="rounded-input p-mb-1"
                      />
                    )}
                  />
                  {getFormErrorMessage("physicalInfrastructure")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-6 p-md-6 float-left">{t("noOfStaff")}</div>
                <div class="p-field p-col-6 p-md-6 float-left p-pr-0">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon">
                      <Controller
                        name="noOfMaleStaff"
                        control={control}
                        rules={{ required: "No Of Male is required." }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            autoFocus
                            placeholder={t("male")}
                            className="rounded-input p-mb-1"
                          />
                        )}
                      />
                    </span>

                    <span className="p-inputgroup-addon">
                      <Controller
                        name="noOfFemaleStaff"
                        control={control}
                        rules={{ required: "No of Female is required." }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            autoFocus
                            placeholder={t("female")}
                            className="rounded-input p-mb-1"
                          />
                        )}
                      />
                    </span>
                  </div>
                  {getFormErrorMessage("noOfMaleStaff")}
                  {getFormErrorMessage("noOfFemaleStaff")}
                </div>
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-6 p-md-6 float-left"></div>
                <div class="p-field p-col-6 p-md-6 float-left p-pr-0">
                  <Controller
                    name="noOfOtherStaff"
                    control={control}
                    rules={{ required: "No of Female is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        placeholder={t("other")}
                        className="rounded-input p-mb-1"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-6 p-md-6 float-left">{t("sourceOfFunding")}</div>
                <div class="p-field p-col-6 p-md-6 float-left p-pr-0">
                  <Controller
                    name="sourceOfFunding"
                    control={control}
                    rules={{ required: "Source Of Funding is required." }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        placeholder={"Select SourceOffundings"}
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        style={{ width: "100%" }}
                        options={sourceOfFundingList}
                        optionLabel="engName"
                        optionValue="value"
                      />
                    )}
                  />
                  {getFormErrorMessage("sourceOfFunding")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-6 p-md-6 float-left">{t("mgmtType")}</div>
                <div class="p-field p-col-6 p-md-6 float-left p-pr-0">
                  <Controller
                    name="managementType"
                    control={control}
                    rules={{ required: "ManagementTypeis required." }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        placeholder={"Select ManagementType"}
                        onChange={(e) => {
                          field.onChange(e.value);
                          getDistrictValue(e.value);
                        }}
                        style={{ width: "100%" }}
                        options={managementTypeList}
                        optionLabel="engName"
                        optionValue="value"
                      />
                    )}
                  />
                  {getFormErrorMessage("managementType")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-8 p-md-8 float-left"></div>

                <div class="p-field p-col-4 p-md-4 float-right p-pr-0">
                  <Button
                    style={{
                      background: "#4e70ae",
                      color: "#FFF",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {buttonLabel}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div style={{ clear: "both" }}></div>
      </Card>
    </>
  );
};
export default SocialServiceRegistration;
