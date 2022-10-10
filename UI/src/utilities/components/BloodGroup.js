import React, { useState, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useTranslation } from "react-i18next";

const BloodGroup = (props) => {
  const { t } = useTranslation();
  const bloodGroupList = [
    { label: t("A+"), value: "A+" },
    { label: t("A-"), value: "A-" },
    { label: t("B+"), value: "B+" },
    { label: t("B-"), value: "B-" },
    { label: t("AB+"), value: "AB+" },
    { label: t("AB-"), value: "AB-" },
    { label: t("O+"), value: "O+" },
    { label: t("O-"), value: "O-" },
  ];
  const [bloodGroup, setBloodGroup] = useState(props.getValues("bloodGroup"));
  return (
    <>
      <div className="p-field p-col-12 p-md-12 ">
        <div className="p-field p-col-12 p-md-12 float-left main-label">{t("bloodGroup")}</div>
        <div className="p-field p-col-2 p-md-4 float-left">
          <Dropdown
            name="bloodGroup"
            placeholder={t("bloodGroup")}
            {...props.register("bloodGroup", {
             // required: "Blood Group  is Required",
            })}
            value={props.getValues("bloodGroup")}
            options={bloodGroupList}
            onChange={(e) => {
              props.setValue("bloodGroup", e.value);
              setBloodGroup(e.value);
            }}
          />
          {/* {props.error.bloodGroup && props.error.bloodGroup.type === "required" && (
            <small className="p-error">{props.error.bloodGroup.message}</small>
          )} */}
        </div>
      </div>
    </>
  );
};
export default BloodGroup;
