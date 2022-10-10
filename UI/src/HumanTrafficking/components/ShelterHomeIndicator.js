import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";

import FiscalQuarter from "../../utilities/components/FiscalQuarter";
import Source from "../../utilities/components/Source";

import ShelterHomeService from "../api/services/ShelterHomeService";
import OrganizationService from "../../security/api/services/OrganizationService";
import Organization from "../../utilities/components/Organization";
import { trackPromise } from "react-promise-tracker";
import { useTranslation } from "react-i18next";
import UserService from "../../security/api/services/UserService";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import { useHistory } from "react-router";
function ShelterHomeIndicator() {
  const { t } = useTranslation();
  const history = useHistory();

  const [fiscalYear, setFiscalYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [shelterHomeId, setShelterHomeId] = useState();

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

    if (update == "No") {
      //trackPromise is used for loading
      trackPromise(
        ShelterHomeService.saveData(data).then((response) => {
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
      data.shelterHomeId = shelterHomeId;
      trackPromise(
        ShelterHomeService.updateData(data).then((response) => {
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
        ShelterHomeService.saveData(data).then((response) => {
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
      data.shelterHomeId = shelterHomeId;
      trackPromise(
        ShelterHomeService.updateData(data).then((response) => {
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
    console.log("called here");
    trackPromise(
      ShelterHomeService.getListByFiscalYearAndQuarter(
        fiscalYear,
        quarter
      ).then((response) => {
        console.log("response", response.data);
        if (response.data) {
          setFiscalYear(response.data.fiscalYear);
          setQuarter(response.data.quarter);
          setShelterHomeId(response.data.shelterHomeId);
          reset({
            totShelterHome: response.data.totShelterHome,
            totShelterHomeSource:
              response.data.totShelterHomeSource[0] != "" &&
                response.data.totShelterHomeSource != ""
                ? response.data.totShelterHomeSource
                : null,
            // maleTipSurvivors: response.data.maleTipSurvivors,
            // femaleTipSurvivors: response.data.femaleTipSurvivors,
            // rescuedTipSurvivors: response.data.rescuedTipSurvivors,
            // suspectedTipSurvivors: response.data.suspectedTipSurvivors,
            // interceptedTipSurvivors: response.data.interceptedTipSurvivors,
            //   maleTipSurvivorsRescued: response.data.maleTipSurvivorsRescued,
            femaleTipSurvivorsRescued: response.data.femaleTipSurvivorsRescued,
            othersTipSurvivorsRescued: response.data.othersTipSurvivorsRescued,
            //   maleTipSurvivorsSuspected: response.data.maleTipSurvivorsSuspected,
            femaleTipSurvivorsSuspected:
              response.data.femaleTipSurvivorsSuspected,
            othersTipSurvivorsSuspected:
              response.data.othersTipSurvivorsSuspected,
            //   maleTipSurvivorsIntercepted: response.data.maleTipSurvivorsIntercepted,
            femaleTipSurvivorsIntercepted:
              response.data.femaleTipSurvivorsIntercepted,
            othersTipSurvivorsIntercepted:
              response.data.othersTipSurvivorsIntercepted,
            tipSurvivorsSource:
              response.data.tipSurvivorsSource[0] != "" &&
                response.data.tipSurvivorsSource != ""
                ? response.data.tipSurvivorsSource
                : null,
            // maleTipVictims: response.data.maleTipVictims,
            // femaleTipVictims: response.data.femaleTipVictims,
            // rescuedTipVictims: response.data.rescuedTipVictims,
            // suspectedTipVictims: response.data.suspectedTipVictims,
            // interceptedTipVictims: response.data.interceptedTipVictims,
            //  maleTipVictimsRescued: response.data.maleTipVictimsRescued,
            femaleTipVictimsRescued: response.data.femaleTipVictimsRescued,
            othersTipVictimsRescued: response.data.othersTipVictimsRescued,
            //   maleTipVictimsSuspected: response.data.maleTipVictimsSuspected,
            femaleTipVictimsSuspected: response.data.femaleTipVictimsSuspected,
            othersTipVictimsSuspected: response.data.othersTipVictimsSuspected,
            //   maleTipVictimsIntercepted: response.data.maleTipVictimsIntercepted,
            femaleTipVictimsIntercepted:
              response.data.femaleTipVictimsIntercepted,
            othersTipVictimsIntercepted:
              response.data.othersTipVictimsIntercepted,
            tipVictimsSource:
              response.data.tipVictimsSource[0] != "" &&
                response.data.tipVictimsSource != ""
                ? response.data.tipVictimsSource
                : null,
            totShelterHomeSourceOthers: response.data.totShelterHomeSourceOthers,
            tipSurvivorsSourceOthers: response.data.tipSurvivorsSourceOthers,
            tipVictimsSourceOthers: response.data.tipVictimsSourceOthers,
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
            totShelterHomeSource: [],
            tipSurvivorsSource: [],
            tipVictimsSource: [],
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
    console.log("called here");
    trackPromise(
      ShelterHomeService.getListByOrganization(
        fiscalYear,
        quarter,
        organization
      ).then((response) => {
        console.log("response", response.data);
        if (response.data) {
          setFiscalYear(response.data.fiscalYear);
          setQuarter(response.data.quarter);
          setShelterHomeId(response.data.shelterHomeId);
          reset({
            totShelterHome: response.data.totShelterHome,
            totShelterHomeSource:
              response.data.totShelterHomeSource[0] != "" &&
                response.data.totShelterHomeSource != ""
                ? response.data.totShelterHomeSource
                : null,
            // maleTipSurvivors: response.data.maleTipSurvivors,
            // femaleTipSurvivors: response.data.femaleTipSurvivors,
            // rescuedTipSurvivors: response.data.rescuedTipSurvivors,
            // suspectedTipSurvivors: response.data.suspectedTipSurvivors,
            // interceptedTipSurvivors: response.data.interceptedTipSurvivors,
            //   maleTipSurvivorsRescued: response.data.maleTipSurvivorsRescued,
            femaleTipSurvivorsRescued: response.data.femaleTipSurvivorsRescued,
            othersTipSurvivorsRescued: response.data.othersTipSurvivorsRescued,
            //    maleTipSurvivorsSuspected: response.data.maleTipSurvivorsSuspected,
            femaleTipSurvivorsSuspected:
              response.data.femaleTipSurvivorsSuspected,
            othersTipSurvivorsSuspected:
              response.data.othersTipSurvivorsSuspected,
            //  maleTipSurvivorsIntercepted: response.data.maleTipSurvivorsIntercepted,
            femaleTipSurvivorsIntercepted:
              response.data.femaleTipSurvivorsIntercepted,
            othersTipSurvivorsIntercepted:
              response.data.othersTipSurvivorsIntercepted,
            tipSurvivorsSource:
              response.data.tipSurvivorsSource[0] != "" &&
                response.data.tipSurvivorsSource != ""
                ? response.data.tipSurvivorsSource
                : null,
            // maleTipVictims: response.data.maleTipVictims,
            // femaleTipVictims: response.data.femaleTipVictims,
            // rescuedTipVictims: response.data.rescuedTipVictims,
            // suspectedTipVictims: response.data.suspectedTipVictims,
            // interceptedTipVictims: response.data.interceptedTipVictims,

            //   maleTipVictimsRescued: response.data.maleTipVictimsRescued,
            femaleTipVictimsRescued: response.data.femaleTipVictimsRescued,
            othersTipVictimsRescued: response.data.othersTipVictimsRescued,
            //  maleTipVictimsSuspected: response.data.maleTipVictimsSuspected,
            femaleTipVictimsSuspected: response.data.femaleTipVictimsSuspected,
            othersTipVictimsSuspected: response.data.othersTipVictimsSuspected,
            //  maleTipVictimsIntercepted: response.data.maleTipVictimsIntercepted,
            femaleTipVictimsIntercepted:
              response.data.femaleTipVictimsIntercepted,
            othersTipVictimsIntercepted:
              response.data.othersTipVictimsIntercepted,
            tipVictimsSource:
              response.data.tipVictimsSource[0] != "" &&
                response.data.tipVictimsSource != ""
                ? response.data.tipVictimsSource
                : null,
            totShelterHomeSourceOthers: response.data.totShelterHomeSourceOthers,
            tipSurvivorsSourceOthers: response.data.tipSurvivorsSourceOthers,
            tipVictimsSourceOthers: response.data.tipVictimsSourceOthers,
          });
        } else {
          console.log("no data");
          reset({
            totShelterHomeSource: [],
            tipSurvivorsSource: [],
            tipVictimsSource: [],
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
          <h4 className="p-pt-0">{t("shelterHomeSewaKendra")}</h4>
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
            onClick={() =>
              history.push("/sims/shelter-home")
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
              history.push("/sims/shelter-home-list")
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
                    {t("totShelterHome")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totShelterHomeDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totShelterHome"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
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
                    name="totShelterHomeSource"
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
                        sourceOtherValue={getValues("totShelterHomeSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("totShelterHomeSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("totShelterHomeSource")}
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
                        {t("totSurvivorsShelterHome")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("totSurvivorsShelterHomeDesc")}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left sub-label">
                        {t("rescued")}
                      </div>
                      {/* <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleTipSurvivorsRescued"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                  </div> */}
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="femaleTipSurvivorsRescued"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="othersTipSurvivorsRescued"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="totalTipSurvivorsRescued"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("femaleTipSurvivorsRescued") ? getValues("femaleTipSurvivorsRescued") : 0)
                                + (getValues("othersTipSurvivorsRescued") ? getValues("othersTipSurvivorsRescued") : 0)}
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
                        {t("suspected")}
                      </div>
                      {/* <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleTipSurvivorsSuspected"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                  </div> */}
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="femaleTipSurvivorsSuspected"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="othersTipSurvivorsSuspected"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="totalTipSurvivorsSuspected"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("femaleTipSurvivorsSuspected") ? getValues("femaleTipSurvivorsSuspected") : 0)
                                + (getValues("othersTipSurvivorsSuspected") ? getValues("othersTipSurvivorsSuspected") : 0)}
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
                        {t("intercepted")}
                      </div>
                      {/* <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleTipSurvivorsIntercepted"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                  </div> */}
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="femaleTipSurvivorsIntercepted"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="othersTipSurvivorsIntercepted"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="totalTipSurvivorsIntercepted"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("femaleTipSurvivorsIntercepted") ? getValues("femaleTipSurvivorsIntercepted") : 0)
                                + (getValues("othersTipSurvivorsIntercepted") ? getValues("othersTipSurvivorsIntercepted") : 0)}
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
                        name="tipSurvivorsSource"
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
                            sourceOtherValue={getValues("tipSurvivorsSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("tipSurvivorsSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("tipSurvivorsSource")}
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
                        {t("totTIPVictims")}
                        <i
                          className="pi pi-question-circle tooltip-style"
                          title={t("totTIPVictimsDesc")}
                        />
                      </div>
                      <div className="p-field p-col-12 p-md-12 float-left sub-label">
                        {t("rescued")}
                      </div>
                      {/* <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleTipVictimsRescued"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                  </div> */}
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="femaleTipVictimsRescued"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="othersTipVictimsRescued"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="totalTipVictimsRescued"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("femaleTipVictimsRescued") ? getValues("femaleTipVictimsRescued") : 0)
                                + (getValues("othersTipVictimsRescued") ? getValues("othersTipVictimsRescued") : 0)}
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
                        {t("suspected")}
                      </div>
                      {/* <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleTipVictimsSuspected"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                  </div> */}
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="femaleTipVictimsSuspected"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="othersTipVictimsSuspected"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="totalTipVictimsSuspected"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("femaleTipVictimsSuspected") ? getValues("femaleTipVictimsSuspected") : 0)
                                + (getValues("othersTipVictimsSuspected") ? getValues("othersTipVictimsSuspected") : 0)}
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
                        {t("intercepted")}
                      </div>
                      {/* <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleTipVictimsIntercepted"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                  </div> */}
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          name="femaleTipVictimsIntercepted"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="othersTipVictimsIntercepted"
                          control={control}
                          autoFocus
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
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
                          name="totalTipVictimsIntercepted"
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("femaleTipVictimsIntercepted") ? getValues("femaleTipVictimsIntercepted") : 0)
                                + (getValues("othersTipVictimsIntercepted") ? getValues("othersTipVictimsIntercepted") : 0)}
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
                        name="tipVictimsSource"
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
                            sourceOtherValue={getValues("tipVictimsSourceOthers")}
                            handleSourceOtherState={(e) => {
                              setValue("tipVictimsSourceOthers", e);
                            }}
                          />
                        )}
                        defaultValue={[]}
                      />
                      <div class="p-col-12 p-md-12">
                        {getFormErrorMessage("tipVictimsSource")}
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

export default ShelterHomeIndicator;
