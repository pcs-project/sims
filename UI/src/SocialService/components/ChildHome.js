import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Toast } from 'primereact/toast';
import { RadioButton } from "primereact/radiobutton";
import { useHistory } from "react-router";

import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { Accordion, AccordionTab } from "primereact/accordion";

import Name from "../../utilities/components/Name";
import PermanentAddress from "../../utilities/components/PermanentAddress";
import TemporaryAddress from "../../utilities/components/TemporaryAddress";
import Gender from "../../utilities/components/Gender";
import AgeGroupForChild from "../../utilities/components/AgeGroupForChild";
import Caste from "../../utilities/components/Caste";
import Education from "../../utilities/components/Education";
import Disability from "../../utilities/components/Disability";
import Disease from "../../utilities/components/Disease";
import SchoolDetail from "../../utilities/components/SchoolDetail";
import ParentGuardian from "../../utilities/components/ParentGuardian";
import Rehabilitation from "../../utilities/components/Rehabilitation";

import TipDetailForm from "../../utilities/components/TipDetailForm";

import ChildHomeCaseService from "../api/services/ChildHomeCaseService";
import { useTranslation } from "react-i18next";
import { trackPromise } from "react-promise-tracker";
import GbvViolence from "../../utilities/components/GbvViolence";
import HomeAddress from "../../utilities/components/HomeAddress";
import HomeName from "../../utilities/components/HomeName";

import UserService from "../../security/api/services/UserService";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import { InputNumber } from "primereact/inputnumber";

