
import React, { useState, useRef } from "react";

import { useFormContext } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from "primereact/radiobutton";
import { useTranslation } from "react-i18next";

import Rehabilitation from "./Rehabilitation";

const SourceOfReferral = (props) => {
    const { t } = useTranslation();
    const referredServiceTypeList = [
        { label: t("jobPlacement"), value: "Job-placement" },
        { label: t("legalAid"), value: "Legal-aid" },
        { label: t("skillTraining"), value: "Skill training" },
        { label: t("rescue"), value: "Rescue" },
        { label: t("reintegration"), value: "Repartiation" },
        { label: t("reintegration"), value: "Re-integration" },
    ];

    const referralCaseStatusList = [
        { label: "Referred", value: "Referred" },
        { label: "FIR registered in police", value: "FIR registered in police" },
        { label: "Case filed in the court", value: "Case filed in the court" },
        { label: "Case decided", value: "Case decided" },
        { label: "Compensation received", value: "Compensation received" },
    ];
    const [referredServiceType, setReferredServiceType] = useState();
    const [referralCaseStatus, setReferralCaseStatus] = useState();


    return (

        <>
            <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("typesOfReferralService")}
                </div>
                <div className="p-field p-col-6 p-md-6 float-left">
                     <Dropdown
                                        name="referralServiceType"
                                        placeholder={t("select")}
                                        {...props.register("referralServiceType"
                                             // , {
                                             //     required: "Referral Service Type is Required",
                                             // }
                                        )}
                                        value={props.getValues("referralServiceType")}
                                        options={referredServiceTypeList}
                                        onChange={(e) => {
                                             props.setValue("referralServiceType", e.value);
                                             setReferredServiceType(e.value);
                                        }}
                                   />
                                   {/* {props.error.vireferralServiceTypeolenceType && props.error.referralServiceType.type === "required" && (
                                        <small className="p-error">{props.error.referralServiceType.message}</small>
                                   )} */}
                </div>
            </div>
            {/* <Rehabilitation register={props.register} error={props.errors} setValue={props.setValue} 
            getValues={props.getValues} /> */}
            <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("caseStatus")}
                </div>
                <div className="p-field p-col-6 p-md-6 float-left">
                    <Dropdown
                        optionLabel="label"
                        value={referralCaseStatus}
                        options={referralCaseStatusList}
                        onChange={(e) => setReferralCaseStatus(e.value)}
                        placeholder={t("caseStatus")}
                    />
                </div>

            </div>
            {(referralCaseStatus === "Referred") ?

                <div className="p-grid p-col-12 p-md-12 ">
                    <div className="p-col-12 p-md-6">
                        <div className="p-field p-col-12 p-md-12 float-left main-label">
                            {t("referredService")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left">
                        <InputText
          name="referredService"
          placeholder={t("referredService")}
          //value={props.firstNameNep}
          {...props.register("referredService", {
            required: "referredService is Required",
          })}
        />
        {props.error.referredService && props.error.referredService.type === "required" && (
          <small className="p-error">{props.error.referredService.message}</small>
        )}
                        </div>
                    </div>
                    <div className="p-col-12 p-md-6">
                        <div className="p-field p-col-12 p-md-12 float-left main-label">
                            {t("providerName")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left">
                            <InputText ></InputText>
                        </div>
                    </div>
                </div>

                : <></>
            }
        </>
    )

}
export default SourceOfReferral;