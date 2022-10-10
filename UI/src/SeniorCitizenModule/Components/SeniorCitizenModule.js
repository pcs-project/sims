import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";

import FiscalYear from "../../utilities/components/FiscalYear";
import Source from "../../utilities/components/Source";

import SeniorCitizenService from "../api/services/SeniorCitizenService";
import Organization from "../../utilities/components/Organization";

import { useTranslation } from "react-i18next";
import { trackPromise } from "react-promise-tracker";
import UserService from "../../security/api/services/UserService";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import FiscalQuarter from "../../utilities/components/FiscalQuarter";
function SeniorCitizenModule() {
  const [fiscalYear, setFiscalYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [seniorCitizenId, setSeniorCitizenId] = useState();

  const [update, setUpdate] = useState("No");
  const [showBtn, setShowBtn] = useState("Yes");
  const [hideBtn, setHideBtn] = useState("No");
  const [enableForm, setEnableForm] = useState(true);
  const [organization, setOrganization] = useState("");

  const { t } = useTranslation();

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
        SeniorCitizenService.saveData(data).then((response) => {
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
      data.seniorCitizenId = seniorCitizenId;
      trackPromise(
        SeniorCitizenService.updateData(data).then((response) => {
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
        SeniorCitizenService.saveData(data).then((response) => {
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
      data.seniorCitizenId = seniorCitizenId;
      trackPromise(
        SeniorCitizenService.updateData(data).then((response) => {
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
    SeniorCitizenService.getListByFiscalYearAndQuarter(fiscalYear, quarter).then((response) => {
      console.log("response", response.data);
      if (response.data) {
        setFiscalYear(response.data.fiscalYear);
        setQuarter(response.data.quarter);
        setSeniorCitizenId(response.data.seniorCitizenId);
        reset({
          seniorCitizenMale: response.data.seniorCitizenMale,
          seniorCitizenFemale: response.data.seniorCitizenFemale,
          seniorCitizenOthers: response.data.seniorCitizenOthers,
          seniorCitizenAge60To68: response.data.seniorCitizenAge60To68,
          seniorCitizenAge68To80: response.data.seniorCitizenAge68To80,
          seniorCitizenAge81To99: response.data.seniorCitizenAge81To99,
          seniorCitizenAgeAbove99: response.data.seniorCitizenAgeAbove99,
          seniorCitizenSource:
            response.data.seniorCitizenSource[0] != "" &&
              response.data.seniorCitizenSource != ""
              ? response.data.seniorCitizenSource
              : null,
          maleSeniorWithNoCare: response.data.maleSeniorWithNoCare,
          femaleSeniorWithNoCare: response.data.femaleSeniorWithNoCare,
          othersSeniorWithNoCare: response.data.othersSeniorWithNoCare,
          seniorCitizenWithNoCareSource:
            response.data.seniorCitizenWithNoCareSource[0] != "" &&
              response.data.seniorCitizenWithNoCareSource != ""
              ? response.data.seniorCitizenWithNoCareSource
              : null,
          maleSeniorGettingSpa: response.data.maleSeniorGettingSpa,
          femaleSeniorGettingSpa: response.data.femaleSeniorGettingSpa,
          othersSeniorGettingSpa: response.data.othersSeniorGettingSpa,
          seniorCitizenGettingSpaSource:
            response.data.seniorCitizenGettingSpaSource[0] != "" &&
              response.data.seniorCitizenGettingSpaSource != ""
              ? response.data.seniorCitizenGettingSpaSource
              : null,
          seniorCitizenRecevingPension:
            response.data.seniorCitizenRecevingPension,
          seniorCitizenRecevingPensionSource:
            response.data.seniorCitizenRecevingPensionSource[0] != "" &&
              response.data.seniorCitizenRecevingPensionSource != ""
              ? response.data.seniorCitizenRecevingPensionSource
              : null,
          seniorCitizenBudgetAllocated:
            response.data.seniorCitizenBudgetAllocated,
          seniorCitizenBudgetAllocatedSource:
            response.data.seniorCitizenBudgetAllocatedSource[0] != "" &&
              response.data.seniorCitizenBudgetAllocatedSource != ""
              ? response.data.seniorCitizenBudgetAllocatedSource
              : null,

          seniorCitizenAffectedByCalamities: response.data.seniorCitizenAffectedByCalamities,
          seniorCitizenAffectedByCalamitiesSource:
            response.data.seniorCitizenAffectedByCalamitiesSource[0] != "" &&
              response.data.seniorCitizenAffectedByCalamitiesSource != ""
              ? response.data.seniorCitizenAffectedByCalamitiesSource
              : null,

          seniorCitizenSourceOthers: response.data.seniorCitizenSourceOthers,
          seniorCitizenWithNoCareSourceOthers: response.data.seniorCitizenWithNoCareSourceOthers,
          seniorCitizenGettingSpaSourceOthers: response.data.seniorCitizenGettingSpaSourceOthers,
          seniorCitizenRecevingPensionSourceOthers: response.data.seniorCitizenRecevingPensionSourceOthers,
          seniorCitizenBudgetAllocatedSourceOthers: response.data.seniorCitizenBudgetAllocatedSourceOthers,
          seniorCitizenAffectedByCalamitiesSourceOthers: response.data.seniorCitizenAffectedByCalamitiesSourceOthers,
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
          seniorCitizenSource: [],
          seniorCitizenWithNoCareSource: [],
          seniorCitizenGettingSpaSource: [],
          seniorCitizenRecevingPensionSource: [],
          seniorCitizenBudgetAllocatedSource: [],
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
    SeniorCitizenService.getListByOrganization(
      fiscalYear,
      quarter,
      organization
    ).then(
      (response) => {
        console.log("response", response.data);
        if (response.data) {
          setFiscalYear(response.data.fiscalYear);
          setQuarter(response.data.quarter);
          setSeniorCitizenId(response.data.seniorCitizenId);
          reset({
            seniorCitizenMale: response.data.seniorCitizenMale,
            seniorCitizenFemale: response.data.seniorCitizenFemale,
            seniorCitizenOthers: response.data.seniorCitizenOthers,
            seniorCitizenAge60To68: response.data.seniorCitizenAge60To68,
            seniorCitizenAge68To80: response.data.seniorCitizenAge68To80,
            seniorCitizenAge81To99: response.data.seniorCitizenAge81To99,
            seniorCitizenAgeAbove99: response.data.seniorCitizenAgeAbove99,
            seniorCitizenSource:
              response.data.seniorCitizenSource[0] != "" &&
                response.data.seniorCitizenSource != ""
                ? response.data.seniorCitizenSource
                : null,
            maleSeniorWithNoCare: response.data.maleSeniorWithNoCare,
            femaleSeniorWithNoCare: response.data.femaleSeniorWithNoCare,
            othersSeniorWithNoCare: response.data.othersSeniorWithNoCare,
            seniorCitizenWithNoCareSource:
              response.data.seniorCitizenWithNoCareSource[0] != "" &&
                response.data.seniorCitizenWithNoCareSource != ""
                ? response.data.seniorCitizenWithNoCareSource
                : null,
            maleSeniorGettingSpa: response.data.maleSeniorGettingSpa,
            femaleSeniorGettingSpa: response.data.femaleSeniorGettingSpa,
            othersSeniorGettingSpa: response.data.othersSeniorGettingSpa,
            seniorCitizenGettingSpaSource:
              response.data.seniorCitizenGettingSpaSource[0] != "" &&
                response.data.seniorCitizenGettingSpaSource != ""
                ? response.data.seniorCitizenGettingSpaSource
                : null,
            seniorCitizenRecevingPension:
              response.data.seniorCitizenRecevingPension,
            seniorCitizenRecevingPensionSource:
              response.data.seniorCitizenRecevingPensionSource[0] != "" &&
                response.data.seniorCitizenRecevingPensionSource != ""
                ? response.data.seniorCitizenRecevingPensionSource
                : null,
            seniorCitizenBudgetAllocated:
              response.data.seniorCitizenBudgetAllocated,
            seniorCitizenBudgetAllocatedSource:
              response.data.seniorCitizenBudgetAllocatedSource[0] != "" &&
                response.data.seniorCitizenBudgetAllocatedSource != ""
                ? response.data.seniorCitizenBudgetAllocatedSource
                : null,

            seniorCitizenAffectedByCalamities: response.data.seniorCitizenAffectedByCalamities,
            seniorCitizenAffectedByCalamitiesSource:
              response.data.seniorCitizenAffectedByCalamitiesSource[0] != "" &&
                response.data.seniorCitizenAffectedByCalamitiesSource != ""
                ? response.data.seniorCitizenAffectedByCalamitiesSource
                : null,

            seniorCitizenSourceOthers: response.data.seniorCitizenSourceOthers,
            seniorCitizenWithNoCareSourceOthers: response.data.seniorCitizenWithNoCareSourceOthers,
            seniorCitizenGettingSpaSourceOthers: response.data.seniorCitizenGettingSpaSourceOthers,
            seniorCitizenRecevingPensionSourceOthers: response.data.seniorCitizenRecevingPensionSourceOthers,
            seniorCitizenBudgetAllocatedSourceOthers: response.data.seniorCitizenBudgetAllocatedSourceOthers,
            seniorCitizenAffectedByCalamitiesSourceOthers: response.data.seniorCitizenAffectedByCalamitiesSourceOthers,
          });
        } else {
          console.log("no data");
          reset({
            seniorCitizenSource: [],
            seniorCitizenWithNoCareSource: [],
            seniorCitizenGettingSpaSource: [],
            seniorCitizenRecevingPensionSource: [],
            seniorCitizenBudgetAllocatedSource: [],
          });
        }
      }
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
          <h4 className="p-pt-0">{t("seniorCitizen")}</h4>
        </div>
      </Card>


      <Card className="p-mt-0"
      // style={{ height: "72vh", overflowY: "auto" }}
      >
        <div className="p-card-content">
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
              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("totSeniorCitizen")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totSeniorCitizenDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="seniorCitizenMale"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="seniorCitizenFemale"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="seniorCitizenOthers"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="seniorCitizenTot"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("seniorCitizenMale") ? getValues("seniorCitizenMale") : 0)
                            + (getValues("seniorCitizenFemale") ? getValues("seniorCitizenFemale") : 0)
                            + (getValues("seniorCitizenOthers") ? getValues("seniorCitizenOthers") : 0)}
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
                      name="seniorCitizenAge60To68"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("age60To68")}
                          tooltip={t("age60To68")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="seniorCitizenAge68To80"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("age68To80")}
                          tooltip={t("age68To80")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="seniorCitizenAge81To99"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("age81To99")}
                          tooltip={t("age81To99")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="seniorCitizenAgeAbove99"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("ageAbove99")}
                          tooltip={t("ageAbove99")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="seniorCitizenAgeTot"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("seniorCitizenAge60To68") ? getValues("seniorCitizenAge60To68") : 0)
                            + (getValues("seniorCitizenAge68To80") ? getValues("seniorCitizenAge68To80") : 0)
                            + (getValues("seniorCitizenAge81To99") ? getValues("seniorCitizenAge81To99") : 0)
                            + (getValues("seniorCitizenAgeAbove99") ? getValues("seniorCitizenAgeAbove99") : 0)}
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
                    name="seniorCitizenSource"
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
                        sourceOtherValue={getValues("seniorCitizenSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("seniorCitizenSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("seniorCitizenSource")}
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
                    {t("perSeniorCitizenWithNoCare")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("perSeniorCitizenWithNoCareDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="maleSeniorWithNoCare"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("maleSeniorWithNoCare",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("male")}
                            tooltip={t("male")}
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
                        name="femaleSeniorWithNoCare"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("femaleSeniorWithNoCare",0) : field.value}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            min="0"
                            max="100"
                            mode="decimal"
                            minFractionDigits={2}
                            maxFracionDigits={2}
                            placeholder={t("female")}
                            tooltip={t("female")}
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
                        name="othersSeniorWithNoCare"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={field.value > 100 ? setValue("othersSeniorWithNoCare",0) : field.value}
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
                        name="seniorCitizenTot"
                        control={control}
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
                            {...field}
                            className={classNames({
                              "p-invalid": fieldState.invalid,
                            })}
                            value={(getValues("maleSeniorWithNoCare") ? getValues("maleSeniorWithNoCare") : 0)
                              + (getValues("femaleSeniorWithNoCare") ? getValues("femaleSeniorWithNoCare") : 0)
                              + (getValues("othersSeniorWithNoCare") ? getValues("othersSeniorWithNoCare") : 0)}
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
                    name="seniorCitizenWithNoCareSource"
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
                        sourceOtherValue={getValues("seniorCitizenWithNoCareSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("seniorCitizenWithNoCareSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("seniorCitizenWithNoCareSource")}
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
                    {t("totSeniorCitGettingSPA")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totSeniorCitGettingSPADesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleSeniorGettingSpa"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("seniorCitizenMale") ? setValue("maleSeniorGettingSpa", 0) : field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleSeniorGettingSpa"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("seniorCitizenFemale") ? setValue("femaleSeniorGettingSpa", 0) : field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersSeniorGettingSpa"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("seniorCitizenOthers") ? setValue("othersSeniorGettingSpa", 0) : field.value}
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
                      name="seniorCitizenTot"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("maleSeniorGettingSpa") ? getValues("maleSeniorGettingSpa") : 0)
                            + (getValues("femaleSeniorGettingSpa") ? getValues("femaleSeniorGettingSpa") : 0)
                            + (getValues("othersSeniorGettingSpa") ? getValues("othersSeniorGettingSpa") : 0)}
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
                    <p style={{ margin: "0px", color: "red" }}>{t("seniorCitizenGettingSpaNote")}</p>
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="seniorCitizenGettingSpaSource"
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
                        sourceOtherValue={getValues("seniorCitizenGettingSpaSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("seniorCitizenGettingSpaSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("seniorCitizenGettingSpaSource")}
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
                    {t("totSeniorCitRecevingPension")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totSeniorCitRecevingPensionDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="seniorCitizenRecevingPension"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                    name="seniorCitizenRecevingPensionSource"
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
                        sourceOtherValue={getValues("seniorCitizenRecevingPensionSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("seniorCitizenRecevingPensionSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("seniorCitizenRecevingPensionSource")}
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
                    {t("perSeniorCitBudgetAllocated")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("perSeniorCitBudgetAllocatedDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="seniorCitizenBudgetAllocated"
                        control={control}
                        autoFocus
                        render={({ field, fieldState }) => (
                          <InputNumber
                            id={field.name}
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
                    name="seniorCitizenBudgetAllocatedSource"
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
                        sourceOtherValue={getValues("seniorCitizenBudgetAllocatedSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("seniorCitizenBudgetAllocatedSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("seniorCitizenBudgetAllocatedSource")}
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
                    {t("totSeniorCitAffByNatCal")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totAffectedByNaturalCalamitiesDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="seniorCitizenAffectedByCalamities"
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
                    name="seniorCitizenAffectedByCalamitiesSource"
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
                        sourceOtherValue={getValues("seniorCitizenAffectedByCalamitiesSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("seniorCitizenAffectedByCalamitiesSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("seniorCitizenAffectedByCalamitiesSource")}
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
      </Card>
    </>
  );
}

export default SeniorCitizenModule;
