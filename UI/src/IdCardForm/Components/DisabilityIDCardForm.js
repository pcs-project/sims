import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";

import Logo1 from "../../scafolding/assets/images/govLogo.png";

import { Dropdown } from "primereact/dropdown";
import { PhotoUpload } from "../Components/PhotoUpload.js";
import Address from "../../utilities/components/Address";
import Gender from "../../utilities/components/Gender";
import BloodGroup from "../../utilities/components/BloodGroup";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import NameNepali from "../../utilities/components/NameNepali";
import NameEnglish from "../../utilities/components/NameEnglish";
import DisabledIdCardService from "../../IdCard/api/services/DisabledIdCardService";
import { Toast } from "primereact/toast";
import OrganizationService from "../../security/api/services/OrganizationService";
import { trackPromise } from "react-promise-tracker";
import i18n from "../../il8n/il8n";
import { adToBs, bsToAd } from "@sbmdkl/nepali-date-converter";
import {
  FORM_MODE,
  ID_CATEGORY_NEPALI,
  LANGUAGE,
} from "../../utilities/constants/ITMISConstansts";
import OldIdExist from "../../utilities/components/oldIdExist";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { englishToNepaliNumber } from "nepali-number";
import InputTextNepali from "../../utilities/components/InputText";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";

function DisabilityIDCardForm(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const toast = useRef(null);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "all",
    dataStatus: FORM_MODE.NEW,
    dateNep: "",
    dateEng: new Date(),
    dobEng: new Date(),
    dobNep: "",
  });
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };
  const convertIdToNepali = (data) => {
    const idArray = data.split("_");
    const idNepali =
      englishToNepaliNumber(idArray[0]) +
      "_" +
      englishToNepaliNumber(idArray[1]) +
      "_" +
      englishToNepaliNumber(idArray[2]) +
      "_" +
      ID_CATEGORY_NEPALI[idArray[3]] +
      "_" +
      englishToNepaliNumber(idArray[4]);
    return idNepali;
  };

  const [organizationList, setOrganizationList] = useState([]);
  const [organizationDetails, setOrganizationDetails] = useState({});
  const [fullAddressEngOrg, setFullAddressEngOrg] = useState();
  const [fullAddressNepOrg, setFullAddressNepOrg] = useState();
  const [idCardTypeList, setIdCardTypeList] = useState([
    {
      value: "ka",
      engName: "Completely disabled disability",
      nepName: "पूर्ण अशाक्त अपाङ्गता",
      color: "Red",
    },
    {
      value: "kha",
      engName: "Extremely disabled disability",
      nepName: "अति  अशाक्त  अपाङ्गता",
      color: "Blue",
    },
    {
      value: "ga",
      engName: "Moderate disability",
      nepName: "मध्यम   अशाक्त  अपाङ्गता",
      color: "Yellow",
    },
    {
      value: "gha",
      engName: "General disability",
      nepName: "सामान्य  अपाङ्गता",
      color: "White",
    },
  ]);
  const [disabilityByNatureList, setDisabilityByNatureList] = useState([
    {
      value: "BLINDNESS",
      engName: "BLINDNESS",
      nepName: "दृष्टि विहीन",
    },
    {
      value: "LOCOMOTOR_DISABILITY",
      engName: "LOCOMOTOR DISABILITY",
      nepName: "लोकोमोटर असक्षमता",
    },
  ]);

  const [disabilityBySeverityList, setDisabilityBySeverityList] = useState([
    {
      value: "HIGH",
      engName: "HIGH",
      nepName: "उच्च",
    },
    {
      value: "MEDIUM",
      engName: "MEDIUM",
      nepName: "मध्यम",
    },
    {
      value: "LOW",
      engName: "LOW",
      nepName: "कम",
    },
  ]);
  useEffect(() => {
    OrganizationService.getOrganizaitonDetailsByLoggedUser().then((response) => {
      setOrganizationList(response.data.data);
      response.data.data.length == 1
        ? reset({
          organization: response.data.data[0].organizationId,
        })
        : reset({});
    });

    OrganizationService.getLoggedInUserOrganizaitonDetails().then((response) => {
      console.log(response.data.data);
      setOrganizationDetails(response.data.data);
    });
    OrganizationService.getLoggedInUserOrganizaitonDetails().then((response) => {
      console.log(response.data.data);
      setOrganizationDetails(response.data.data);
      // AddressService.getFullAddressEng(
      //   response.data.data.organizationAddress.province,
      //   response.data.data.organizationAddress.district,
      //   response.data.data.organizationAddress.municipality,
      //   0
      // ).then((response) => {
      //   setFullAddressEngOrg(response.data.data);
      // });
      // AddressService.getFullAddressNep(
      //   response.data.data.organizationAddress.province,
      //   response.data.data.organizationAddress.district,
      //   response.data.data.organizationAddress.municipality,
      //   0
      // ).then((response) => {
      //   setFullAddressNepOrg(response.data.data);
      // });
    });
    if (props.location.state && props.location.state.id) {
      DisabledIdCardService.getDisabledIdCardDetailsById(
        props.location.state && props.location.state.id
      ).then((response) => {
        if (response.status == 200) {
          reset({
            id: response.data.data.id,
            oldIdExist: response.data.data.oldIdCardNo ? "Yes" : "No",
            oldIdCardNo: response.data.data.oldIdCardNo,
            firstNameEng: response.data.data.firstNameEng,
            middleNameEng: response.data.data.middleNameEng,
            lastNameEng: response.data.data.lastNameEng,
            firstNameNep: response.data.data.firstNameNep,
            middleNameNep: response.data.data.middleNameNep,
            lastNameNep: response.data.data.lastNameNep,
            idCardType: response.data.data.idCardType,
            dobEng: new Date(response.data.data.dobEng),
            dobNep: response.data.data.dobNep,
            gender: response.data.data.gender,
            // typeOfDisabilityByNature: response.data.data.typeOfDisabilityByNature,
            // typeOfDisabilityBySeverity: response.data.data.typeOfDisabilityBySeverity,
            fatherMotherGaurdianNameEng: response.data.data.fatherMotherGaurdianNameEng,
            fatherMotherGaurdianNameNep: response.data.data.fatherMotherGaurdianNameNep,
            nameEng: response.data.data.disabledApprovedDetails.nameEng,
            nameNep: response.data.data.disabledApprovedDetails.nameNep,
            designationEng: response.data.data.disabledApprovedDetails.designationEng,
            designationNep: response.data.data.disabledApprovedDetails.designationNep,
            dateEng: new Date(response.data.data.disabledApprovedDetails.dateEng),
            dateNep: response.data.data.disabledApprovedDetails.dateNep,
            bloodGroup: response.data.data.bloodGroup,
            citizenshipNo: response.data.data.citizenshipNo,
            province: response.data.data.disabledAddressDetails.province,
            district: response.data.data.disabledAddressDetails.district,
            municipality: response.data.data.disabledAddressDetails.municipality,
            wardNo: response.data.data.disabledAddressDetails.wardNo,
            oldPhoto: response.data.data.disabledIdCardPhotoInformation.fileData,
            oldIdPhoto: response.data.data.oldIdCardImage,
            dataStatus: FORM_MODE.UPDATE,
            //  idCardPhoto: response.data.data.disabledIdCardPhotoInformation.fileData,
            idCardNoNepali: convertIdToNepali(response.data.data.id),
            nationalIdentificationNo: response.data.data.nationalIdentificationNo,
            fatherMotherGaurdianfNameEng: response.data.data.fatherMotherGaurdianfNameEng,
            fatherMotherGaurdianfNameNep: response.data.data.fatherMotherGaurdianfNameNep,
            fatherMotherGaurdianmNameEng: response.data.data.fatherMotherGaurdianmNameEng,
            fatherMotherGaurdianmNameNep: response.data.data.fatherMotherGaurdianmNameNep,
            fatherMotherGaurdianlNameEng: response.data.data.fatherMotherGaurdianlNameEng,
            fatherMotherGaurdianlNameNep: response.data.data.fatherMotherGaurdianlNameNep,
            birthCertificateNo: response.data.data.birthCertificateNo
          });
        }
      });
    }
  }, []);

  const idCardPage = (rowData) => {
    console.log("sdfsdfsf", rowData);
    history.push({
      pathname: "/sims/disability-IDCard",
      state: {
        data: rowData,
      },
    });
  };
  const onSubmit = (data) => {
    let disabledAddressDetails = (({ province, district, municipality, wardNo }) => ({
      province,
      district,
      municipality,
      wardNo,
    }))(data);
    let disabledApprovedDetails = (({
      nameEng,
      nameNep,
      designationNep,
      designationEng,
      dateEng,
      dateNep,
    }) => ({ nameEng, nameNep, designationNep, designationEng, dateEng, dateNep }))(data);
    data.disabledAddressDetails = disabledAddressDetails;
    data.disabledApprovedDetails = disabledApprovedDetails;

    let formData = new FormData();
    formData.append("idCardPhoto", data.idCardPhoto);
    if (data.oldIdCardImage != undefined) {
      formData.append("oldIdCardImage", data.oldIdCardImage);
      delete data.oldIdCardImage;
    }
    formData.append("oldIdCardImage", null);
    delete data.idCardPhoto;
    formData.append("disabledIdCard", JSON.stringify(data));

    console.log("id card data", data);
    console.log("id card formData", formData);

    data.dataStatus == FORM_MODE.UPDATE
      ? trackPromise(
        DisabledIdCardService.updateDisabledIdCardService(formData)
          .then((response) => {
            if (response.status === 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Update Successful",
                life: 3000,
              });
              setTimeout(() => idCardPage(response.data.data), 2000);
            } else {
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: "Update UnSuccessful",
                life: 3000,
              });
            }
          })
          .catch((error) => {
            // We want to handle globally
            error.handleGlobally && error.handleGlobally();
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: error.response.data.msg,
              life: 3000,
            });
          })
      )
      : trackPromise(
        DisabledIdCardService.saveDisabledIdCardService(formData)
          .then((response) => {
            if (response.status === 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Save Successful",
                life: 3000,
              });
              setTimeout(() => idCardPage(response.data.data), 2000);
            } else {
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: "Save UnSuccessful",
                life: 3000,
              });
            }
          })
          .catch((error) => {
            // We want to handle globally
            error.handleGlobally && error.handleGlobally();
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: error.response.data.msg,
              life: 3000,
            });
          })
      );
  };
  // const updateNepaliDate = (value, field) => {
  //   alert(value, field);
  //   // field == "dobEng" ? setValue("dobEng", value) : setValue("dateEng", value);
  // };
  return (
    <>
      <Toast ref={toast} />
      <Card style={{ margin: "16px", borderRadius: "8px" }}>
        <center>
          <Image src={Logo1} />
        </center>
        <center>
          {" "}
          {/* <h4 style={{ color: "#d00000", paddingTop: "0px" }}>
            {t("nepGov")} <br></br> {t("ministryOfWCS")}
          </h4>{" "} */}
          <h4 style={{ color: "#d00000", paddingTop: "0px", fontSize: 12 }}>
            {i18n.language == LANGUAGE.ENGLISH
              ? organizationDetails.name
              : organizationDetails.nameNep}
            {/* {organizationDetails.name} <br></br> {organizationDetails.subDetailsEng} */}
            <br></br>
            {i18n.language == LANGUAGE.ENGLISH
              ? organizationDetails.subDetailsEng
              : organizationDetails.subDetailsNep}
          </h4>{" "}
        </center>
        <center>
          <Button
            style={{
              background: "#d00000",
              color: "#FFF",
              marginTop: "25px",
              paddingLeft: "25px",
              paddingRight: "25px",
            }}
          >
            {" "}
            {t("disabilityIdCard")}
          </Button>
        </center>
        <form className="p-grid p-fluid p-mt-3" onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-6 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("organization")}
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="organization"
                  control={control}
                  rules={{ required: "Organization is required." }}
                  render={({ field, fieldState }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                      style={{ width: "100%" }}
                      options={organizationList}
                      optionLabel="name"
                      optionValue="organizationId"
                    />
                  )}
                />
                {getFormErrorMessage("organization")}
              </div>
            </div>
          </div> */}
          {props.location.state && props.location.state.id ? (
            <div className="p-col-6 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("idCardNo")}</div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="id"
                  control={control}
                  //rules={{ required: "ID Card No is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className="rounded-input p-mb-1"
                      disabled
                      value={
                        i18n.language == LANGUAGE.ENGLISH
                          ? getValues("id")
                          : getValues("idCardNoNepali")
                      }
                    />
                  )}
                />
                {/* // {getFormErrorMessage("idCardNo")} */}
              </div>
            </div>
          ) : (
            <></>
          )}
          <OldIdExist
            register={register}
            error={errors}
            setValue={setValue}
            getValues={getValues}
          />
          <NameNepali
            register={register}
            error={errors}
            setValue={setValue}
            getValues={getValues}
          />
          <NameEnglish
            register={register}
            error={errors}
            setValue={setValue}
            getValues={getValues}
          />

          <div className="p-grid p-col-12 p-md-12 ">
            {/* <div className="p-col-6 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("idCardNo")}</div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="idCardNo"
                  control={control}
                  rules={{ required: "ID Card No is required." }}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                  )}
                />
                {getFormErrorMessage("idCardNo")}
              </div>
            </div> */}
            <div className="p-col-6 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("idCardType")}<span style={{ color: "#d00000"}}> * </span>
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="idCardType"
                  control={control}
                  rules={{ required: "ID Card Type is required." }}
                  render={({ field, fieldState }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                      style={{ width: "100%" }}
                      options={idCardTypeList}
                      optionLabel={i18n.language == LANGUAGE.ENGLISH ? "engName" : "nepName"}
                      optionValue="value"
                    />
                  )}
                />
                {getFormErrorMessage("idCardType")}
              </div>
            </div>
          </div>
          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">{t("photo")} <span style={{ color: "#d00000"}}> * </span></div>
            <div className="p-field p-col-6 p-md-6 float-left p-mr-3">
              <Controller
                name="idCardPhoto"
                control={control}
                rules={{
                  required:
                    getValues("dataStatus") == FORM_MODE.UPDATE
                      ? false
                      : "ID Card Photo is required.",
                }}
                render={({ field, fieldState }) => (
                  <PhotoUpload
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    uploadHandler={(value) => {
                      setValue("idCardPhoto", value);
                    }}
                  />
                )}
              />
              {getFormErrorMessage("idCardPhoto")}
            </div>
            <div className="p-field p-col-3 p-md-3 float-left p-mr-3">
              {getValues("oldPhoto") != undefined && getValues("dataStatus") == FORM_MODE.UPDATE ? (
                <Image
                  width={150}
                  height={120}
                  src={"data:image/jpg;base64," + getValues("oldPhoto")}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <Address register={register} error={errors} setValue={setValue} getValues={getValues} />

          <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-3 p-md-3">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("dateOfBirth")} (BS)<span style={{ color: "#d00000"}}> * </span>
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="dobNep"
                  control={control}
                  rules={{ required: "DOB is required." }}
                  render={({ field, fieldState }) => (
                    <NepaliDatePicker
                      inputClassName="p-inputtext form-control"
                      className=""
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                        setValue("dobEng", new Date(bsToAd(value)));
                      }}
                      options={{ calenderLocale: "en", valueLocale: "en" }}
                    />
                  )}
                />
                {getFormErrorMessage("dobNep")}
              </div>
            </div>
            <div className="p-col-3 p-md-3">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("dateOfBirth")} (AD)<span style={{ color: "#d00000"}}> * </span>
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="dobEng"
                  control={control}
                  rules={{ required: "DOB is required." }}
                  render={({ field, fieldState }) => (
                    <Calendar
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(moment(e.value).format("YYYY-MM-DD"));
                        setValue("dobNep", adToBs(moment(e.value).format("YYYY-MM-DD")).toString());
                      }}
                      style={{ width: "100%" }}
                      showIcon
                      showButtonBar
                      maxDate={new Date()}
                      dateFormat="yy-mm-dd"
                      monthNavigator
                      yearNavigator
                      yearRange="1900:2022"
                    />
                    // <InputMask
                    //   id={field.name}
                    //   {...field}
                    //   className="rounded-input p-mb-1"
                    //   mask="9999-99-99"
                    //   onChange={(e) => {
                    //     field.onChange(e.value);
                    //     // setValue("dobNep", adToBs(moment(e.value).format("YYYY-MM-DD")));
                    //   }}
                    //   onBlur={(e) => {
                    //     //  setValue("dobNep", adToBs(moment(e.value).format("YYYY-MM-DD")));
                    //   }}
                    // />
                  )}
                />
                {getFormErrorMessage("dobEng")}
              </div>
            </div>
          </div>
          <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-3 p-md-3">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("birthCertificateNo")}
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="birthCertificateNo"
                  control={control}
                  //  rules={{ required: "Birth Certificate No is required." }}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                  )}
                />
                {/* {getFormErrorMessage("birthCertificateNo")} */}
              </div>
            </div>
            <div className="p-col-3 p-md-3">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("citizenshipNo")}
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="citizenshipNo"
                  control={control}
                  //  rules={{ required: "Citizenship is required." }}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                  )}
                />
                {/* {getFormErrorMessage("citizenshipNo")} */}
              </div>
            </div>
            <div className="p-col-3 p-md-3">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("nationalIdentificationNo")}
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="nationalIdentificationNo"
                  control={control}
                  //  rules={{ required: "National identification No is required." }}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                  )}
                />
                {/* {getFormErrorMessage("nationalIdentificationNo")} */}
              </div>
            </div>
          </div>
          <Controller
            name="gender"
            control={control}
            rules={{ required: "Gender is required." }}
            render={({ field, fieldState }) => (
              <Gender
                id={field.name}
                {...field}
                onValueChange={(value) => {
                  setValue("gender", value);
                }}
                value={getValues("gender")}
                getValues={getValues}
              />
            )}
          />
          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left">
              {getFormErrorMessage("gender")}
            </div>
          </div>
          <BloodGroup
            register={register}
            error={errors}
            setValue={setValue}
            getValues={getValues}
          />
          {/* 
          <div className="p-field p-col-12 p-md-12">
            <label className="p-ml-2">
              <strong> {t("typesOfDisability")} </strong>
            </label>
          </div>

          <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-6 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("onTheBasisOfNature")}
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="typeOfDisabilityByNature"
                  control={control}
                  rules={{ required: "Disability By Nature is required." }}
                  render={({ field, fieldState }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                      style={{ width: "100%" }}
                      options={disabilityByNatureList}
                      optionLabel={i18n.language == LANGUAGE.ENGLISH ? "engName" : "nepName"}
                      optionValue="value"
                    />
                  )}
                />
                {getFormErrorMessage("typeOfDisabilityByNature")}
              </div>
            </div>
            <div className="p-col-6 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("onTheBasisOfSeverity")}
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="typeOfDisabilityBySeverity"
                  control={control}
                  rules={{ required: "Disability By Severity is required." }}
                  render={({ field, fieldState }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                      style={{ width: "100%" }}
                      options={disabilityBySeverityList}
                      optionLabel={i18n.language == LANGUAGE.ENGLISH ? "engName" : "nepName"}
                      optionValue="value"
                    />
                  )}
                />
                {getFormErrorMessage("typeOfDisabilityBySeverity")}
              </div>
            </div>
          </div> */}

          {/* <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">
              <strong>{t("fatMotGaurdName")} </strong>
            </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="fatherMotherGaurdianNameEng"
                control={control}
                rules={{ required: "Name  is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder="English"
                  />
                )}
              />
              {getFormErrorMessage("fatherMotherGaurdianNameEng")}
            </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="fatherMotherGaurdianNameNep"
                control={control}
                rules={{ required: "Name is required." }}
                render={({ field, fieldState }) => (
                  <Nepali
                    funcname="unicodify"
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1 p-inputtext"
                    placeholder={t("nepali")}
                    valueChange={(e, value) => {
                      setValue("fatherMotherGaurdianNameNep", value);
                    }}
                  />
                )}
              />
              {getFormErrorMessage("fatherMotherGuardianNameNep")}
            </div>
          </div> */}

          <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-12">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("fatMotGaurdNameNep")} ({t("nepali")})<span style={{ color: "#d00000"}}> * </span>
              </div>
              <div className="p-field p-col-3 p-md-3 float-left">
                <Controller
                  name="fatherMotherGaurdianfNameNep"
                  control={control}
                  rules={{ required: "Name is required." }}
                  render={({ field, fieldState }) => (
                    <InputTextNepali
                      isName
                      convertToNepali
                      id={field.name}
                      {...field}
                      name="fatherMotherGaurdianfNameNep"
                      placeholder={t("fNameNep")}
                      value={getValues("fatherMotherGaurdianfNameNep")}
                      valueChange={(e, value) => {
                        setValue("fatherMotherGaurdianfNameNep", value);
                      }}
                    />
                  )}
                />
                {getFormErrorMessage("fatherMotherGaurdianfNameNep")}
              </div>
              <div className="p-field p-col-3 p-md-3 float-left">
                <Controller
                  name="fatherMotherGaurdianmNameNep"
                  control={control}
                  // rules={{ required: "Name is required." }}
                  render={({ field, fieldState }) => (
                    <InputTextNepali
                      isName
                      convertToNepali
                      id={field.name}
                      {...field}
                      name="fatherMotherGaurdianmNameNep"
                      placeholder={t("mNameNep")}
                      value={getValues("fatherMotherGaurdianmNameNep")}
                      valueChange={(e, value) => {
                        setValue("fatherMotherGaurdianmNameNep", value);
                      }}
                    />
                  )}
                />
                {getFormErrorMessage("fatherMotherGaurdianmNameNep")}
              </div>
              <div className="p-field p-col-3 p-md-3 float-left">
                <Controller
                  name="fatherMotherGaurdianlNameNep"
                  control={control}
                  rules={{ required: "Name is required." }}
                  render={({ field, fieldState }) => (
                    <InputTextNepali
                      isName
                      convertToNepali
                      id={field.name}
                      {...field}
                      name="fatherMotherGaurdianlNameNep"
                      placeholder={t("lNameNep")}
                      value={getValues("fatherMotherGaurdianlNameNep")}
                      valueChange={(e, value) => {
                        setValue("fatherMotherGaurdianlNameNep", value);
                      }}
                    />
                  )}
                />
                {getFormErrorMessage("fatherMotherGaurdianlNameNep")}
              </div>
            </div>
          </div>
          <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-12">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("fatMotGaurdName")} ({t("english")})<span style={{ color: "#d00000"}}> * </span>
              </div>
              <div className="p-field p-col-3 p-md-3 float-left">
                <Controller
                  name="fatherMotherGaurdianfNameEng"
                  control={control}
                  rules={{ required: "Name is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className="rounded-input p-mb-1"
                      placeholder={t("fNameEng")}
                    />
                  )}
                />
                {getFormErrorMessage("fatherMotherGaurdianfNameEng")}
              </div>
              <div className="p-field p-col-3 p-md-3 float-left">
                <Controller
                  name="fatherMotherGaurdianmNameEng"
                  control={control}
                  // rules={{ required: "Name is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className="rounded-input p-mb-1"
                      placeholder={t("mNameEng")}
                    />
                  )}
                />
                {getFormErrorMessage("fatherMotherGaurdianmNameEng")}
              </div>
              <div className="p-field p-col-3 p-md-3 float-left">
                <Controller
                  name="fatherMotherGaurdianlNameEng"
                  control={control}
                  rules={{ required: "Name is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className="rounded-input p-mb-1"
                      placeholder={t("lNameEng")}
                    />
                  )}
                />
                {getFormErrorMessage("fatherMotherGaurdianlNameEng")}
              </div>
            </div>
          </div>
          {/* <div className="p-field p-col-12 p-md-12 p-mt-3">
            <div className="p-field p-col-12 p-md-12 float-left">
              <strong>{t("signOfIdCardHolder")} </strong>
            </div>
            <div className="p-field p-col-6 p-md-6 float-left">
              .................................
            </div>
          </div> */}
          <div className="p-field p-col-12 p-md-12 float-left">
            <strong style={{ paddingLeft: "10px" }}>{t("approvedBy")} </strong>
          </div>

          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left main-label">{t("name")}<span style={{ color: "#d00000"}}> * </span></div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="nameEng"
                control={control}
                rules={{ required: "Name is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder="English"
                  />
                )}
              />
              {getFormErrorMessage("nameEng")}
            </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="nameNep"
                control={control}
                rules={{ required: "Name is required." }}
                render={({ field, fieldState }) => (
                  <InputTextNepali
                    isName
                    convertToNepali
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder="नेपाली"
                    valueChange={(e, value) => {
                      setValue("nameNep", value);
                    }}
                  />
                )}
              />
              {getFormErrorMessage("nameNep")}
            </div>
          </div>
          {/* <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left main-label">{t("signature")} :</div>
            <div class="p-field p-col-7 p-md-7 float-left">
              ................................................
            </div>
          </div> */}
          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left main-label">{t("designation")}<span style={{ color: "#d00000"}}> * </span> </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="designationEng"
                control={control}
                rules={{ required: "Designation is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder="English"
                  />
                )}
              />
              {getFormErrorMessage("designationEng")}
            </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="designationNep"
                control={control}
                rules={{ required: "Designation is required." }}
                render={({ field, fieldState }) => (
                  <InputTextNepali
                    isName
                    convertToNepali
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder="नेपाली"
                    valueChange={(e, value) => {
                      setValue("designationNep", value);
                    }}
                  />
                )}
              />
              {getFormErrorMessage("designationNep")}
            </div>
          </div>
          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left main-label">{t("issueDate")}<span style={{ color: "#d00000"}}> * </span> </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="dateNep"
                control={control}
                rules={{ required: "Nepali Date is required." }}
                render={({ field, fieldState }) => (
                  // <InputText
                  //   id={field.name}
                  //   {...field}
                  //   className="rounded-input p-mb-1"
                  //   placeholder={t("nepali")}
                  // />
                  <NepaliDatePicker
                    inputClassName="p-inputtext form-control"
                    className=""
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      setValue("dateEng", new Date(bsToAd(value)));
                    }}
                    options={{ calenderLocale: "ne", valueLocale: "en" }}
                  />
                )}
              />
              {getFormErrorMessage("dateNep")}
            </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="dateEng"
                control={control}
                rules={{ required: "English Date is required." }}
                render={({ field, fieldState }) => (
                  <Calendar
                    id={field.name}
                    value={field.value}
                    placeholder={t("select")}
                    onChange={(e) => {
                      field.onChange(moment(e.value).format("YYYY-MM-DD"));
                      setValue("dateNep", adToBs(moment(e.value).format("YYYY-MM-DD")).toString());
                    }}
                    style={{ width: "100%" }}
                    showIcon
                    showButtonBar
                    maxDate={new Date()}
                    dateFormat="yy-mm-dd"
                    monthNavigator
                    yearNavigator
                    yearRange="1900:2022"
                  />
                )}
              />
              {getFormErrorMessage("dateEng")}
            </div>

          </div>
          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-10 p-md-10 float-left">&nbsp;</div>
            <div class="p-field p-col-2 p-md-2 float-right">
              <Button
                style={{ background: "#4e70ae", color: "#FFF", justifyContent: "center" }}
              // onClick={() => idCardPage()}
              >
                {t("generate")}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
}

export default DisabilityIDCardForm;
