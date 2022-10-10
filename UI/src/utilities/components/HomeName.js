
import React, { useState, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";

const HomeName = (props) => {
    const { t } = useTranslation();
    const [homeName, setHomeName] = useState();
    return (
        <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("name")}<span style={{ color: "#d00000"}}> * </span> 
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                    <InputText
                        name="homeName"
                        value={props.getValues("homeName")}
                        {...props.register("homeName"
                              , {
                                required: "Home Name is Required",
                              }
                        )}
                        onChange={(e) => {
                          props.setValue("homeName", e.target.value);
                          setHomeName(e.target.value);
                        }}
                    />
                    {props.error.homeName && props.error.homeName.type === "required" && (
                        <small className="p-error">{props.error.homeName.message}</small>
                    )}
                </div>
            </div>
        </div>
    )

}
export default HomeName;