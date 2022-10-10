
import React, { useState, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from "react-i18next";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import "nepali-datepicker-reactjs/dist/index.css";

const SchoolDetail = (props) => {
    const { t } = useTranslation();
    const [val, setVal] = useState();
    return (
        <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("schoolName")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                    <InputText
                        name="schoolName"
                        value={props.getValues("schoolName")}
                        {...props.register("schoolName"
                            // , {
                            //     required: "School Name is Required",
                            // }
                        )}
                        onChange={(e) => {
                            props.setValue("schoolName", e.target.value);
                            setVal(e.target.value);
                        }}
                    />
                    {props.error.schoolName && props.error.schoolName.type === "required" && (
                        <small className="p-error">{props.error.schoolName.message}</small>
                    )}
                </div>
            </div>
            <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("dateOfAdmission")}
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                    {/* <InputMask
                        name="dateOfAdmission"
                        mask="9999-99-99"
                        placeholder={t("dateFormat")}
                        value={props.getValues("dateOfAdmission")}
                        {...props.register("dateOfAdmission"
                        // , {
                        //     required: "Date Of Admission is Required",
                        // }
                        )}
                        onChange={(e) => {
                          props.setValue("dateOfAdmission", e.target.value);
                          setVal(e.target.value);
                        }}
                    /> */}

                    <NepaliDatePicker
                        inputClassName="p-inputtext form-control"
                        name="admissionDate"
                        value={props.getValues("admissionDate")}
                        onChange={(e) => {
                            props.setValue("admissionDate", e.value);
                            setVal(e.value);
                        }}
                        options={{ calenderLocale: "en", valueLocale: "en" }}
                    />
                    {props.error.admissionDate && props.error.admissionDate.type === "required" && (
                        <small className="p-error">{props.error.admissionDate.message}</small>
                    )}
                </div>
            </div>
        </div>
    )

}
export default SchoolDetail;