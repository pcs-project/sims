import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { InputMask } from 'primereact/inputmask';
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { useHistory } from "react-router";

import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';

import { Accordion, AccordionTab } from "primereact/accordion";
import Name from "../../utilities/components/Name";
import PermanentAddress from "../../utilities/components/PermanentAddress";
import RescuedFromAddress from "../../utilities/components/RescuedFromAddress";
import Gender from "../../utilities/components/Gender";
import AgeGroup from "../../utilities/components/AgeGroup";
import Caste from "../../utilities/components/Caste";
import Education from "../../utilities/components/Education";
import NoOfChildren from "../../utilities/components/NoOfChildren";
import Occupation from "../../utilities/components/Occupation";
import MaritalStatus from "../../utilities/components/MaritalStatus";
import Disability from "../../utilities/components/Disability";
import TipDetailForm from "../../utilities/components/TipDetailForm";

import ShelterHomeCaseService from "../api/services/ShelterHomeCaseService";

import { useTranslation } from "react-i18next";
import { trackPromise } from "react-promise-tracker";
import GbvViolence from "../../utilities/components/GbvViolence";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import HomeName from "../../utilities/components/HomeName";
import HomeAddress from "../../utilities/components/HomeAddress";

import UserService from "../../security/api/services/UserService";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import { InputNumber } from "primereact/inputnumber";

