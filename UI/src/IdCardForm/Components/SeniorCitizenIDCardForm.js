import React, { useRef, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";

import Logo1 from "../../scafolding/assets/images/govLogo.png";
import { PhotoUpload } from "../Components/PhotoUpload.js";

import Address from "../../utilities/components/Address";
import Gender from "../../utilities/components/Gender";
import BloodGroup from "../../utilities/components/BloodGroup";
import Disease from "../../utilities/components/Disease";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import NameEnglish from "../../utilities/components/NameEnglish";
import NameNepali from "../../utilities/components/NameNepali";
import InputTextNepali from "../../utilities/components/InputText";
import Nepali from "nepalify-react";
import SeniorCitizenIdCardService from "../../IdCard/api/services/SeniorCitizenIdCardService";
import { Toast } from "primereact/toast";
import OrganizationService from "../../security/api/services/OrganizationService";
import { Dropdown } from "primereact/dropdown";
import { trackPromise } from "react-promise-tracker";

import i18n from "../../il8n/il8n";
import { FORM_MODE, ID_CATEGORY_NEPALI, LANGUAGE } from "../../utilities/constants/ITMISConstansts";
import OldIdExist from "../../utilities/components/oldIdExist";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import { englishToNepaliNumber, nepaliToEnglishNumber } from "nepali-number";
import { MultiSelect } from "primereact/multiselect";
function SeniorCitizenIDCardForm(props) {
  const { t } = useTranslation();
  const history = useHistory();
  const toast = useRef(null);

  const [availableConcessionList, setAvailableConcessionList] = useState([
    {
      engName: "Discount on medical expenses",
      value: "Discount_Medical_Expenses",
      nepName: "उपचार खर्चमा छुट",
    },
    {
      engName: "Discount on air service and car rental",
      value: "Discount_Air_Service_And_Car_Rental",
      nepName: "हवाई सेवा र गाडी भाडामा छुट ",
    },
    {
      engName: "Discount in air service and car seat",
      value: "Discount_Air_Service_And_Car_Seat",
      nepName: "हवाई सेवा र गाडी सीटमा  व्यवस्था  ",
    },
  ]);
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
    if (props.location.state && props.location.state.id) {
      SeniorCitizenIdCardService.getSeniorCitizenIdCardDetailsById(props.location.state.id).then(
        (response) => {
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

              province: response.data.data.seniorCitizenAddressDetails.province,
              district: response.data.data.seniorCitizenAddressDetails.district,
              municipality: response.data.data.seniorCitizenAddressDetails.municipality,
              wardNo: response.data.data.seniorCitizenAddressDetails.wardNo,
              age: response.data.data.age,
              citizenshipNo: response.data.data.citizenshipNo,
              nationalIdentificationNo: response.data.data.nationalIdentificationNo,
              gender: response.data.data.gender,
              // availableConcessionEng: response.data.data.availableConcessionEng,
              availableConcession:
                response.data.data.availableConcession[0] != "" &&
                  response.data.data.availableConcession != ""
                  ? response.data.data.availableConcession
                  : null,

              // availableConcessionNep: response.data.data.availableConcessionNep,
              husbandWifefNameEng: response.data.data.husbandWifefNameEng,
              husbandWifemNameNep: response.data.data.husbandWifemNameNep,
              husbandWifelNameNep: response.data.data.husbandWifelNameNep,
              husbandWifefNameNep: response.data.data.husbandWifefNameNep,
              husbandWifemNameEng: response.data.data.husbandWifemNameEng,
              husbandWifelNameEng: response.data.data.husbandWifelNameEng,
              careTakerSenCitHomeEng: response.data.data.careTakerSenCitHomeEng,
              careTakerSenCitHomeNep: response.data.data.careTakerSenCitHomeNep,
              contactPersonfNameEng: response.data.data.contactPersonfNameEng,
              contactPersonmNameEng: response.data.data.contactPersonmNameEng,
              contactPersonlNameEng: response.data.data.contactPersonlNameEng,
              contactPersonfNameNep: response.data.data.contactPersonfNameNep,
              contactPersonmNameNep: response.data.data.contactPersonmNameNep,
              contactPersonlNameNep: response.data.data.contactPersonlNameNep,
              bloodGroup: response.data.data.bloodGroup,
              nameOfDrugsEng: response.data.data.nameOfDrugsEng,
              nameOfDrugsNep: response.data.data.nameOfDrugsNep,
              pleaseSpDetails: response.data.data.pleaseSpDetails,
              disease: response.data.data.disease,
              nameEng: response.data.data.seniorCitizenApprovedDetails.nameEng,
              nameNep: response.data.data.seniorCitizenApprovedDetails.nameNep,
              designationEng: response.data.data.seniorCitizenApprovedDetails.designationEng,
              designationNep: response.data.data.seniorCitizenApprovedDetails.designationNep,
              officeEng: response.data.data.seniorCitizenApprovedDetails.officeEng,
              officeNep: response.data.data.seniorCitizenApprovedDetails.officeNep,
              oldPhoto: response.data.data.seniorCitizenIdCardPhotoInformation.fileData,
              oldIdPhoto: response.data.data.oldIdCardImage,
              dataStatus: FORM_MODE.UPDATE,
              nationalIdentificationNo: response.data.data.nationalIdentificationNo,
              idCardNoNepali: convertIdToNepali(response.data.data.id),
            });
          }
        }
      );
    }
  }, []);
  const idCardPage = (rowData) => {
    history.push({
      pathname: "/sims/senior-citizen-IDCard",
      state: {
        data: rowData,
      },
    });
  };

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
  });
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };
  const onSubmit = (data) => {
    let seniorCitizenAddressDetails = (({ province, district, municipality, wardNo }) => ({
      province,
      district,
      municipality,
      wardNo,
    }))(data);
    let seniorCitizenApprovedDetails = (({
      nameEng,
      nameNep,
      designationNep,
      designationEng,
      officeEng,
      officeNep,
    }) => ({ nameEng, nameNep, designationNep, designationEng, officeEng, officeNep }))(data);

    data.seniorCitizenAddressDetails = seniorCitizenAddressDetails;
    data.seniorCitizenApprovedDetails = seniorCitizenApprovedDetails;

    let formData = new FormData();
    if (data.oldIdCardImage != undefined) {
      formData.append("oldIdCardImage", data.oldIdCardImage);
      delete data.oldIdCardImage;
    }
    formData.append("oldIdCardImage", null);
    formData.append("idCardPhoto", data.idCardPhoto);
    delete data.idCardPhoto;
    formData.append("seniorCitizenIdCard", JSON.stringify(data));
    console.log("data", JSON.stringify(data));
    data.dataStatus == FORM_MODE.UPDATE
      ? trackPromise(
        SeniorCitizenIdCardService.updateSeniorCitizenIdCardService(formData)
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
        SeniorCitizenIdCardService.saveSeniorCitizenIdCardService(formData)
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
      );
  };
  return (
    <>
      <Toast ref={toast} />
      <Card style={{ margin: "16px", borderRadius: "8px" }}>
        <center>
          <Image src={Logo1} />
        </center>
        <center>
          {/* <h4 style={{ color: "#d00000", paddingTop: "0px" }}>
            {t("nepGov")} <br></br> {t("ministryOfWCS")}
          </h4> */}
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
            {t("seniorCitizenIdCard")}
          </Button>
        </center>
        <form className="p-grid p-fluid p-mt-3" onSubmit={handleSubmit(onSubmit)}>
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

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">{t("photo")} </div>
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
            <div className="p-col-6 p-md-4">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("age")}<span style={{ color: "#d00000" }}> * </span></div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="age"
                  control={control}
                  rules={
                    ({ required: "Age is required." },
                    {
                      min: {
                        value: 61,
                        message: "Age Should be greater than 60", // JS only: <p>error message</p> TS only support string
                      },
                    })
                  }
                  render={({ field, fieldState }) => (
                    <InputNumber
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                      placeholder={t("age")}
                      tooltip={t("age")}
                    />
                  )}
                />
                {getFormErrorMessage("age")}
              </div>
            </div>
            <div className="p-col-4 p-md-4  ">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("citizenshipNo")}<span style={{ color: "#d00000" }}> * </span>
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="citizenshipNo"
                  control={control}
                  rules={{ required: "Citizenship is required." }}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                  )}
                />
                {getFormErrorMessage("citizenshipNo")}
              </div>
            </div>
            <div className="p-col-3 p-md-4">
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
                {getFormErrorMessage("nationalIdentificationNo")}
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

          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left main-label">
              {t("availableConcession")}
            </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="availableConcession"
                control={control}
                //rules={{ required: "Available Concession is required." }}
                render={({ field, fieldState }) => (
                  // <InputText
                  //   id={field.name}
                  //   {...field}
                  //   className="rounded-input p-mb-1"
                  //   placeholder={t("english")}
                  // />
                  <MultiSelect
                    id={field.name}
                    value={field.value}
                    placeholder={t("select")}
                    onChange={(e) => {
                      field.onChange(e.value);
                    }}
                    style={{ width: "100%" }}
                    options={availableConcessionList}
                    optionLabel={i18n.language == LANGUAGE.ENGLISH ? "engName" : "nepName"}
                    optionValue="value"
                    display="chip"
                  />
                )}
              />
              {getFormErrorMessage("availableConcession")}
            </div>
            {/* <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="availableConcessionNep"
                control={control}
                rules={{ required: "Available Concession is required." }}
                render={({ field, fieldState }) => (
                  <Nepali
                    funcname="unicodify"
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder={t("nepali")}
                    valueChange={(e, value) => {
                      setValue("availableConcessionNep", value);
                    }}
                  />
                )}
              />
              {getFormErrorMessage("availableConcessionNep")}
            </div> */}
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">
              {t("husbandWifeName")} ({t("nepali")})<span style={{ color: "#d00000" }}> * </span>
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Controller
                name="husbandWifefNameNep"
                control={control}
                rules={{ required: "Husband Wife Name is required." }}
                render={({ field, fieldState }) => (
                  <InputTextNepali
                    isName
                    convertToNepali
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder={t("fNameNep")}
                    valueChange={(e, value) => {
                      setValue("husbandWifefNameNep", value);
                    }}
                  />
                )}
              />
              {getFormErrorMessage("husbandWifefNameNep")}
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Controller
                name="husbandWifemNameNep"
                control={control}
                // rules={{ required: "Husband Wife Name is required." }}
                render={({ field, fieldState }) => (
                  <InputTextNepali
                    isName
                    convertToNepali
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder={t("mName")}
                    valueChange={(e, value) => {
                      setValue("husbandWifemNameNep", value);
                    }}
                  />
                )}
              />
              {getFormErrorMessage("husbandWifemNameNep")}
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Controller
                name="husbandWifelNameNep"
                control={control}
                rules={{ required: "Husband Wife Name is required." }}
                render={({ field, fieldState }) => (
                  <InputTextNepali
                    isName
                    convertToNepali
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder={t("lNameNep")}
                    valueChange={(e, value) => {
                      setValue("husbandWifelNameNep", value);
                    }}
                  />
                )}
              />
              {getFormErrorMessage("husbandWifelNameNep")}
            </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">
              {t("husbandWifeName")} ({t("english")})<span style={{ color: "#d00000" }}> * </span>
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Controller
                name="husbandWifefNameEng"
                control={control}
                rules={{ required: "Husband Wife Name is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder={t("fNameEng")}
                  />
                )}
              />
              {getFormErrorMessage("husbandWifefNameEng")}
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Controller
                name="husbandWifemNameEng"
                control={control}
                //  rules={{ required: "Husband Wife Name is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder={t("mNameEng")}
                  />
                )}
              />
              {getFormErrorMessage("husbandWifemNameEng")}
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Controller
                name="husbandWifelNameEng"
                control={control}
                rules={{ required: "Husband Wife Name is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder={t("lNameEng")}
                  />
                )}
              />
              {getFormErrorMessage("husbandWifelNameEng")}
            </div>
          </div>

          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left main-label">
              {t("careTakerSenCitHome")}<span style={{ color: "#d00000" }}> * </span>
            </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="careTakerSenCitHomeEng"
                control={control}
                rules={{ required: "Care Taker is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder="English"
                  />
                )}
              />
              {getFormErrorMessage("careTakerSenCitHomeEng")}
            </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="careTakerSenCitHomeNep"
                control={control}
                rules={{ required: "Care Taker is required." }}
                render={({ field, fieldState }) => (
                  <InputTextNepali
                    isName
                    convertToNepali
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder="नेपाली"
                    valueChange={(e, value) => {
                      setValue("careTakerSenCitHomeNep", value);
                    }}
                  />
                )}
              />
              {getFormErrorMessage("careTakerSenCitHomeNep")}
            </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">
              {t("contactPersonSeniorCitizen")} ({t("nepali")})<span style={{ color: "#d00000" }}> * </span>
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Controller
                name="contactPersonfNameNep"
                control={control}
                rules={{ required: "Contact Person is required." }}
                render={({ field, fieldState }) => (
                  <InputTextNepali
                    isName
                    convertToNepali
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder={t("fNameNep")}
                    valueChange={(e, value) => {
                      setValue("contactPersonfNameNep", value);
                    }}
                  />
                )}
              />
              {getFormErrorMessage("contactPersonfNameNep")}
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Controller
                name="contactPersonmNameNep"
                control={control}
                //rules={{ required: "Contact Person is required." }}
                render={({ field, fieldState }) => (
                  <InputTextNepali
                    isName
                    convertToNepali
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder={t("mNameNep")}
                    valueChange={(e, value) => {
                      setValue("contactPersonmNameNep", value);
                    }}
                  />
                )}
              />
              {getFormErrorMessage("contactPersonmNameNep")}
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Controller
                name="contactPersonlNameNep"
                control={control}
                rules={{ required: "Contact Person Name is required." }}
                render={({ field, fieldState }) => (
                  <InputTextNepali
                    isName
                    convertToNepali
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder={t("lNameNep")}
                    valueChange={(e, value) => {
                      setValue("contactPersonlNameNep", value);
                    }}
                  />
                )}
              />
              {getFormErrorMessage("contactPersonlNameNep")}
            </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">
              {t("contactPersonSeniorCitizen")} ({t("english")})<span style={{ color: "#d00000" }}> * </span>
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Controller
                name="contactPersonfNameEng"
                control={control}
                rules={{ required: "Contact Person is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder={t("fNameEng")}
                  />
                )}
              />
              {getFormErrorMessage("contactPersonfNameEng")}
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Controller
                name="contactPersonmNameEng"
                control={control}
                //  rules={{ required: "Contact Person is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder={t("mNameEng")}
                  />
                )}
              />
              {getFormErrorMessage("contactPersonmNameEng")}
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Controller
                name="contactPersonlNameEng"
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
              {getFormErrorMessage("contactPersonlNameEng")}
            </div>
          </div>

          <BloodGroup
            register={register}
            error={errors}
            setValue={setValue}
            getValues={getValues}
          />

          {/* <Disease /> */}
          <Disease register={register} error={errors} setValue={setValue} getValues={getValues} />

          {/* <Controller
            name="disease"
            control={control}
            rules={{ required: "Disease is required." }}
            render={({ field, fieldState }) => (
              <Disease
                id={field.name}
                {...field}
                register={register}
                error={errors}
                onValueChange={(value) => {
                  setValue("disease", value);
                }}
                value={getValues("disease")}
                getValues={getValues}
              />
            )}
          />
          {getFormErrorMessage("disease")} */}

          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left main-label">{t("nameOfDrugs")} </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="nameOfDrugsEng"
                control={control}
                // rules={{ required: "Drug Name is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder="English"
                  />
                )}
              />
              {/* {getFormErrorMessage("nameOfDrugsEng")} */}
            </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="nameOfDrugsNep"
                control={control}
                // rules={{ required: "Drug Name is required." }}
                render={({ field, fieldState }) => (
                  <InputTextNepali
                    isName
                    convertToNepali
                    id={field.name}
                    {...field}
                    className="roundet p-mbd-inpu-1"
                    placeholder="नेपाली"
                    valueChange={(e, value) => {
                      setValue("nameOfDrugsNep", value);
                    }}
                  />
                )}
              />
              {/* {getFormErrorMessage("nameOfDrugsNep")} */}
            </div>
          </div>

          <div className="p-field p-col-12 p-md-12 float-left">
            <div className="p-field p-col-12 p-md-12 float-left" style={{ fontWeight: "bold" }}>
              {t("verifyingOfficer")}
            </div>
          </div>

          {/* <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left main-label">{t("signature")} </div>
            <div class="p-field p-col-7 p-md-7 float-left">
              ................................................
            </div>
          </div> */}
          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left main-label">{t("name")}<span style={{ color: "#d00000" }}> * </span></div>
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
          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left main-label">{t("designation")}<span style={{ color: "#d00000" }}> * </span> </div>
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
            <div class="p-field p-col-12 p-md-12 float-left main-label">{t("office")}<span style={{ color: "#d00000" }}> * </span> </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="officeEng"
                control={control}
                rules={{ required: "Value is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder="English"
                  />
                )}
              />
              {getFormErrorMessage("officeEng")}
            </div>
            <div class="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="officeNep"
                control={control}
                rules={{ required: "Value is required." }}
                render={({ field, fieldState }) => (
                  <InputText
                    id={field.name}
                    {...field}
                    className="rounded-input p-mb-1"
                    placeholder="नेपाली"
                  />
                )}
              />
              {getFormErrorMessage("officeNep")}
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

export default SeniorCitizenIDCardForm;
