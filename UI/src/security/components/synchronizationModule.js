import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MODULE_LIST } from "../../utilities/constants/ITMISConstansts";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import SynchronixzationModuleService from "../api/services/SynchronizationModuleService";
import { trackPromise } from "react-promise-tracker";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

import { data } from "jquery";
import SynchronizationModuleService from "../api/services/SynchronizationModuleService";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
const SynchronizationModule = () => {
  const toast = useRef(null);
  const { t } = useTranslation();
  const [dataList, setDatalist] = useState();
  const [module, setModule] = useState();
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [columns, setColumns] = useState([
    {
      name: "firstName",
      label: "Name",
      options: {},
    },
  ]);
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
  const synchronizeData = () => {
    switch (getValues("module")) {
      case "Disabled":
        trackPromise(
          SynchronixzationModuleService.updateDisabledModuleFromDateToDate(fromDate, toDate)
            .then((response) => {
              if (response.status == 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Synchronize Successful",
                  life: 3000,
                });
                window.location.reload(false);
              }
            })
            .catch((error) => {
              // We want to handle globally
              error.handleGlobally && error.handleGlobally();
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: error.response.data.msg,
                life: 3000,
              });
            })
        );
        break;
      case "Children":
        trackPromise(
          SynchronixzationModuleService.updateChildrenFromDateToDate(fromDate, toDate)
            .then((response) => {
              if (response.status == 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Synchronize Successful",
                  life: 3000,
                });
                window.location.reload(false);
              }
            })
            .catch((error) => {
              // We want to handle globally
              error.handleGlobally && error.handleGlobally();
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: error.response.data.msg,
                life: 3000,
              });
            })
        );
        break;
      case "ChildCorrectionHome":
        trackPromise(
          SynchronixzationModuleService.updateChildCorrectionHomeFromDateToDate(fromDate, toDate)
            .then((response) => {
              if (response.status == 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Synchronize Successful",
                  life: 3000,
                });
                window.location.reload(false);
              }
            })
            .catch((error) => {
              // We want to handle globally
              error.handleGlobally && error.handleGlobally();
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: error.response.data.msg,
                life: 3000,
              });
            })
        );
        break;
      case "ChildHome":
        trackPromise(
          SynchronixzationModuleService.updateChildHomeFromDateToDate(fromDate, toDate)
            .then((response) => {
              if (response.status == 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Synchronize Successful",
                  life: 3000,
                });
                window.location.reload(false);
              }
            })
            .catch((error) => {
              // We want to handle globally
              error.handleGlobally && error.handleGlobally();
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: error.response.data.msg,
                life: 3000,
              });
            })
        );
        break;
      case "ComplaintRegistration":
        trackPromise(
          SynchronixzationModuleService.updateComplaintRegistrationFromDateToDate(fromDate, toDate)
            .then((response) => {
              if (response.status == 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Synchronize Successful",
                  life: 3000,
                });
                window.location.reload(false);
              }
            })
            .catch((error) => {
              // We want to handle globally
              error.handleGlobally && error.handleGlobally();
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: error.response.data.msg,
                life: 3000,
              });
            })
        );
        break;
      case "ShelterHome":
        trackPromise(
          SynchronixzationModuleService.updateShelterHomeFromDateToDate(fromDate, toDate)
            .then((response) => {
              if (response.status == 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Synchronize Successful",
                  life: 3000,
                });
                window.location.reload(false);
              }
            })
            .catch((error) => {
              // We want to handle globally
              error.handleGlobally && error.handleGlobally();
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: error.response.data.msg,
                life: 3000,
              });
            })
        );
        break;

        case "SewaKendra":
          trackPromise(
            SynchronixzationModuleService.updateSewaKendraFromDateToDate(fromDate, toDate)
              .then((response) => {
                if (response.status == 200) {
                  toast.current.show({
                    severity: "success",
                    summary: "Success Message",
                    detail: "Synchronize Successful",
                    life: 3000,
                  });
                  window.location.reload(false);
                }
              })
              .catch((error) => {
                // We want to handle globally
                error.handleGlobally && error.handleGlobally();
                toast.current.show({
                  severity: "error",
                  summary: "Error Message",
                  detail: error.response.data.msg,
                  life: 3000,
                });
              })
          );
          break;
      case "LabourMigrationCaseForm":
        trackPromise(
          SynchronixzationModuleService.updateLabourMigrationCaseFormFromDateToDate(
            fromDate,
            toDate
          )
            .then((response) => {
              if (response.status == 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Synchronize Successful",
                  life: 3000,
                });
                window.location.reload(false);
              }
            })
            .catch((error) => {
              // We want to handle globally
              error.handleGlobally && error.handleGlobally();
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: error.response.data.msg,
                life: 3000,
              });
            })
        );
        break;
      case "LabourMigrationIndicator":
        trackPromise(
          SynchronixzationModuleService.updateLabourMigrationIndicatorFromDateToDate(
            fromDate,
            toDate
          )
            .then((response) => {
              if (response.status == 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Synchronize Successful",
                  life: 3000,
                });
                window.location.reload(false);
              }
            })
            .catch((error) => {
              // We want to handle globally
              error.handleGlobally && error.handleGlobally();
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: error.response.data.msg,
                life: 3000,
              });
            })
        );
        break;
      case "OldAgeHome":
        trackPromise(
          SynchronixzationModuleService.updateOldAgeHomeFromDateToDate(fromDate, toDate)
            .then((response) => {
              if (response.status == 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Synchronize Successful",
                  life: 3000,
                });
                window.location.reload(false);
              }
            })
            .catch((error) => {
              // We want to handle globally
              error.handleGlobally && error.handleGlobally();
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: error.response.data.msg,
                life: 3000,
              });
            })
        );
        break;
      case "SeniorCitizen":
        trackPromise(
          SynchronixzationModuleService.updateSeniorCitizenFromDateToDate(fromDate, toDate)
            .then((response) => {
              if (response.status == 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Synchronize Successful",
                  life: 3000,
                });
                window.location.reload(false);
              }
            })
            .catch((error) => {
              // We want to handle globally
              error.handleGlobally && error.handleGlobally();
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: error.response.data.msg,
                life: 3000,
              });
            })
        );
        break;
      case "WomenAndMinorities":
        trackPromise(
          SynchronixzationModuleService.updateWomenAndMinoritiesFromDateToDate(fromDate, toDate)
            .then((response) => {
              if (response.status == 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Synchronize Successful",
                  life: 3000,
                });
                window.location.reload(false);
              }
            })
            .catch((error) => {
              // We want to handle globally
              error.handleGlobally && error.handleGlobally();
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: error.response.data.msg,
                life: 3000,
              });
            })
        );
        break;
      default:
    }
  };
  const SynchronizeButton = () => (
    <Tooltip disableFocusListener title="Synchronize">
      <i className="fa fa-refresh" onClick={() => synchronizeData()}></i>
    </Tooltip>
  );
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "600px",
    tableBodyMaxHeight: "",
    fixedSelectColumn: false,
    selectableRows: false,
    customToolbar: SynchronizeButton,
  };

  const onSubmit = (data) => {
    synchronizeData();
    switch (data.module) {
      case "Disabled":
        trackPromise(
          SynchronixzationModuleService.getDisabledModuleFromDateToDate(fromDate, toDate).then(
            (response) => {
              if (response.status == 200) {
                setDatalist(response.data.data);
                // toast.current.show({
                //   severity: "success",
                //   summary: "Success Message",
                //   detail: "Retrieve Successful",
                //   life: 3000,
                // });
              }
            }
          )
        ).catch((error) => console.error("Error:", error));
        break;
      case "ChildCorrectionHome":
        trackPromise(
          SynchronixzationModuleService.getChildCorrectionHomeFromDateToDate(fromDate, toDate).then(
            (response) => {
              if (response.status == 200) {
                setDatalist(response.data.data);
                // toast.current.show({
                //   severity: "success",
                //   summary: "Success Message",
                //   detail: "Retrieve Successful",
                //   life: 3000,
                // });
              }
            }
          )
        ).catch((error) => console.error("Error:", error));
        break;
      case "ChildHome":
        trackPromise(
          SynchronixzationModuleService.getChildHomeFromDateToDate(fromDate, toDate).then(
            (response) => {
              if (response.status == 200) {
                setDatalist(response.data.data);
                // toast.current.show({
                //   severity: "success",
                //   summary: "Success Message",
                //   detail: "Retrieve Successful",
                //   life: 3000,
                // });
              }
            }
          )
        ).catch((error) => console.error("Error:", error));
        break;
      case "Children":
        trackPromise(
          SynchronixzationModuleService.getChildrenFromDateToDate(fromDate, toDate).then(
            (response) => {
              if (response.status == 200) {
                setDatalist(response.data.data);
                // toast.current.show({
                //   severity: "success",
                //   summary: "Success Message",
                //   detail: "Retrieve Successful",
                //   life: 3000,
                // });
              }
            }
          )
        ).catch((error) => console.error("Error:", error));
        break;
      case "ComplaintRegistration":
        trackPromise(
          SynchronixzationModuleService.getComplaintRegistrationFromDateToDate(
            fromDate,
            toDate
          ).then((response) => {
            if (response.status == 200) {
              setDatalist(response.data.data);
              // toast.current.show({
              //   severity: "success",
              //   summary: "Success Message",
              //   detail: "Retrieve Successful",
              //   life: 3000,
              // });
            }
          })
        ).catch((error) => console.error("Error:", error));
        break;
      case "ShelterHome":
        trackPromise(
          SynchronixzationModuleService.getShelterHomeFromDateToDate(fromDate, toDate).then(
            (response) => {
              if (response.status == 200) {
                setDatalist(response.data.data);
                // toast.current.show({
                //   severity: "success",
                //   summary: "Success Message",
                //   detail: "Retrieve Successful",
                //   life: 3000,
                // });
              }
            }
          )
        ).catch((error) => console.error("Error:", error));
        break;
      case "SewaKendra":
        trackPromise(
          SynchronixzationModuleService.getSewaKendraFromDateToDate(fromDate, toDate).then(
            (response) => {
              if (response.status == 200) {
                setDatalist(response.data.data);
                // toast.current.show({
                //   severity: "success",
                //   summary: "Success Message",
                //   detail: "Retrieve Successful",
                //   life: 3000,
                // });
              }
            }
          )
        ).catch((error) => console.error("Error:", error));
        break;
      case "LabourMigrationCaseForm":
        trackPromise(
          SynchronixzationModuleService.getLabourMigrationCaseFormFromDateToDate(
            fromDate,
            toDate
          ).then((response) => {
            if (response.status == 200) {
              setDatalist(response.data.data);
              // toast.current.show({
              //   severity: "success",
              //   summary: "Success Message",
              //   detail: "Retrieve Successful",
              //   life: 3000,
              // });
            }
          })
        ).catch((error) => console.error("Error:", error));
        break;
        break;
      case "LabourMigrationIndicator":
        trackPromise(
          SynchronixzationModuleService.getLabourMigrationIndicatorFromDateToDate(
            fromDate,
            toDate
          ).then((response) => {
            if (response.status == 200) {
              setDatalist(response.data.data);
              // toast.current.show({
              //   severity: "success",
              //   summary: "Success Message",
              //   detail: "Retrieve Successful",
              //   life: 3000,
              // });
            }
          })
        ).catch((error) => console.error("Error:", error));
        break;
      case "OldAgeHome":
        trackPromise(
          SynchronixzationModuleService.getOldAgeHomeFromDateToDate(fromDate, toDate).then(
            (response) => {
              if (response.status == 200) {
                setDatalist(response.data.data);
                // toast.current.show({
                //   severity: "success",
                //   summary: "Success Message",
                //   detail: "Retrieve Successful",
                //   life: 3000,
                // });
              }
            }
          )
        ).catch((error) => console.error("Error:", error));
        break;
      case "SeniorCitizen":
        trackPromise(
          SynchronixzationModuleService.getSeniorCitizenFromDateToDate(fromDate, toDate).then(
            (response) => {
              if (response.status == 200) {
                setDatalist(response.data.data);
                // toast.current.show({
                //   severity: "success",
                //   summary: "Success Message",
                //   detail: "Retrieve Successful",
                //   life: 3000,
                // });
              }
            }
          )
        ).catch((error) => console.error("Error:", error));
        break;
      case "WomenAndMinorities":
        trackPromise(
          SynchronixzationModuleService.getWomenAndMinoritiesFromDateToDate(fromDate, toDate).then(
            (response) => {
              if (response.status == 200) {
                setDatalist(response.data.data);
                // toast.current.show({
                //   severity: "success",
                //   summary: "Success Message",
                //   detail: "Retrieve Successful",
                //   life: 3000,
                // });
              }
            }
          )
        ).catch((error) => console.error("Error:", error));
        break;
      default:
    }
  };

  const getFromDateofModule = (module) => {
    setModule(module);
    switch (module) {
      case "Disabled":
        setColumns([
          {
            name: "fiscalYear",
            label: "Fiscal Year",
            options: {},
          },
          {
            name: "entryDate",
            label: "Entry Date",
            options: {},
          },
        ]);
        SynchronizationModuleService.getDisabledModuleLastSynchronizedDate().then((response) => {
          console.log("from date disabled", new Date(moment(response.data.data).format("YYYY-MM-DD")));
          if ((response.status == 200) & (response.data.data != undefined)) {
            setFromDate(moment(response.data.data).format("YYYY-MM-DD"));
            setValue("fromDate", new Date(moment(response.data.data).format("YYYY-MM-DD")));
          } else {
            setValue("fromDate", null);
          }
        });
        break;
      case "ChildCorrectionHome":
        setColumns([
          {
            name: "fiscalYear",
            label: "Fiscal Year",
            options: {},
          },
          {
            name: "entryDate",
            label: "Entry Date",
            options: {},
          },
        ]);
        SynchronizationModuleService.getChildCorrectionHomeSynchronizedDate().then((response) => {
          if ((response.status == 200) & (response.data.data != undefined)) {
            setFromDate(moment(response.data.data).format("YYYY-MM-DD"));
            setValue("fromDate", new Date(moment(response.data.data).format("YYYY-MM-DD")));
          } else {
            setValue("fromDate", null);
          }
        });
        break;
      case "ChildHome":
        setColumns([
          {
            name: "fiscalYear",
            label: "Fiscal Year",
            options: {},
          },
          {
            name: "entryDate",
            label: "Entry Date",
            options: {},
          },
        ]);
        SynchronizationModuleService.getChildHomeSynchronizedDate().then((response) => {
          if ((response.status == 200) & (response.data.data != undefined)) {
            setFromDate(moment(response.data.data).format("YYYY-MM-DD"));
            setValue("fromDate", new Date(moment(response.data.data).format("YYYY-MM-DD")));
          } else {
            setValue("fromDate", null);
          }
        });
        break;
      case "Children":
        setColumns([
          {
            name: "fiscalYear",
            label: "Fiscal Year",
            options: {},
          },
          {
            name: "entryDate",
            label: "Entry Date",
            options: {},
          },
        ]);
        SynchronizationModuleService.getChildrenSynchronizedDate().then((response) => {
          if ((response.status == 200) & response.data.data) {
            setFromDate(moment(response.data.data).format("YYYY-MM-DD"));
            setValue("fromDate", new Date(moment(response.data.data).format("YYYY-MM-DD")));
          } else {
            setValue("fromDate", null);
          }
        });
        break;
      case "ComplaintRegistration":
        setColumns([
          {
            name: "fiscalYear",
            label: "Fiscal Year",
            options: {},
          },
          {
            name: "entryDate",
            label: "Entry Date",
            options: {},
          },
        ]);
        SynchronizationModuleService.getComplaintRegistrationSynchronizedDate().then((response) => {
          if ((response.status == 200) & response.data.data) {
            setFromDate(moment(response.data.data).format("YYYY-MM-DD"));
            setValue("fromDate", new Date(moment(response.data.data).format("YYYY-MM-DD")));
          } else {
            setValue("fromDate", null);
          }
        });
        break;
      case "ShelterHome":
        setColumns([
          {
            name: "fiscalYear",
            label: "Fiscal Year",
            options: {},
          },
          {
            name: "entryDate",
            label: "Entry Date",
            options: {},
          },
        ]);
        SynchronizationModuleService.getShelterHomeSynchronizedDate().then((response) => {
          if ((response.status == 200) & response.data.data) {
            setFromDate(moment(response.data.data).format("YYYY-MM-DD"));
            setValue("fromDate", new Date(moment(response.data.data).format("YYYY-MM-DD")));
          } else {
            setValue("fromDate", null);
          }
        });
        break;
      case "SewaKendra":
        setColumns([
          {
            name: "fiscalYear",
            label: "Fiscal Year",
            options: {},
          },
          {
            name: "entryDate",
            label: "Entry Date",
            options: {},
          },
        ]);
        SynchronizationModuleService.getSewaKendraSynchronizedDate().then((response) => {
          if ((response.status == 200) & response.data.data) {
            setFromDate(moment(response.data.data).format("YYYY-MM-DD"));
            setValue("fromDate", new Date(moment(response.data.data).format("YYYY-MM-DD")));
          } else {
            setValue("fromDate", null);
          }
        });
        break;
      case "LabourMigrationCaseForm":
        setColumns([
          // {
          //   name: "fiscalYear",
          //   label: "Fiscal Year",
          //   options: {},
          // },
          {
            name: "entryDate",
            label: "Entry Date",
            options: {},
          },
        ]);
        SynchronizationModuleService.getLabourMigrationIndicatorSynchronizedDate().then(
          (response) => {
            if ((response.status == 200) & response.data.data) {
              setFromDate(moment(response.data.data).format("YYYY-MM-DD"));
              setValue("fromDate", new Date(moment(response.data.data).format("YYYY-MM-DD")));
            } else {
              setValue("fromDate", null);
            }
          }
        );
        break;
      case "LabourMigrationIndicator":
        setColumns([
          {
            name: "fiscalYear",
            label: "Fiscal Year",
            options: {},
          },
          {
            name: "entryDate",
            label: "Entry Date",
            options: {},
          },
        ]);
        SynchronizationModuleService.getLabourMigrationIndicatorSynchronizedDate().then(
          (response) => {
            if ((response.status == 200) & response.data.data) {
              setFromDate(moment(response.data.data).format("YYYY-MM-DD"));
              setValue("fromDate", new Date(moment(response.data.data).format("YYYY-MM-DD")));
            } else {
              setValue("fromDate", null);
            }
          }
        );
        break;
      case "OldAgeHome":
        setColumns([
          {
            name: "fiscalYear",
            label: "Fiscal Year",
            options: {},
          },
          {
            name: "entryDate",
            label: "Entry Date",
            options: {},
          },
        ]);
        SynchronizationModuleService.getOldAgeHomeSynchronizedDate().then((response) => {
          if ((response.status == 200) & response.data.data) {
            setFromDate(moment(response.data.data).format("YYYY-MM-DD"));
            setValue("fromDate", new Date(moment(response.data.data).format("YYYY-MM-DD")));
          } else {
            setValue("fromDate", null);
          }
        });
        break;
      case "SeniorCitizen":
        setColumns([
          {
            name: "fiscalYear",
            label: "Fiscal Year",
            options: {},
          },
          {
            name: "entryDate",
            label: "Entry Date",
            options: {},
          },
        ]);
        SynchronizationModuleService.getSeniorCitizenSynchronizedDate().then((response) => {
          if ((response.status == 200) & response.data.data) {
            setFromDate(moment(response.data.data).format("YYYY-MM-DD"));
            setValue("fromDate", new Date(moment(response.data.data).format("YYYY-MM-DD")));
          } else {
            setValue("fromDate", null);
          }
        });
        break;

      case "WomenAndMinorities":
        setColumns([
          {
            name: "fiscalYear",
            label: "Fiscal Year",
            options: {},
          },
          {
            name: "entryDate",
            label: "Entry Date",
            options: {},
          },
        ]);
        SynchronizationModuleService.getWomenAndMinoritiesSynchronizedDate().then((response) => {
          if ((response.status == 200) & response.data.data) {
            setFromDate(moment(response.data.data).format("YYYY-MM-DD"));
            setValue("fromDate", new Date(moment(response.data.data).format("YYYY-MM-DD")));
          } else {
            setValue("fromDate", null);
          }
        });
        break;
      default:
    }
  };
  return (
    <>
      <Toast ref={toast} />
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className=" p-card-content">
          <h4 className="p-pt-0">{t("synchronizationModule")}</h4>
        </div>
      </Card>
      <Card className="p-mt-0">
        <form className="p-grid p-fluid p-mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-3 p-md-3">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("module")}:</div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="module"
                  control={control}
                  rules={{ required: "Module is required." }}
                  render={({ field, fieldState }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                        getFromDateofModule(e.value);
                      }}
                      style={{ width: "100%" }}
                      options={MODULE_LIST}
                      optionLabel="moduleName"
                      optionValue="moduleId"
                    />
                  )}
                />
              </div>
            </div>
            <div className="p-col-3 p-md-3">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("fromDate")}:</div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="fromDate"
                  control={control}
                  rules={{ required: "From Date is required." }}
                  render={({ field, fieldState }) => (
                    <Calendar
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                        //  console.log(moment(e.value).format("YYYY-MM-DD"));
                        setFromDate(moment(e.value).format("YYYY-MM-DD"));
                      }}
                      style={{ width: "100%" }}
                      showIcon
                      showButtonBar
                      maxDate={new Date()}
                      dateFormat="yy-mm-dd"
                      // disabled={getValues("fromDate") ? true : false}
                    />
                  )}
                />
                {getFormErrorMessage("fromDate")}
              </div>
            </div>
            <div className="p-col-3 p-md-3">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("toDate")}:</div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="toDate"
                  rules={{ required: "To Date is required." }}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Calendar
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                        setToDate(moment(e.value).format("YYYY-MM-DD"));
                      }}
                      style={{ width: "100%" }}
                      showIcon
                      showButtonBar
                      maxDate={new Date()}
                      dateFormat="yy-mm-dd"
                    />
                  )}
                />
                {getFormErrorMessage("toDate")}
              </div>
            </div>
            <div className="p-col-3 p-md-3">
              <div className="p-field p-col-12 p-md-12 float-left main-label">&nbsp;</div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Button
                  style={{ background: "#4e70ae", color: "#FFF", justifyContent: "center" }}
                  // onClick={() => idCardPage()}
                >
                   {t("getDetailsAndSynchronize")} 
                </Button>
              </div>
            </div>
          </div>
        </form>
        {module ? (
          <div className=" p-card-content">
            <ThemeProvider
              theme={createTheme({
                overrides: {
                  MUIDataTableToolbar: { root: { display: "none" } },
                },
              })}
            >
              <MUIDataTable data={dataList} columns={columns} options={options} />
            </ThemeProvider>
          </div>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};
export default SynchronizationModule;
