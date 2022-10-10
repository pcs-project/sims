
import React, { useState } from "react";

import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";
import { bsToAd } from "@sbmdkl/nepali-date-converter";
import { useTranslation } from "react-i18next";

const ReportDate = (props) => {
    const { t } = useTranslation();

    const handleFromDate = (value) => {
        console.log("content  ", value);
        console.log("bs to ad  ", bsToAd(value));
        props.handleFromDateBs(value);
        props.handleFromDateAd(bsToAd(value));
    }

    const handleToDate =  (value) => {
        console.log("content  ", value);
        console.log("bs to ad  ", bsToAd(value));
        props.handleToDateBs(value);
        props.handleToDateAd(bsToAd(value));
    }

    return (
        <>
            <div class="p-field p-col-12 p-md-12" style={{ justifyContent: "center" }}>
                <div className="p-field p-col-12 p-md-3 float-left main-label"> {t("fromDate")}</div>
                <div className="p-field p-col-12 p-md-3 float-left">
                    <NepaliDatePicker
                        inputClassName="p-inputtext form-control"
                        className=""
                        value={props.fromDateBs}
                        onChange={(value) => {
                            handleFromDate(value);
                        }}
                        options={{ calenderLocale: "ne", valueLocale: "en" }}
                    />
                </div>
                <div className="p-field p-col-12 p-md-3 float-left main-label">{t("toDate")}</div>
                <div className="p-field p-col-12 p-md-3 float-left">
                <NepaliDatePicker
                        inputClassName="p-inputtext form-control"
                        className=""
                        value={props.toDateBs}
                        onChange={(value) => {
                            handleToDate(value);
                        }}
                        options={{ calenderLocale: "ne", valueLocale: "en" }}
                    />
                </div>
            </div>
        </>
    )

}
export default ReportDate;