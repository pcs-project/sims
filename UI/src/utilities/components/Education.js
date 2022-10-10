
import React, { useState, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from "react-i18next";

const Education = (props) => {
    const { t } = useTranslation();
    const educationList = [
        { label: t("illiterate"), value: 'Illiterate' },
        { label: t("basicTillGrade8"), value: 'Basic' },
        { label: t("secondaryTillGrade12"), value: 'Secondary' },
        { label: t("bachelor"), value: 'Bachelor' },
        { label: t("masters"), value: 'Masters' },
        { label: t("phd"), value: 'PhD' }
    ];

    const [education, setEducation] = useState();
    return (
        <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("educationLevel")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                    <Dropdown
                        name="educationLevel"
                        placeholder={t("educationLevel")}
                        {...props.register("educationLevel"
                        // , {
                        //     required: "educationLevel is Required",
                        // }
                        )}
                        value={props.getValues("educationLevel")}
                        options={educationList}
                        onChange={(e) => {
                            props.setValue("educationLevel", e.value);
                            setEducation(e.value);
                        }}
                    />
                    {props.error.educationLevel && props.error.educationLevel.type === "required" && (
                        <small className="p-error">{props.error.educationLevel.message}</small>
                    )}
                </div>
            </div>
        </div>
    )

}
export default Education;