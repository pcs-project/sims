
import React, { useState, useRef } from "react";
import { RadioButton } from 'primereact/radiobutton';
import { useTranslation } from "react-i18next";
import { AGE_GROUP } from "../constants/ITMISConstansts";

const AgeGroupForChild = (props) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("ageGroup")}<span style={{ color: "#d00000"}}> * </span>
                </div>
                <div className="p-field p-col-3 p-md-3 float-left">
                    <RadioButton
                        value={AGE_GROUP.CHILDREN}
                        name={AGE_GROUP.CHILDREN}
                        onChange={(e) => {
                            props.onValueChange(e.value);
                        }}
                        checked={props.value == AGE_GROUP.CHILDREN}
                    /> {t("childrenBelow18")}
                </div>
            </div>
        </>
    )

}
export default AgeGroupForChild;