const ChildHome = () => {
  const { t } = useTranslation();

  const [tipCase, setTipCase] = useState("No");
  const [gbvCase, setGbvCase] = useState("No");
  const [investigationStatus, setInvestigationStatus] = useState();
  const [childHomeCaseId, setChildHomeCaseId] = useState();

  const [update, setUpdate] = useState(false);
  const [showBtn, setShowBtn] = useState("Yes");
  const [hideBtn, setHideBtn] = useState("No");

  const location = useLocation();
  const history = useHistory();
  const methods = useForm();
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = methods;
  const toast = useRef(null);
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
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

    let childHomeCaseId = location.state ? location.state.childHomeCaseId : "";
    console.log("childHomeCaseId", childHomeCaseId);
    setChildHomeCaseId(childHomeCaseId);
    if (childHomeCaseId != "") {
      ChildHomeCaseService.getById(childHomeCaseId).then((response) => {
        console.log("response.data", response.data);
        if (response.data) {
          console.log("response.data", response.data);
          setChildHomeCaseId(response.data.childHomeCaseId);
          setTipCase(response.data.tipCase);
          setGbvCase(response.data.gbvCase);
          setInvestigationStatus(response.data.investigationStatus);
          setUpdate(true);

          (response.data.status === "Submit") ? setShowBtn("No") : setShowBtn("Yes");

          reset({
            homeName: response.data.homeName,
            homeProvince: parseInt(response.data.homeProvince),
            homeDistrict: parseInt(response.data.homeDistrict),
            homeMunicipality: parseInt(response.data.homeMunicipality),
            homeWardNo: parseInt(response.data.homeWardNo),
            tipCase: response.data.tipCase,
            gbvCase: response.data.gbvCase,
            firstName: response.data.firstName,
            middleName: response.data.middleName,
            lastName: response.data.lastName,
            gender: response.data.gender,
            age: response.data.age,
            caste: response.data.caste,
            permanentProvince: parseInt(response.data.permanentProvince),
            permanentDistrict: parseInt(response.data.permanentDistrict),
            permanentMunicipality: parseInt(response.data.permanentMunicipality),
            permanentWardNo: parseInt(response.data.permanentWardNo),
            temporaryProvince: parseInt(response.data.temporaryProvince),
            temporaryDistrict: parseInt(response.data.temporaryDistrict),
            temporaryMunicipality: parseInt(response.data.temporaryMunicipality),
            temporaryWardNo: parseInt(response.data.temporaryWardNo),
            educationLevel: response.data.educationLevel,
            schoolName: response.data.schoolName,
            admissionDate: response.data.admissionDate,
            disability: response.data.disability,
            typesOfDisability: response.data.typesOfDisability,
            disease: response.data.disease,
            diseaseDetail: response.data.diseaseDetail,
            parentGuardian: response.data.parentGuardian,
            rehabilitation: response.data.rehabilitation,
            rehabilitatedTo: response.data.rehabilitatedTo,
            rehabilitatedToDetail: response.data.rehabilitatedToDetail,
            recommendedBy: response.data.recommendedBy,
            orphanOrSingleParent: response.data.orphanOrSingleParent,
            // investigationStatus: response.data.investigationStatus,
            // investigationStatusDetail: response.data.investigationStatusDetail,
            // referralStatus: response.data.referralStatus,
            violenceType: response.data.violenceType,
            violenceTypeDetail: response.data.violenceTypeDetail,
            tipDetails: response.data.tipDetails
          });
        }
      });
    }
  }, []);

  //To save data
  const saveData = (data) => {
    data.status = "Save";
    console.log("data.tipDetails",data.tipDetails);
    data.tipDetails == undefined ? (data.tipDetails = {}) : (data.tipDetails = data.tipDetails);
    console.log("data", data);

    if (update === false) {
      trackPromise(
        ChildHomeCaseService.saveData(data).then((response) => {
          console.log("response", response);
          if (response.status == 200) {
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
      )
    } else {
      data.childHomeCaseId = childHomeCaseId;
      trackPromise(
        ChildHomeCaseService.updateData(data).then((response) => {
          console.log("response", response);
          if (response.status == 200) {
            toast.current.show({
              severity: "success",
              summary: "Success Message",
              detail: "Update Successful",
              life: 3000,
            });
            window.location.reload(false);
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: "Update UnSuccessful",
              life: 3000,
            });
          }
        })
      );
    }
  };

  const submitData = (data) => {
    data.status = "Submit";
    data.tipDetails == undefined ? (data.tipDetails = {}) : (data.tipDetails = data.tipDetails);
    console.log("data", data);

    if (update === false) {
      trackPromise(
        ChildHomeCaseService.saveData(data).then((response) => {
          console.log("response", response);
          if (response.status == 200) {
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
      )
    } else {
      data.childHomeCaseId = childHomeCaseId;
      trackPromise(
        ChildHomeCaseService.updateData(data).then((response) => {
          console.log("response", response);
          if (response.status == 200) {
            toast.current.show({
              severity: "success",
              summary: "Success Message",
              detail: "Update Successful",
              life: 3000,
            });
            window.location.reload(false);
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: "Update UnSuccessful",
              life: 3000,
            });
          }
        })
      );
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className="p-card-content">
          <h4 className="p-pt-0"> {t("childHome")}</h4>
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
              history.push("/sims/child-home-indicator")
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
              history.push("/sims/child-home-list")
            }
          />
        </div>
      </div>

      <Card className="p-mt-0">
        <form className="p-grid p-fluid ">
          {/* <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left">
              <h4 class="HeadingTitle p-pt-0"> {t("indChildHome")}</h4>
            </div>
          </div> */}

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 ">
              <h5 className="HeadingTitle">
                {t("homeDetails")}
              </h5>
            </div>
          </div>
          <HomeName register={register} error={errors} setValue={setValue} getValues={getValues} />
          <HomeAddress register={register} error={errors} setValue={setValue} getValues={getValues} />

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 ">
              <h5 className="HeadingTitle">
                {t("personalDetails")}
              </h5>
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
          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left">
              {getFormErrorMessage("gender")}
            </div>
          </div>
 
{/*         <Controller
            name="ageGroup"
            control={control}
            rules={{ required: "Age Group is required." }}
            render={({ field, fieldState }) => (
              <AgeGroupForChild
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
          <div className="p-field p-col-12 p-md-12 ">
            {getFormErrorMessage("ageGroup")}
          </div> */}

          <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("age")}<span style={{ color: "#d00000"}}> * </span></div>
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
                      min="0"
                      max="18"
                    />
                  )}
                />
                {getFormErrorMessage("age")}
              </div>
            </div>
          </div>

          <Controller
            name="caste"
            control={control}
            rules={{ required: "Caste is required." }}
            render={({ field, fieldState }) => (
              <Caste
                id={field.name}
                {...field}
                onValueChange={(value) => {
                  setValue("caste", value);
                }}
                value={getValues("caste")}
                getValues={getValues}
              />
            )}
          />
          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-12 p-md-12 float-left">
              {getFormErrorMessage("caste")}
            </div>
          </div>
          <PermanentAddress register={register} error={errors} setValue={setValue} getValues={getValues} />
          <TemporaryAddress register={register} error={errors} setValue={setValue} getValues={getValues} />

          <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label"> {t("tipCase")}<span style={{ color: "#d00000"}}> * </span></div>
              <Controller
                name="tipCase"
                control={control}
                rules={{ required: "TIP case is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="Yes"
                        name="Yes"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setTipCase(e.value);
                        }}
                        checked={field.value === "Yes"} /> {t("ho")}
                    </div>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="No"
                        name="No"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setTipCase(e.value);
                        }}
                        checked={field.value === "No"} /> {t("haina")}
                    </div>
                  </>
                )}
              />
              {getFormErrorMessage("tipCase")}
            </div>
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("gbvCase")}<span style={{ color: "#d00000"}}> * </span>
              </div>
              <Controller
                name="gbvCase"
                control={control}
                rules={{ required: "GBV case is required." }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="Yes"
                        name="Yes"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setGbvCase(e.value);
                        }}
                        checked={field.value === "Yes"} /> {t("ho")}
                    </div>
                    <div className="p-field p-col-12 p-md-6 float-left">
                      <RadioButton value="No"
                        name="No"
                        onChange={(e) => {
                          field.onChange(e.value);
                          setGbvCase(e.value);
                        }}
                        checked={field.value === "No"} /> {t("haina")}
                    </div>
                  </>
                )}
              />
              {getFormErrorMessage("gbvCase")}
            </div>
          </div>
          {tipCase === "Yes" ? (
            <div className="p-field p-col-12 p-md-12">
              <div className="accordion-demo">
                <div className="card">
                  <Accordion activeIndex={0}>
                    <AccordionTab
                      header={
                        <React.Fragment>
                          <span> {t("tipInformation")}</span>
                        </React.Fragment>
                      }
                    >
                      <TipDetailForm register={register} error={errors} setValue={setValue} getValues={getValues} />
                    </AccordionTab>
                  </Accordion>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {gbvCase === "Yes" ? (
            <div className="p-field p-col-12 p-md-12">
              <div className="accordion-demo">
                <div className="card">
                  <Accordion activeIndex={0}>
                    <AccordionTab
                      header={
                        <React.Fragment>
                          <span> {t("gbvInformation")}</span>
                        </React.Fragment>
                      }
                    >
                      <GbvViolence register={register} error={errors} setValue={setValue} getValues={getValues} />
                    </AccordionTab>
                  </Accordion>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <Education register={register} error={errors} setValue={setValue} getValues={getValues} />

          <SchoolDetail register={register} error={errors} setValue={setValue} getValues={getValues} />
          <Disability register={register} error={errors} setValue={setValue} getValues={getValues} />

          <Disease
            register={register}
            error={errors}
            setValue={setValue}
            getValues={getValues}
          />
          {/* <div className="p-field p-col-12 p-md-12 ">
            {getFormErrorMessage("disease")}
          </div> */}
          <ParentGuardian register={register} error={errors} setValue={setValue} getValues={getValues} />

          <Rehabilitation register={register} error={errors} setValue={setValue} getValues={getValues} />

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label"> {t("recommendedBy")}</div>
            <div className="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="recommendedBy"
                control={control}
                render={({ field, fieldState }) => (
                  <InputText id={field.name}
                    {...field}
                    className={classNames({
                      "p-invalid": fieldState.invalid,
                    })} />
                )}
              />
              {getFormErrorMessage("recommendedBy")}
            </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">
              {t("orphan/singleParent")}
            </div>

            <Controller
              name="orphanOrSingleParent"
              control={control}
              // rules={{ required: "Orphan/Single Parent is required." }}
              render={({ field, fieldState }) => (
                <>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <RadioButton value="Orphan"
                      name="orphan"
                      onChange={(e) => field.onChange(e.value)}
                      checked={field.value === "Orphan"} /> {t("orphan")}
                  </div>
                  <div className="p-field p-col-3 p-md-3 float-left">
                    <RadioButton value="Single Parent Child"
                      name="Single Parent Child"
                      onChange={(e) => field.onChange(e.value)}
                      checked={field.value === "Single Parent Child"} /> {t("singleParentChild")}
                  </div>
                </>
              )}
            />
            {getFormErrorMessage("orphanOrSingleParent")}
          </div>

          {/* <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">
              <h4 class="HeadingTitle p-pt-0"> {t("caseStatus")}</h4>
            </div>
          </div>

          <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-12 p-md-6">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("investigationStatus")}
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="investigationStatus"
                  control={control}
                  //    rules={{ required: "Investigation Status is required." }}
                  render={({ field, fieldState }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                        setInvestigationStatus(e.value);
                      }}
                      style={{ width: "100%" }}
                      options={investigationStatusList}
                    />
                  )}
                />
                {getFormErrorMessage("investigationStatus")}
              </div>
            </div>
            {investigationStatus === "Others" ? (
              <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                  {t("pleaseSpDetails")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                  <Controller
                    name="investigationStatusDetail"
                    control={control}
                    // rules={{ required: "Investigation Status Detail is required." }}
                    render={({ field, fieldState }) => (
                      <InputText id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })} />
                    )}
                  />
                  {getFormErrorMessage("investigationStatusDetail")}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">
              {t("referralStatus")}
            </div>
            <div className="p-field p-col-6 p-md-6 float-left">
              <Controller
                name="referralStatus"
                control={control}
                // rules={{ required: "Referral Status Detail is required." }}
                render={({ field, fieldState }) => (
                  <InputText id={field.name}
                    {...field}
                    className={classNames({
                      "p-invalid": fieldState.invalid,
                    })} />
                )}
              />
              {getFormErrorMessage("referralStatus")}
            </div>
          </div> */}
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
      </Card>
    </>
  );
};

export default ChildHome;
