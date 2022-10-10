import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";

import { useTranslation } from "react-i18next";
import FiscalYear from "../../utilities/components/FiscalYear";
import Source from "../../utilities/components/Source";

import ChildrenService from "../api/services/ChildrenService";
import OrganizationService from "../../security/api/services/OrganizationService";
import { trackPromise } from "react-promise-tracker";
import Organization from "../../utilities/components/Organization";
import UserService from "../../security/api/services/UserService";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import FiscalQuarter from "../../utilities/components/FiscalQuarter";

function ChildrenAdolescentModule() {
  const { t } = useTranslation();

  const [fiscalYear, setFiscalYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [childrenId, setChildrenId] = useState();

  const [update, setUpdate] = useState("No");
  const [showBtn, setShowBtn] = useState("Yes");
  const [hideBtn, setHideBtn] = useState("No");
  const [enableForm, setEnableForm] = useState(true);
  const [organization, setOrganization] = useState("");
  const [organizationList, setOrganizationList] = useState([]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues
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
  }, []);

  //To save data
  const saveData = (e) => {
    e.preventDefault();
    let data = getValues();
    data.fiscalYear = fiscalYear;
    data.quarter = quarter;
    data.status = "Save";
    console.log("data", data);

    if (update == "No") {
      //trackPromise is used for loading
      trackPromise(
        ChildrenService.saveData(data).then((response) => {
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
      data.childrenId = childrenId;
      trackPromise(
        ChildrenService.updateData(data).then((response) => {
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

  //To update data
  const submitData = (data) => {
    data.fiscalYear = fiscalYear;
    data.quarter = quarter;
    data.status = "Submit";
    console.log("data", data);

    if (update == "No") {
      //trackPromise is used for loading
      trackPromise(
        ChildrenService.saveData(data).then((response) => {
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
      );
    } else {
      data.childrenId = childrenId;
      trackPromise(
        ChildrenService.updateData(data).then((response) => {
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
    console.log("getDataByFiscalYear");
    trackPromise(
      ChildrenService.getListByFiscalYearAndQuarter(fiscalYear, quarter).then((response) => {
        console.log("response", response.data);
        if (response.data) {
          setFiscalYear(response.data.fiscalYear);
          setQuarter(response.data.quarter);
          setChildrenId(response.data.childrenId);
          reset({
            boysPopulation: response.data.boysPopulation,
            girlsPopulation: response.data.girlsPopulation,
            childrenPopSource:
              response.data.childrenPopSource[0] != "" &&
                response.data.childrenPopSource != ""
                ? response.data.childrenPopSource
                : null,
            boysBirthCertIsssued: response.data.boysBirthCertIsssued,
            girlsBirthCertIsssued: response.data.girlsBirthCertIsssued,
            birthCertIsssuedSource:
              response.data.birthCertIsssuedSource[0] != "" &&
                response.data.birthCertIsssuedSource != ""
                ? response.data.birthCertIsssuedSource
                : null,
            boysReceivingSSA: response.data.boysReceivingSSA,
            girlsReceivingSSA: response.data.girlsReceivingSSA,
            //     orphanReceivingSSA: response.data.orphanReceivingSSA,
            //disabledReceivingSSA: response.data.disabledReceivingSSA,
            childrenReceivingSSASource:
              response.data.childrenReceivingSSASource[0] != "" &&
                response.data.childrenReceivingSSASource != ""
                ? response.data.childrenReceivingSSASource
                : null,
            primarySchoolBoys: response.data.primarySchoolBoys,
            primarySchoolGirls: response.data.primarySchoolGirls,
            primarySchoolEnrollSource:
              response.data.primarySchoolEnrollSource[0] != "" &&
                response.data.primarySchoolEnrollSource != ""
                ? response.data.primarySchoolEnrollSource
                : null,
            secondaryDropoutBoys: response.data.secondaryDropoutBoys,
            secondaryDropoutGirls: response.data.secondaryDropoutGirls,
            secondaryDropoutDalit: response.data.secondaryDropoutDalit,
            secondaryDropoutEthnic: response.data.secondaryDropoutEthnic,
            secondaryDropoutJanajati: response.data.secondaryDropoutJanajati,
            secondaryDropoutMadhesi: response.data.secondaryDropoutMadhesi,
            secondaryDropoutBrahmin: response.data.secondaryDropoutBrahmin,
            secondaryDropoutMuslim: response.data.secondaryDropoutMuslim,
            secondaryDropoutEthnicityOthers: response.data.secondaryDropoutEthnicityOthers,
            secondaryDropoutSource:
              response.data.secondaryDropoutSource[0] != "" &&
                response.data.secondaryDropoutSource != ""
                ? response.data.secondaryDropoutSource
                : null,
            outOfSchoolChildren: response.data.outOfSchoolChildren,
            outOfSchoolChildrenSource:
              response.data.outOfSchoolChildrenSource[0] != "" &&
                response.data.outOfSchoolChildrenSource != ""
                ? response.data.outOfSchoolChildrenSource
                : null,
            boysEarlyMarriage: response.data.boysEarlyMarriage,
            girlsEarlyMarriage: response.data.girlsEarlyMarriage,
            earlyElopedMarriage: response.data.earlyElopedMarriage,
            earlyArrangedMarriage: response.data.earlyArrangedMarriage,
            earlyMarriageSource:
              response.data.earlyMarriageSource[0] != "" &&
                response.data.earlyMarriageSource != ""
                ? response.data.earlyMarriageSource
                : null,
            boysChildAbuse: response.data.boysChildAbuse,
            girlsChildAbuse: response.data.girlsChildAbuse,
            childAbuseSource:
              response.data.childAbuseSource[0] != "" &&
                response.data.childAbuseSource != ""
                ? response.data.childAbuseSource
                : null,
            orphanBoys: response.data.orphanBoys,
            orphanGirls: response.data.orphanGirls,
            orphanChildrenSource:
              response.data.orphanChildrenSource[0] != "" &&
                response.data.orphanChildrenSource != ""
                ? response.data.orphanChildrenSource
                : null,
            streetBoys: response.data.streetBoys,
            streetGirls: response.data.streetGirls,
            streetChildrenSource:
              response.data.streetChildrenSource[0] != "" &&
                response.data.streetChildrenSource != ""
                ? response.data.streetChildrenSource
                : null,
            boysMissing: response.data.boysMissing,
            girlsMissing: response.data.girlsMissing,
            boysFound: response.data.boysFound,
            girlsFound: response.data.girlsFound,
            othersFound: response.data.othersFound,
            missingChildrenSource:
              response.data.missingChildrenSource[0] != "" &&
                response.data.missingChildrenSource != ""
                ? response.data.missingChildrenSource
                : null,
            foundChildrenSource:
              response.data.foundChildrenSource[0] != "" &&
                response.data.foundChildrenSource != ""
                ? response.data.foundChildrenSource
                : null,
            childrenDevCenter: response.data.childrenDevCenter,
            childDevCenterSource:
              response.data.childDevCenterSource[0] != "" &&
                response.data.childDevCenterSource != ""
                ? response.data.childDevCenterSource
                : null,
            childrenBudgetAllocated: response.data.childrenBudgetAllocated,
            childBudgetAllocatedSource:
              response.data.childBudgetAllocatedSource[0] != "" &&
                response.data.childBudgetAllocatedSource != ""
                ? response.data.childBudgetAllocatedSource
                : null,

            othersPopulation: response.data.othersPopulation,
            othersBirthCertIsssued: response.data.othersBirthCertIsssued,
            othersReceivingSSA: response.data.othersReceivingSSA,
            primarySchoolOthers: response.data.primarySchoolOthers,
            secondaryDropoutOthers: response.data.secondaryDropoutOthers,
            othersEarlyMarriage: response.data.othersEarlyMarriage,
            othersChildAbuse: response.data.othersChildAbuse,
            orphanOthers: response.data.orphanOthers,
            streetOthers: response.data.streetOthers,
            othersMissing: response.data.othersMissing,

            childrenAffectedByCalamities: response.data.childrenAffectedByCalamities,
            childrenAffectedByCalamitiesSource:
              response.data.childrenAffectedByCalamitiesSource[0] != "" &&
                response.data.childrenAffectedByCalamitiesSource != ""
                ? response.data.childrenAffectedByCalamitiesSource
                : null,

            childrenPopSourceOthers: response.data.childrenPopSourceOthers,
            birthCertIsssuedSourceOthers: response.data.birthCertIsssuedSourceOthers,
            childrenReceivingSSASourceOthers: response.data.childrenReceivingSSASourceOthers,
            primarySchoolEnrollSourceOthers: response.data.primarySchoolEnrollSourceOthers,
            secondaryDropoutSourceOthers: response.data.secondaryDropoutSourceOthers,
            outOfSchoolChildrenSourceOthers: response.data.outOfSchoolChildrenSourceOthers,
            earlyMarriageSourceOthers: response.data.earlyMarriageSourceOthers,
            childAbuseSourceOthers: response.data.childAbuseSourceOthers,
            orphanChildrenSourceOthers: response.data.orphanChildrenSourceOthers,
            streetChildrenSourceOthers: response.data.streetChildrenSourceOthers,
            missingChildrenSourceOthers: response.data.missingChildrenSourceOthers,
            foundChildrenSourceOthers: response.data.foundChildrenSourceOthers,
            childDevCenterSourceOthers: response.data.childDevCenterSourceOthers,
            childBudgetAllocatedSourceOthers: response.data.childBudgetAllocatedSourceOthers,
            childrenAffectedByCalamitiesSourceOthers: response.data.childrenAffectedByCalamitiesSourceOthers,
          });
          setUpdate("Yes");
          if (response.data.status === "Submit") {
            setShowBtn("No");
          } else {
            setShowBtn("Yes");
          }
        } else {
          console.log("no data");
          reset({
            childrenPopSource: [],
            birthCertIsssuedSource: [],
            childrenReceivingSSASource: [],
            primarySchoolEnrollSource: [],
            secondaryDropoutSource: [],
            outOfSchoolChildrenSource: [],
            earlyMarriageSource: [],
            childAbuseSource: [],
            orphanChildrenSource: [],
            streetChildrenSource: [],
            missingChildrenSource: [],
            foundChildrenSource: [],
            childDevCenterSource: [],
            childBudgetAllocatedSource: [],
          });

          setUpdate("No");
          setShowBtn("Yes");
        }
      })
    );
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
    console.log("getListByOrganization");
    trackPromise(
      ChildrenService.getListByOrganization(fiscalYear, quarter, organization).then(
        (response) => {
          console.log("response", response.data);
          if (response.data) {
            setFiscalYear(response.data.fiscalYear);
            setChildrenId(response.data.childrenId);
            setQuarter(response.data.quarter);
            reset({
              boysPopulation: response.data.boysPopulation,
              girlsPopulation: response.data.girlsPopulation,
              childrenPopSource:
                response.data.childrenPopSource[0] != "" &&
                  response.data.childrenPopSource != ""
                  ? response.data.childrenPopSource
                  : null,
              boysBirthCertIsssued: response.data.boysBirthCertIsssued,
              girlsBirthCertIsssued: response.data.girlsBirthCertIsssued,
              birthCertIsssuedSource:
                response.data.birthCertIsssuedSource[0] != "" &&
                  response.data.birthCertIsssuedSource != ""
                  ? response.data.birthCertIsssuedSource
                  : null,
              boysReceivingSSA: response.data.boysReceivingSSA,
              girlsReceivingSSA: response.data.girlsReceivingSSA,
              //     orphanReceivingSSA: response.data.orphanReceivingSSA,
              //disabledReceivingSSA: response.data.disabledReceivingSSA,
              childrenReceivingSSASource:
                response.data.childrenReceivingSSASource[0] != "" &&
                  response.data.childrenReceivingSSASource != ""
                  ? response.data.childrenReceivingSSASource
                  : null,
              primarySchoolBoys: response.data.primarySchoolBoys,
              primarySchoolGirls: response.data.primarySchoolGirls,
              primarySchoolEnrollSource:
                response.data.primarySchoolEnrollSource[0] != "" &&
                  response.data.primarySchoolEnrollSource != ""
                  ? response.data.primarySchoolEnrollSource
                  : null,
              secondaryDropoutBoys: response.data.secondaryDropoutBoys,
              secondaryDropoutGirls: response.data.secondaryDropoutGirls,
              secondaryDropoutDalit: response.data.secondaryDropoutDalit,
              secondaryDropoutEthnic: response.data.secondaryDropoutEthnic,
              secondaryDropoutJanajati: response.data.secondaryDropoutJanajati,
              secondaryDropoutMadhesi: response.data.secondaryDropoutMadhesi,
              secondaryDropoutBrahmin: response.data.secondaryDropoutBrahmin,
              secondaryDropoutMuslim: response.data.secondaryDropoutMuslim,
              secondaryDropoutEthnicityOthers: response.data.secondaryDropoutEthnicityOthers,
              secondaryDropoutSource:
                response.data.secondaryDropoutSource[0] != "" &&
                  response.data.secondaryDropoutSource != ""
                  ? response.data.secondaryDropoutSource
                  : null,
              outOfSchoolChildren: response.data.outOfSchoolChildren,
              outOfSchoolChildrenSource:
                response.data.outOfSchoolChildrenSource[0] != "" &&
                  response.data.outOfSchoolChildrenSource != ""
                  ? response.data.outOfSchoolChildrenSource
                  : null,
              boysEarlyMarriage: response.data.boysEarlyMarriage,
              girlsEarlyMarriage: response.data.girlsEarlyMarriage,
              earlyElopedMarriage: response.data.earlyElopedMarriage,
              earlyArrangedMarriage: response.data.earlyArrangedMarriage,
              earlyMarriageSource:
                response.data.earlyMarriageSource[0] != "" &&
                  response.data.earlyMarriageSource != ""
                  ? response.data.earlyMarriageSource
                  : null,
              boysChildAbuse: response.data.boysChildAbuse,
              girlsChildAbuse: response.data.girlsChildAbuse,
              childAbuseSource:
                response.data.childAbuseSource[0] != "" &&
                  response.data.childAbuseSource != ""
                  ? response.data.childAbuseSource
                  : null,
              orphanBoys: response.data.orphanBoys,
              orphanGirls: response.data.orphanGirls,
              orphanChildrenSource:
                response.data.orphanChildrenSource[0] != "" &&
                  response.data.orphanChildrenSource != ""
                  ? response.data.orphanChildrenSource
                  : null,
              streetBoys: response.data.streetBoys,
              streetGirls: response.data.streetGirls,
              streetChildrenSource:
                response.data.streetChildrenSource[0] != "" &&
                  response.data.streetChildrenSource != ""
                  ? response.data.streetChildrenSource
                  : null,
              boysMissing: response.data.boysMissing,
              girlsMissing: response.data.girlsMissing,
              boysFound: response.data.boysFound,
              girlsFound: response.data.girlsFound,
              othersFound: response.data.othersFound,
              missingChildrenSource:
                response.data.missingChildrenSource[0] != "" &&
                  response.data.missingChildrenSource != ""
                  ? response.data.missingChildrenSource
                  : null,
              foundChildrenSource:
                response.data.foundChildrenSource[0] != "" &&
                  response.data.foundChildrenSource != ""
                  ? response.data.foundChildrenSource
                  : null,
              childrenDevCenter: response.data.childrenDevCenter,
              childDevCenterSource:
                response.data.childDevCenterSource[0] != "" &&
                  response.data.childDevCenterSource != ""
                  ? response.data.childDevCenterSource
                  : null,
              childrenBudgetAllocated: response.data.childrenBudgetAllocated,
              childBudgetAllocatedSource:
                response.data.childBudgetAllocatedSource[0] != "" &&
                  response.data.childBudgetAllocatedSource != ""
                  ? response.data.childBudgetAllocatedSource
                  : null,

              othersPopulation: response.data.othersPopulation,
              othersBirthCertIsssued: response.data.othersBirthCertIsssued,
              othersReceivingSSA: response.data.othersReceivingSSA,
              primarySchoolOthers: response.data.primarySchoolOthers,
              secondaryDropoutOthers: response.data.secondaryDropoutOthers,
              othersEarlyMarriage: response.data.othersEarlyMarriage,
              othersChildAbuse: response.data.othersChildAbuse,
              orphanOthers: response.data.orphanOthers,
              streetOthers: response.data.streetOthers,
              othersMissing: response.data.othersMissing,

              childrenAffectedByCalamities: response.data.childrenAffectedByCalamities,
              childrenAffectedByCalamitiesSource:
                response.data.childrenAffectedByCalamitiesSource[0] != "" &&
                  response.data.childrenAffectedByCalamitiesSource != ""
                  ? response.data.childrenAffectedByCalamitiesSource
                  : null,

              childrenPopSourceOthers: response.data.childrenPopSourceOthers,
              birthCertIsssuedSourceOthers: response.data.birthCertIsssuedSourceOthers,
              childrenReceivingSSASourceOthers: response.data.childrenReceivingSSASourceOthers,
              primarySchoolEnrollSourceOthers: response.data.primarySchoolEnrollSourceOthers,
              secondaryDropoutSourceOthers: response.data.secondaryDropoutSourceOthers,
              outOfSchoolChildrenSourceOthers: response.data.outOfSchoolChildrenSourceOthers,
              earlyMarriageSourceOthers: response.data.earlyMarriageSourceOthers,
              childAbuseSourceOthers: response.data.childAbuseSourceOthers,
              orphanChildrenSourceOthers: response.data.orphanChildrenSourceOthers,
              streetChildrenSourceOthers: response.data.streetChildrenSourceOthers,
              missingChildrenSourceOthers: response.data.missingChildrenSourceOthers,
              foundChildrenSourceOthers: response.data.foundChildrenSourceOthers,
              childDevCenterSourceOthers: response.data.childDevCenterSourceOthers,
              childBudgetAllocatedSourceOthers: response.data.childBudgetAllocatedSourceOthers,
              childrenAffectedByCalamitiesSourceOthers: response.data.childrenAffectedByCalamitiesSourceOthers,
            });
          } else {
            console.log("no data");
            reset({
              childrenPopSource: [],
              birthCertIsssuedSource: [],
              childrenReceivingSSASource: [],
              primarySchoolEnrollSource: [],
              secondaryDropoutSource: [],
              outOfSchoolChildrenSource: [],
              earlyMarriageSource: [],
              childAbuseSource: [],
              orphanChildrenSource: [],
              streetChildrenSource: [],
              missingChildrenSource: [],
              foundChildrenSource: [],
              childDevCenterSource: [],
              childBudgetAllocatedSource: [],
            });
          }
        }
      )
    );
  };

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
      <Card
        className="p-mb-1"
        style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}
      >
        <div className=" p-card-content">
          <h4 className="p-pt-0">{t("childrenAdolescentModule")}</h4>
        </div>
      </Card>

      <Card className="p-mt-0"
      // style={{ height: "72vh", overflowY: "auto" }}
      >
        <div className=" p-card-content">
          <form className="p-grid p-fluid " autoComplete="off">
            <Organization submitOrganizationId={handleOrganization} />
            {hideBtn === "Yes" ? (
              <>
                {/* <Organization submitOrganizationId={handleOrganization} /> */}
                {/* <div
                  class="p-field p-col-12 p-md-12"
                  style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}
                >
                  <div class="p-field " style={{ display: "flex", alignSelf: "center" }}>
                    {" "}
                    {t("organizationList")} :
                  </div>
                  <div class="" style={{ flex: 0.3 }}>
                    <Dropdown
                      value={organization}
                      options={organizationList}
                      optionLabel="name"
                      optionValue="organizationId"
                      onChange={(e) => handleOrganization(e.value)}
                      placeholder={t("select")}
                    />
                  </div>
                </div> */}
              </>
            ) : (
              <></>
            )}
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
              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("totChildrenPop")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totChildrenPopDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="boysPopulation"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("boys")}
                          tooltip={t("boys")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="girlsPopulation"
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
                          placeholder={t("girls")}
                          tooltip={t("girls")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersPopulation"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totalPopulation"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("boysPopulation") ? getValues("boysPopulation") : 0)
                            + (getValues("girlsPopulation") ? getValues("girlsPopulation") : 0)
                            + (getValues("othersPopulation") ? getValues("othersPopulation") : 0)}
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
                    name="childrenPopSource"
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
                        sourceOtherValue={getValues("childrenPopSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("childrenPopSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("childrenPopSource")}
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
                    {t("totBirthCertIsssued")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totBirthCertIsssuedDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="boysBirthCertIsssued"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("boysPopulation") ? setValue("boysBirthCertIsssued", 0) : field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("boys")}
                          tooltip={t("boys")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="girlsBirthCertIsssued"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("girlsPopulation") ? setValue("girlsBirthCertIsssued", 0) : field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("girls")}
                          tooltip={t("girls")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersBirthCertIsssued"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("othersPopulation") ? setValue("othersBirthCertIsssued", 0) : field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totalBirthCertIsssued"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("boysBirthCertIsssued") ? getValues("boysBirthCertIsssued") : 0)
                            + (getValues("girlsBirthCertIsssued") ? getValues("girlsBirthCertIsssued") : 0)
                            + (getValues("othersBirthCertIsssued") ? getValues("othersBirthCertIsssued") : 0)}
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
                    <p style={{ margin: "0px", color: "red" }}>{t("childrenNote")}</p>
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="birthCertIsssuedSource"
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
                        sourceOtherValue={getValues("birthCertIsssuedSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("birthCertIsssuedSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("birthCertIsssuedSource")}
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
                    {t("totChildrenReceivingSSA")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totChildrenReceivingSSADesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="boysReceivingSSA"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("boysPopulation") ? setValue("boysReceivingSSA", 0) : field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("boys")}
                          tooltip={t("boys")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="girlsReceivingSSA"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("girlsPopulation") ? setValue("girlsReceivingSSA", 0) : field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("girls")}
                          tooltip={t("girls")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersReceivingSSA"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("othersPopulation") ? setValue("othersReceivingSSA", 0) : field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totalReceivingSSA"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("boysReceivingSSA") ? getValues("boysReceivingSSA") : 0)
                            + (getValues("girlsReceivingSSA") ? getValues("girlsReceivingSSA") : 0)
                            + (getValues("othersReceivingSSA") ? getValues("othersReceivingSSA") : 0)}
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
                    <p style={{ margin: "0px", color: "red" }}>{t("childrenNote")}</p>
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="childrenReceivingSSASource"
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
                        sourceOtherValue={getValues("childrenReceivingSSASourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("childrenReceivingSSASourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("childrenReceivingSSASource")}
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
                    {t("primarySchoolEnroll")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("primarySchoolEnrollDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="primarySchoolBoys"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("primarySchoolBoys",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("boys")}
                            tooltip={t("boys")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="primarySchoolGirls"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("primarySchoolGirls",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("girls")}
                            tooltip={t("girls")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="primarySchoolOthers"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("primarySchoolOthers",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("others")}
                            tooltip={t("others")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="primarySchoolTot"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={(getValues("primarySchoolBoys") ? getValues("primarySchoolBoys") : 0)
                              + (getValues("primarySchoolGirls") ? getValues("primarySchoolGirls") : 0)
                              + (getValues("primarySchoolOthers") ? getValues("primarySchoolOthers") : 0)}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            disabled
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            tooltip={t("total")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="primarySchoolEnrollSource"
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
                        sourceOtherValue={getValues("primarySchoolEnrollSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("primarySchoolEnrollSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("primarySchoolEnrollSource")}
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
                    {t("secondarySchoolDropout")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("secondarySchoolDropoutDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="secondaryDropoutBoys"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("secondaryDropoutBoys",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("boys")}
                            tooltip={t("boys")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="secondaryDropoutGirls"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("secondaryDropoutGirls",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("girls")}
                            tooltip={t("girls")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="secondaryDropoutOthers"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("secondaryDropoutOthers",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("others")}
                            tooltip={t("others")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="secondaryDropoutTot"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={(getValues("secondaryDropoutBoys") ? getValues("secondaryDropoutBoys") : 0)
                              + (getValues("secondaryDropoutGirls") ? getValues("secondaryDropoutGirls") : 0)
                              + (getValues("secondaryDropoutOthers") ? getValues("secondaryDropoutOthers") : 0)}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            disabled
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            tooltip={t("total")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left"></div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="secondaryDropoutDalit"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("secondaryDropoutDalit",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("dalit")}
                            tooltip={t("dalit")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="secondaryDropoutMuslim"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("secondaryDropoutMuslim",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("muslim")}
                            tooltip={t("muslim")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="secondaryDropoutJanajati"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("secondaryDropoutJanajati",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("janajati")}
                            tooltip={t("janajati")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="secondaryDropoutMadhesi"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("secondaryDropoutMadhesi",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("madhesi")}
                            tooltip={t("madhesi")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="secondaryDropoutBrahmin"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("secondaryDropoutBrahmin",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("brahminOther")}
                            tooltip={t("brahminOther")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="secondaryDropoutEthnic"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("secondaryDropoutEthnic",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("ethnicMinorities")}
                            tooltip={t("ethnicMinorities")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="secondaryDropoutEthnicityOthers"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("secondaryDropoutEthnicityOthers",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("others")}
                            tooltip={t("others")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="secondaryDropoutTotal"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={(getValues("secondaryDropoutDalit") ? getValues("secondaryDropoutDalit") : 0)
                              + (getValues("secondaryDropoutMuslim") ? getValues("secondaryDropoutMuslim") : 0)
                              + (getValues("secondaryDropoutJanajati") ? getValues("secondaryDropoutJanajati") : 0)
                              + (getValues("secondaryDropoutMadhesi") ? getValues("secondaryDropoutMadhesi") : 0)
                              + (getValues("secondaryDropoutBrahmin") ? getValues("secondaryDropoutBrahmin") : 0)
                              + (getValues("secondaryDropoutEthnic") ? getValues("secondaryDropoutEthnic") : 0)
                              + (getValues("secondaryDropoutEthnicityOthers") ? getValues("secondaryDropoutEthnicityOthers") : 0)}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            disabled
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            tooltip={t("total")}
                            tooltipOptions={{
                              position: "bottom"
                            }}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="secondaryDropoutSource"
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
                        sourceOtherValue={getValues("secondaryDropoutSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("secondaryDropoutSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("secondaryDropoutSource")}
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
                    {t("outOfSchoolChildren")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("outOfSchoolChildrenDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="outOfSchoolChildren"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
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
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="outOfSchoolChildrenSource"
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
                        sourceOtherValue={getValues("outOfSchoolChildrenSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("outOfSchoolChildrenSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("outOfSchoolChildrenSource")}
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
                    {t("totEarlyMarriage")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totEarlyMarriageDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="boysEarlyMarriage"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("boys")}
                          tooltip={t("boys")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="girlsEarlyMarriage"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("girls")}
                          tooltip={t("girls")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersEarlyMarriage"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totalEarlyMarriage"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("boysEarlyMarriage") ? getValues("boysEarlyMarriage") : 0)
                            + (getValues("girlsEarlyMarriage") ? getValues("girlsEarlyMarriage") : 0)
                            + (getValues("othersEarlyMarriage") ? getValues("othersEarlyMarriage") : 0)}
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
                    {t("byCase")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="earlyElopedMarriage"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("eloped")}
                          tooltip={t("eloped")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="earlyArrangedMarriage"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("forcedMarriage")}
                          tooltip={t("forcedMarriageDesc")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totalEarlyMarriageByCase"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("earlyElopedMarriage") ? getValues("earlyElopedMarriage") : 0)
                            + (getValues("earlyArrangedMarriage") ? getValues("earlyArrangedMarriage") : 0)}
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
                    name="earlyMarriageSource"
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
                        sourceOtherValue={getValues("earlyMarriageSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("earlyMarriageSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("earlyMarriageSource")}
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
                    {t("totChildAbuse")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totChildAbuseDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="boysChildAbuse"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("boys")}
                          tooltip={t("boys")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="girlsChildAbuse"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("girls")}
                          tooltip={t("girls")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersChildAbuse"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totalChildAbuse"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("boysChildAbuse") ? getValues("boysChildAbuse") : 0)
                            + (getValues("girlsChildAbuse") ? getValues("girlsChildAbuse") : 0)
                            + (getValues("othersChildAbuse") ? getValues("othersChildAbuse") : 0)}
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
                    name="childAbuseSource"
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
                        sourceOtherValue={getValues("childAbuseSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("childAbuseSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("childAbuseSource")}
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
                    {t("totOrphanChildren")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totOrphanChildrenDesc")}
                    />
                  </div>

                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="orphanBoys"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("boys")}
                          tooltip={t("boys")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="orphanGirls"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("girls")}
                          tooltip={t("girls")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="orphanOthers"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totalOrphan"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("orphanBoys") ? getValues("orphanBoys") : 0)
                            + (getValues("orphanGirls") ? getValues("orphanGirls") : 0)
                            + (getValues("orphanOthers") ? getValues("orphanOthers") : 0)}
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
                    name="orphanChildrenSource"
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
                        sourceOtherValue={getValues("orphanChildrenSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("orphanChildrenSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("orphanChildrenSource")}
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
                    {t("totStreetChildren")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totStreetChildrenDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="streetBoys"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("boys")}
                          tooltip={t("boys")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="streetGirls"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("girls")}
                          tooltip={t("girls")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="streetOthers"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totalStreetChildren"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("streetBoys") ? getValues("streetBoys") : 0)
                            + (getValues("streetGirls") ? getValues("streetGirls") : 0)
                            + (getValues("streetOthers") ? getValues("streetOthers") : 0)}
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
                    name="streetChildrenSource"
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
                        sourceOtherValue={getValues("streetChildrenSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("streetChildrenSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("streetChildrenSource")}
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
                    {t("totMissingChildren")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totMissingChildrenDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="boysMissing"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("boys")}
                          tooltip={t("boys")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="girlsMissing"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("girls")}
                          tooltip={t("girls")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersMissing"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totalMissingChildren"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("boysMissing") ? getValues("boysMissing") : 0)
                            + (getValues("girlsMissing") ? getValues("girlsMissing") : 0)
                            + (getValues("othersMissing") ? getValues("othersMissing") : 0)}
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
                    name="missingChildrenSource"
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
                        sourceOtherValue={getValues("missingChildrenSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("missingChildrenSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("missingChildrenSource")}
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
                    {t("totFoundChildren")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totFoundChildrenDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="boysFound"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("boys")}
                          tooltip={t("boys")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="girlsFound"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                          placeholder={t("girls")}
                          tooltip={t("girls")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersFound"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totalFoundChildren"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("boysFound") ? getValues("boysFound") : 0)
                            + (getValues("girlsFound") ? getValues("girlsFound") : 0)
                            + (getValues("othersFound") ? getValues("othersFound") : 0)}
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
                    name="foundChildrenSource"
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
                        sourceOtherValue={getValues("foundChildrenSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("foundChildrenSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("foundChildrenSource")}
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
                    {t("totChildDevCenter")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totChildDevCenterDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="childrenDevCenter"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
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
                    name="childDevCenterSource"
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
                        sourceOtherValue={getValues("childDevCenterSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("childDevCenterSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("childDevCenterSource")}
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
                    {t("perChildBudgetAllocated")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("perChildBudgetAllocatedDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="childrenBudgetAllocated"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
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
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                          />
                        )}
                      />
                      <span className="p-inputgroup-addon">%</span>
                    </div>
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="childBudgetAllocatedSource"
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
                        sourceOtherValue={getValues("childBudgetAllocatedSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("childBudgetAllocatedSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("childBudgetAllocatedSource")}
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
                    {t("totChildrenAffByNatCal")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totAffectedByNaturalCalamitiesDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="childrenAffectedByCalamities"
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
                    name="childrenAffectedByCalamitiesSource"
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
                        sourceOtherValue={getValues("childrenAffectedByCalamitiesSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("childrenAffectedByCalamitiesSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("childrenAffectedByCalamitiesSource")}
                  </div>
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
                          onClick={(e) => saveData(e)} />
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
            </div>
          </form>
        </div>
      </Card >
    </>
  );
}

export default ChildrenAdolescentModule;
