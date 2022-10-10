import React, { useState, useRef } from "react";

import { useTranslation } from "react-i18next";
import Nepali from "nepalify-react";
import InputText from "./InputText";
const NameNepali = (props) => {
  console.log("---", props.error);
  const { t } = useTranslation();
  const [nepaliName, setNepaliName] = useState({
    firstNameNep: "",
    middleNameNep: "",
    lastNameNep: "",
  });

  // const handleChange = (e) => {
  //   setNepaliName({ ...nepaliName, [e.target.name]: e.target.value });
  //   props.onNameChange(nepaliName);
  // };
  return (
    <>
      <div className="p-field p-col-12 p-md-12 ">
        <div className="p-field p-col-12 p-md-12 float-left main-label">
          {t("nameNep")} ({t("nepali")})<span style={{ color: "#d00000"}}> * </span>
        </div>
        <div className="p-field p-col-3 p-md-3 float-left">
          {/* <Nepali
            funcname="unicodify"
            className="p-inputtext"
            name="firstNameNep"
            placeholder={t("fNameNep")}
            //value={props.firstNameNep}
            value={props.getValues("firstNameNep")}
            {...props.register("firstNameNep", {
              required: "First Name Nepali is Required",
            })}
            valueChange={(e, value) => {
              props.setValue("firstNameNep", value);
            }}
          /> */}
          <InputText
            name="firstNameNep"
            isName
            convertToNepali
            placeholder={t("fNameNep")}
            //value={props.firstNameNep}
            value={props.getValues("firstNameNep")}
            {...props.register("firstNameNep", {
              required: "First Name Nepali is Required",
            })}
            valueChange={(e, value) => {
              props.setValue("firstNameNep", value);
            }}
          />
          {props.error.firstNameNep && props.error.firstNameNep.type === "required" && (
            <small className="p-error">{props.error.firstNameNep.message}</small>
          )}
        </div>
        <div className="p-field p-col-3 p-md-3 float-left">
          <InputText
            name="middleNameNep"
            isName
            convertToNepali
            placeholder={t("mNameNep")}
            {...props.register("middleNameNep", {
              //   required: "Middle Name Nepali is Required",
            })}
            value={props.getValues("middleNameNep")}
            valueChange={(e, value) => {
              props.setValue("middleNameNep", value);
            }}
          />
          {props.error.middleNameNep && props.error.middleNameNep.type === "required" && (
            <small className="p-error">{props.error.middleNameNep.message}</small>
          )}
        </div>
        <div className="p-field p-col-3 p-md-3 float-left">
          <InputText
            name="lastNameNep"
            isName
            convertToNepali
            placeholder={t("lNameNep")}
            {...props.register("lastNameNep", {
              required: "Last Name Nepali is Required",
            })}
            value={props.getValues("lastNameNep")}
            valueChange={(e, value) => {
              props.setValue("lastNameNep", value);
            }}
          />
          {props.error.lastNameNep && props.error.lastNameNep.type === "required" && (
            <small className="p-error">{props.error.lastNameNep.message}</small>
          )}
        </div>
      </div>
    </>
  );
};
export default NameNepali;
