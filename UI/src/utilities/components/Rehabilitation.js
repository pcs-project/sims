import React, { useState, useEffect } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from "primereact/radiobutton";

import { YES_NO, REHABILITATED_TO } from "../constants/ITMISConstansts";
import { useTranslation } from "react-i18next";

const Rehabilitation = (props) => {
    const { t } = useTranslation();
    const [rehabilitation, setRehabilitation] = useState();
    const [rehabilitatedTo, setRehabilitatedTo] = useState();

    return (
        <>
            <div className="p-grid p-col-12 p-md-12 ">
                <div class="p-col-12 p-md-6">
                    <div className="p-field p-col-12 p-md-12 float-left main-label">{t("rehabilitation")} </div>
                    <div className="p-field p-col-6 p-md-6 float-left">
                        <RadioButton
                            value={YES_NO.YES}
                            name={YES_NO.YES}
                            onChange={(e) => {
                                props.setValue("rehabilitation", YES_NO.YES);
                                setRehabilitation(e.value);
                            }}
                            checked={props.getValues("rehabilitation") == YES_NO.YES}
                        /> {t("ho")}
                    </div>
                    <div className="p-field p-col-6 p-md-6 float-left">
                        <RadioButton
                            value={YES_NO.NO}
                            name={YES_NO.NO}
                            onChange={(e) => {
                                props.setValue("rehabilitation", YES_NO.NO);
                                setRehabilitation(e.value);
                            }}
                            checked={props.getValues("rehabilitation") == YES_NO.NO}
                        /> {t("haina")}
                    </div>
                </div>
            </div>
            {(props.getValues("rehabilitation") === "Yes") ?
                <>
                    <div className="p-field p-col-12 p-md-12 ">
                        <div className="p-field p-col-12 p-md-12 float-left main-label">
                            {t("rehabilitatedTo")}:
                        </div>
                        <div className="p-field p-col-12 p-md-1 float-left">
                            <RadioButton value={REHABILITATED_TO.HOME}
                                name={REHABILITATED_TO.HOME}
                                onChange={(e) => {
                                    props.setValue("rehabilitatedTo", REHABILITATED_TO.HOME);
                                    setRehabilitatedTo(e.value);
                                }}
                                checked={props.getValues("rehabilitatedTo")
                                    == REHABILITATED_TO.HOME} /> {t("home")}
                        </div>
                        <div className="p-field p-col-12 p-md-2 float-left">
                            <RadioButton value={REHABILITATED_TO.OJT}
                                name={REHABILITATED_TO.OJT}
                                onChange={(e) => {
                                    props.setValue("rehabilitatedTo", REHABILITATED_TO.OJT);
                                    setRehabilitatedTo(e.value);
                                }}
                                checked={props.getValues("rehabilitatedTo")
                                    == REHABILITATED_TO.OJT} /> {t("ojt")}
                        </div>
                        <div className="p-field p-col-12 p-md-3 float-left">
                            <RadioButton value={REHABILITATED_TO.OUT_OF_COMMUNITY}
                                name={REHABILITATED_TO.OUT_OF_COMMUNITY}
                                onChange={(e) => {
                                    props.setValue("rehabilitatedTo", REHABILITATED_TO.OUT_OF_COMMUNITY);
                                    setRehabilitatedTo(e.value);
                                }}
                                checked={props.getValues("rehabilitatedTo")
                                    == REHABILITATED_TO.OUT_OF_COMMUNITY} /> {t("outOfCommunity")}
                        </div>
                        <div className="p-field p-col-12 p-md-3 float-left">
                            <RadioButton value={REHABILITATED_TO.ADOPTION}
                                name={REHABILITATED_TO.ADOPTION}
                                onChange={(e) => {
                                    props.setValue("rehabilitatedTo", REHABILITATED_TO.ADOPTION);
                                    setRehabilitatedTo(e.value);
                                }}
                                checked={props.getValues("rehabilitatedTo")
                                    == REHABILITATED_TO.ADOPTION} /> {t("adoption")}
                        </div>
                        <div className="p-field p-col-12 p-md-3 float-left">
                            <RadioButton value={REHABILITATED_TO.FOSTER_HOME}
                                name={REHABILITATED_TO.FOSTER_HOME}
                                onChange={(e) => {
                                    props.setValue("rehabilitatedTo", REHABILITATED_TO.FOSTER_HOME);
                                    setRehabilitatedTo(e.value);
                                }}
                                checked={props.getValues("rehabilitatedTo")
                                    == REHABILITATED_TO.FOSTER_HOME} /> {t("fosterHome")}
                        </div>
                    </div>
                    <div className="p-field p-col-12 p-md-12 ">
                        <div className="p-field p-col-12 p-md-12 float-left main-label">
                            {t("pleaseSpDetails")} :
                        </div>
                        <div className="p-field p-col-6 p-md-6 float-left">
                            <InputText
                                name="rehabilitatedToDetail"
                                {...props.register("rehabilitatedToDetail"
                                    //   , {
                                    //     required: "Detail is Required",
                                    //   }
                                )}
                            />
                            {props.error.rehabilitatedToDetail && props.error.rehabilitatedToDetail.type === "required" && (
                                <small className="p-error">{props.error.rehabilitatedToDetail.message}</small>
                            )}
                        </div>
                    </div>
                </>
                : <></>
            }
        </>
    )

}
export default Rehabilitation;