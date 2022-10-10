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
import ReportService from "../api/services/IdcardReportService";
import { LANGUAGE } from "../../utilities/constants/ITMISConstansts";
import i18n from "../../il8n/il8n";

const IdcardLocalLevelWise = () => {
  const { t } = useTranslation();

  const [localLevelWiseList, setLocalLevelWiseList] = useState([]);
  const location = useLocation();
  const history = useHistory();
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
      name: "disabled",
      label: t("Disabled"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "senior_citizen",
      label: t("Senior Citizen"),
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
      ReportService.getIdCardLocalWiseData(districtId).then((response) => {
        console.log("response.data", response.data);
        setLocalLevelWiseList(response.data);
      })
    );
  }, []);

  return (
    <>
      {/* <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
                <div className=" p-card-content">
                    <h4 className="p-pt-0">{t("labourMigration")}</h4>
                </div>
            </Card> */}
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
export default IdcardLocalLevelWise;
