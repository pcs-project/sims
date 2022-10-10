import React, { useState, useRef, useEffect } from "react";

import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";

const Name = (props) => {
  const { t } = useTranslation();
  const [name, setName] = useState();
	
	function check(data)
	{
		console.log(data);
		var x = data.indexOf("<script>");
		if(x>-1)
		{
			return true;
		}
		return false;
	}

  return (
    <div className="p-grid p-col-12 p-md-12 ">
    <div class="p-col-12 p-md-12">
      <div className="p-field p-col-12 p-md-12 float-left main-label">{t("name")}<span style={{ color: "#d00000"}}> * </span> </div>
      <div className="p-field p-col-3 p-md-3 float-left">
        <InputText name="firstName" placeholder={t("fName")}
          value={props.getValues("firstName")}
          {...props.register("firstName", { required: "First Name is Required", })}
          onChange={(e) => {
						if(check(e.target.value))
						{
							e.target.value = "";
						}
            props.setValue("firstName", e.target.value);
            setName(e.target.value);
          }} />
        {props.error.firstName && props.error.firstName.type === "required" && (
          <small className="p-error">{props.error.firstName.message}</small>
        )}
      </div>
      <div className="p-field p-col-3 p-md-3 float-left">
        <InputText name="middleName" placeholder={t("mName")}
          value={props.getValues("middleName")}
          {...props.register("middleName", { })}
          onChange={(e) => {
						if(check(e.target.value))
						{
							e.target.value = "";
						}
						props.setValue("middleName", e.target.value);
						setName(e.target.value);
          }}
        />
        {props.error.middleName && props.error.middleName.type === "required" && (
          <small className="p-error">{props.error.middleName.message}</small>
        )}
      </div>
      <div className="p-field p-col-3 p-md-3 float-left">
        <InputText
          name="lastName"
          placeholder={t("lName")}
          value={props.getValues("lastName")}
          {...props.register("lastName", {
            required: "Last Name is Required",
          })}
          onChange={(e) => {
						if(check(e.target.value))
						{
							e.target.value = "";
						}
            props.setValue("lastName", e.target.value);
            setName(e.target.value);
          }}
        />
        {props.error.lastName && props.error.lastName.type === "required" && (
          <small className="p-error">{props.error.lastName.message}</small>
        )}
      </div>
    </div>
    </div>
  );
};
export default Name;
