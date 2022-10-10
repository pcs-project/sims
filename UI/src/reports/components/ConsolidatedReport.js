import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { trackPromise } from "react-promise-tracker";
import { Button } from "primereact/button";

import { useLocation } from "react-router-dom";
import FiscalQuarter from "../../utilities/components/FiscalQuarter";
import LocalProvinceDistrict from "../../utilities/components/LocalProvinceDistrict";
import ConsolidatedReportService from "../api/services/ConsolidatedReportService";

const ConsolidatedReport = () => {
    const { t } = useTranslation();

    const [fiscalYear, setFiscalYear] = useState();
    const [quarter, setQuarter] = useState();
    const [district, setDistrict] = useState();
    const [localLevel, setLocalLevel] = useState();
    const [province, setProvince] = useState();
    const [genderWiseList, setGenderWiseList] = useState([]);
    const [totalWiseList, setTotalWiseList] = useState([]);
    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
      } = useForm();
    const options = {
        filter: true,
        filterType: "dropdown",
        responsive: "vertical",
        fixedSelectColumn: false,
        selectableRows: "none",
        onRowClick: (rowData, rowMeta) => {
            console.log("rowData", rowData, rowMeta);
        },
    };

    const searchData = (data) => {
        data.fiscalYear = fiscalYear;
        data.quarter = quarter;
        data.provinceId = province;
        data.districtId = district;
        data.localLevelId = localLevel;
        console.log(data);
        trackPromise(
            ConsolidatedReportService.getGenderWiseReport(data).then((response) => {
                console.log("consolidated report data", response.data);
                setGenderWiseList(response.data);
            }),

            ConsolidatedReportService.getTotalReport(data).then((response) => {
                console.log("consolidated report data", response.data);
                setTotalWiseList(response.data);
            })
        );
      };

    const genderWiseColumns = [
        {
            name: "module",
            label: t("Indicator"),
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value;
                },
            },
        },
        {
            name: "male_count",
            label: t("male"),
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value;
                },
            },
        },
        {
            name: "female_count",
            label: t("female"),
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value;
                },
            },
        },
        {
            name: "others_count",
            label: t("others"),
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value;
                },
            },
        },
        {
            name: "total_count",
            label: t("total"),
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value;
                },
            },
        }
    ];

    const totalWiseColumns = [
        {
            name: "module",
            label: t("Indicator"),
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value;
                },
            },
        },
        {
            name: "total_count",
            label: t("total"),
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return value;
                },
            },
        }
    ];


    const handleFiscalYear = (fiscalYearVal) => {
        console.log("fiscal year  ", fiscalYearVal);
        setFiscalYear(fiscalYearVal);
      };
      const handleQuarter = (quarterVal) => {
        console.log("quarterVal  ", quarterVal);
        setQuarter(quarterVal);
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

    return (
        <>
            <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
                <div className=" p-card-content">
                    <h4 className="p-pt-0">{t("consolidatedReport")}</h4>
                </div>
            </Card>
            <Card className="p-mt-0">
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
                <div className=" p-card-content">
                    <ThemeProvider
                        theme={createTheme({
                            overrides: {
                                MUIDataTableToolbar: { root: { display: "none" } },
                            },
                        })}
                    >
                        <MUIDataTable
                            data={genderWiseList}
                            columns={genderWiseColumns}
                            options={options}
                        />

                        <MUIDataTable
                            data={totalWiseList}
                            columns={totalWiseColumns}
                            options={options}
                        />
                    </ThemeProvider>
                </div>
            </Card>
        </>
    );
};
export default ConsolidatedReport;
