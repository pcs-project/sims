import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { useHistory } from "react-router";

import FiscalQuarter from "../../utilities/components/FiscalQuarter";
import Source from "../../utilities/components/Source";
import { useTranslation } from "react-i18next";

import ChildHomeService from "../api/services/ChildHomeService";

import Organization from "../../utilities/components/Organization";
import OrganizationService from "../../security/api/services/OrganizationService";
import { trackPromise } from "react-promise-tracker";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import UserService from "../../security/api/services/UserService";

function ChildHomeIndicator() {
  const { t } = useTranslation();

  const [fiscalYear, setFiscalYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [childHomeId, setChildHomeId] = useState();

  const [update, setUpdate] = useState("No");
  const [showBtn, setShowBtn] = useState("Yes");
  const [hideBtn, setHideBtn] = useState("No");
  const [enableForm, setEnableForm] = useState(true);
  const [homeRegisteredModal, setHomeRegisteredModal] = useState(true);

  const [organization, setOrganization] = useState("");
  const [organizationList, setOrganizationList] = useState([]);
  const history = useHistory();

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
        ChildHomeService.saveData(data).then((response) => {
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
      data.childHomeId = childHomeId;
      trackPromise(
        ChildHomeService.updateData(data).then((response) => {
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
        ChildHomeService.saveData(data).then((response) => {
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
      data.childHomeId = childHomeId;
      trackPromise(
        ChildHomeService.updateData(data).then((response) => {
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
    trackPromise(
      ChildHomeService.getListByFiscalYearAndQuarter(fiscalYear, quarter).then(
        (response) => {
          console.log("response", response.data);
          if (response.data) {
            setFiscalYear(response.data.fiscalYear);
            setQuarter(response.data.quarter);
            setChildHomeId(response.data.childHomeId);
            reset({
              totChildHome: response.data.totChildHome,
              childHomeSource:
                response.data.childHomeSource[0] != "" &&
                  response.data.childHomeSource != ""
                  ? response.data.childHomeSource
                  : null,
              boysReceivingServices: response.data.boysReceivingServices,
              girlsReceivingServices: response.data.girlsReceivingServices,
              othersReceivingServices: response.data.othersReceivingServices,
              tipReceivingServices: response.data.tipReceivingServices,
              gbvReceivingServices: response.data.gbvReceivingServices,
              trappedInAddictionReceivingServices: response.data.trappedInAddictionReceivingServices,
              drugAddictReceivingServices: response.data.drugAddictReceivingServices,
              streetChildrenReceivingServices: response.data.streetChildrenReceivingServices,
              dalitReceivingServices: response.data.dalitReceivingServices,
              ethnicMinoritiesReceivingServices:
                response.data.ethnicMinoritiesReceivingServices,
              janajatiReceivingServices:
                response.data.janajatiReceivingServices,
              madhesiReceivingServices: response.data.madhesiReceivingServices,
              brahminReceivingServices: response.data.brahminReceivingServices,
              othersEthnicityReceivingServices:
                response.data.othersEthnicityReceivingServices,
              childReceivingServicesSource:
                response.data.childReceivingServicesSource[0] != "" &&
                  response.data.childReceivingServicesSource != ""
                  ? response.data.childReceivingServicesSource
                  : null,
              rehabilitatedFromHome: response.data.rehabilitatedFromHome,
              rehabilitatedFromOjt: response.data.rehabilitatedFromOjt,
              rehabilitatedFromOutOfCommunity:
                response.data.rehabilitatedFromOutOfCommunity,
              rehabilitatedFromAdoption:
                response.data.rehabilitatedFromAdoption,
              rehabilitatedFromFosterHome:
                response.data.rehabilitatedFromFosterHome,
              childRehabilitatedSource:
                response.data.childRehabilitatedSource[0] != "" &&
                  response.data.childRehabilitatedSource != ""
                  ? response.data.childRehabilitatedSource
                  : null,
              budgetForChildHome: response.data.budgetForChildHome,
              budgetForChildHomeSource:
                response.data.budgetForChildHomeSource[0] != "" &&
                  response.data.budgetForChildHomeSource != ""
                  ? response.data.budgetForChildHomeSource
                  : null,
              muslimReceivingServices: response.data.muslimReceivingServices,

              childHomeSourceOthers:
                response.data.childHomeSourceOthers,
              childReceivingServicesSourceOthers:
                response.data.childReceivingServicesSourceOthers,
              childRehabilitatedSourceOthers:
                response.data.childRehabilitatedSourceOthers,
              budgetForChildHomeSourceOthers:
                response.data.budgetForChildHomeSourceOthers,
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
              childHomeSource: [],
              childReceivingServicesSource: [],
              childRehabilitatedSource: [],
              budgetForChildHomeSource: [],
            });
            setUpdate("No");
            setShowBtn("Yes");
          }
        }
      )
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

  const getListByOrganization = (fiscalYear, quarter, organizationId) => {
    trackPromise(
      ChildHomeService.getListByOrganization(
        fiscalYear,
        quarter,
        organizationId
      ).then((response) => {
        console.log("response", response.data);
        if (response.data) {
          setFiscalYear(response.data.fiscalYear);
          setQuarter(response.data.quarter);
          setChildHomeId(response.data.childHomeId);
          reset({
            totChildHome: response.data.totChildHome,
            childHomeSource:
              response.data.childHomeSource[0] != "" &&
                response.data.childHomeSource != ""
                ? response.data.childHomeSource
                : null,
            boysReceivingServices: response.data.boysReceivingServices,
            girlsReceivingServices: response.data.girlsReceivingServices,
            othersReceivingServices: response.data.othersReceivingServices,
            tipReceivingServices: response.data.tipReceivingServices,
            gbvReceivingServices: response.data.gbvReceivingServices,
            trappedInAddictionReceivingServices: response.data.trappedInAddictionReceivingServices,
            drugAddictReceivingServices: response.data.drugAddictReceivingServices,
            streetChildrenReceivingServices: response.data.streetChildrenReceivingServices,
            dalitReceivingServices: response.data.dalitReceivingServices,
            ethnicMinoritiesReceivingServices:
              response.data.ethnicMinoritiesReceivingServices,
            janajatiReceivingServices:
              response.data.janajatiReceivingServices,
            madhesiReceivingServices: response.data.madhesiReceivingServices,
            brahminReceivingServices: response.data.brahminReceivingServices,
            othersEthnicityReceivingServices:
              response.data.othersEthnicityReceivingServices,
            childReceivingServicesSource:
              response.data.childReceivingServicesSource[0] != "" &&
                response.data.childReceivingServicesSource != ""
                ? response.data.childReceivingServicesSource
                : null,
            rehabilitatedFromHome: response.data.rehabilitatedFromHome,
            rehabilitatedFromOjt: response.data.rehabilitatedFromOjt,
            rehabilitatedFromOutOfCommunity:
              response.data.rehabilitatedFromOutOfCommunity,
            rehabilitatedFromAdoption:
              response.data.rehabilitatedFromAdoption,
            rehabilitatedFromFosterHome:
              response.data.rehabilitatedFromFosterHome,
            childRehabilitatedSource:
              response.data.childRehabilitatedSource[0] != "" &&
                response.data.childRehabilitatedSource != ""
                ? response.data.childRehabilitatedSource
                : null,
            budgetForChildHome: response.data.budgetForChildHome,
            budgetForChildHomeSource:
              response.data.budgetForChildHomeSource[0] != "" &&
                response.data.budgetForChildHomeSource != ""
                ? response.data.budgetForChildHomeSource
                : null,
            muslimReceivingServices: response.data.muslimReceivingServices,

            childHomeSourceOthers:
              response.data.childHomeSourceOthers,
            childReceivingServicesSourceOthers:
              response.data.childReceivingServicesSourceOthers,
            childRehabilitatedSourceOthers:
              response.data.childRehabilitatedSourceOthers,
            budgetForChildHomeSourceOthers:
              response.data.budgetForChildHomeSourceOthers,
          });
        } else {
          console.log("no data");
          reset({
            childHomeSource: [],
            childReceivingServicesSource: [],
            childRehabilitatedSource: [],
            budgetForChildHomeSource: [],
          });
        }
      })
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
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className="p-card-content">
          <h4 className="p-pt-0"> {t("childHome")}</h4>
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
            label={t("Case form")}
            onClick={() =>
              history.push("/sims/child-home")
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
              history.push("/sims/child-home-list")
            }
          />
        </div>
      </div>


      <Card className="p-mt-0"
      // style={{ height: "72vh", overflowY: "auto" }}
      >
        <div className="p-card-content">
          <form className="p-grid p-fluid" autoComplete="off">
            <Organization submitOrganizationId={handleOrganization} />
            <FiscalQuarter
              fiscalYearValue={fiscalYear}
              handleFiscalYearState={handleFiscalYear}
              quarterValue={quarter}
              handleQuarterState={handleQuarter}
            />

            {hideBtn === "Yes" ? <></> : <></>}

            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 ">
                <hr style={{ marginTop: "5px" }}></hr>
              </div>
            </div>

            <div className="p-col-12 p-md-12 main-form" onClick={fiscalYearValidation} disabled={enableForm}>
              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("totChildHome")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totChildHomeDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totChildHome"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                            e.value === 0
                              ? setHomeRegisteredModal(false)
                              : setHomeRegisteredModal(true);
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="childHomeSource"
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
                        sourceOtherValue={getValues("childHomeSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("childHomeSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("childHomeSource")}
                  </div>
                </div>
              </div>


              {homeRegisteredModal ? (
                <>
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
                        {t("totChildReceivingServices")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("totChildReceivingServicesDesc")}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left sub-label">
                        {t("byGender")}
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="boysReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
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
                          name="girlsReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="othersReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
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
                          name="totalReceivingServices"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("boysReceivingServices") ? getValues("boysReceivingServices") : 0)
                                + (getValues("girlsReceivingServices") ? getValues("girlsReceivingServices") : 0)
                                + (getValues("othersReceivingServices") ? getValues("othersReceivingServices") : 0)}
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
                          name="tipReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("tip")}
                              tooltip={t("tip")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="gbvReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("gbv")}
                              tooltip={t("gbv")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="trappedInAddictionReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("trappedInAddiction")}
                              tooltip={t("trappedInAddiction")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="drugAddictReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("drugAddict")}
                              tooltip={t("drugAddict")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="streetChildrenReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("streetChildren")}
                              tooltip={t("streetChildren")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="totReceivingServices"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("tipReceivingServices") ? getValues("tipReceivingServices") : 0)
                                + (getValues("gbvReceivingServices") ? getValues("gbvReceivingServices") : 0)
                                + (getValues("trappedInAddictionReceivingServices") ? getValues("trappedInAddictionReceivingServices") : 0)
                                + (getValues("drugAddictReceivingServices") ? getValues("drugAddictReceivingServices") : 0)
                                + (getValues("streetChildrenReceivingServices") ? getValues("streetChildrenReceivingServices") : 0)}
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
                        {t("byEthnicity")}
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="dalitReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("dalit")}
                              tooltip={t("dalit")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="muslimReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("muslim")}
                              tooltip={t("muslim")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-1 p-md-2 float-left">
                        <Controller
                          name="janajatiReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("janajati")}
                              tooltip={t("janajati")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-1 p-md-2 float-left">
                        <Controller
                          name="madhesiReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("madhesi")}
                              tooltip={t("madhesi")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="brahminReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("brahminOther")}
                              tooltip={t("brahminOther")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="ethnicMinoritiesReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("ethnicMinorities")}
                              tooltip={t("ethnicMinorities")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="othersEthnicityReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="totReceivingServices"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("dalitReceivingServices") ? getValues("dalitReceivingServices") : 0)
                                + (getValues("muslimReceivingServices") ? getValues("muslimReceivingServices") : 0)
                                + (getValues("janajatiReceivingServices") ? getValues("janajatiReceivingServices") : 0)
                                + (getValues("madhesiReceivingServices") ? getValues("madhesiReceivingServices") : 0)
                                + (getValues("brahminReceivingServices") ? getValues("brahminReceivingServices") : 0)
                                + (getValues("ethnicMinoritiesReceivingServices") ? getValues("ethnicMinoritiesReceivingServices") : 0)
                                + (getValues("othersEthnicityReceivingServices") ? getValues("othersEthnicityReceivingServices") : 0)}
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
                        name="childReceivingServicesSource"
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
                            sourceOtherValue={getValues("childReceivingServicesSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("childReceivingServicesSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("childReceivingServicesSource")}
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
                        {t("totChildRehabilitated")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("totChildRehabilitatedDesc")}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left sub-label">
                        {t("byRehabilitation")}
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="rehabilitatedFromHome"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("home")}
                              tooltip={t("home")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="rehabilitatedFromOjt"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("ojt")}
                              tooltip={t("ojt")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="rehabilitatedFromOutOfCommunity"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("outOfCommunity")}
                              tooltip={t("outOfCommunity")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="rehabilitatedFromAdoption"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("adoption")}
                              tooltip={t("adoption")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="rehabilitatedFromFosterHome"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("fosterHome")}
                              tooltip={t("fosterHome")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="rehabilitatedTotal"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("rehabilitatedFromHome") ? getValues("rehabilitatedFromHome") : 0)
                                + (getValues("rehabilitatedFromOjt") ? getValues("rehabilitatedFromOjt") : 0)
                                + (getValues("rehabilitatedFromOutOfCommunity") ? getValues("rehabilitatedFromOutOfCommunity") : 0)
                                + (getValues("rehabilitatedFromAdoption") ? getValues("rehabilitatedFromAdoption") : 0)
                                + (getValues("rehabilitatedFromFosterHome") ? getValues("rehabilitatedFromFosterHome") : 0)}
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
                        name="childRehabilitatedSource"
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
                            sourceOtherValue={getValues("childRehabilitatedSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("childRehabilitatedSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("childRehabilitatedSource")}
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
                        {t("perBudgetForChildHome")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("perBudgetForChildHomeDesc")}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <div className="p-inputgroup">
                          <Controller
                            name="budgetForChildHome"
                            control={control}
                            autoFocus
                            render={({ field, fieldState }) => (
                              <InputNumber
                                id={field.name}
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
                        name="budgetForChildHomeSource"
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
                            sourceOtherValue={getValues("budgetForChildHomeSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("budgetForChildHomeSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("budgetForChildHomeSource")}
                      </div>
                    </div>
                  </div>
                </>
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
                          onClick={(e) => saveData(e)}/>
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

export default ChildHomeIndicator;
