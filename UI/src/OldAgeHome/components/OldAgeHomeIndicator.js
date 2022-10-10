import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";

import FiscalQuarter from "../../utilities/components/FiscalQuarter";
import Source from "../../utilities/components/Source";
import OldAgeHomeService from "../api/services/OldAgeHomeService";
import Organization from "../../utilities/components/Organization";
import { trackPromise } from "react-promise-tracker";
import { useTranslation } from "react-i18next";
import UserService from "../../security/api/services/UserService";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import { useHistory } from "react-router";
function OldAgeHomeIndicator() {
  const { t } = useTranslation();
  const history = useHistory();

  const [fiscalYear, setFiscalYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [oldAgeHomeId, setOldAgeHomeId] = useState();

  const [update, setUpdate] = useState("No");
  const [showBtn, setShowBtn] = useState("Yes");
  const [hideBtn, setHideBtn] = useState("No");
  const [enableForm, setEnableForm] = useState(true);
  const [homeRegisteredModal, setHomeRegisteredModal] = useState(true);
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

    if (update === "No") {
      //trackPromise is used for loading
      trackPromise(
        OldAgeHomeService.saveData(data).then((response) => {
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
      data.oldAgeHomeId = oldAgeHomeId;
      trackPromise(
        OldAgeHomeService.updateData(data).then((response) => {
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
        OldAgeHomeService.saveData(data).then((response) => {
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
      data.oldAgeHomeId = oldAgeHomeId;
      trackPromise(
        OldAgeHomeService.updateData(data).then((response) => {
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
    if (quarter !== "" && organization !== "") {
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
    if (fiscalYear !== "" && organization !== "") {
      getListByOrganization(fiscalYear, quarterVal, organization);
    } else if (fiscalYear !== "") {
      getListByFiscalYearAndQuarter(fiscalYear, quarterVal);
    }
  };

  const getListByFiscalYearAndQuarter = (fiscalYear, quarter) => {
    trackPromise(
      OldAgeHomeService.getListByFiscalYearAndQuarter(fiscalYear, quarter).then(
        (response) => {
          console.log("response", response.data);
          if (response.data) {
            setFiscalYear(response.data.fiscalYear);
            setQuarter(response.data.quarter);
            setOldAgeHomeId(response.data.oldAgeHomeId);
            reset({
              totOldAgeHome: response.data.totOldAgeHome,
              totOldAgeHomeSource:
                response.data.totOldAgeHomeSource[0] != "" &&
                  response.data.totOldAgeHomeSource != ""
                  ? response.data.totOldAgeHomeSource
                  : null,
              maleCitizenReceivingServices:
                response.data.maleCitizenReceivingServices,
              femaleCitizenReceivingServices:
                response.data.femaleCitizenReceivingServices,
              othersCitizenReceivingServices:
                response.data.othersCitizenReceivingServices,
              dalitReceivingServices: response.data.dalitReceivingServices,
              ethnicMinoritiesReceivingServices:
                response.data.ethnicMinoritiesReceivingServices,
              janajatiReceivingServices:
                response.data.janajatiReceivingServices,
              madhesiReceivingServices: response.data.madhesiReceivingServices,
              brahminReceivingServices: response.data.brahminReceivingServices,
              muslimReceivingServices: response.data.muslimReceivingServices,
              othersEthnicityReceivingServices: response.data.othersEthnicityReceivingServices,
              citizenReceivingServicesSource:
                response.data.citizenReceivingServicesSource[0] != "" &&
                  response.data.citizenReceivingServicesSource != ""
                  ? response.data.citizenReceivingServicesSource
                  : null,
              maleCitizenRehabilitated: response.data.maleCitizenRehabilitated,
              femaleCitizenRehabilitated:
                response.data.femaleCitizenRehabilitated,
              othersCitizenRehabilitated:
                response.data.othersCitizenRehabilitated,
              citizenRehabilitatedByHome:
                response.data.citizenRehabilitatedByHome,
              citizenRehabilitatedByRelatives:
                response.data.citizenRehabilitatedByRelatives,
              citizenRehabilitatedSource:
                response.data.citizenRehabilitatedSource[0] != "" &&
                  response.data.citizenRehabilitatedSource != ""
                  ? response.data.citizenRehabilitatedSource
                  : null,
              budgetForOldAgeHome: response.data.budgetForOldAgeHome,
              budgetForOldAgeHomeSource:
                response.data.budgetForOldAgeHomeSource[0] != "" &&
                  response.data.budgetForOldAgeHomeSource != ""
                  ? response.data.budgetForOldAgeHomeSource
                  : null,

              totOldAgeHomeSourceOthers: response.data.totOldAgeHomeSourceOthers,
              citizenReceivingServicesSourceOthers: response.data.citizenReceivingServicesSourceOthers,
              citizenRehabilitatedSourceOthers: response.data.citizenRehabilitatedSourceOthers,
              budgetForOldAgeHomeSourceOthers: response.data.budgetForOldAgeHomeSourceOthers,
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
              totOldAgeHomeSource: [],
              citizenReceivingServicesSource: [],
              citizenRehabilitatedSource: [],
              budgetForOldAgeHomeSource: [],
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

  const getListByOrganization = (fiscalYear, quarter, organization) => {
    trackPromise(
      OldAgeHomeService.getListByFiscalYearAndQuarter(
        fiscalYear,
        quarter,
        organization
      ).then((response) => {
        console.log("response", response.data);
        if (response.data) {
          setFiscalYear(response.data.fiscalYear);
          setQuarter(response.data.quarter);
          setOldAgeHomeId(response.data.oldAgeHomeId);
          reset({
            totOldAgeHome: response.data.totOldAgeHome,
            totOldAgeHomeSource:
              response.data.totOldAgeHomeSource[0] != "" &&
                response.data.totOldAgeHomeSource != ""
                ? response.data.totOldAgeHomeSource
                : null,
            maleCitizenReceivingServices:
              response.data.maleCitizenReceivingServices,
            femaleCitizenReceivingServices:
              response.data.femaleCitizenReceivingServices,
            othersCitizenReceivingServices:
              response.data.othersCitizenReceivingServices,
            dalitReceivingServices: response.data.dalitReceivingServices,
            ethnicMinoritiesReceivingServices:
              response.data.ethnicMinoritiesReceivingServices,
            janajatiReceivingServices:
              response.data.janajatiReceivingServices,
            madhesiReceivingServices: response.data.madhesiReceivingServices,
            brahminReceivingServices: response.data.brahminReceivingServices,
            muslimReceivingServices: response.data.muslimReceivingServices,
            othersEthnicityReceivingServices: response.data.othersEthnicityReceivingServices,
            citizenReceivingServicesSource:
              response.data.citizenReceivingServicesSource[0] != "" &&
                response.data.citizenReceivingServicesSource != ""
                ? response.data.citizenReceivingServicesSource
                : null,
            maleCitizenRehabilitated: response.data.maleCitizenRehabilitated,
            femaleCitizenRehabilitated:
              response.data.femaleCitizenRehabilitated,
            othersCitizenRehabilitated:
              response.data.othersCitizenRehabilitated,
            citizenRehabilitatedByHome:
              response.data.citizenRehabilitatedByHome,
            citizenRehabilitatedByRelatives:
              response.data.citizenRehabilitatedByRelatives,
            citizenRehabilitatedSource:
              response.data.citizenRehabilitatedSource[0] != "" &&
                response.data.citizenRehabilitatedSource != ""
                ? response.data.citizenRehabilitatedSource
                : null,
            budgetForOldAgeHome: response.data.budgetForOldAgeHome,
            budgetForOldAgeHomeSource:
              response.data.budgetForOldAgeHomeSource[0] != "" &&
                response.data.budgetForOldAgeHomeSource != ""
                ? response.data.budgetForOldAgeHomeSource
                : null,

            totOldAgeHomeSourceOthers: response.data.totOldAgeHomeSourceOthers,
            citizenReceivingServicesSourceOthers: response.data.citizenReceivingServicesSourceOthers,
            citizenRehabilitatedSourceOthers: response.data.citizenRehabilitatedSourceOthers,
            budgetForOldAgeHomeSourceOthers: response.data.budgetForOldAgeHomeSourceOthers,
          });
        } else {
          console.log("no data");
          reset({
            totOldAgeHomeSource: [],
            citizenReceivingServicesSource: [],
            citizenRehabilitatedSource: [],
            budgetForOldAgeHomeSource: [],
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
          <h4 className="p-pt-0">{t("oldAgeHomeIndicator")}</h4>
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
              history.push("/sims/old-age-home")
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
              history.push("/sims/old-age-home-list")
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
                    {t("totOldAgeHome")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totOldAgeHomeDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totOldAgeHome"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
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
                    name="totOldAgeHomeSource"
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
                        sourceOtherValue={getValues("totOldAgeHomeSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("totOldAgeHomeSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("totOldAgeHomeSource")}
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
                        {t("totSeniorCitReceivingServices")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("totSeniorCitReceivingServicesDesc")}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left sub-label">
                        {t("byGender")}
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="maleCitizenReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="femaleCitizenReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="othersCitizenReceivingServices"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="totalCitizenReceivingServices"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("maleCitizenReceivingServices") ? getValues("maleCitizenReceivingServices") : 0)
                                + (getValues("femaleCitizenReceivingServices") ? getValues("femaleCitizenReceivingServices") : 0)
                                + (getValues("othersCitizenReceivingServices") ? getValues("othersCitizenReceivingServices") : 0)}
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
                        name="citizenReceivingServicesSource"
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
                            sourceOtherValue={getValues("citizenReceivingServicesSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("citizenReceivingServicesSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("citizenReceivingServicesSource")}
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
                        {t("totSeniorCitRehabilitated")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("totSeniorCitRehabilitatedDesc")}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left sub-label">
                        {t("byGender")}
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="maleCitizenRehabilitated"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="femaleCitizenRehabilitated"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="othersCitizenRehabilitated"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="totalCitizenRehabilitated"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("maleCitizenRehabilitated") ? getValues("maleCitizenRehabilitated") : 0)
                                + (getValues("femaleCitizenRehabilitated") ? getValues("femaleCitizenRehabilitated") : 0)
                                + (getValues("othersCitizenRehabilitated") ? getValues("othersCitizenRehabilitated") : 0)}
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
                          name="citizenRehabilitatedByHome"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("ownHome")}
                              tooltip={t("ownHome")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="citizenRehabilitatedByRelatives"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              placeholder={t("relativeHome")}
                              tooltip={t("relativeHome")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="totCitizenRehabilitated"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("citizenRehabilitatedByHome") ? getValues("citizenRehabilitatedByHome") : 0)
                                + (getValues("citizenRehabilitatedByRelatives") ? getValues("citizenRehabilitatedByRelatives") : 0)}
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
                        name="citizenRehabilitatedSource"
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
                            sourceOtherValue={getValues("citizenRehabilitatedSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("citizenRehabilitatedSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("citizenRehabilitatedSource")}
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
                        {t("perBudgetForOldAgeHome")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("perBudgetForOldAgeHomeDesc")}
                        />
                      </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <div className="p-inputgroup">
                          <Controller
                            name="budgetForOldAgeHome"
                            control={control}
                            autoFocus
                            render={({ field, fieldState }) => (
                              <InputNumber
                                id={field.name}
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
                        </div>
                      </div>
                    </div>
                    <div class="p-col-12 p-md-3">
                      <Controller
                        name="budgetForOldAgeHomeSource"
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
                            sourceOtherValue={getValues("budgetForOldAgeHomeSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("budgetForOldAgeHomeSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("budgetForOldAgeHomeSource")}
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

export default OldAgeHomeIndicator;
