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

import SewaKendraService from "../api/services/SewaKendraService";
import OrganizationService from "../../security/api/services/OrganizationService";
import Organization from "../../utilities/components/Organization";
import { trackPromise } from "react-promise-tracker";
import { useTranslation } from "react-i18next";
import UserService from "../../security/api/services/UserService";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import { useHistory } from "react-router";
function SewaKendraIndicator() {
    const { t } = useTranslation();
    const history = useHistory();

    const [fiscalYear, setFiscalYear] = useState("");
    const [quarter, setQuarter] = useState("");
    const [sewaKendraId, setSewaKendraId] = useState();

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
                SewaKendraService.saveData(data).then((response) => {
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
            data.sewaKendraId = sewaKendraId;
            trackPromise(
                SewaKendraService.updateData(data).then((response) => {
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
                SewaKendraService.saveData(data).then((response) => {
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
            data.sewaKendraId = sewaKendraId;
            trackPromise(
                SewaKendraService.updateData(data).then((response) => {
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
            SewaKendraService.getListByFiscalYearAndQuarter(
                fiscalYear,
                quarter
            ).then((response) => {
                console.log("response", response.data);
                if (response.data) {
                    setFiscalYear(response.data.fiscalYear);
                    setQuarter(response.data.quarter);
                    setSewaKendraId(response.data.sewaKendraId);
                    reset({
                        totSewaKendra: response.data.totSewaKendra,
                        totSewaKendraSource:
                            response.data.totSewaKendraSource[0] != "" &&
                                response.data.totSewaKendraSource != ""
                                ? response.data.totSewaKendraSource
                                : null,
                        totSewaKendraSourceOthers: response.data.totSewaKendraSourceOthers,
                        maleSurvivors: response.data.maleSurvivors,
                        femaleSurvivors: response.data.femaleSurvivors,
                        othersSurvivors: response.data.othersSurvivors,
                        survivorsSource:
                            response.data.survivorsSource[0] != "" &&
                                response.data.survivorsSource != ""
                                ? response.data.survivorsSource
                                : null,
                        survivorsSourceOthers: response.data.survivorsSourceOthers,
                        maleGbvVictims: response.data.maleGbvVictims,
                        femaleGbvVictims: response.data.femaleGbvVictims,
                        othersGbvVictims: response.data.othersGbvVictims,
                        gbvVictimsSource:
                            response.data.gbvVictimsSource[0] != "" &&
                                response.data.gbvVictimsSource != ""
                                ? response.data.gbvVictimsSource
                                : null,
                        gbvVictimsSourceOthers: response.data.gbvVictimsSourceOthers,
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
                        totSewaKendraSource: [],
                        survivorsSource: [],
                        gbvVictimsSource: [],
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
            SewaKendraService.getListByOrganization(
                fiscalYear,
                quarter,
                organization
            ).then((response) => {
                console.log("response", response.data);
                if (response.data) {
                    setFiscalYear(response.data.fiscalYear);
                    setQuarter(response.data.quarter);
                    setSewaKendraId(response.data.sewaKendraId);
                    reset({
                        totSewaKendra: response.data.totSewaKendra,
                        totSewaKendraSource:
                            response.data.totSewaKendraSource[0] != "" &&
                                response.data.totSewaKendraSource != ""
                                ? response.data.totSewaKendraSource
                                : null,
                        totSewaKendraSourceOthers: response.data.totSewaKendraSourceOthers,
                        maleSurvivors: response.data.maleSurvivors,
                        femaleSurvivors: response.data.femaleSurvivors,
                        othersSurvivors: response.data.othersSurvivors,
                        survivorsSource:
                            response.data.survivorsSource[0] != "" &&
                                response.data.survivorsSource != ""
                                ? response.data.survivorsSource
                                : null,
                        survivorsSourceOthers: response.data.survivorsSourceOthers,
                        maleGbvVictims: response.data.maleGbvVictims,
                        femaleGbvVictims: response.data.femaleGbvVictims,
                        othersGbvVictims: response.data.othersGbvVictims,
                        gbvVictimsSource:
                            response.data.gbvVictimsSource[0] != "" &&
                                response.data.gbvVictimsSource != ""
                                ? response.data.gbvVictimsSource
                                : null,
                        gbvVictimsSourceOthers: response.data.gbvVictimsSourceOthers,
                    });
                } else {
                    console.log("no data");
                    reset({
                        totSewaKendraSource: [],
                        survivorsSource: [],
                        gbvVictimsSource: [],
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
                        onClick={() =>
                            history.push("/sims/shelter-home-indicator")
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
                        label={t("Sewa Kendra Indicator")}
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
                                        {t("totSewaKendra")}
                                        <i
                                            className="pi pi-question-circle tooltip-style"
                                            title={t("totSewaKendraDesc")}
                                        />
                                    </div>
                                    <div className="p-field p-col-2 p-md-2 float-left">
                                        <Controller
                                            name="totSewaKendra"
                                            control={control}
                                            autoFocus
                                            render={({ field, fieldState }) => (
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
                                        name="totSewaKendraSource"
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
                                                sourceOtherValue={getValues("totSewaKendraSourceOthers")}
                                                handleSourceOtherState={(e) => {
                                                    setValue("totSewaKendraSourceOthers", e);
                                                }}
                                            />
                                        )}
                                        defaultValue={[]}
                                    />
                                    <div class="p-col-12 p-md-12">
                                      {getFormErrorMessage("totSewaKendraSource")}
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
                                                {t("totSurvivorsSewaKendra")}
                                                <i
                                                    className="pi pi-question-circle tooltip-style"
                                                    title={t("totSurvivorsSewaKendraDesc")}
                                                />
                                            </div>
                                            <div className="p-field p-col-12 p-md-12 float-left sub-label">
                                                {t("byGender")}
                                            </div>
                                            <div className="p-field p-col-2 p-md-2 float-left">
                                                <Controller
                                                    name="maleSurvivors"
                                                    control={control}
                                                    autoFocus
                                                    render={({ field, fieldState }) => (
                                                        <InputNumber
                                                            id={field.name}
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
                                                    name="femaleSurvivors"
                                                    control={control}
                                                    autoFocus
                                                    render={({ field, fieldState }) => (
                                                        <InputNumber
                                                            id={field.name}
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
                                                    name="othersSurvivors"
                                                    control={control}
                                                    autoFocus
                                                    render={({ field, fieldState }) => (
                                                        <InputNumber
                                                            id={field.name}
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
                                                    name="totalSurvivors"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <InputNumber
                                                            id={field.name}
                                                            {...field}
                                                            className={classNames({
                                                                "p-invalid": fieldState.invalid,
                                                            })}
                                                            value={(getValues("maleSurvivors") ? getValues("maleSurvivors") : 0)
                                                                + (getValues("femaleSurvivors") ? getValues("femaleSurvivors") : 0)
                                                                + (getValues("othersSurvivors") ? getValues("othersSurvivors") : 0)}
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
                                                name="survivorsSource"
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
                                                        sourceOtherValue={getValues("survivorsSourceOthers")}
                                                        handleSourceOtherState={(e) => {
                                                            setValue("survivorsSourceOthers", e);
                                                        }}
                                                    />
                                                )}
                                                defaultValue={[]}
                                            />
                                            <div class="p-col-12 p-md-12">
                                              {getFormErrorMessage("survivorsSource")}
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
                                                {t("totGbvVictims")}
                                                <i
                                                    className="pi pi-question-circle tooltip-style"
                                                    title={t("totGbvVictimsDesc")}
                                                />
                                            </div>
                                            <div className="p-field p-col-12 p-md-12 float-left sub-label">
                                                {t("byGender")}
                                            </div>
                                            <div className="p-field p-col-2 p-md-2 float-left">
                                                <Controller
                                                    name="maleGbvVictims"
                                                    control={control}
                                                    autoFocus
                                                    render={({ field, fieldState }) => (
                                                        <InputNumber
                                                            id={field.name}
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
                                                    name="femaleGbvVictims"
                                                    control={control}
                                                    autoFocus
                                                    render={({ field, fieldState }) => (
                                                        <InputNumber
                                                            id={field.name}
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
                                                    name="othersGbvVictims"
                                                    control={control}
                                                    autoFocus
                                                    render={({ field, fieldState }) => (
                                                        <InputNumber
                                                            id={field.name}
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
                                                    name="totalGbvVictims"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <InputNumber
                                                            id={field.name}
                                                            {...field}
                                                            className={classNames({
                                                                "p-invalid": fieldState.invalid,
                                                            })}
                                                            value={(getValues("maleGbvVictims") ? getValues("maleGbvVictims") : 0)
                                                                + (getValues("femaleGbvVictims") ? getValues("femaleGbvVictims") : 0)
                                                                + (getValues("othersGbvVictims") ? getValues("othersGbvVictims") : 0)}
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
                                                name="gbvVictimsSource"
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
                                                        sourceOtherValue={getValues("gbvVictimsSourceOthers")}
                                                        handleSourceOtherState={(e) => {
                                                            setValue("gbvVictimsSourceOthers", e);
                                                        }}
                                                    />
                                                )}
                                                defaultValue={[]}
                                            />
                                            <div class="p-col-12 p-md-12">
                                              {getFormErrorMessage("gbvVictimsSource")}
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
                                                    onClick={(e) => saveData(e)} 
                                                    />
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

export default SewaKendraIndicator;
