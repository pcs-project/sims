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
import { getByDisplayValue } from "@testing-library/dom";
import UserService from "../../security/api/services/UserService";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import FiscalQuarter from "../../utilities/components/FiscalQuarter";
function DisabledModule() {
  const [fiscalYear, setFiscalYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [disabledId, setDisabledId] = useState();

  const [update, setUpdate] = useState("No");
  const [showBtn, setShowBtn] = useState("Yes");
  const [hideBtn, setHideBtn] = useState("No");
  const [enableForm, setEnableForm] = useState(true);

  const [organization, setOrganization] = useState("");
  const [organizationList, setOrganizationList] = useState([]);
  const [disabledCenterModal, setDisabledCenterModal] = useState(true);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues
  } = useForm({
    mode: "all",
    categoryGa: {},
    categoryKa: {},
    categoryKha: {},
    categoryGha: {},
  });
  const toast = useRef(null);
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  useEffect(() => {
    UserService.getUserLevel().then((response) => {
      if (response.data.data === USER_LEVEL.LOCAL_LEVEL) {
        setHideBtn("No");
      } else {
        setHideBtn("Yes");
      }
    });
  }, []);

  //To save data
  const saveData = (e) => {
    e.preventDefault();
    let data = getValues();
    data.fiscalYear = fiscalYear;
    data.quarter = quarter;
    data.status = "Save";
    console.log("data", data);
    data.categoryKa == undefined ? (data.categoryKa = {}) : (data.categoryKa = data.categoryKa);
    data.categoryKha == undefined ? (data.categoryKha = {}) : (data.categoryKha = data.categoryKha);
    data.categoryGa == undefined ? (data.categoryGa = {}) : (data.categoryGa = data.categoryGa);
    data.categoryGha == undefined ? (data.categoryGha = {}) : (data.categoryGha = data.categoryGha);
    if (update == "No") {
      //trackPromise is used for loading
      trackPromise(
        DisabledService.saveData(data).then((response) => {
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
      );
    } else {
      data.disabledId = disabledId;
      trackPromise(
        DisabledService.updateData(data)
          .then((response) => {
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
    }
  };

  //To update data
  const submitData = (data) => {
    data.fiscalYear = fiscalYear;
    data.quarter = quarter;
    data.status = "Submit";
    console.log("data", data);

    data.categoryKa == undefined ? (data.categoryKa = {}) : (data.categoryKa = data.categoryKa);
    data.categoryKha == undefined ? (data.categoryKha = {}) : (data.categoryKha = data.categoryKha);
    data.categoryGa == undefined ? (data.categoryGa = {}) : (data.categoryGa = data.categoryGa);
    data.categoryGha == undefined ? (data.categoryGha = {}) : (data.categoryGha = data.categoryGha);

    if (update == "No") {
      //trackPromise is used for loading
      trackPromise(
        DisabledService.saveData(data)
          .then((response) => {
            console.log("response", response);
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
    } else {
      data.disabledId = disabledId;
      trackPromise(
        DisabledService.updateData(data)
          .then((response) => {
            console.log("response", response);
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
    }
  };

  const handleFiscalYear = (fiscalYearVal) => {
    console.log("fiscal year  ", fiscalYearVal);
    setFiscalYear(fiscalYearVal);
    console.log("quarter in fiscalYear", quarter);
    if (quarter !== "" && organization != "") {
      getListByOrganization(fiscalYearVal, quarter, organization);
    } else if (quarter !== "") {
      getListByFiscalYearAndQuarter(fiscalYearVal, quarter);
    }
  };

  const handleQuarter = (quarterVal) => {
    console.log("quarter  ", quarterVal);
    console.log("fiscalYear in quarter", fiscalYear);
    console.log("iin organization", organization);
    setQuarter(quarterVal);
    if (fiscalYear !== "" && organization != "") {
      getListByOrganization(fiscalYear, quarterVal, organization);
    } else if (fiscalYear !== "") {
      getListByFiscalYearAndQuarter(fiscalYear, quarterVal);
    }
  };

  const getListByFiscalYearAndQuarter = (fiscalYear, quarter) => {
    DisabledService.getListByFiscalYearAndQuarter(fiscalYear, quarter).then((response) => {
      console.log("response", response.data);
      if (response.data) {
        setFiscalYear(response.data.fiscalYear);
        setQuarter(response.data.quarter);
        setDisabledId(response.data.disabledId);
        response.data.categoryKa.disabledReceivingSSASource &&
          response.data.categoryKa.disabledReceivingSSASource[0] == ""
          ? (response.data.categoryKa.disabledReceivingSSASource = null)
          : (response.data.categoryKa.disabledReceivingSSASource =
            response.data.categoryKa.disabledReceivingSSASource);
        response.data.categoryKa.totDisabledPeopleSource &&
          response.data.categoryKa.totDisabledPeopleSource[0] == ""
          ? (response.data.categoryKa.totDisabledPeopleSource = null)
          : (response.data.categoryKa.totDisabledPeopleSource =
            response.data.categoryKa.totDisabledPeopleSource);

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
          totDisabledPeopleSource:
            response.data.totDisabledPeopleSource &&
              response.data.totDisabledPeopleSource[0] != "" &&
              response.data.totDisabledPeopleSource != ""
              ? response.data.totDisabledPeopleSource
              : null,
          maleRecSkillTraining: response.data.maleRecSkillTraining,
          femaleRecSkillTraining: response.data.femaleRecSkillTraining,
          othersRecSkillTraining: response.data.othersRecSkillTraining,
          disabledPeopleRecSkillSource:
            response.data.disabledPeopleRecSkillSource &&
              response.data.disabledPeopleRecSkillSource[0] != "" &&
              response.data.disabledPeopleRecSkillSource != ""
              ? response.data.disabledPeopleRecSkillSource
              : null,
          // disabledMaleReceivingSSA: response.data.disabledMaleReceivingSSA,
          // disabledFemaleReceivingSSA: response.data.disabledFemaleReceivingSSA,
          // disabledChildrenReceivingSSA:
          //   response.data.disabledChildrenReceivingSSA,
          // disabledAdultReceivingSSA: response.data.disabledAdultReceivingSSA,
          // disabledSeniorCitizenReceivingSSA:
          //   response.data.disabledSeniorCitizenReceivingSSA,
          // physicallyDisabledReceivingSSA:
          //   response.data.physicallyDisabledReceivingSSA,
          // partiallyvisuallyImpaired:
          //   response.data.partiallyvisuallyImpaired,
          // fullyvisuallyImpaired:
          //   response.data.fullyvisuallyImpaired,
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
          totDisabledRehabCenterSource:
            response.data.totDisabledRehabCenterSource[0] != "" &&
              response.data.totDisabledRehabCenterSource != ""
              ? response.data.totDisabledRehabCenterSource
              : null,
          disabledMaleReceivingServices: response.data.disabledMaleReceivingServices,
          disabledFemaleReceivingServices: response.data.disabledFemaleReceivingServices,
          disabledOthersReceivingServices: response.data.disabledOthersReceivingServices,
          disabledChildrenReceivingServices: response.data.disabledChildrenReceivingServices,
          disabledAdultReceivingServices: response.data.disabledAdultReceivingServices,
          disabledSeniorCitizenReceivingServices:
            response.data.disabledSeniorCitizenReceivingServices,
          physicallyDisabledReceivingServices: response.data.physicallyDisabledReceivingServices,
          visuallyImpairedReceivingServices: response.data.visuallyImpairedReceivingServices,
          hearingImpairedReceivingServices: response.data.hearingImpairedReceivingServices,
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
          disabledReceivingServicesSource:
            response.data.disabledReceivingServicesSource[0] != "" &&
              response.data.disabledReceivingServicesSource != ""
              ? response.data.disabledReceivingServicesSource
              : null,
          budgetAllocatedForDisabled: response.data.budgetAllocatedForDisabled,
          budgetAllocatedForDisabledSource:
            response.data.budgetAllocatedForDisabledSource[0] != "" &&
              response.data.budgetAllocatedForDisabledSource != ""
              ? response.data.budgetAllocatedForDisabledSource
              : null,
          disabledJobByEthnicity: response.data.disabledJobByEthnicity,
          disabledJobByAge: response.data.disabledJobByAge,
          disabledJobByGender: response.data.disabledJobByGender,
          disabledJobByType: response.data.disabledJobByType,
          disabledJobSource:
            response.data.disabledJobSource[0] != "" && response.data.disabledJobSource != ""
              ? response.data.disabledJobSource
              : null,
          categoryKa: response.data.categoryKa,
          categoryKha: response.data.categoryKha,
          categoryGa: response.data.categoryGa,
          categoryGha: response.data.categoryGha,
          perOfDisPeopJob: response.data.perOfDisPeopJob,

          disabledAffectedByCalamities: response.data.disabledAffectedByCalamities,
          disabledAffectedByCalamitiesSource:
            response.data.disabledAffectedByCalamitiesSource[0] != "" &&
              response.data.disabledAffectedByCalamitiesSource != ""
              ? response.data.disabledAffectedByCalamitiesSource
              : null,
        });
        setUpdate("Yes");
        if (response.data.status === "Submit") {
          setShowBtn("No");
        } else {
          setShowBtn("Yes");
        }
      } else {
        ////console.log("no data");
        reset({
          totDisabledPeopleSource: [],
          disabledPeopleRecSkillSource: [],
          disabledReceivingSSASource: [],
          totDisabledRehabCenterSource: [],
          disabledReceivingServicesSource: [],
          budgetAllocatedForDisabledSource: [],
          disabledJobSource: [],
        });
        setUpdate("No");
        setShowBtn("Yes");
      }
    });
  };

  const handleOrganization = (organizationId) => {
    console.log("quarter  ", quarter);
    console.log("fiscalYear in quarter", fiscalYear);
    setOrganization(organizationId);
    if (fiscalYear !== "" && quarter !== "") {
      getListByOrganization(fiscalYear, quarter, organizationId);
    }
  };

  const getListByOrganization = (fiscalYear, quarter, organization) => {
    DisabledService.getListByOrganization(
      fiscalYear,
      quarter,
      organization).then((response) => {
        ////console.log("response", response.data);
        if (response.data) {
          setFiscalYear(response.data.fiscalYear);
          setQuarter(response.data.quarter);
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
            totDisabledPeopleSource:
              response.data.totDisabledPeopleSource[0] != "" &&
                response.data.totDisabledPeopleSource != ""
                ? response.data.totDisabledPeopleSource
                : null,
            maleRecSkillTraining: response.data.maleRecSkillTraining,
            femaleRecSkillTraining: response.data.femaleRecSkillTraining,
            othersRecSkillTraining: response.data.othersRecSkillTraining,
            disabledPeopleRecSkillSource:
              response.data.disabledPeopleRecSkillSource[0] != "" &&
                response.data.disabledPeopleRecSkillSource != ""
                ? response.data.disabledPeopleRecSkillSource
                : null,
            // disabledMaleReceivingSSA: response.data.disabledMaleReceivingSSA,
            // disabledFemaleReceivingSSA: response.data.disabledFemaleReceivingSSA,
            // disabledChildrenReceivingSSA:
            //   response.data.disabledChildrenReceivingSSA,
            // disabledAdultReceivingSSA: response.data.disabledAdultReceivingSSA,
            // disabledSeniorCitizenReceivingSSA:
            //   response.data.disabledSeniorCitizenReceivingSSA,
            // physicallyDisabledReceivingSSA:
            //   response.data.physicallyDisabledReceivingSSA,
            // partiallyvisuallyImpaired:
            //   response.data.partiallyvisuallyImpaired,
            // fullyvisuallyImpaired:
            //   response.data.fullyvisuallyImpaired,
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
            totDisabledRehabCenterSource:
              response.data.totDisabledRehabCenterSource[0] != "" &&
                response.data.totDisabledRehabCenterSource != ""
                ? response.data.totDisabledRehabCenterSource
                : null,
            disabledMaleReceivingServices: response.data.disabledMaleReceivingServices,
            disabledFemaleReceivingServices: response.data.disabledFemaleReceivingServices,
            disabledOthersReceivingServices: response.data.disabledOthersReceivingServices,
            disabledChildrenReceivingServices: response.data.disabledChildrenReceivingServices,
            disabledAdultReceivingServices: response.data.disabledAdultReceivingServices,
            disabledSeniorCitizenReceivingServices:
              response.data.disabledSeniorCitizenReceivingServices,
            physicallyDisabledReceivingServices: response.data.physicallyDisabledReceivingServices,
            visuallyImpairedReceivingServices: response.data.visuallyImpairedReceivingServices,
            hearingImpairedReceivingServices: response.data.hearingImpairedReceivingServices,
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
            disabledReceivingServicesSource:
              response.data.disabledReceivingServicesSource[0] != "" &&
                response.data.disabledReceivingServicesSource != ""
                ? response.data.disabledReceivingServicesSource
                : null,
            budgetAllocatedForDisabled: response.data.budgetAllocatedForDisabled,
            budgetAllocatedForDisabledSource:
              response.data.budgetAllocatedForDisabledSource[0] != "" &&
                response.data.budgetAllocatedForDisabledSource != ""
                ? response.data.budgetAllocatedForDisabledSource
                : null,
            disabledJobByEthnicity: response.data.disabledJobByEthnicity,
            disabledJobByAge: response.data.disabledJobByAge,
            disabledJobByGender: response.data.disabledJobByGender,
            disabledJobByType: response.data.disabledJobByType,
            disabledJobSource:
              response.data.disabledJobSource[0] != "" && response.data.disabledJobSource != ""
                ? response.data.disabledJobSource
                : null,
            categoryKa: response.data.categoryKa,
            categoryKha: response.data.categoryKha,
            categoryGa: response.data.categoryGa,
            categoryGha: response.data.categoryGha,
            perOfDisPeopJob: response.data.perOfDisPeopJob,

            disabledAffectedByCalamities: response.data.disabledAffectedByCalamities,
            disabledAffectedByCalamitiesSource:
              response.data.disabledAffectedByCalamitiesSource[0] != "" &&
                response.data.disabledAffectedByCalamitiesSource != ""
                ? response.data.disabledAffectedByCalamitiesSource
                : null,
          });
        } else {
          ////console.log("no data");
          reset({
            totDisabledPeopleSource: [],
            disabledPeopleRecSkillSource: [],
            disabledReceivingSSASource: [],
            totDisabledRehabCenterSource: [],
            disabledReceivingServicesSource: [],
            budgetAllocatedForDisabledSource: [],
            disabledJobSource: [],
          });
        }
      });
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const [subActiveIndex, setSubActiveIndex] = useState(0);

  const fiscalYearValidation = () => {
    if (fiscalYear === "" || quarter === "") {
      toast.current.show({
        severity: "warn",
        summary: t("selectFiscalYearQuarter"),
        life: 3000,
      });
    } else {
      setEnableForm(false);
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className=" p-card-content">
          <h4 className="p-pt-0">{t("disabledModule")}</h4>
        </div>
      </Card>

      <Card className="p-mt-0"
      // style={{ height: "72vh", overflowY: "auto" }}
      >
        <div className=" p-card-content">
          <form className="p-grid p-fluid" autoComplete="off">
            <Organization submitOrganizationId={handleOrganization} />
            {hideBtn === "Yes" ? <></> : <></>}
            <FiscalQuarter
              fiscalYearValue={fiscalYear}
              handleFiscalYearState={handleFiscalYear}
              quarterValue={quarter}
              handleQuarterState={handleQuarter}
            />
            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 ">
                <hr style={{ marginTop: "5px" }}></hr>
              </div>
            </div>

            <div className="main-form" onClick={fiscalYearValidation} disabled={enableForm}>
              <TabView
                activeIndex={activeIndex}
                onTabChange={(e) => {
                  setActiveIndex(e.index);
                  setSubActiveIndex(0);
                }}
              >
                <TabPanel header={t("categoryKa")}>
                  <div className="p-grid p-col-12 p-md-12 ">
                    <div class="p-col-12 p-md-9">
                      <div className="p-field p-col-12 p-md-12 float-left main-label">
                        {t("totDisPeopCatKa")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("totDisPeopCatKaDesc")}
                        />
                      </div>
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryKa.disabledMale") ? getValues("categoryKa.disabledMale") : 0)
                                + (getValues("categoryKa.disabledFemale") ? getValues("categoryKa.disabledFemale") : 0)
                                + (getValues("categoryKa.disabledOthers") ? getValues("categoryKa.disabledOthers") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryKa.disabledChildren") ? getValues("categoryKa.disabledChildren") : 0)
                                + (getValues("categoryKa.disabledAdult") ? getValues("categoryKa.disabledAdult") : 0)
                                + (getValues("categoryKa.disabledSeniorCitizen") ? getValues("categoryKa.disabledSeniorCitizen") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryKa.visuallyImpaired"
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
                              placeholder={t("visuallyImpaired")}
                              tooltip={t("visuallyImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryKa.hearingImpaired"
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
                              placeholder={t("hearingImpaired")}
                              tooltip={t("hearingImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left"></div>
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>

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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryKa.physicallyDisabled") ? getValues("categoryKa.physicallyDisabled") : 0)
                                + (getValues("categoryKa.visuallyImpaired") ? getValues("categoryKa.visuallyImpaired") : 0)
                                + (getValues("categoryKa.hearingImpaired") ? getValues("categoryKa.hearingImpaired") : 0)
                                + (getValues("categoryKa.deafBlind") ? getValues("categoryKa.deafBlind") : 0)
                                + (getValues("categoryKa.speechAndHearingDisability") ? getValues("categoryKa.speechAndHearingDisability") : 0)
                                + (getValues("categoryKa.mentalDisability") ? getValues("categoryKa.mentalDisability") : 0)
                                + (getValues("categoryKa.intellectuallyDisabled") ? getValues("categoryKa.intellectuallyDisabled") : 0)
                                + (getValues("categoryKa.hemophelia") ? getValues("categoryKa.hemophelia") : 0)
                                + (getValues("categoryKa.autism") ? getValues("categoryKa.autism") : 0)
                                + (getValues("categoryKa.multiple") ? getValues("categoryKa.multiple") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div class="p-col-12 p-md-3">
                      <Controller
                        name="categoryKa.totDisabledPeopleSource"
                        control={control}
                        rules={{ required: "Source is required" }}
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
                            sourceOtherValue={getValues("categoryKa.totDisabledPeopleSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("categoryKa.totDisabledPeopleSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("categoryKa.totDisabledPeopleSource")}
                      </div>
                    </div>
                  </div>

                  {/* ==== */}
                  <div className="p-grid p-col-12 p-md-12 ">
                    <div class="p-col-12 p-md-9">
                      <div className="p-field p-col-12 p-md-12 float-left main-label">
                        {t("disPeopReceivingSSAUnderKa")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("disPeopReceivingSSAUnderKaDesc")}
                        />
                      </div>
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
                              value={field.value > getValues("categoryKa.disabledMale") ? setValue("categoryKa.disabledMaleReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("male")}
                              tooltip={t("male")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.disabledMale")}
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
                              value={field.value > getValues("categoryKa.disabledFemale") ? setValue("categoryKa.disabledFemaleReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("female")}
                              tooltip={t("female")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.disabledFemale")}
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
                              value={field.value > getValues("categoryKa.disabledOthers") ? setValue("categoryKa.disabledOthersReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("others")}
                              tooltip={t("others")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.disabledOthers")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryKa.disabledMaleReceivingSSA") ? getValues("categoryKa.disabledMaleReceivingSSA") : 0)
                                + (getValues("categoryKa.disabledFemaleReceivingSSA") ? getValues("categoryKa.disabledFemaleReceivingSSA") : 0)
                                + (getValues("categoryKa.disabledOthersReceivingSSA") ? getValues("categoryKa.disabledOthersReceivingSSA") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              value={field.value > getValues("categoryKa.disabledChildren") ? setValue("categoryKa.disabledChildrenReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("children")}
                              tooltip={t("children")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.disabledChildren")}
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
                              value={field.value > getValues("categoryKa.disabledAdult") ? setValue("categoryKa.disabledAdultReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("adult")}
                              tooltip={t("adult")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.disabledAdult")}
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
                              value={field.value > getValues("categoryKa.disabledSeniorCitizen") ? setValue("categoryKa.disabledSeniorCitizenReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("seniorCitizen")}
                              tooltip={t("seniorCitizen")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.disabledSeniorCitizen")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryKa.disabledChildrenReceivingSSA") ? getValues("categoryKa.disabledChildrenReceivingSSA") : 0)
                                + (getValues("categoryKa.disabledAdultReceivingSSA") ? getValues("categoryKa.disabledAdultReceivingSSA") : 0)
                                + (getValues("categoryKa.disabledSeniorCitizenReceivingSSA") ? getValues("categoryKa.disabledSeniorCitizenReceivingSSA") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              value={field.value > getValues("categoryKa.physicallyDisabled") ? setValue("categoryKa.physicallyDisabledReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("physicallyDisabled")}
                              tooltip={t("physicallyDisabled")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.physicallyDisabled")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryKa.visuallyImpairedReceivingSSA"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value > getValues("categoryKa.visuallyImpaired") ? setValue("categoryKa.visuallyImpairedReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("visuallyImpaired")}
                              tooltip={t("visuallyImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.visuallyImpaired")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryKa.hearingImpairedReceivingSSA"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value > getValues("categoryKa.hearingImpaired") ? setValue("categoryKa.hearingImpairedReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("hearingImpaired")}
                              tooltip={t("hearingImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.hearingImpaired")}
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
                              value={field.value > getValues("categoryKa.deafBlind") ? setValue("categoryKa.deafBlindReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("deafBlind")}
                              tooltip={t("deafBlind")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.deafBlind")}
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
                              value={field.value > getValues("categoryKa.speechAndHearing") ? setValue("categoryKa.speechAndHearingReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("speechAndHearingDisability")}
                              tooltip={t("speechAndHearingDisability")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.speechAndHearing")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left"></div>
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
                              value={field.value > getValues("categoryKa.mentalDisability") ? setValue("categoryKa.mentalDisabilityReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("mentalDisability")}
                              tooltip={t("mentalDisability")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.mentalDisability")}
                            />
                          )}
                        />
                      </div>

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
                              value={field.value > getValues("categoryKa.intellectuallyDisabled") ? setValue("categoryKa.intellectuallyDisabledReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("intellectuallyDisabled")}
                              tooltip={t("intellectuallyDisabled")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.intellectuallyDisabled")}
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
                              value={field.value > getValues("categoryKa.hemophelia") ? setValue("categoryKa.hemopheliaReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("hemophelia")}
                              tooltip={t("hemophelia")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.hemophelia")}
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
                              value={field.value > getValues("categoryKa.autism") ? setValue("categoryKa.autismReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("autism")}
                              tooltip={t("autism")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.autism")}
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
                              value={field.value > getValues("categoryKa.multiple") ? setValue("categoryKa.multipleReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("multiple")}
                              tooltip={t("multiple")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKa.multiple")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryKa.physicallyDisabledReceivingSSA") ? getValues("categoryKa.physicallyDisabledReceivingSSA") : 0)
                                + (getValues("categoryKa.visuallyImpairedReceivingSSA") ? getValues("categoryKa.visuallyImpairedReceivingSSA") : 0)
                                + (getValues("categoryKa.hearingImpairedReceivingSSA") ? getValues("categoryKa.hearingImpairedReceivingSSA") : 0)
                                + (getValues("categoryKa.deafBlindReceivingSSA") ? getValues("categoryKa.deafBlindReceivingSSA") : 0)
                                + (getValues("categoryKa.speechAndHearingDisabilityReceivingSSA") ? getValues("categoryKa.speechAndHearingDisabilityReceivingSSA") : 0)
                                + (getValues("categoryKa.mentalDisabilityReceivingSSA") ? getValues("categoryKa.mentalDisabilityReceivingSSA") : 0)
                                + (getValues("categoryKa.intellectuallyDisabledReceivingSSA") ? getValues("categoryKa.intellectuallyDisabledReceivingSSA") : 0)
                                + (getValues("categoryKa.hemopheliaReceivingSSA") ? getValues("categoryKa.hemopheliaReceivingSSA") : 0)
                                + (getValues("categoryKa.autismReceivingSSA") ? getValues("categoryKa.autismReceivingSSA") : 0)
                                + (getValues("categoryKa.multipleReceivingSSA") ? getValues("categoryKa.multipleReceivingSSA") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left">
                        <p style={{ margin: "0px", color: "red" }}>{t("disabledCategoryKaNote")}</p>
                      </div>
                    </div>
                    <div class="p-col-12 p-md-3">
                      <Controller
                        name="categoryKa.disabledReceivingSSASource"
                        control={control}
                        rules={{ required: "Source is required" }}
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
                            sourceOtherValue={getValues("categoryKa.disabledReceivingSSASourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("categoryKa.disabledReceivingSSASourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("categoryKa.disabledReceivingSSASource")}
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel header={t("categoryKha")}>
                  <div className="p-grid p-col-12 p-md-12 ">
                    <div class="p-col-12 p-md-9">
                      <div className="p-field p-col-12 p-md-12 float-left main-label">
                        {t("totDisPeopCatKha")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("totDisPeopCatKhaDesc")}
                        />
                      </div>
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryKha.disabledMale") ? getValues("categoryKha.disabledMale") : 0)
                                + (getValues("categoryKha.disabledFemale") ? getValues("categoryKha.disabledFemale") : 0)
                                + (getValues("categoryKha.disabledOthers") ? getValues("categoryKha.disabledOthers") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryKha.disabledChildren") ? getValues("categoryKha.disabledChildren") : 0)
                                + (getValues("categoryKha.disabledAdult") ? getValues("categoryKha.disabledAdult") : 0)
                                + (getValues("categoryKha.disabledSeniorCitizen") ? getValues("categoryKha.disabledSeniorCitizen") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryKha.visuallyImpaired"
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
                              placeholder={t("visuallyImpaired")}
                              tooltip={t("visuallyImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryKha.hearingImpaired"
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
                              placeholder={t("hearingImpaired")}
                              tooltip={t("hearingImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left"></div>
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>

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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryKha.physicallyDisabled") ? getValues("categoryKha.physicallyDisabled") : 0)
                                + (getValues("categoryKha.visuallyImpaired") ? getValues("categoryKha.visuallyImpaired") : 0)
                                + (getValues("categoryKha.hearingImpaired") ? getValues("categoryKha.hearingImpaired") : 0)
                                + (getValues("categoryKha.deafBlind") ? getValues("categoryKha.deafBlind") : 0)
                                + (getValues("categoryKha.speechAndHearingDisability") ? getValues("categoryKha.speechAndHearingDisability") : 0)
                                + (getValues("categoryKha.mentalDisability") ? getValues("categoryKha.mentalDisability") : 0)
                                + (getValues("categoryKha.intellectuallyDisabled") ? getValues("categoryKha.intellectuallyDisabled") : 0)
                                + (getValues("categoryKha.hemophelia") ? getValues("categoryKha.hemophelia") : 0)
                                + (getValues("categoryKha.autism") ? getValues("categoryKha.autism") : 0)
                                + (getValues("categoryKha.multiple") ? getValues("categoryKha.multiple") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div class="p-col-12 p-md-3">
                      <Controller
                        name="categoryKha.totDisabledPeopleSource"
                        control={control}
                        rules={{ required: "Source is required" }}
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
                            sourceOtherValue={getValues("categoryKha.totDisabledPeopleSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("categoryKha.totDisabledPeopleSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("categoryKha.totDisabledPeopleSource")}
                      </div>
                    </div>
                  </div>

                  {/* ==== */}
                  <div className="p-grid p-col-12 p-md-12 ">
                    <div class="p-col-12 p-md-9">
                      <div className="p-field p-col-12 p-md-12 float-left main-label">
                        {t("disPeopReceivingSSAUnderKha")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("disPeopReceivingSSAUnderKhaDesc")}
                        />
                      </div>
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
                              value={field.value > getValues("categoryKha.disabledMale") ? setValue("categoryKha.disabledMaleReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("male")}
                              tooltip={t("male")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.disabledMale")}
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
                              value={field.value > getValues("categoryKha.disabledFemale") ? setValue("categoryKha.disabledFemaleReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("female")}
                              tooltip={t("female")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.disabledFemale")}
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
                              value={field.value > getValues("categoryKha.disabledOthers") ? setValue("categoryKha.disabledOthersReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("others")}
                              tooltip={t("others")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.disabledOthers")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryKha.disabledMaleReceivingSSA") ? getValues("categoryKha.disabledMaleReceivingSSA") : 0)
                                + (getValues("categoryKha.disabledFemaleReceivingSSA") ? getValues("categoryKha.disabledFemaleReceivingSSA") : 0)
                                + (getValues("categoryKha.disabledOthersReceivingSSA") ? getValues("categoryKha.disabledOthersReceivingSSA") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              value={field.value > getValues("categoryKha.disabledChildren") ? setValue("categoryKha.disabledChildrenReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("children")}
                              tooltip={t("children")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.disabledChildren")}
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
                              value={field.value > getValues("categoryKha.disabledAdult") ? setValue("categoryKha.disabledAdultReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("adult")}
                              tooltip={t("adult")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.disabledAdult")}
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
                              value={field.value > getValues("categoryKha.disabledSeniorCitizen") ? setValue("categoryKha.disabledSeniorCitizenReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("seniorCitizen")}
                              tooltip={t("seniorCitizen")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.disabledSeniorCitizen")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryKha.disabledChildrenReceivingSSA") ? getValues("categoryKha.disabledChildrenReceivingSSA") : 0)
                                + (getValues("categoryKha.disabledAdultReceivingSSA") ? getValues("categoryKha.disabledAdultReceivingSSA") : 0)
                                + (getValues("categoryKha.disabledSeniorCitizenReceivingSSA") ? getValues("categoryKha.disabledSeniorCitizenReceivingSSA") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              value={field.value > getValues("categoryKha.physicallyDisabled") ? setValue("categoryKha.physicallyDisabledReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("physicallyDisabled")}
                              tooltip={t("physicallyDisabled")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.physicallyDisabled")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryKha.visuallyImpairedReceivingSSA"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value > getValues("categoryKha.visuallyImpaired") ? setValue("categoryKha.visuallyImpairedReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("visuallyImpaired")}
                              tooltip={t("visuallyImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.visuallyImpaired")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryKha.hearingImpairedReceivingSSA"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value > getValues("categoryKha.hearingImpaired") ? setValue("categoryKha.hearingImpairedReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("hearingImpaired")}
                              tooltip={t("hearingImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.hearingImpaired")}
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
                              value={field.value > getValues("categoryKha.deafBlind") ? setValue("categoryKha.deafBlindReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("deafBlind")}
                              tooltip={t("deafBlind")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.deafBlind")}
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
                              value={field.value > getValues("categoryKha.speechAndHearing") ? setValue("categoryKha.speechAndHearingReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("speechAndHearingDisability")}
                              tooltip={t("speechAndHearingDisability")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.speechAndHearing")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left"></div>
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
                              value={field.value > getValues("categoryKha.mentalDisability") ? setValue("categoryKha.mentalDisabilityReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("mentalDisability")}
                              tooltip={t("mentalDisability")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.mentalDisability")}
                            />
                          )}
                        />
                      </div>

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
                              value={field.value > getValues("categoryKha.intellectuallyDisabled") ? setValue("categoryKha.intellectuallyDisabledReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("intellectuallyDisabled")}
                              tooltip={t("intellectuallyDisabled")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.intellectuallyDisabled")}
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
                              value={field.value > getValues("categoryKha.hemophelia") ? setValue("categoryKha.hemopheliaReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("hemophelia")}
                              tooltip={t("hemophelia")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.hemophelia")}
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
                              value={field.value > getValues("categoryKha.autism") ? setValue("categoryKha.autismReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("autism")}
                              tooltip={t("autism")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.autism")}
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
                              value={field.value > getValues("categoryKha.multiple") ? setValue("categoryKha.multipleReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("multiple")}
                              tooltip={t("multiple")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryKha.multiple")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryKha.physicallyDisabledReceivingSSA") ? getValues("categoryKha.physicallyDisabledReceivingSSA") : 0)
                                + (getValues("categoryKha.visuallyImpairedReceivingSSA") ? getValues("categoryKha.visuallyImpairedReceivingSSA") : 0)
                                + (getValues("categoryKha.hearingImpairedReceivingSSA") ? getValues("categoryKha.hearingImpairedReceivingSSA") : 0)
                                + (getValues("categoryKha.deafBlindReceivingSSA") ? getValues("categoryKha.deafBlindReceivingSSA") : 0)
                                + (getValues("categoryKha.speechAndHearingDisabilityReceivingSSA") ? getValues("categoryKha.speechAndHearingDisabilityReceivingSSA") : 0)
                                + (getValues("categoryKha.mentalDisabilityReceivingSSA") ? getValues("categoryKha.mentalDisabilityReceivingSSA") : 0)
                                + (getValues("categoryKha.intellectuallyDisabledReceivingSSA") ? getValues("categoryKha.intellectuallyDisabledReceivingSSA") : 0)
                                + (getValues("categoryKha.hemopheliaReceivingSSA") ? getValues("categoryKha.hemopheliaReceivingSSA") : 0)
                                + (getValues("categoryKha.autismReceivingSSA") ? getValues("categoryKha.autismReceivingSSA") : 0)
                                + (getValues("categoryKha.multipleReceivingSSA") ? getValues("categoryKha.multipleReceivingSSA") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left">
                        <p style={{ margin: "0px", color: "red" }}>{t("disabledCategoryKhaNote")}</p>
                      </div>
                    </div>
                    <div class="p-col-12 p-md-3">
                      <Controller
                        name="categoryKha.disabledReceivingSSASource"
                        control={control}
                        rules={{ required: "Source is required" }}
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
                            sourceOtherValue={getValues("categoryKha.disabledReceivingSSASourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("categoryKha.disabledReceivingSSASourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("categoryKha.disabledReceivingSSASource")}
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel header={t("categoryGa")}>
                  <div className="p-grid p-col-12 p-md-12 ">
                    <div class="p-col-12 p-md-9">
                      <div className="p-field p-col-12 p-md-12 float-left main-label">
                        {t("totDisPeopCatGa")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("totDisPeopCatGaDesc")}
                        />
                      </div>
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryGa.disabledMale") ? getValues("categoryGa.disabledMale") : 0)
                                + (getValues("categoryGa.disabledFemale") ? getValues("categoryGa.disabledFemale") : 0)
                                + (getValues("categoryGa.disabledOthers") ? getValues("categoryGa.disabledOthers") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryGa.disabledChildren") ? getValues("categoryGa.disabledChildren") : 0)
                                + (getValues("categoryGa.disabledAdult") ? getValues("categoryGa.disabledAdult") : 0)
                                + (getValues("categoryGa.disabledSeniorCitizen") ? getValues("categoryGa.disabledSeniorCitizen") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryGa.visuallyImpaired"
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
                              placeholder={t("visuallyImpaired")}
                              tooltip={t("visuallyImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryGa.hearingImpaired"
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
                              placeholder={t("hearingImpaired")}
                              tooltip={t("hearingImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left"></div>
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>

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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryGa.physicallyDisabled") ? getValues("categoryGa.physicallyDisabled") : 0)
                                + (getValues("categoryGa.visuallyImpaired") ? getValues("categoryGa.visuallyImpaired") : 0)
                                + (getValues("categoryGa.hearingImpaired") ? getValues("categoryGa.hearingImpaired") : 0)
                                + (getValues("categoryGa.deafBlind") ? getValues("categoryGa.deafBlind") : 0)
                                + (getValues("categoryGa.speechAndHearingDisability") ? getValues("categoryGa.speechAndHearingDisability") : 0)
                                + (getValues("categoryGa.mentalDisability") ? getValues("categoryGa.mentalDisability") : 0)
                                + (getValues("categoryGa.intellectuallyDisabled") ? getValues("categoryGa.intellectuallyDisabled") : 0)
                                + (getValues("categoryGa.hemophelia") ? getValues("categoryGa.hemophelia") : 0)
                                + (getValues("categoryGa.autism") ? getValues("categoryGa.autism") : 0)
                                + (getValues("categoryGa.multiple") ? getValues("categoryGa.multiple") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div class="p-col-12 p-md-3">
                      <Controller
                        name="categoryGa.totDisabledPeopleSource"
                        control={control}
                        rules={{ required: "Source is required" }}
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
                            sourceOtherValue={getValues("categoryGa.totDisabledPeopleSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("categoryGa.totDisabledPeopleSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("categoryGa.totDisabledPeopleSource")}
                      </div>
                    </div>
                  </div>

                  {/* ==== */}
                  <div className="p-grid p-col-12 p-md-12 ">
                    <div class="p-col-12 p-md-9">
                      <div className="p-field p-col-12 p-md-12 float-left main-label">
                        {t("disPeopReceivingSSAUnderGa")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("disPeopReceivingSSAUnderGaDesc")}
                        />
                      </div>
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
                              value={field.value > getValues("categoryGa.disabledMale") ? setValue("categoryGa.disabledMaleReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("male")}
                              tooltip={t("male")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.disabledMale")}
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
                              value={field.value > getValues("categoryGa.disabledFemale") ? setValue("categoryGa.disabledFemaleReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("female")}
                              tooltip={t("female")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.disabledFemale")}
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
                              value={field.value > getValues("categoryGa.disabledOthers") ? setValue("categoryGa.disabledOthersReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("others")}
                              tooltip={t("others")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.disabledOthers")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryGa.disabledMaleReceivingSSA") ? getValues("categoryGa.disabledMaleReceivingSSA") : 0)
                                + (getValues("categoryGa.disabledFemaleReceivingSSA") ? getValues("categoryGa.disabledFemaleReceivingSSA") : 0)
                                + (getValues("categoryGa.disabledOthersReceivingSSA") ? getValues("categoryGa.disabledOthersReceivingSSA") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              value={field.value > getValues("categoryGa.disabledChildren") ? setValue("categoryGa.disabledChildrenReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("children")}
                              tooltip={t("children")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.disabledChildren")}
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
                              value={field.value > getValues("categoryGa.disabledAdult") ? setValue("categoryGa.disabledAdultReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("adult")}
                              tooltip={t("adult")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.disabledAdult")}
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
                              value={field.value > getValues("categoryGa.disabledSeniorCitizen") ? setValue("categoryGa.disabledSeniorCitizenReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("seniorCitizen")}
                              tooltip={t("seniorCitizen")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.disabledSeniorCitizen")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryGa.disabledChildrenReceivingSSA") ? getValues("categoryGa.disabledChildrenReceivingSSA") : 0)
                                + (getValues("categoryGa.disabledAdultReceivingSSA") ? getValues("categoryGa.disabledAdultReceivingSSA") : 0)
                                + (getValues("categoryGa.disabledSeniorCitizenReceivingSSA") ? getValues("categoryGa.disabledSeniorCitizenReceivingSSA") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              value={field.value > getValues("categoryGa.physicallyDisabled") ? setValue("categoryGa.physicallyDisabledReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("physicallyDisabled")}
                              tooltip={t("physicallyDisabled")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.physicallyDisabled")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryGa.visuallyImpairedReceivingSSA"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value > getValues("categoryGa.visuallyImpaired") ? setValue("categoryGa.visuallyImpairedReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("visuallyImpaired")}
                              tooltip={t("visuallyImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.visuallyImpaired")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryGa.hearingImpairedReceivingSSA"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value > getValues("categoryGa.hearingImpaired") ? setValue("categoryGa.hearingImpairedReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("hearingImpaired")}
                              tooltip={t("hearingImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.hearingImpaired")}
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
                              value={field.value > getValues("categoryGa.deafBlind") ? setValue("categoryGa.deafBlindReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("deafBlind")}
                              tooltip={t("deafBlind")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.deafBlind")}
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
                              value={field.value > getValues("categoryGa.speechAndHearing") ? setValue("categoryGa.speechAndHearingReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("speechAndHearingDisability")}
                              tooltip={t("speechAndHearingDisability")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.speechAndHearing")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left"></div>
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
                              value={field.value > getValues("categoryGa.mentalDisability") ? setValue("categoryGa.mentalDisabilityReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("mentalDisability")}
                              tooltip={t("mentalDisability")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.mentalDisability")}
                            />
                          )}
                        />
                      </div>

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
                              value={field.value > getValues("categoryGa.intellectuallyDisabled") ? setValue("categoryGa.intellectuallyDisabledReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("intellectuallyDisabled")}
                              tooltip={t("intellectuallyDisabled")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.intellectuallyDisabled")}
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
                              value={field.value > getValues("categoryGa.hemophelia") ? setValue("categoryGa.hemopheliaReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("hemophelia")}
                              tooltip={t("hemophelia")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.hemophelia")}
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
                              value={field.value > getValues("categoryGa.autism") ? setValue("categoryGa.autismReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("autism")}
                              tooltip={t("autism")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.autism")}
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
                              value={field.value > getValues("categoryGa.multiple") ? setValue("categoryGa.multipleReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("multiple")}
                              tooltip={t("multiple")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGa.multiple")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryGa.physicallyDisabledReceivingSSA") ? getValues("categoryGa.physicallyDisabledReceivingSSA") : 0)
                                + (getValues("categoryGa.visuallyImpairedReceivingSSA") ? getValues("categoryGa.visuallyImpairedReceivingSSA") : 0)
                                + (getValues("categoryGa.hearingImpairedReceivingSSA") ? getValues("categoryGa.hearingImpairedReceivingSSA") : 0)
                                + (getValues("categoryGa.deafBlindReceivingSSA") ? getValues("categoryGa.deafBlindReceivingSSA") : 0)
                                + (getValues("categoryGa.speechAndHearingDisabilityReceivingSSA") ? getValues("categoryGa.speechAndHearingDisabilityReceivingSSA") : 0)
                                + (getValues("categoryGa.mentalDisabilityReceivingSSA") ? getValues("categoryGa.mentalDisabilityReceivingSSA") : 0)
                                + (getValues("categoryGa.intellectuallyDisabledReceivingSSA") ? getValues("categoryGa.intellectuallyDisabledReceivingSSA") : 0)
                                + (getValues("categoryGa.hemopheliaReceivingSSA") ? getValues("categoryGa.hemopheliaReceivingSSA") : 0)
                                + (getValues("categoryGa.autismReceivingSSA") ? getValues("categoryGa.autismReceivingSSA") : 0)
                                + (getValues("categoryGa.multipleReceivingSSA") ? getValues("categoryGa.multipleReceivingSSA") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left">
                        <p style={{ margin: "0px", color: "red" }}>{t("disabledCategoryGaNote")}</p>
                      </div>
                    </div>
                    <div class="p-col-12 p-md-3">
                      <Controller
                        name="categoryGa.disabledReceivingSSASource"
                        control={control}
                        rules={{ required: "Source is required" }}
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
                            sourceOtherValue={getValues("categoryGa.disabledReceivingSSASourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("categoryGa.disabledReceivingSSASourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("categoryGa.disabledReceivingSSASource")}
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel header={t("categoryGha")}>
                  <div className="p-grid p-col-12 p-md-12 ">
                    <div class="p-col-12 p-md-9">
                      <div className="p-field p-col-12 p-md-12 float-left main-label">
                        {t("totDisPeopCatGha")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("totDisPeopCatGhaDesc")}
                        />
                      </div>
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryGha.disabledMale") ? getValues("categoryGha.disabledMale") : 0)
                                + (getValues("categoryGha.disabledFemale") ? getValues("categoryGha.disabledFemale") : 0)
                                + (getValues("categoryGha.disabledOthers") ? getValues("categoryGha.disabledOthers") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryGha.disabledChildren") ? getValues("categoryGha.disabledChildren") : 0)
                                + (getValues("categoryGha.disabledAdult") ? getValues("categoryGha.disabledAdult") : 0)
                                + (getValues("categoryGha.disabledSeniorCitizen") ? getValues("categoryGha.disabledSeniorCitizen") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryGha.visuallyImpaired"
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
                              placeholder={t("visuallyImpaired")}
                              tooltip={t("visuallyImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryGha.hearingImpaired"
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
                              placeholder={t("hearingImpaired")}
                              tooltip={t("hearingImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left"></div>
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>

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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryGha.physicallyDisabled") ? getValues("categoryGha.physicallyDisabled") : 0)
                                + (getValues("categoryGha.visuallyImpaired") ? getValues("categoryGha.visuallyImpaired") : 0)
                                + (getValues("categoryGha.hearingImpaired") ? getValues("categoryGha.hearingImpaired") : 0)
                                + (getValues("categoryGha.deafBlind") ? getValues("categoryGha.deafBlind") : 0)
                                + (getValues("categoryGha.speechAndHearingDisability") ? getValues("categoryGha.speechAndHearingDisability") : 0)
                                + (getValues("categoryGha.mentalDisability") ? getValues("categoryGha.mentalDisability") : 0)
                                + (getValues("categoryGha.intellectuallyDisabled") ? getValues("categoryGha.intellectuallyDisabled") : 0)
                                + (getValues("categoryGha.hemophelia") ? getValues("categoryGha.hemophelia") : 0)
                                + (getValues("categoryGha.autism") ? getValues("categoryGha.autism") : 0)
                                + (getValues("categoryGha.multiple") ? getValues("categoryGha.multiple") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div class="p-col-12 p-md-3">
                      <Controller
                        name="categoryGha.totDisabledPeopleSource"
                        control={control}
                        rules={{ required: "Source is required" }}
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
                            sourceOtherValue={getValues("categoryGha.totDisabledPeopleSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("categoryGha.totDisabledPeopleSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("categoryGha.totDisabledPeopleSource")}
                      </div>
                    </div>
                  </div>

                  {/* ==== */}
                  <div className="p-grid p-col-12 p-md-12 ">
                    <div class="p-col-12 p-md-9">
                      <div className="p-field p-col-12 p-md-12 float-left main-label">
                        {t("disPeopReceivingSSAUnderGha")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("disPeopReceivingSSAUnderGhaDesc")}
                        />
                      </div>
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
                              value={field.value > getValues("categoryGha.disabledMale") ? setValue("categoryGha.disabledMaleReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("male")}
                              tooltip={t("male")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.disabledMale")}
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
                              value={field.value > getValues("categoryGha.disabledFemale") ? setValue("categoryGha.disabledFemaleReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("female")}
                              tooltip={t("female")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.disabledFemale")}
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
                              value={field.value > getValues("categoryGha.disabledOthers") ? setValue("categoryGha.disabledOthersReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("others")}
                              tooltip={t("others")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.disabledOthers")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryGha.disabledMaleReceivingSSA") ? getValues("categoryGha.disabledMaleReceivingSSA") : 0)
                                + (getValues("categoryGha.disabledFemaleReceivingSSA") ? getValues("categoryGha.disabledFemaleReceivingSSA") : 0)
                                + (getValues("categoryGha.disabledOthersReceivingSSA") ? getValues("categoryGha.disabledOthersReceivingSSA") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              value={field.value > getValues("categoryGha.disabledChildren") ? setValue("categoryGha.disabledChildrenReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("children")}
                              tooltip={t("children")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.disabledChildren")}
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
                              value={field.value > getValues("categoryGha.disabledAdult") ? setValue("categoryGha.disabledAdultReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("adult")}
                              tooltip={t("adult")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.disabledAdult")}
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
                              value={field.value > getValues("categoryGha.disabledSeniorCitizen") ? setValue("categoryGha.disabledSeniorCitizenReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("seniorCitizen")}
                              tooltip={t("seniorCitizen")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.disabledSeniorCitizen")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryGha.disabledChildrenReceivingSSA") ? getValues("categoryGha.disabledChildrenReceivingSSA") : 0)
                                + (getValues("categoryGha.disabledAdultReceivingSSA") ? getValues("categoryGha.disabledAdultReceivingSSA") : 0)
                                + (getValues("categoryGha.disabledSeniorCitizenReceivingSSA") ? getValues("categoryGha.disabledSeniorCitizenReceivingSSA") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              value={field.value > getValues("categoryGha.physicallyDisabled") ? setValue("categoryGha.physicallyDisabledReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("physicallyDisabled")}
                              tooltip={t("physicallyDisabled")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.physicallyDisabled")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryGha.visuallyImpairedReceivingSSA"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value > getValues("categoryGha.visuallyImpaired") ? setValue("categoryGha.visuallyImpairedReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("visuallyImpaired")}
                              tooltip={t("visuallyImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.visuallyImpaired")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="categoryGha.hearingImpairedReceivingSSA"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value > getValues("categoryGha.hearingImpaired") ? setValue("categoryGha.hearingImpairedReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("hearingImpaired")}
                              tooltip={t("hearingImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.hearingImpaired")}
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
                              value={field.value > getValues("categoryGha.deafBlind") ? setValue("categoryGha.deafBlindReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("deafBlind")}
                              tooltip={t("deafBlind")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.deafBlind")}
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
                              value={field.value > getValues("categoryGha.speechAndHearing") ? setValue("categoryGha.speechAndHearingReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("speechAndHearingDisability")}
                              tooltip={t("speechAndHearingDisability")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.speechAndHearing")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left"></div>
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
                              value={field.value > getValues("categoryGha.mentalDisability") ? setValue("categoryGha.mentalDisabilityReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("mentalDisability")}
                              tooltip={t("mentalDisability")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.mentalDisability")}
                            />
                          )}
                        />
                      </div>

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
                              value={field.value > getValues("categoryGha.intellectuallyDisabled") ? setValue("categoryGha.intellectuallyDisabledReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("intellectuallyDisabled")}
                              tooltip={t("intellectuallyDisabled")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.intellectuallyDisabled")}
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
                              value={field.value > getValues("categoryGha.hemophelia") ? setValue("categoryGha.hemopheliaReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("hemophelia")}
                              tooltip={t("hemophelia")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.hemophelia")}
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
                              value={field.value > getValues("categoryGha.autism") ? setValue("categoryGha.autismReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("autism")}
                              tooltip={t("autism")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.autism")}
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
                              value={field.value > getValues("categoryGha.multiple") ? setValue("categoryGha.multipleReceivingSSA", 0) : field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("multiple")}
                              tooltip={t("multiple")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                              max={getValues("categoryGha.multiple")}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("categoryGha.physicallyDisabledReceivingSSA") ? getValues("categoryGha.physicallyDisabledReceivingSSA") : 0)
                                + (getValues("categoryGha.visuallyImpairedReceivingSSA") ? getValues("categoryGha.visuallyImpairedReceivingSSA") : 0)
                                + (getValues("categoryGha.hearingImpairedReceivingSSA") ? getValues("categoryGha.hearingImpairedReceivingSSA") : 0)
                                + (getValues("categoryGha.deafBlindReceivingSSA") ? getValues("categoryGha.deafBlindReceivingSSA") : 0)
                                + (getValues("categoryGha.speechAndHearingDisabilityReceivingSSA") ? getValues("categoryGha.speechAndHearingDisabilityReceivingSSA") : 0)
                                + (getValues("categoryGha.mentalDisabilityReceivingSSA") ? getValues("categoryGha.mentalDisabilityReceivingSSA") : 0)
                                + (getValues("categoryGha.intellectuallyDisabledReceivingSSA") ? getValues("categoryGha.intellectuallyDisabledReceivingSSA") : 0)
                                + (getValues("categoryGha.hemopheliaReceivingSSA") ? getValues("categoryGha.hemopheliaReceivingSSA") : 0)
                                + (getValues("categoryGha.autismReceivingSSA") ? getValues("categoryGha.autismReceivingSSA") : 0)
                                + (getValues("categoryGha.multipleReceivingSSA") ? getValues("categoryGha.multipleReceivingSSA") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>

                      <div className="p-field p-col-12 p-md-12 float-left">
                        <p style={{ margin: "0px", color: "red" }}>{t("disabledCategoryGhaNote")}</p>
                      </div>
                    </div>
                    <div class="p-col-12 p-md-3">
                      <Controller
                        name="categoryGha.disabledReceivingSSASource"
                        control={control}
                        rules={{ required: "Source is required" }}
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
                            sourceOtherValue={getValues("categoryGha.disabledReceivingSSASourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("categoryGha.disabledReceivingSSASourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("categoryGha.disabledReceivingSSASource")}
                      </div>
                    </div>
                  </div>
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
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
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
                          tooltipOptions={{
                            position: "bottom",
                          }}
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
                          tooltipOptions={{
                            position: "bottom",
                          }}
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
                          tooltipOptions={{
                            position: "bottom",
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("maleRecSkillTraining") ? getValues("maleRecSkillTraining") : 0)
                            + (getValues("femaleRecSkillTraining") ? getValues("femaleRecSkillTraining") : 0)
                            + (getValues("othersRecSkillTraining") ? getValues("othersRecSkillTraining") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="disabledPeopleRecSkillSource"
                    control={control}
                    rules={{ required: "Source is required" }}
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
                        sourceOtherValue={getValues("disabledPeopleRecSkillSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("disabledPeopleRecSkillSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("disabledPeopleRecSkillSource")}
                  </div>
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
                            e.value == 0
                              ? setDisabledCenterModal(false)
                              : setDisabledCenterModal(true);
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
                    rules={{ required: "Source is required" }}
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
                        sourceOtherValue={getValues("totDisabledRehabCenterSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("totDisabledRehabCenterSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("totDisabledRehabCenterSource")}
                  </div>
                </div>
              </div>

              {disabledCenterModal ? (
                <>
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
                      <div className="p-field p-col-12 p-md-12 float-left sub-label">
                        {t("byGender")}
                      </div>
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("disabledMaleReceivingServices") ? getValues("disabledMaleReceivingServices") : 0)
                                + (getValues("disabledFemaleReceivingServices") ? getValues("disabledFemaleReceivingServices") : 0)
                                + (getValues("disabledOthersReceivingServices") ? getValues("disabledOthersReceivingServices") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("disabledChildrenReceivingServices") ? getValues("disabledChildrenReceivingServices") : 0)
                                + (getValues("disabledAdultReceivingServices") ? getValues("disabledAdultReceivingServices") : 0)
                                + (getValues("disabledSeniorCitizenReceivingServices") ? getValues("disabledSeniorCitizenReceivingServices") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="visuallyImpairedReceivingServices"
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
                              placeholder={t("visuallyImpaired")}
                              tooltip={t("visuallyImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="hearingImpairedReceivingServices"
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
                              placeholder={t("hearingImpaired")}
                              tooltip={t("hearingImpaired")}
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left"></div>
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>

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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
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
                              tooltipOptions={{
                                position: "bottom",
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("physicallyDisabledReceivingServices") ? getValues("physicallyDisabledReceivingServices") : 0)
                                + (getValues("visuallyImpairedReceivingServices") ? getValues("visuallyImpairedReceivingServices") : 0)
                                + (getValues("hearingImpairedReceivingServices") ? getValues("hearingImpairedReceivingServices") : 0)
                                + (getValues("deafBlindReceivingServices") ? getValues("deafBlindReceivingServices") : 0)
                                + (getValues("speechAndHearingReceivingServices") ? getValues("speechAndHearingReceivingServices") : 0)
                                + (getValues("mentalDisabilityReceivingServices") ? getValues("mentalDisabilityReceivingServices") : 0)
                                + (getValues("intellectuallyDisabledReceivingServices") ? getValues("intellectuallyDisabledReceivingServices") : 0)
                                + (getValues("hemopheliaReceivingServices") ? getValues("hemopheliaReceivingServices") : 0)
                                + (getValues("autismReceivingServices") ? getValues("autismReceivingServices") : 0)
                                + (getValues("multipleReceivingServices") ? getValues("multipleReceivingServices") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div class="p-col-12 p-md-3">
                      <Controller
                        name="disabledReceivingServicesSource"
                        control={control}
                        rules={{ required: "Source is required" }}
                        render={({ field, fieldState }) => (
                          <Source
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value}
                            handleSourceState={(e) => {
                              field.onChange(e);
                            }}
                            sourceOtherValue={getValues("disabledReceivingServicesSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("disabledReceivingServicesSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("disabledReceivingServicesSource")}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

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
                            min={0}
                            max={100}
                            minFractionDigits={2}
                            maxFractionDigits={2}
                            mode="decimal"
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
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("budgetAllocatedForDisabledSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("budgetAllocatedForDisabledSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("budgetAllocatedForDisabledSource")}
                  </div>
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
                        name="perOfDisPeopJob"
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
                            min={0}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="disabledJobSource"
                    control={control}
                    rules={{ required: "Source is required" }}
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
                        sourceOtherValue={getValues("disabledJobSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("disabledJobSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("disabledJobSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("totDisabledAffByNatCal")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totAffectedByNaturalCalamitiesDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="disabledAffectedByCalamities"
                      control={control}
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
                    name="disabledAffectedByCalamitiesSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("disabledAffectedByCalamitiesSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("disabledAffectedByCalamitiesSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("disabledAffectedByCalamitiesSource")}
                  </div>
                </div>
              </div>

              {hideBtn === "No" ? (
                <>
                  {showBtn === "Yes" ? (
                    <div className="p-grid p-col-12 p-md-12">
                      <div className="p-col-12 p-md-8"></div>
                      <div className="p-col-12 p-md-2">
                        <Button
                          label={t("save")}
                          className="p-button-sm pull-right submitBtn"
                          onClick={(e) => saveData(e)}
                        />
                      </div>
                      <div className="p-col-12 p-md-2">
                        <Button
                          label={t("submit")}
                          className="p-button-sm pull-right submitBtn"
                          onClick={handleSubmit(submitData)}
                        />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
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
