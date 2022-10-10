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
import ReportService from "../api/services/ComplaintRegistrationReportService";
import AddressService from "../../security/api/services/AddressService";
import i18n from "../../il8n/il8n";
import { LANGUAGE } from "../../utilities/constants/ITMISConstansts";

const ComplaintRegistrationProvinceWise = () => {
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
    trackPromise(ReportService.getComplaintRegProvinceData().then((response) => {
      console.log("response.data.data", response.data);

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
                  tip_case_decided_by_court: data.tip_case_decided_by_court,
                  district_case_decided_by_court: data.district_case_decided_by_court,
                  tip_case_prosecuted_by_court: data.tip_case_prosecuted_by_court,
                  district_case_prosecuted_by_court: data.district_case_prosecuted_by_court
                });
                
                return;
            } 
          }); 
          if(found === false) {
              provinceWiseData.push({
                province_id: provList.id,
                province_desc_eng: provList.provinceDescEng,
                province_desc_nep: provList.provinceDescNep,
                tip_case_decided_by_court: 0,
                district_case_decided_by_court: 0,
                tip_case_prosecuted_by_court: 0,
                district_case_prosecuted_by_court: 0
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
      name: "tip_case_prosecuted_by_court",
      label: t("tipCaseProsecutedByCourt"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "tip_case_decided_by_court",
      label: t("tipCaseDecidedByCourt"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "district_case_prosecuted_by_court",
      label: t("gbvCaseProsecutedByCourt"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "district_case_decided_by_court",
      label: t("gbvCaseDecidedByCourt"),
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
      ReportService.getComplaintRegDistrictData(provinceId).then((response) => {
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
      name: "tip_case_prosecuted_by_court",
      label: t("tipCaseProsecutedByCourt"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "tip_case_decided_by_court",
      label: t("tipCaseDecidedByCourt"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "district_case_prosecuted_by_court",
      label: t("gbvCaseProsecutedByCourt"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return value;
        },
      },
    },
    {
      name: "district_case_decided_by_court",
      label: t("gbvCaseDecidedByCourt"),
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
                    pathname: "/sims/complaint-registration-local-level-wise",
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
export default ComplaintRegistrationProvinceWise;
