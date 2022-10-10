import React, { useState, useRef } from "react";
import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import FiscalQuarter from "../../../utilities/components/FiscalQuarter";
import LocalProvinceDistrict from "../../../utilities/components/LocalProvinceDistrict";
import { Button } from "primereact/button";
import IndicatorReportService from "../../api/services/IndicatorReportService";
import { trackPromise } from "react-promise-tracker";
import { Toast } from "primereact/toast";

import TemplateHeader from "../../../utilities/components/TemplateHeader";
import { useHistory } from "react-router";
import { convertDOBNepToNepali } from "../../api/others/DateConverter";
import CsvExport from "../../api/services/CsvExport";
const SwaeKendra = () => {
    const { t } = useTranslation();
    const history = useHistory();
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
            IndicatorReportService.getSewaKendraData(data).then((response) => {
                console.log("sewa kendra report", response.data);
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
        if (check === "क्र.स.") {
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

            let ctx = { worksheet: 'Sewa Kendra report.xls' || 'Worksheet', table: table1 }
            // window.location.href = uri + base64(format(template, ctx));
            downloadLink.href = uri + base64(format(template, ctx));
            downloadLink.download = ('Sewa Kendra report' || "exportedTable") + ".xls";

            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
        else {
            // Export to csv
            const csv = CsvExport.toCsv(table);
            // Download it
            CsvExport.csvDownload(csv, 'Sewa Kendra report.csv');
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
                            history.push("/sims/report/shelter-home")
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
            </div>

            <Card className="p-mt-0"  style={{ height: "150vh", overflowY: "auto" }}>
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
                                            <th className="main-indicator">{t("totSewaKendra")}</th>
                                            <td>{responseData.tot_sewa_kendra}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("2")}</th>
                                            <th className="main-indicator">{t("totSurvivorsSewaKendra")}</th>
                                            <td>-</td>
                                            <td>{responseData.male_survivors}</td>
                                            <td>{responseData.female_survivors}</td>
                                            <td>{responseData.others_survivors}</td>
                                        </tr>
                                        <tr>
                                            <th>{t("3")}</th>
                                            <th className="main-indicator">{t("totGbvVictims")}</th>
                                            <td>-</td>
                                            <td>{responseData.male_gbv_victims}</td>
                                            <td>{responseData.female_gbv_victims}</td>
                                            <td>{responseData.others_gbv_victims}</td>
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
export default SwaeKendra;
