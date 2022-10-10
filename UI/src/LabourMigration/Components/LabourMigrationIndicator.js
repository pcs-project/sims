import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";

import FiscalYear from "../../utilities/components/FiscalYear";
import Source from "../../utilities/components/Source";

import LabourMigrationService from "../api/services/LabourMigrationService";
import Organization from "../../utilities/components/Organization";
import { t } from "i18next";

import { trackPromise } from "react-promise-tracker";
import UserService from "../../security/api/services/UserService";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import { useHistory } from "react-router";
import FiscalQuarter from "../../utilities/components/FiscalQuarter";

function LabourMigrationIndicator() {
  const history = useHistory();
  const [fiscalYear, setFiscalYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [labourMigrationId, setLabourMigrationId] = useState();

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
        LabourMigrationService.saveData(data).then((response) => {
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
      data.labourMigrationId = labourMigrationId;
      trackPromise(
        LabourMigrationService.updateData(data).then((response) => {
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
        LabourMigrationService.saveData(data).then((response) => {
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
      data.labourMigrationId = labourMigrationId;
      trackPromise(
        LabourMigrationService.updateData(data).then((response) => {
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
      LabourMigrationService.getListByFiscalYearAndQuarter(fiscalYear, quarter).then(
        (response) => {
          console.log("response", response.data);
          if (response.data) {
            setFiscalYear(response.data.fiscalYear);
            setQuarter(response.data.quarter);
            setLabourMigrationId(response.data.labourMigrationId);
            reset({
              internalMigrantLabour: response.data.internalMigrantLabour,
              externalMigrantLabour: response.data.externalMigrantLabour,
              maleMigrantLabour: response.data.maleMigrantLabour,
              femaleMigrantLabour: response.data.femaleMigrantLabour,
              otherMigrantLabour: response.data.otherMigrantLabour,
              dalitMigrantLabour: response.data.dalitMigrantLabour,
              ethnicMinoritiesMigrantLabour:
                response.data.ethnicMinoritiesMigrantLabour,
              janajatiMigrantLabour: response.data.janajatiMigrantLabour,
              madhesiMigrantLabour: response.data.madhesiMigrantLabour,
              brahminChettriMigrantLabour:
                response.data.brahminChettriMigrantLabour,
              othersEthnicityMigrantLabour:
                response.data.othersEthnicityMigrantLabour,
              migrantLabourSource:
                response.data.migrantLabourSource[0] != "" &&
                  response.data.migrantLabourSource != ""
                  ? response.data.migrantLabourSource
                  : null,
              maleMigrantToIndia: response.data.maleMigrantToIndia,
              femaleMigrantToIndia: response.data.femaleMigrantToIndia,
              otherMigrantToIndia: response.data.otherMigrantToIndia,
              dalitMigrantToIndia: response.data.dalitMigrantToIndia,
              ethnicMinoritiesMigrantToIndia:
                response.data.ethnicMinoritiesMigrantToIndia,
              janajatiMigrantToIndia: response.data.janajatiMigrantToIndia,
              madhesiMigrantToIndia: response.data.madhesiMigrantToIndia,
              brahminChettriMigrantToIndia:
                response.data.brahminChettriMigrantToIndia,
              othersEthnicityMigrantToIndia:
                response.data.othersEthnicityMigrantToIndia,
              migrantToIndiaSource:
                response.data.migrantToIndiaSource[0] != "" &&
                  response.data.migrantToIndiaSource != ""
                  ? response.data.migrantToIndiaSource
                  : null,
              maleReturneeMigrant: response.data.maleReturneeMigrant,
              femaleReturneeMigrant: response.data.femaleReturneeMigrant,
              otherReturneeMigrant: response.data.otherReturneeMigrant,
              dalitReturneeMigrant: response.data.dalitReturneeMigrant,
              ethnicMinoritiesReturneeMigrant:
                response.data.ethnicMinoritiesReturneeMigrant,
              janajatiReturneeMigrant: response.data.janajatiReturneeMigrant,
              madhesiReturneeMigrant: response.data.madhesiReturneeMigrant,
              brahminChettriReturneeMigrant:
                response.data.brahminChettriReturneeMigrant,
              othersEthnicityReturneeMigrant:
                response.data.othersEthnicityReturneeMigrant,
              returneeMigrantSource:
                response.data.returneeMigrantSource[0] != "" &&
                  response.data.returneeMigrantSource != ""
                  ? response.data.returneeMigrantSource
                  : null,

              muslimMigrantLabour: response.data.muslimMigrantLabour,
              muslimMigrantToIndia: response.data.muslimMigrantToIndia,
              muslimReturneeMigrant: response.data.muslimReturneeMigrant,

              migrantLabourSourceOthers: response.data.migrantLabourSourceOthers,
              migrantToIndiaSourceOthers: response.data.migrantToIndiaSourceOthers,
              returneeMigrantSourceOthers: response.data.returneeMigrantSourceOthers,
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
              migrantLabourSource: [],
              migrantToIndiaSource: [],
              returneeMigrantSource: [],
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
      LabourMigrationService.getListByOrganization(
        fiscalYear,
        quarter,
        organization
      ).then((response) => {
        console.log("response", response.data);
        if (response.data) {
          setFiscalYear(response.data.fiscalYear);
          setQuarter(response.data.quarter);
          setLabourMigrationId(response.data.labourMigrationId);
          reset({
            internalMigrantLabour: response.data.internalMigrantLabour,
            externalMigrantLabour: response.data.externalMigrantLabour,
            maleMigrantLabour: response.data.maleMigrantLabour,
            femaleMigrantLabour: response.data.femaleMigrantLabour,
            otherMigrantLabour: response.data.otherMigrantLabour,
            dalitMigrantLabour: response.data.dalitMigrantLabour,
            ethnicMinoritiesMigrantLabour:
              response.data.ethnicMinoritiesMigrantLabour,
            janajatiMigrantLabour: response.data.janajatiMigrantLabour,
            madhesiMigrantLabour: response.data.madhesiMigrantLabour,
            brahminChettriMigrantLabour:
              response.data.brahminChettriMigrantLabour,
            othersEthnicityMigrantLabour:
              response.data.othersEthnicityMigrantLabour,
            migrantLabourSource:
              response.data.migrantLabourSource[0] != "" &&
                response.data.migrantLabourSource != ""
                ? response.data.migrantLabourSource
                : null,
            maleMigrantToIndia: response.data.maleMigrantToIndia,
            femaleMigrantToIndia: response.data.femaleMigrantToIndia,
            otherMigrantToIndia: response.data.otherMigrantToIndia,
            dalitMigrantToIndia: response.data.dalitMigrantToIndia,
            ethnicMinoritiesMigrantToIndia:
              response.data.ethnicMinoritiesMigrantToIndia,
            janajatiMigrantToIndia: response.data.janajatiMigrantToIndia,
            madhesiMigrantToIndia: response.data.madhesiMigrantToIndia,
            brahminChettriMigrantToIndia:
              response.data.brahminChettriMigrantToIndia,
            othersEthnicityMigrantToIndia:
              response.data.othersEthnicityMigrantToIndia,
            migrantToIndiaSource:
              response.data.migrantToIndiaSource[0] != "" &&
                response.data.migrantToIndiaSource != ""
                ? response.data.migrantToIndiaSource
                : null,
            maleReturneeMigrant: response.data.maleReturneeMigrant,
            femaleReturneeMigrant: response.data.femaleReturneeMigrant,
            otherReturneeMigrant: response.data.otherReturneeMigrant,
            dalitReturneeMigrant: response.data.dalitReturneeMigrant,
            ethnicMinoritiesReturneeMigrant:
              response.data.ethnicMinoritiesReturneeMigrant,
            janajatiReturneeMigrant: response.data.janajatiReturneeMigrant,
            madhesiReturneeMigrant: response.data.madhesiReturneeMigrant,
            brahminChettriReturneeMigrant:
              response.data.brahminChettriReturneeMigrant,
            othersEthnicityReturneeMigrant:
              response.data.othersEthnicityReturneeMigrant,
            returneeMigrantSource:
              response.data.returneeMigrantSource[0] != "" &&
                response.data.returneeMigrantSource != ""
                ? response.data.returneeMigrantSource
                : null,

            muslimMigrantLabour: response.data.muslimMigrantLabour,
            muslimMigrantToIndia: response.data.muslimMigrantToIndia,
            muslimReturneeMigrant: response.data.muslimReturneeMigrant,

            migrantLabourSourceOthers: response.data.migrantLabourSourceOthers,
            migrantToIndiaSourceOthers: response.data.migrantToIndiaSourceOthers,
            returneeMigrantSourceOthers: response.data.returneeMigrantSourceOthers,
          });
        } else {
          console.log("no data");
          reset({
            migrantLabourSource: [],
            migrantToIndiaSource: [],
            returneeMigrantSource: [],
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
          <h4 className="p-pt-0">{t("labourMigration")}</h4>
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
              history.push("/sims/labour-migration")
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
              history.push("/sims/labour-migration-list")
            }
          />
        </div>
      </div>

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
              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("totMigrantLabour")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totMigrantLabourDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byCase")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="internalMigrantLabour"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("internal")}
                          tooltip={t("internal")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="externalMigrantLabour"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("external")}
                          tooltip={t("external")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totalMigrantLabour"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("internalMigrantLabour") ? getValues("internalMigrantLabour") : 0)
                            + (getValues("externalMigrantLabour") ? getValues("externalMigrantLabour") : 0)}
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
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleMigrantLabour"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="femaleMigrantLabour"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="otherMigrantLabour"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="totalAgeMigrantLabour"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("maleMigrantLabour") ? getValues("maleMigrantLabour") : 0)
                            + (getValues("femaleMigrantLabour") ? getValues("femaleMigrantLabour") : 0)
                            + (getValues("otherMigrantLabour") ? getValues("otherMigrantLabour") : 0)}
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
                      name="dalitMigrantLabour"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="muslimMigrantLabour"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="janajatiMigrantLabour"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="madhesiMigrantLabour"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="brahminChettriMigrantLabour"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="ethnicMinoritiesMigrantLabour"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="othersEthnicityMigrantLabour"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="totEthnicityMigrantLabour"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitMigrantLabour") ? getValues("dalitMigrantLabour") : 0)
                            + (getValues("muslimMigrantLabour") ? getValues("muslimMigrantLabour") : 0)
                            + (getValues("janajatiMigrantLabour") ? getValues("janajatiMigrantLabour") : 0)
                            + (getValues("madhesiMigrantLabour") ? getValues("madhesiMigrantLabour") : 0)
                            + (getValues("brahminChettriMigrantLabour") ? getValues("brahminChettriMigrantLabour") : 0)
                            + (getValues("ethnicMinoritiesMigrantLabour") ? getValues("ethnicMinoritiesMigrantLabour") : 0)
                            + (getValues("othersEthnicityMigrantLabour") ? getValues("othersEthnicityMigrantLabour") : 0)}
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
                    name="migrantLabourSource"
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
                        sourceOtherValue={getValues("migrantLabourSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("migrantLabourSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("migrantLabourSource")}
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
                    {t("totMigrantLabourToIndia")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totMigrantLabourToIndiaDesc")}
                    />
                  </div>

                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleMigrantToIndia"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="femaleMigrantToIndia"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="otherMigrantToIndia"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="totalMigrantToIndia"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("maleMigrantToIndia") ? getValues("maleMigrantToIndia") : 0)
                            + (getValues("femaleMigrantToIndia") ? getValues("femaleMigrantToIndia") : 0)
                            + (getValues("otherMigrantToIndia") ? getValues("otherMigrantToIndia") : 0)}
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
                      name="dalitMigrantToIndia"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="muslimMigrantToIndia"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="janajatiMigrantToIndia"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="madhesiMigrantToIndia"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="brahminChettriMigrantToIndia"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="ethnicMinoritiesMigrantToIndia"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="othersEthnicityMigrantToIndia"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="totEthnicityMigrantToIndia"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitMigrantToIndia") ? getValues("dalitMigrantToIndia") : 0)
                            + (getValues("muslimMigrantToIndia") ? getValues("muslimMigrantToIndia") : 0)
                            + (getValues("janajatiMigrantToIndia") ? getValues("janajatiMigrantToIndia") : 0)
                            + (getValues("madhesiMigrantToIndia") ? getValues("madhesiMigrantToIndia") : 0)
                            + (getValues("brahminChettriMigrantToIndia") ? getValues("brahminChettriMigrantToIndia") : 0)
                            + (getValues("ethnicMinoritiesMigrantToIndia") ? getValues("ethnicMinoritiesMigrantToIndia") : 0)
                            + (getValues("othersEthnicityMigrantToIndia") ? getValues("othersEthnicityMigrantToIndia") : 0)}
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
                    name="migrantToIndiaSource"
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
                        sourceOtherValue={getValues("migrantToIndiaSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("migrantToIndiaSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("migrantToIndiaSource")}
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
                    {t("totReturneeMigrant")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totReturneeMigrantDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleReturneeMigrant"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="femaleReturneeMigrant"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="otherReturneeMigrant"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="totalReturneeMigrant"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("maleReturneeMigrant") ? getValues("maleReturneeMigrant") : 0)
                            + (getValues("femaleReturneeMigrant") ? getValues("femaleReturneeMigrant") : 0)
                            + (getValues("otherReturneeMigrant") ? getValues("otherReturneeMigrant") : 0)}
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
                      name="dalitReturneeMigrant"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="muslimReturneeMigrant"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="janajatiReturneeMigrant"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="madhesiReturneeMigrant"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="brahminChettriReturneeMigrant"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="ethnicMinoritiesReturneeMigrant"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="othersEthnicityReturneeMigrant"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="totEthnicityReturneeMigrant"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitReturneeMigrant") ? getValues("dalitReturneeMigrant") : 0)
                            + (getValues("muslimReturneeMigrant") ? getValues("muslimReturneeMigrant") : 0)
                            + (getValues("janajatiReturneeMigrant") ? getValues("janajatiReturneeMigrant") : 0)
                            + (getValues("madhesiReturneeMigrant") ? getValues("madhesiReturneeMigrant") : 0)
                            + (getValues("brahminChettriReturneeMigrant") ? getValues("brahminChettriReturneeMigrant") : 0)
                            + (getValues("ethnicMinoritiesReturneeMigrant") ? getValues("ethnicMinoritiesReturneeMigrant") : 0)
                            + (getValues("othersEthnicityReturneeMigrant") ? getValues("othersEthnicityReturneeMigrant") : 0)}
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
                    name="returneeMigrantSource"
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
                        sourceOtherValue={getValues("returneeMigrantSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("returneeMigrantSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("returneeMigrantSource")}
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

export default LabourMigrationIndicator;
