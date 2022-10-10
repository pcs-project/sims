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
import AddressService from "../../security/api/services/AddressService";
import i18n from "../../il8n/il8n";
import { LANGUAGE } from "../../utilities/constants/ITMISConstansts";

const DisabledProvinceWiseReport = () => {
  const { t } = useTranslation();

  const [provinceWiseList, setProvinceWiseList] = useState([]);
  const [districtWiseList, setDistrictWiseList] = useState([]);
  const [districtTable, setDistrictTable] = useState("No");
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

  useEffect(() => {
    let provinceWiseData = [];
    ReportService.getDisabledProvinceData().then((response) => {
      console.log("response.data.data", response);
      AddressService.getAllProvinces().then((res) => {
        res.data.data.forEach(provList => {
          var found = false;
          response.data.forEach(data => {
            if (provList.id == data.province_id) {
              found = true;
                provinceWiseData.push({
                  province_id: data.province_id,
                  province_desc_eng: data.province_desc_eng,
                  province_desc_nep: data.province_desc_nep,
                  disabled_children_ka: data.disabled_children_ka,
                  disabled_adult_ka: data.disabled_adult_ka,
                  disabled_senior_citizen_ka: data.disabled_senior_citizen_ka,
                  disabled_children_kha: data.disabled_children_kha,
                  disabled_adult_kha: data.disabled_adult_kha,
                  disabled_senior_citizen_kha: data.disabled_senior_citizen_kha,
                  disabled_children_ga: data.disabled_children_ga,
                  disabled_adult_ga: data.disabled_adult_ga,
                  disabled_senior_citizen_ga: data.disabled_senior_citizen_ga,
                  disabled_children_gha: data.disabled_children_gha,
                  disabled_adult_gha: data.disabled_adult_gha,
                  disabled_senior_citizen_gha: data.disabled_senior_citizen_gha
                });
                
                return;
            } 
          }); 
          if(found === false) {
              provinceWiseData.push({
                province_id: provList.id,
                province_desc_eng: provList.provinceDescEng,
                province_desc_nep: provList.provinceDescNep,
                disabled_children_ka: 0,
                disabled_adult_ka: 0,
                disabled_senior_citizen_ka: 0,
                disabled_children_kha: 0,
                disabled_adult_kha: 0,
                disabled_senior_citizen_kha: 0,
                disabled_children_ga: 0,
                disabled_adult_ga: 0,
                disabled_senior_citizen_ga: 0,
                disabled_children_gha: 0,
                disabled_adult_gha: 0,
                disabled_senior_citizen_gha: 0
              });
          };
        });
        setProvinceWiseList(provinceWiseData);
      });
    });
  }, []);

  const provinceWiseColumns = [
    {
      name:  i18n.language == LANGUAGE.ENGLISH ? "province_desc_eng" : "province_desc_nep",
      label: t("province"),
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
    },
    {
      name: "province_id",
      label: t("action"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
              <Button
                className="tooltip-icon"
                label={t("districtWiseDetail")}
                onClick={(e) => getDistrictWiseData(value)}
              />
            </React.Fragment>
          );
        },
      },
    },
  ];

  const getDistrictWiseData = (provinceId) => {
    trackPromise(
      ReportService.getDisabledDistrictData(provinceId).then((response) => {
        setDistrictTable("Yes");
        console.log("response.data.data", response.data);
        setDistrictWiseList(response.data);
      })
    );
  };

  const districtWiseColumns = [
    {
      name:  i18n.language == LANGUAGE.ENGLISH ? "province_desc_eng" : "province_desc_nep",
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
    },
    {
      name: "district_id",
      label: t("action"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
              <Button
                className="tooltip-icon"
                label={t("localLevelWiseDetail")}
                onClick={() =>
                  history.push({
                    pathname: "/sims/disabled-local-level-wise",
                    state: {
                      districtId: value,
                    },
                  })
                }
              />
            </React.Fragment>
          );
        },
      },
    },
  ];

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
              title={t("provinceWiseDetail")}
              data={provinceWiseList}
              columns={provinceWiseColumns}
              options={options}
            />

            {districtTable === "Yes" ? (
              <MUIDataTable
                title={t("districtWiseDetail")}
                data={districtWiseList}
                columns={districtWiseColumns}
                options={options}
              />
            ) : (
              <></>
            )}
          </ThemeProvider>
        </div>
      </Card>
    </>
  );
};
export default DisabledProvinceWiseReport;
