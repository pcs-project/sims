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
import ChildCorrectionHomeService from "../api/services/ChildCorrectionHomeService";
import OrganizationService from "../../security/api/services/OrganizationService";
import Organization from "../../utilities/components/Organization";
import { trackPromise } from "react-promise-tracker";
import UserService from "../../security/api/services/UserService";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";

function JuvenileChildHomeIndicator() {
  const { t } = useTranslation();
  const history = useHistory();

  const [fiscalYear, setFiscalYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [childCorrectionHomeId, setChildCorrectionHomeId] = useState();

  const [update, setUpdate] = useState("No");
  const [showBtn, setShowBtn] = useState("Yes");
  const [hideBtn, setHideBtn] = useState("No");
  const [enableForm, setEnableForm] = useState(true);
  const [homeRegisteredModal, setHomeRegisteredModal] = useState(true);
  const [organization, setOrganization] = useState("");

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
  const saveData = (data) => {
    data.fiscalYear = fiscalYear;
    data.quarter = quarter;
    data.status = "Save";
    console.log("data", data);

    if (update == "No") {
      //trackPromise is used for loading
      trackPromise(
        ChildCorrectionHomeService.saveData(data).then((response) => {
          console.log("response", response);
          if (response.status === 200) {
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
      data.childCorrectionHomeId = childCorrectionHomeId;
      trackPromise(
        ChildCorrectionHomeService.updateData(data).then((response) => {
          console.log("response", response);
          if (response.status === 200) {
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

    if (update === "No") {
      //trackPromise is used for loading
      trackPromise(
        ChildCorrectionHomeService.saveData(data).then((response) => {
          console.log("response", response);
          if (response.status === 200) {
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
      data.childCorrectionHomeId = childCorrectionHomeId;
      trackPromise(
        ChildCorrectionHomeService.updateData(data).then((response) => {
          console.log("response", response);
          if (response.status === 200) {
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
      ChildCorrectionHomeService.getListByFiscalYearAndQuarter(
        fiscalYear,
        quarter
      ).then((response) => {
        console.log("response", response.data);
        if (response.data) {
          setFiscalYear(response.data.fiscalYear);
          setQuarter(response.data.quarter);
          setChildCorrectionHomeId(response.data.childCorrectionHomeId);
          reset({
            totChildCorrectionHome: response.data.totChildCorrectionHome,
            totChildCorrectionHomeSource:
              response.data.totChildCorrectionHomeSource[0] != "" &&
                response.data.totChildCorrectionHomeSource != ""
                ? response.data.totChildCorrectionHomeSource
                : null,
            boysReceivingServicesInCch:
              response.data.boysReceivingServicesInCch,
            othersReceivingServicesInCch:
              response.data.othersReceivingServicesInCch,
            girlsReceivingServicesInCch:
              response.data.girlsReceivingServicesInCch,
            dalitReceivingServicesInCch:
              response.data.dalitReceivingServicesInCch,
            ethnicMinoritiesReceivingServicesInCch:
              response.data.ethnicMinoritiesReceivingServicesInCch,
            janajatiReceivingServicesInCch:
              response.data.janajatiReceivingServicesInCch,
            madhesiReceivingServicesInCch:
              response.data.madhesiReceivingServicesInCch,
            brahminReceivingServicesInCch:
              response.data.brahminReceivingServicesInCch,
            othersEthnicityReceivingServicesInCch:
              response.data.othersEthnicityReceivingServicesInCch,
            childReceivingServicesInCchSource:
              response.data.childReceivingServicesInCchSource[0] != "" &&
                response.data.childReceivingServicesInCchSource != ""
                ? response.data.childReceivingServicesInCchSource
                : null,
            boysRehabilitatedFromCch: response.data.boysRehabilitatedFromCch,
            girlsRehabilitatedFromCch: response.data.girlsRehabilitatedFromCch,
            othersRehabilitatedFromCch:
              response.data.othersRehabilitatedFromCch,
            rehabilitatedFromHome: response.data.rehabilitatedFromHome,
            rehabilitatedFromOjt: response.data.rehabilitatedFromOjt,
            rehabilitatedFromOutOfCommunity:
              response.data.rehabilitatedFromOutOfCommunity,
            rehabilitatedFromAdoption: response.data.rehabilitatedFromAdoption,
            rehabilitatedFromFosterHome:
              response.data.rehabilitatedFromFosterHome,
            childRehabilitatedSource:
              response.data.childRehabilitatedSource[0] != "" &&
                response.data.childRehabilitatedSource != ""
                ? response.data.childRehabilitatedSource
                : null,
            budgetForChildCorrectionHome:
              response.data.budgetForChildCorrectionHome,
            budgetForChildCorrectionHomeSource:
              response.data.budgetForChildCorrectionHomeSource,
            budgetForChildCorrectionHomeSource:
              response.data.budgetForChildCorrectionHomeSource[0] != "" &&
                response.data.budgetForChildCorrectionHomeSource != ""
                ? response.data.budgetForChildCorrectionHomeSource
                : null,

            muslimReceivingServicesInCch:
              response.data.muslimReceivingServicesInCch,

            totChildCorrectionHomeSourceOthers:
              response.data.totChildCorrectionHomeSourceOthers,
            childReceivingServicesInCchSourceOthers:
              response.data.childReceivingServicesInCchSourceOthers,
            childRehabilitatedSourceOthers:
              response.data.childRehabilitatedSourceOthers,
            budgetForChildCorrectionHomeSourceOthers:
              response.data.budgetForChildCorrectionHomeSourceOthers,
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
            totChildCorrectionHomeSource: [],
            childReceivingServicesInCchSource: [],
            childRehabilitatedSource: [],
            budgetForChildCorrectionHomeSource: [],
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
    trackPromise(
      ChildCorrectionHomeService.getListByOrganization(
        fiscalYear,
        quarter,
        organization
      ).then((response) => {
        console.log("response", response.data);
        if (response.data) {
          setFiscalYear(response.data.fiscalYear);
          setQuarter(response.data.quarter);
          setChildCorrectionHomeId(response.data.childCorrectionHomeId);
          reset({
            totChildCorrectionHome: response.data.totChildCorrectionHome,
            totChildCorrectionHomeSource:
              response.data.totChildCorrectionHomeSource[0] != "" &&
                response.data.totChildCorrectionHomeSource != ""
                ? response.data.totChildCorrectionHomeSource
                : null,
            boysReceivingServicesInCch:
              response.data.boysReceivingServicesInCch,
            othersReceivingServicesInCch:
              response.data.othersReceivingServicesInCch,
            girlsReceivingServicesInCch:
              response.data.girlsReceivingServicesInCch,
            dalitReceivingServicesInCch:
              response.data.dalitReceivingServicesInCch,
            ethnicMinoritiesReceivingServicesInCch:
              response.data.ethnicMinoritiesReceivingServicesInCch,
            janajatiReceivingServicesInCch:
              response.data.janajatiReceivingServicesInCch,
            madhesiReceivingServicesInCch:
              response.data.madhesiReceivingServicesInCch,
            brahminReceivingServicesInCch:
              response.data.brahminReceivingServicesInCch,
            othersEthnicityReceivingServicesInCch:
              response.data.othersEthnicityReceivingServicesInCch,
            childReceivingServicesInCchSource:
              response.data.childReceivingServicesInCchSource[0] != "" &&
                response.data.childReceivingServicesInCchSource != ""
                ? response.data.childReceivingServicesInCchSource
                : null,
            boysRehabilitatedFromCch: response.data.boysRehabilitatedFromCch,
            girlsRehabilitatedFromCch: response.data.girlsRehabilitatedFromCch,
            othersRehabilitatedFromCch:
              response.data.othersRehabilitatedFromCch,
            rehabilitatedFromHome: response.data.rehabilitatedFromHome,
            rehabilitatedFromOjt: response.data.rehabilitatedFromOjt,
            rehabilitatedFromOutOfCommunity:
              response.data.rehabilitatedFromOutOfCommunity,
            rehabilitatedFromAdoption: response.data.rehabilitatedFromAdoption,
            rehabilitatedFromFosterHome:
              response.data.rehabilitatedFromFosterHome,
            childRehabilitatedSource:
              response.data.childRehabilitatedSource[0] != "" &&
                response.data.childRehabilitatedSource != ""
                ? response.data.childRehabilitatedSource
                : null,
            budgetForChildCorrectionHome:
              response.data.budgetForChildCorrectionHome,
            budgetForChildCorrectionHomeSource:
              response.data.budgetForChildCorrectionHomeSource,
            budgetForChildCorrectionHomeSource:
              response.data.budgetForChildCorrectionHomeSource[0] != "" &&
                response.data.budgetForChildCorrectionHomeSource != ""
                ? response.data.budgetForChildCorrectionHomeSource
                : null,

            muslimReceivingServicesInCch:
              response.data.muslimReceivingServicesInCch,

            totChildCorrectionHomeSourceOthers:
              response.data.totChildCorrectionHomeSourceOthers,
            childReceivingServicesInCchSourceOthers:
              response.data.childReceivingServicesInCchSourceOthers,
            childRehabilitatedSourceOthers:
              response.data.childRehabilitatedSourceOthers,
            budgetForChildCorrectionHomeSourceOthers:
              response.data.budgetForChildCorrectionHomeSourceOthers,
          });
        } else {
          console.log("no data");
          reset({
            totChildCorrectionHomeSource: [],
            childReceivingServicesInCchSource: [],
            childRehabilitatedSource: [],
            budgetForChildCorrectionHomeSource: [],
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
      <Card
        className="p-mb-1"
        style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}
      >
        <div className=" p-card-content">
          <h4 className="p-pt-0">{t("juvenileChildHomeIndicator")}</h4>
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

            <div className="p-col-12 p-md-12 main-form" onClick={fiscalYearValidation} disabled={enableForm}>
              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("totChildCorrectionHome")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totChildCorrectionHomeDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totChildCorrectionHome"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
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
                          min="0"
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="totChildCorrectionHomeSource"
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
                        sourceOtherValue={getValues("totChildCorrectionHomeSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("totChildCorrectionHomeSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("totChildCorrectionHomeSource")}
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
                        {t("totChildReceivingServicesInCch")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("totChildReceivingServicesInCchDesc")}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left sub-label">
                        {t("byGender")}
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="boysReceivingServicesInCch"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="girlsReceivingServicesInCch"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="othersReceivingServicesInCch"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="totalReceivingServicesInCch"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("boysReceivingServicesInCch") ? getValues("boysReceivingServicesInCch") : 0)
                                + (getValues("girlsReceivingServicesInCch") ? getValues("girlsReceivingServicesInCch") : 0)
                                + (getValues("othersReceivingServicesInCch") ? getValues("othersReceivingServicesInCch") : 0)}
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
                          name="dalitReceivingServicesInCch"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="muslimReceivingServicesInCch"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="janajatiReceivingServicesInCch"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="madhesiReceivingServicesInCch"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="brahminReceivingServicesInCch"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="ethnicMinoritiesReceivingServicesInCch"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="othersEthnicityReceivingServicesInCch"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="totReceivingServicesInCch"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("dalitReceivingServicesInCch") ? getValues("dalitReceivingServicesInCch") : 0)
                                + (getValues("muslimReceivingServicesInCch") ? getValues("muslimReceivingServicesInCch") : 0)
                                + (getValues("janajatiReceivingServicesInCch") ? getValues("janajatiReceivingServicesInCch") : 0)
                                + (getValues("madhesiReceivingServicesInCch") ? getValues("madhesiReceivingServicesInCch") : 0)
                                + (getValues("brahminReceivingServicesInCch") ? getValues("brahminReceivingServicesInCch") : 0)
                                + (getValues("ethnicMinoritiesReceivingServicesInCch") ? getValues("ethnicMinoritiesReceivingServicesInCch") : 0)
                                + (getValues("othersEthnicityReceivingServicesInCch") ? getValues("othersEthnicityReceivingServicesInCch") : 0)}
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
                        name="childReceivingServicesInCchSource"
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
                            sourceOtherValue={getValues("childReceivingServicesInCchSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("childReceivingServicesInCchSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("childReceivingServicesInCchSource")}
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
                        {t("totChildRehabilitatedFromCch")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("totChildRehabilitatedFromCchDesc")}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left sub-label">
                        {t("byGender")}
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="boysRehabilitatedFromCch"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="girlsRehabilitatedFromCch"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="othersRehabilitatedFromCch"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="totalRehabilitatedFromCch"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("boysRehabilitatedFromCch") ? getValues("boysRehabilitatedFromCch") : 0)
                                + (getValues("girlsRehabilitatedFromCch") ? getValues("girlsRehabilitatedFromCch") : 0)
                                + (getValues("othersRehabilitatedFromCch") ? getValues("othersRehabilitatedFromCch") : 0)}
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
                        {t("perBudgetForChildCorrectionHome")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("perBudgetForChildCorrectionHomeDesc")}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <div className="p-inputgroup">
                          <Controller
                            name="budgetForChildCorrectionHome"
                            control={control}
                            autoFocus
                            render={({ field, fieldState }) => (
                              <InputNumber
                                id={field.name}
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
                        name="budgetForChildCorrectionHomeSource"
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
                            sourceOtherValue={getValues("budgetForChildCorrectionHomeSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("budgetForChildCorrectionHomeSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("budgetForChildCorrectionHomeSource")}
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
export default JuvenileChildHomeIndicator;
