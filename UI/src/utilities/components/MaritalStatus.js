
import React, { useState, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from "react-i18next";
import i18n from "../../il8n/il8n";

const MaritalStatus = (props) => {
    const { t } = useTranslation();
    const maritalStatusList = [
        { label: t("singled"), value: 'Single' },
        { label: t("unmarried"), value: 'Unmarried' },
        { label: t("married"), value: 'Married' },
        { label: t("separated"), value: 'Separated' },
        { label: t("divorcee"), value: 'Divorced' },
        { label: t("widow"), value: 'Widowed' },
        { label: t("noDisclose"), value: 'Do not want to disclose' },
        { label: t("others"), value: 'Other Partnerships' }
    ];
    const [maritalStatus, setMaritalStatus] = useState();


    return (
        <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("maritalStatus")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                    <Dropdown
                        name="maritalStatus"
                        placeholder={t("maritalStatus")}
                        {...props.register("maritalStatus"
                        // , {
                        //     required: "Marital Status is Required",
                        // }
                        )}
                        value={props.getValues("maritalStatus")}
                        options={maritalStatusList}
                        onChange={(e) => {
                            props.setValue("maritalStatus", e.value);
                            setMaritalStatus(e.value);
                        }}
                    />
                    {props.error.maritalStatus && props.error.maritalStatus.type === "required" && (
                        <small className="p-error">{props.error.maritalStatus.message}</small>
                    )} 
                </div>
            </div>
        </div>
    )

}
export default MaritalStatus;