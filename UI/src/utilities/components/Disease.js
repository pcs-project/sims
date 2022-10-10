import React, { useState, useRef } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { useTranslation } from "react-i18next";
import { TRUE_FALSE, YES_NO } from "../constants/ITMISConstansts";

const Disease = (props) => {
  const { t } = useTranslation();
  const [disease, setDisease] = useState();
  
  return (
    <div className="p-grid p-col-12 p-md-12 ">
      <div class="p-col-12 p-md-6">
        <div className="p-field p-col-12 p-md-12 float-left main-label">{t("disease")} </div>
        <div className="p-field p-col-6 p-md-6 float-left">
          <RadioButton
            value={YES_NO.YES}
            name={YES_NO.YES}
            onChange={(e) => {
              props.setValue("disease", YES_NO.YES);
              setDisease(e.value);
            }}
            checked={props.getValues("disease") == YES_NO.YES}
          /> {t("cha")}
        </div>
        <div className="p-field p-col-6 p-md-6 float-left">
          <RadioButton
            value={YES_NO.NO}
            name={YES_NO.NO}
            onChange={(e) => {
              props.setValue("disease", YES_NO.NO);
              setDisease(e.value);
            }}
            checked={props.getValues("disease") == YES_NO.NO}
          /> {t("chaina")}
        </div>
      </div>
      {props.getValues("disease")  === "Yes" ? (
        <div class="p-col-12 p-md-6">
          <div className="p-field p-col-12 p-md-12 float-left main-label">
            {t("diseaseDetails")}
          </div>
          <div className="p-field p-col-12 p-md-12 float-left">
            <InputText
              name="diseaseDetail"
              placeholder={t("diseaseDetails")}
              value={props.getValues("diseaseDetail")}
              {...props.register("diseaseDetail"
              // , {
              //   required: "Details is Required",
              // }
              )}
              onChange={(e) => {
                props.setValue("diseaseDetail", e.target.value);
                setDisease(e.target.value);
              }}
            />
            {/* {props.error.diseaseDetail && props.error.diseaseDetail.type === "required" && (
              <small className="p-error">{props.error.diseaseDetail.message}</small>
            )} */}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Disease;
