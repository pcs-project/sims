import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import JuvenileChildHomeService from "../api/services/JuvenileChildHomeService";
import { useHistory } from "react-router";
import { trackPromise } from "react-promise-tracker";

const JuvenileChildHomeList = () => {
  const { t } = useTranslation();
  const [juvenileChildHomeList, setJuvenileChildHomeList] = useState([]);
  const [displayName, setDisplayName] = useState(false);
  const history = useHistory();
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "600px",
    tableBodyMaxHeight: "",
    fixedSelectColumn: false,
    selectableRows: false,
  };
  const columns = [
    {
      name: "homeName",
      label: t("juvenileChildHome"),
      options: {},
    },
    {
      name: "firstName",
      label: t("name"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          console.log(tableMeta.rowData[1] + tableMeta.rowData[2] + tableMeta.rowData[3]);
          return tableMeta.rowData[1] + " " + tableMeta.rowData[2] + " " + tableMeta.rowData[3];
        },
        display: (displayName === true) ? true : false
      },
    },
    {
      name: "middleName",
      label: "Name",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: "lastName",
      label: "Name",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: "gender",
      label: t("gender"),
      options: {},
    },
    {
      name: "age",
      label: t("age"),
      options: {},
    },
    {
      name: "caste",
      label: t("casteEthnicity"),
      options: {},
    },
    {
      name: "juvenileCorrectionHomeId",
      label: t("actions"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
              <i
                className="pi pi-pencil tooltip-icon "
                data-pr-tooltip="Update Details"
                data-pr-position="right"
                data-pr-at="right+5 top"
                data-pr-my="left center-2"
                onClick={() =>
                  history.push({
                    pathname: "/sims/juvenial-child-home",
                    state: {
                      juvenileCorrectionHomeId: value,
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
  useEffect(() => {
    trackPromise(
      JuvenileChildHomeService.getAllList().then((response) => {
        console.log("response.data", response.data);
        setJuvenileChildHomeList(response.data);
      })
    );
  }, []);
  return (
    <>
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className=" p-card-content">
          <h4 className="p-pt-0">{t("juvenileChildHome")}</h4>
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
            label={t("Indicator")}
            onClick={() =>
              history.push("/sims/juvenial-child-home-indicator")
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
            label={t("Case form")}
            onClick={() =>
              history.push("/sims/juvenial-child-home")
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
            label={t("Case form List")}
            disabled
          />
        </div>
      </div>
      <Card className="p-mt-0">
        <div>
          <Button label={t("displayName")}
            className="p-button-sm pull-right"
            onClick={() => setDisplayName(true)}
          />
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
              //   title={"Labour Migration List"}
              data={juvenileChildHomeList}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </div>
      </Card>
    </>
  );
};
export default JuvenileChildHomeList;
