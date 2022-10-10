import React, { useState, useRef, useEffect, useCallback } from "react";
import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import FiscalYear from "../../../utilities/components/FiscalYear";
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
const LabourMigration = () => {
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
            IndicatorReportService.getLabourMigrationData(data).then((response) => {
                console.log("old age home report", response.data);
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

			let ctx = { worksheet: 'Labour migration report.xls' || 'Worksheet', table: table1}
			// window.location.href = uri + base64(format(template, ctx));
			downloadLink.href = uri + base64(format(template, ctx));
			downloadLink.download = ('Labour migration report'||"exportedTable") + ".xls";

			document.body.appendChild(downloadLink);
			downloadLink.click();
			document.body.removeChild(downloadLink);
		}
		else
		{
			// Export to csv
			const csv = CsvExport.toCsv(table);
			// Download it
			CsvExport.csvDownload(csv, 'Labour migration report.csv');
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
                                            <th className="main-indicator">{t("totMigrantLabour")}</th>
                                            <td>-</td>
                                            <td>{responseData.male_migrant_labour}</td>
                                            <td>{responseData.female_migrant_labour}</td>
                                            <td>{responseData.other_migrant_labour}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("internal")}</th>
                                            <td>{responseData.internal_migrant_labour}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("external")}</th>
                                            <td>{responseData.external_migrant_labour}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_migrant_labour}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_migrant_labour}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_migrant_labour}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_migrant_labour}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_chettri_migrant_labour}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_migrant_labour}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("2")}</th>
                                            <th className="main-indicator">{t("totMigrantLabourToIndia")}</th>
                                            <td>-</td>
                                            <td>{responseData.male_migrant_to_india}</td>
                                            <td>{responseData.female_migrant_to_india}</td>
                                            <td>{responseData.other_migrant_to_india}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_migrant_to_india}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_migrant_to_india}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_migrant_to_india}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_migrant_to_india}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_chettri_migrant_to_india}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_migrant_labour}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th>{t("3")}</th>
                                            <th className="main-indicator">{t("totReturneeMigrant")}</th>
                                            <td>-</td>
                                            <td>{responseData.male_returnee_migrant}</td>
                                            <td>{responseData.female_returnee_migrant}</td>
                                            <td>{responseData.other_returnee_migrant}</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("dalit")}</th>
                                            <td>{responseData.dalit_returnee_migrant}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("muslim")}</th>
                                            <td>{responseData.muslim_returnee_migrant}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("janajati")}</th>
                                            <td>{responseData.janajati_returnee_migrant}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("madhesi")}</th>
                                            <td>{responseData.madhesi_returnee_migrant}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("brahminOther")}</th>
                                            <td>{responseData.brahmin_chettri_returnee_migrant}</td>
                                            <td colspan={3}>-</td>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th className="sub-indicator">{t("ethnicMinorities")}</th>
                                            <td>{responseData.ethnic_minorities_migrant_labour}</td>
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
export default LabourMigration;
