import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import { Controller, set, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { MODULE_LIST } from "../../utilities/constants/ITMISConstansts";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { trackPromise } from "react-promise-tracker";
import moment from "moment";
import FiscalYear from "../../utilities/components/FiscalYear";
import { InputTextarea } from "primereact/inputtextarea";
import Source from "../../utilities/components/Source";
import RevertModuleService from "../api/services/RevertModuleService";
import Organization from "../../utilities/components/OrganizationRevertModule";
import { DropdownButton } from "react-bootstrap";
import FiscalQuarter from "../../utilities/components/FiscalQuarter";

const RevertModule = () => {
  const toast = useRef(null);
  const { t } = useTranslation();
  const [module, setModule] = useState();
  const [fiscalYear, setFiscalYear] = useState();
  const [quarter, setQuarter] = useState();
  const [organization, setOrganization] = useState();
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
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  const [fiscalYearList, setFiscalYearList] = useState([
    {
      value: "2077-78",
      engName: t("2077/78"),
    },
    {
      value: "2078-79",
      engName: t("2078/79"),
    },
    {
      value: "2077-78",
      engName: t("2079/80"),
    },
  ]);

  const handleFiscalYear = (value) => {
    console.log("value:", value);
    setFiscalYear(value);
  };

  const handleQuarter = (value) => {
    console.log("value:", value);
    setQuarter(value);
  };

  const handleOrganization = (value) => {
    console.log("organisation", value);
    setOrganization(value);
  };

  const onSubmit = (data) => {
    data.userOrganization = organization;
    data.fiscalYear = fiscalYear;
    console.log("data before send:", data);
    switch (data.module) {
      case "Children":
        trackPromise(
          RevertModuleService.revertChildrenData(data).then((response) => {
            if (response.status == 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Revert Successful",
                life: 3000,
              });
              window.location.reload(false);
            }
          })
        ).catch((error) => console.error("Error:", error));
        break;

      case "WomenAndMinorities":
        trackPromise(
          RevertModuleService.revertWomenAndMinorites(data).then((response) => {
            if (response.status == 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Revert Successful",
                life: 3000,
              });
              window.location.reload(false);
            }
          })
        ).catch((error) => console.error("Error:", error));
        break;

      case "Disabled":
        trackPromise(
          RevertModuleService.revertDisabledData(data).then((response) => {
            if (response.status == 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Revert Successful",
                life: 3000,
              });
              window.location.reload(false);
            }
          })
        ).catch((error) => console.error("Error:", error));
        break;


      case "SeniorCitizen":
        trackPromise(
          RevertModuleService.revertSeniorCitizenData(data).then((response) => {
            if (response.status == 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Revert Successful",
                life: 3000,
              });
              window.location.reload(false);
            }
          })
        ).catch((error) => console.error("Error:", error));
        break;

      case "ShelterHome":
        data.quarter = quarter;
        trackPromise(
          RevertModuleService.revertShelterHomeData(data).then((response) => {
            if (response.status == 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Revert Successful",
                life: 3000,
              });
              window.location.reload(false);
            }
          })
        ).catch((error) => console.error("Error:", error));
        break;


        case "SewaKendra":
          data.quarter = quarter;
          trackPromise(
            RevertModuleService.revertSewaKendraData(data).then((response) => {
              if (response.status == 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Revert Successful",
                  life: 3000,
                });
                window.location.reload(false);
              }
            })
          ).catch((error) => console.error("Error:", error));
          break;

      case "OldAgeHome":
        data.quarter = quarter;
        trackPromise(
          RevertModuleService.revertOldAgeHomeData(data).then((response) => {
            if (response.status == 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Revert Successful",
                life: 3000,
              });
              window.location.reload(false);
            }
          })
        ).catch((error) => console.error("Error:", error));
        break;


      case "ChildHome":
        data.quarter = quarter;
        trackPromise(
          RevertModuleService.revertChildHomeData(data).then((response) => {
            if (response.status == 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Revert Successful",
                life: 3000,
              });
              window.location.reload(false);
            }
          })
        ).catch((error) => console.error("Error:", error));
        break;


      case "ChildCorrectionHome":
        data.quarter = quarter;
        trackPromise(
          RevertModuleService.revertChildCorrectionHomeData(data).then((response) => {
            if (response.status == 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Revert Successful",
                life: 3000,
              });
              window.location.reload(false);
            }
          })
        ).catch((error) => console.error("Error:", error));
        break;


      case "LabourMigrationIndicator":
        trackPromise(
          RevertModuleService.revertLabourMigrationData(data).then((response) => {
            if (response.status == 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Revert Successful",
                life: 3000,
              });
              window.location.reload(false);
            }
          })
        ).catch((error) => console.error("Error:", error));
        break;


      case "ComplaintRegistration":
        data.quarter = quarter;
        trackPromise(
          RevertModuleService.revertComplaintRegistrationData(data).then((response) => {
            if (response.status == 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Revert Successful",
                life: 3000,
              });
              window.location.reload(false);
            }
          })
        ).catch((error) => console.error("Error:", error));
        break;
      default:
    }
  };
  return (
    <>
      <Toast ref={toast} />
      <Card
        className="p-mb-1"
        style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}
      >
        <div className=" p-card-content">
          <h4 className="p-pt-0">{t("revertModule")}</h4>
        </div>
      </Card>
      <Card className="p-mt-0">
        <form
          className="p-grid p-fluid p-mt-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="p-grid p-col-12 p-md-12 ">
            <Organization submitOrganizationId={handleOrganization} />

            <div className="p-col-12 p-md-12">
              <div className="p-field p-col-3 p-md-3 float-left main-label">
                {t("module")}
              </div>
              <div className="p-field p-col-6 p-md-6 float-left">
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
                        //getFromDateofModule(e.value);
                      }}
                      style={{ width: "100%" }}
                      options={MODULE_LIST}
                      optionLabel="moduleName"
                      optionValue="moduleId"
                    />
                  )}
                />
              </div>
              {getFormErrorMessage("module")}
            </div>
            {/* <div className="p-field p-col-3 p-md-3 float-left main-label">
                {t("fiscalYear")}:
              </div>
              <div className="p-field p-col-3 p-md-3 float-left">
                <Controller
                  name="fiscalYear"
                  control={control}
                  rules={{ required: "Fiscal Year is required." }}
                  render={({ field, fieldState }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                        //getFromDateofModule(e.value);
                      }}
                      style={{ width: "100%" }}
                      options={fiscalYearList}
                      optionLabel="engName"
                      optionValue="value"
                    />
                  )}
                />
              </div> */}
            <FiscalQuarter
              fiscalYearValue={fiscalYear}
              handleFiscalYearState={handleFiscalYear}
              quarterValue={quarter}
              handleQuarterState={handleQuarter}
            />

            <div className="p-col-12 p-md-12">
              <div className="p-field p-col-3 p-md-3 float-left main-label">
                {t("remarks")}
              </div>
              <div className="p-field p-col-9 p-md-9 float-left">
                <Controller
                  name="remarks"
                  control={control}
                  //rules={{ required: "Reason is required." }}
                  render={({ field, fieldState }) => (
                    <InputTextarea
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      rows={5}
                      cols={50}
                      autoResize
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </div>

              <div className="p-field p-col-3 p-md-3 float-right">
                <Button
                  style={{
                    background: "#4e70ae",
                    color: "#FFF",
                    justifyContent: "center",
                  }}
                // onClick={() => idCardPage()}
                >
                  {/* {t("get")} */}
                  Revert
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
};
export default RevertModule;
