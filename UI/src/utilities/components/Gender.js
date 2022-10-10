import React, { useState, useRef } from "react";
import { RadioButton } from "primereact/radiobutton";
import { useTranslation } from "react-i18next";
import { propTypes } from "react-bootstrap/esm/Image";
import { GENDER } from "../constants/ITMISConstansts";

const Gender = (props) => {
  const { t } = useTranslation();
  return (
    <>
      <div className="p-field p-col-12 p-md-12 ">
        <div className="p-field p-col-12 p-md-12 float-left main-label">{t("gender")}<span style={{ color: "#d00000"}}> * </span></div>
        <div className="p-field p-col-3 p-md-3 float-left">
          <RadioButton
            value={GENDER.MALE}
            name={GENDER.MALE}
            onChange={(e) => {
              props.onValueChange(e.value);
            }}
            checked={props.value == GENDER.MALE}
          /> {t("male")} 
        </div>
        <div className="p-field p-col-3 p-md-3 float-left">
          <RadioButton
            value={GENDER.FEMALE}
            name={GENDER.FEMALE}
            onChange={(e) => {
              props.onValueChange(e.value);
            }}
            checked={props.value == GENDER.FEMALE}
          /> {t("female")}
        </div>
        <div className="p-field p-col-3 p-md-3 float-left">
          <RadioButton
            value={GENDER.OTHER}
            name={GENDER.OTHER}
            onChange={(e) => {
              props.onValueChange(e.value);
            }}
            checked={props.value == GENDER.OTHER}
          /> {t("thirdGender")}
        </div>
      </div>
    </>
  );
};
export default Gender;
