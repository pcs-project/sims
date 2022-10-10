import React, { useState, useRef, useEffect, useCallback } from "react";
import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import FiscalQuarter from "../../../utilities/components/FiscalQuarter";
import LocalProvinceDistrict from "../../../utilities/components/LocalProvinceDistrict";
import { Button } from "primereact/button";
import IndicatorReportService from "../../api/services/IndicatorReportService";
import { trackPromise } from "react-promise-tracker";
import { Toast } from "primereact/toast";

import Source from "../../../utilities/components/Source";
import { InputNumber } from "primereact/inputnumber";
import { classNames } from "primereact/utils";
import TemplateHeader from "../../../utilities/components/TemplateHeader";
import { convertDOBNepToNepali } from "../../api/others/DateConverter";
import CsvExport from "../../api/services/CsvExport";
const ComplaintRegistration = () => {
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
    const [quarter, setQuarter] = useState();

    const [responseData, setResponseData] = useState([]);

    const [showReport, setShowReport] = useState("No");

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
    const handleQuarter = (quarterVal) => {
        console.log("quarter  ", quarterVal);
        setQuarter(quarterVal);
    };

    const searchData = (data) => {
        data.fiscalYear = fiscalYear;
        data.provinceId = province;
        data.districtId = district;
        data.localLevelId = localLevel;
        data.quarter = quarter;
        console.log(data);
        trackPromise(
            IndicatorReportService.getComplaintRegistrationData(data).then((response) => {
                console.log("complaint registration report", response.data);
                if (response.data.length > 0) {
                    // if (response.data.length === 1 && response.data[0].fiscal_year === null) {
                    //     setShowReport("No");
                    // } else {
                        setShowReport("Yes");
                        setResponseData(response.data[0]);
                    //}
                } else {
                    setShowReport("No");
                }
            })
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

			let ctx = { worksheet: 'Complaint Registration report.xls' || 'Worksheet', table: table1}
			// window.location.href = uri + base64(format(template, ctx));
			downloadLink.href = uri + base64(format(template, ctx));
			downloadLink.download = ('Complaint Registration report'||"exportedTable") + ".xls";

			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		}
		else
		{
			// Export to csv
			const csv = CsvExport.toCsv(table);
			// Download it
			CsvExport.csvDownload(csv, 'Complaint Registration report.csv');
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
                    <h4 className="p-pt-0">{t("complaintRegistration")}</h4>
                </div>
            </Card>

            <Card className="p-mt-0" style={{ height: "150vh", overflowY: "auto" }}>
                <div className="reports p-card-content">
                    <form className="p-grid p-fluid ">
                        <FiscalQuarter
                            fiscalYearValue={fiscalYear}
                            handleFiscalYearState={handleFiscalYear}
                            quarterValue={quarter}
                            handleQuarterState={handleQuarter}
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
                                            <th className="main-indicator">{t("crUnder47Part1")}</th>
                                            <td>{responseData.cr_under47part1}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("2")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("crToWages")}</th>
                                            <td>{responseData.male_cr_to_wages}</td>
                                            <td>{responseData.female_cr_to_wages}</td>
                                            <td>{responseData.other_cr_to_wages}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_cr_to_wages}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_cr_to_wages}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_cr_to_wages}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_cr_to_wages}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_cr_to_wages}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_cr_to_wages}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("3")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("crToSeniorCitizen")}</th>
                                            <td>{responseData.male_cr_to_senior_citizen}</td>
                                            <td>{responseData.female_cr_to_senior_citizen}</td>
                                            <td>{responseData.other_cr_to_senior_citizen}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_cr_to_senior_citizen}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_cr_to_senior_citizen}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_cr_to_senior_citizen}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_cr_to_senior_citizen}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_cr_to_senior_citizen}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_cr_to_senior_citizen}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("4")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("crToMinors")}</th>
                                            <td>{responseData.male_cr_to_minors}</td>
                                            <td>{responseData.female_cr_to_minors}</td>
                                            <td>{responseData.other_cr_to_minors}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_cr_to_minors}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_cr_to_minors}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_cr_to_minors}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_cr_to_minors}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_cr_to_minors}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_cr_to_minors}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("5")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("crUnder47Part2")}</th>
                                            <td>{responseData.male_cr_under47part2}</td>
                                            <td>{responseData.female_cr_under47part2}</td>
                                            <td>{responseData.other_cr_under47part2}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_cr_under47part2}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_cr_under47part2}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_cr_under47part2}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_cr_under47part2}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_cr_under47part2}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_cr_under47part2}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("6")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("crToDivorce")}</th>
                                            <td>{responseData.male_cr_to_divorce}</td>
                                            <td>{responseData.female_cr_to_divorce}</td>
                                            <td>{responseData.other_cr_to_divorce}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_cr_to_divorce}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_cr_to_divorce}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_cr_to_divorce}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_cr_to_divorce}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_cr_to_divorce}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_cr_to_divorce}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("7")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("crToBattery")}</th>
                                            <td>{responseData.male_cr_to_battery}</td>
                                            <td>{responseData.female_cr_to_battery}</td>
                                            <td>{responseData.other_cr_to_battery}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_cr_to_battery}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_cr_to_battery}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_cr_to_battery}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_cr_to_battery}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_cr_to_battery}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_cr_to_battery}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("8")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("crToDefamation")}</th>
                                            <td>{responseData.male_cr_to_defamation}</td>
                                            <td>{responseData.female_cr_to_defamation}</td>
                                            <td>{responseData.other_cr_to_defamation}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_cr_to_defamation}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_cr_to_defamation}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_cr_to_defamation}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_cr_to_defamation}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_cr_to_defamation}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_cr_to_defamation}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("9")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("dsUnder47Part1")}</th>
                                            <td>{responseData.male_ds_under47part1}</td>
                                            <td>{responseData.female_ds_under47part1}</td>
                                            <td>{responseData.other_ds_under47part1}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_ds_under47part1}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_ds_under47part1}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_ds_under47part1}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_ds_under47part1}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_ds_under47part1}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_ds_under47part1}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("10")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("dsMedicationUnder47Part2")}</th>
                                            <td>{responseData.male_ds_medication_under47part2}</td>
                                            <td>{responseData.female_ds_medication_under47part2}</td>
                                            <td>{responseData.other_ds_medication_under47part2}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_ds_medication_under47part2}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_ds_medication_under47part2}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_ds_medication_under47part2}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_ds_medication_under47part2}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_ds_medication_under47part2}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_ds_medication_under47part2}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("11")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("crBeyondJurisdiction")}</th>
                                            <td>{responseData.male_cr_beyond_jurisdiction}</td>
                                            <td>{responseData.female_cr_beyond_jurisdiction}</td>
                                            <td>{responseData.other_cr_beyond_jurisdiction}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_cr_beyond_jurisdiction}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_cr_beyond_jurisdiction}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_cr_beyond_jurisdiction}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_cr_beyond_jurisdiction}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_cr_beyond_jurisdiction}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_cr_beyond_jurisdiction}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("12")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("crRelevantInstitutions")}</th>
                                            <td>{responseData.male_cr_relevant_institutions}</td>
                                            <td>{responseData.female_cr_relevant_institutions}</td>
                                            <td>{responseData.other_cr_relevant_institutions}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_cr_relevant_institutions}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_cr_relevant_institutions}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_cr_relevant_institutions}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_cr_relevant_institutions}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_cr_relevant_institutions}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_cr_relevant_institutions}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("13")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("crToLegalAidService")}</th>
                                            <td>{responseData.male_cr_to_legal_aid_service}</td>
                                            <td>{responseData.female_cr_to_legal_aid_service}</td>
                                            <td>{responseData.other_cr_to_legal_aid_service}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_cr_to_legal_aid_service}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_cr_to_legal_aid_service}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_cr_to_legal_aid_service}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_cr_to_legal_aid_service}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_cr_to_legal_aid_service}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_cr_to_legal_aid_service}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("14")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("crToPsychoSocioCounselling")}</th>
                                            <td>{responseData.male_cr_to_psycho_socio_counselling}</td>
                                            <td>{responseData.female_cr_to_psycho_socio_counselling}</td>
                                            <td>{responseData.other_cr_to_psycho_socio_counselling}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_cr_to_psycho_socio_counselling}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_cr_to_psycho_socio_counselling}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_cr_to_psycho_socio_counselling}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_cr_to_psycho_socio_counselling}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_cr_to_psycho_socio_counselling}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_cr_to_psycho_socio_counselling}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("15")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("crToMedicalInstitutions")}</th>
                                            <td>{responseData.male_cr_to_medical_institutions}</td>
                                            <td>{responseData.female_cr_to_medical_institutions}</td>
                                            <td>{responseData.other_cr_to_medical_institutions}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_cr_to_medical_institutions}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_cr_to_medical_institutions}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_cr_to_medical_institutions}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_cr_to_medical_institutions}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_cr_to_medical_institutions}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_cr_to_medical_institutions}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("16")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("crAboutDisabilityCard")}</th>
                                            <td>{responseData.male_cr_about_disability_card}</td>
                                            <td>{responseData.female_cr_about_disability_card}</td>
                                            <td>{responseData.other_cr_about_disability_card}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_cr_about_disability_card}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_cr_about_disability_card}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_cr_about_disability_card}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_cr_about_disability_card}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_cr_about_disability_card}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_cr_about_disability_card}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("17")}</th>
                                            <th className="main-indicator" colSpan={2}>{t("firRegistered")}</th>
                                            <td>{responseData.fir_registered_by_male}</td>
                                            <td>{responseData.fir_registered_by_female}</td>
                                            <td>{responseData.fir_registered_by_others}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.fir_registered_by_dalit}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.fir_registered_by_muslim}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.fir_registered_by_janajati}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.fir_registered_by_madhesi}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.fir_registered_by_brahmin}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.fir_registered_by_ethnic_minorities}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("18")}</th>
                                            <th className="main-indicator" colSpan={5}>{t("caseProsecutedByCourt")}</th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("tip")}</th>
                                            <td>{responseData.tip_case_prosecuted_by_court}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("gbv")}</th>
                                            <td>{responseData.district_case_prosecuted_by_court}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("19")}</th>
                                            <th className="main-indicator" colSpan={5}>{t("caseDecidedByCourt")}</th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("tip")}</th>
                                            <td>{responseData.tip_case_decided_by_court}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("gbv")}</th>
                                            <td>{responseData.district_case_decided_by_court}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        
                                        <tr>
                                            <th>{t("20")}</th>
                                            <th className="main-indicator" colSpan={5}>{t("crToWomenAndChildren")}</th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("tip")}</th>
                                            <td>{responseData.cr_about_tip}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("polygamy")}</th>
                                            <td>{responseData.cr_about_polygamy}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("childMarriage")}</th>
                                            <td>{responseData.cr_about_child_marriage}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("forcedAction")}</th>
                                            <td>{responseData.cr_about_forced_action}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("forcedActionIndustry")}</th>
                                            <td>{responseData.cr_about_forced_action_industry}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("unnaturalIntercourse")}</th>
                                            <td>{responseData.cr_about_unnatural_intercourse}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("childSexualAbuse")}</th>
                                            <td>{responseData.cr_about_child_sexual_abuse}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("sexualAbuse")}</th>
                                            <td>{responseData.cr_about_sexual_abuse}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("accusedOfWitchcraft")}</th>
                                            <td>{responseData.cr_about_accused_of_witchcraft}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("domesticViolence")}</th>
                                            <td>{responseData.cr_about_domestic_violence}</td>
                                            <td colspan={3}>-</td>
                                        </tr>

                                        <tr>
                                            <th>{t("21")}</th>
                                            <th className="main-indicator" colSpan={5}>{t("crMiscellaneous")}</th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("tipHumanOrganTransplantation")}</th>
                                            <td>{responseData.cr_about_tip_human_organ_transplantation}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("forcedTip")}</th>
                                            <td>{responseData.cr_about_forced_tip}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("beatenAndMiscarried")}</th>
                                            <td>{responseData.cr_about_beaten_and_miscarried}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("throwingAliveChild")}</th>
                                            <td>{responseData.cr_about_throwing_alive_child}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("kidnappingAndRape")}</th>
                                            <td>{responseData.cr_about_kidnapping_and_rape}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dutyByForce")}</th>
                                            <td>{responseData.cr_about_duty_by_force}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("abductionAndDuty")}</th>
                                            <td>{responseData.cr_about_abduction_and_duty}</td>
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
export default ComplaintRegistration;
