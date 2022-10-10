import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { trackPromise } from "react-promise-tracker";
import { Button } from "primereact/button";

import { useLocation } from "react-router-dom";
import ReportService from "../api/services/ReportService";
import { LANGUAGE } from "../../utilities/constants/ITMISConstansts";
import i18n from "../../il8n/il8n";

const DisabledLocalLevelWiseReport = () => {
    const { t } = useTranslation();

    const [localLevelWiseList, setLocalLevelWiseList] = useState([]);
    const location = useLocation();
    const history = useHistory();
    const options = {
        filter: true,
        filterType: "dropdown",
        responsive: "vertical",
        selectableRows: "none",
        fixedSelectColumn: false,
        onRowClick: (rowData, rowMeta) => {
            console.log("rowData", rowData, rowMeta);
        },
    };

    const localLevelWiseColumns = [
      {
        name: i18n.language == LANGUAGE.ENGLISH ? "province_desc_eng" : "province_desc_nep",
        label: t("province"),
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value;
          },
        },
      },
      {
        name: i18n.language == LANGUAGE.ENGLISH ? "district_desc_eng" : "district_desc_nep",
        label: t("district"),
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value;
          },
        },
      },
      {
        name: i18n.language == LANGUAGE.ENGLISH ? "municipality_desc_eng" : "municipality_desc_nep",
        label: t("municipality"),
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return value;
          },
        },
      },
          {
            name: "disabled_children_ka",
            label: t("childrenKa"),
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return value;
              },
            },
          },
          {
            name: "disabled_adult_ka",
            label: t("adultKa"),
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return value;
              },
            },
          },
          {
            name: "disabled_senior_citizen_ka",
            label: t("seniorCitKa"),
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return value;
              },
            },
          },
          {
            name: "disabled_children_kha",
            label: t("childrenKha"),
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return value;
              },
            },
          },
          {
            name: "disabled_adult_kha",
            label: t("adultKha"),
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return value;
              },
            },
          },
          {
            name: "disabled_senior_citizen_kha",
            label: t("seniorCitKha"),
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return value;
              },
            },
          },
          {
            name: "disabled_children_ga",
            label: t("childrenGa"),
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return value;
              },
            },
          },
          {
            name: "disabled_adult_ga",
            label: t("adultGa"),
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return value;
              },
            },
          },
          {
            name: "disabled_senior_citizen_ga",
            label: t("seniorCitGa"),
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return value;
              },
            },
          },
          {
            name: "disabled_children_gha",
            label: t("childrenGha"),
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return value;
              },
            },
          },
          {
            name: "disabled_adult_gha",
            label: t("adultGha"),
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return value;
              },
            },
          },
          {
            name: "disabled_senior_citizen_gha",
            label: t("seniorCitGha"),
            options: {
              customBodyRender: (value, tableMeta, updateValue) => {
                return value;
              },
            },
          }
    ];

    useEffect(() => {
        let districtId = location.state ? location.state.districtId : "";
        console.log("districtId", districtId);
        trackPromise(
            ReportService.getDisabledLocalWiseData(districtId).then((response) => {
                console.log("response.data", response.data);
                setLocalLevelWiseList(response.data);
            })
        );
    }, []);

    return (
        <>
            <Card className="p-mt-0">
                <div className=" p-card-content">
                    <ThemeProvider
                        theme={createTheme({
                            overrides: {
                                MUIDataTableToolbar: { root: { display: "none" } },
                            },
                        })}
                    >
                        <MUIDataTable
                            title={t("localLevelWiseDetail")}
                            data={localLevelWiseList}
                            columns={localLevelWiseColumns}
                            options={options}
                        />
                    </ThemeProvider>
                </div>
            </Card>
        </>
    );
};
export default DisabledLocalLevelWiseReport;
