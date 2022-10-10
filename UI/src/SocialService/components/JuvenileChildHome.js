import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { useHistory } from "react-router";

import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { Toast } from 'primereact/toast';

import { Accordion, AccordionTab } from "primereact/accordion";
import Name from "../../utilities/components/Name";
import Address from "../../utilities/components/Address";
import Gender from "../../utilities/components/Gender";
import AgeGroupForChild from "../../utilities/components/AgeGroupForChild";
import Caste from "../../utilities/components/Caste";
import Education from "../../utilities/components/Education";
import Disability from "../../utilities/components/Disability";
import Disease from "../../utilities/components/Disease";
import OrphanOrNot from "../../utilities/components/OrphanOrNot";
import Rehabilitation from "../../utilities/components/Rehabilitation";
import PhotoUpload from "../../IdCardForm/Components/PhotoUpload";

import TipDetailForm from "../../utilities/components/TipDetailForm";

import JuvenileChildHomeService from "../api/services/JuvenileChildHomeService";
import AddressService from "../../security/api/services/AddressService";

import { trackPromise } from "react-promise-tracker";
import { useTranslation } from "react-i18next";
import GbvViolence from "../../utilities/components/GbvViolence";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { LANGUAGE } from "../../utilities/constants/ITMISConstansts";
import i18n from "../../il8n/il8n";
import { MultiSelect } from "primereact/multiselect";
import HomeName from "../../utilities/components/HomeName";
import HomeAddress from "../../utilities/components/HomeAddress";

import UserService from "../../security/api/services/UserService";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import { InputNumber } from "primereact/inputnumber";

