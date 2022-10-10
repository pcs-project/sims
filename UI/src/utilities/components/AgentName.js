import React, { useState, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";

const AgentName = (props) => {
  const { t } = useTranslation();
  const [name, setName] = useState();
  return (
    <div className="p-field p-col-12 p-md-12 ">
      <div className="p-field p-col-12 p-md-12 float-left main-label">{t("name")} </div>
      <div className="p-field p-col-3 p-md-3 float-left">
        <InputText
          name="firstName"
          placeholder={t("fName")}
          value={props.getValues("agentDetails.firstName")}
          {...props.register("agentDetails.firstName", {
           // required: "First Name is Required",
          })}
          onChange={(e) => {
            props.setValue("agentDetails.firstName", e.target.value);
            setName(e.target.value);
          }}
        />
        {props.error.agentDetails &&
          props.error.agentDetails.firstName &&
          props.error.agentDetails.firstName.type === "required" && (
            <small className="p-error">{props.error.agentDetails.firstName.message}</small>
          )}
      </div>
      <div className="p-field p-col-3 p-md-3 float-left">
        <InputText
          name="middleName"
          placeholder={t("mName")}
          value={props.getValues("agentDetails.middleName")}
          {...props.register("agentDetails.middleName", {
            //required: "Middle Name is Required",
          })}
          onChange={(e) => {
            props.setValue("agentDetails.middleName", e.target.value);
            setName(e.target.value);
          }}
        />
        {props.error.agentDetails &&
          props.error.middleName &&
          props.error.middleName.type === "required" && (
            <small className="p-error">{props.error.middleName.message}</small>
          )}
      </div>
      <div className="p-field p-col-3 p-md-3 float-left">
        <InputText
          name="lastName"
          placeholder={t("lName")}
          value={props.getValues("agentDetails.lastName")}
          {...props.register("agentDetails.lastName", {
          //  required: "Last Name is Required",
          })}
          onChange={(e) => {
            props.setValue("agentDetails.lastName", e.target.value);
            setName(e.target.value);
          }}
        />
        {props.error.agentDetails &&
          props.error.lastName &&
          props.error.lastName.type === "required" && (
            <small className="p-error">{props.error.lastName.message}</small>
          )}
      </div>
    </div>
  );
};
export default AgentName;
