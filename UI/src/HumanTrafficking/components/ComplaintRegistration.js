import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";

import FiscalQuarter from "../../utilities/components/FiscalQuarter";
import Source from "../../utilities/components/Source";

import ComplaintRegistrationService from "../api/services/ComplaintRegistrationService";
import OrganizationService from "../../security/api/services/OrganizationService";
import Organization from "../../utilities/components/Organization";
import { useTranslation } from "react-i18next";
import { restoreDashPattern } from "pdf-lib";
import { trackPromise } from "react-promise-tracker";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import UserService from "../../security/api/services/UserService";

const ComplaintRegistration = () => {
  const { t } = useTranslation();

  const [fiscalYear, setFiscalYear] = useState("");
  const [quarter, setQuarter] = useState("");
  const [complaintRegistrationId, setComplaintRegistrationId] = useState();

  const [update, setUpdate] = useState("No");
  const [showBtn, setShowBtn] = useState("Yes");
  const [hideBtn, setHideBtn] = useState("No");
  const [enableForm, setEnableForm] = useState(true);
  const [organization, setOrganization] = useState("");
  const [organizationList, setOrganizationList] = useState([]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues
  } = useForm();
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
  }, []);

  //To save data
  const saveData = (e) => {
    e.preventDefault();
    let data = getValues();
    data.fiscalYear = fiscalYear;
    data.quarter = quarter;
    data.status = "Save";
    console.log("data", data);

    if (update == "No") {
      //trackPromise is used for loading
      trackPromise(
        ComplaintRegistrationService.saveData(data).then((response) => {
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
      );
    } else {
      data.complaintRegistrationId = complaintRegistrationId;
      trackPromise(
        ComplaintRegistrationService.updateData(data).then((response) => {
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

  //To update data
  const submitData = (data) => {
    data.fiscalYear = fiscalYear;
    data.quarter = quarter;
    data.status = "Submit";
    console.log("data", data);

    if (update == "No") {
      //trackPromise is used for loading
      trackPromise(
        ComplaintRegistrationService.saveData(data).then((response) => {
          console.log("response", response);
          if (response.status == 200) {
            toast.current.show({
              severity: "success",
              summary: "Success Message",
              detail: "Submit Successful",
              life: 3000,
            });
            window.location.reload(false);
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: "Submit UnSuccessful",
              life: 3000,
            });
          }
        })
      );
    } else {
      data.complaintRegistrationId = complaintRegistrationId;
      trackPromise(
        ComplaintRegistrationService.updateData(data).then((response) => {
          console.log("response", response);
          if (response.status == 200) {
            toast.current.show({
              severity: "success",
              summary: "Success Message",
              detail: "Submit Successful",
              life: 3000,
            });
            window.location.reload(false);
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: "Submit UnSuccessful",
              life: 3000,
            });
          }
        })
      );
    }
  };

  const handleFiscalYear = (fiscalYearVal) => {
    console.log("fiscal year  ", fiscalYearVal);
    setFiscalYear(fiscalYearVal);
    console.log("quarter in fiscalYear", quarter);
    if (quarter !== "" && organization != "") {
      getListByOrganization(fiscalYearVal, quarter, organization);
    } else if (quarter !== "") {
      getListByFiscalYearAndQuarter(fiscalYearVal, quarter);
    }
  };

  const handleQuarter = (quarterVal) => {
    console.log("quarter  ", quarterVal);
    console.log("fiscalYear in quarter", fiscalYear);
    console.log("iin organization", organization);
    setQuarter(quarterVal);
    if (fiscalYear !== "" && organization != "") {
      getListByOrganization(fiscalYear, quarterVal, organization);
    } else if (fiscalYear !== "") {
      getListByFiscalYearAndQuarter(fiscalYear, quarterVal);
    }
  };

  const getListByFiscalYearAndQuarter = (fiscalYear, quarter) => {
    trackPromise(
      ComplaintRegistrationService.getListByFiscalYearAndQuarter(
        fiscalYear,
        quarter
      ).then((response) => {
        console.log("response", response.data);
        if (response.data) {
          setFiscalYear(response.data.fiscalYear);
          setQuarter(response.data.quarter);
          setComplaintRegistrationId(response.data.complaintRegistrationId);
          reset({
            crUnder47Part1: response.data.crUnder47Part1,
            crUnder47Part1Source:
              response.data.crUnder47Part1Source[0] != "" &&
                response.data.crUnder47Part1Source != ""
                ? response.data.crUnder47Part1Source
                : null,
            maleCrToWages: response.data.maleCrToWages,
            femaleCrToWages: response.data.femaleCrToWages,
            dalitCrToWages: response.data.dalitCrToWages,
            ethnicMinoritiesCrToWages: response.data.ethnicMinoritiesCrToWages,
            janajatiCrToWages: response.data.janajatiCrToWages,
            madhesiCrToWages: response.data.madhesiCrToWages,
            brahminCrToWages: response.data.brahminCrToWages,
            crToWagesSource:
              response.data.crToWagesSource[0] != "" &&
                response.data.crToWagesSource != ""
                ? response.data.crToWagesSource
                : null,
            maleCrToSeniorCitizen: response.data.maleCrToSeniorCitizen,
            femaleCrToSeniorCitizen: response.data.femaleCrToSeniorCitizen,
            dalitCrToSeniorCitizen: response.data.dalitCrToSeniorCitizen,
            ethnicMinoritiesCrToSeniorCitizen:
              response.data.ethnicMinoritiesCrToSeniorCitizen,
            janajatiCrToSeniorCitizen: response.data.janajatiCrToSeniorCitizen,
            madhesiCrToSeniorCitizen: response.data.madhesiCrToSeniorCitizen,
            brahminCrToSeniorCitizen: response.data.brahminCrToSeniorCitizen,
            crToSeniorCitizenSource:
              response.data.crToSeniorCitizenSource[0] != "" &&
                response.data.crToSeniorCitizenSource != ""
                ? response.data.crToSeniorCitizenSource
                : null,
            maleCrToMinors: response.data.maleCrToMinors,
            femaleCrToMinors: response.data.femaleCrToMinors,
            dalitCrToMinors: response.data.dalitCrToMinors,
            ethnicMinoritiesCrToMinors:
              response.data.ethnicMinoritiesCrToMinors,
            janajatiCrToMinors: response.data.janajatiCrToMinors,
            madhesiCrToMinors: response.data.madhesiCrToMinors,
            brahminCrToMinors: response.data.brahminCrToMinors,
            crToMinorsSource:
              response.data.crToMinorsSource[0] != "" &&
                response.data.crToMinorsSource != ""
                ? response.data.crToMinorsSource
                : null,
            maleCrUnder47Part2: response.data.maleCrUnder47Part2,
            femaleCrUnder47Part2: response.data.femaleCrUnder47Part2,
            dalitCrUnder47Part2: response.data.dalitCrUnder47Part2,
            ethnicMinoritiesCrUnder47Part2:
              response.data.ethnicMinoritiesCrUnder47Part2,
            janajatiCrUnder47Part2: response.data.janajatiCrUnder47Part2,
            madhesiCrUnder47Part2: response.data.madhesiCrUnder47Part2,
            brahminCrUnder47Part2: response.data.brahminCrUnder47Part2,
            crUnder47Part2Source:
              response.data.crUnder47Part2Source[0] != "" &&
                response.data.crUnder47Part2Source != ""
                ? response.data.crUnder47Part2Source
                : null,
            maleCrToDivorce: response.data.maleCrToDivorce,
            femaleCrToDivorce: response.data.femaleCrToDivorce,
            dalitCrToDivorce: response.data.dalitCrToDivorce,
            ethnicMinoritiesCrToDivorce:
              response.data.ethnicMinoritiesCrToDivorce,
            janajatiCrToDivorce: response.data.janajatiCrToDivorce,
            madhesiCrToDivorce: response.data.madhesiCrToDivorce,
            brahminCrToDivorce: response.data.brahminCrToDivorce,
            crToDivorceSource:
              response.data.crToDivorceSource[0] != "" &&
                response.data.crToDivorceSource != ""
                ? response.data.crToDivorceSource
                : null,
            maleCrToBattery: response.data.maleCrToBattery,
            femaleCrToBattery: response.data.femaleCrToBattery,
            dalitCrToBattery: response.data.dalitCrToBattery,
            ethnicMinoritiesCrToBattery:
              response.data.ethnicMinoritiesCrToBattery,
            janajatiCrToBattery: response.data.janajatiCrToBattery,
            madhesiCrToBattery: response.data.madhesiCrToBattery,
            brahminCrToBattery: response.data.brahminCrToBattery,
            crToBatterySource:
              response.data.crToBatterySource[0] != "" &&
                response.data.crToBatterySource != ""
                ? response.data.crToBatterySource
                : null,
            maleCrToDefamation: response.data.maleCrToDefamation,
            femaleCrToDefamation: response.data.femaleCrToDefamation,
            dalitCrToDefamation: response.data.dalitCrToDefamation,
            ethnicMinoritiesCrToDefamation:
              response.data.ethnicMinoritiesCrToDefamation,
            janajatiCrToDefamation: response.data.janajatiCrToDefamation,
            madhesiCrToDefamation: response.data.madhesiCrToDefamation,
            brahminCrToDefamation: response.data.brahminCrToDefamation,
            crToDefamationSource:
              response.data.crToDefamationSource[0] != "" &&
                response.data.crToDefamationSource != ""
                ? response.data.crToDefamationSource
                : null,
            maleDsUnder47Part1: response.data.maleDsUnder47Part1,
            femaleDsUnder47Part1: response.data.femaleDsUnder47Part1,
            dalitDsUnder47Part1: response.data.dalitDsUnder47Part1,
            ethnicMinoritiesDsUnder47Part1:
              response.data.ethnicMinoritiesDsUnder47Part1,
            janajatiDsUnder47Part1: response.data.janajatiDsUnder47Part1,
            madhesiDsUnder47Part1: response.data.madhesiDsUnder47Part1,
            brahminDsUnder47Part1: response.data.brahminDsUnder47Part1,
            dsUnder47Part1Source:
              response.data.dsUnder47Part1Source[0] != "" &&
                response.data.dsUnder47Part1Source != ""
                ? response.data.dsUnder47Part1Source
                : null,
            maleDsMedicationUnder47Part2:
              response.data.maleDsMedicationUnder47Part2,
            femaleDsMedicationUnder47Part2:
              response.data.femaleDsMedicationUnder47Part2,
            dalitDsMedicationUnder47Part2:
              response.data.dalitDsMedicationUnder47Part2,
            ethnicMinoritiesDsMedicationUnder47Part2:
              response.data.ethnicMinoritiesDsMedicationUnder47Part2,
            janajatiDsMedicationUnder47Part2:
              response.data.janajatiDsMedicationUnder47Part2,
            madhesiDsMedicationUnder47Part2:
              response.data.madhesiDsMedicationUnder47Part2,
            brahminDsMedicationUnder47Part2:
              response.data.brahminDsMedicationUnder47Part2,
            dsMedicationUnder47Part2Source:
              response.data.dsMedicationUnder47Part2Source[0] != "" &&
                response.data.dsMedicationUnder47Part2Source != ""
                ? response.data.dsMedicationUnder47Part2Source
                : null,
            maleCrBeyondJurisdiction: response.data.maleCrBeyondJurisdiction,
            femaleCrBeyondJurisdiction:
              response.data.femaleCrBeyondJurisdiction,
            dalitCrBeyondJurisdiction: response.data.dalitCrBeyondJurisdiction,
            ethnicMinoritiesCrBeyondJurisdiction:
              response.data.ethnicMinoritiesCrBeyondJurisdiction,
            janajatiCrBeyondJurisdiction:
              response.data.janajatiCrBeyondJurisdiction,
            madhesiCrBeyondJurisdiction:
              response.data.madhesiCrBeyondJurisdiction,
            brahminCrBeyondJurisdiction:
              response.data.brahminCrBeyondJurisdiction,
            crBeyondJurisdictionSource:
              response.data.crBeyondJurisdictionSource[0] != "" &&
                response.data.crBeyondJurisdictionSource != ""
                ? response.data.crBeyondJurisdictionSource
                : null,
            maleCrRelevantInstitutions:
              response.data.maleCrRelevantInstitutions,
            femaleCrRelevantInstitutions:
              response.data.femaleCrRelevantInstitutions,
            dalitCrRelevantInstitutions:
              response.data.dalitCrRelevantInstitutions,
            ethnicMinoritiesCrRelevantInstitutions:
              response.data.ethnicMinoritiesCrRelevantInstitutions,
            janajatiCrRelevantInstitutions:
              response.data.janajatiCrRelevantInstitutions,
            madhesiCrRelevantInstitutions:
              response.data.madhesiCrRelevantInstitutions,
            brahminCrRelevantInstitutions:
              response.data.brahminCrRelevantInstitutions,
            crRelevantInstitutionsSource:
              response.data.crRelevantInstitutionsSource[0] != "" &&
                response.data.crRelevantInstitutionsSource != ""
                ? response.data.crRelevantInstitutionsSource
                : null,
            maleCrToLegalAidService: response.data.maleCrToLegalAidService,
            femaleCrToLegalAidService: response.data.femaleCrToLegalAidService,
            dalitCrToLegalAidService: response.data.dalitCrToLegalAidService,
            ethnicMinoritiesCrToLegalAidService:
              response.data.ethnicMinoritiesCrToLegalAidService,
            janajatiCrToLegalAidService:
              response.data.janajatiCrToLegalAidService,
            madhesiCrToLegalAidService:
              response.data.madhesiCrToLegalAidService,
            brahminCrToLegalAidService:
              response.data.brahminCrToLegalAidService,
            crToLegalAidServiceSource:
              response.data.crToLegalAidServiceSource[0] != "" &&
                response.data.crToLegalAidServiceSource != ""
                ? response.data.crToLegalAidServiceSource
                : null,
            maleCrToPsychoSocioCounselling:
              response.data.maleCrToPsychoSocioCounselling,
            femaleCrToPsychoSocioCounselling:
              response.data.femaleCrToPsychoSocioCounselling,
            dalitCrToPsychoSocioCounselling:
              response.data.dalitCrToPsychoSocioCounselling,
            ethnicMinoritiesCrToPsychoSocioCounselling:
              response.data.ethnicMinoritiesCrToPsychoSocioCounselling,
            janajatiCrToPsychoSocioCounselling:
              response.data.janajatiCrToPsychoSocioCounselling,
            madhesiCrToPsychoSocioCounselling:
              response.data.madhesiCrToPsychoSocioCounselling,
            brahminCrToPsychoSocioCounselling:
              response.data.brahminCrToPsychoSocioCounselling,
            crToPsychoSocioCounsellingSource:
              response.data.crToPsychoSocioCounsellingSource[0] != "" &&
                response.data.crToPsychoSocioCounsellingSource != ""
                ? response.data.crToPsychoSocioCounsellingSource
                : null,
            maleCrToMedicalInstitutions:
              response.data.maleCrToMedicalInstitutions,
            femaleCrToMedicalInstitutions:
              response.data.femaleCrToMedicalInstitutions,
            dalitCrToMedicalInstitutions:
              response.data.dalitCrToMedicalInstitutions,
            ethnicMinoritiesCrToMedicalInstitutions:
              response.data.ethnicMinoritiesCrToMedicalInstitutions,
            janajatiCrToMedicalInstitutions:
              response.data.janajatiCrToMedicalInstitutions,
            madhesiCrToMedicalInstitutions:
              response.data.madhesiCrToMedicalInstitutions,
            brahminCrToMedicalInstitutions:
              response.data.brahminCrToMedicalInstitutions,
            crToMedicalInstitutionsSource:
              response.data.crToMedicalInstitutionsSource[0] != "" &&
                response.data.crToMedicalInstitutionsSource != ""
                ? response.data.crToMedicalInstitutionsSource
                : null,
            maleCrAboutDisabilityCard: response.data.maleCrAboutDisabilityCard,
            femaleCrAboutDisabilityCard:
              response.data.femaleCrAboutDisabilityCard,
            dalitCrAboutDisabilityCard:
              response.data.dalitCrAboutDisabilityCard,
            ethnicMinoritiesCrAboutDisabilityCard:
              response.data.ethnicMinoritiesCrAboutDisabilityCard,
            janajatiCrAboutDisabilityCard:
              response.data.janajatiCrAboutDisabilityCard,
            madhesiCrAboutDisabilityCard:
              response.data.madhesiCrAboutDisabilityCard,
            brahminCrAboutDisabilityCard:
              response.data.brahminCrAboutDisabilityCard,
            crAboutDisabilityCardSource:
              response.data.crAboutDisabilityCardSource[0] != "" &&
                response.data.crAboutDisabilityCardSource != ""
                ? response.data.crAboutDisabilityCardSource
                : null,
            firRegisteredByMale: response.data.firRegisteredByMale,
            firRegisteredByFemale: response.data.firRegisteredByFemale,
            firRegisteredByDalit: response.data.firRegisteredByDalit,
            firRegisteredByEthnicMinorities:
              response.data.firRegisteredByEthnicMinorities,
            firRegisteredByJanajati: response.data.firRegisteredByJanajati,
            firRegisteredByMadhesi: response.data.firRegisteredByMadhesi,
            firRegisteredByBrahmin: response.data.firRegisteredByBrahmin,
            firRegisteredSource:
              response.data.firRegisteredSource[0] != "" &&
                response.data.firRegisteredSource != ""
                ? response.data.firRegisteredSource
                : null,
            gbvCaseProsecutedByCourt:
              response.data.gbvCaseProsecutedByCourt,
            tipCaseProsecutedByCourt: response.data.tipCaseProsecutedByCourt,
            caseProsecutedByCourtSource:
              response.data.caseProsecutedByCourtSource[0] != "" &&
                response.data.caseProsecutedByCourtSource != ""
                ? response.data.caseProsecutedByCourtSource
                : null,
            gbvCaseDecidedByCourt:
              response.data.gbvCaseDecidedByCourt,
            tipCaseDecidedByCourt: response.data.tipCaseDecidedByCourt,
            caseDecidedByCourtSource:
              response.data.caseDecidedByCourtSource[0] != "" &&
                response.data.caseDecidedByCourtSource != ""
                ? response.data.caseDecidedByCourtSource
                : null,

            othersCrToWages: response.data.othersCrToWages,
            othersCrToSeniorCitizen: response.data.othersCrToSeniorCitizen,
            othersCrToMinors: response.data.othersCrToMinors,
            othersCrUnder47Part2: response.data.othersCrUnder47Part2,
            othersCrToDivorce: response.data.othersCrToDivorce,
            othersCrToBattery: response.data.othersCrToBattery,
            othersCrToDefamation: response.data.othersCrToDefamation,
            othersDsUnder47Part1: response.data.othersDsUnder47Part1,
            othersDsMedicationUnder47Part2:
              response.data.othersDsMedicationUnder47Part2,
            othersCrBeyondJurisdiction:
              response.data.othersCrBeyondJurisdiction,
            othersCrRelevantInstitutions:
              response.data.othersCrRelevantInstitutions,
            othersCrToLegalAidService: response.data.othersCrToLegalAidService,
            othersCrToPsychoSocioCounselling:
              response.data.othersCrToPsychoSocioCounselling,
            othersCrToMedicalInstitutions:
              response.data.othersCrToMedicalInstitutions,
            othersCrAboutDisabilityCard:
              response.data.othersCrAboutDisabilityCard,
            firRegisteredByOthers: response.data.firRegisteredByOthers,

            muslimCrToWages: response.data.muslimCrToWages,
            muslimCrToSeniorCitizen: response.data.muslimCrToSeniorCitizen,
            muslimCrToMinors: response.data.muslimCrToMinors,
            muslimCrUnder47Part2: response.data.muslimCrUnder47Part2,
            muslimCrToDivorce: response.data.muslimCrToDivorce,
            muslimCrToBattery: response.data.muslimCrToBattery,
            muslimCrToDefamation: response.data.muslimCrToDefamation,
            muslimDsUnder47Part1: response.data.muslimDsUnder47Part1,
            muslimDsMedicationUnder47Part2:
              response.data.muslimDsMedicationUnder47Part2,
            muslimCrBeyondJurisdiction:
              response.data.muslimCrBeyondJurisdiction,
            muslimCrRelevantInstitutions:
              response.data.muslimCrRelevantInstitutions,
            muslimCrToLegalAidService: response.data.muslimCrToLegalAidService,
            muslimCrToPsychoSocioCounselling:
              response.data.muslimCrToPsychoSocioCounselling,
            muslimCrToMedicalInstitutions:
              response.data.muslimCrToMedicalInstitutions,
            muslimCrAboutDisabilityCard:
              response.data.muslimCrAboutDisabilityCard,
            firRegisteredByMuslim: response.data.firRegisteredByMuslim,

            crAboutTip: response.data.crAboutTip,
            crAboutPolygamy: response.data.crAboutPolygamy,
            crAboutChildMarriage: response.data.crAboutChildMarriage,
            crAboutForcedAction: response.data.crAboutForcedAction,
            crAboutForcedActionIndustry: response.data.crAboutForcedActionIndustry,
            crAboutUnnaturalIntercourse: response.data.crAboutUnnaturalIntercourse,
            crAboutChildSexualAbuse: response.data.crAboutChildSexualAbuse,
            crAboutSexualAbuse: response.data.crAboutSexualAbuse,
            crAboutAccusedOfWitchcraft: response.data.crAboutAccusedOfWitchcraft,
            crAboutDomesticViolence: response.data.crAboutDomesticViolence,
            crToWomenAndChildrenSource:
              response.data.crToWomenAndChildrenSource[0] != "" &&
                response.data.crToWomenAndChildrenSource != ""
                ? response.data.crToWomenAndChildrenSource
                : null,

            crAboutTipHumanOrganTransplantation: response.data.crAboutTipHumanOrganTransplantation,
            crAboutForcedTip: response.data.crAboutForcedTip,
            crAboutBeatenAndMiscarried: response.data.crAboutBeatenAndMiscarried,
            crAboutThrowingAliveChild: response.data.crAboutThrowingAliveChild,
            crAboutKidnappingAndRape: response.data.crAboutKidnappingAndRape,
            crAboutDutyByForce: response.data.crAboutDutyByForce,
            crAboutAbductionAndDuty: response.data.crAboutAbductionAndDuty,
            crMiscellaneousSource:
              response.data.crMiscellaneousSource[0] != "" &&
                response.data.crMiscellaneousSource != ""
                ? response.data.crMiscellaneousSource
                : null,

            otherEthnicityCrToWages: response.data.otherEthnicityCrToWages,
            otherEthnicityCrToSeniorCitizen: response.data.otherEthnicityCrToSeniorCitizen,
            otherEthnicityCrToMinors: response.data.otherEthnicityCrToMinors,
            otherEthnicityCrUnder47Part2: response.data.otherEthnicityCrUnder47Part2,
            otherEthnicityCrToDivorce: response.data.otherEthnicityCrToDivorce,
            otherEthnicityCrToBattery: response.data.otherEthnicityCrToBattery,
            otherEthnicityCrToDefamation: response.data.otherEthnicityCrToDefamation,
            otherEthnicityDsUnder47Part1: response.data.otherEthnicityDsUnder47Part1,
            otherEthnicityDsMedicationUnder47Part2: response.data.otherEthnicityDsMedicationUnder47Part2,
            otherEthnicityCrBeyondJurisdiction: response.data.otherEthnicityCrBeyondJurisdiction,
            otherEthnicityCrRelevantInstitutions: response.data.otherEthnicityCrRelevantInstitutions,
            otherEthnicityCrToLegalAidService: response.data.otherEthnicityCrToLegalAidService,
            otherEthnicityCrToPsychoSocioCounselling: response.data.otherEthnicityCrToPsychoSocioCounselling,
            otherEthnicityCrToMedicalInstitutions: response.data.otherEthnicityCrToMedicalInstitutions,
            otherEthnicityCrAboutDisabilityCard: response.data.otherEthnicityCrAboutDisabilityCard,
            firRegisteredByOtherEthnicity: response.data.firRegisteredByOtherEthnicity,
            otherCaseProsecutedByCourt: response.data.otherCaseProsecutedByCourt,
            otherCaseDecidedByCourt: response.data.otherCaseDecidedByCourt,
            crAboutWomenAndChildrenOther: response.data.crAboutWomenAndChildrenOther,
            crMiscellaneousOther: response.data.crMiscellaneousOther,
          });
          setUpdate("Yes");
          if (response.data.status === "Submit") {
            setShowBtn("No");
          } else {
            setShowBtn("Yes");
          }
        } else {
          console.log("no data");
          reset({
            crUnder47Part1Source: [],
            crToWagesSource: [],
            crToSeniorCitizenSource: [],
            crToMinorsSource: [],
            crUnder47Part2Source: [],
            crToDivorceSource: [],
            crToBatterySource: [],
            crToDefamationSource: [],
            dsUnder47Part1Source: [],
            dsMedicationUnder47Part2Source: [],
            crBeyondJurisdictionSource: [],
            crRelevantInstitutionsSource: [],
            crToLegalAidServiceSource: [],
            crToPsychoSocioCounsellingSource: [],
            crToMedicalInstitutionsSource: [],
            crAboutDisabilityCardSource: [],
            firRegisteredSource: [],
            caseProsecutedByCourtSource: [],
            caseDecidedByCourtSource: [],
            crToWomenAndChildrenSource: [],
            crMiscellaneousSource: [],
          });
          setUpdate("No");
          setShowBtn("Yes");
        }
      })
    );
  };

  const handleOrganization = (organizationId) => {
    console.log("quarter  ", quarter);
    console.log("fiscalYear in quarter", fiscalYear);
    setOrganization(organizationId);
    if (fiscalYear !== "" && quarter !== "") {
      getListByOrganization(fiscalYear, quarter, organizationId);
    }
  };

  const getListByOrganization = (fiscalYear, quarter, organization) => {
    trackPromise(
      ComplaintRegistrationService.getListByOrganization(
        fiscalYear,
        quarter,
        organization
      ).then((response) => {
        console.log("response", response.data);
        if (response.data) {
          setFiscalYear(response.data.fiscalYear);
          setQuarter(response.data.quarter);
          setComplaintRegistrationId(response.data.complaintRegistrationId);
          reset({
            crUnder47Part1: response.data.crUnder47Part1,
            crUnder47Part1Source:
              response.data.crUnder47Part1Source[0] != "" &&
                response.data.crUnder47Part1Source != ""
                ? response.data.crUnder47Part1Source
                : null,
            maleCrToWages: response.data.maleCrToWages,
            femaleCrToWages: response.data.femaleCrToWages,
            dalitCrToWages: response.data.dalitCrToWages,
            ethnicMinoritiesCrToWages: response.data.ethnicMinoritiesCrToWages,
            janajatiCrToWages: response.data.janajatiCrToWages,
            madhesiCrToWages: response.data.madhesiCrToWages,
            brahminCrToWages: response.data.brahminCrToWages,
            crToWagesSource:
              response.data.crToWagesSource[0] != "" &&
                response.data.crToWagesSource != ""
                ? response.data.crToWagesSource
                : null,
            maleCrToSeniorCitizen: response.data.maleCrToSeniorCitizen,
            femaleCrToSeniorCitizen: response.data.femaleCrToSeniorCitizen,
            dalitCrToSeniorCitizen: response.data.dalitCrToSeniorCitizen,
            ethnicMinoritiesCrToSeniorCitizen:
              response.data.ethnicMinoritiesCrToSeniorCitizen,
            janajatiCrToSeniorCitizen: response.data.janajatiCrToSeniorCitizen,
            madhesiCrToSeniorCitizen: response.data.madhesiCrToSeniorCitizen,
            brahminCrToSeniorCitizen: response.data.brahminCrToSeniorCitizen,
            crToSeniorCitizenSource:
              response.data.crToSeniorCitizenSource[0] != "" &&
                response.data.crToSeniorCitizenSource != ""
                ? response.data.crToSeniorCitizenSource
                : null,
            maleCrToMinors: response.data.maleCrToMinors,
            femaleCrToMinors: response.data.femaleCrToMinors,
            dalitCrToMinors: response.data.dalitCrToMinors,
            ethnicMinoritiesCrToMinors:
              response.data.ethnicMinoritiesCrToMinors,
            janajatiCrToMinors: response.data.janajatiCrToMinors,
            madhesiCrToMinors: response.data.madhesiCrToMinors,
            brahminCrToMinors: response.data.brahminCrToMinors,
            crToMinorsSource:
              response.data.crToMinorsSource[0] != "" &&
                response.data.crToMinorsSource != ""
                ? response.data.crToMinorsSource
                : null,
            maleCrUnder47Part2: response.data.maleCrUnder47Part2,
            femaleCrUnder47Part2: response.data.femaleCrUnder47Part2,
            dalitCrUnder47Part2: response.data.dalitCrUnder47Part2,
            ethnicMinoritiesCrUnder47Part2:
              response.data.ethnicMinoritiesCrUnder47Part2,
            janajatiCrUnder47Part2: response.data.janajatiCrUnder47Part2,
            madhesiCrUnder47Part2: response.data.madhesiCrUnder47Part2,
            brahminCrUnder47Part2: response.data.brahminCrUnder47Part2,
            crUnder47Part2Source:
              response.data.crUnder47Part2Source[0] != "" &&
                response.data.crUnder47Part2Source != ""
                ? response.data.crUnder47Part2Source
                : null,
            maleCrToDivorce: response.data.maleCrToDivorce,
            femaleCrToDivorce: response.data.femaleCrToDivorce,
            dalitCrToDivorce: response.data.dalitCrToDivorce,
            ethnicMinoritiesCrToDivorce:
              response.data.ethnicMinoritiesCrToDivorce,
            janajatiCrToDivorce: response.data.janajatiCrToDivorce,
            madhesiCrToDivorce: response.data.madhesiCrToDivorce,
            brahminCrToDivorce: response.data.brahminCrToDivorce,
            crToDivorceSource:
              response.data.crToDivorceSource[0] != "" &&
                response.data.crToDivorceSource != ""
                ? response.data.crToDivorceSource
                : null,
            maleCrToBattery: response.data.maleCrToBattery,
            femaleCrToBattery: response.data.femaleCrToBattery,
            dalitCrToBattery: response.data.dalitCrToBattery,
            ethnicMinoritiesCrToBattery:
              response.data.ethnicMinoritiesCrToBattery,
            janajatiCrToBattery: response.data.janajatiCrToBattery,
            madhesiCrToBattery: response.data.madhesiCrToBattery,
            brahminCrToBattery: response.data.brahminCrToBattery,
            crToBatterySource:
              response.data.crToBatterySource[0] != "" &&
                response.data.crToBatterySource != ""
                ? response.data.crToBatterySource
                : null,
            maleCrToDefamation: response.data.maleCrToDefamation,
            femaleCrToDefamation: response.data.femaleCrToDefamation,
            dalitCrToDefamation: response.data.dalitCrToDefamation,
            ethnicMinoritiesCrToDefamation:
              response.data.ethnicMinoritiesCrToDefamation,
            janajatiCrToDefamation: response.data.janajatiCrToDefamation,
            madhesiCrToDefamation: response.data.madhesiCrToDefamation,
            brahminCrToDefamation: response.data.brahminCrToDefamation,
            crToDefamationSource:
              response.data.crToDefamationSource[0] != "" &&
                response.data.crToDefamationSource != ""
                ? response.data.crToDefamationSource
                : null,
            maleDsUnder47Part1: response.data.maleDsUnder47Part1,
            femaleDsUnder47Part1: response.data.femaleDsUnder47Part1,
            dalitDsUnder47Part1: response.data.dalitDsUnder47Part1,
            ethnicMinoritiesDsUnder47Part1:
              response.data.ethnicMinoritiesDsUnder47Part1,
            janajatiDsUnder47Part1: response.data.janajatiDsUnder47Part1,
            madhesiDsUnder47Part1: response.data.madhesiDsUnder47Part1,
            brahminDsUnder47Part1: response.data.brahminDsUnder47Part1,
            dsUnder47Part1Source:
              response.data.dsUnder47Part1Source[0] != "" &&
                response.data.dsUnder47Part1Source != ""
                ? response.data.dsUnder47Part1Source
                : null,
            maleDsMedicationUnder47Part2:
              response.data.maleDsMedicationUnder47Part2,
            femaleDsMedicationUnder47Part2:
              response.data.femaleDsMedicationUnder47Part2,
            dalitDsMedicationUnder47Part2:
              response.data.dalitDsMedicationUnder47Part2,
            ethnicMinoritiesDsMedicationUnder47Part2:
              response.data.ethnicMinoritiesDsMedicationUnder47Part2,
            janajatiDsMedicationUnder47Part2:
              response.data.janajatiDsMedicationUnder47Part2,
            madhesiDsMedicationUnder47Part2:
              response.data.madhesiDsMedicationUnder47Part2,
            brahminDsMedicationUnder47Part2:
              response.data.brahminDsMedicationUnder47Part2,
            dsMedicationUnder47Part2Source:
              response.data.dsMedicationUnder47Part2Source[0] != "" &&
                response.data.dsMedicationUnder47Part2Source != ""
                ? response.data.dsMedicationUnder47Part2Source
                : null,
            maleCrBeyondJurisdiction: response.data.maleCrBeyondJurisdiction,
            femaleCrBeyondJurisdiction:
              response.data.femaleCrBeyondJurisdiction,
            dalitCrBeyondJurisdiction: response.data.dalitCrBeyondJurisdiction,
            ethnicMinoritiesCrBeyondJurisdiction:
              response.data.ethnicMinoritiesCrBeyondJurisdiction,
            janajatiCrBeyondJurisdiction:
              response.data.janajatiCrBeyondJurisdiction,
            madhesiCrBeyondJurisdiction:
              response.data.madhesiCrBeyondJurisdiction,
            brahminCrBeyondJurisdiction:
              response.data.brahminCrBeyondJurisdiction,
            crBeyondJurisdictionSource:
              response.data.crBeyondJurisdictionSource[0] != "" &&
                response.data.crBeyondJurisdictionSource != ""
                ? response.data.crBeyondJurisdictionSource
                : null,
            maleCrRelevantInstitutions:
              response.data.maleCrRelevantInstitutions,
            femaleCrRelevantInstitutions:
              response.data.femaleCrRelevantInstitutions,
            dalitCrRelevantInstitutions:
              response.data.dalitCrRelevantInstitutions,
            ethnicMinoritiesCrRelevantInstitutions:
              response.data.ethnicMinoritiesCrRelevantInstitutions,
            janajatiCrRelevantInstitutions:
              response.data.janajatiCrRelevantInstitutions,
            madhesiCrRelevantInstitutions:
              response.data.madhesiCrRelevantInstitutions,
            brahminCrRelevantInstitutions:
              response.data.brahminCrRelevantInstitutions,
            crRelevantInstitutionsSource:
              response.data.crRelevantInstitutionsSource[0] != "" &&
                response.data.crRelevantInstitutionsSource != ""
                ? response.data.crRelevantInstitutionsSource
                : null,
            maleCrToLegalAidService: response.data.maleCrToLegalAidService,
            femaleCrToLegalAidService: response.data.femaleCrToLegalAidService,
            dalitCrToLegalAidService: response.data.dalitCrToLegalAidService,
            ethnicMinoritiesCrToLegalAidService:
              response.data.ethnicMinoritiesCrToLegalAidService,
            janajatiCrToLegalAidService:
              response.data.janajatiCrToLegalAidService,
            madhesiCrToLegalAidService:
              response.data.madhesiCrToLegalAidService,
            brahminCrToLegalAidService:
              response.data.brahminCrToLegalAidService,
            crToLegalAidServiceSource:
              response.data.crToLegalAidServiceSource[0] != "" &&
                response.data.crToLegalAidServiceSource != ""
                ? response.data.crToLegalAidServiceSource
                : null,
            maleCrToPsychoSocioCounselling:
              response.data.maleCrToPsychoSocioCounselling,
            femaleCrToPsychoSocioCounselling:
              response.data.femaleCrToPsychoSocioCounselling,
            dalitCrToPsychoSocioCounselling:
              response.data.dalitCrToPsychoSocioCounselling,
            ethnicMinoritiesCrToPsychoSocioCounselling:
              response.data.ethnicMinoritiesCrToPsychoSocioCounselling,
            janajatiCrToPsychoSocioCounselling:
              response.data.janajatiCrToPsychoSocioCounselling,
            madhesiCrToPsychoSocioCounselling:
              response.data.madhesiCrToPsychoSocioCounselling,
            brahminCrToPsychoSocioCounselling:
              response.data.brahminCrToPsychoSocioCounselling,
            crToPsychoSocioCounsellingSource:
              response.data.crToPsychoSocioCounsellingSource[0] != "" &&
                response.data.crToPsychoSocioCounsellingSource != ""
                ? response.data.crToPsychoSocioCounsellingSource
                : null,
            maleCrToMedicalInstitutions:
              response.data.maleCrToMedicalInstitutions,
            femaleCrToMedicalInstitutions:
              response.data.femaleCrToMedicalInstitutions,
            dalitCrToMedicalInstitutions:
              response.data.dalitCrToMedicalInstitutions,
            ethnicMinoritiesCrToMedicalInstitutions:
              response.data.ethnicMinoritiesCrToMedicalInstitutions,
            janajatiCrToMedicalInstitutions:
              response.data.janajatiCrToMedicalInstitutions,
            madhesiCrToMedicalInstitutions:
              response.data.madhesiCrToMedicalInstitutions,
            brahminCrToMedicalInstitutions:
              response.data.brahminCrToMedicalInstitutions,
            crToMedicalInstitutionsSource:
              response.data.crToMedicalInstitutionsSource[0] != "" &&
                response.data.crToMedicalInstitutionsSource != ""
                ? response.data.crToMedicalInstitutionsSource
                : null,
            maleCrAboutDisabilityCard: response.data.maleCrAboutDisabilityCard,
            femaleCrAboutDisabilityCard:
              response.data.femaleCrAboutDisabilityCard,
            dalitCrAboutDisabilityCard:
              response.data.dalitCrAboutDisabilityCard,
            ethnicMinoritiesCrAboutDisabilityCard:
              response.data.ethnicMinoritiesCrAboutDisabilityCard,
            janajatiCrAboutDisabilityCard:
              response.data.janajatiCrAboutDisabilityCard,
            madhesiCrAboutDisabilityCard:
              response.data.madhesiCrAboutDisabilityCard,
            brahminCrAboutDisabilityCard:
              response.data.brahminCrAboutDisabilityCard,
            crAboutDisabilityCardSource:
              response.data.crAboutDisabilityCardSource[0] != "" &&
                response.data.crAboutDisabilityCardSource != ""
                ? response.data.crAboutDisabilityCardSource
                : null,
            firRegisteredByMale: response.data.firRegisteredByMale,
            firRegisteredByFemale: response.data.firRegisteredByFemale,
            firRegisteredByDalit: response.data.firRegisteredByDalit,
            firRegisteredByEthnicMinorities:
              response.data.firRegisteredByEthnicMinorities,
            firRegisteredByJanajati: response.data.firRegisteredByJanajati,
            firRegisteredByMadhesi: response.data.firRegisteredByMadhesi,
            firRegisteredByBrahmin: response.data.firRegisteredByBrahmin,
            firRegisteredSource:
              response.data.firRegisteredSource[0] != "" &&
                response.data.firRegisteredSource != ""
                ? response.data.firRegisteredSource
                : null,
            gbvCaseProsecutedByCourt:
              response.data.gbvCaseProsecutedByCourt,
            tipCaseProsecutedByCourt: response.data.tipCaseProsecutedByCourt,
            caseProsecutedByCourtSource:
              response.data.caseProsecutedByCourtSource[0] != "" &&
                response.data.caseProsecutedByCourtSource != ""
                ? response.data.caseProsecutedByCourtSource
                : null,
            gbvCaseDecidedByCourt:
              response.data.gbvCaseDecidedByCourt,
            tipCaseDecidedByCourt: response.data.tipCaseDecidedByCourt,
            caseDecidedByCourtSource:
              response.data.caseDecidedByCourtSource[0] != "" &&
                response.data.caseDecidedByCourtSource != ""
                ? response.data.caseDecidedByCourtSource
                : null,

            othersCrToWages: response.data.othersCrToWages,
            othersCrToSeniorCitizen: response.data.othersCrToSeniorCitizen,
            othersCrToMinors: response.data.othersCrToMinors,
            othersCrUnder47Part2: response.data.othersCrUnder47Part2,
            othersCrToDivorce: response.data.othersCrToDivorce,
            othersCrToBattery: response.data.othersCrToBattery,
            othersCrToDefamation: response.data.othersCrToDefamation,
            othersDsUnder47Part1: response.data.othersDsUnder47Part1,
            othersDsMedicationUnder47Part2:
              response.data.othersDsMedicationUnder47Part2,
            othersCrBeyondJurisdiction:
              response.data.othersCrBeyondJurisdiction,
            othersCrRelevantInstitutions:
              response.data.othersCrRelevantInstitutions,
            othersCrToLegalAidService: response.data.othersCrToLegalAidService,
            othersCrToPsychoSocioCounselling:
              response.data.othersCrToPsychoSocioCounselling,
            othersCrToMedicalInstitutions:
              response.data.othersCrToMedicalInstitutions,
            othersCrAboutDisabilityCard:
              response.data.othersCrAboutDisabilityCard,
            firRegisteredByOthers: response.data.firRegisteredByOthers,

            muslimCrToWages: response.data.muslimCrToWages,
            muslimCrToSeniorCitizen: response.data.muslimCrToSeniorCitizen,
            muslimCrToMinors: response.data.muslimCrToMinors,
            muslimCrUnder47Part2: response.data.muslimCrUnder47Part2,
            muslimCrToDivorce: response.data.muslimCrToDivorce,
            muslimCrToBattery: response.data.muslimCrToBattery,
            muslimCrToDefamation: response.data.muslimCrToDefamation,
            muslimDsUnder47Part1: response.data.muslimDsUnder47Part1,
            muslimDsMedicationUnder47Part2:
              response.data.muslimDsMedicationUnder47Part2,
            muslimCrBeyondJurisdiction:
              response.data.muslimCrBeyondJurisdiction,
            muslimCrRelevantInstitutions:
              response.data.muslimCrRelevantInstitutions,
            muslimCrToLegalAidService: response.data.muslimCrToLegalAidService,
            muslimCrToPsychoSocioCounselling:
              response.data.muslimCrToPsychoSocioCounselling,
            muslimCrToMedicalInstitutions:
              response.data.muslimCrToMedicalInstitutions,
            muslimCrAboutDisabilityCard:
              response.data.muslimCrAboutDisabilityCard,
            firRegisteredByMuslim: response.data.firRegisteredByMuslim,

            crAboutTip: response.data.crAboutTip,
            crAboutPolygamy: response.data.crAboutPolygamy,
            crAboutChildMarriage: response.data.crAboutChildMarriage,
            crAboutForcedAction: response.data.crAboutForcedAction,
            crAboutForcedActionIndustry: response.data.crAboutForcedActionIndustry,
            crAboutUnnaturalIntercourse: response.data.crAboutUnnaturalIntercourse,
            crAboutChildSexualAbuse: response.data.crAboutChildSexualAbuse,
            crAboutSexualAbuse: response.data.crAboutSexualAbuse,
            crAboutAccusedOfWitchcraft: response.data.crAboutAccusedOfWitchcraft,
            crAboutDomesticViolence: response.data.crAboutDomesticViolence,
            crToWomenAndChildrenSource:
              response.data.crToWomenAndChildrenSource[0] != "" &&
                response.data.crToWomenAndChildrenSource != ""
                ? response.data.crToWomenAndChildrenSource
                : null,
            crAboutTipHumanOrganTransplantation: response.data.crAboutTipHumanOrganTransplantation,
            crAboutForcedTip: response.data.crAboutForcedTip,
            crAboutBeatenAndMiscarried: response.data.crAboutBeatenAndMiscarried,
            crAboutThrowingAliveChild: response.data.crAboutThrowingAliveChild,
            crAboutKidnappingAndRape: response.data.crAboutKidnappingAndRape,
            crAboutDutyByForce: response.data.crAboutDutyByForce,
            crAboutAbductionAndDuty: response.data.crAboutAbductionAndDuty,
            crMiscellaneousSource:
              response.data.crMiscellaneousSource[0] != "" &&
                response.data.crMiscellaneousSource != ""
                ? response.data.crMiscellaneousSource
                : null,

            otherEthnicityCrToWages: response.data.otherEthnicityCrToWages,
            otherEthnicityCrToSeniorCitizen: response.data.otherEthnicityCrToSeniorCitizen,
            otherEthnicityCrToMinors: response.data.otherEthnicityCrToMinors,
            otherEthnicityCrUnder47Part2: response.data.otherEthnicityCrUnder47Part2,
            otherEthnicityCrToDivorce: response.data.otherEthnicityCrToDivorce,
            otherEthnicityCrToBattery: response.data.otherEthnicityCrToBattery,
            otherEthnicityCrToDefamation: response.data.otherEthnicityCrToDefamation,
            otherEthnicityDsUnder47Part1: response.data.otherEthnicityDsUnder47Part1,
            otherEthnicityDsMedicationUnder47Part2: response.data.otherEthnicityDsMedicationUnder47Part2,
            otherEthnicityCrBeyondJurisdiction: response.data.otherEthnicityCrBeyondJurisdiction,
            otherEthnicityCrRelevantInstitutions: response.data.otherEthnicityCrRelevantInstitutions,
            otherEthnicityCrToLegalAidService: response.data.otherEthnicityCrToLegalAidService,
            otherEthnicityCrToPsychoSocioCounselling: response.data.otherEthnicityCrToPsychoSocioCounselling,
            otherEthnicityCrToMedicalInstitutions: response.data.otherEthnicityCrToMedicalInstitutions,
            otherEthnicityCrAboutDisabilityCard: response.data.otherEthnicityCrAboutDisabilityCard,
            firRegisteredByOtherEthnicity: response.data.firRegisteredByOtherEthnicity,
            otherCaseProsecutedByCourt: response.data.otherCaseProsecutedByCourt,
            otherCaseDecidedByCourt: response.data.otherCaseDecidedByCourt,
            crAboutWomenAndChildrenOther: response.data.crAboutWomenAndChildrenOther,
            crMiscellaneousOther: response.data.crMiscellaneousOther,
          });
        } else {
          console.log("no data");
          reset({
            crUnder47Part1Source: [],
            crToWagesSource: [],
            crToSeniorCitizenSource: [],
            crToMinorsSource: [],
            crUnder47Part2Source: [],
            crToDivorceSource: [],
            crToBatterySource: [],
            crToDefamationSource: [],
            dsUnder47Part1Source: [],
            dsMedicationUnder47Part2Source: [],
            crBeyondJurisdictionSource: [],
            crRelevantInstitutionsSource: [],
            crToLegalAidServiceSource: [],
            crToPsychoSocioCounsellingSource: [],
            crToMedicalInstitutionsSource: [],
            crAboutDisabilityCardSource: [],
            firRegisteredSource: [],
            caseProsecutedByCourtSource: [],
            caseDecidedByCourtSource: [],
            crToWomenAndChildrenSource: [],
            crMiscellaneousSource: []
          });
        }
      })
    );
  };

  const fiscalYearValidation = () => {
    if (fiscalYear === "" || quarter === "") {
      toast.current.show({
        severity: "warn",
        summary: t("selectFiscalYearQuarter"),
        life: 3000,
      });
    } else {
      setEnableForm(false);
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <Card
        className="p-mb-1"
        style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}
      >
        <div className=" p-card-content">
          <h4 className="p-pt-0">{t("complaintRegistration")}</h4>
        </div>
      </Card>

      <Card className="p-mt-0"
      // style={{ height: "72vh", overflowY: "auto" }}
      >
        <div className=" p-card-content">
          <form className="p-grid p-fluid" autoComplete="off">
            <Organization submitOrganizationId={handleOrganization} />
            {hideBtn === "Yes" ? <></> : <></>}

            <FiscalQuarter
              fiscalYearValue={fiscalYear}
              handleFiscalYearState={handleFiscalYear}
              quarterValue={quarter}
              handleQuarterState={handleQuarter}
            />
            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 ">
                <hr style={{ marginTop: "5px" }}></hr>
              </div>
            </div>
            {/* <div className="p-field p-col-12 p-md-12 ">
                            <div className="p-field p-col-12 p-md-12 ">
                                <h4 className='HeadingTitle' style={{}}> {t("generalInfoForm")}</h4>
                            </div>
                        </div> */}

            <div className="main-form" onClick={fiscalYearValidation} disabled={enableForm}>
              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crUnder47Part1")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crUnder47Part1Desc")}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crUnder47Part1"
                      control={control}
                      autoFocus
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
                          min="0"
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crUnder47Part1Source"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crUnder47Part1SourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crUnder47Part1SourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crUnder47Part1Source")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crToWages")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crToWagesDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleCrToWages"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleCrToWages"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersCrToWages"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("maleCrToWages") ? getValues("maleCrToWages") : 0)
                            + (getValues("femaleCrToWages") ? getValues("femaleCrToWages") : 0)
                            + (getValues("othersCrToWages") ? getValues("othersCrToWages") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitCrToWages"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimCrToWages"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiCrToWages"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiCrToWages"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminCrToWages"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesCrToWages"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityCrToWages"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitCrToWages") ? getValues("dalitCrToWages") : 0)
                            + (getValues("muslimCrToWages") ? getValues("muslimCrToWages") : 0)
                            + (getValues("janajatiCrToWages") ? getValues("janajatiCrToWages") : 0)
                            + (getValues("madhesiCrToWages") ? getValues("madhesiCrToWages") : 0)
                            + (getValues("brahminCrToWages") ? getValues("brahminCrToWages") : 0)
                            + (getValues("ethnicMinoritiesCrToWages") ? getValues("ethnicMinoritiesCrToWages") : 0)
                            + (getValues("otherEthnicityCrToWages") ? getValues("otherEthnicityCrToWages") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crToWagesSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crToWagesSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crToWagesSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crToWagesSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crToSeniorCitizen")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crToSeniorCitizenDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleCrToSeniorCitizen"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleCrToSeniorCitizen"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersCrToSeniorCitizen"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("maleCrToSeniorCitizen") ? getValues("maleCrToSeniorCitizen") : 0)
                            + (getValues("femaleCrToSeniorCitizen") ? getValues("femaleCrToSeniorCitizen") : 0)
                            + (getValues("othersCrToSeniorCitizen") ? getValues("othersCrToSeniorCitizen") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitCrToSeniorCitizen"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimCrToSeniorCitizen"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiCrToSeniorCitizen"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiCrToSeniorCitizen"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminCrToSeniorCitizen"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesCrToSeniorCitizen"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityCrToSeniorCitizen"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitCrToSeniorCitizen") ? getValues("dalitCrToSeniorCitizen") : 0)
                            + (getValues("muslimCrToSeniorCitizen") ? getValues("muslimCrToSeniorCitizen") : 0)
                            + (getValues("janajatiCrToSeniorCitizen") ? getValues("janajatiCrToSeniorCitizen") : 0)
                            + (getValues("madhesiCrToSeniorCitizen") ? getValues("madhesiCrToSeniorCitizen") : 0)
                            + (getValues("brahminCrToSeniorCitizen") ? getValues("brahminCrToSeniorCitizen") : 0)
                            + (getValues("ethnicMinoritiesCrToSeniorCitizen") ? getValues("ethnicMinoritiesCrToSeniorCitizen") : 0)
                            + (getValues("otherEthnicityCrToSeniorCitizen") ? getValues("otherEthnicityCrToSeniorCitizen") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crToSeniorCitizenSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crToSeniorCitizenSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crToSeniorCitizenSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crToSeniorCitizenSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crToMinors")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crToMinorsDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleCrToMinors"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleCrToMinors"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersCrToMinors"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("maleCrToMinors") ? getValues("maleCrToMinors") : 0)
                            + (getValues("femaleCrToMinors") ? getValues("femaleCrToMinors") : 0)
                            + (getValues("othersCrToMinors") ? getValues("othersCrToMinors") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitCrToMinors"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimCrToMinors"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiCrToMinors"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiCrToMinors"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminCrToMinors"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesCrToMinors"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityCrToMinors"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totCrToMinors"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitCrToMinors") ? getValues("dalitCrToMinors") : 0)
                            + (getValues("muslimCrToMinors") ? getValues("muslimCrToMinors") : 0)
                            + (getValues("janajatiCrToMinors") ? getValues("janajatiCrToMinors") : 0)
                            + (getValues("madhesiCrToMinors") ? getValues("madhesiCrToMinors") : 0)
                            + (getValues("brahminCrToMinors") ? getValues("brahminCrToMinors") : 0)
                            + (getValues("ethnicMinoritiesCrToMinors") ? getValues("ethnicMinoritiesCrToMinors") : 0)
                            + (getValues("otherEthnicityCrToMinors") ? getValues("otherEthnicityCrToMinors") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crToMinorsSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crToMinorsSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crToMinorsSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crToMinorsSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crUnder47Part2")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crUnder47Part2Desc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleCrUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleCrUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersCrUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("maleCrUnder47Part2") ? getValues("maleCrUnder47Part2") : 0)
                            + (getValues("femaleCrUnder47Part2") ? getValues("femaleCrUnder47Part2") : 0)
                            + (getValues("othersCrUnder47Part2") ? getValues("othersCrUnder47Part2") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitCrUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimCrUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiCrUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiCrUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminCrUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesCrUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityCrUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitCrUnder47Part2") ? getValues("dalitCrUnder47Part2") : 0)
                            + (getValues("muslimCrUnder47Part2") ? getValues("muslimCrUnder47Part2") : 0)
                            + (getValues("janajatiCrUnder47Part2") ? getValues("janajatiCrUnder47Part2") : 0)
                            + (getValues("madhesiCrUnder47Part2") ? getValues("madhesiCrUnder47Part2") : 0)
                            + (getValues("brahminCrUnder47Part2") ? getValues("brahminCrUnder47Part2") : 0)
                            + (getValues("ethnicMinoritiesCrUnder47Part2") ? getValues("ethnicMinoritiesCrUnder47Part2") : 0)
                            + (getValues("otherEthnicityCrUnder47Part2") ? getValues("otherEthnicityCrUnder47Part2") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crUnder47Part2Source"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crUnder47Part2SourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crUnder47Part2SourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crUnder47Part2Source")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crToDivorce")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crToDivorceDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleCrToDivorce"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleCrToDivorce"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersCrToDivorce"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("maleCrToDivorce") ? getValues("maleCrToDivorce") : 0)
                                + (getValues("femaleCrToDivorce") ? getValues("femaleCrToDivorce") : 0)
                                + (getValues("othersCrToDivorce") ? getValues("othersCrToDivorce") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitCrToDivorce"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimCrToDivorce"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiCrToDivorce"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiCrToDivorce"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminCrToDivorce"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesCrToDivorce"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityCrToDivorce"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitCrToDivorce") ? getValues("dalitCrToDivorce") : 0)
                            + (getValues("muslimCrToDivorce") ? getValues("muslimCrToDivorce") : 0)
                            + (getValues("janajatiCrToDivorce") ? getValues("janajatiCrToDivorce") : 0)
                            + (getValues("madhesiCrToDivorce") ? getValues("madhesiCrToDivorce") : 0)
                            + (getValues("brahminCrToDivorce") ? getValues("brahminCrToDivorce") : 0)
                            + (getValues("ethnicMinoritiesCrToDivorce") ? getValues("ethnicMinoritiesCrToDivorce") : 0)
                            + (getValues("otherEthnicityCrToDivorce") ? getValues("otherEthnicityCrToDivorce") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crToDivorceSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crToDivorceSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crToDivorceSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crToDivorceSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crToBattery")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crToBatteryDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleCrToBattery"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleCrToBattery"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersCrToBattery"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("maleCrToBattery") ? getValues("maleCrToBattery") : 0)
                                + (getValues("femaleCrToBattery") ? getValues("femaleCrToBattery") : 0)
                                + (getValues("othersCrToBattery") ? getValues("othersCrToBattery") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitCrToBattery"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimCrToBattery"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiCrToBattery"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiCrToBattery"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminCrToBattery"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesCrToBattery"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityCrToBattery"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="totCrToBattery"
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitCrToBattery") ? getValues("dalitCrToBattery") : 0)
                            + (getValues("muslimCrToBattery") ? getValues("muslimCrToBattery") : 0)
                            + (getValues("janajatiCrToBattery") ? getValues("janajatiCrToBattery") : 0)
                            + (getValues("madhesiCrToBattery") ? getValues("madhesiCrToBattery") : 0)
                            + (getValues("brahminCrToBattery") ? getValues("brahminCrToBattery") : 0)
                            + (getValues("ethnicMinoritiesCrToBattery") ? getValues("ethnicMinoritiesCrToBattery") : 0)
                            + (getValues("otherEthnicityCrToBattery") ? getValues("otherEthnicityCrToBattery") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crToBatterySource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crToBatterySourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crToBatterySourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crToBatterySource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crToDefamation")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crToDefamationDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleCrToDefamation"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleCrToDefamation"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersCrToDefamation"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("maleCrToDefamation") ? getValues("maleCrToDefamation") : 0)
                                + (getValues("femaleCrToDefamation") ? getValues("femaleCrToDefamation") : 0)
                                + (getValues("othersCrToDefamation") ? getValues("othersCrToDefamation") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitCrToDefamation"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimCrToDefamation"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiCrToDefamation"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiCrToDefamation"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminCrToDefamation"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesCrToDefamation"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityCrToDefamation"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitCrToDefamation") ? getValues("dalitCrToDefamation") : 0)
                            + (getValues("muslimCrToDefamation") ? getValues("muslimCrToDefamation") : 0)
                            + (getValues("janajatiCrToDefamation") ? getValues("janajatiCrToDefamation") : 0)
                            + (getValues("madhesiCrToDefamation") ? getValues("madhesiCrToDefamation") : 0)
                            + (getValues("brahminCrToDefamation") ? getValues("brahminCrToDefamation") : 0)
                            + (getValues("ethnicMinoritiesCrToDefamation") ? getValues("ethnicMinoritiesCrToDefamation") : 0)
                            + (getValues("otherEthnicityCrToDefamation") ? getValues("otherEthnicityCrToDefamation") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crToDefamationSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crToDefamationSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crToDefamationSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crToDefamationSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("dsUnder47Part1")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("dsUnder47Part1Desc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleDsUnder47Part1"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleDsUnder47Part1"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersDsUnder47Part1"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("maleDsUnder47Part1") ? getValues("maleDsUnder47Part1") : 0)
                                + (getValues("femaleDsUnder47Part1") ? getValues("femaleDsUnder47Part1") : 0)
                                + (getValues("othersDsUnder47Part1") ? getValues("othersDsUnder47Part1") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitDsUnder47Part1"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimDsUnder47Part1"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiDsUnder47Part1"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiDsUnder47Part1"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminDsUnder47Part1"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesDsUnder47Part1"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityDsUnder47Part1"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitDsUnder47Part1") ? getValues("dalitDsUnder47Part1") : 0)
                            + (getValues("muslimDsUnder47Part1") ? getValues("muslimDsUnder47Part1") : 0)
                            + (getValues("janajatiDsUnder47Part1") ? getValues("janajatiDsUnder47Part1") : 0)
                            + (getValues("madhesiDsUnder47Part1") ? getValues("madhesiDsUnder47Part1") : 0)
                            + (getValues("brahminDsUnder47Part1") ? getValues("brahminDsUnder47Part1") : 0)
                            + (getValues("ethnicMinoritiesDsUnder47Part1") ? getValues("ethnicMinoritiesDsUnder47Part1") : 0)
                            + (getValues("otherEthnicityDsUnder47Part1") ? getValues("otherEthnicityDsUnder47Part1") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="dsUnder47Part1Source"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("dsUnder47Part1SourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("dsUnder47Part1SourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("dsUnder47Part1Source")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("dsMedicationUnder47Part2")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("dsMedicationUnder47Part2Desc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleDsMedicationUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleDsMedicationUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersDsMedicationUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("maleDsMedicationUnder47Part2") ? getValues("maleDsMedicationUnder47Part2") : 0)
                                + (getValues("femaleDsMedicationUnder47Part2") ? getValues("femaleDsMedicationUnder47Part2") : 0)
                                + (getValues("othersDsMedicationUnder47Part2") ? getValues("othersDsMedicationUnder47Part2") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitDsMedicationUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimDsMedicationUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiDsMedicationUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiDsMedicationUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminDsMedicationUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesDsMedicationUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityDsMedicationUnder47Part2"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitDsMedicationUnder47Part2") ? getValues("dalitDsMedicationUnder47Part2") : 0)
                            + (getValues("muslimDsMedicationUnder47Part2") ? getValues("muslimDsMedicationUnder47Part2") : 0)
                            + (getValues("janajatiDsMedicationUnder47Part2") ? getValues("janajatiDsMedicationUnder47Part2") : 0)
                            + (getValues("madhesiDsMedicationUnder47Part2") ? getValues("madhesiDsMedicationUnder47Part2") : 0)
                            + (getValues("brahminDsMedicationUnder47Part2") ? getValues("brahminDsMedicationUnder47Part2") : 0)
                            + (getValues("ethnicMinoritiesDsMedicationUnder47Part2") ? getValues("ethnicMinoritiesDsMedicationUnder47Part2") : 0)
                            + (getValues("otherEthnicityDsMedicationUnder47Part2") ? getValues("otherEthnicityDsMedicationUnder47Part2") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="dsMedicationUnder47Part2Source"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("dsMedicationUnder47Part2SourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("dsMedicationUnder47Part2SourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("dsMedicationUnder47Part2Source")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crBeyondJurisdiction")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crBeyondJurisdictionDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleCrBeyondJurisdiction"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleCrBeyondJurisdiction"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersCrBeyondJurisdiction"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("maleCrBeyondJurisdiction") ? getValues("maleCrBeyondJurisdiction") : 0)
                                + (getValues("femaleCrBeyondJurisdiction") ? getValues("femaleCrBeyondJurisdiction") : 0)
                                + (getValues("othersCrBeyondJurisdiction") ? getValues("othersCrBeyondJurisdiction") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitCrBeyondJurisdiction"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimCrBeyondJurisdiction"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiCrBeyondJurisdiction"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiCrBeyondJurisdiction"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminCrBeyondJurisdiction"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesCrBeyondJurisdiction"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityCrBeyondJurisdiction"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitCrBeyondJurisdiction") ? getValues("dalitCrBeyondJurisdiction") : 0)
                            + (getValues("muslimCrBeyondJurisdiction") ? getValues("muslimCrBeyondJurisdiction") : 0)
                            + (getValues("janajatiCrBeyondJurisdiction") ? getValues("janajatiCrBeyondJurisdiction") : 0)
                            + (getValues("madhesiCrBeyondJurisdiction") ? getValues("madhesiCrBeyondJurisdiction") : 0)
                            + (getValues("brahminCrBeyondJurisdiction") ? getValues("brahminCrBeyondJurisdiction") : 0)
                            + (getValues("ethnicMinoritiesCrBeyondJurisdiction") ? getValues("ethnicMinoritiesCrBeyondJurisdiction") : 0)
                            + (getValues("otherEthnicityCrBeyondJurisdiction") ? getValues("otherEthnicityCrBeyondJurisdiction") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crBeyondJurisdictionSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crBeyondJurisdictionSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crBeyondJurisdictionSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crBeyondJurisdictionSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crRelevantInstitutions")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crRelevantInstitutionsDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleCrRelevantInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleCrRelevantInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersCrRelevantInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("maleCrRelevantInstitutions") ? getValues("maleCrRelevantInstitutions") : 0)
                                + (getValues("femaleCrRelevantInstitutions") ? getValues("femaleCrRelevantInstitutions") : 0)
                                + (getValues("othersCrRelevantInstitutions") ? getValues("othersCrRelevantInstitutions") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitCrRelevantInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimCrRelevantInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiCrRelevantInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiCrRelevantInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminCrRelevantInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesCrRelevantInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityCrRelevantInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitCrRelevantInstitutions") ? getValues("dalitCrRelevantInstitutions") : 0)
                            + (getValues("muslimCrRelevantInstitutions") ? getValues("muslimCrRelevantInstitutions") : 0)
                            + (getValues("janajatiCrRelevantInstitutions") ? getValues("janajatiCrRelevantInstitutions") : 0)
                            + (getValues("madhesiCrRelevantInstitutions") ? getValues("madhesiCrRelevantInstitutions") : 0)
                            + (getValues("brahminCrRelevantInstitutions") ? getValues("brahminCrRelevantInstitutions") : 0)
                            + (getValues("ethnicMinoritiesCrRelevantInstitutions") ? getValues("ethnicMinoritiesCrRelevantInstitutions") : 0)
                            + (getValues("otherEthnicityCrRelevantInstitutions") ? getValues("otherEthnicityCrRelevantInstitutions") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crRelevantInstitutionsSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crRelevantInstitutionsSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crRelevantInstitutionsSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crRelevantInstitutionsSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crToLegalAidService")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crToLegalAidServiceDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleCrToLegalAidService"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleCrToLegalAidService"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersCrToLegalAidService"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("maleCrToLegalAidService") ? getValues("maleCrToLegalAidService") : 0)
                                + (getValues("femaleCrToLegalAidService") ? getValues("femaleCrToLegalAidService") : 0)
                                + (getValues("othersCrToLegalAidService") ? getValues("othersCrToLegalAidService") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitCrToLegalAidService"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimCrToLegalAidService"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiCrToLegalAidService"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiCrToLegalAidService"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminCrToLegalAidService"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesCrToLegalAidService"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityCrToLegalAidService"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitCrToLegalAidService") ? getValues("dalitCrToLegalAidService") : 0)
                            + (getValues("muslimCrToLegalAidService") ? getValues("muslimCrToLegalAidService") : 0)
                            + (getValues("janajatiCrToLegalAidService") ? getValues("janajatiCrToLegalAidService") : 0)
                            + (getValues("madhesiCrToLegalAidService") ? getValues("madhesiCrToLegalAidService") : 0)
                            + (getValues("brahminCrToLegalAidService") ? getValues("brahminCrToLegalAidService") : 0)
                            + (getValues("ethnicMinoritiesCrToLegalAidService") ? getValues("ethnicMinoritiesCrToLegalAidService") : 0)
                            + (getValues("otherEthnicityCrToLegalAidService") ? getValues("otherEthnicityCrToLegalAidService") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crToLegalAidServiceSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crToLegalAidServiceSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crToLegalAidServiceSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crToLegalAidServiceSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crToPsychoSocioCounselling")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crToPsychoSocioCounsellingDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleCrToPsychoSocioCounselling"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleCrToPsychoSocioCounselling"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersCrToPsychoSocioCounselling"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("maleCrToPsychoSocioCounselling") ? getValues("maleCrToPsychoSocioCounselling") : 0)
                                + (getValues("femaleCrToPsychoSocioCounselling") ? getValues("femaleCrToPsychoSocioCounselling") : 0)
                                + (getValues("othersCrToPsychoSocioCounselling") ? getValues("othersCrToPsychoSocioCounselling") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitCrToPsychoSocioCounselling"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimCrToPsychoSocioCounselling"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiCrToPsychoSocioCounselling"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiCrToPsychoSocioCounselling"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminCrToPsychoSocioCounselling"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesCrToPsychoSocioCounselling"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityCrToPsychoSocioCounselling"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitCrToPsychoSocioCounselling") ? getValues("dalitCrToPsychoSocioCounselling") : 0)
                            + (getValues("muslimCrToPsychoSocioCounselling") ? getValues("muslimCrToPsychoSocioCounselling") : 0)
                            + (getValues("janajatiCrToPsychoSocioCounselling") ? getValues("janajatiCrToPsychoSocioCounselling") : 0)
                            + (getValues("madhesiCrToPsychoSocioCounselling") ? getValues("madhesiCrToPsychoSocioCounselling") : 0)
                            + (getValues("brahminCrToPsychoSocioCounselling") ? getValues("brahminCrToPsychoSocioCounselling") : 0)
                            + (getValues("ethnicMinoritiesCrToPsychoSocioCounselling") ? getValues("ethnicMinoritiesCrToPsychoSocioCounselling") : 0)
                            + (getValues("otherEthnicityCrToPsychoSocioCounselling") ? getValues("otherEthnicityCrToPsychoSocioCounselling") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crToPsychoSocioCounsellingSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crToPsychoSocioCounsellingSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crToPsychoSocioCounsellingSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crToPsychoSocioCounsellingSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crToMedicalInstitutions")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crToMedicalInstitutionsDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleCrToMedicalInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleCrToMedicalInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersCrToMedicalInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("maleCrToMedicalInstitutions") ? getValues("maleCrToMedicalInstitutions") : 0)
                                + (getValues("femaleCrToMedicalInstitutions") ? getValues("femaleCrToMedicalInstitutions") : 0)
                                + (getValues("othersCrToMedicalInstitutions") ? getValues("othersCrToMedicalInstitutions") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitCrToMedicalInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimCrToMedicalInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiCrToMedicalInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiCrToMedicalInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminCrToMedicalInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesCrToMedicalInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityCrToMedicalInstitutions"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitCrToMedicalInstitutions") ? getValues("dalitCrToMedicalInstitutions") : 0)
                            + (getValues("muslimCrToMedicalInstitutions") ? getValues("muslimCrToMedicalInstitutions") : 0)
                            + (getValues("janajatiCrToMedicalInstitutions") ? getValues("janajatiCrToMedicalInstitutions") : 0)
                            + (getValues("madhesiCrToMedicalInstitutions") ? getValues("madhesiCrToMedicalInstitutions") : 0)
                            + (getValues("brahminCrToMedicalInstitutions") ? getValues("brahminCrToMedicalInstitutions") : 0)
                            + (getValues("ethnicMinoritiesCrToMedicalInstitutions") ? getValues("ethnicMinoritiesCrToMedicalInstitutions") : 0)
                            + (getValues("otherEthnicityCrToMedicalInstitutions") ? getValues("otherEthnicityCrToMedicalInstitutions") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crToMedicalInstitutionsSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crToMedicalInstitutionsSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crToMedicalInstitutionsSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crToMedicalInstitutionsSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crAboutDisabilityCard")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crAboutDisabilityCardDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="maleCrAboutDisabilityCard"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="femaleCrAboutDisabilityCard"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="othersCrAboutDisabilityCard"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("maleCrAboutDisabilityCard") ? getValues("maleCrAboutDisabilityCard") : 0)
                                + (getValues("femaleCrAboutDisabilityCard") ? getValues("femaleCrAboutDisabilityCard") : 0)
                                + (getValues("othersCrAboutDisabilityCard") ? getValues("othersCrAboutDisabilityCard") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="dalitCrAboutDisabilityCard"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="muslimCrAboutDisabilityCard"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="janajatiCrAboutDisabilityCard"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="madhesiCrAboutDisabilityCard"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="brahminCrAboutDisabilityCard"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="ethnicMinoritiesCrAboutDisabilityCard"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherEthnicityCrAboutDisabilityCard"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("dalitCrAboutDisabilityCard") ? getValues("dalitCrAboutDisabilityCard") : 0)
                            + (getValues("muslimCrAboutDisabilityCard") ? getValues("muslimCrAboutDisabilityCard") : 0)
                            + (getValues("janajatiCrAboutDisabilityCard") ? getValues("janajatiCrAboutDisabilityCard") : 0)
                            + (getValues("madhesiCrAboutDisabilityCard") ? getValues("madhesiCrAboutDisabilityCard") : 0)
                            + (getValues("brahminCrAboutDisabilityCard") ? getValues("brahminCrAboutDisabilityCard") : 0)
                            + (getValues("ethnicMinoritiesCrAboutDisabilityCard") ? getValues("ethnicMinoritiesCrAboutDisabilityCard") : 0)
                            + (getValues("otherEthnicityCrAboutDisabilityCard") ? getValues("otherEthnicityCrAboutDisabilityCard") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crAboutDisabilityCardSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crAboutDisabilityCardSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crAboutDisabilityCardSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crAboutDisabilityCardSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("firRegistered")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("firRegisteredDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byGender")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="firRegisteredByMale"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("male")}
                          tooltip={t("male")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="firRegisteredByFemale"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("female")}
                          tooltip={t("female")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="firRegisteredByOthers"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                      <div className="p-field p-col-2 p-md-2 float-left">
                        <Controller
                          control={control}
                          render={({ field, fieldState }) => (
                            <InputNumber
                              id={field.name}
                              {...field}
                              className={classNames({
                                "p-invalid": fieldState.invalid,
                              })}
                              value={(getValues("firRegisteredByMale") ? getValues("firRegisteredByMale") : 0)
                                + (getValues("firRegisteredByFemale") ? getValues("firRegisteredByFemale") : 0)
                                + (getValues("firRegisteredByOthers") ? getValues("firRegisteredByOthers") : 0)}
                              onChange={(e) => {
                                field.onChange(e.value);
                              }}
                              min="0"
                              disabled
                              tooltip={t("total")}
                              tooltipOptions={{
                                position: "bottom"
                              }}
                            />
                          )}
                        />
                      </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byEthnicity")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="firRegisteredByDalit"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dalit")}
                          tooltip={t("dalit")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="firRegisteredByMuslim"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("muslim")}
                          tooltip={t("muslim")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="firRegisteredByJanajati"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("janajati")}
                          tooltip={t("janajati")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="firRegisteredByMadhesi"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("madhesi")}
                          tooltip={t("madhesi")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="firRegisteredByBrahmin"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("brahminOther")}
                          tooltip={t("brahminOther")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="firRegisteredByEthnicMinorities"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("ethnicMinorities")}
                          tooltip={t("ethnicMinorities")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="firRegisteredByOtherEthnicity"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("firRegisteredByDalit") ? getValues("firRegisteredByDalit") : 0)
                            + (getValues("firRegisteredByMuslim") ? getValues("firRegisteredByMuslim") : 0)
                            + (getValues("firRegisteredByJanajati") ? getValues("firRegisteredByJanajati") : 0)
                            + (getValues("firRegisteredByMadhesi") ? getValues("firRegisteredByMadhesi") : 0)
                            + (getValues("firRegisteredByBrahmin") ? getValues("firRegisteredByBrahmin") : 0)
                            + (getValues("firRegisteredByEthnicMinorities") ? getValues("firRegisteredByEthnicMinorities") : 0)
                            + (getValues("firRegisteredByOtherEthnicity") ? getValues("firRegisteredByOtherEthnicity") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="firRegisteredSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("firRegisteredSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("firRegisteredSource", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("firRegisteredSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("caseProsecutedByCourt")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("caseProsecutedByCourtDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byCase")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="tipCaseProsecutedByCourt"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("tip")}
                          tooltip={t("tip")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="gbvCaseProsecutedByCourt"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("gbv")}
                          tooltip={t("gbv")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherCaseProsecutedByCourt"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("gbvCaseProsecutedByCourt") ? getValues("gbvCaseProsecutedByCourt") : 0)
                            + (getValues("tipCaseProsecutedByCourt") ? getValues("tipCaseProsecutedByCourt") : 0)
                            + (getValues("otherCaseProsecutedByCourt") ? getValues("otherCaseProsecutedByCourt") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="caseProsecutedByCourtSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("caseProsecutedByCourtSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("caseProsecutedByCourtSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("caseProsecutedByCourtSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("caseDecidedByCourt")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("caseDecidedByCourtDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byCase")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="tipCaseDecidedByCourt"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("tip")}
                          tooltip={t("tip")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="gbvCaseDecidedByCourt"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("gbv")}
                          tooltip={t("gbv")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="otherCaseDecidedByCourt"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("gbvCaseDecidedByCourt") ? getValues("gbvCaseDecidedByCourt") : 0)
                            + (getValues("tipCaseDecidedByCourt") ? getValues("tipCaseDecidedByCourt") : 0)
                            + (getValues("otherCaseDecidedByCourt") ? getValues("otherCaseDecidedByCourt") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="caseDecidedByCourtSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("caseDecidedByCourtSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("caseDecidedByCourtSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("caseDecidedByCourtSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crToWomenAndChildren")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crToWomenAndChildrenDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byCase")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutTip"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("tip")}
                          tooltip={t("tip")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutPolygamy"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("polygamy")}
                          tooltip={t("polygamy")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutChildMarriage"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("childMarriage")}
                          tooltip={t("childMarriage")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutForcedAction"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("forcedAction")}
                          tooltip={t("forcedAction")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutForcedActionIndustry"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("forcedActionIndustry")}
                          tooltip={t("forcedActionIndustry")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutUnnaturalIntercourse"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("unnaturalIntercourse")}
                          tooltip={t("unnaturalIntercourse")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutChildSexualAbuse"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("childSexualAbuse")}
                          tooltip={t("childSexualAbuse")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutSexualAbuse"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("sexualAbuse")}
                          tooltip={t("sexualAbuse")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutAccusedOfWitchcraft"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("accusedOfWitchcraft")}
                          tooltip={t("accusedOfWitchcraft")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="crAboutDomesticViolence"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("domesticViolence")}
                          tooltip={t("domesticViolence")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutWomenAndChildrenOther"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("crAboutTip") ? getValues("crAboutTip") : 0)
                            + (getValues("crAboutPolygamy") ? getValues("crAboutPolygamy") : 0)
                            + (getValues("crAboutChildMarriage") ? getValues("crAboutChildMarriage") : 0)
                            + (getValues("crAboutForcedAction") ? getValues("crAboutForcedAction") : 0)
                            + (getValues("crAboutForcedActionIndustry") ? getValues("crAboutForcedActionIndustry") : 0)
                            + (getValues("crAboutUnnaturalIntercourse") ? getValues("crAboutUnnaturalIntercourse") : 0)
                            + (getValues("crAboutChildSexualAbuse") ? getValues("crAboutChildSexualAbuse") : 0)
                            + (getValues("crAboutSexualAbuse") ? getValues("crAboutSexualAbuse") : 0)
                            + (getValues("crAboutAccusedOfWitchcraft") ? getValues("crAboutAccusedOfWitchcraft") : 0)
                            + (getValues("crAboutDomesticViolence") ? getValues("crAboutDomesticViolence") : 0)
                            + (getValues("crAboutWomenAndChildrenOther") ? getValues("crAboutWomenAndChildrenOther") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crToWomenAndChildrenSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crToWomenAndChildrenSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crToWomenAndChildrenSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crToWomenAndChildrenSource")}
                  </div>
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 ">
                  <hr
                    style={{ marginTop: "5px", borderTop: "1px dashed #cfcfcf" }}
                  ></hr>
                </div>
              </div>

              <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-9">
                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("crMiscellaneous")}
                    <i
                      className="pi pi-question-circle tooltip-style"
                      title={t("crMiscellaneousDesc")}
                    />
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left sub-label">
                    {t("byCase")}
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutTipHumanOrganTransplantation"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("tipHumanOrganTransplantation")}
                          tooltip={t("tipHumanOrganTransplantation")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutForcedTip"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("forcedTip")}
                          tooltip={t("forcedTip")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutBeatenAndMiscarried"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("beatenAndMiscarried")}
                          tooltip={t("beatenAndMiscarried")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutThrowingAliveChild"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("throwingAliveChild")}
                          tooltip={t("throwingAliveChild")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutKidnappingAndRape"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("kidnappingAndRape")}
                          tooltip={t("kidnappingAndRape")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crAboutDutyByForce"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("dutyByForce")}
                          tooltip={t("dutyByForce")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-1 p-md-2 float-left">
                    <Controller
                      name="crAboutAbductionAndDuty"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("abductionAndDuty")}
                          tooltip={t("abductionAndDuty")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      name="crMiscellaneousOther"
                      control={control}
                      autoFocus
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
                          min="0"
                          placeholder={t("others")}
                          tooltip={t("others")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="p-field p-col-2 p-md-2 float-left">
                    <Controller
                      control={control}
                      render={({ field, fieldState }) => (
                        <InputNumber
                          id={field.name}
                          {...field}
                          className={classNames({
                            "p-invalid": fieldState.invalid,
                          })}
                          value={(getValues("crAboutTipHumanOrganTransplantation") ? getValues("crAboutTipHumanOrganTransplantation") : 0)
                            + (getValues("crAboutForcedTip") ? getValues("crAboutForcedTip") : 0)
                            + (getValues("crAboutBeatenAndMiscarried") ? getValues("crAboutBeatenAndMiscarried") : 0)
                            + (getValues("crAboutThrowingAliveChild") ? getValues("crAboutThrowingAliveChild") : 0)
                            + (getValues("crAboutKidnappingAndRape") ? getValues("crAboutKidnappingAndRape") : 0)
                            + (getValues("crAboutDutyByForce") ? getValues("crAboutDutyByForce") : 0)
                            + (getValues("crAboutAbductionAndDuty") ? getValues("crAboutAbductionAndDuty") : 0)
                            + (getValues("crMiscellaneousOther") ? getValues("crMiscellaneousOther") : 0)}
                          onChange={(e) => {
                            field.onChange(e.value);
                          }}
                          min="0"
                          disabled
                          tooltip={t("total")}
                          tooltipOptions={{
                            position: "bottom"
                          }}
                        />
                      )}
                    />
                  </div>
                </div>
                <div class="p-col-12 p-md-3">
                  <Controller
                    name="crMiscellaneousSource"
                    control={control}
                    rules={{ required: "Source is required" }}
                    render={({ field, fieldState }) => (
                      <Source
                        id={field.name}
                        {...field}
                        className={classNames({
                          "p-invalid": fieldState.invalid,
                        })}
                        value={field.value}
                        handleSourceState={(e) => {
                          console.log("e", e);
                          field.onChange(e);
                        }}
                        sourceOtherValue={getValues("crMiscellaneousSourceOthers")}
                        handleSourceOtherState={(e) => {
                          setValue("crMiscellaneousSourceOthers", e);
                        }}
                      />
                    )}
                    defaultValue={[]}
                  />
                  <div class="p-col-12 p-md-12">
                    {getFormErrorMessage("crMiscellaneousSource")}
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
                          onClick={(e) => saveData(e)} />
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

            </div>
          </form>
        </div>
      </Card>
    </>
  );
};

export default ComplaintRegistration;
