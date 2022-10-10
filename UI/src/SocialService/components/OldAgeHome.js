import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { useHistory } from "react-router";

import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { Toast } from 'primereact/toast';

import Name from "../../utilities/components/Name";
import Address from "../../utilities/components/Address";
import Gender from "../../utilities/components/Gender";
import AgeGroupForOld from "../../utilities/components/AgeGroupForOld";
import Education from "../../utilities/components/Education";
import Caste from "../../utilities/components/Caste";
import Disability from "../../utilities/components/Disability";
import Disease from "../../utilities/components/Disease";

import OldAgeHomeService from "../api/services/OldAgeHomeService";
import { useTranslation } from "react-i18next";
import { trackPromise } from "react-promise-tracker";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { MultiSelect } from "primereact/multiselect";
import HomeName from "../../utilities/components/HomeName";
import HomeAddress from "../../utilities/components/HomeAddress";

import UserService from "../../security/api/services/UserService";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import { InputNumber } from "primereact/inputnumber";

const OldAgeHome = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const caseTypeList = [
    { label: t("rescued"), value: "Rescued" },
    { label: t("Admitted by family members"), value: "Admitted by family members" },
    { label: t("Self admitted"), value: "Self admitted" },
  ];
  const fundedByList = [
    { label: t("Self"), value: "Self" },
    { label: t("Government"), value: "Government" },
    { label: t("Community"), value: "Community" },
    { label: t("NGO"), value: "NGO" },
    { label: t("Development Organization"), value: "Development Organization" },
    { label: t("UN"), value: "UN" },
    { label: t("Family"), value: "Family" },
  ];
  const relativeList = [
    { label: t("relativesPresent"), value: "Present" },
    { label: t("abandoned"), value: "Abandoned" },
    { label: t("noFamilyAlive"), value: "No family alive" },
  ];
  const relativeRelationList = [
    { label: t("son"), value: "Son" },
    { label: t("daughter"), value: "Daughter" },
    { label: t("sonInLaw"), value: "Son-in-law" },
    { label: t("daughterInLaw"), value: "Daughter-in-law" },
    { label: t("fatherMother"), value: "Father/Mother" },
    { label: t("brother"), value: "Brother" },
    { label: t("sister"), value: "Sister" },
    { label: t("cousin"), value: "Cousin" },
    { label: t("niece"), value: "Niece" },
    { label: t("nephew"), value: "Nephew" },
    { label: t("others"), value: "Others" },
  ];

  const location = useLocation();
  const [dead, setDead] = useState("No");
  const [familyRelation, setFamilyRelation] = useState("No");
  const [relatives, setRelatives] = useState();
  const [oldAgeHomeCaseId, setOldAgeHomeCaseId] = useState();

  const [update, setUpdate] = useState(false);
  const [showBtn, setShowBtn] = useState("Yes");
  const [hideBtn, setHideBtn] = useState("No");

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

    let oldAgeHomeCaseId = location.state ? location.state.oldAgeHomeCaseId : "";
    console.log("oldAgeHomeCaseId", oldAgeHomeCaseId);
    setOldAgeHomeCaseId(oldAgeHomeCaseId);
    if (oldAgeHomeCaseId != "") {
      OldAgeHomeService.getById(oldAgeHomeCaseId).then((response) => {
        console.log("response.data", response.data);
        if (response.data) {
          console.log("response.data", response.data);
          setOldAgeHomeCaseId(response.data.oldAgeHomeCaseId);
          setDead(response.data.dead);
          // setFamilyRelation(response.data.livingWithFamily);
          setRelatives(response.data.relatives);
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
            citizenshipNumber: response.data.citizenshipNumber,
            nationalIdentificationNo: response.data.nationalIdentificationNo,
            province: parseInt(response.data.province),
            district: parseInt(response.data.district),
            municipality: parseInt(response.data.municipality),
            wardNo: parseInt(response.data.wardNo),
            gender: response.data.gender,
            age: response.data.age,
            caste: response.data.caste,
            educationLevel: response.data.educationLevel,
            disability: response.data.disability,
            typesOfDisability: response.data.typesOfDisability,
            disease: response.data.disease,
            diseaseDetail: response.data.diseaseDetail,
            caseType: response.data.caseType,
            fundedBy: response.data.fundedBy,
            reasonForStay: response.data.reasonForStay,
            admissionDate: response.data.admissionDate,
            timeSpent: response.data.timeSpent,
            relatives: response.data.relatives,
            relativesDetail: response.data.relativesDetail,
            dead: response.data.dead,
            dateOfDeath: response.data.dateOfDeath,
            rehabilitatedToHome: response.data.rehabilitatedToHome,
            receivingSocialAllowance: response.data.receivingSocialAllowance,
            // livingWithFamily: response.data.livingWithFamily,
            livingWithFamilyRelation:
              response.data.livingWithFamilyRelation[0] != "" &&
                response.data.livingWithFamilyRelation != ""
                ? response.data.livingWithFamilyRelation
                : null,
          });
        }
      });
    }
  }, []);

  const saveData = (data) => {
    data.status = "Save";
    console.log("data", data);

    if (update === false) {
      trackPromise(
        OldAgeHomeService.saveData(data).then((response) => {
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
      data.oldAgeHomeCaseId = oldAgeHomeCaseId;
      trackPromise(
        OldAgeHomeService.updateData(data).then((response) => {
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
    console.log("data", data);

    if (update === false) {
      trackPromise(
        OldAgeHomeService.saveData(data).then((response) => {
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
      data.oldAgeHomeCaseId = oldAgeHomeCaseId;
      trackPromise(
        OldAgeHomeService.updateData(data).then((response) => {
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
          <h4 className="p-pt-0"> {t("oldAgeHome")} </h4>
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
              history.push("/sims/old-age-home-indicator")
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
              history.push("/sims/old-age-home-list")
            }
          />
        </div>
      </div>

      <Card className="p-mt-0">
        <form className="p-grid p-fluid ">
          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 ">
              <h5 className="HeadingTitle">
                {t("oldAgeHomeDetails")}
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

          <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("citizenshipNo")} </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="citizenshipNumber"
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
            <div class="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("nationalIdentificationNo")} </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="nationalIdentificationNo"
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
              <AgeGroupForOld
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
                      min="60"
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

          <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("typeOfCase")} </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="caseType"
                  control={control}
                  //    rules={{ required: "Case Type is required." }}
                  render={({ field, fieldState }) => (
                    <Dropdown
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
                {getFormErrorMessage("caseType")}
              </div>
            </div>
            <div class="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("fundedBy")} </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="fundedBy"
                  control={control}
                  //    rules={{ required: "Funded By is required." }}
                  render={({ field, fieldState }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                      style={{ width: "100%" }}
                      options={fundedByList}
                    />
                  )}
                />
                {getFormErrorMessage("fundedBy")}
              </div>
            </div>
          </div>
          <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("reasonForStay")}</div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="reasonForStay"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })} />
                  )}
                />
                {getFormErrorMessage("reasonForStay")}
              </div>
            </div>
            <div class="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("dateOfAdmission")}</div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="admissionDate"
                  control={control}
                  render={({ field, fieldState }) => (
                    // <InputText id={field.name}
                    //   {...field}
                    //   className={classNames({
                    //     "p-invalid": fieldState.invalid,
                    //   })} />

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
                {getFormErrorMessage("admissionDate")}
              </div>
            </div>
          </div>


          <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("timeSpent")}</div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="timeSpent"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })} />
                  )}
                />
                {getFormErrorMessage("timeSpent")}
              </div>
            </div>
          </div>

          <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("relatives")}
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="relatives"
                  control={control}
                  //    rules={{ required: "Relatives is required." }}
                  render={({ field, fieldState }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                        setRelatives(e.value);
                      }}
                      style={{ width: "100%" }}
                      options={relativeList}
                    />
                  )}
                />
                {getFormErrorMessage("relatives")}
              </div>
            </div>
            {relatives === "Present" ? (
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">{t("relation")} :</div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="livingWithFamilyRelation"
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
                        options={relativeRelationList}
                      />
                    )}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("dead")}  :</div>
              <Controller
                name="dead"
                control={control}
                // rules={{ required: "Dead is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="Yes"
                        name="Yes"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setDead(e.value);
                        }}
                        checked={field.value === "Yes"} /> {t("bhayeko")}
                    </div>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="No"
                        name="No"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setDead(e.value);
                        }}
                        checked={field.value === "No"} /> {t("nabhayeko")}
                    </div>
                  </>
                )}
              />
            </div>


            {dead === "Yes" ? (
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left  main-label"> {t("dateOfDeath")}</div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="dateOfDeath"
                    control={control}
                    render={({ field, fieldState }) => (
                      // <InputText
                      //   id={field.name}
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
            ) : (
              <></>
            )}
          </div>

          <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("rehabilitatedToHome")}</div>

              <Controller
                name="rehabilitatedToHome"
                control={control}
                // rules={{ required: "Receiving Social Allowance is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="Yes"
                        name="Yes"
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        checked={field.value === "Yes"} /> {t("bhayeko")}
                    </div>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="No"
                        name="No"
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        checked={field.value === "No"} /> {t("nabhayeko")}
                    </div>
                  </>
                )}
              />
            </div>
            <div class="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left  main-label">{t("receivingSSA")}</div>
              <Controller
                name="receivingSocialAllowance"
                control={control}
                // rules={{ required: "Receiving Social Allowance is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="Yes"
                        name="Yes"
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        checked={field.value === "Yes"} /> {t("cha")}
                    </div>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="No"
                        name="No"
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        checked={field.value === "No"} /> {t("chaina")}
                    </div>
                  </>
                )}
              />
            </div>
          </div>

          {/* <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("livingWithFamilyRelatives")}
              </div>
              <Controller
                name="livingWithFamily"
                control={control}
                // rules={{ required: "Receiving Social Allowance is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="Yes"
                        name="Yes"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setFamilyRelation(e.value);
                        }}
                        checked={field.value === "Yes"} /> {t("ho")}
                    </div>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="No"
                        name="No"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setFamilyRelation(e.value);
                        }}
                        checked={field.value === "No"} /> {t("haina")}
                    </div>
                  </>
                )}
              />
            </div>
            {familyRelation === "Yes" ? (
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">{t("relation")} :</div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="livingWithFamilyRelation"
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
                        options={relativeRelationList}
                      />
                    )}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
          </div> */}


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

export default OldAgeHome;
