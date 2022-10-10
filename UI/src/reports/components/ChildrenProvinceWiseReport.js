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

const ChildrenProvinceWiseReport = () => {
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
    trackPromise(ReportService.getChildrenProvinceData().then((response) => {
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
                  boys_population: data.boys_population,
                  girls_population: data.girls_population,
                  others_population: data.others_population,
                  boys_birth_cert_isssued: data.boys_birth_cert_isssued,
                  girls_birth_cert_isssued: data.girls_birth_cert_isssued,
                  others_birth_cert_isssued: data.others_birth_cert_isssued
                });
                
                return;
            } 
          }); 
          if(found === false) {
              provinceWiseData.push({
                province_id: provList.id,
                province_desc_eng: provList.provinceDescEng,
                province_desc_nep: provList.provinceDescNep,
                boys_population: 0,
                girls_population: 0,
                others_population: 0,
                boys_birth_cert_isssued: 0,
                girls_birth_cert_isssued: 0,
                others_birth_cert_isssued: 0
              });
          };
        });
        setProvinceWiseList(provinceWiseData);
      });

    })
    );
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
      name: "boys_population",
      label: t("boysPop"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "boys_birth_cert_isssued",
      label: t("boysBirthCertIssued"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "girls_population",
      label: t("girlsPop"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "girls_birth_cert_isssued",
      label: t("girlsBirthCertIssued"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "others_population",
      label: t("othersPop"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "others_birth_cert_isssued",
      label: t("othersBirthCertIssued"),
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
                onClick={(e) => {
                  getDistrictWiseData(value);
                }}
              />
            </React.Fragment>
          );
        },
      },
    },
  ];

  const getDistrictWiseData = (provinceId) => {
    console.log("provinceId", provinceId);
    trackPromise(
      ReportService.getChildrenDistrictData(provinceId).then((response) => {
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
      name: "boys_population",
      label: t("boysPop"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "boys_birth_cert_isssued",
      label: t("boysBirthCertIssued"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "girls_population",
      label: t("girlsPop"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "girls_birth_cert_isssued",
      label: t("girlsBirthCertIssued"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "others_population",
      label: t("othersPop"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "others_birth_cert_isssued",
      label: t("othersBirthCertIssued"),
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
                    pathname: "/sims/children-local-level-wise",
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
export default ChildrenProvinceWiseReport;
