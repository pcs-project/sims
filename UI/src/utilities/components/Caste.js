
import React, { useState, useRef } from "react";
import { RadioButton } from 'primereact/radiobutton';
import { useTranslation } from "react-i18next";
import { CASTE } from "../constants/ITMISConstansts";

const Caste = (props) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("casteEthnicity")}<span style={{ color: "#d00000"}}> * </span> 
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                    <RadioButton
                        value={CASTE.DALIT}
                        name={CASTE.DALIT}
                        onChange={(e) => {
                            props.onValueChange(e.value);
                        }}
                        checked={props.value == CASTE.DALIT}
                    /> {t("dalit")}
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                    <RadioButton
                        value={CASTE.MUSLIM}
                        name={CASTE.MUSLIM}
                        onChange={(e) => {
                            props.onValueChange(e.value);
                        }}
                        checked={props.value == CASTE.MUSLIM}
                    />  {t("muslim")}
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                    <RadioButton
                        value={CASTE.MADHESI}
                        name={CASTE.MADHESI}
                        onChange={(e) => {
                            props.onValueChange(e.value);
                        }}
                        checked={props.value == CASTE.MADHESI}
                    />  {t("madhesi")}
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                    <RadioButton
                        value={CASTE.JANAJATI}
                        name={CASTE.JANAJATI}
                        onChange={(e) => {
                            props.onValueChange(e.value);
                        }}
                        checked={props.value == CASTE.JANAJATI}
                    />  {t("janajati")}
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                    <RadioButton
                        value={CASTE.BRAHMIN}
                        name={CASTE.BRAHMIN}
                        onChange={(e) => {
                            props.onValueChange(e.value);
                        }}
                        checked={props.value == CASTE.BRAHMIN}
                    />  {t("brahminOther")}
                </div>
                <div className="p-field p-col-2 p-md-2 float-left">
                    <RadioButton
                        value={CASTE.OTHER}
                        name={CASTE.OTHER}
                        onChange={(e) => {
                            props.onValueChange(e.value);
                        }}
                        checked={props.value == CASTE.OTHER}
                    />  {t("other")}
                </div>
            </div>
        </>
    )

}
export default Caste;