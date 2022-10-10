import { createTheme, ThemeProvider } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { Card } from "primereact/card";
import { Toast } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { trackPromise } from "react-promise-tracker";
import { useHistory } from "react-router-dom";
import OrganizationService from "../api/services/OrganizationService";
import React, { useState, useRef, useEffect } from "react";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Nepali from "nepalify-react";
import { classNames } from "primereact/utils";
const Organization = () => {
  const { t } = useTranslation();
  const [organizationList, setOrganizationList] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);

  const history = useHistory();
  const toast = useRef(null);

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "all",
  });
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "600px",
    tableBodyMaxHeight: "",
    fixedSelectColumn: false,
    selectableRows: false,
  };

  useEffect(() => {
    trackPromise(
      OrganizationService.getAllOrganizationByLevel().then((response) => {
        setOrganizationList(response.data.data);
      })
    );
  }, []);
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {},
    },
    {
      name: "nameNep",
      label: "Name Nepali",
      options: {},
    },
    {
      name: "subDetailsEng",
      label: "Sub Details Eng",
      options: {},
    },
    {
      name: "subDetailsNep",
      label: "Sub Details Nep",
      options: {},
    },
    {
      name: "organizationId",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
              <Tooltip target=".tooltip-icon" />
              <i
                className="pi pi-pencil tooltip-icon p-mr-2 "
                data-pr-tooltip="Update Details"
                data-pr-position="right"
                data-pr-at="right+5 top"
                data-pr-my="left center-2"
                onClick={() => {
                  reset({
                    subDetailsEng: "",
                    subDetailsNep: "",
                    organizationId: "",
                  });
                  setUpdateModal(true);
                  setValue("subDetailsEng", tableMeta.rowData[2]);
                  setValue("subDetailsNep", tableMeta.rowData[3]);
                  setValue("organizationId", value);
                }}
              />
            </React.Fragment>
          );
        },
      },
    },
  ];

  const onSubmit = (data) => {
    console.log("==", data);
    trackPromise(
      OrganizationService.updateSubDetailsOrganizationDetails(data)
        .then((response) => {
          if (response.status == 200) {
            setUpdateModal(false);
            // toast.current.show({
            //   severity: "success",
            //   summary: "Success Message",
            //   detail: "Submit Successful",
            //   life: 3000,
            // });

            window.location.reload(false);
          }
        })
        .catch((error) => {
          // We want to handle globally
          error.handleGlobally && error.handleGlobally();
          // toast.current.show({
          //   severity: "error",
          //   summary: "Error Message",
          //   detail: error.response.data.msg,
          //   life: 3000,
          // });
          console.log("---", error);
        })
    );
  };
  return (
    <>
      <Toast ref={toast} />
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className=" p-card-content">
          <h4 className="p-pt-0">{t("organization")}</h4>
        </div>
      </Card>
      <Card className="p-mt-0" style={{ height: "80vh", overflowY: "auto" }}>
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
              data={organizationList}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </div>
      </Card>
      <Dialog
        header="Organization Details"
        visible={updateModal}
        style={{ width: "30vw" }}
        modal
        onHide={() => {
          setUpdateModal(false);
        }}
        position="top"
      >
        <div className="flex justify-content-center">
          <div className="card">
            <form className="p-fluid " onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <label htmlFor="subDetailsEng" className={classNames({ "p-error": errors.name })}>
                  Sub Details English
                </label>
                <Controller
                  name="subDetailsEng"
                  control={control}
                  rules={{ required: "Value is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className={classNames({ "p-invalid": fieldState.invalid })}
                    />
                  )}
                />

                {getFormErrorMessage("subDetailsEng")}
              </div>
              <div className="field">
                <label htmlFor="subDetailsNep" className={classNames({ "p-error": errors.name })}>
                  Sub Details Nepali
                </label>
                <Controller
                  name="subDetailsNep"
                  control={control}
                  rules={{ required: "Value is required." }}
                  render={({ field, fieldState }) => (
                    <Nepali
                      id={field.name}
                      {...field}
                      valueChange={(e, value) => {
                        setValue("subDetailsNep", value);
                      }}
                      className="rounded-input p-mb-1 p-inputtext"
                      funcname="unicodify"
                    />
                  )}
                />

                {getFormErrorMessage("subDetailsNep")}
              </div>

              <Button type="submit" label="Update" className="mt-2" />
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default Organization;
