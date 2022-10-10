
import React, { useState, useEffect } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from "primereact/radiobutton";

import { YES_NO } from "../constants/ITMISConstansts";
import { useTranslation } from "react-i18next";

const Disability = (props) => {
    const { t } = useTranslation();
    const [disability, setDisability] = useState();
    const disabilityTypeList = [
        { label: t("physicallyDisabled"), value: 'Physically disabled' },
        { label: t("partiallyVisuallyImpaired"), value: 'Partially Visually impaired' },
        { label: t("fullyVisuallyImpaired"), value: 'Fully Visually impaired' },
        { label: t("partiallyDeaf"), value: 'Partially Deaf' },
        { label: t("deaf"), value: 'Deaf' },
        { label: t("deafBlind"), value: 'Deaf Blind' },
        { label: t("speechAndHearingDisability"), value: 'Speech and hearing disability' },
        { label: t("mentalDisability"), value: 'Mental disability' },
        { label: t("intellectuallyDisabled"), value: 'Intellectually disabled' },
        { label: t("hemophelia"), value: 'Hemophelia' },
        { label: t("autism"), value: 'Autism' },
        { label: t("multiple"), value: 'Multiple' }
    ];
    const [disabilityType, setDisabilityType] = useState();

    return (
        <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("disability")} 
                </div>
                <div className="p-field p-col-6 p-md-6 float-left">
                    <RadioButton
                        value={YES_NO.YES}
                        name={YES_NO.YES}
                        onChange={(e) => {
                            props.setValue("disability",YES_NO.YES);
                            setDisability(e.value);
                        }}
                        checked={props.getValues("disability") === YES_NO.YES}
                    /> {t("cha")}
                </div>
                <div className="p-field p-col-6 p-md-6 float-left">
                    <RadioButton
                        value={YES_NO.NO}
                        name={YES_NO.NO}
                        onChange={(e) => {
                            props.setValue("disability", YES_NO.NO);
                            setDisability(e.value);
                        }}
                        checked={props.getValues("disability") === YES_NO.NO}
                    /> {t("chaina")}
                </div>
            </div>
            {(props.getValues("disability") === "Yes") ?
                <div class="p-col-12 p-md-6">
                    <div className="p-field p-col-12 p-md-12 float-left main-label">
                        {t("typesOfDisability")} :
                    </div>
                    <div className="p-field p-col-12 p-md-12 float-left">
                        <Dropdown
                            name="typesOfDisability"
                            placeholder={t("select")}
                            {...props.register("typesOfDisability"
                                // , {
                                //     required: "Disability type is Required",
                                // }
                            )}
                            value={props.getValues("typesOfDisability")}
                            options={disabilityTypeList}
                            onChange={(e) => {
                                props.setValue("typesOfDisability", e.value);
                                setDisabilityType(e.value);
                            }}
                        />
                        {props.error.typesOfDisability && props.error.typesOfDisability.type === "required" && (
                            <small className="p-error">{props.error.typesOfDisability.message}</small>
                        )}
                    </div>
                </div>
                : <></>
            }
        </div>
    )

}
export default Disability;