const JuvenialChildHome = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const location = useLocation();
  const [juvenileCorrectionHomeId, setJuvenileCorrectionHomeId] = useState();

  const [tipCase, setTipCase] = useState("No");
  const [gbvCase, setGbvCase] = useState("No");
  const [districtsList, setDistrictList] = useState([]);
  const [municipalitiesList, setMunicipalitiesList] = useState([]);
  const [investigationStatus, setInvestigationStatus] = useState();

  const [update, setUpdate] = useState(false);
  const [showBtn, setShowBtn] = useState("Yes");
  const [hideBtn, setHideBtn] = useState("No");

  const investigationStatusList = [
    { label: t("FIRReported"), value: 'FIR reported' },
    { label: t("caseInCourt"), value: 'Case in court' },
    { label: t("courtVerdictProvided"), value: 'Court Verdict Provided' },
    { label: t("compensationReceived"), value: 'Compensation Received' },
    { label: t("others"), value: 'Others' }
  ];

  const caseTypeList = [
    { label: t("lifeRelated"), value: 'Life' },
    { label: t("suicideRelated"), value: 'Suicide' },
    { label: t("theftRelated"), value: 'Theft' },
    { label: t("concerningOrganizedEconomicCrime"), value: 'Organized and economic Crime' },
    { label: t("socialCrime"), value: 'Social crime' },
    { label: t("womenChildrenRelated"), value: 'Women and children' },
    { label: t("transportRelated"), value: 'Transport' },
    { label: t("miscellaneous"), value: 'Miscellaneous' }
  ];
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm();
  const toast = useRef(null);
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  useEffect(() => {
    UserService.getUserLevel().then((response) => {
      if (response.data.data === USER_LEVEL.LOCAL_LEVEL) {
        setHideBtn("No");
      } else {
        setHideBtn("Yes");
      }
    });

    AddressService.getAllDistrict().then((response) => {
      console.log("district", response.data.data);
      setDistrictList(response.data.data);
    });

    let juvenileCorrectionHomeId = location.state ? location.state.juvenileCorrectionHomeId : "";
    console.log("juvenileCorrectionHomeId", juvenileCorrectionHomeId);
    setJuvenileCorrectionHomeId(juvenileCorrectionHomeId);
    if (juvenileCorrectionHomeId != "") {
      JuvenileChildHomeService.getById(juvenileCorrectionHomeId).then((response) => {
        console.log("response.data", response.data);
        if (response.data) {
          console.log("response.data", response.data);
          setJuvenileCorrectionHomeId(response.data.juvenileCorrectionHomeId);
          setTipCase(response.data.tipCase);
          setGbvCase(response.data.gbvCase);
          setInvestigationStatus(response.data.investigationStatus);
          setUpdate(true);
          (response.data.status === "Submit") ? setShowBtn("No") : setShowBtn("Yes");
          getMunicipalitiesList(response.data.birthCertificateIssuedDistrict);
          reset({
            homeName: response.data.homeName,
            homeProvince: parseInt(response.data.homeProvince),
            homeDistrict: parseInt(response.data.homeDistrict),
            homeMunicipality: parseInt(response.data.homeMunicipality),
            homeWardNo: parseInt(response.data.homeWardNo),
            firstName: response.data.firstName,
            middleName: response.data.middleName,
            lastName: response.data.lastName,
            birthCertificateNumber: response.data.birthCertificateNumber,
            birthCertificateIssuedDate: response.data.birthCertificateIssuedDate,
            birthCertificateIssuedDistrict: parseInt(response.data.birthCertificateIssuedDistrict),
            birthCertificateIssuedMunicipality: parseInt(response.data.birthCertificateIssuedMunicipality),
            province: parseInt(response.data.province),
            district: parseInt(response.data.district),
            municipality: parseInt(response.data.municipality),
            ward: parseInt(response.data.ward),
            gender: response.data.gender,
            age: response.data.age,
            caste: response.data.caste,
            educationLevel: response.data.educationLevel,
            disability: response.data.disability,
            typesOfDisability: response.data.typesOfDisability,
            disease: response.data.disease,
            diseaseDetail: response.data.diseaseDetail,

            caseType:
              response.data.caseType[0] != "" &&
                response.data.caseType != ""
                ? response.data.caseType
                : null,
            sentenced: response.data.sentenced,
            spentInJchFromDate: response.data.spentInJchFromDate,
            spentInJchToDate: response.data.spentInJchToDate,
            parentGuardian: response.data.parentGuardian,
            offenderType: response.data.offenderType,
            rehabilitation: response.data.rehabilitation,
            rehabilitatedTo: response.data.rehabilitatedTo,
            rehabilitatedToDetail: response.data.rehabilitatedToDetail,
            tipCase: response.data.tipCase,
            gbvCase: response.data.gbvCase,
            violenceType: response.data.violenceType,
            violenceTypeDetail: response.data.violenceTypeDetail,
            tipDetails: response.data.tipDetails,
            investigationStatus: response.data.investigationStatus,
            investigationStatusDetail: response.data.investigationStatusDetail,
            referralStatus: response.data.referralStatus
          });
        }
      });
    }
  }, []);

  const getMunicipalitiesList = (districtId) => {
    AddressService.getAllMunicipalitiessByDistrictId(districtId).then((response) => {
      setMunicipalitiesList(response.data.data);
    });
  };

  const saveData = (data) => {
    data.status = "Save";
    data.tipDetails == undefined ? (data.tipDetails = {}) : (data.tipDetails = data.tipDetails);
    console.log("data", data);

    if (update === false) {
      trackPromise(
        JuvenileChildHomeService.saveData(data).then((response) => {
          console.log("response", response);
          if (response.status == 200) {
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
      )
    } else {
      data.juvenileCorrectionHomeId = juvenileCorrectionHomeId;
      trackPromise(
        JuvenileChildHomeService.updateData(data).then((response) => {
          console.log("response", response);
          if (response.status == 200) {
            toast.current.show({
              severity: "success",
              summary: "Success Message",
              detail: "Update Successful",
              life: 3000,
            });
            window.location.reload(false);
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: "Update UnSuccessful",
              life: 3000,
            });
          }
        })
      );
    }
  };

  const submitData = (data) => {
    data.status = "Submit";
    data.tipDetails == undefined ? (data.tipDetails = {}) : (data.tipDetails = data.tipDetails);
    console.log("data", data);

    if (update === false) {
      trackPromise(
        JuvenileChildHomeService.saveData(data).then((response) => {
          console.log("response", response);
          if (response.status == 200) {
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
      )
    } else {
      data.juvenileCorrectionHomeId = juvenileCorrectionHomeId;
      trackPromise(
        JuvenileChildHomeService.updateData(data).then((response) => {
          console.log("response", response);
          if (response.status == 200) {
            toast.current.show({
              severity: "success",
              summary: "Success Message",
              detail: "Update Successful",
              life: 3000,
            });
            window.location.reload(false);
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: "Update UnSuccessful",
              life: 3000,
            });
          }
        })
      );
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className=" p-card-content">
          <h4 className="p-pt-0"> {t("juvenileChildHome")}  </h4>
        </div>
      </Card>
      <div className="p-grid p-col-12 p-md-12">
        <div className="p-field p-col-12 p-md-3">
          <Button className="box-shadow"
            style={{
              justifyContent: "center",
              background: "rgb(75 125 181)",
              color: "#FFF",
              width: '100%',
              minHeight: '30px',
              border: '4px solid rgb(208 0 0)',
            }}
            label={t("Indicator")}
            onClick={() =>
              history.push("/sims/juvenial-child-home-indicator")
            }
          />
        </div>
        <div className="p-field p-col-12 p-md-3">
          <Button className="box-shadow"
            style={{
              justifyContent: "center",
              background: "rgb(75 125 181)",
              color: "#FFF",
              width: '100%',
              minHeight: '30px',
              border: '4px solid rgb(208 0 0)',
            }}
            label={t("Case form")}
            disabled
            onClick={() =>
              history.push("/sims/juvenial-child-home")
            }
          />
        </div>
        <div className="p-field p-col-12 p-md-3">
          <Button className="box-shadow"
            style={{
              justifyContent: "center",
              background: "rgb(75 125 181)",
              color: "#FFF",
              width: '100%',
              minHeight: '30px',
              border: '4px solid rgb(208 0 0)',
            }}
            label={t("Case form List")}
            onClick={() =>
              history.push("/sims/juvenile-child-home-list")
            }
          />
        </div>
      </div>

      <Card className="p-mt-0">
        <form className="p-grid p-fluid ">
          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 ">
              <h5 className="HeadingTitle">
                {t("homeDetails")}
              </h5>
            </div>
          </div>
          <HomeName register={register} error={errors} setValue={setValue} getValues={getValues} />
          <HomeAddress register={register} error={errors} setValue={setValue} getValues={getValues} />

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 ">
              <h5 className="HeadingTitle">
                {t("personalDetails")}
              </h5>
            </div>
          </div>
          <Name register={register} error={errors} setValue={setValue} getValues={getValues} />
          {/* <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">{t("photo")} </div>
            <div className="p-field p-col-6 p-md-6 float-left p-mr-3">
              <PhotoUpload />
            </div>
          </div> */}
          <div className="p-grid p-col-12 p-md-12">
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("birthCertificateNo")}</div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="birthCertificateNumber"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
              </div>
            </div>
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("birthCertIssueDate")} </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="birthCertificateIssuedDate"
                  control={control}
                  render={({ field, fieldState }) => (
                    // <InputMask
                    //   id={field.name}
                    //   mask="9999-99-99"
                    //   {...field}
                    //   className={classNames({
                    //     "p-invalid": fieldState.invalid,
                    //   })}
                    // />
                    <NepaliDatePicker
                      inputClassName="p-inputtext form-control"
                      className=""
                      value={field.value}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      options={{ calenderLocale: "en", valueLocale: "en" }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">{t("birthCertIssuePlace")} </div>
            <div className="p-field p-col-12 p-md-6 float-left">
              <Controller
                name="birthCertificateIssuedDistrict"
                control={control}
                render={({ field, fieldState }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    placeholder={t("select")}
                    onChange={(e) => {
                      field.onChange(e.value);
                      getMunicipalitiesList(e.value);
                    }}
                    style={{ width: "100%" }}
                    options={districtsList}
                    optionLabel={
                      i18n.language == LANGUAGE.ENGLISH ? "districtDescEng" : "districtDescNep"
                    }
                    optionValue="id"
                  />
                )}
              />
            </div>
            <div className="p-field p-col-12 p-md-6 float-left">
              <Controller
                name="birthCertificateIssuedMunicipality"
                control={control}
                render={({ field, fieldState }) => (
                  <Dropdown
                    id={field.name}
                    value={field.value}
                    placeholder={t("select")}
                    onChange={(e) => {
                      field.onChange(e.value);
                    }}
                    style={{ width: "100%" }}
                    options={municipalitiesList}
                    optionLabel={
                      i18n.language == LANGUAGE.ENGLISH ? "municipalityDescEng" : "municipalityDescNep"
                    }
                    optionValue="id"
                  />
                )}
              />
            </div>
          </div>
          <Address register={register} error={errors} setValue={setValue} getValues={getValues} />
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

          {/* <Controller
            name="ageGroup"
            control={control}
            rules={{ required: "Age Group is required." }}
            render={({ field, fieldState }) => (
              <AgeGroupForChild
                id={field.name}
                {...field}
                onValueChange={(value) => {
                  setValue("ageGroup", value);
                }}
                value={getValues("ageGroup")}
                getValues={getValues}
              />
            )}
          />
          <div className="p-field p-col-12 p-md-12 ">
            {getFormErrorMessage("ageGroup")}
          </div> */}
          <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("age")}<span style={{ color: "#d00000"}}> * </span></div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="age"
                  control={control}
                  rules={{ required: "Age is required." }}
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
                      min="0"
                      max="18"
                    />
                  )}
                />
                {getFormErrorMessage("age")}
              </div>
            </div>
          </div>

          <Controller
            name="caste"
            control={control}
            rules={{ required: "Caste is required." }}
            render={({ field, fieldState }) => (
              <Caste
                id={field.name}
                {...field}
                onValueChange={(value) => {
                  setValue("caste", value);
                }}
                value={getValues("caste")}
                getValues={getValues}
              />
            )}
          />
          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left">
              {getFormErrorMessage("caste")}
            </div>
          </div>

          <Education register={register} error={errors} setValue={setValue} getValues={getValues} />
          <Disability register={register} error={errors} setValue={setValue} getValues={getValues} />

          <Disease
            register={register}
            error={errors}
            setValue={setValue}
            getValues={getValues}
          />
          {/* <div className="p-field p-col-12 p-md-12 ">
            {getFormErrorMessage("disease")}
          </div> */}

          <div className="p-grid p-col-12 p-md-12">
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("typeOfCase")} </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="caseType"
                  control={control}
                  render={({ field, fieldState }) => (
                    <MultiSelect
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                      style={{ width: "100%" }}
                      options={caseTypeList}
                    />
                  )}
                />
              </div>
            </div>
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("sentenced")} </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="sentenced"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">{t("timeSpentAtJCH")} </div>
            <div className="p-field p-col-12 p-md-6 float-left">
              <Controller
                name="spentInJchFromDate"
                control={control}
                render={({ field, fieldState }) => (
                  // <InputMask
                  //   id={field.name}
                  //   mask="9999-99-99"
                  //   {...field}
                  //   className={classNames({
                  //     "p-invalid": fieldState.invalid,
                  //   })}
                  //   placeholder={t("fromDate")}
                  // />
                  <NepaliDatePicker
                    inputClassName="p-inputtext form-control"
                    className=""
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    options={{ calenderLocale: "en", valueLocale: "en" }}
                  />
                )}
              />
            </div>
            <div className="p-field p-col-12 p-md-6 float-left main-label">
              <Controller
                name="spentInJchToDate"
                control={control}
                render={({ field, fieldState }) => (
                  // <InputMask
                  //   id={field.name}
                  //   mask="9999-99-99"
                  //   {...field}
                  //   className={classNames({
                  //     "p-invalid": fieldState.invalid,
                  //   })}
                  //   placeholder={t("toDate")}
                  // />

                  <NepaliDatePicker
                    inputClassName="p-inputtext form-control"
                    className=""
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    options={{ calenderLocale: "en", valueLocale: "en" }}
                  />
                )}
              />
            </div>
          </div>

          <Controller
            name="parentGuardian"
            control={control}
            //rules={{ required: "Parent/Guardian is required." }}
            render={({ field, fieldState }) => (
              <OrphanOrNot
                id={field.name}
                {...field}
                onValueChange={(value) => {
                  setValue("parentGuardian", value);
                }}
                value={getValues("parentGuardian")}
                getValues={getValues}
              />
            )}
          />
          <div className="p-field p-col-12 p-md-12 ">
            {getFormErrorMessage("parentGuardian")}
          </div>

          <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("offenderType")} </div>
              <Controller
                name="offenderType"
                control={control}
                // rules={{ required: "Offender Type is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="Habitual"
                        name="Habitual"
                        onChange={(e) => field.onChange(e.value)}
                        checked={field.value === "Habitual"} /> {t("habitual")}
                    </div>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="One Time"
                        name="One Time"
                        onChange={(e) => field.onChange(e.value)}
                        checked={field.value === "One Time"} /> {t("oneTime")}
                    </div>
                  </>
                )}
              />
              {getFormErrorMessage("offenderType")}
            </div>
          </div>

          <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label"> {t("tipCase")}<span style={{ color: "#d00000"}}> * </span></div>
              <Controller
                name="tipCase"
                control={control}
                rules={{ required: "TIP case is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="Yes"
                        name="Yes"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setTipCase(e.value);
                        }}
                        checked={field.value === "Yes"} /> {t("ho")}
                    </div>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="No"
                        name="No"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setTipCase(e.value);
                        }}
                        checked={field.value === "No"} /> {t("haina")}
                    </div>
                  </>
                )}
              />
              {getFormErrorMessage("tipCase")}
            </div>
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("gbvCase")}<span style={{ color: "#d00000"}}> * </span>
              </div>
              <Controller
                name="gbvCase"
                control={control}
                rules={{ required: "GBV case is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="Yes"
                        name="Yes"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setGbvCase(e.value);
                        }}
                        checked={field.value === "Yes"} /> {t("ho")}
                    </div>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="No"
                        name="No"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setGbvCase(e.value);
                        }}
                        checked={field.value === "No"} /> {t("haina")}
                    </div>
                  </>
                )}
              />
              {getFormErrorMessage("gbvCase")}
            </div>
          </div>

          {tipCase === "Yes" ? (
            <div className="p-field p-col-12 p-md-12">
              <div className="accordion-demo">
                <div className="card">
                  <Accordion activeIndex={0}>
                    <AccordionTab
                      header={
                        <React.Fragment>
                          <span>{t("tipCase")}</span>
                        </React.Fragment>
                      }
                    >
                      <TipDetailForm register={register} error={errors} setValue={setValue} getValues={getValues} />
                    </AccordionTab>
                  </Accordion>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {gbvCase === "Yes" ? (
            <div className="p-field p-col-12 p-md-12">
              <div className="accordion-demo">
                <div className="card">
                  <Accordion activeIndex={0}>
                    <AccordionTab
                      header={
                        <React.Fragment>
                          <span> {t("gbvInformation")}</span>
                        </React.Fragment>
                      }
                    >
                      <GbvViolence register={register} error={errors} setValue={setValue} getValues={getValues} />
                    </AccordionTab>
                  </Accordion>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="p-field p-col-12 p-md-12 ">
            <h3 style={{ textAlign: "center" }}>{t("rehabilitationSection")}</h3>
          </div>
          <Rehabilitation register={register} error={errors} setValue={setValue} getValues={getValues} />

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">
              <h3 class="HeadingTitle p-pt-0"> {t("caseStatus")}</h3>
            </div>
          </div>

          <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("investigationStatus")}
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="investigationStatus"
                  control={control}
                  //    rules={{ required: "Investigation Status is required." }}
                  render={({ field, fieldState }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                        setInvestigationStatus(e.value);
                      }}
                      style={{ width: "100%" }}
                      options={investigationStatusList}
                    />
                  )}
                />
                {getFormErrorMessage("investigationStatus")}
              </div>
            </div>
            {investigationStatus === "Others" ? (
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("pleaseSpDetails")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="investigationStatusDetail"
                    control={control}
                    // rules={{ required: "Investigation Status Detail is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })} />
                    )}
                  />
                  {getFormErrorMessage("investigationStatusDetail")}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">
              {t("referralStatus")}
            </div>
            <div className="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="referralStatus"
                control={control}
                // rules={{ required: "Referral Status Detail is required." }}
                render={({ field, fieldState }) => (
                  <InputText id={field.name}
                    {...field}
                    className={classNames({
                      "p-invalid": fieldState.invalid,
                    })} />
                )}
              />
              {getFormErrorMessage("referralStatus")}
            </div>
          </div>


          {hideBtn === "No" ? (
            <>
              {showBtn === "Yes" ? (
                <div className="p-grid p-col-12 p-md-12">

                  <div className="p-col-12 p-md-8"></div>
                  <div className="p-col-12 p-md-2">
                    <Button label={t("save")}
                      className="p-button-sm pull-right submitBtn"
                      onClick={handleSubmit(saveData)} />
                  </div>
                  <div className="p-col-12 p-md-2">
                    <Button label={t("submit")}
                      className="p-button-sm pull-right submitBtn"
                      onClick={handleSubmit(submitData)} />
                  </div>
                </div>
              ) :
                <></>
              }</>
          ) : (
            <></>
          )}
        </form>
      </Card>
    </>
  );
};

export default JuvenialChildHome;
