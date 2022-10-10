import React, { useState, useRef, useEffect, useCallback } from "react";
import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import FiscalYear from "../../../utilities/components/FiscalYear";
import LocalProvinceDistrict from "../../../utilities/components/LocalProvinceDistrict";
import { Button } from "primereact/button";
import IndicatorReportService from "../../api/services/IndicatorReportService";
import { trackPromise } from "react-promise-tracker";

import { TabView, TabPanel } from "primereact/tabview";
import { Toast } from "primereact/toast";
import TemplateHeader from "../../../utilities/components/TemplateHeader";
import { convertDOBNepToNepali } from "../../api/others/DateConverter";
import CsvExport from "../../api/services/CsvExport";
const WomenAndMinorities = () => {
    const { t } = useTranslation();
    const toast = useRef(null);
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();
    const [fiscalYear, setFiscalYear] = useState();
    const [district, setDistrict] = useState();
    const [localLevel, setLocalLevel] = useState();
    const [province, setProvince] = useState();

    const [responseData, setResponseData] = useState([]);

    const [showReport, setShowReport] = useState("No");

    const [activeIndex, setActiveIndex] = useState(0);
    const [subActiveIndex, setSubActiveIndex] = useState(0);
    const handleFiscalYear = (fiscalYearVal) => {
        console.log("fiscal year  ", fiscalYearVal);
        setFiscalYear(fiscalYearVal);
    };
    const handleProvince = (provinceVal) => {
        console.log("fiscal year  ", provinceVal);
        setProvince(provinceVal);
    };
    const handleDistrict = (districtVal) => {
        console.log("fiscal year  ", districtVal);
        setDistrict(districtVal);
    };
    const handleLocalLevel = (localLevelVal) => {
        console.log("fiscal year  ", localLevelVal);
        setLocalLevel(localLevelVal);
    };

    const searchData = (data) => {
        data.fiscalYear = fiscalYear;
        data.provinceId = province;
        data.districtId = district;
        data.localLevelId = localLevel;
        console.log(data);
        trackPromise(
            IndicatorReportService.getDisabledData(data).then(
                (response) => {
                    console.log("report ", response.data);
                    if (response.data.length > 0) {
                        // if (response.data.length === 1 && response.data[0].fiscal_year === null) {
                        //     setShowReport("No");
                        // } else {
                            setShowReport("Yes");
                            setResponseData(response.data[0]);
                       // }
                    } else {
                        setShowReport("No");
                    }
                }
            )
        );
    };

    const exportToCsv = () => {
        const table = document.getElementById('exportMe');

        var check = document.getElementById('check').innerHTML;
		if(check==="क्र.स.")
		{
			var table1 = table.innerHTML;
			let downloadLink = document.createElement("a");
			let uri = 'data:application/vnd.ms-excel;base64,'
			, template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
			'xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" ' +
			' content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets>' +
			'<x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>' +
			'</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>'
			+ table1 + '</table></body></html>'
			, base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
			, format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

			let ctx = { worksheet: 'Disabled report.xls' || 'Worksheet', table: table1}
			// window.location.href = uri + base64(format(template, ctx));
			downloadLink.href = uri + base64(format(template, ctx));
			downloadLink.download = ('Disabled report'||"exportedTable") + ".xls";

			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		}
		else
		{
			// Export to csv
			const csv = CsvExport.toCsv(table);
			// Download it
			CsvExport.csvDownload(csv, 'Disabled report.csv');
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
                    <h4 className="p-pt-0">{t("disabledModule")}</h4>
                </div>
            </Card>
            <Card className="p-mt-0" style={{ height: "150vh", overflowY: "auto" }}>
                <div className="reports p-card-content">
                    <form className="p-grid p-fluid ">
                        <FiscalYear
                            value={fiscalYear}
                            handleFiscalYearState={handleFiscalYear}
                        />
                        <LocalProvinceDistrict
                            provinceValue={province}
                            handleProvinceState={handleProvince}
                            districtValue={district}
                            handleDistrictState={handleDistrict}
                            localLevelValue={localLevel}
                            handleLocalLevelState={handleLocalLevel}
                        />
                        <div className="p-field p-col-12 p-md-12 ">
                            <div className="p-field p-col-10 p-md-10 float-left"></div>

                            <div className="p-field p-col-2 p-md-2 float-right">
                                <Button
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        background: "#1c80cf",
                                        color: "#FFF",
                                    }}
                                    label={t("search")}
                                    onClick={handleSubmit(searchData)}
                                />
                            </div>
                        </div>
                    </form>

                    <div className="p-field p-col-12 p-md-12 ">
                        <div className="p-field p-col-12 p-md-12 ">
                            <hr style={{ marginTop: "5px" }}></hr>
                        </div>
                    </div>
                    {showReport === "Yes" ?
                        <>
                            <div className="section-to-print">
                                <TemplateHeader />
                                <div className="p-grid p-col-12 p-md-12">
                                    <div class="p-col-12 p-md-6">
                                        <div className="p-field p-col-12 p-md-12 float-left main-label">
                                            {t("date")} : {convertDOBNepToNepali(new Date())}
                                        </div>
                                    </div>
                                    {fiscalYear ? <div class="p-col-12 p-md-6">
                                        <div className="p-field p-col-12 p-md-12 float-left main-label">
                                            {t("fiscalYear")} : {fiscalYear}
                                        </div>
                                    </div>
                                        : <></>
                                    }
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '50px' }} id="check" >{t("sn")}</th>
                                            <th style={{ width: '450px' }}>{t("details")}</th>
                                            <th>{t("total")}</th>
                                            <th>{t("male")}</th>
                                            <th>{t("female")}</th>
                                            <th>{t("others")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>{t("1")}</th>
                                            <th className="main-indicator">{t("totDisPeopCatKa")}</th>
                                            <td>-</td>
                                            <td>{responseData.disabled_male_ka}</td>
                                            <td>{responseData.disabled_female_ka}</td>
                                            <td>{responseData.disabled_others_ka}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("children")}</th>
                                            <td>{responseData.disabled_children_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("adult")}</th>
                                            <td>{responseData.disabled_adult_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("seniorCitizen")}</th>
                                            <td>{responseData.disabled_senior_citizen_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("physicallyDisabled")}</th>
                                            <td>{responseData.physically_disabled_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("visuallyImpaired")}</th>
                                            <td>{responseData.visually_impaired_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hearingImpaired")}</th>
                                            <td>{responseData.hearing_impaired_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("deafBlind")}</th>
                                            <td>{responseData.deaf_blind_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("speechAndHearingDisability")}</th>
                                            <td>{responseData.speech_and_hearing_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("mentalDisability")}</th>
                                            <td>{responseData.mental_disability_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("intellectuallyDisabled")}</th>
                                            <td>{responseData.intellectually_disabled_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hemophelia")}</th>
                                            <td>{responseData.hemophelia_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("autism")}</th>
                                            <td>{responseData.autism_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("multiple")}</th>
                                            <td>{responseData.multiple_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("2")}</th>
                                            <th className="main-indicator">{t("disPeopReceivingSSAUnderKa")}</th>
                                            <td>-</td>
                                            <td>{responseData.disabled_male_receivingssa_ka}</td>
                                            <td>{responseData.disabled_female_receivingssa_ka}</td>
                                            <td>{responseData.disabled_others_receivingssa_ka}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("children")}</th>
                                            <td>{responseData.disabled_children_receivingssa_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("adult")}</th>
                                            <td>{responseData.disabled_adult_receivingssa_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("seniorCitizen")}</th>
                                            <td>{responseData.disabled_senior_citizen_receivingssa_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("physicallyDisabled")}</th>
                                            <td>{responseData.physically_disabled_receivingssa_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("visuallyImpaired")}</th>
                                            <td>{responseData.visually_impaired_receivingssa_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hearingImpaired")}</th>
                                            <td>{responseData.hearing_impaired_receivingssa_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("deafBlind")}</th>
                                            <td>{responseData.deaf_blind_receivingssa_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("speechAndHearingDisability")}</th>
                                            <td>{responseData.speech_and_hearing_receivingssa_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("mentalDisability")}</th>
                                            <td>{responseData.mental_disability_receivingssa_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("intellectuallyDisabled")}</th>
                                            <td>{responseData.intellectually_disabled_receivingssa_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hemophelia")}</th>
                                            <td>{responseData.hemophelia_receivingssa_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("autism")}</th>
                                            <td>{responseData.autism_receivingssa_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("multiple")}</th>
                                            <td>{responseData.multiple_receivingssa_ka}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("3")}</th>
                                            <th className="main-indicator">{t("totDisPeopCatKha")}</th>
                                            <td>-</td>
                                            <td>{responseData.disabled_male_kha}</td>
                                            <td>{responseData.disabled_female_kha}</td>
                                            <td>{responseData.disabled_others_kha}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("children")}</th>
                                            <td>{responseData.disabled_children_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("adult")}</th>
                                            <td>{responseData.disabled_adult_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("seniorCitizen")}</th>
                                            <td>{responseData.disabled_senior_citizen_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("physicallyDisabled")}</th>
                                            <td>{responseData.physically_disabled_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("visuallyImpaired")}</th>
                                            <td>{responseData.visually_impaired_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hearingImpaired")}</th>
                                            <td>{responseData.hearing_impaired_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("deafBlind")}</th>
                                            <td>{responseData.deaf_blind_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("speechAndHearingDisability")}</th>
                                            <td>{responseData.speech_and_hearing_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("mentalDisability")}</th>
                                            <td>{responseData.mental_disability_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("intellectuallyDisabled")}</th>
                                            <td>{responseData.intellectually_disabled_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hemophelia")}</th>
                                            <td>{responseData.hemophelia_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("autism")}</th>
                                            <td>{responseData.autism_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("multiple")}</th>
                                            <td>{responseData.multiple_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("4")}</th>
                                            <th className="main-indicator">{t("disPeopReceivingSSAUnderKha")}</th>
                                            <td>-</td>
                                            <td>{responseData.disabled_male_receivingssa_kha}</td>
                                            <td>{responseData.disabled_female_receivingssa_kha}</td>
                                            <td>{responseData.disabled_others_receivingssa_kha}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("children")}</th>
                                            <td>{responseData.disabled_children_receivingssa_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("adult")}</th>
                                            <td>{responseData.disabled_adult_receivingssa_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("seniorCitizen")}</th>
                                            <td>{responseData.disabled_senior_citizen_receivingssa_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("physicallyDisabled")}</th>
                                            <td>{responseData.physically_disabled_receivingssa_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("visuallyImpaired")}</th>
                                            <td>{responseData.visually_impaired_receivingssa_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hearingImpaired")}</th>
                                            <td>{responseData.hearing_impaired_receivingssa_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("deafBlind")}</th>
                                            <td>{responseData.deaf_blind_receivingssa_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("speechAndHearingDisability")}</th>
                                            <td>{responseData.speech_and_hearing_receivingssa_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("mentalDisability")}</th>
                                            <td>{responseData.mental_disability_receivingssa_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("intellectuallyDisabled")}</th>
                                            <td>{responseData.intellectually_disabled_receivingssa_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hemophelia")}</th>
                                            <td>{responseData.hemophelia_receivingssa_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("autism")}</th>
                                            <td>{responseData.autism_receivingssa_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("multiple")}</th>
                                            <td>{responseData.multiple_receivingssa_kha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("5")}</th>
                                            <th className="main-indicator">{t("totDisPeopCatGa")}</th>
                                            <td>-</td>
                                            <td>{responseData.disabled_male_ga}</td>
                                            <td>{responseData.disabled_female_ga}</td>
                                            <td>{responseData.disabled_others_ga}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("children")}</th>
                                            <td>{responseData.disabled_children_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("adult")}</th>
                                            <td>{responseData.disabled_adult_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("seniorCitizen")}</th>
                                            <td>{responseData.disabled_senior_citizen_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("physicallyDisabled")}</th>
                                            <td>{responseData.physically_disabled_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("visuallyImpaired")}</th>
                                            <td>{responseData.visually_impaired_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hearingImpaired")}</th>
                                            <td>{responseData.hearing_impaired_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("deafBlind")}</th>
                                            <td>{responseData.deaf_blind_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("speechAndHearingDisability")}</th>
                                            <td>{responseData.speech_and_hearing_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("mentalDisability")}</th>
                                            <td>{responseData.mental_disability_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("intellectuallyDisabled")}</th>
                                            <td>{responseData.intellectually_disabled_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hemophelia")}</th>
                                            <td>{responseData.hemophelia_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("autism")}</th>
                                            <td>{responseData.autism_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("multiple")}</th>
                                            <td>{responseData.multiple_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("6")}</th>
                                            <th className="main-indicator">{t("disPeopReceivingSSAUnderGa")}</th>
                                            <td>-</td>
                                            <td>{responseData.disabled_male_receivingssa_ga}</td>
                                            <td>{responseData.disabled_female_receivingssa_ga}</td>
                                            <td>{responseData.disabled_others_receivingssa_ga}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("children")}</th>
                                            <td>{responseData.disabled_children_receivingssa_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("adult")}</th>
                                            <td>{responseData.disabled_adult_receivingssa_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("seniorCitizen")}</th>
                                            <td>{responseData.disabled_senior_citizen_receivingssa_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("physicallyDisabled")}</th>
                                            <td>{responseData.physically_disabled_receivingssa_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("visuallyImpaired")}</th>
                                            <td>{responseData.visually_impaired_receivingssa_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hearingImpaired")}</th>
                                            <td>{responseData.hearing_impaired_receivingssa_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("deafBlind")}</th>
                                            <td>{responseData.deaf_blind_receivingssa_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("speechAndHearingDisability")}</th>
                                            <td>{responseData.speech_and_hearing_receivingssa_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("mentalDisability")}</th>
                                            <td>{responseData.mental_disability_receivingssa_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("intellectuallyDisabled")}</th>
                                            <td>{responseData.intellectually_disabled_receivingssa_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hemophelia")}</th>
                                            <td>{responseData.hemophelia_receivingssa_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("autism")}</th>
                                            <td>{responseData.autism_receivingssa_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("multiple")}</th>
                                            <td>{responseData.multiple_receivingssa_ga}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("7")}</th>
                                            <th className="main-indicator">{t("totDisPeopCatGha")}</th>
                                            <td>-</td>
                                            <td>{responseData.disabled_male_gha}</td>
                                            <td>{responseData.disabled_female_gha}</td>
                                            <td>{responseData.disabled_others_gha}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("children")}</th>
                                            <td>{responseData.disabled_children_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("adult")}</th>
                                            <td>{responseData.disabled_adult_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("seniorCitizen")}</th>
                                            <td>{responseData.disabled_senior_citizen_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("physicallyDisabled")}</th>
                                            <td>{responseData.physically_disabled_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("visuallyImpaired")}</th>
                                            <td>{responseData.visually_impaired_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hearingImpaired")}</th>
                                            <td>{responseData.hearing_impaired_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("deafBlind")}</th>
                                            <td>{responseData.deaf_blind_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("speechAndHearingDisability")}</th>
                                            <td>{responseData.speech_and_hearing_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("mentalDisability")}</th>
                                            <td>{responseData.mental_disability_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("intellectuallyDisabled")}</th>
                                            <td>{responseData.intellectually_disabled_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hemophelia")}</th>
                                            <td>{responseData.hemophelia_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("autism")}</th>
                                            <td>{responseData.autism_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("multiple")}</th>
                                            <td>{responseData.multiple_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("8")}</th>
                                            <th className="main-indicator">{t("disPeopReceivingSSAUnderGha")}</th>
                                            <td>-</td>
                                            <td>{responseData.disabled_male_receivingssa_gha}</td>
                                            <td>{responseData.disabled_female_receivingssa_gha}</td>
                                            <td>{responseData.disabled_others_receivingssa_gha}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("children")}</th>
                                            <td>{responseData.disabled_children_receivingssa_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("adult")}</th>
                                            <td>{responseData.disabled_adult_receivingssa_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("seniorCitizen")}</th>
                                            <td>{responseData.disabled_senior_citizen_receivingssa_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("physicallyDisabled")}</th>
                                            <td>{responseData.physically_disabled_receivingssa_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("visuallyImpaired")}</th>
                                            <td>{responseData.visually_impaired_receivingssa_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hearingImpaired")}</th>
                                            <td>{responseData.hearing_impaired_receivingssa_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("deafBlind")}</th>
                                            <td>{responseData.deaf_blind_receivingssa_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("speechAndHearingDisability")}</th>
                                            <td>{responseData.speech_and_hearing_receivingssa_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("mentalDisability")}</th>
                                            <td>{responseData.mental_disability_receivingssa_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("intellectuallyDisabled")}</th>
                                            <td>{responseData.intellectually_disabled_receivingssa_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hemophelia")}</th>
                                            <td>{responseData.hemophelia_receivingssa_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("autism")}</th>
                                            <td>{responseData.autism_receivingssa_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("multiple")}</th>
                                            <td>{responseData.multiple_receivingssa_gha}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("9")}</th>
                                            <th className="main-indicator">{t("disPeopRecSkillTraining")}</th>
                                            <td>-</td>
                                            <td>{responseData.male_rec_skill_training}</td>
                                            <td>{responseData.female_rec_skill_training}</td>
                                            <td>{responseData.others_rec_skill_training}</td>
                                        </tr>
                                        <tr>
                                            <th>{t("10")}</th>
                                            <th className="main-indicator">{t("noDisabledRehabCenter")}</th>
                                            <td>{responseData.tot_disabled_rehab_center}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("11")}</th>
                                            <th className="main-indicator">{t("disPeopReceivingSSAUnderGha")}</th>
                                            <td>-</td>
                                            <td>{responseData.disabled_male_receiving_services}</td>
                                            <td>{responseData.disabled_female_receiving_services}</td>
                                            <td>{responseData.disabled_others_receiving_services}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("physicallyDisabled")}</th>
                                            <td>{responseData.physically_disabled_receiving_services}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("visuallyImpaired")}</th>
                                            <td>{responseData.visually_impaired_receiving_services}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hearingImpaired")}</th>
                                            <td>{responseData.hearing_impaired_receiving_services}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("deafBlind")}</th>
                                            <td>{responseData.deaf_blind_receiving_services}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("speechAndHearingDisability")}</th>
                                            <td>{responseData.speech_and_hearing_receiving_services}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("mentalDisability")}</th>
                                            <td>{responseData.mental_disability_receiving_services}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("intellectuallyDisabled")}</th>
                                            <td>{responseData.intellectually_disabled_receiving_services}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("hemophelia")}</th>
                                            <td>{responseData.hemophelia_receiving_services}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("autism")}</th>
                                            <td>{responseData.autism_receiving_services}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("multiple")}</th>
                                            <td>{responseData.multiple_receiving_services}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("12")}</th>
                                            <th className="main-indicator">{t("perBudgetAllocatedForDisPeop")}</th>
                                            <td>{responseData.budget_allocated_for_disabled}%</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("13")}</th>
                                            <th className="main-indicator">{t("perOfDisPeopJob")}</th>
                                            <td>{responseData.per_of_dis_peop_job}%</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("14")}</th>
                                            <th className="main-indicator">{t("totDisabledAffByNatCal")}</th>
                                            <td>{responseData.disabled_affected_by_calamities}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-field p-col-12 p-md-12 p-pt-0">
                                <div className="p-field p-col-12 p-md-9 float-left"></div>
                                <div className="p-field p-col-12 p-md-2 float-left">
                                    <Button
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            background: "#1c80cf",
                                            color: "#FFF",
                                            height: "55px",
                                            marginBottom: "10px"
                                        }}
                                        label={t("export")}
                                        onClick={exportToCsv}
                                    />
                                </div>
                                <div className="p-field p-col-1 p-md-1 float-left">
                                    <Button
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            background: "#1c80cf",
                                            color: "#FFF",
                                            height: "55px",
                                            marginBottom: "10px"
                                        }}
                                        label={t("print")}
                                        onClick={() => window.print()}
                                    />
                                </div>
                            </div>
                        </>
                        :
                        <div className=" p-card-content" style={{ textAlign: "center", margin: "10px" }}>
                            <h4 className="p-pt-0">{t("noDataFound")}</h4>
                        </div>
                    }
                </div>
            </Card>
        </>
    );
};

export default WomenAndMinorities;
