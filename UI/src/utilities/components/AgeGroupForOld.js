
import React, { useState, useRef } from "react";
import { RadioButton } from 'primereact/radiobutton';
import { useTranslation } from "react-i18next";
import { AGE_GROUP_OLD } from "../constants/ITMISConstansts";

const AgeGroupForOld = (props) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("ageGroup")}<span style={{ color: "#d00000"}}> * </span>
                </div>
                <div className="p-field p-col-12 p-md-2 float-left">
                    <RadioButton
                        value={AGE_GROUP_OLD.Age6068}
                        name={AGE_GROUP_OLD.Age6068}
                        onChange={(e) => {
                            props.onValueChange(e.value);
                        }}
                        checked={props.value == AGE_GROUP_OLD.Age6068}
                    /> {t("age6068")}
                </div>
                <div className="p-field p-col-12 p-md-2 float-left">
                    <RadioButton
                        value={AGE_GROUP_OLD.Age6975}
                        name={AGE_GROUP_OLD.Age6975}
                        onChange={(e) => {
                            props.onValueChange(e.value);
                        }}
                        checked={props.value == AGE_GROUP_OLD.Age6975}
                    /> {t("age6975")}
                </div>
                <div className="p-field p-col-12 p-md-2 float-left">
                    <RadioButton
                        value={AGE_GROUP_OLD.Age7690}
                        name={AGE_GROUP_OLD.Age7690}
                        onChange={(e) => {
                            props.onValueChange(e.value);
                        }}
                        checked={props.value == AGE_GROUP_OLD.Age7690}
                    /> {t("age7690")}
                </div>
                <div className="p-field p-col-12 p-md-2 float-left">
                    <RadioButton
                        value={AGE_GROUP_OLD.Age9199}
                        name={AGE_GROUP_OLD.Age9199}
                        onChange={(e) => {
                            props.onValueChange(e.value);
                        }}
                        checked={props.value == AGE_GROUP_OLD.Age9199}
                    /> {t("age9199")}
                </div>
                <div className="p-field p-col-12 p-md-2 float-left">
                    <RadioButton
                        value={AGE_GROUP_OLD.Age99Above}
                        name={AGE_GROUP_OLD.Age99Above}
                        onChange={(e) => {
                            props.onValueChange(e.value);
                        }}
                        checked={props.value == AGE_GROUP_OLD.Age99Above}
                    /> {t("age99Above")}
                </div>
            </div>
        </>
    )

}
export default AgeGroupForOld;