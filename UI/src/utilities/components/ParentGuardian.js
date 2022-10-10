
import React, { useState, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from "react-i18next";

const ParentGuardian = (props) => {
    const { t } = useTranslation();
    const parentGuardianList = [
        { label: t("guardianPresent"), value: 'Present' },
        { label: t("singleGuardian"), value: 'Single Guardian' },
        { label: t("orphan"), value: 'Orphan' }
    ];
    const [parentGuardian, setParentGuardian] = useState();


    return (
        <>
            <div className="p-field p-col-12 p-md-12 ">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("parentGuardian")}
                </div>
                <div className="p-field p-col-12 p-md-6 float-left">
                    <Dropdown
                        name="parentGuardian"
                        placeholder={t("parentGuardian")}
                        {...props.register("parentGuardian"
                            // , {
                            //     required: "Parent Guardian is Required",
                            // }
                        )}
                        value={props.getValues("parentGuardian")}
                        options={parentGuardianList}
                        onChange={(e) => {
                            props.setValue("parentGuardian", e.value);
                            setParentGuardian(e.value);
                        }}
                    />
                    {props.error.parentGuardian && props.error.parentGuardian.type === "required" && (
                        <small className="p-error">{props.error.parentGuardian.message}</small>
                    )}
                </div>
            </div>
        </>
    )

}
export default ParentGuardian;