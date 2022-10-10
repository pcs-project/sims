
import React, { useState, useRef } from "react";
import { RadioButton } from 'primereact/radiobutton';
import { useTranslation } from "react-i18next";
import { ORPHAN_OR_NOT } from "../constants/ITMISConstansts";

const OrphanOrNot = (props) => {
    const { t } = useTranslation();
    return (
        <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("parentGuardian")}
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
                <RadioButton
                    value={ORPHAN_OR_NOT.PARENT_GUARIDIAN_PRESENT}
                    name={ORPHAN_OR_NOT.PARENT_GUARIDIAN_PRESENT}
                    onChange={(e) => {
                        props.onValueChange(e.value);
                    }}
                    checked={props.value == ORPHAN_OR_NOT.PARENT_GUARIDIAN_PRESENT}
                /> {t("parentGuardianPresent")}
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
                <RadioButton
                    value={ORPHAN_OR_NOT.SINGLE_PARENT}
                    name={ORPHAN_OR_NOT.SINGLE_PARENT}
                    onChange={(e) => {
                        props.onValueChange(e.value);
                    }}
                    checked={props.value == ORPHAN_OR_NOT.SINGLE_PARENT}
                /> {t("singleParentChild")}
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
                <RadioButton
                    value={ORPHAN_OR_NOT.ORPHAN}
                    name={ORPHAN_OR_NOT.ORPHAN}
                    onChange={(e) => {
                        props.onValueChange(e.value);
                    }}
                    checked={props.value == ORPHAN_OR_NOT.ORPHAN}
                /> {t("orphan")}
            </div>
        </div>
    )

}
export default OrphanOrNot;