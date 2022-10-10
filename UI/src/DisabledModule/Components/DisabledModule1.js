import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";

import FiscalYear from "../../utilities/components/FiscalYear";
import Source from "../../utilities/components/Source";

import DisabledService from "../api/services/DisabledService";
import OrganizationService from "../../security/api/services/OrganizationService";
import Organization from "../../utilities/components/Organization";
import { t } from "i18next";

import { TabView, TabPanel } from "primereact/tabview";
import { trackPromise } from "react-promise-tracker";
function DisabledModule() {
  const [update, setUpdate] = useState("No");
  const [fiscalYear, setFiscalYear] = useState("");
  const [disabledId, setDisabledId] = useState();

  const [hideBtn, setHideBtn] = useState("No");
  const [organization, setOrganization] = useState("");
  const [organizationList, setOrganizationList] = useState([]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const toast = useRef(null);
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  useEffect(() => {
    OrganizationService.getOrganizaitonListByUserRole().then((response) => {
      ////console.log("response organization", response.data);
      if (response.data.data) {
        ////console.log("response organization22", response.data);
        setOrganizationList(response.data.data);
        setHideBtn("Yes");
      } else {
        setHideBtn("No");
      }
    });
  }, []);

  const submitData = (data) => {
    data.fiscalYear = fiscalYear;
    data.status = "Submit";
    ////console.log("data", data);
    trackPromise(
      DisabledService.saveData(data)
        .then((response) => {
          ////console.log("response", response);
          if (response.status == 200) {
            toast.current.show({
              severity: "success",
              summary: "Success Message",
              detail: "Submit Successful",
              life: 3000,
            });
            window.location.reload(false);
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: "Submit UnSuccessful",
              life: 3000,
            });
          }
        })
        .catch((error) => console.error("Error:", error))
    );
  };

  const updateData = (data) => {
    data.disabledId = disabledId;
    data.fiscalYear = fiscalYear;
    data.status = "Submit";
    ////console.log("data", data);

    trackPromise(
      DisabledService.updateData(data)
        .then((response) => {
          ////console.log("response", response);
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
        .catch((error) => console.error("Error:", error))
    );
  };

  const handleFiscalYear = (fiscalYearVal) => {
    ////console.log("fiscal year  ", fiscalYearVal);
    setFiscalYear(fiscalYearVal);
    if (organization != "" && fiscalYearVal != "") {
      getListByOrganization(fiscalYearVal, organization);
    } else if (fiscalYearVal != "") {
      getDataByFiscalYear(fiscalYearVal);
    }
  };

  const getDataByFiscalYear = (fiscalYear) => {
    DisabledService.getListByFiscalYear(fiscalYear).then((response) => {
      ////console.log("response", response.data);
      if (response.data) {
        setFiscalYear(response.data.fiscalYear);
        setDisabledId(response.data.disabledId);
        reset({
          // disabledMale: response.data.disabledMale,
          // disabledFemale: response.data.disabledFemale,
          // disabledChildren: response.data.disabledChildren,
          // disabledAdult: response.data.disabledAdult,
          // disabledSeniorCitizen: response.data.disabledSeniorCitizen,
          // physicallyDisabled: response.data.physicallyDisabled,
          // partiallyVisuallyImpaired: response.data.partiallyVisuallyImpaired,
          // fullyVisuallyImpaired: response.data.fullyVisuallyImpaired,
          // partiallyDeaf: response.data.partiallyDeaf,
          // deaf: response.data.deaf,
          // deafBlind: response.data.deafBlind,
          // speechAndHearing: response.data.speechAndHearing,
          // mentalDisability: response.data.mentalDisability,
          // intellectuallyDisabled: response.data.intellectuallyDisabled,
          // hemophelia: response.data.hemophelia,
          // autism: response.data.autism,
          // multiple: response.data.multiple,
          //
          totDisabledPeopleSource: response.data.totDisabledPeopleSource,
          maleRecSkillTraining: response.data.maleRecSkillTraining,
          femaleRecSkillTraining: response.data.femaleRecSkillTraining,
          othersRecSkillTraining: response.data.othersRecSkillTraining,
          disabledPeopleRecSkillSource: response.data.disabledPeopleRecSkillSource,
          // disabledMaleReceivingSSA: response.data.disabledMaleReceivingSSA,
          // disabledFemaleReceivingSSA: response.data.disabledFemaleReceivingSSA,
          // disabledChildrenReceivingSSA:
          //   response.data.disabledChildrenReceivingSSA,
          // disabledAdultReceivingSSA: response.data.disabledAdultReceivingSSA,
          // disabledSeniorCitizenReceivingSSA:
          //   response.data.disabledSeniorCitizenReceivingSSA,
          // physicallyDisabledReceivingSSA:
          //   response.data.physicallyDisabledReceivingSSA,
          // partiallyVisuallyImpairedReceivingSSA:
          //   response.data.partiallyVisuallyImpairedReceivingSSA,
          // fullyVisuallyImpairedReceivingSSA:
          //   response.data.fullyVisuallyImpairedReceivingSSA,
          // partiallyDeafReceivingSSA: response.data.partiallyDeafReceivingSSA,
          // deafReceivingSSA: response.data.deafReceivingSSA,
          // deafBlindReceivingSSA: response.data.deafBlindReceivingSSA,
          // speechAndHearingReceivingSSA:
          //   response.data.speechAndHearingReceivingSSA,
          // mentalDisabilityReceivingSSA:
          //   response.data.mentalDisabilityReceivingSSA,
          // intellectuallyDisabledReceivingSSA:
          //   response.data.intellectuallyDisabledReceivingSSA,
          // hemopheliaReceivingSSA: response.data.hemopheliaReceivingSSA,
          // autismReceivingSSA: response.data.autismReceivingSSA,
          // multipleReceivingSSA: response.data.multipleReceivingSSA,
          // disabledReceivingSSASource: response.data.disabledReceivingSSASource,
          totDisabledRehabCenter: response.data.totDisabledRehabCenter,
          totDisabledRehabCenterSource: response.data.totDisabledRehabCenterSource,
          disabledMaleReceivingServices: response.data.disabledMaleReceivingServices,
          disabledFemaleReceivingServices: response.data.disabledFemaleReceivingServices,
          disabledOthersReceivingServices: response.data.disabledOthersReceivingServices,
          disabledChildrenReceivingServices: response.data.disabledChildrenReceivingServices,
          disabledAdultReceivingServices: response.data.disabledAdultReceivingServices,
          disabledSeniorCitizenReceivingServices:
            response.data.disabledSeniorCitizenReceivingServices,
          physicallyDisabledReceivingServices: response.data.physicallyDisabledReceivingServices,
          partiallyVisuallyImpairedReceivingServices:
            response.data.partiallyVisuallyImpairedReceivingServices,
          fullyVisuallyImpairedReceivingServices:
            response.data.fullyVisuallyImpairedReceivingServices,
          partiallyDeafReceivingServices: response.data.partiallyDeafReceivingServices,
          deafReceivingServices: response.data.deafReceivingServices,
          deafBlindReceivingServices: response.data.deafBlindReceivingServices,
          speechAndHearingReceivingServices: response.data.speechAndHearingReceivingServices,
          mentalDisabilityReceivingServices: response.data.mentalDisabilityReceivingServices,
          intellectuallyDisabledReceivingServices:
            response.data.intellectuallyDisabledReceivingServices,
          hemopheliaReceivingServices: response.data.hemopheliaReceivingServices,
          autismReceivingServices: response.data.autismReceivingServices,
          multipleReceivingServices: response.data.multipleReceivingServices,
          disabledReceivingServicesSource: response.data.disabledReceivingServicesSource,
          budgetAllocatedForDisabled: response.data.budgetAllocatedForDisabled,
          budgetAllocatedForDisabledSource: response.data.budgetAllocatedForDisabledSource,
          disabledJobByEthnicity: response.data.disabledJobByEthnicity,
          disabledJobByAge: response.data.disabledJobByAge,
          disabledJobByGender: response.data.disabledJobByGender,
          disabledJobByType: response.data.disabledJobByType,
          disabledJobSource: response.data.disabledJobSource,
          categoryKa: response.data.categoryKa,
          categoryKha: response.data.categoryKha,
          categoryGa: response.data.categoryGa,
          categoryGha: response.data.categoryGha,
        });
        setUpdate("Yes");
      } else {
        ////console.log("no data");
        reset({
          totDisabledPeopleSource: "",
          disabledPeopleRecSkillSource: "",
          disabledReceivingSSASource: "",
          totDisabledRehabCenterSource: "",
          disabledReceivingServicesSource: "",
          budgetAllocatedForDisabledSource: "",
          disabledJobSource: "",
        });
        setUpdate("No");
      }
    });
  };

  const handleOrganization = (organizationId) => {
    ////console.log("fiscalYear", fiscalYear);
    setOrganization(organizationId);
    if (fiscalYear !== "") {
      getListByOrganization(fiscalYear, organizationId);
    }
  };

  const getListByOrganization = (fiscalYear, organization) => {
    DisabledService.getListByOrganization(fiscalYear, organization).then((response) => {
      ////console.log("response", response.data);
      if (response.data) {
        setFiscalYear(response.data.fiscalYear);
        setDisabledId(response.data.disabledId);
        reset({
          // disabledMale: response.data.disabledMale,
          // disabledFemale: response.data.disabledFemale,
          // disabledChildren: response.data.disabledChildren,
          // disabledAdult: response.data.disabledAdult,
          // disabledSeniorCitizen: response.data.disabledSeniorCitizen,
          // physicallyDisabled: response.data.physicallyDisabled,
          // partiallyVisuallyImpaired: response.data.partiallyVisuallyImpaired,
          // fullyVisuallyImpaired: response.data.fullyVisuallyImpaired,
          // partiallyDeaf: response.data.partiallyDeaf,
          // deaf: response.data.deaf,
          // deafBlind: response.data.deafBlind,
          // speechAndHearing: response.data.speechAndHearing,
          // mentalDisability: response.data.mentalDisability,
          // intellectuallyDisabled: response.data.intellectuallyDisabled,
          // hemophelia: response.data.hemophelia,
          // autism: response.data.autism,
          // multiple: response.data.multiple,
          totDisabledPeopleSource: response.data.totDisabledPeopleSource,
          maleRecSkillTraining: response.data.maleRecSkillTraining,
          femaleRecSkillTraining: response.data.femaleRecSkillTraining,
          othersRecSkillTraining: response.data.othersRecSkillTraining,
          disabledPeopleRecSkillSource: response.data.disabledPeopleRecSkillSource,
          // disabledMaleReceivingSSA: response.data.disabledMaleReceivingSSA,
          // disabledFemaleReceivingSSA:
          //   response.data.disabledFemaleReceivingSSA,
          // disabledChildrenReceivingSSA:
          //   response.data.disabledChildrenReceivingSSA,
          // disabledAdultReceivingSSA: response.data.disabledAdultReceivingSSA,
          // disabledSeniorCitizenReceivingSSA:
          //   response.data.disabledSeniorCitizenReceivingSSA,
          // physicallyDisabledReceivingSSA:
          //   response.data.physicallyDisabledReceivingSSA,
          // partiallyVisuallyImpairedReceivingSSA:
          //   response.data.partiallyVisuallyImpairedReceivingSSA,
          // fullyVisuallyImpairedReceivingSSA:
          //   response.data.fullyVisuallyImpairedReceivingSSA,
          // partiallyDeafReceivingSSA: response.data.partiallyDeafReceivingSSA,
          // deafReceivingSSA: response.data.deafReceivingSSA,
          // deafBlindReceivingSSA: response.data.deafBlindReceivingSSA,
          // speechAndHearingReceivingSSA:
          //   response.data.speechAndHearingReceivingSSA,
          // mentalDisabilityReceivingSSA:
          //   response.data.mentalDisabilityReceivingSSA,
          // intellectuallyDisabledReceivingSSA:
          //   response.data.intellectuallyDisabledReceivingSSA,
          // hemopheliaReceivingSSA: response.data.hemopheliaReceivingSSA,
          // autismReceivingSSA: response.data.autismReceivingSSA,
          // multipleReceivingSSA: response.data.multipleReceivingSSA,
          // disabledReceivingSSASource:
          //   response.data.disabledReceivingSSASource,
          totDisabledRehabCenter: response.data.totDisabledRehabCenter,
          totDisabledRehabCenterSource: response.data.totDisabledRehabCenterSource,
          disabledMaleReceivingServices: response.data.disabledMaleReceivingServices,
          disabledFemaleReceivingServices: response.data.disabledFemaleReceivingServices,
          disabledOthersReceivingServices: response.data.disabledOthersReceivingServices,
          disabledChildrenReceivingServices: response.data.disabledChildrenReceivingServices,
          disabledAdultReceivingServices: response.data.disabledAdultReceivingServices,
          disabledSeniorCitizenReceivingServices:
            response.data.disabledSeniorCitizenReceivingServices,
          physicallyDisabledReceivingServices: response.data.physicallyDisabledReceivingServices,
          partiallyVisuallyImpairedReceivingServices:
            response.data.partiallyVisuallyImpairedReceivingServices,
          fullyVisuallyImpairedReceivingServices:
            response.data.fullyVisuallyImpairedReceivingServices,
          partiallyDeafReceivingServices: response.data.partiallyDeafReceivingServices,
          deafReceivingServices: response.data.deafReceivingServices,
          deafBlindReceivingServices: response.data.deafBlindReceivingServices,
          speechAndHearingReceivingServices: response.data.speechAndHearingReceivingServices,
          mentalDisabilityReceivingServices: response.data.mentalDisabilityReceivingServices,
          intellectuallyDisabledReceivingServices:
            response.data.intellectuallyDisabledReceivingServices,
          hemopheliaReceivingServices: response.data.hemopheliaReceivingServices,
          autismReceivingServices: response.data.autismReceivingServices,
          multipleReceivingServices: response.data.multipleReceivingServices,
          disabledReceivingServicesSource: response.data.disabledReceivingServicesSource,
          budgetAllocatedForDisabled: response.data.budgetAllocatedForDisabled,
          budgetAllocatedForDisabledSource: response.data.budgetAllocatedForDisabledSource,
          disabledJobByEthnicity: response.data.disabledJobByEthnicity,
          disabledJobByAge: response.data.disabledJobByAge,
          disabledJobByGender: response.data.disabledJobByGender,
          disabledJobByType: response.data.disabledJobByType,
          disabledJobSource: response.data.disabledJobSource,
          categoryKa: response.data.categoryKa,
          categoryKha: response.data.categoryKha,
          categoryGa: response.data.categoryGa,
          categoryGha: response.data.categoryGha,
        });
      } else {
        ////console.log("no data");
        reset({
          totDisabledPeopleSource: "",
          disabledPeopleRecSkillSource: "",
          disabledReceivingSSASource: "",
          totDisabledRehabCenterSource: "",
          disabledReceivingServicesSource: "",
          budgetAllocatedForDisabledSource: "",
          disabledJobSource: "",
        });
      }
    });
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const [subActiveIndex, setSubActiveIndex] = useState(0);
  return (
    <>
      <Toast ref={toast} />
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className=" p-card-content">
          <h4 className="p-pt-0">{t("disabledModule")}</h4>
        </div>
      </Card>
      <Card className="p-mt-0" style={{ height: "72vh", overflowY: "auto" }}>
        <div className=" p-card-content">
          <form className="p-grid p-fluid" autoComplete="off">
            <Organization submitOrganizationId={handleOrganization} />
            {hideBtn === "Yes" ? <></> : <></>}
            <FiscalYear value={fiscalYear} handleFiscalYearState={handleFiscalYear} />
            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 ">
                <hr style={{ marginTop: "5px" }}></hr>
              </div>
            </div>

            <TabView
              activeIndex={activeIndex}
              onTabChange={(e) => {
                setActiveIndex(e.index);
                setSubActiveIndex(0);
              }}
            >
              <TabPanel header={t("categoryKa")}>
                <TabView
                  activeIndex={subActiveIndex}
                  onTabChange={(e) => setSubActiveIndex(e.index)}
                >
                  <TabPanel
                    header={t("totDisPeopCatKa")}
                    headerTemplate={(options) => {
                      return (
                        <button
                          type="button"
                          onClick={options.onClick}
                          className={options.className}
                        >
                          {options.titleElement}
                          <i
                            className="pi pi-question-circle tooltip-style"
                            title={t("totDisPeopCatKaDesc")}
                          />
                        </button>
                      );
                    }}
                  >
                    <div className="p-grid p-col-12 p-md-12 ">
                      <div class="p-col-12 p-md-9">
                        {/* <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("totDisPeopCatKa")}
                  <i
                    className="pi pi-question-circle tooltip-style"
                    title="Number of disabled people registered in the official document of the municipality"
                  />
                </div> */}
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byGender")}
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.disabledMale"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("male")}
                                tooltip={t("male")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.disabledFemale"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("female")}
                                tooltip={t("female")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.disabledOthers"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("others")}
                                tooltip={t("others")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byAge")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.disabledChildren"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("children")}
                                tooltip={t("children")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.disabledAdult"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("adult")}
                                tooltip={t("adult")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.disabledSeniorCitizen"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("seniorCitizen")}
                                tooltip={t("seniorCitizen")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byCategoryKa")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.physicallyDisabled"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("physicallyDisabled")}
                                tooltip={t("physicallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.partiallyVisuallyImpaired"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyVisuallyImpaired")}
                                tooltip={t("partiallyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.fullyVisuallyImpaired"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("fullyVisuallyImpaired")}
                                tooltip={t("fullyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.partiallyDeaf"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyDeaf")}
                                tooltip={t("partiallyDeaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.deaf"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deaf")}
                                tooltip={t("deaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.deafBlind"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deafBlind")}
                                tooltip={t("deafBlind")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.speechAndHearing"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("speechAndHearingDisability")}
                                tooltip={t("speechAndHearingDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.mentalDisability"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("mentalDisability")}
                                tooltip={t("mentalDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.intellectuallyDisabled"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("intellectuallyDisabled")}
                                tooltip={t("intellectuallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.hemophelia"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("hemophelia")}
                                tooltip={t("hemophelia")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.autism"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("autism")}
                                tooltip={t("autism")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.multiple"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("multiple")}
                                tooltip={t("multiple")}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div class="p-col-12 p-md-3">
                        <Controller
                          name="categoryKa.totDisabledPeopleSource"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Source
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              handleSourceState={(e) => {
                                ////console.log("e", e);
                                field.onChange(e);
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel
                    header={t("disPeopReceivingSSAUnderKa")}
                    headerTemplate={(options) => {
                      return (
                        <button
                          type="button"
                          onClick={options.onClick}
                          className={options.className}
                        >
                          {options.titleElement}
                          <i
                            className="pi pi-question-circle tooltip-style"
                            title={t("disPeopReceivingSSAUnderKaDesc")}
                          />
                        </button>
                      );
                    }}
                  >
                    {" "}
                    <div className="p-grid p-col-12 p-md-12 ">
                      <div class="p-col-12 p-md-9">
                        {/* <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("disPeopReceivingSSAUnderKa")}
                  <i
                    className="pi pi-question-circle tooltip-style"
                    title="Number of disabled people receiving social security allowance under category (Ka) in the municipality"
                  />
                </div> */}
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byGender")}
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.disabledMaleReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("male")}
                                tooltip={t("male")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.disabledFemaleReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("female")}
                                tooltip={t("female")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.disabledOthersReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("others")}
                                tooltip={t("others")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byAge")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.disabledChildrenReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("children")}
                                tooltip={t("children")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.disabledAdultReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("adult")}
                                tooltip={t("adult")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.disabledSeniorCitizenReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("seniorCitizen")}
                                tooltip={t("seniorCitizen")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byCategoryKa")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.physicallyDisabledReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("physicallyDisabled")}
                                tooltip={t("physicallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.partiallyVisuallyImpairedReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyVisuallyImpaired")}
                                tooltip={t("partiallyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.fullyVisuallyImpairedReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("fullyVisuallyImpaired")}
                                tooltip={t("fullyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.partiallyDeafReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyDeaf")}
                                tooltip={t("partiallyDeaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.deafReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deaf")}
                                tooltip={t("deaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.deafBlindReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deafBlind")}
                                tooltip={t("deafBlind")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.speechAndHearingReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("speechAndHearingDisability")}
                                tooltip={t("speechAndHearingDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.mentalDisabilityReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("mentalDisability")}
                                tooltip={t("mentalDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.intellectuallyDisabledReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("intellectuallyDisabled")}
                                tooltip={t("intellectuallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.hemopheliaReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("hemophelia")}
                                tooltip={t("hemophelia")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.autismReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("autism")}
                                tooltip={t("autism")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKa.multipleReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("multiple")}
                                tooltip={t("multiple")}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div class="p-col-12 p-md-3">
                        <Controller
                          name="categoryKa.disabledReceivingSSASource"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Source
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              handleSourceState={(e) => {
                                ////console.log("e", e);
                                field.onChange(e);
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </TabPanel>
                </TabView>
              </TabPanel>
              <TabPanel header={t("categoryKha")}>
                <TabView
                  activeIndex={subActiveIndex}
                  onTabChange={(e) => setSubActiveIndex(e.index)}
                >
                  <TabPanel
                    header={t("totDisPeopCatKha")}
                    headerTemplate={(options) => {
                      return (
                        <button
                          type="button"
                          onClick={options.onClick}
                          className={options.className}
                        >
                          {options.titleElement}
                          <i
                            className="pi pi-question-circle tooltip-style"
                            title={t("totDisPeopCatKhaDesc")}
                          />
                        </button>
                      );
                    }}
                  >
                    <div className="p-grid p-col-12 p-md-12 ">
                      <div class="p-col-12 p-md-9">
                        {/* <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("totDisPeopCatKa")}
                  <i
                    className="pi pi-question-circle tooltip-style"
                    title="Number of disabled people registered in the official document of the municipality"
                  />
                </div> */}
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byGender")}
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.disabledMale"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("male")}
                                tooltip={t("male")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.disabledFemale"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("female")}
                                tooltip={t("female")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.disabledOthers"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("others")}
                                tooltip={t("others")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byAge")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.disabledChildren"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("children")}
                                tooltip={t("children")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.disabledAdult"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("adult")}
                                tooltip={t("adult")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.disabledSeniorCitizen"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("seniorCitizen")}
                                tooltip={t("seniorCitizen")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byCategoryKha")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.physicallyDisabled"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("physicallyDisabled")}
                                tooltip={t("physicallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.partiallyVisuallyImpaired"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyVisuallyImpaired")}
                                tooltip={t("partiallyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.fullyVisuallyImpaired"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("fullyVisuallyImpaired")}
                                tooltip={t("fullyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.partiallyDeaf"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyDeaf")}
                                tooltip={t("partiallyDeaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.deaf"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deaf")}
                                tooltip={t("deaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.deafBlind"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deafBlind")}
                                tooltip={t("deafBlind")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.speechAndHearing"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("speechAndHearingDisability")}
                                tooltip={t("speechAndHearingDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.mentalDisability"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("mentalDisability")}
                                tooltip={t("mentalDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.intellectuallyDisabled"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("intellectuallyDisabled")}
                                tooltip={t("intellectuallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.hemophelia"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("hemophelia")}
                                tooltip={t("hemophelia")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.autism"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("autism")}
                                tooltip={t("autism")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.multiple"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("multiple")}
                                tooltip={t("multiple")}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div class="p-col-12 p-md-3">
                        <Controller
                          name="categoryKha.totDisabledPeopleSource"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Source
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              handleSourceState={(e) => {
                                ////console.log("e", e);
                                field.onChange(e);
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel
                    header={t("disPeopReceivingSSAUnderKha")}
                    headerTemplate={(options) => {
                      return (
                        <button
                          type="button"
                          onClick={options.onClick}
                          className={options.className}
                        >
                          {options.titleElement}
                          <i
                            className="pi pi-question-circle tooltip-style"
                            title={t("disPeopReceivingSSAUnderKhaDesc")}
                          />
                        </button>
                      );
                    }}
                  >
                    {" "}
                    <div className="p-grid p-col-12 p-md-12 ">
                      <div class="p-col-12 p-md-9">
                        {/* <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("disPeopReceivingSSAUnderKa")}
                  <i
                    className="pi pi-question-circle tooltip-style"
                    title="Number of disabled people receiving social security allowance under category (Ka) in the municipality"
                  />
                </div> */}
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byGender")}
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.disabledMaleReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("male")}
                                tooltip={t("male")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.disabledFemaleReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("female")}
                                tooltip={t("female")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.disabledOthersReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("others")}
                                tooltip={t("others")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byAge")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.disabledChildrenReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("children")}
                                tooltip={t("children")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.disabledAdultReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("adult")}
                                tooltip={t("adult")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.disabledSeniorCitizenReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("seniorCitizen")}
                                tooltip={t("seniorCitizen")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byCategoryKha")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.physicallyDisabledReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("physicallyDisabled")}
                                tooltip={t("physicallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.partiallyVisuallyImpairedReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyVisuallyImpaired")}
                                tooltip={t("partiallyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.fullyVisuallyImpairedReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("fullyVisuallyImpaired")}
                                tooltip={t("fullyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.partiallyDeafReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyDeaf")}
                                tooltip={t("partiallyDeaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.deafReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deaf")}
                                tooltip={t("deaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.deafBlindReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deafBlind")}
                                tooltip={t("deafBlind")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.speechAndHearingReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("speechAndHearingDisability")}
                                tooltip={t("speechAndHearingDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.mentalDisabilityReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("mentalDisability")}
                                tooltip={t("mentalDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.intellectuallyDisabledReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("intellectuallyDisabled")}
                                tooltip={t("intellectuallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.hemopheliaReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("hemophelia")}
                                tooltip={t("hemophelia")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.autismReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("autism")}
                                tooltip={t("autism")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryKha.multipleReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("multiple")}
                                tooltip={t("multiple")}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div class="p-col-12 p-md-3">
                        <Controller
                          name="categoryKha.disabledReceivingSSASource"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Source
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              handleSourceState={(e) => {
                                ////console.log("e", e);
                                field.onChange(e);
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </TabPanel>
                </TabView>
              </TabPanel>
              <TabPanel header={t("categoryGa")}>
                {" "}
                <TabView
                  activeIndex={subActiveIndex}
                  onTabChange={(e) => setSubActiveIndex(e.index)}
                >
                  <TabPanel
                    header={t("totDisPeopCatGa")}
                    headerTemplate={(options) => {
                      return (
                        <button
                          type="button"
                          onClick={options.onClick}
                          className={options.className}
                        >
                          {options.titleElement}
                          <i
                            className="pi pi-question-circle tooltip-style"
                            title={t("totDisPeopCatGaDesc")}
                          />
                        </button>
                      );
                    }}
                  >
                    <div className="p-grid p-col-12 p-md-12 ">
                      <div class="p-col-12 p-md-9">
                        {/* <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("totDisPeopCatKa")}
                  <i
                    className="pi pi-question-circle tooltip-style"
                    title="Number of disabled people registered in the official document of the municipality"
                  />
                </div> */}
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byGender")}
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.disabledMale"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("male")}
                                tooltip={t("male")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.disabledFemale"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("female")}
                                tooltip={t("female")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.disabledOthers"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("others")}
                                tooltip={t("others")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byAge")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.disabledChildren"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("children")}
                                tooltip={t("children")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.disabledAdult"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("adult")}
                                tooltip={t("adult")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.disabledSeniorCitizen"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("seniorCitizen")}
                                tooltip={t("seniorCitizen")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byCategoryGa")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.physicallyDisabled"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("physicallyDisabled")}
                                tooltip={t("physicallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.partiallyVisuallyImpaired"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyVisuallyImpaired")}
                                tooltip={t("partiallyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.fullyVisuallyImpaired"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("fullyVisuallyImpaired")}
                                tooltip={t("fullyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.partiallyDeaf"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyDeaf")}
                                tooltip={t("partiallyDeaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.deaf"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deaf")}
                                tooltip={t("deaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.deafBlind"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deafBlind")}
                                tooltip={t("deafBlind")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.speechAndHearing"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("speechAndHearingDisability")}
                                tooltip={t("speechAndHearingDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.mentalDisability"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("mentalDisability")}
                                tooltip={t("mentalDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.intellectuallyDisabled"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("intellectuallyDisabled")}
                                tooltip={t("intellectuallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.hemophelia"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("hemophelia")}
                                tooltip={t("hemophelia")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.autism"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("autism")}
                                tooltip={t("autism")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.multiple"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("multiple")}
                                tooltip={t("multiple")}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div class="p-col-12 p-md-3">
                        <Controller
                          name="categoryGa.totDisabledPeopleSource"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Source
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              handleSourceState={(e) => {
                                ////console.log("e", e);
                                field.onChange(e);
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel
                    header={t("disPeopReceivingSSAUnderGa")}
                    headerTemplate={(options) => {
                      return (
                        <button
                          type="button"
                          onClick={options.onClick}
                          className={options.className}
                        >
                          {options.titleElement}
                          <i
                            className="pi pi-question-circle tooltip-style"
                            title={t("disPeopReceivingSSAUnderGaDesc")}
                          />
                        </button>
                      );
                    }}
                  >
                    {" "}
                    <div className="p-grid p-col-12 p-md-12 ">
                      <div class="p-col-12 p-md-9">
                        {/* <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("disPeopReceivingSSAUnderKa")}
                  <i
                    className="pi pi-question-circle tooltip-style"
                    title="Number of disabled people receiving social security allowance under category (Ka) in the municipality"
                  />
                </div> */}
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byGender")}
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.disabledMaleReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("male")}
                                tooltip={t("male")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.disabledFemaleReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("female")}
                                tooltip={t("female")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.disabledOthersReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("others")}
                                tooltip={t("others")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byAge")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.disabledChildrenReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("children")}
                                tooltip={t("children")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.disabledAdultReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("adult")}
                                tooltip={t("adult")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.disabledSeniorCitizenReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("seniorCitizen")}
                                tooltip={t("seniorCitizen")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byCategoryGa")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.physicallyDisabledReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("physicallyDisabled")}
                                tooltip={t("physicallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.partiallyVisuallyImpairedReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyVisuallyImpaired")}
                                tooltip={t("partiallyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.fullyVisuallyImpairedReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("fullyVisuallyImpaired")}
                                tooltip={t("fullyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.partiallyDeafReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyDeaf")}
                                tooltip={t("partiallyDeaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.deafReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deaf")}
                                tooltip={t("deaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.deafBlindReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deafBlind")}
                                tooltip={t("deafBlind")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.speechAndHearingReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("speechAndHearingDisability")}
                                tooltip={t("speechAndHearingDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.mentalDisabilityReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("mentalDisability")}
                                tooltip={t("mentalDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.intellectuallyDisabledReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("intellectuallyDisabled")}
                                tooltip={t("intellectuallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.hemopheliaReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("hemophelia")}
                                tooltip={t("hemophelia")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.autismReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("autism")}
                                tooltip={t("autism")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGa.multipleReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("multiple")}
                                tooltip={t("multiple")}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div class="p-col-12 p-md-3">
                        <Controller
                          name="categoryGa.disabledReceivingSSASource"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Source
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              handleSourceState={(e) => {
                                ////console.log("e", e);
                                field.onChange(e);
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </TabPanel>
                </TabView>
              </TabPanel>
              <TabPanel header={t("categoryGha")}>
                {" "}
                <TabView
                  activeIndex={subActiveIndex}
                  onTabChange={(e) => setSubActiveIndex(e.index)}
                >
                  <TabPanel
                    header={t("totDisPeopCatGha")}
                    headerTemplate={(options) => {
                      return (
                        <button
                          type="button"
                          onClick={options.onClick}
                          className={options.className}
                        >
                          {options.titleElement}
                          <i
                            className="pi pi-question-circle tooltip-style"
                            title={t("totDisPeopCatGhaDesc")}
                          />
                        </button>
                      );
                    }}
                  >
                    <div className="p-grid p-col-12 p-md-12 ">
                      <div class="p-col-12 p-md-9">
                        {/* <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("totDisPeopCatKa")}
                  <i
                    className="pi pi-question-circle tooltip-style"
                    title="Number of disabled people registered in the official document of the municipality"
                  />
                </div> */}
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byGender")}
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.disabledMale"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("male")}
                                tooltip={t("male")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.disabledFemale"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("female")}
                                tooltip={t("female")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.disabledOthers"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("others")}
                                tooltip={t("others")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byAge")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.disabledChildren"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("children")}
                                tooltip={t("children")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.disabledAdult"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("adult")}
                                tooltip={t("adult")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.disabledSeniorCitizen"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("seniorCitizen")}
                                tooltip={t("seniorCitizen")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byCategoryGha")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.physicallyDisabled"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("physicallyDisabled")}
                                tooltip={t("physicallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.partiallyVisuallyImpaired"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyVisuallyImpaired")}
                                tooltip={t("partiallyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.fullyVisuallyImpaired"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("fullyVisuallyImpaired")}
                                tooltip={t("fullyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.partiallyDeaf"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyDeaf")}
                                tooltip={t("partiallyDeaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.deaf"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deaf")}
                                tooltip={t("deaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.deafBlind"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deafBlind")}
                                tooltip={t("deafBlind")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.speechAndHearing"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("speechAndHearingDisability")}
                                tooltip={t("speechAndHearingDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.mentalDisability"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("mentalDisability")}
                                tooltip={t("mentalDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.intellectuallyDisabled"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("intellectuallyDisabled")}
                                tooltip={t("intellectuallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.hemophelia"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("hemophelia")}
                                tooltip={t("hemophelia")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.autism"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("autism")}
                                tooltip={t("autism")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.multiple"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("multiple")}
                                tooltip={t("multiple")}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div class="p-col-12 p-md-3">
                        <Controller
                          name="categoryGha.totDisabledPeopleSource"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Source
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              handleSourceState={(e) => {
                                ////console.log("e", e);
                                field.onChange(e);
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel
                    header={t("disPeopReceivingSSAUnderGha")}
                    headerTemplate={(options) => {
                      return (
                        <button
                          type="button"
                          onClick={options.onClick}
                          className={options.className}
                        >
                          {options.titleElement}
                          <i
                            className="pi pi-question-circle tooltip-style"
                            title={t("disPeopReceivingSSAUnderGhaDesc")}
                          />
                        </button>
                      );
                    }}
                  >
                    {" "}
                    <div className="p-grid p-col-12 p-md-12 ">
                      <div class="p-col-12 p-md-9">
                        {/* <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("disPeopReceivingSSAUnderKa")}
                  <i
                    className="pi pi-question-circle tooltip-style"
                    title="Number of disabled people receiving social security allowance under category (Ka) in the municipality"
                  />
                </div> */}
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byGender")}
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.disabledMaleReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("male")}
                                tooltip={t("male")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.disabledFemaleReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("female")}
                                tooltip={t("female")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.disabledOthersReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("others")}
                                tooltip={t("others")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byAge")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.disabledChildrenReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("children")}
                                tooltip={t("children")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.disabledAdultReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("adult")}
                                tooltip={t("adult")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.disabledSeniorCitizenReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("seniorCitizen")}
                                tooltip={t("seniorCitizen")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left sub-label">
                          {t("byCategoryGha")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.physicallyDisabledReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("physicallyDisabled")}
                                tooltip={t("physicallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.partiallyVisuallyImpairedReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyVisuallyImpaired")}
                                tooltip={t("partiallyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.fullyVisuallyImpairedReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("fullyVisuallyImpaired")}
                                tooltip={t("fullyVisuallyImpaired")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.partiallyDeafReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("partiallyDeaf")}
                                tooltip={t("partiallyDeaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.deafReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deaf")}
                                tooltip={t("deaf")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.deafBlindReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("deafBlind")}
                                tooltip={t("deafBlind")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.speechAndHearingReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("speechAndHearingDisability")}
                                tooltip={t("speechAndHearingDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.mentalDisabilityReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("mentalDisability")}
                                tooltip={t("mentalDisability")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left"></div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.intellectuallyDisabledReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("intellectuallyDisabled")}
                                tooltip={t("intellectuallyDisabled")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.hemopheliaReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("hemophelia")}
                                tooltip={t("hemophelia")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.autismReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("autism")}
                                tooltip={t("autism")}
                              />
                            )}
                          />
                        </div>
                        <div className="p-field p-col-2 p-md-2 float-left">
                          <Controller
                            name="categoryGha.multipleReceivingSSA"
                            control={control}
                            autoFocus
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
                                min="0"
                                placeholder={t("multiple")}
                                tooltip={t("multiple")}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div class="p-col-12 p-md-3">
                        <Controller
                          name="categoryGha.disabledReceivingSSASource"
                          control={control}
                          render={({ field, fieldState }) => (
                            <Source
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              handleSourceState={(e) => {
                                ////console.log("e", e);
                                field.onChange(e);
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </TabPanel>
                </TabView>
              </TabPanel>
            </TabView>

            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 ">
                <hr style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}></hr>
              </div>
            </div>

            <div className="p-grid p-col-12 p-md-12 ">
              <div class="p-col-12 p-md-9">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("disPeopRecSkillTraining")}
                  <i
                    className="pi pi-question-circle tooltip-style"
                    title={t("disPeopRecSkillTrainingDesc")}
                  />
                </div>
                <div className="p-field p-col-12 p-md-12 float-left sub-label">{t("byGender")}</div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="maleRecSkillTraining"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("male")}
                        tooltip={t("male")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="femaleRecSkillTraining"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("female")}
                        tooltip={t("female")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="othersRecSkillTraining"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("others")}
                        tooltip={t("others")}
                      />
                    )}
                  />
                </div>
              </div>
              <div class="p-col-12 p-md-3">
                <Controller
                  name="disabledPeopleRecSkillSource"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Source
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      value={field.value}
                      handleSourceState={(e) => {
                        ////console.log("e", e);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 ">
                <hr style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}></hr>
              </div>
            </div>

            <div className="p-grid p-col-12 p-md-12 ">
              <div class="p-col-12 p-md-9">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("noDisabledRehabCenter")}
                  <i
                    className="pi pi-question-circle tooltip-style"
                    title={t("noDisabledRehabCenterDesc")}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="totDisabledRehabCenter"
                    control={control}
                    autoFocus
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
                        min="0"
                      />
                    )}
                  />
                </div>
              </div>
              <div class="p-col-12 p-md-3">
                <Controller
                  name="totDisabledRehabCenterSource"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Source
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      value={field.value}
                      handleSourceState={(e) => {
                        ////console.log("e", e);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 ">
                <hr style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}></hr>
              </div>
            </div>

            <div className="p-grid p-col-12 p-md-12 ">
              <div class="p-col-12 p-md-9">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("totDisPeopRecServices")}
                  <i
                    className="pi pi-question-circle tooltip-style"
                    title={t("totDisPeopRecServicesDesc")}
                  />
                </div>
                <div className="p-field p-col-12 p-md-12 float-left sub-label">{t("byGender")}</div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="disabledMaleReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("male")}
                        tooltip={t("male")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="disabledFemaleReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("female")}
                        tooltip={t("female")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="disabledOthersReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("others")}
                        tooltip={t("others")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-12 p-md-12 float-left sub-label">{t("byAge")}</div>
                <div className="p-field p-col-12 p-md-12 float-left"></div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="disabledChildrenReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("children")}
                        tooltip={t("children")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="disabledAdultReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("adult")}
                        tooltip={t("adult")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="disabledSeniorCitizenReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("seniorCitizen")}
                        tooltip={t("seniorCitizen")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-12 p-md-12 float-left sub-label">
                  {t("byCategory")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left"></div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="physicallyDisabledReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("physicallyDisabled")}
                        tooltip={t("physicallyDisabled")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="partiallyVisuallyImpairedReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("partiallyVisuallyImpaired")}
                        tooltip={t("partiallyVisuallyImpaired")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="fullyVisuallyImpairedReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("fullyVisuallyImpaired")}
                        tooltip={t("fullyVisuallyImpaired")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="partiallyDeafReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("partiallyDeaf")}
                        tooltip={t("partiallyDeaf")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-12 p-md-12 float-left"></div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="deafReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("deaf")}
                        tooltip={t("deaf")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="deafBlindReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("deafBlind")}
                        tooltip={t("deafBlind")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="speechAndHearingReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("speechAndHearingDisability")}
                        tooltip={t("speechAndHearingDisability")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="mentalDisabilityReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("mentalDisability")}
                        tooltip={t("mentalDisability")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-12 p-md-12 float-left"></div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="intellectuallyDisabledReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("intellectuallyDisabled")}
                        tooltip={t("intellectuallyDisabled")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="hemopheliaReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("hemophelia")}
                        tooltip={t("hemophelia")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="autismReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("autism")}
                        tooltip={t("autism")}
                      />
                    )}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <Controller
                    name="multipleReceivingServices"
                    control={control}
                    autoFocus
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
                        min="0"
                        placeholder={t("multiple")}
                        tooltip={t("multiple")}
                      />
                    )}
                  />
                </div>
              </div>
              <div class="p-col-12 p-md-3">
                <Controller
                  name="disabledReceivingServicesSource"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Source
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      value={field.value}
                      handleSourceState={(e) => {
                        ////console.log("e", e);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 ">
                <hr style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}></hr>
              </div>
            </div>

            <div className="p-grid p-col-12 p-md-12 ">
              <div class="p-col-12 p-md-9">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("perBudgetAllocatedForDisPeop")}
                  <i
                    className="pi pi-question-circle tooltip-style"
                    title={t("perBudgetAllocatedForDisPeopDesc")}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <div className="p-inputgroup">
                    <Controller
                      name="budgetAllocatedForDisabled"
                      control={control}
                      autoFocus
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
                          min="0"
                          max="100"
                        />
                      )}
                    />
                    <span className="p-inputgroup-addon">%</span>
                  </div>
                </div>
              </div>
              <div class="p-col-12 p-md-3">
                <Controller
                  name="budgetAllocatedForDisabledSource"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Source
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      value={field.value}
                      handleSourceState={(e) => {
                        ////console.log("e", e);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 ">
                <hr style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}></hr>
              </div>
            </div>

            <div className="p-grid p-col-12 p-md-12 ">
              <div class="p-col-12 p-md-9">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("perOfDisPeopJob")}
                  <i
                    className="pi pi-question-circle tooltip-style"
                    title={t("perOfDisPeopJobDesc")}
                  />
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <div className="p-inputgroup">
                    <Controller
                      name="disabledJobByEthnicity"
                      control={control}
                      autoFocus
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
                          min="0"
                          max="100"
                          placeholder={t("ethnicity")}
                          tooltip={t("ethnicity")}
                        />
                      )}
                    />
                    <span className="p-inputgroup-addon">%</span>
                  </div>
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <div className="p-inputgroup">
                    <Controller
                      name="disabledJobByAge"
                      control={control}
                      autoFocus
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
                          min="0"
                          max="100"
                          placeholder={t("age")}
                          tooltip={t("age")}
                        />
                      )}
                    />
                    <span className="p-inputgroup-addon">%</span>
                  </div>
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <div className="p-inputgroup">
                    <Controller
                      name="disabledJobByGender"
                      control={control}
                      autoFocus
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
                          min="0"
                          max="100"
                          placeholder={t("gender")}
                          tooltip={t("gender")}
                        />
                      )}
                    />
                    <span className="p-inputgroup-addon">%</span>
                  </div>
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                  <div className="p-inputgroup">
                    <Controller
                      name="disabledJobByType"
                      control={control}
                      autoFocus
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
                          min="0"
                          max="100"
                          placeholder={t("type")}
                          tooltip={t("type")}
                        />
                      )}
                    />
                    <span className="p-inputgroup-addon">%</span>
                  </div>
                </div>
              </div>
              <div class="p-col-12 p-md-3">
                <Controller
                  name="disabledJobSource"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Source
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      value={field.value}
                      handleSourceState={(e) => {
                        ////console.log("e", e);
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div className="p-field p-col-12 p-md-12 p-pt-0">
              <div className="p-field p-col-10 p-md-10 float-left"></div>
              {hideBtn === "No" ? (
                <div className="p-field p-col-2 p-md-2 float-right">
                  {update === "No" ? (
                    <Button
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#1c80cf",
                        color: "#FFF",
                      }}
                      label={t("submit")}
                      onClick={handleSubmit(submitData)}
                    />
                  ) : (
                    <Button
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#1c80cf",
                        color: "#FFF",
                      }}
                      label={t("edit")}
                      onClick={handleSubmit(updateData)}
                    />
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </form>
        </div>
      </Card>
    </>
  );
}

export default DisabledModule;
