import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { useHistory } from "react-router";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";

import Name from "../../utilities/components/Name";
import AgeGroup from "../../utilities/components/AgeGroup";
import Gender from "../../utilities/components/Gender";
import Address from "../../utilities/components/Address";
import MaritalStatus from "../../utilities/components/MaritalStatus";
import NoOfChildren from "../../utilities/components/NoOfChildren";
import Education from "../../utilities/components/Education";
import { useTranslation } from "react-i18next";
import {
  LABOUR_MIGRATION_DOCUMENTED,
  LABOUR_MIGRATION_FORMAL_CONTRACT,
  LABOUR_MIGRATION_RECEIPT_AMT_PAID,
  LABOUR_MIGRATION_VISA_TYPE,
  TRUE_FALSE,
  YES_NO,
} from "../../utilities/constants/ITMISConstansts";
import AgentName from "../../utilities/components/AgentName";
import AgentAddress from "../../utilities/components/AgentAddress";
import LabourMigrationCaseFormService from "../api/services/LabourMigrationCaseFormService";
import { trackPromise } from "react-promise-tracker";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";

import UserService from "../../security/api/services/UserService";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import { InputNumber } from "primereact/inputnumber";

const LabourMigration = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const remittanceTransferList = [
    { label: t("hundi"), value: "Hundi" },
    { label: t("bankTransfer"), value: "Bank transfer" },
    { label: t("globalIME"), value: "Global IME" },
    { label: t("westernUnion"), value: "Western Union" },
    { label: t("others"), value: "Others" },
  ];
  const [durationOfStayList, setDurationOfStayList] = useState([
    {
      sno: 1,
      stayYear: "",
      stayMonth: "",
      countryName: "",
    },
  ]);

  const [empBeforeFLM, setEmpBeforeFLM] = useState(false);
  const [empAfterFLM, setEmpAfterFLM] = useState(false);
  const [remittanceTransferMethod, setRemittanceTransferMethod] = useState();

  const [update, setUpdate] = useState(false);
  const [showBtn, setShowBtn] = useState("Yes");
  const [hideBtn, setHideBtn] = useState("No");

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
    clearErrors,
  } = useForm({
    mode: "all",
  });
  const toast = useRef(null);
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };
  const getFormErrorMessageAgentDetails = (name) => {
    return (
      errors.agentDetails &&
      errors.agentDetails[name] && (
        <small className="p-error">{errors.agentDetails[name].message}</small>
      )
    );
  };

  useEffect(() => {
    UserService.getUserLevel().then((response) => {
      if (response.data.data === USER_LEVEL.LOCAL_LEVEL) {
        setHideBtn("No");
      } else {
        setHideBtn("Yes");
      }
    });

    if (props.location.state) {
      setUpdate(true);
      LabourMigrationCaseFormService.getLabourMigrationById(
        props.location.state.labourMigrationCaseFormId
      ).then((response) => {
        console.log("response ", response.data.data);
        let list = [...durationOfStayList];
        if (response.data.data.durationOfStayList) {
          list = response.data.data.durationOfStayList.map((stay, i) => {
            stay.sno = i;
            return stay;
          });
        }
        setDurationOfStayList(list);
        response.status == 200
          ? reset({
            labourMigrationCaseFormId: response.data.data.labourMigrationCaseFormId,
            firstName: response.data.data.firstName,
            middleName: response.data.data.middleName,
            lastName: response.data.data.lastName,
            gender: response.data.data.gender,
            age: response.data.data.age,
            maritalStatus: response.data.data.maritalStatus,
            noOfDaughter: response.data.data.noOfDaughter,
            noOfSon: response.data.data.noOfSon,
            educationLevel: response.data.data.educationLevel,
            skills: response.data.data.skills,
            certificates: response.data.data.certificates,
            haveReceivedLoanForReIntegration: response.data.data.haveReceivedLoanForReIntegration,
            destOfMigration: response.data.data.destOfMigration,
            reasonForMigration: response.data.data.reasonForMigration,
            countryName: response.data.data.countryName,
            stayYear: response.data.data.stayYear,
            stayMonth: response.data.data.stayMonth,
            empBeforeFLM: response.data.data.empBeforeFLM,
            empBeforeFLMPlace: response.data.data.empBeforeFLMPlace,
            empBeforeFLMDate: response.data.data.empBeforeFLMDate,
            empAfterFLM: response.data.data.empAfterFLM,
            empAfterFLMPlace: response.data.data.empAfterFLMPlace,
            empAfterFLMDate: response.data.data.empAfterFLMDate,
            noDependentFamily: response.data.data.noDependentFamily,
            incomeRange: response.data.data.incomeRange,
            remittanceTransferMethod: response.data.data.remittanceTransferMethod,
            issuesDuringMigration: response.data.data.issuesDuringMigration,
            salaryRangeDuringMigration: response.data.data.salaryRangeDuringMigration,
            remittance: response.data.data.remittance,
            amtPaidToManpower: response.data.data.amtPaidToManpower,
            visaType: response.data.data.visaType,
            futurePlans: response.data.data.futurePlans,
            occFamily: response.data.data.occFamily,
            transitRoutes: response.data.data.transitRoutes,
            agentDetails: response.data.data.agentDetails,
            province:
              response.data.data.migrantAddress && response.data.data.migrantAddress.province
                ? parseInt(response.data.data.migrantAddress.province)
                : 0,
            district:
              response.data.data.migrantAddress && response.data.data.migrantAddress.district
                ? parseInt(response.data.data.migrantAddress.district)
                : 0,
            municipality:
              response.data.data.migrantAddress && response.data.data.migrantAddress.municipality
                ? parseInt(response.data.data.migrantAddress.municipality)
                : 0,
            wardNo:
              response.data.data.migrantAddress && response.data.data.migrantAddress.wardNo
                ? parseInt(response.data.data.migrantAddress.wardNo)
                : 0,
          })
          : reset({});
      });
    }
  }, [props.location.state]);

  const saveData = (data) => {
    data.status = "Save";
    let migrantAddress = (({ province, district, municipality, wardNo }) => ({
      province,
      district,
      municipality,
      wardNo,
    }))(data);
    data.migrantAddress = migrantAddress;
    data.durationOfStayList = durationOfStayList;

    console.log("data", JSON.stringify(data));

    update ?
      trackPromise(
        LabourMigrationCaseFormService.updateData(
          props.location.state.labourMigrationCaseFormId,
          data
        )
          .then((response) => {
            if (response.status === 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Save Successful",
                life: 3000,
              });
              window.location.reload(false);
            } else {
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: "Save UnSuccessful",
                life: 3000,
              });
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
      )
      :
      trackPromise(
        LabourMigrationCaseFormService.saveData(data)
          .then((response) => {
            if (response.status === 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Save Successful",
                life: 3000,
              });
              window.location.reload(false);
            } else {
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: "Save UnSuccessful",
                life: 3000,
              });
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
  };

  const submitData = (data) => {
    data.status = "Submit";
    let migrantAddress = (({ province, district, municipality, wardNo }) => ({
      province,
      district,
      municipality,
      wardNo,
    }))(data);
    data.migrantAddress = migrantAddress;
    data.durationOfStayList = durationOfStayList;

    console.log("data", JSON.stringify(data));

    update ?
      trackPromise(
        LabourMigrationCaseFormService.updateData(
          props.location.state.labourMigrationCaseFormId,
          data
        )
          .then((response) => {
            if (response.status === 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Save Successful",
                life: 3000,
              });
              window.location.reload(false);
            } else {
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: "Save UnSuccessful",
                life: 3000,
              });
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
      )
      :
      trackPromise(
        LabourMigrationCaseFormService.saveData(data)
          .then((response) => {
            if (response.status === 200) {
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Save Successful",
                life: 3000,
              });
              window.location.reload(false);
            } else {
              toast.current.show({
                severity: "error",
                summary: "Error Message",
                detail: "Save UnSuccessful",
                life: 3000,
              });
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
  };

  // const onSubmit = (data) => {
  //   let migrantAddress = (({ province, district, municipality, wardNo }) => ({
  //     province,
  //     district,
  //     municipality,
  //     wardNo,
  //   }))(data);
  //   data.migrantAddress = migrantAddress;
  //   data.durationOfStayList = durationOfStayList;

  //   console.log("data", JSON.stringify(data));
  //   update
  //     ? trackPromise(
  //       LabourMigrationCaseFormService.updateData(
  //         props.location.state.labourMigrationCaseFormId,
  //         data
  //       )
  //         .then((response) => {
  //           if (response.status === 200) {
  //             toast.current.show({
  //               severity: "success",
  //               summary: "Success Message",
  //               detail: "Save Successful",
  //               life: 3000,
  //             });
  //             window.location.reload(false);
  //           } else {
  //             toast.current.show({
  //               severity: "error",
  //               summary: "Error Message",
  //               detail: "Save UnSuccessful",
  //               life: 3000,
  //             });
  //           }
  //         })
  //         .catch((error) => {
  //           // We want to handle globally
  //           error.handleGlobally && error.handleGlobally();
  //           toast.current.show({
  //             severity: "error",
  //             summary: "Error Message",
  //             detail: error.response.data.msg,
  //             life: 3000,
  //           });
  //         })
  //     )
  //     : trackPromise(
  //       LabourMigrationCaseFormService.saveData(data)
  //         .then((response) => {
  //           if (response.status === 200) {
  //             toast.current.show({
  //               severity: "success",
  //               summary: "Success Message",
  //               detail: "Save Successful",
  //               life: 3000,
  //             });
  //             window.location.reload(false);
  //           } else {
  //             toast.current.show({
  //               severity: "error",
  //               summary: "Error Message",
  //               detail: "Save UnSuccessful",
  //               life: 3000,
  //             });
  //           }
  //         })
  //         .catch((error) => {
  //           // We want to handle globally
  //           error.handleGlobally && error.handleGlobally();
  //           toast.current.show({
  //             severity: "error",
  //             summary: "Error Message",
  //             detail: error.response.data.msg,
  //             life: 3000,
  //           });
  //         })
  //     );
  // };

  const handleDurationOfStayAdd = (e) => {
    e.preventDefault();
    setDurationOfStayList([
      ...durationOfStayList,
      {
        sno: durationOfStayList.length + 1,
        stayYear: "",
        stayMonth: "",
        countryName: "",
      },
    ]);
  };
  const handleDurationOfStayDelete = (e, stay) => {
    e.preventDefault();
    const nDurationOfStayList = [...durationOfStayList.filter((x) => x.sno !== stay.sno)];
    nDurationOfStayList.map((nStay, index) => {
      return (nStay["sno"] = index + 1);
    });
    setDurationOfStayList(nDurationOfStayList);
  };

  const editDurationOfStayField = (value, index, field) => {
    const list = [...durationOfStayList];
    list[index][field] = value;
    setDurationOfStayList(list);
  };
  return (
    <>
      <Toast ref={toast} />
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className=" p-card-content">
          <h4 className="p-pt-0" style={{ fontWeight: "bold" }}>
            {t("labourMigration")}
          </h4>
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
              history.push("/sims/labour-migration-indicator")
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
            disabled
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
            onClick={() =>
              history.push("/sims/labour-migration-list")
            }
          />
        </div>
      </div>

      <Card className="p-mt-0">
        <div className=" p-card-content">
          <form className="p-grid p-fluid" >
            <div className="p-field p-col-12 p-md-12">
              <div className="p-field p-col-12 p-md-12">
                <h5 className="HeadingTitle">{t("personalDetails")}</h5>
              </div>
            </div>
            <Name register={register} error={errors} setValue={setValue} getValues={getValues} />
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required." }}
              render={({ field, fieldState }) => (
                <Gender
                  id={field.name}
                  {...field}
                  onValueChange={(value) => {
                    setValue("gender", value);
                  }}
                  value={getValues("gender")}
                  getValues={getValues}
                />
              )}
            />
            <div className="p-field p-col-12 p-md-12 ">{getFormErrorMessage("gender")}</div>

            {/* <Controller
              name="ageGroup"
              control={control}
              rules={{ required: "Age Group is required." }}
              render={({ field, fieldState }) => (
                <AgeGroup
                  id={field.name}
                  {...field}
                  onValueChange={(value) => {
                    setValue("ageGroup", value);
                  }}
                  value={getValues("ageGroup")}
                  getValues={getValues}
                />
              )}
            />
            <div className="p-field p-col-12 p-md-12 ">{getFormErrorMessage("ageGroup")}</div> */}

            <div className="p-grid p-col-12 p-md-12 ">
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">{t("age")}</div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="age"
                    control={control}
                    rules={{ required: "Age is required." }}
                    render={({ field, fieldState }) => (
                      <InputNumber
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        placeholder={t("age")}
                      />
                    )}
                  />
                  {getFormErrorMessage("age")}
                </div>
              </div>
            </div>

            <Address register={register} error={errors} setValue={setValue} getValues={getValues} />
            <MaritalStatus
              register={register}
              error={errors}
              setValue={setValue}
              getValues={getValues}
            />
            <NoOfChildren
              register={register}
              error={errors}
              setValue={setValue}
              getValues={getValues}
            />
            <Education
              register={register}
              error={errors}
              setValue={setValue}
              getValues={getValues}
            />
            <div className="p-grid p-col-12 p-md-12 ">
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">{t("skills")}</div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="skills"
                    control={control}
                    //   rules={{ required: "Skills is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        className="rounded-input p-mb-1"
                        placeholder={t("skillPlaceholder")}
                      />
                    )}
                  />
                  {/* {getFormErrorMessage("skills")} */}
                </div>
              </div>
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("certificates")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="certificates"
                    control={control}
                    //  rules={{ required: "Certificates is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name} {...field}
                        className="rounded-input p-mb-1"
                        placeholder={t("certificatePlaceholder")} />
                    )}
                  />
                  {/* {getFormErrorMessage("certificates")} */}
                </div>
              </div>
            </div>
            <div className="p-grid p-col-12 p-md-12 ">
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("haveReceivedLoanForReIntegration")}
                </div>
                <Controller
                  name="haveReceivedLoanForReIntegration"
                  control={control}
                  // rules={{ required: "Have Received Integration is required." }}
                  render={({ field, fieldState }) => (
                    console.log("field", field),
                    (
                      <>
                        <div className="p-field p-col-12 p-md-6 float-left">
                          <RadioButton
                            value="true"
                            name={YES_NO.YES}
                            onChange={(e) => field.onChange(e.value)}
                            checked={field.value === "true"}
                          />{" "}
                          {t("cha")}
                        </div>
                        <div className="p-field p-col-12 p-md-6 float-left">
                          <RadioButton
                            value="false"
                            name={YES_NO.NO}
                            onChange={(e) => {
                              clearErrors("haveReceivedLoanForReIntegration");
                              field.onChange(e.value);
                            }}
                            checked={field.value == "false"}
                          />{" "}
                          {t("chaina")}
                        </div>
                      </>
                    )
                  )}
                />
                {getFormErrorMessage("haveReceivedLoanForReIntegration")}
              </div>
            </div>
            <div className="p-grid p-col-12 p-md-12 ">
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("destMigration")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="destOfMigration"
                    control={control}
                    // rules={{ required: "Destination Migration is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessage("destOfMigration")}
                </div>
              </div>
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("reasonForMigration")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="reasonForMigration"
                    control={control}
                    // rules={{ required: "Reason for Migration is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessage("reasonForMigration")}
                </div>
              </div>
            </div>
            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("durationOfStay")}
              </div>
              {durationOfStayList.map((stay, i) => {
                return (
                  <>
                    <div className="p-field p-col-3 p-col-3 float-left">
                      <Controller
                        name="countryName"
                        control={control}
                        //  rules={{ required: "Country is required." }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            value={stay.countryName}
                            className="rounded-input p-mb-1"
                            placeholder={t("country")}
                            onChange={(e) =>
                              editDurationOfStayField(e.target.value, i, "countryName")
                            }
                          />
                        )}
                      />
                      {getFormErrorMessage("countryName")}
                    </div>
                    <div className="p-field p-col-3 p-col-3 float-left">
                      <Controller
                        name="stayYear"
                        control={control}
                        // rules={{ required: "Year is required." }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className="rounded-input p-mb-1"
                            placeholder={t("year")}
                            value={stay.stayYear}
                            onChange={(e) => editDurationOfStayField(e.target.value, i, "stayYear")}
                          />
                        )}
                      />
                      {getFormErrorMessage("stayYear")}
                    </div>
                    <div className="p-field p-col-3 p-col-3 float-left">
                      <Controller
                        name="stayMonth"
                        control={control}
                        // rules={{ required: "Month is required." }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            className="rounded-input p-mb-1"
                            placeholder={t("month")}
                            value={stay.stayMonth}
                            onChange={(e) =>
                              editDurationOfStayField(e.target.value, i, "stayMonth")
                            }
                          />
                        )}
                      />
                      {getFormErrorMessage("stayMonth")}
                    </div>

                    <div className="p-field p-col-3 p-col-3 float-left">
                      {i < durationOfStayList.length - 1 ? (
                        <Button
                          icon="pi pi-trash"
                          onClick={(e) => {
                            handleDurationOfStayDelete(e, stay);
                          }}
                          className="w-50 p-button-danger"
                        />
                      ) : (
                        <Button
                          icon="pi pi-plus"
                          onClick={handleDurationOfStayAdd}
                          className="w-50"
                        />
                      )}
                    </div>
                  </>
                );
              })}
            </div>
            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("empBeforeFLM")}
              </div>
              <Controller
                name="empBeforeFLM"
                control={control}
                // rules={{ required: "Emp Before FLM is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="p-field p-col-3 p-md-3 float-left">
                      <RadioButton
                        value={TRUE_FALSE.TRUE}
                        name={YES_NO.YES}
                        onChange={(e) => {
                          field.onChange(e.value);
                          setEmpBeforeFLM(e.value);
                        }}
                        checked={field.value == TRUE_FALSE.TRUE}
                      />{" "}
                      {t("yes")}
                    </div>
                    <div className="p-field p-col-3 p-col-3 float-left">
                      <RadioButton
                        value={TRUE_FALSE.FALSE}
                        name={YES_NO.NO}
                        onChange={(e) => {
                          field.onChange(e.value);
                          setEmpBeforeFLM(e.value);
                        }}
                        checked={field.value == TRUE_FALSE.FALSE}
                      />{" "}
                      {t("no")}
                    </div>
                  </>
                )}
              />

              {getValues("empBeforeFLM") == TRUE_FALSE.TRUE ? (
                <>
                  <div className="p-field p-col-3 p-col-3 float-left">
                    <Controller
                      name="empBeforeFLMPlace"
                      control={control}
                      // rules={{ required: "Place is required." }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          className="rounded-input p-mb-1"
                          placeholder={t("place")}
                        />
                      )}
                    />
                    {getFormErrorMessage("empBeforeFLMPlace")}
                  </div>
                  <div className="p-field p-col-3 p-col-3 float-left">
                    <Controller
                      name="empBeforeFLMDate"
                      control={control}
                      // rules={{ required: "Place is required." }}
                      render={({ field, fieldState }) => (
                        // <InputText
                        //   id={field.name}
                        //   {...field}
                        //   className="rounded-input p-mb-1"
                        //   placeholder={t("date")}
                        // />
                        <NepaliDatePicker
                          inputClassName="p-inputtext form-control"
                          className=""
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                          options={{ calenderLocale: "en", valueLocale: "en" }}
                        />
                      )}
                    />
                    {getFormErrorMessage("empBeforeFLMDate")}
                  </div>
                </>
              ) : (
                <></>
              )}
              {getFormErrorMessage("empBeforeFLM")}
            </div>
            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("empAfterFLM")}
              </div>
              <Controller
                name="empAfterFLM"
                control={control}
                // rules={{ required: "Emp After FLM Integration is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="p-field p-col-3 p-md-3 float-left">
                      <RadioButton
                        value={TRUE_FALSE.TRUE}
                        name={YES_NO.YES}
                        onChange={(e) => {
                          field.onChange(e.value);
                          setEmpAfterFLM(true);
                        }}
                        checked={field.value == TRUE_FALSE.TRUE}
                      />
                      {t("yes")}
                    </div>
                    <div className="p-field p-col-3 p-md-3 float-left">
                      <RadioButton
                        value={TRUE_FALSE.FALSE}
                        name={YES_NO.NO}
                        onChange={(e) => {
                          field.onChange(e.value);
                          setEmpAfterFLM(false);
                        }}
                        checked={field.value == TRUE_FALSE.FALSE}
                      />{" "}
                      {t("no")}
                    </div>
                  </>
                )}
              />

              {getValues("empAfterFLM") == TRUE_FALSE.TRUE ? (
                <>
                  <div className="p-field p-col-3 p-col-3 float-left">
                    <Controller
                      name="empAfterFLMPlace"
                      control={control}
                      // rules={{ required: "Place is required." }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          className="rounded-input p-mb-1"
                          placeholder={t("place")}
                        />
                      )}
                    />
                    {getFormErrorMessage("empAfterFLMPlace")}
                  </div>
                  <div className="p-field p-col-3 p-col-3 float-left">
                    <Controller
                      name="empAfterFLMDate"
                      control={control}
                      // rules={{ required: "Place is required." }}
                      render={({ field, fieldState }) => (
                        // <InputText
                        //   id={field.name}
                        //   {...field}
                        //   className="rounded-input p-mb-1"
                        //   placeholder={t("date")}
                        // />
                        <NepaliDatePicker
                          inputClassName="p-inputtext form-control"
                          className=""
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                          }}
                          options={{ calenderLocale: "en", valueLocale: "en" }}
                        />
                      )}
                    />
                    {getFormErrorMessage("empAfterFLMDate")}
                  </div>
                </>
              ) : (
                <></>
              )}
              {getFormErrorMessage("empAfterFLM")}
            </div>
            <div className="p-grid p-col-12 p-md-12 ">
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("noDependentFamily")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="noDependentFamily"
                    control={control}
                    // rules={{ required: "No of dependent is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessage("noDependentFamily")}
                </div>
              </div>
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("incomeRange")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="incomeRange"
                    control={control}
                    // rules={{ required: "Income Range is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessage("incomeRange")}
                </div>
              </div>
            </div>
            <div className="p-grid p-col-12 p-md-12 ">
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("remittanceTransferMethod")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="remittanceTransferMethod"
                    control={control}
                    // rules={{ required: "Remittance Transferred Method is required." }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        {...field}
                        optionLabel="label"
                        value={field.value}
                        options={remittanceTransferList}
                      // onChange={(e) => setRemittanceTransferMethod(e.value)}
                      />
                    )}
                  />
                  {getFormErrorMessage("remittanceTransferMethod")}
                </div>
              </div>
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("issuesDuringMigration")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="issuesDuringMigration"
                    control={control}
                    // rules={{ required: "Issues During Migration  is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessage("issuesDuringMigration")}
                </div>
              </div>
            </div>
            <div className="p-grid p-col-12 p-md-12 ">
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("salaryRangeDuringMigration")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="salaryRangeDuringMigration"
                    control={control}
                    // rules={{ required: "Salary During Migration  is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessage("salaryRangeDuringMigration")}
                </div>
              </div>
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("remittance")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <div className="p-inputgroup">
                    <Controller
                      name="remittance"
                      control={control}
                      // rules={{ required: "Remittance is required." }}
                      render={({ field, fieldState }) => (
                        <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                      )}
                    />

                    <span className="p-inputgroup-addon">%</span>
                  </div>
                  {getFormErrorMessage("remittance")}
                </div>
              </div>
            </div>
            <div className="p-grid p-col-12 p-md-12 ">
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("amtPaidToManpower")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="amtPaidToManpower"
                    control={control}
                    // rules={{ required: "Amt Paid to Manpower is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessage("amtPaidToManpower")}
                </div>
              </div>
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("visaType")}
                </div>
                <Controller
                  name="visaType"
                  control={control}
                  // rules={{ required: "Visa Type to Manpower is required." }}
                  render={({ field, fieldState }) => (
                    <>
                      <div className="p-field p-col-4 p-md-4 float-left">
                        <RadioButton
                          value={LABOUR_MIGRATION_VISA_TYPE.MANPOWER}
                          name={LABOUR_MIGRATION_VISA_TYPE.MANPOWER}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          checked={field.value == LABOUR_MIGRATION_VISA_TYPE.MANPOWER}
                        />{" "}
                        {t("manpower")}
                      </div>
                      <div className="p-field p-col-4 p-md-4 float-left">
                        <RadioButton
                          value={LABOUR_MIGRATION_VISA_TYPE.INDIVIDUAL}
                          name={LABOUR_MIGRATION_VISA_TYPE.INDIVIDUAL}
                          checked={field.value == LABOUR_MIGRATION_VISA_TYPE.INDIVIDUAL}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                        />{" "}
                        {t("individual")}
                      </div>
                      <div className="p-field p-col-4 p-md-4 float-left">
                        <RadioButton
                          value={LABOUR_MIGRATION_VISA_TYPE.VISIT_VISA}
                          name={LABOUR_MIGRATION_VISA_TYPE.VISIT_VISA}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          checked={field.value == LABOUR_MIGRATION_VISA_TYPE.VISIT_VISA}
                        />{" "}
                        {t("visitVisa")}
                      </div>
                    </>
                  )}
                />
                {getFormErrorMessage("visaType")}
              </div>
            </div>
            <div className="p-grid p-col-12 p-md-12">
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("futurePlans")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="futurePlans"
                    control={control}
                    // rules={{ required: "Future Plans is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessage("futurePlans")}
                </div>
              </div>
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("occFamily")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="occFamily"
                    control={control}
                    // rules={{ required: "Value is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessage("occFamily")}
                </div>
              </div>
            </div>
            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("transitRoutes")}
              </div>
              <div className="p-field p-col-6 p-col-6 float-left">
                <Controller
                  name="transitRoutes"
                  control={control}
                  // rules={{ required: "Transit Routes is required." }}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                  )}
                />
                {getFormErrorMessage("transitRoutes")}
              </div>
            </div>
            <div className="p-field p-col-12 p-md-12 ">
              <h3 style={{ textAlign: "center" }}>{t("agentDetail")}</h3>
            </div>
            <AgentName
              register={register}
              error={errors}
              setValue={setValue}
              getValues={getValues}
            />

            <div className="p-grid p-col-12 p-md-12 ">
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("contactNumber")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.contactNumber"
                    control={control}
                    // rules={{ required: "Contact Number is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("contactNumber")}
                </div>
              </div>
              <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("recAgencyName")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.recAgencyName"
                    control={control}
                    // rules={{ required: "Agency Name is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("recAgencyName")}
                </div>
              </div>
            </div>
            <AgentAddress
              register={register}
              error={errors}
              setValue={setValue}
              getValues={getValues}
            />
            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("recAgencyContact")}
              </div>
              <div className="p-field p-col-3 p-col-3 float-left">
                <Controller
                  name="agentDetails.recAgencyContactNo"
                  control={control}
                  // rules={{ required: "Recruitment Agency Contact No is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className="rounded-input p-mb-1"
                      placeholder={t("phoneNo")}
                    />
                  )}
                />
                {getFormErrorMessageAgentDetails("recAgencyContactNo")}
              </div>
              <div className="p-field p-col-3 p-col-3 float-left">
                <Controller
                  name="agentDetails.recAgencyEmail"
                  control={control}
                  // rules={{ required: "Email is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className="rounded-input p-mb-1"
                      placeholder={t("email")}
                    />
                  )}
                />
                {getFormErrorMessageAgentDetails("recAgencyEmail")}
              </div>
              <div className="p-field p-col-3 p-col-3 float-left">
                <Controller
                  name="agentDetails.recAgencyWebsite"
                  control={control}
                  // rules={{ required: "Website is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className="rounded-input p-mb-1"
                      placeholder={t("website")}
                    />
                  )}
                />
                {getFormErrorMessageAgentDetails("recAgencyWebsite")}
              </div>
            </div>
            <div className="p-grid p-col-12 p-md-12">
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("chgAmtFLM")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.chgAmtFLM"
                    control={control}
                    // rules={{ required: "Charge Amt for FLM is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("chgAmtFLM")}
                </div>
              </div>
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("receiptAmtPaid")}{" "}
                </div>
                <Controller
                  name="agentDetails.receiptAmtPaid"
                  control={control}
                  // rules={{ required: "Receipt Amt Paid is required." }}
                  render={({ field, fieldState }) => (
                    <>
                      <div className="p-field p-col-6 p-md-6 float-left">
                        <RadioButton
                          value={LABOUR_MIGRATION_RECEIPT_AMT_PAID.TAKEN}
                          name={YES_NO.YES}
                          checked={field.value == LABOUR_MIGRATION_RECEIPT_AMT_PAID.TAKEN}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                        />{" "}
                        {t("taken")}
                      </div>
                      <div className="p-field p-col-6 p-md-6 float-left">
                        <RadioButton
                          value={LABOUR_MIGRATION_RECEIPT_AMT_PAID.NOT_TAKEN}
                          name={YES_NO.NO}
                          checked={field.value == LABOUR_MIGRATION_RECEIPT_AMT_PAID.NOT_TAKEN}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                        />{" "}
                        {t("notTaken")}
                      </div>
                    </>
                  )}
                />
                {getFormErrorMessageAgentDetails("receiptAmtPaid")}
              </div>
            </div>
            <div className="p-grid p-col-12 p-md-12">
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("departureDate")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.departureDate"
                    control={control}
                    // rules={{ required: "Value is required." }}
                    render={({ field, fieldState }) => (
                      // <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                      <NepaliDatePicker
                        inputClassName="p-inputtext form-control"
                        className=""
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        options={{ calenderLocale: "en", valueLocale: "en" }}
                      />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("departureDate")}
                </div>
              </div>
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("arrivalDate")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.arrivalDate"
                    control={control}
                    // rules={{ required: "Value is required." }}
                    render={({ field, fieldState }) => (
                      // <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                      <NepaliDatePicker
                        inputClassName="p-inputtext form-control"
                        className=""
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        options={{ calenderLocale: "en", valueLocale: "en" }}
                      />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("arrivalDate")}
                </div>
              </div>
            </div>
            <div className="p-grid p-col-12 p-md-12">
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("documentation")}
                </div>
                <Controller
                  name="agentDetails.documentation"
                  control={control}
                  // rules={{ required: "Documentation is required." }}
                  render={({ field, fieldState }) => (
                    <>
                      <div className="p-field p-col-6 p-md-6 float-left">
                        <RadioButton
                          value={LABOUR_MIGRATION_DOCUMENTED.DOCUMENTED}
                          name={YES_NO.YES}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          checked={field.value == LABOUR_MIGRATION_DOCUMENTED.DOCUMENTED}
                        />{" "}
                        {t("documentated")}
                      </div>
                      <div className="p-field p-col-6 p-md-6 float-left">
                        <RadioButton
                          value={LABOUR_MIGRATION_DOCUMENTED.UNDOCUMENTED}
                          name={YES_NO.NO}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          checked={field.value == LABOUR_MIGRATION_DOCUMENTED.UNDOCUMENTED}
                        />{" "}
                        {t("undocumentated")}
                      </div>
                    </>
                  )}
                />
                {getFormErrorMessageAgentDetails("documentation")}
              </div>
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("compNameDest")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.destinationCompanyName"
                    control={control}
                    // rules={{ required: "Destination Company is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("destinationCompanyName")}
                </div>
              </div>
            </div>
            {/* For companu need to be added <Address /> */}
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("address")}</div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="agentDetails.destinationCompanyAddress"
                  control={control}
                  // rules={{ required: "Destination Company Address is required." }}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                  )}
                />
                {getFormErrorMessageAgentDetails("destinationCompanyAddress")}
              </div>
            </div>
            <div className="p-field p-col-12 p-md-12">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("contactNoOfCoompany")}
              </div>
              <div className="p-field p-col-3 p-col-3 float-left">
                <Controller
                  name="agentDetails.destinationCompanyphoneNo"
                  control={control}
                  // rules={{ required: "Value is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className="rounded-input p-mb-1"
                      placeholder={t("phoneNo")}
                    />
                  )}
                />
                {getFormErrorMessageAgentDetails("destinationCompanyphoneNo")}
              </div>
              <div className="p-field p-col-3 p-col-3 float-left">
                <Controller
                  name="agentDetails.destinationCompanyEmail"
                  control={control}
                  // rules={{ required: "Value is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className="rounded-input p-mb-1"
                      placeholder={t("email")}
                    />
                  )}
                />
                {getFormErrorMessageAgentDetails("destinationCompanyEmail")}
              </div>
              <div className="p-field p-col-3 p-col-3 float-left">
                <Controller
                  name="agentDetails.destinationCompanyWebsite"
                  control={control}
                  // rules={{ required: "Value is required." }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      {...field}
                      className="rounded-input p-mb-1"
                      placeholder={t("website")}
                    />
                  )}
                />
                {getFormErrorMessage("destinationCompanyWebsite")}
              </div>
            </div>
            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("formalContract")}
              </div>
              <Controller
                name="agentDetails.formalContract"
                control={control}
                // rules={{ required: "Value is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="p-field p-col-3 p-md-3 float-left">
                      <RadioButton
                        value={LABOUR_MIGRATION_FORMAL_CONTRACT.RECEIVED}
                        name={YES_NO.YES}
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        checked={field.value == LABOUR_MIGRATION_FORMAL_CONTRACT.RECEIVED}
                      />{" "}
                      {t("received")}
                    </div>
                    <div className="p-field p-col-3 p-md-3 float-left">
                      <RadioButton
                        value={LABOUR_MIGRATION_FORMAL_CONTRACT.NOT_RECEIVED}
                        name={YES_NO.NO}
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        checked={field.value == LABOUR_MIGRATION_FORMAL_CONTRACT.NOT_RECEIVED}
                      />{" "}
                      {t("notReceived")}
                    </div>
                  </>
                )}
              />
              {getFormErrorMessageAgentDetails("formalContract")}
            </div>
            <div className="p-grid p-col-12 p-md-12">
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("workingSector")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.workingSector"
                    control={control}
                    // rules={{ required: "Value is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("workingSector")}
                </div>
              </div>
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("salaryAmt")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.salaryAmt"
                    control={control}
                    // rules={{ required: "Value is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("salaryAmt")}
                </div>
              </div>
            </div>
            <div className="p-grid p-col-12 p-md-12">
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("salaryCurrency")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.salaryCurrency"
                    control={control}
                    // rules={{ required: "Value is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("salaryCurrency")}
                </div>
              </div>
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("workingHours")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.workingHours"
                    control={control}
                    // rules={{ required: "Value is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("workingHours")}
                </div>
              </div>
            </div>
            <div className="p-grid p-col-12 p-md-12">
              {/* <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("receivingShelterSupport")}
                </div>
                <Controller
                  name="agentDetails.receivingShelterSupport"
                  control={control}
                 // rules={{ required: "Value is required." }}
                  render={({ field, fieldState }) => (
                    <>
                      <div className="p-field p-col-6 p-md-6 float-left">
                        <RadioButton
                          value={TRUE_FALSE.TRUE}
                          name={YES_NO.YES}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          checked={field.value == TRUE_FALSE.TRUE}
                        />{" "}
                        {t("yes")}
                      </div>
                      <div className="p-field p-col-6 p-md-6 float-left">
                        <RadioButton
                          value={TRUE_FALSE.FALSE}
                          name={YES_NO.NO}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          checked={field.value == TRUE_FALSE.FALSE}
                        />{" "}
                        {t("no")}
                      </div>
                    </>
                  )}
                />
                {getFormErrorMessageAgentDetails("receivingShelterSupport")}
              </div> */}
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("relWithAgent")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.relWithAgent"
                    control={control}
                    // rules={{ required: "Value is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("relWithAgent")}
                </div>
              </div>
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("rehabProvAfterDisability")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.rehabProvAfterDisability"
                    control={control}
                    // rules={{ required: "Value is required." }}
                    render={({ field, fieldState }) => (
                      // <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                      <>
                        <div className="p-field p-col-6 p-md-6 float-left">
                          <RadioButton
                            value={TRUE_FALSE.TRUE}
                            name={YES_NO.YES}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            checked={field.value == TRUE_FALSE.TRUE}
                          />{" "}
                          {t("yes")}
                        </div>
                        <div className="p-field p-col-6 p-md-6 float-left">
                          <RadioButton
                            value={TRUE_FALSE.FALSE}
                            name={YES_NO.NO}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            checked={field.value == TRUE_FALSE.FALSE}
                          />{" "}
                          {t("no")}
                        </div>
                      </>
                    )}
                  />
                  {getFormErrorMessageAgentDetails("rehabProvAfterDisability")}
                </div>
              </div>
            </div>
            {/* <div className="p-grid p-col-12 p-md-12">
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("rehabProvAfterDisability")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.rehabProvAfterDisability"
                    control={control}
                    rules={{ required: "Value is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("rehabProvAfterDisability")}
                </div>
              </div>
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("receivedHelpFromWelfareFunds")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.receivedHelpFromWelfareFunds"
                    control={control}
                    rules={{ required: "Value is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("receivedHelpFromWelfareFunds")}
                </div>
              </div>
            </div> */}
            <div className="p-grid p-col-12 p-md-12 ">
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("receivedHelpFromWelfareFunds")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.receivedHelpFromWelfareFunds"
                    control={control}
                    // rules={{ required: "Value is required." }}
                    render={({ field, fieldState }) => (
                      //<InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                      <>
                        <div className="p-field p-col-6 p-md-6 float-left">
                          <RadioButton
                            value={TRUE_FALSE.TRUE}
                            name={YES_NO.YES}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            checked={field.value == TRUE_FALSE.TRUE}
                          />{" "}
                          {t("yes")}
                        </div>
                        <div className="p-field p-col-6 p-md-6 float-left">
                          <RadioButton
                            value={TRUE_FALSE.FALSE}
                            name={YES_NO.NO}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            checked={field.value == TRUE_FALSE.FALSE}
                          />{" "}
                          {t("no")}
                        </div>
                      </>
                    )}
                  />
                  {getFormErrorMessageAgentDetails("receivedHelpFromWelfareFunds")}
                </div>
              </div>
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">{t("caseStatus")}</div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="agentDetails.caseStatus"
                    control={control}
                    // rules={{ required: "Value is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                    )}
                  />
                  {getFormErrorMessageAgentDetails("caseStatus")}
                </div>
              </div>
            </div>

            {hideBtn === "No" ? (
              <>
                {showBtn === "Yes" ? (
                  <div className="p-grid p-col-12 p-md-12">

                    <div className="p-col-12 p-md-8"></div>
                    <div className="p-col-12 p-md-2">
                      <Button label={t("save")}
                        className="p-button-sm pull-right submitBtn"
                        onClick={handleSubmit(saveData)} />
                    </div>
                    <div className="p-col-12 p-md-2">
                      <Button label={t("submit")}
                        className="p-button-sm pull-right submitBtn"
                        onClick={handleSubmit(submitData)} />
                    </div>
                  </div>
                ) :
                  <></>
                }</>
            ) : (
              <></>
            )}
          </form>
        </div>
      </Card>
    </>
  );
};

export default LabourMigration;
