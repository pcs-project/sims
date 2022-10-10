
import React, { useState, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from "react-i18next";

const Occupation = (props) => {
    const { t } = useTranslation();
    const occupationList = [
        { label: t("agriculture"), value: 'Agriculture' },
        { label: t("domesticWorkCare"), value: 'Domestic Work and Care' },
        { label: t("manufacturingIndustry"), value: 'Manufacturing/Industry' },
        { label: t("hospitalityEntertainment"), value: 'Hospitality and Entertainment' },
        { label: t("vocationalSkillBasedIndustry"), value: 'Vocational/Skill based Industry' },
        { label: t("gloveMaker"), value: 'Glove maker' },
        { label: t("security"), value: 'Security' },
        { label: t("forklift"), value: 'Forklift' },
        { label: t("furniture"), value: 'Furniture' },
        { label: t("electrician"), value: 'Electrician' },
        { label: t("cook"), value: 'Cook' },
        { label: t("waiter"), value: 'Waiter' },
        { label: t("domesticLabor"), value: 'Domestic labor' },
        { label: t("machineOperator"), value: 'Machine operator' },
        { label: t("parkingBoy"), value: 'Parking boy' },
        { label: t("unskilledLabor"), value: 'Unskilled labor' },
        { label: t("others"), value: 'Other' }
    ];
    const [occupation, setOccupation] = useState();
    const [val, setVal] = useState();
    return (
        <div className="p-grid p-col-12 p-md-12 ">
            <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("occupation")} 
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                    <Dropdown name="occupation"
                        placeholder={t("occupation")}
                        {...props.register("occupation"
                            // , {
                            //     required: "Occupation is Required",
                            // }
                        )}
                        value={props.getValues("occupation")}
                        options={occupationList}
                        onChange={(e) => {
                            props.setValue("occupation", e.value);
                            setOccupation(e.value);
                        }}
                    />
                    {props.error.occupation && props.error.occupation.type === "required" && (
                        <small className="p-error">{props.error.occupation.message}</small>
                    )}
                </div>
            </div>
            <div class="p-col-12 p-md-6">
                <div className="p-field p-col-12 p-md-12 float-left main-label">
                    {t("yearsOfExperience")} :
                </div>
                <div className="p-field p-col-12 p-md-12 float-left">
                    <InputText
                        name="yearsOfExperience"
                        value={props.getValues("yearsOfExperience")}
                        {...props.register("yearsOfExperience"
                            //   , {
                            //     required: "Years Of Experience is Required",
                            //   }
                        )}
                        onChange={(e) => {
                          props.setValue("yearsOfExperience", e.target.value);
                          setVal(e.target.value);
                        }}
                    />
                    {props.error.yearsOfExperience && props.error.yearsOfExperience.type === "required" && (
                        <small className="p-error">{props.error.yearsOfExperience.message}</small>
                    )}
                </div>
            </div>
        </div>
    )

}
export default Occupation;