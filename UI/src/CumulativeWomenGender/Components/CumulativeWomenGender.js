import React, { useState, useRef, useEffect, useCallback } from "react";
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

import WomenAndMinoritiesService from "../api/services/WomenAndMinoritiesService";
import OrganizationService from "../../security/api/services/OrganizationService";
import Organization from "../../utilities/components/Organization";
import UserService from "../../security/api/services/UserService";

import { trackPromise } from "react-promise-tracker";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import FiscalQuarter from "../../utilities/components/FiscalQuarter";

function WomenGenderAndSexualMinorities() {
  //for English and Nepali localization
  const { t } = useTranslation();

  const [fiscalYear, setFiscalYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [womenAndMinoritiesId, setWomenAndMinoritiesId] = useState();
  const [organization, setOrganization] = useState("");
  const [organizationList, setOrganizationList] = useState([]);

  const [update, setUpdate] = useState("No");
  const [showBtn, setShowBtn] = useState("Yes");
  const [hideBtn, setHideBtn] = useState("No");
  const [enableForm, setEnableForm] = useState(true);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
    trigger
  } = useForm({});
  const toast = useRef(null);

  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  useEffect(() => {
    //To check whether the logged in user's role is local level or others
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
      console.log("saveData no update");
      //trackPromise is used for loading
      trackPromise(
        WomenAndMinoritiesService.saveData(data).then((response) => {
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
      console.log("saveData yes update");
      data.womenAndMinoritiesId = womenAndMinoritiesId;
      console.log("data ", data);
      trackPromise(
        WomenAndMinoritiesService.updateData(data).then((response) => {
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
      console.log("submitData no update");
      //trackPromise is used for loading
      trackPromise(
        WomenAndMinoritiesService.saveData(data).then((response) => {
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
      data.womenAndMinoritiesId = womenAndMinoritiesId;
      console.log("submitData ys update");
      console.log("submitData data", data);
      trackPromise(
        WomenAndMinoritiesService.updateData(data).then((response) => {
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

  //to get data of particular fiscal year(for user with local level role)
  const getListByFiscalYearAndQuarter = (fiscalYear, quarter) => {
    trackPromise(
      WomenAndMinoritiesService.getListByFiscalYearAndQuarter(fiscalYear, quarter).then(
        (response) => {
          console.log("response", response.data);
          if (response.data) {
            setFiscalYear(response.data.fiscalYear);
            setQuarter(response.data.quarter);
            setWomenAndMinoritiesId(response.data.womenAndMinoritiesId);
            //To set all response data in their particular fields
            reset({
              womenDalitPop: response.data.womenDalitPop,
              womenMinoritiesPop: response.data.womenMinoritiesPop,
              womenJanjatiPop: response.data.womenJanjatiPop,
              womenMadhesiPop: response.data.womenMadhesiPop,
              womenBrahminPop: response.data.womenBrahminPop,
              womenMuslimPop: response.data.womenMuslimPop,
              womenOthersPop: response.data.womenOthersPop,
              womenPopSource:
                response.data.womenPopSource[0] != "" &&
                  response.data.womenPopSource != ""
                  ? response.data.womenPopSource
                  : null,
              girlsDalitPop: response.data.girlsDalitPop,
              girlsMinoritiesPop: response.data.girlsMinoritiesPop,
              girlsJanjatiPop: response.data.girlsJanjatiPop,
              girlsMadhesiPop: response.data.girlsMadhesiPop,
              girlsBrahminPop: response.data.girlsBrahminPop,
              girlsMuslimPop: response.data.girlsMuslimPop,
              girlsOthersPop: response.data.girlsOthersPop,
              girlsPopSource:
                response.data.girlsPopSource[0] != "" &&
                  response.data.girlsPopSource != ""
                  ? response.data.girlsPopSource
                  : null,
              singledWomen: response.data.singledWomen,
              divorceeWomen: response.data.divorceeWomen,
              widowedWomen: response.data.widowedWomen,
              separatedWomen: response.data.separatedWomen,
              othersSingleWomen: response.data.othersSingleWomen,
              singleWomenSource:
                response.data.singleWomenSource[0] != "" &&
                  response.data.singleWomenSource != ""
                  ? response.data.singleWomenSource
                  : null,
              sexualGenderMinorities: response.data.sexualGenderMinorities,
              sexualGenderMinoritiesSource:
                response.data.sexualGenderMinoritiesSource[0] != "" &&
                  response.data.sexualGenderMinoritiesSource != ""
                  ? response.data.sexualGenderMinoritiesSource
                  : null,
              womenLiteracyRate: response.data.womenLiteracyRate,
              womenLiteracyRateSource:
                response.data.womenLiteracyRateSource[0] != "" &&
                  response.data.womenLiteracyRateSource != ""
                  ? response.data.womenLiteracyRateSource
                  : null,
              electedWomenRep: response.data.electedWomenRep,
              electedWomenRepSource:
                response.data.electedWomenRepSource[0] != "" &&
                  response.data.electedWomenRepSource != ""
                  ? response.data.electedWomenRepSource
                  : null,
              singledWomenRecSpa: response.data.singledWomenRecSpa,
              divorceeWomenRecSpa: response.data.divorceeWomenRecSpa,
              widowedWomenRecSpa: response.data.widowedWomenRecSpa,
              separatedWomenRecSpa: response.data.separatedWomenRecSpa,
              othersSingleWomenRecSpa: response.data.othersSingleWomenRecSpa,
              womenRecSpaSource:
                response.data.womenRecSpaSource[0] != "" &&
                  response.data.womenRecSpaSource != ""
                  ? response.data.womenRecSpaSource
                  : null,
              regGbvIncidents: response.data.regGbvIncidents,
              regGbvIncidentsSource:
                response.data.regGbvIncidentsSource[0] != "" &&
                  response.data.regGbvIncidentsSource != ""
                  ? response.data.regGbvIncidentsSource
                  : null,
              missingWomen: response.data.missingWomen,
              missingWomenSource:
                response.data.missingWomenSource[0] != "" &&
                  response.data.missingWomenSource != ""
                  ? response.data.missingWomenSource
                  : null,
              absenteeWomen: response.data.absenteeWomen,
              absenteeWomenSource:
                response.data.absenteeWomenSource[0] != "" &&
                  response.data.absenteeWomenSource != ""
                  ? response.data.absenteeWomenSource
                  : null,
              womenAffectedByCalamities:
                response.data.womenAffectedByCalamities,
              womenAffectedByCalamitiesSource:
                response.data.womenAffectedByCalamitiesSource[0] != "" &&
                  response.data.womenAffectedByCalamitiesSource != ""
                  ? response.data.womenAffectedByCalamitiesSource
                  : null,

              womenPopSourceOthers: response.data.womenPopSourceOthers,
              girlsPopSourceOthers: response.data.girlsPopSourceOthers,
              singleWomenSourceOthers: response.data.singleWomenSourceOthers,
              sexualGenderMinoritiesSourceOthers: response.data.sexualGenderMinoritiesSourceOthers,
              womenLiteracyRateSourceOthers: response.data.womenLiteracyRateSourceOthers,
              electedWomenRepSourceOthers: response.data.electedWomenRepSourceOthers,
              womenRecSpaSourceOthers: response.data.womenRecSpaSourceOthers,
              regGbvIncidentsSourceOthers: response.data.regGbvIncidentsSourceOthers,
              missingWomenSourceOthers: response.data.missingWomenSourceOthers,
              absenteeWomenSourceOthers: response.data.absenteeWomenSourceOthers,
              womenAffectedByCalamitiesSourceOthers: response.data.womenAffectedByCalamitiesSourceOthers
            });
            setUpdate("Yes");
            if (response.data.status === "Submit") {
              setShowBtn("No");
            } else {
              setShowBtn("Yes");
            }
          } else {
            console.log("no data");
            //To reset field's value if there is no response
            reset({
              womenPopSource: [],
              girlsPopSource: [],
              singleWomenSource: [],
              sexualGenderMinoritiesSource: [],
              womenLiteracyRateSource: [],
              electedWomenRepSource: [],
              womenRecSpaSource: [],
              regGbvIncidentsSource: [],
              missingWomenSource: [],
              absenteeWomenSource: [],
              womenAffectedByCalamitiesSource: [],
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

  //To get data of particular fiscal year and organization selected(for user with role other than local level)
  const getListByOrganization = (fiscalYear, quarter, organization) => {
    trackPromise(
      WomenAndMinoritiesService.getListByOrganization(
        fiscalYear,
        quarter,
        organization
      ).then((response) => {
        console.log("response", response.data);
        if (response.data) {
          setFiscalYear(response.data.fiscalYear);
          setQuarter(response.data.quarter);
          setWomenAndMinoritiesId(response.data.womenAndMinoritiesId);
          reset({
            womenDalitPop: response.data.womenDalitPop,
            womenMinoritiesPop: response.data.womenMinoritiesPop,
            womenJanjatiPop: response.data.womenJanjatiPop,
            womenMadhesiPop: response.data.womenMadhesiPop,
            womenBrahminPop: response.data.womenBrahminPop,
            womenMuslimPop: response.data.womenMuslimPop,
            womenOthersPop: response.data.womenOthersPop,
            womenPopSource:
              response.data.womenPopSource[0] != "" &&
                response.data.womenPopSource != ""
                ? response.data.womenPopSource
                : null,
            womenPopSourceOthers: response.data.womenPopSourceOthers,
            girlsDalitPop: response.data.girlsDalitPop,
            girlsMinoritiesPop: response.data.girlsMinoritiesPop,
            girlsJanjatiPop: response.data.girlsJanjatiPop,
            girlsMadhesiPop: response.data.girlsMadhesiPop,
            girlsBrahminPop: response.data.girlsBrahminPop,
            girlsMuslimPop: response.data.girlsMuslimPop,
            girlsOthersPop: response.data.girlsOthersPop,
            girlsPopSource:
              response.data.girlsPopSource[0] != "" &&
                response.data.girlsPopSource != ""
                ? response.data.girlsPopSource
                : null,
            singledWomen: response.data.singledWomen,
            divorceeWomen: response.data.divorceeWomen,
            widowedWomen: response.data.widowedWomen,
            separatedWomen: response.data.separatedWomen,
            othersSingleWomen: response.data.othersSingleWomen,
            singleWomenSource:
              response.data.singleWomenSource[0] != "" &&
                response.data.singleWomenSource != ""
                ? response.data.singleWomenSource
                : null,
            sexualGenderMinorities: response.data.sexualGenderMinorities,
            sexualGenderMinoritiesSource:
              response.data.sexualGenderMinoritiesSource[0] != "" &&
                response.data.sexualGenderMinoritiesSource != ""
                ? response.data.sexualGenderMinoritiesSource
                : null,
            womenLiteracyRate: response.data.womenLiteracyRate,
            womenLiteracyRateSource:
              response.data.womenLiteracyRateSource[0] != "" &&
                response.data.womenLiteracyRateSource != ""
                ? response.data.womenLiteracyRateSource
                : null,
            electedWomenRep: response.data.electedWomenRep,
            electedWomenRepSource:
              response.data.electedWomenRepSource[0] != "" &&
                response.data.electedWomenRepSource != ""
                ? response.data.electedWomenRepSource
                : null,
            singledWomenRecSpa: response.data.singledWomenRecSpa,
            divorceeWomenRecSpa: response.data.divorceeWomenRecSpa,
            widowedWomenRecSpa: response.data.widowedWomenRecSpa,
            separatedWomenRecSpa: response.data.separatedWomenRecSpa,
            othersSingleWomenRecSpa: response.data.othersSingleWomenRecSpa,
            womenRecSpaSource:
              response.data.womenRecSpaSource[0] != "" &&
                response.data.womenRecSpaSource != ""
                ? response.data.womenRecSpaSource
                : null,
            regGbvIncidents: response.data.regGbvIncidents,
            regGbvIncidentsSource:
              response.data.regGbvIncidentsSource[0] != "" &&
                response.data.regGbvIncidentsSource != ""
                ? response.data.regGbvIncidentsSource
                : null,
            missingWomen: response.data.missingWomen,
            missingWomenSource:
              response.data.missingWomenSource[0] != "" &&
                response.data.missingWomenSource != ""
                ? response.data.missingWomenSource
                : null,
            absenteeWomen: response.data.absenteeWomen,
            absenteeWomenSource:
              response.data.absenteeWomenSource[0] != "" &&
                response.data.absenteeWomenSource != ""
                ? response.data.absenteeWomenSource
                : null,
            womenAffectedByCalamities:
              response.data.womenAffectedByCalamities,
            womenAffectedByCalamitiesSource:
              response.data.womenAffectedByCalamitiesSource[0] != "" &&
                response.data.womenAffectedByCalamitiesSource != ""
                ? response.data.womenAffectedByCalamitiesSource
                : null,

            womenPopSourceOthers: response.data.womenPopSourceOthers,
            girlsPopSourceOthers: response.data.girlsPopSourceOthers,
            singleWomenSourceOthers: response.data.singleWomenSourceOthers,
            sexualGenderMinoritiesSourceOthers: response.data.sexualGenderMinoritiesSourceOthers,
            womenLiteracyRateSourceOthers: response.data.womenLiteracyRateSourceOthers,
            electedWomenRepSourceOthers: response.data.electedWomenRepSourceOthers,
            womenRecSpaSourceOthers: response.data.womenRecSpaSourceOthers,
            regGbvIncidentsSourceOthers: response.data.regGbvIncidentsSourceOthers,
            missingWomenSourceOthers: response.data.missingWomenSourceOthers,
            absenteeWomenSourceOthers: response.data.absenteeWomenSourceOthers,
            womenAffectedByCalamitiesSourceOthers: response.data.womenAffectedByCalamitiesSourceOthers
          });
        } else {
          console.log("no data");
          reset({
            womenPopSource: [],
            girlsPopSource: [],
            singleWomenSource: [],
            sexualGenderMinoritiesSource: [],
            womenLiteracyRateSource: [],
            electedWomenRepSource: [],
            womenRecSpaSource: [],
            regGbvIncidentsSource: [],
            missingWomenSource: [],
            absenteeWomenSource: [],
            womenAffectedByCalamitiesSource: [],
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
          <h4 className="p-pt-0">{t("Women and Minorities")}</h4>
        </div>
      </Card>
      <Card className="p-mt-0"
      // style={{ height: "72vh", overflowY: "auto" }}
      >
        <div className=" p-card-content">
          <form className="p-grid p-fluid " autoComplete="off">
            <Organization submitOrganizationId={handleOrganization} />
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

            {/* <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 ">
                <h4 className="HeadingTitle" style={{}}>
                  {t("generalInfoForm")}
                </h4>
              </div>
            </div> */}
            <div className="main-form" onClick={fiscalYearValidation} disabled={enableForm}>
              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("totalWomenPopulation")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totalWomenPopulationDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="womenDalitPop"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                          min="0"
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="womenMuslimPop"
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
                      name="womenJanjatiPop"
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
                      name="womenMadhesiPop"
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
                      name="womenBrahminPop"
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
                      name="womenMinoritiesPop"
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
                      name="womenOthersPop"
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
                      name="womenPopTot"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("womenDalitPop") ? getValues("womenDalitPop") : 0)
                            + (getValues("womenMuslimPop") ? getValues("womenMuslimPop") : 0)
                            + (getValues("womenJanjatiPop") ? getValues("womenJanjatiPop") : 0)
                            + (getValues("womenMadhesiPop") ? getValues("womenMadhesiPop") : 0)
                            + (getValues("womenBrahminPop") ? getValues("womenBrahminPop") : 0)
                            + (getValues("womenMinoritiesPop") ? getValues("womenMinoritiesPop") : 0)
                            + (getValues("womenOthersPop") ? getValues("womenOthersPop") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          placeholder={t("total")}
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
                    name="womenPopSource"
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
                        sourceOtherValue={getValues("womenPopSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("womenPopSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("womenPopSource")}
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
                    {t("totalGirlsPopulation")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totalGirlsPopulationDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="girlsDalitPop"
                      control={control}
                      autoFocus
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
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
                      name="girlsMuslimPop"
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
                      name="girlsJanjatiPop"
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
                      name="girlsMadhesiPop"
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
                      name="girlsBrahminPop"
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
                      name="girlsMinoritiesPop"
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
                      name="girlsOthersPop"
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
                      name="girlsPopTot"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("girlsDalitPop") ? getValues("girlsDalitPop") : 0)
                            + (getValues("girlsMuslimPop") ? getValues("girlsMuslimPop") : 0)
                            + (getValues("girlsJanjatiPop") ? getValues("girlsJanjatiPop") : 0)
                            + (getValues("girlsMadhesiPop") ? getValues("girlsMadhesiPop") : 0)
                            + (getValues("girlsBrahminPop") ? getValues("girlsBrahminPop") : 0)
                            + (getValues("girlsMinoritiesPop") ? getValues("girlsMinoritiesPop") : 0)
                            + (getValues("girlsOthersPop") ? getValues("girlsOthersPop") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          placeholder={t("total")}
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
                    name="girlsPopSource"
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
                        sourceOtherValue={getValues("girlsPopSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("girlsPopSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("girlsPopSource")}
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
                    {t("totalSingleWomen")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totalSingleWomenDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byCase")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="singledWomen"
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
                          placeholder={t("unmarried")}
                          tooltip={t("unmarried")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="divorceeWomen"
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
                          placeholder={t("divorcee")}
                          tooltip={t("divorcee")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="widowedWomen"
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
                          placeholder={t("widow")}
                          tooltip={t("widow")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="separatedWomen"
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
                          placeholder={t("separated")}
                          tooltip={t("separated")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersSingleWomen"
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
                      name="singleWomenTot"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("singledWomen") ? getValues("singledWomen") : 0)
                            + (getValues("divorceeWomen") ? getValues("divorceeWomen") : 0)
                            + (getValues("widowedWomen") ? getValues("widowedWomen") : 0)
                            + (getValues("separatedWomen") ? getValues("separatedWomen") : 0)
                            + (getValues("othersSingleWomen") ? getValues("othersSingleWomen") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          placeholder={t("total")}
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
                    name="singleWomenSource"
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
                        sourceOtherValue={getValues("singleWomenSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("singleWomenSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("singleWomenSource")}
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
                    {t("totSexualGenderMinorities")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totSexualGenderMinoritiesDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="sexualGenderMinorities"
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
                    name="sexualGenderMinoritiesSource"
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
                        sourceOtherValue={getValues("sexualGenderMinoritiesSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("sexualGenderMinoritiesSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("sexualGenderMinoritiesSource")}
                  </div>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("womenLiteracyRate")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("womenLiteracyRateDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="womenLiteracyRate"
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
                    name="womenLiteracyRateSource"
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
                        sourceOtherValue={getValues("womenLiteracyRateSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("womenLiteracyRateSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("womenLiteracyRateSource")}
                  </div>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("electedWomenRep")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("electedWomenRepDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <div className="p-inputgroup">
                      <Controller
                        name="electedWomenRep"
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
                    name="electedWomenRepSource"
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
                        sourceOtherValue={getValues("electedWomenRepSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("electedWomenRepSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("electedWomenRepSource")}
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

              <div className="p-grid p-col-12 p-md-12">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("totWomenReceivingSSA")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totWomenReceivingSSADesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="singledWomenRecSpa"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("singledWomen") ? setValue("singledWomenRecSpa", 0) : field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("unmarried")}
                          tooltip={t("unmarried")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                          max={getValues("singledWomen")}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="divorceeWomenRecSpa"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("divorceeWomen") ? setValue("divorceeWomenRecSpa", 0) : field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("divorcee")}
                          tooltip={t("divorcee")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                          max={getValues("divorceeWomen")}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="widowedWomenRecSpa"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("widowedWomen") ? setValue("widowedWomenRecSpa", 0) : field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("widow")}
                          tooltip={t("widow")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                          max={getValues("widowedWomen")}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="separatedWomenRecSpa"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("separatedWomen") ? setValue("separatedWomenRecSpa", 0) : field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("separated")}
                          tooltip={t("separated")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                          max={getValues("separatedWomen")}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersSingleWomenRecSpa"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={field.value > getValues("othersSingleWomen") ? setValue("othersSingleWomenRecSpa", 0) : field.value}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                          max={getValues("othersSingleWomen")}
                        />
                      )}
                    />
                  </div>

                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="singleWomenTotRecSpa"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("singledWomenRecSpa") ? getValues("singledWomenRecSpa") : 0)
                            + (getValues("divorceeWomenRecSpa") ? getValues("divorceeWomenRecSpa") : 0)
                            + (getValues("widowedWomenRecSpa") ? getValues("widowedWomenRecSpa") : 0)
                            + (getValues("separatedWomenRecSpa") ? getValues("separatedWomenRecSpa") : 0)
                            + (getValues("othersSingleWomenRecSpa") ? getValues("othersSingleWomenRecSpa") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          placeholder={t("total")}
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left">
                    <p style={{ margin: "0px", color: "red" }}>{t("singleWomenReceivingSpaNote")}</p>
                  </div>

                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="womenRecSpaSource"
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
                        sourceOtherValue={getValues("womenRecSpaSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("womenRecSpaSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("womenRecSpaSource")}
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
                    {t("totRegGBVincidents")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totRegGBVincidentsDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="regGbvIncidents"
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
                    name="regGbvIncidentsSource"
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
                        sourceOtherValue={getValues("regGbvIncidentsSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("regGbvIncidentsSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("regGbvIncidentsSource")}
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
                    {t("totMissingWomen")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totMissingWomenDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="missingWomen"
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
                    name="missingWomenSource"
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
                        sourceOtherValue={getValues("missingWomenSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("missingWomenSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("missingWomenSource")}
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
                    {t("totAbsenteeWomen")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totAbsenteeWomenDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="absenteeWomen"
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
                    name="absenteeWomenSource"
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
                        sourceOtherValue={getValues("absenteeWomenSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("absenteeWomenSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("absenteeWomenSource")}
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
                    {t("totAffectedByNaturalCalamities")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("totAffectedByNaturalCalamitiesDesc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="womenAffectedByCalamities"
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
                    name="womenAffectedByCalamitiesSource"
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
                        sourceOtherValue={getValues("womenAffectedByCalamitiesSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("womenAffectedByCalamitiesSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("womenAffectedByCalamitiesSource")}
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

            </div></form>
        </div>
      </Card>
    </>
  );
}

export default WomenGenderAndSexualMinorities;