const ShelterHome = () => {
  const { t } = useTranslation();
  const [tipCase, setTipCase] = useState("No");
  const [gbvCase, setGbvCase] = useState("No");
  const history = useHistory();

  const caseTypeList = [
    { label: t("gbv"), value: "GBV" },
    { label: t("forcedLabour"), value: "Forced Labour" },
    { label: t("childLabour"), value: "Child Labour" },
    { label: t("domesticViolence"), value: "Domestic Violence" },
    { label: t("rape"), value: "Rape" },
    { label: t("others"), value: "Others" },
  ];
  const rescuedShelterServiceList = [
    { label: t("accommodation"), value: "Accomodation" },
    { label: t("food"), value: "Food" },
    { label: t("psychoSocialCounseling"), value: "Psycho-Social Counseling" },
    { label: t("travelCostToShelter"), value: "Travel cost to Shelter" },
    { label: t("travelCostToHome"), value: "Travel cost to Home" },
  ];
  const vulnerableShelterServiceList = [
    { label: t("medical"), value: "Medical" },
    { label: t("health"), value: "Health" },
    { label: t("legalAid"), value: "Legal-aid" },
    { label: t("psychoSocialCounseling"), value: "Psychosocial Counselling" },
    { label: t("skillTraining"), value: "Skill trainings" },
    { label: t("others"), value: "Others" },
  ];
  const suspectsList = [
    { label: t("completeStranger"), value: "Complete Stranger" },
    { label: t("friendsOfFriendsRelatives"), value: "Friends of friends/Relatives" },
    { label: t("friendsOrRelatives"), value: "Friends or Relatives" },
    { label: t("veryCloseRelatives"), value: "Very Close Relatives" },
    { label: t("employer"), value: "Employer" },
    { label: t("neighbour"), value: "Neighbour" },
    { label: t("others"), value: "Others" },
  ];
  const reasonLeavingHomeList = [
    { label: t("prospectOfAJob"), value: "Prospect of a Job" },
    { label: t("escapeThreatViolenceAbuse"), value: "Escape Threat/Violence/Abuse" },
    { label: t("coercionForceDebtBondage"), value: "Coercion/Force/Debt bondage" },
    { label: t("promiseOfBetterLifestyle"), value: "Promise of better lifestyle" },
    { label: t("others"), value: "Others" },
  ];
  const [rescuedCaseType, setRescuedCaseType] = useState();
  const [rescuedOrNot, setRescuedOrNot] = useState("No");
  const [shelterHomeCaseId, setShelterHomeCaseId] = useState();

  const [update, setUpdate] = useState(false);
  const [showBtn, setShowBtn] = useState("Yes");
  const [hideBtn, setHideBtn] = useState("No");

  const location = useLocation();
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

    let shelterHomeCaseId = location.state ? location.state.shelterHomeCaseId : "";
    console.log("shelterHomeCaseId", shelterHomeCaseId);
    setShelterHomeCaseId(shelterHomeCaseId);
    if (shelterHomeCaseId != "") {
      ShelterHomeCaseService.getById(shelterHomeCaseId).then((response) => {
        console.log("response.data", response.data);
        if (response.data) {
          console.log("response.data", response.data);
          setShelterHomeCaseId(response.data.shelterHomeCaseId);
          setRescuedCaseType(response.data.rescuedCaseType);
          setRescuedOrNot(response.data.rescuedByCase);
          setTipCase(response.data.tipCase);
          setGbvCase(response.data.gbvCase);
          setUpdate(true);
          (response.data.status === "Submit") ? setShowBtn("No") : setShowBtn("Yes");
          reset({
            homeName: response.data.homeName,
            homeProvince: parseInt(response.data.homeProvince),
            homeDistrict: parseInt(response.data.homeDistrict),
            homeMunicipality: parseInt(response.data.homeMunicipality),
            homeWardNo: parseInt(response.data.homeWardNo),
            firstName: response.data.firstName,
            middleName: response.data.middleName,
            lastName: response.data.lastName,
            permanentProvince: parseInt(response.data.permanentProvince),
            permanentDistrict: parseInt(response.data.permanentDistrict),
            permanentMunicipality: parseInt(response.data.permanentMunicipality),
            permanentWardNo: parseInt(response.data.permanentWardNo),
            gender: response.data.gender,
            age: response.data.age,
            caste: response.data.caste,
            disability: response.data.disability,
            typesOfDisability: response.data.typesOfDisability,
            educationLevel: response.data.educationLevel,
            maritalStatus: response.data.maritalStatus,
            noOfSon: response.data.noOfSon,
            noOfDaughter: response.data.noOfDaughter,
            occupation: response.data.occupation,
            yearsOfExperience: response.data.yearsOfExperience,
            rescuedFromProvince: parseInt(response.data.rescuedFromProvince),
            rescuedFromDistrict: parseInt(response.data.rescuedFromDistrict),
            rescuedFromMunicipality: parseInt(response.data.rescuedFromMunicipality),
            rescuedFromWardNo: parseInt(response.data.rescuedFromWardNo),
            rescuedByName: response.data.rescuedByName,
            rescuedByOrganization: response.data.rescuedByOrganization,
            rescuedByCase: response.data.rescuedByCase,
            dateOfEntry: response.data.dateOfEntry,
            dateOfExit: response.data.dateOfExit,
            period: response.data.period,
            rescuedShelterService: response.data.rescuedShelterService,
            rescuedCaseType: response.data.rescuedCaseType,
            vulnerableShelterService: response.data.vulnerableShelterService,
            suspects: response.data.suspects,
            reasonForLeavingHome: response.data.reasonForLeavingHome,
            serviceProvider: response.data.serviceProvider,
            physicalState: response.data.physicalState,
            mentalStatus: response.data.mentalStatus,
            vulnerableCase: response.data.vulnerableCase,
            violenceType: response.data.violenceType,
            violenceTypeDetail: response.data.violenceTypeDetail,
            tipCase: response.data.tipCase,
            gbvCase: response.data.gbvCase,
            tipDetails: response.data.tipDetails
          });
        }
      });
    }
  }, []);

  const saveData = (data) => {
    data.status = "Save";
    data.tipDetails == undefined ? (data.tipDetails = {}) : (data.tipDetails = data.tipDetails);
    console.log("data", data);

    if (update === false) {
      trackPromise(
        ShelterHomeCaseService.saveData(data).then((response) => {
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
      data.shelterHomeCaseId = shelterHomeCaseId;
      trackPromise(
        ShelterHomeCaseService.updateData(data).then((response) => {
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
        ShelterHomeCaseService.saveData(data).then((response) => {
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
      data.shelterHomeCaseId = shelterHomeCaseId;
      trackPromise(
        ShelterHomeCaseService.updateData(data).then((response) => {
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
          <h4 className="p-pt-0"> {t("shelterHomeSewaKendra")} </h4>
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
            label={t("Shelter Home Indicator")}
            onClick={() =>
              history.push("/sims/shelter-home-indicator")
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
            label={t("Sewa Kendra Indicator")}
            onClick={() =>
              history.push("/sims/sewa-kendra-indicator")
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
              history.push("/sims/shelter-home-list")
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

          <PermanentAddress register={register} error={errors} setValue={setValue} getValues={getValues} />

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
              <AgeGroup
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
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("age")}</div>
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

          <MaritalStatus register={register} error={errors} setValue={setValue} getValues={getValues} />
          <NoOfChildren register={register} error={errors} setValue={setValue} getValues={getValues} />
          <Occupation register={register} error={errors} setValue={setValue} getValues={getValues} />


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

          {tipCase === "Yes" ? <>
            <div className="p-field p-col-12 p-md-12 ">
              <h3 style={{ textAlign: "center" }}>{t("rescuedFrom")}</h3>
            </div>
            <RescuedFromAddress register={register} error={errors} setValue={setValue} getValues={getValues} />

            <div className="p-field p-col-12 p-md-12 ">
              <h3 style={{ textAlign: "center" }}>{t("rescuedBy")}</h3>
            </div>
            <div className="p-grid p-col-12 p-md-12 ">
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">{t("name")} </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="rescuedByName"
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
                <div className="p-field p-col-12 p-md-12 float-left main-label">{t("organization")} </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="rescuedByOrganization"
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
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("case")} </div>
              <Controller
                name="rescuedByCase"
                control={control}
                // rules={{ required: "Case is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="p-field p-col-4 p-md-4 float-left">
                      <RadioButton value="Rescued"
                        name="Rescued"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setRescuedOrNot(e.value)
                        }}
                        checked={field.value === "Rescued"} /> {t("rescued")}
                    </div>
                    <div className="p-field p-col-4 p-md-4 float-left">
                      <RadioButton value="Vulnerable"
                        name="Vulnerable"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setRescuedOrNot(e.value)
                        }}
                        checked={field.value === "Vulnerable"} /> {t("vulnerable")}
                    </div>
                  </>
                )}
              />
            </div>
            {rescuedOrNot === "Rescued" ? (
              <>
                <div className="p-field p-col-12 p-md-12 ">
                  <h3 style={{ textAlign: "center" }}>{t("inCaseOfRescued")}</h3>
                </div>

                <div className="p-grid p-col-12 p-md-12 ">
                  <div className="p-col-12 p-md-6">
                    <div className="p-field p-col-12 p-md-12 float-left main-label">{t("dateOfEntry")} :</div>
                    <div className="p-field p-col-12 p-md-12 float-left">
                      <Controller
                        name="dateOfEntry"
                        control={control}
                        render={({ field, fieldState }) => (
                          // <InputMask
                          //   id={field.name}
                          //   mask="9999-99-99"
                          //   {...field}
                          //   className={classNames({
                          //     "p-invalid": fieldState.invalid,
                          //   })}
                          //   placeholder={t("dateFormat")}
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
                  <div className="p-col-12 p-md-6">
                    <div className="p-field p-col-12 p-md-12 float-left main-label">{t("dateOfExit")} :</div>
                    <div className="p-field p-col-12 p-md-12 float-left">
                      <Controller
                        name="dateOfExit"
                        control={control}
                        render={({ field, fieldState }) => (
                          // <InputMask
                          //   id={field.name}
                          //   mask="9999-99-99"
                          //   {...field}
                          //   className={classNames({
                          //     "p-invalid": fieldState.invalid,
                          //   })}
                          //   placeholder={t("dateFormat")}
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

                <div className="p-grid p-col-12 p-md-12 ">
                  <div className="p-col-12 p-md-6">
                    <div className="p-field p-col-12 p-md-12 float-left main-label">{t("period")} :</div>
                    <div className="p-field p-col-12 p-md-10 float-left">
                      <Controller
                        name="period"
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
                    <div className="p-field p-col-12 p-md-2 float-left">{t("weeks")}</div>
                  </div>

                  <div className="p-col-12 p-md-6">
                    <div className="p-field p-col-12 p-md-12 float-left main-label">
                      {t("typesOfShelterServiceReceived")} :
                    </div>
                    <div className="p-field p-col-12 p-md-12 float-left">
                      <Controller
                        name="rescuedShelterService"
                        control={control}
                        //    rules={{ required: "Rescued Shelter Service is required." }}
                        render={({ field, fieldState }) => (
                          <Dropdown
                            id={field.name}
                            value={field.value}
                            placeholder={t("select")}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            style={{ width: "100%" }}
                            options={rescuedShelterServiceList}
                          />
                        )}
                      />
                      {getFormErrorMessage("rescuedShelterService")}
                    </div>
                  </div>
                </div>
                <div className="p-field p-col-12 p-md-12 ">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">{t("typesOfCases")} :</div>
                  <div className="p-field p-col-12 p-md-6 float-left">
                    <Controller
                      name="rescuedCaseType"
                      control={control}
                      //    rules={{ required: "Rescued Case Type is required." }}
                      render={({ field, fieldState }) => (
                        <Dropdown
                          id={field.name}
                          value={field.value}
                          placeholder={t("select")}
                          onChange={(e) => {
                            field.onChange(e.value);
                            setRescuedCaseType(e.value);
                          }}
                          style={{ width: "100%" }}
                          options={caseTypeList}
                        />
                      )}
                    />
                    {getFormErrorMessage("rescuedCaseType")}
                  </div>
                </div>

                {/* {rescuedCaseType === "TIP" ? (
                  <div className="p-field p-col-12 p-md-12">
                    <div className="accordion-demo">
                      <div className="card">
                        <Accordion activeIndex={0}>
                          <AccordionTab
                            header={
                              <React.Fragment>
                                <span>{t("tipInformation")}</span>
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
                )} */}


                {/* {rescuedCaseType === "GBV" ? (
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
                )} */}
              </>
            ) : (
              <></>
            )}


            {rescuedOrNot === "Vulnerable" ? (
              <>

                <div className="p-field p-col-12 p-md-12 ">
                  <h3 style={{ textAlign: "center" }}>{t("inCaseOfVulnerable")}</h3>
                </div>

                <div className="p-grid p-col-12 p-md-12 ">
                  <div className="p-col-12 p-md-6">
                    <div className="p-field p-col-12 p-md-12 float-left main-label">
                      {t("typesOfShelterServiceReceived")} :
                    </div>
                    <div className="p-field p-col-12 p-md-12 float-left">
                      <Controller
                        name="vulnerableShelterService"
                        control={control}
                        //    rules={{ required: "Vulnerable Shelter Service is required." }}
                        render={({ field, fieldState }) => (
                          <Dropdown
                            id={field.name}
                            value={field.value}
                            placeholder={t("select")}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            style={{ width: "100%" }}
                            options={vulnerableShelterServiceList}
                          />
                        )}
                      />
                      {getFormErrorMessage("vulnerableShelterService")}
                    </div>
                  </div>
                  <div className="p-col-12 p-md-6">
                    <div className="p-field p-col-12 p-md-12 float-left">{t("suspects")} :</div>
                    <div className="p-field p-col-12 p-md-12 float-left">
                      <Controller
                        name="suspects"
                        control={control}
                        //    rules={{ required: "Suspects is required." }}
                        render={({ field, fieldState }) => (
                          <Dropdown
                            id={field.name}
                            value={field.value}
                            placeholder={t("select")}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            style={{ width: "100%" }}
                            options={suspectsList}
                          />
                        )}
                      />
                      {getFormErrorMessage("suspects")}
                    </div>
                  </div>
                </div>
                <div className="p-grid p-col-12 p-md-12 ">
                  <div className="p-col-12 p-md-6">
                    <div className="p-field p-col-12 p-md-12 float-left main-label">{t("reasonLeavingHome")} :</div>
                    <div className="p-field p-col-12 p-md-12 float-left">
                      <Controller
                        name="reasonForLeavingHome"
                        control={control}
                        //    rules={{ required: "Reason For Leaving Home is required." }}
                        render={({ field, fieldState }) => (
                          <Dropdown
                            id={field.name}
                            value={field.value}
                            placeholder={t("select")}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            style={{ width: "100%" }}
                            options={reasonLeavingHomeList}
                          />
                        )}
                      />
                      {getFormErrorMessage("reasonForLeavingHome")}
                    </div>
                  </div>
                  <div className="p-col-12 p-md-6">
                    <div className="p-field p-col-12 p-md-12 float-left main-label">{t("serviceProvider")} :</div>
                    <div className="p-field p-col-12 p-md-12 float-left">
                      <Controller
                        name="serviceProvider"
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

                <div className="p-grid p-col-12 p-md-12 ">
                  <div className="p-col-12 p-md-6">
                    <div className="p-field p-col-12 p-md-12 float-left main-label">{t("physicalState")} :</div>
                    <div className="p-field p-col-12 p-md-12 float-left">
                      <Controller
                        name="physicalState"
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
                    <div className="p-field p-col-12 p-md-12 float-left main-label">{t("mentalStatus")} :</div>
                    <div className="p-field p-col-12 p-md-12 float-left">
                      <Controller
                        name="mentalStatus"
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
                  <div className="p-field p-col-12 p-md-12 float-left main-label">{t("case")} </div>
                  <Controller
                    name="vulnerableCase"
                    control={control}
                    // rules={{ required: "Vulnerable Case is required." }}
                    render={({ field, fieldState }) => (
                      <>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <RadioButton value="Identified"
                            name="Identified"
                            onChange={(e) => field.onChange(e.value)}
                            checked={field.value === "Identified"} /> {t("identified")}
                        </div>
                        <div className="p-field p-col-3 p-md-3 float-left">
                          <RadioButton value="Suspected"
                            name="Suspected"
                            onChange={(e) => field.onChange(e.value)}
                            checked={field.value === "Suspected"} /> {t("suspected")}
                        </div>
                        <div className="p-field p-col-3 p-md-3 float-left">
                          <RadioButton value="Rescued"
                            name="Rescued"
                            onChange={(e) => field.onChange(e.value)}
                            checked={field.value === "Rescued"} /> {t("rescued")}
                        </div>
                      </>
                    )}
                  />
                  {getFormErrorMessage("vulnerableCase")}
                </div>
              </>
            ) : (
              <></>
            )}


            <div className="p-field p-col-12 p-md-12">
              <div className="accordion-demo">
                <div className="card">
                  <Accordion activeIndex={0}>
                    <AccordionTab
                      header={
                        <React.Fragment>
                          <span>{t("tipInformation")}</span>
                        </React.Fragment>
                      }
                    >
                      <TipDetailForm register={register} error={errors} setValue={setValue} getValues={getValues} />
                    </AccordionTab>
                  </Accordion>
                </div>
              </div>
            </div>
          </> :
            <></>
          }

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

export default ShelterHome;
