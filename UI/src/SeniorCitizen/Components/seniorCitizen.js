import React, { useState, useEffect } from "react";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import AppProps from "../../AppProps";
import { InputSwitch } from "primereact/inputswitch";
import { Image } from "primereact/image";
import LogoGov from "../../scafolding/assets/images/govLogo.png";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { CountryService } from "../Components/CountryService";
import { NodeService } from "../Components/NodeService";

import { AutoComplete } from "primereact/autocomplete";
import { Calendar } from "primereact/calendar";
import { CascadeSelect } from "primereact/cascadeselect";
import { Chips } from "primereact/chips";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { TreeSelect } from "primereact/treeselect";
import { Password } from "primereact/password";
import { useTranslation } from "react-i18next";
function SeniorCitizen() {
  const { t } = useTranslation();
  return (
    <>
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className=" p-card-content">
          <h4 className="p-pt-0"> {t("seniorCitizen")} </h4>
        </div>
      </Card>

      <Card className="p-mt-0">
        <form className="p-grid p-fluid ">
          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-3 p-md-3 float-left">{t("nameOfSrCitizen")}:</div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <InputText placeholder={t("fName")}></InputText>
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <InputText placeholder={t("mName")}></InputText>
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <InputText placeholder={t("lName")}></InputText>
            </div>
          </div>
          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-3 p-md-3 float-left">{t("permanentAddress")} :</div>
            <div className="p-field p-col-2 p-md-2 float-left">
              <Dropdown inputId="dropdown" placeholder={t("province")} />
            </div>
            <div className="p-field p-col-2 p-md-2 float-left">
              <Dropdown inputId="dropdown" placeholder={t("district")} />
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Dropdown inputId="dropdown" placeholder={t("municipality")} />
            </div>
            <div className="p-field p-col-2 p-md-2 float-left">
              <Dropdown inputId="dropdown" placeholder={t("wardNo")} />
            </div>
          </div>
          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-3 p-md-3 float-left">{t("tempAddress")} :</div>
            <div className="p-field p-col-2 p-md-2 float-left">
              <Dropdown inputId="dropdown" placeholder={t("province")} />
            </div>
            <div className="p-field p-col-2 p-md-2 float-left">
              <Dropdown inputId="dropdown" placeholder={t("district")} />
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Dropdown inputId="dropdown" placeholder={t("municipality")} />
            </div>
            <div className="p-field p-col-2 p-md-2 float-left">
              <Dropdown inputId="dropdown" placeholder={t("wardNo")} />
            </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-3 p-md-3 float-left">{t("gender")} :</div>
            <div className="p-field p-col-1 p-md-1 float-left">
              <RadioButton value="val1" name="city" /> {t("male")}
            </div>
            <div className="p-field p-col-2 p-md-2 float-left" style={{ width: "96px" }}>
              <RadioButton value="val1" name="city" /> {t("female")}
            </div>
            <div className="p-field p-col-2 p-md-2 float-left">
              <RadioButton value="val1" name="city" /> {t("thirdGender")}
            </div>
            <div className="p-field p-col-2 p-md-2 float-right">
              <Dropdown inputId="dropdown" placeholder={t("select")} />
            </div>
            <div className="p-field p-col-1 p-md-1 float-right" style={{ textAlign: "right" }}>
              {t("age")}
            </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-3 p-md-3 float-left">{t("casteEthnicity")} :</div>
            <div className="p-field p-col-1 p-md-1 float-left">
              <RadioButton value="val1" name="city" /> {t("dalit")}
            </div>
            <div className="p-field p-col-2 p-md-2 float-left" style={{ width: "96px" }}>
              <RadioButton value="val1" name="city" /> {t("muslim")}
            </div>
            <div className="p-field p-col-2 p-md-2 float-left" style={{ width: "130px" }}>
              <RadioButton value="val1" name="city" /> {t("madhesi")}
            </div>
            <div className="p-field p-col-2 p-md-2 float-left" style={{ width: "130px" }}>
              <RadioButton value="val1" name="city" /> {t("janajati")}
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <RadioButton value="val1" name="city" /> {t("brahminOther")}
            </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-3 p-md-3 float-left">{t("educational")} :</div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <InputText placeholder={t("classAdmittedIn")}></InputText>
            </div>
            <div className="p-field p-col-3 p-md-3 float-left" style={{ textAlign: "right" }}>
              {t("disability")}:
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Dropdown inputId="dropdown" placeholder={t("physicallyDisabled")} />
            </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-3 p-md-3 float-left">{t("dateOfAdmission")}:</div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <InputText placeholder=""></InputText>
            </div>
            <div className="p-field p-col-3 p-md-3 float-left" style={{ textAlign: "right" }}>
              {t("typesOfCase")} :
            </div>
            <div className="p-field p-col-3 p-md-3 float-left">
              <Dropdown inputId="dropdown" placeholder={t("rescued")} />
            </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-3 p-md-3 float-left">{t("disease")} :</div> 
            <div className="p-field p-col-1 p-md-1 float-left">
              <RadioButton value="val1" name="city" /> {t("yes")}
            </div>
            <div className="p-field p-col-1 p-md-1 float-left">
              <RadioButton value="val1" name="city" /> {t("no")}
            </div>
            <div className="p-field p-col-2 p-md-2 float-left">
              <InputText placeholder=" if any specify"></InputText>
            </div>

            <div className="p-field p-col-2 p-md-2 float-left" style={{ textAlign: "right" }}>
              {t("relatives")} :
            </div>

            <div className="p-field p-col-3 p-md-3 float-right">
              <Dropdown inputId="dropdown" placeholder={t("present")} />
            </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-3 p-md-3 float-left">{t("dateOfBirth")} :</div>

            <div className="p-field p-col-3 p-md-3 float-left">
              <InputText></InputText>
            </div>

            <div className="p-field p-col-4 p-md-4 float-left" style={{ textAlign: "right" }}>
              {t("receivingSSA")} :
            </div>

            <div className="p-field p-col-2 p-md-2 float-left">
              <RadioButton value="val1" name="city" /> {t("no")} &nbsp;
              <RadioButton value="val1" name="city" /> {t("yes")}
            </div>
          </div>

          <div className="p-field p-col-12 p-md-12 ">
            <div className="p-field p-col-3 p-md-3 float-left">{t("rehabilitation")} :</div>

            <div className="p-field p-col-3 p-md-3 float-left">
              <Dropdown inputId="dropdown" placeholder={t("home")} />
            </div>

            <div className="p-field p-col-4 p-md-4 float-left" style={{ textAlign: "right" }}>
              <InputText placeholder={t("pleaseSpDetails")}></InputText>
            </div>

            <div className="p-field p-col-2 p-md-2 float-right">
              <Button
                className="btn btn-primary float-right"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                {t("submit")}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
}

export default SeniorCitizen;
