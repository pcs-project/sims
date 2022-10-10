
import React, { useState, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";

const NoOfChildren = (props) => {
    const { t } = useTranslation();
    const [val, setVal] = useState();
    return (
        <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("noOfChildren")} 
                </div>
                <div className="p-field p-col-12 p-md-6 float-left">
                    <InputText
                        name="noOfSon"
                        placeholder={t("son")}
                        value={props.getValues("noOfSon")}
                        {...props.register("noOfSon"
                        // , {
                        //     required: "No Of Son is Required",
                        // }
                        )}
                        onChange={(e) => {
                          props.setValue("noOfSon", e.target.value);
                          setVal(e.target.value);
                        }}
                    />
                    {props.error.noOfSon && props.error.noOfSon.type === "required" && (
                        <small className="p-error">{props.error.noOfSon.message}</small>
                    )}
                </div>
                <div className="p-field p-col-12 p-md-6 float-left">
                    <InputText
                        name="noOfDaughter"
                        placeholder={t("daughter")}
                        value={props.getValues("noOfDaughter")}
                        {...props.register("noOfDaughter"
                        // , {
                        //     required: "No Of Daughter is Required",
                        // }
                        )}
                        onChange={(e) => {
                          props.setValue("noOfDaughter", e.target.value);
                          setVal(e.target.value);
                        }}
                    />
                    {props.error.noOfDaughter && props.error.noOfDaughter.type === "required" && (
                        <small className="p-error">{props.error.noOfDaughter.message}</small>
                    )}
                </div>
            </div>
        </div>
    )

}
export default NoOfChildren;