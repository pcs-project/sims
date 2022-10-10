import React, { useState } from 'react';

import { InputText } from 'primereact/inputtext';
import { Card } from "primereact/card";
import { RadioButton } from 'primereact/radiobutton';

import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from "react-i18next";
import { YES_NO, REHABILITATED_TO } from "../constants/ITMISConstansts";

const TipDetailForm = (props) => {
     const { t } = useTranslation();

     const [sourceOfTip, setSourceOfTip] = useState();
     const [destinationOfTip, setDestinationOfTip] = useState();
     const [actOfTip, setActOfTip] = useState();
     const [meansOfTip, setMeansOfTip] = useState();
     const [purposeOfTip, setPurposeOfTip] = useState();
     const [tipCaseStatus, setTipCaseStatus] = useState();
     const [reasonForLeavingHome, setReasonForLeavingHome] = useState();
     const [relationWithTrafficker, setRelationWithTrafficker] = useState();
     const [serviceProviderType, setServiceProviderType] = useState();
     const [serviceReceivedType, setServiceReceivedType] = useState();

     const [tipRehabilitation, setTipRehabilitation] = useState();
     const [tipRehabilitatedTo, setTipRehabilitatedTo] = useState();
     const addressOfTipList = [
          { label: t("internal"), value: "Internal" },
          { label: t("crossCountryIndia"), value: "Cross country (India)" },
          { label: t("crossCountryChina"), value: "Cross country (China)" },
          { label: t("crossCountryOthers"), value: "Cross country (Others)" },
     ];
     const actOfTipList = [
          { label: t("recruitment"), value: "Recruitment" },
          { label: t("transport"), value: "Transport" },
          { label: t("transfer"), value: "Transfer" },
          { label: t("harboring"), value: "Harboring" },
          { label: t("tipReceived"), value: "Received" },
          { label: t("others"), value: "Others" },
     ];
     const meansOfTipList = [
          { label: t("gifts"), value: "Gifts" },
          { label: t("paymentsDebt"), value: "Payments/Debt" },
          { label: t("fraud"), value: "Fraud" },
          { label: t("threat"), value: "Threat" },
          { label: t("deception"), value: "Deception" },
          { label: t("coercion"), value: "Coercion" },
          { label: t("abduction"), value: "Abduction" },
          { label: t("abuseOfPower"), value: "Abuse of Power" },
          { label: t("abuseOfPositionOfVulnerability"), value: "Abuse of Position of vulnerability" },
          { label: t("others"), value: "Others" },
     ];
     const purposeOfTipList = [
          { label: t("internalLaborTrafficking"), value: "Internal Labor Trafficking" },
          { label: t("foreignLaborTrafficking"), value: "Foreign Labor Trafficking" },
          { label: t("sexTrafficking"), value: "Sex Trafficking" },
          { label: t("organHarvestingTrafficking"), value: "Organ (Harvesting) Trafficking" },
          { label: t("servileMarriage"), value: "Servile Marriage" },
          {
               label: t("internalLaborTraffickingAndForeignLaborTrafficking"),
               value: "Internal Labor Trafficking and Foreign Labor Trafficking"
          },
          {
               label: t("internalLaborTraffickingAndSexTrafficking"),
               value: "Internal Labor Trafficking and Sex Trafficking"
          },
          {
               label: t("internalLaborTraffickingAndOrganHarvestingTrafficking"),
               value: "Internal Labor Trafficking and Organ (Harvesting) Trafficking"
          },
          {
               label: t("internalLaborTraffickingAndServileMarriage"),
               value: "Internal Labor Trafficking and Servile Marriage"
          },
          {
               label: t("foreignLaborTraffickingAndSexTrafficking"),
               value: "Foreign Labor Trafficking and Sex Trafficking"
          },
          {
               label: t("foreignLaborTraffickingAndOrganHarvestingTrafficking"),
               value: "Foreign Labor Trafficking and Organ (Harvesting) Trafficking"
          },
          {
               label: t("foreignLaborTraffickingAndServileMarriage"),
               value: "Foreign Labor Trafficking and Servile Marriage"
          },
          {
               label: t("sexTraffickingAndOrganHarvestingTrafficking"),
               value: "Sex Trafficking and Organ (Harvesting) Trafficking"
          },
          { label: t("sexTraffickingAndServileMarriage"), value: "Sex Trafficking and Servile Marriage" },
          { label: t("foreignLabor"), value: "Foreign Labor" },
          { label: t("sexAndOrganTrafficking"), value: "Sex and Organ Trafficking" },
          { label: t("others"), value: "Others" },
     ];
     const tipCaseStatusList = [
          { label: t("interceptedSuspected"), value: "Intercepted (Suspected)" },
          { label: t("identifiedByCsoWorkerSuspected"), value: "Identified by CSO worker (Suspected)" },
          { label: t("rescuedSuspected"), value: "Rescued (Suspected)" },
          { label: t("repatriatedSuspected"), value: "Repatriated (Suspected)" },
          { label: t("underPoliceInvestigationSuspected"), value: "Under Police Investigation (Suspected)" },
          { label: t("reintegratedFamilyReunitedSuspected"), value: "Reintegrated/Family Reunited (Suspected)" },
          { label: t("policeInvestigationCompletedConfirmed"), value: "Police Investigation Completed (Confirmed)" },
          { label: t("reintegratedFamilyReunitedConfirmed"), value: "Reintegrated/Family Reunited (Confirmed)" },
          { label: t("selfIdentifiedConfirmed"), value: "Self-Identified (Confirmed)" },
          { label: t("caseRegisteredAtCourtConfirmed"), value: "Case registered at Court (Confirmed)" },
          { label: t("others"), value: "Others" },
     ];
     const reasonForLeavingHomeList = [
          { label: t("prospectOfAJob"), value: "Prospect of a Job" },
          { label: t("escapeThreatViolenceAbuse"), value: "Escape Threat/Violence/Abuse" },
          { label: t("coercionForceDebtBondage"), value: "Coercion/Force/Debt bondage" },
          { label: t("promiseOfBetterLifestyle"), value: "Promise of better lifestyle" },
          { label: t("others"), value: "Others" },
     ];
     const relationWithTraffickerList = [
          { label: t("completeStranger"), value: "Complete Stranger" },
          { label: t("friendsOfFriendsRelatives"), value: "Friends of friends/Relatives" },
          { label: t("friendsOrRelatives"), value: "Friends or Relatives" },
          { label: t("veryCloseRelatives"), value: "Very Close Relatives" },
          { label: t("employer"), value: "Employer" },
          { label: t("neighbour"), value: "Neighbour" },
          { label: t("others"), value: "Others" },
     ];
     const serviceProviderList = [
          { label: t("police"), value: "Police" },
          { label: t("governmentAttorney"), value: "Government Attorney" },
          { label: t("csoShelter"), value: "CSO/Shelter" },
          { label: t("court"), value: "Court" },
          { label: t("tribunals"), value: "Tribunals" },
          { label: t("ccht"), value: "CCHT" },
          { label: t("nccht"), value: "NCCHT" },
          { label: t("pccht"), value: "PCCHT" },
          { label: t("nhrc"), value: "NHRC" },
          { label: t("federalMinistriesDepartments"), value: "Federal Ministries/Departments" },
          { label: t("provincialMinistriesDepartments"), value: "Provincial Ministries/Departments" },
          { label: t("localGovernmentDepartmentUnits"), value: "Local Government Department/Units" },
          { label: t("privateSectorBusiness"), value: "Private Sector Business" },
          { label: t("others"), value: "Others" },
     ];
     const serviceReceivedList = [
          { label: t("legalAndParalegal"), value: "Legal and Paralegal" },
          { label: t("shelterFoodClothingAccommodation"), value: "Shelter (Food/Clothing/Accommodation)" },
          { label: t("livelihood"), value: "Livelihood" },
          { label: t("psychoSocialCounseling"), value: "Psycho-social Counseling" },
          { label: t("medical"), value: "Medical" },
          { label: t("education"), value: "Education" },
          { label: t("transportation"), value: "Transportation" },
          { label: t("familyReunion"), value: "Family Reunion" },
          { label: t("others"), value: "Others" },
     ];

     const referredServiceTypeList = [
          { label: t("jobPlacement"), value: "Job-placement" },
          { label: t("legalAid"), value: "Legal-aid" },
          { label: t("skillTraining"), value: "Skill training" },
          { label: t("rescue"), value: "Rescue" },
          { label: t("repartiation"), value: "Repartiation" },
          { label: t("reIntegration"), value: "Re-integration" },
     ];

     const referralCaseStatusList = [
          { label: t("referred"), value: "Referred" },
          { label: t("firRegisteredInPolice"), value: "FIR registered in police" },
          { label: t("caseFiledInTheCourt"), value: "Case filed in the court" },
          { label: t("caseDecided"), value: "Case decided" },
          { label: t("compensationReceived"), value: "Compensation received" },
     ];
     const [referredServiceType, setReferredServiceType] = useState();
     const [referralCaseStatus, setReferralCaseStatus] = useState();
     const [referralServiceReceived, setReferralServiceReceived] = useState();
     const [shelterServiceReceived, setShelterServiceReceived] = useState();

     return (
          <>
               <Card className='p-mb-1' style={{ borderRadius: '8px 8px 0px 0px', background: '#f7f7f8' }}>
                    <div className=' p-card-content'>
                         <h3 className='p-pt-0'> {t("tip")}</h3>
                    </div>
               </Card>

               <Card className='p-mt-0'>
                    <div className=' p-card-content'>
                         <div className="p-grid p-col-12 p-md-12 ">
                              <div className="p-col-12 p-md-6 ">
                                   <div className="p-field p-col-12 p-md-12 float-left main-label">
                                        {t("sourceOfTip")}:
                                   </div>
                                   <div className="p-field p-col-12 p-md-12 float-left">
                                        <Dropdown
                                             name="tipSource"
                                             placeholder={t("select")}
                                             {...props.register("tipDetails.tipSource"
                                                  // , {
                                                  //     required: "Source of TIP is Required",
                                                  // }
                                             )}
                                             value={props.getValues("tipDetails.tipSource")}
                                             options={addressOfTipList}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.tipSource", e.value);
                                                  setSourceOfTip(e.value);
                                             }}
                                        />
                                        {props.error.tipDetails && props.error.tipDetails.tipSource && props.error.tipDetails.tipSource.type === "required" && (
                                             <small className="p-error">{props.error.tipDetails.tipSource.message}</small>
                                        )}
                                   </div>
                              </div>
                              <div className="p-col-12 p-md-6 ">
                                   <div className="p-field p-col-12 p-md-12 float-left main-label">
                                        {t("destinationOfTip")}:
                                   </div>
                                   <div className="p-field p-col-12 p-md-12 float-left">
                                        <Dropdown
                                             name="tipDestination"
                                             placeholder={t("select")}
                                             {...props.register("tipDetails.tipDestination"
                                                  // , {
                                                  //     required: "Destination of TIP is Required",
                                                  // }
                                             )}
                                             value={props.getValues("tipDetails.tipDestination")}
                                             options={addressOfTipList}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.tipDestination", e.value);
                                                  setDestinationOfTip(e.value);
                                             }}
                                        />
                                        {props.error.tipDetails && props.error.tipDetails.tipDestination && props.error.tipDetails.tipDestination.type === "required" && (
                                             <small className="p-error">{props.error.tipDetails.tipDestination.message}</small>
                                        )}
                                   </div>
                              </div>
                         </div>


                         <div className="p-grid p-col-12 p-md-12 ">
                              <div className="p-col-12 p-md-6 ">
                                   <div className="p-field p-col-12 p-md-12 float-left main-label">
                                        {t("countryOfExploitation")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-12 float-left">
                                        <InputText
                                             name="countryOfExploitation" 
                                             value={props.getValues("tipDetails.countryOfExploitation")}
                                             {...props.register("tipDetails.countryOfExploitation"
                                                  // , {
                                                  //   required: "Cuntry Of Exploitation is Required",
                                                  // }
                                             )}
                                             onChange={(e) => {
                                               props.setValue("tipDetails.countryOfExploitation", e.target.value);
                                             }}
                                        />
                                        {props.error.tipDetails && props.error.tipDetails.countryOfExploitation && props.error.tipDetails.countryOfExploitation.type === "required" && (
                                             <small className="p-error">{props.error.tipDetails.countryOfExploitation.message}</small>
                                        )}
                                   </div>
                              </div>
                         </div>

                         <div className="p-grid p-col-12 p-md-12 ">
                              <div className="p-col-12 p-md-6">
                                   <div className="p-field p-col-12 p-md-12 float-left main-label">
                                        {t("actOfTip")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-12 float-left">
                                        <Dropdown
                                             name="tipAct"
                                             placeholder={t("select")}
                                             {...props.register("tipDetails.tipAct"
                                                  // , {
                                                  //     required: "Act of TIP is Required",
                                                  // }
                                             )}
                                             value={props.getValues("tipDetails.tipAct")}
                                             options={actOfTipList}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.tipAct", e.value);
                                                  setActOfTip(e.value)
                                             }}
                                        />
                                        {props.error.tipDetails && props.error.tipDetails.tipAct && props.error.tipDetails.tipAct.type === "required" && (
                                             <small className="p-error">{props.error.tipDetails.tipAct.message}</small>
                                        )}
                                   </div>
                              </div>
                              {(props.getValues("tipDetails.tipAct") === "Others") ?
                                   <div className="p-col-12 p-md-6">
                                        <div className="p-field p-col-12 p-md-12 float-left main-label">
                                             {t("pleaseSpDetails")}
                                        </div>
                                        <div className="p-field p-col-12 p-md-12 float-left">
                                             <InputText
                                                  name="tipActDetail"
                                                  value={props.getValues("tipDetails.tipActDetail")}
                                                  {...props.register("tipDetails.tipActDetail"
                                                       // , {
                                                       //   required: "TIP Act Detail is Required",
                                                       // }
                                                  )}
                                                  onChange={(e) => {
                                                    props.setValue("tipDetails.tipActDetail", e.target.value);
                                                  }}
                                             />
                                             {props.error.tipDetails && props.error.tipDetails.tipActDetail && props.error.tipDetails.tipActDetail.type === "required" && (
                                                  <small className="p-error">{props.error.tipDetails.tipActDetail.message}</small>
                                             )}
                                        </div>
                                   </div>
                                   : <></>
                              }
                         </div>

                         <div className="p-grid p-col-12 p-md-12 ">
                              <div className="p-col-12 p-md-6 ">
                                   <div className="p-field p-col-12 p-md-12 float-left main-label">
                                        {t("meansOfTip")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-12 float-left">
                                        <Dropdown
                                             name="tipMeans"
                                             placeholder={t("select")}
                                             {...props.register("tipDetails.tipMeans"
                                                  // , {
                                                  //     required: "Means of TIP is Required",
                                                  // }
                                             )}
                                             value={props.getValues("tipDetails.tipMeans")}
                                             options={meansOfTipList}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.tipMeans", e.value);
                                                  setMeansOfTip(e.value);
                                             }}
                                        />
                                        {props.error.tipDetails && props.error.tipDetails.tipMeans && props.error.tipDetails.tipMeans.type === "required" && (
                                             <small className="p-error">{props.error.tipDetails.tipMeans.message}</small>
                                        )}
                                   </div>
                              </div>
                              {(props.getValues("tipDetails.tipMeans") === "Others") ?
                                   <div className="p-col-12 p-md-6">
                                        <div className="p-field p-col-12 p-md-12 float-left main-label">
                                             {t("pleaseSpDetails")}
                                        </div>
                                        <div className="p-field p-col-12 p-md-12 float-left">
                                             <InputText
                                                  name="tipMeansDetail"
                                                  value={props.getValues("tipDetails.tipMeansDetail")}
                                                  {...props.register("tipDetails.tipMeansDetail"
                                                       // , {
                                                       //   required: "TIP Means Detail is Required",
                                                       // }
                                                  )}
                                                  onChange={(e) => {
                                                    props.setValue("tipDetails.tipMeansDetail", e.target.value);
                                                  }}
                                             />
                                             {props.error.tipDetails && props.error.tipDetails.tipMeansDetail && props.error.tipDetails.tipMeansDetail.type === "required" && (
                                                  <small className="p-error">{props.error.tipDetails.tipMeansDetail.message}</small>
                                             )}
                                        </div>
                                   </div>
                                   : <></>
                              }
                         </div>

                         <div className="p-grid p-col-12 p-md-12 ">
                              <div className="p-col-12 p-md-6 ">
                                   <div className="p-field p-col-12 p-md-12 float-left main-label">
                                        {t("purposeOfTip")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-12 float-left">
                                        <Dropdown
                                             name="tipPurpose"
                                             placeholder={t("select")}
                                             {...props.register("tipDetails.tipPurpose"
                                                  // , {
                                                  //     required: "Purpose of TIP is Required",
                                                  // }
                                             )}
                                             value={props.getValues("tipDetails.tipPurpose")}
                                             options={purposeOfTipList}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.tipPurpose", e.value);
                                                  setPurposeOfTip(e.value);
                                             }}
                                        />
                                        {props.error.tipDetails && props.error.tipDetails.tipPurpose && props.error.tipDetails.tipPurpose.type === "required" && (
                                             <small className="p-error">{props.error.tipDetails.tipPurpose.message}</small>
                                        )}
                                   </div>
                              </div>
                              <div className="p-col-12 p-md-6 ">
                                   <div className="p-field p-col-12 p-md-12 float-left main-label">
                                        {t("tipCaseStatus")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-12 float-left">
                                        <Dropdown
                                             name="tipCaseStatus"
                                             placeholder={t("select")}
                                             {...props.register("tipDetails.tipCaseStatus"
                                                  // , {
                                                  //     required: "Case Status of TIP is Required",
                                                  // }
                                             )}
                                             value={props.getValues("tipDetails.tipCaseStatus")}
                                             options={tipCaseStatusList}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.tipCaseStatus", e.value);
                                                  setTipCaseStatus(e.value);
                                             }}
                                        />
                                        {props.error.tipDetails && props.error.tipDetails.tipCaseStatus && props.error.tipDetails.tipCaseStatus.type === "required" && (
                                             <small className="p-error">{props.error.tipDetails.tipCaseStatus.message}</small>
                                        )}
                                   </div>
                              </div>
                         </div>

                         <div className="p-grid p-col-12 p-md-12 ">
                              <div className="p-col-12 p-md-6 ">
                                   <div className="p-field p-col-12 p-md-12 float-left main-label">
                                        {t("reasonForLeavingHome")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-12 float-left">
                                        <Dropdown
                                             name="reasonForLeavingHome"
                                             placeholder={t("select")}
                                             {...props.register("tipDetails.reasonForLeavingHome"
                                                  // , {
                                                  //     required: "Reason For Leaving Home is Required",
                                                  // }
                                             )}
                                             value={props.getValues("tipDetails.reasonForLeavingHome")}
                                             options={reasonForLeavingHomeList}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.reasonForLeavingHome", e.value);
                                                  setReasonForLeavingHome(e.value);
                                             }}
                                        />
                                        {props.error.tipDetails && props.error.tipDetails.reasonForLeavingHome && props.error.tipDetails.reasonForLeavingHome.type === "required" && (
                                             <small className="p-error">{props.error.tipDetails.reasonForLeavingHome.message}</small>
                                        )}
                                   </div>
                              </div>
                              <div className="p-col-12 p-md-6 ">
                                   <div className="p-field p-col-12 p-md-12 float-left main-label">
                                        {t("relationWithTrafficker")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-12 float-left">
                                        <Dropdown
                                             name="relationWithTrafficker"
                                             placeholder={t("select")}
                                             {...props.register("tipDetails.relationWithTrafficker"
                                                  // , {
                                                  //     required: "Relation With Trafficker of TIP is Required",
                                                  // }
                                             )}
                                             value={props.getValues("tipDetails.relationWithTrafficker")}
                                             options={relationWithTraffickerList}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.relationWithTrafficker", e.value);
                                                  setRelationWithTrafficker(e.value);
                                             }}
                                        />
                                        {props.error.tipDetails && props.error.tipDetails.relationWithTrafficker && props.error.tipDetails.relationWithTrafficker.type === "required" && (
                                             <small className="p-error">{props.error.tipDetails.relationWithTrafficker.message}</small>
                                        )}
                                   </div>
                              </div>
                         </div>


                         <div className="p-grid p-col-12 p-md-12 ">
                              <div className="p-col-12 p-md-6 ">
                                   <div className="p-field p-col-12 p-md-12 float-left main-label">
                                        {t("recruitingFee")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-12 float-left">
                                        <InputText
                                             name="recruitingFee"
                                             value={props.getValues("tipDetails.recruitingFee")}
                                             {...props.register("tipDetails.recruitingFee"
                                                  // , {
                                                  //   required: "Recruiting Fee is Required",
                                                  // }
                                             )}
                                             onChange={(e) => {
                                               props.setValue("tipDetails.recruitingFee", e.target.value);
                                             }}
                                        />
                                        {props.error.tipDetails && props.error.tipDetails.recruitingFee && props.error.tipDetails.recruitingFee.type === "required" && (
                                             <small className="p-error">{props.error.tipDetails.recruitingFee.message}</small>
                                        )}
                                   </div>
                              </div>
                         </div>

                         <div className="p-grid p-col-12 p-md-12 ">
                              <div className="p-col-12 p-md-6 ">
                                   <div className="p-field p-col-12 p-md-12 float-left main-label">
                                        {t("shelterServiceReceived")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-4 float-left">
                                        <RadioButton
                                             value={YES_NO.YES}
                                             name={YES_NO.YES}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.shelterServiceReceived", YES_NO.YES);
                                                  setShelterServiceReceived(e.value);
                                             }}
                                             checked={props.getValues("tipDetails.shelterServiceReceived") === YES_NO.YES}
                                        /> {t("yes")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-4 float-left">
                                        <RadioButton
                                             value={YES_NO.NO}
                                             name={YES_NO.NO}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.shelterServiceReceived", YES_NO.NO);
                                                  setShelterServiceReceived(e.value);
                                             }}
                                             checked={props.getValues("tipDetails.shelterServiceReceived") === YES_NO.NO} /> {t("no")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-4 float-left">
                                        <RadioButton value={YES_NO.OTHERS}
                                             name={YES_NO.OTHERS}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.shelterServiceReceived", YES_NO.OTHERS);
                                                  setShelterServiceReceived(e.value);
                                             }}
                                             checked={props.getValues("tipDetails.shelterServiceReceived") === YES_NO.OTHERS} /> {t("others")}
                                   </div>
                              </div>
                         </div>
                         {props.getValues("tipDetails.shelterServiceReceived") === 'Yes' ?
                              <div className="p-grid p-col-12 p-md-12 ">
                                   <div className="p-col-12 p-md-6">
                                        <div className="p-field p-col-12 p-md-12 float-left main-label">
                                             {t("nameOfServiceProvider")}:
                                        </div>
                                        <div className="p-field p-col-12 p-md-12 float-left">
                                             <InputText
                                                  name="serviceProviderName"
                                                  value={props.getValues("tipDetails.serviceProviderName")}
                                                  {...props.register("tipDetails.serviceProviderName"
                                                       // , {
                                                       //   required: "Service Provider Name is Required",
                                                       // }
                                                  )}
                                                  onChange={(e) => {
                                                    props.setValue("tipDetails.serviceProviderName", e.target.value);
                                                  }}
                                             />
                                             {props.error.tipDetails && props.error.tipDetails.serviceProviderName && props.error.tipDetails.serviceProviderName.type === "required" && (
                                                  <small className="p-error">{props.error.tipDetails.serviceProviderName.message}</small>
                                             )}
                                        </div>
                                   </div>
                                   <div className="p-col-12 p-md-6">
                                        <div className="p-field p-col-12 p-md-12 float-left main-label">
                                             {t("typeOfServiceProvider")}
                                        </div>
                                        <div className="p-field p-col-12 p-md-12 float-left">
                                             <Dropdown
                                                  name="serviceProviderType"
                                                  placeholder={t("select")}
                                                  {...props.register("tipDetails.serviceProviderType"
                                                       // , {
                                                       //     required: "Service Provider Type is Required",
                                                       // }
                                                  )}
                                                  value={props.getValues("tipDetails.serviceProviderType")}
                                                  options={serviceProviderList}
                                                  onChange={(e) => {
                                                       props.setValue("tipDetails.serviceProviderType", e.value);
                                                       setServiceProviderType(e.value);
                                                  }}
                                             />
                                             {props.error.tipDetails && props.error.tipDetails.serviceProviderType && props.error.tipDetails.serviceProviderType.type === "required" && (
                                                  <small className="p-error">{props.error.tipDetails.serviceProviderType.message}</small>
                                             )}
                                        </div>
                                   </div>
                              </div>
                              : <></>}

                         <div className="p-grid p-col-12 p-md-12 ">
                              <div className="p-col-12 p-md-6 ">
                                   <div className="p-field p-col-12 p-md-12 float-left main-label">
                                        {t("typeOfServiceReceived")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-12 float-left">
                                        <Dropdown
                                             name="serviceReceivedType"
                                             placeholder={t("select")}
                                             {...props.register("tipDetails.serviceReceivedType"
                                                  // , {
                                                  //     required: "Service Received Type is Required",
                                                  // }
                                             )}
                                             value={props.getValues("tipDetails.serviceReceivedType")}
                                             options={serviceReceivedList}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.serviceReceivedType", e.value);
                                                  setServiceReceivedType(e.value);
                                             }}
                                        />
                                        {props.error.tipDetails && props.error.tipDetails.serviceReceivedType && props.error.tipDetails.serviceReceivedType.type === "required" && (
                                             <small className="p-error">{props.error.tipDetails.serviceReceivedType.message}</small>
                                        )}
                                   </div>
                              </div>
                         </div>

                         <div className="p-grid p-col-12 p-md-12 ">
                              <div className="p-col-12 p-md-6 ">
                                   <div className="p-field p-col-12 p-md-12 float-left main-label">
                                        {t("referralServiceReceived")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-6 float-left">
                                        <RadioButton
                                             value={YES_NO.YES}
                                             name={YES_NO.YES}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.referralServiceReceived", YES_NO.YES);
                                                  setReferralServiceReceived(e.value);
                                             }}
                                             checked={props.getValues("tipDetails.referralServiceReceived") === YES_NO.YES}
                                        />  {t("yes")}
                                   </div>
                                   <div className="p-field p-col-12 p-md-6 float-left">
                                        <RadioButton value={YES_NO.NO}
                                             name={YES_NO.NO}
                                             onChange={(e) => {
                                                  props.setValue("tipDetails.referralServiceReceived", YES_NO.NO);
                                                  setReferralServiceReceived(e.value);
                                             }}
                                             checked={props.getValues("tipDetails.referralServiceReceived") === YES_NO.NO} />  {t("no")}
                                   </div>
                              </div>
                         </div>
                         {props.getValues("tipDetails.referralServiceReceived") === 'Yes' ?
                              //  <SourceOfReferral register={props.register} setValue={props.setValue} getValues={props.getValues}/>
                              <>

                                   <div className="p-grid p-col-12 p-md-12 ">
                                        <div className="p-col-12 p-md-6 ">
                                             <div className="p-field p-col-12 p-md-12 float-left main-label">
                                                  {t("typesOfReferralService")}
                                             </div>
                                             <div className="p-field p-col-12 p-md-12 float-left">
                                                  <Dropdown
                                                       name="referralServiceType"
                                                       placeholder={t("select")}
                                                       {...props.register("tipDetails.referralServiceType"
                                                            // , {
                                                            //     required: "Referral Service Type is Required",
                                                            // }
                                                       )}
                                                       value={props.getValues("tipDetails.referralServiceType")}
                                                       options={referredServiceTypeList}
                                                       onChange={(e) => {
                                                            props.setValue("tipDetails.referralServiceType", e.value);
                                                            setReferredServiceType(e.value);
                                                       }}
                                                  />
                                                  {props.error.tipDetails && props.error.tipDetails.referralServiceTypeolenceType && props.error.tipDetails.referralServiceType.type === "required" && (
                                                       <small className="p-error">{props.error.tipDetails.referralServiceType.message}</small>
                                                  )}
                                             </div>
                                        </div>
                                   </div>
                                   {/* Rehabilitation */}

                                   <div className="p-grid p-col-12 p-md-12 ">
                                        <div className="p-col-12 p-md-6 ">
                                             <div className="p-field p-col-12 p-md-12 float-left main-label">
                                                  {t("rehabilitation")}
                                             </div>
                                             <div className="p-field p-col-12 p-md-6 float-left">
                                                  <RadioButton
                                                       value={YES_NO.YES}
                                                       name={YES_NO.YES}
                                                       onChange={(e) => {
                                                            props.setValue("tipDetails.tipRehabilitation", YES_NO.YES);
                                                            setTipRehabilitation(e.value);
                                                       }}
                                                       checked={props.getValues("tipDetails.tipRehabilitation") === YES_NO.YES}
                                                  /> {t("ho")}
                                             </div>
                                             <div className="p-field p-col-12 p-md-6 float-left">
                                                  <RadioButton
                                                       value={YES_NO.NO}
                                                       name={YES_NO.NO}
                                                       onChange={(e) => {
                                                            props.setValue("tipDetails.tipRehabilitation", YES_NO.NO);
                                                            setTipRehabilitation(e.value);
                                                       }}
                                                       checked={props.getValues("tipDetails.tipRehabilitation") === YES_NO.NO}
                                                  /> {t("haina")}
                                             </div>
                                        </div>
                                   </div>
                                   {(props.getValues("tipDetails.tipRehabilitation") === "Yes") ?
                                        <>

                                             <div className="p-grid p-col-12 p-md-12 ">
                                                  <div className="p-col-12 p-md-12 ">
                                                       <div className="p-field p-col-12 p-md-12 float-left main-label">
                                                            {t("rehabilitatedTo")}:
                                                       </div>
                                                       <div className="p-field p-col-2 p-md-1 float-left">
                                                            <RadioButton value={REHABILITATED_TO.HOME}
                                                                 name={REHABILITATED_TO.HOME}
                                                                 onChange={(e) => {
                                                                      props.setValue("tipDetails.tipRehabilitatedTo", REHABILITATED_TO.HOME);
                                                                      setTipRehabilitatedTo(e.value);
                                                                 }}
                                                                 checked={props.getValues("tipDetails.tipRehabilitatedTo") === REHABILITATED_TO.HOME} />
                                                            {t("home")}
                                                       </div>
                                                       <div className="p-field p-col-12 p-md-2 float-left">
                                                            <RadioButton value={REHABILITATED_TO.OJT}
                                                                 name={REHABILITATED_TO.OJT}
                                                                 onChange={(e) => {
                                                                      props.setValue("tipDetails.tipRehabilitatedTo", REHABILITATED_TO.OJT);
                                                                      setTipRehabilitatedTo(e.value);
                                                                 }}
                                                                 checked={props.getValues("tipDetails.tipRehabilitatedTo") === REHABILITATED_TO.OJT} />  {t("ojt")}
                                                       </div>
                                                       <div className="p-field p-col-12 p-md-3 float-left">
                                                            <RadioButton value={REHABILITATED_TO.OUT_OF_COMMUNITY}
                                                                 name={REHABILITATED_TO.OUT_OF_COMMUNITY}
                                                                 onChange={(e) => {
                                                                      props.setValue("tipDetails.tipRehabilitatedTo", REHABILITATED_TO.OUT_OF_COMMUNITY);
                                                                      setTipRehabilitatedTo(e.value);
                                                                 }}
                                                                 checked={props.getValues("tipDetails.tipRehabilitatedTo") == REHABILITATED_TO.OUT_OF_COMMUNITY} /> {t("outOfCommunity")}
                                                       </div>
                                                       <div className="p-field p-col-12 p-md-3 float-left">
                                                            <RadioButton value={REHABILITATED_TO.ADOPTION}
                                                                 name={REHABILITATED_TO.ADOPTION}
                                                                 onChange={(e) => {
                                                                      props.setValue("tipDetails.tipRehabilitatedTo", REHABILITATED_TO.ADOPTION);
                                                                      setTipRehabilitatedTo(e.value);
                                                                 }}
                                                                 checked={props.getValues("tipDetails.tipRehabilitatedTo") 
                                                                 === REHABILITATED_TO.ADOPTION} /> {t("adoption")}
                                                       </div>
                                                       <div className="p-field p-col-12 p-md-3 float-left">
                                                            <RadioButton value={REHABILITATED_TO.FOSTER_HOME}
                                                                 name={REHABILITATED_TO.FOSTER_HOME}
                                                                 onChange={(e) => {
                                                                      props.setValue("tipDetails.tipRehabilitatedTo", REHABILITATED_TO.FOSTER_HOME);
                                                                      setTipRehabilitatedTo(e.value);
                                                                 }}
                                                                 checked={props.getValues("tipDetails.tipRehabilitatedTo")
                                                                  === REHABILITATED_TO.FOSTER_HOME} /> {t("fosterHome")}
                                                       </div>
                                                  </div>
                                             </div>

                                             <div className="p-grid p-col-12 p-md-12 ">
                                                  <div className="p-col-12 p-md-6 ">
                                                       <div className="p-field p-col-12 p-md-12 float-left main-label">
                                                            {t("pleaseSpDetails")} :
                                                       </div>
                                                       <div className="p-field p-col-12 p-md-12 float-left">
                                                            <InputText
                                                                 name="tipRehabilitatedToDetail"
                                                                 value={props.getValues("tipDetails.tipRehabilitatedToDetail")}
                                                                 {...props.register("tipDetails.tipRehabilitatedToDetail"
                                                                      //   , {
                                                                      //     required: "Detail is Required",
                                                                      //   }
                                                                 )}
                                                                 onChange={(e) => {
                                                                   props.setValue("tipDetails.tipRehabilitatedToDetail", e.target.value);
                                                                 }}
                                                            />
                                                            {props.error.tipDetails && props.error.tipDetails.tipRehabilitatedToDetail && props.error.tipDetails.tipRehabilitatedToDetail.type === "required" && (
                                                                 <small className="p-error">{props.error.tipDetails.tipRehabilitatedToDetail.message}</small>
                                                            )}
                                                       </div>
                                                  </div>
                                             </div>
                                        </>
                                        : <></>
                                   }


                                   <div className="p-grid p-col-12 p-md-12 ">
                                        <div className="p-col-12 p-md-6 ">
                                             <div className="p-field p-col-12 p-md-12 float-left main-label">
                                                  {t("caseStatus")}
                                             </div>
                                             <div className="p-field p-col-12 p-md-12 float-left">
                                                  <Dropdown
                                                       name="referralCaseStatus"
                                                       placeholder={t("select")}
                                                       {...props.register("tipDetails.referralCaseStatus"
                                                            // , {
                                                            //     required: "Referral Case Status is Required",
                                                            // }
                                                       )}
                                                       value={props.getValues("tipDetails.referralCaseStatus")}
                                                       options={referralCaseStatusList}
                                                       onChange={(e) => {
                                                            props.setValue("tipDetails.referralCaseStatus", e.value);
                                                            setReferralCaseStatus(e.value);
                                                       }}
                                                  />
                                                  {props.error.tipDetails && props.error.tipDetails.referralCaseStatus && props.error.tipDetails.referralCaseStatus.type === "required" && (
                                                       <small className="p-error">{props.error.tipDetails.referralCaseStatus.message}</small>
                                                  )}
                                             </div>
                                        </div>
                                   </div>
                                   {(props.getValues("tipDetails.referralCaseStatus") === "Referred") ?

                                        <div className="p-grid p-col-12 p-md-12 ">
                                             <div className="p-col-12 p-md-6">
                                                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                                                       {t("referredService")}
                                                  </div>
                                                  <div className="p-field p-col-12 p-md-12 float-left">
                                                       <InputText
                                                            name="referredService"
                                                            value={props.getValues("tipDetails.referredService")}
                                                            //value={props.firstNameNep}
                                                            {...props.register("tipDetails.referredService"
                                                                 // , {
                                                                 //      required: "referredService is Required",
                                                                 // }
                                                            )}
                                                            onChange={(e) => {
                                                              props.setValue("tipDetails.referredService", e.target.value);
                                                            }}
                                                       />
                                                       {props.error.tipDetails && props.error.tipDetails.referredService && props.error.tipDetails.referredService.type === "required" && (
                                                            <small className="p-error">{props.error.referredService.message}</small>
                                                       )}
                                                  </div>
                                             </div>
                                             <div className="p-col-12 p-md-6">
                                                  <div className="p-field p-col-12 p-md-12 float-left main-label">
                                                       {t("providerName")}
                                                  </div>
                                                  <div className="p-field p-col-12 p-md-12 float-left">
                                                       <InputText
                                                            name="referredProviderName"
                                                            value={props.getValues("tipDetails.referredProviderName")}
                                                            {...props.register("tipDetails.referredProviderName"
                                                                 // , {
                                                                 //   required: "Provider Name is Required",
                                                                 // }
                                                            )}
                                                            onChange={(e) => {
                                                              props.setValue("tipDetails.referredProviderName", e.target.value);
                                                            }}
                                                       />
                                                       {props.error.tipDetails && props.error.tipDetails.referredProviderName && props.error.tipDetails.referredProviderName.type === "required" && (
                                                            <small className="p-error">{props.error.tipDetails.referredProviderName.message}</small>
                                                       )}
                                                  </div>
                                             </div>
                                        </div>

                                        : <></>
                                   }
                              </>

                              : <></>
                         }
                    </div>
               </Card>
          </>
     );
}

export default TipDetailForm;



