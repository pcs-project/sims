import React, { useState, useEffect } from "react";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import AppProps from "../../AppProps";
import { InputSwitch } from "primereact/inputswitch";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";

import Logo1 from "../../scafolding/assets/images/govLogo.png";
import Stamp from "../../scafolding/assets/images/stamp.png";
import Photo from "../../scafolding/assets/images/photo.png";

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

import Name from "../../utilities/components/Name";
import PermanentAddress from "../../utilities/components/PermanentAddress";
import { useTranslation } from "react-i18next";
function SeniorCitizenModule() {
  const { t } = useTranslation();
  return (
    <>
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className=" p-card-content">
          <h4 className="p-pt-0">{t("serviceDirectory")}</h4>
        </div>
      </Card>
      <Card className="p-mt-0">
        <div className=" p-card-content">
          <form className="p-grid p-fluid ">
            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-2 p-md-2 float-left">{t("fiscalYear")} :</div>
              <div className="p-field p-col-2 p-md-2 float-left">
                <Dropdown inputId="dropdown" placeholder={t("select")} />
              </div>
              <div className="p-field p-col-2 p-md-2 float-left">{t("quarter")}</div>
              <div className="p-field p-col-2 p-md-2 float-left">
                <Dropdown inputId="dropdown" placeholder={t("select")} />
              </div>
            </div>
            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 ">
                <hr style={{ marginTop: "5px" }}></hr>
              </div>
            </div>

            <div className="p-field p-col-12 p-md-12">
              <div className="p-field p-col-3 p-md-3 float-left">{t("name")}</div>
              <div className="p-field p-col-4 p-md-3 float-left">
                <InputText placeholder=""></InputText>
              </div>
            </div>

            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 float-left">
                <h4 class="HeadingTitle p-pt-0">{t("address")}</h4>
              </div>
            </div>

            <PermanentAddress />

            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 float-left">
                <h4 class="HeadingTitle p-pt-0">{t("focalPerson")}</h4>
              </div>
            </div>

            <Name />
            <div className="p-field p-col-12 p-md-12">
              <div className="p-field p-col-3 p-md-3 float-left">{t("designation")}</div>
              <div className="p-field p-col-4 p-md-3 float-left">
                <InputText placeholder=""></InputText>
              </div>
            </div>

            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-12 p-md-12 float-left">
                <h4 class="HeadingTitle p-pt-0"> {t("contact")} </h4>
              </div>
            </div>

            <div className="p-field p-col-12 p-md-12">
              <div className="p-field p-col-3 p-md-3 float-left">{t("mobile")}</div>
              <div className="p-field p-col-3 p-md-3 float-left">
                <InputText placeholder=""></InputText>
              </div>
              <div className="p-field p-col-3 p-md-3 float-left">{t("email")}</div>
              <div className="p-field p-col-3 p-md-3 float-left">
                <InputText placeholder=""></InputText>
              </div>
            </div>
            <div className="p-field p-col-12 p-md-12">
              <div className="p-field p-col-3 p-md-3 float-left">{t("landLine")}</div>
              <div className="p-field p-col-3 p-md-3 float-left">
                <InputText placeholder=""></InputText>
              </div>
              <div className="p-field p-col-3 p-md-3 float-left">{t("extension")}</div>
              <div className="p-field p-col-3 p-md-3 float-left">
                <InputText placeholder=""></InputText>
              </div>
            </div>

            <div className="p-field p-col-12 p-md-12">
              <div className="p-field p-col-3 p-md-3 float-left">{t("department")}</div>
              <div className="p-field p-col-3 p-md-3 float-left">
                <InputText placeholder=""></InputText>
              </div>
              <div className="p-field p-col-3 p-md-3 float-left">{t("roomNo")}</div>
              <div className="p-field p-col-3 p-md-3 float-left">
                <InputText placeholder=""></InputText>
              </div>
            </div>

            <div className="p-field p-col-12 p-md-12 ">
              <div className="p-field p-col-6 p-md-6 float-left">
                <h4 class="HeadingTitle p-pt-0"> {t("services")} </h4>
              </div>
              <Button
                style={{
                  background: "#fff",
                  float: "right",
                  marginLeft: "15px",
                  color: "#000",
                  width: "80px",
                  textAlign: "center",
                }}
              >
                {t("add")}
              </Button>
            </div>

            <div className="p-field p-col-12 p-md-12 p-ml-4">
              <div className="p-field p-col-12 p-md-12 float-left">
                <table
                  border="1"
                  className="ucTable"
                  style={{ border: "1px solid #CCC", width: "850px", float: "left" }}
                >
                  <thead>
                    <tr>
                      <th>{t("an")} </th>
                      <th>{t("serviceName")}</th>
                      <th>{t("govtService")} </th>
                      <th>{t("privateSector")}</th>
                      <th>{t("targetBeneficiaries")}</th>
                      <th>{t("document")}</th>
                      <th>{t("time")}</th>
                      <th>{t("serviceLamination")}</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>1.</td>
                      <td>
                        <InputText placeholder="" style={{ width: "180px" }}></InputText>
                      </td>
                      <td>
                        <label>
                          <input type="radio" name="serviceName"></input> {t("yes")}{" "}
                        </label>
                        <label>
                          <input type="radio" name="serviceName"></input> {t("no")}{" "}
                        </label>
                      </td>
                      <td>
                        <label>
                          <input type="radio" name="serviceName"></input> {t("yes")}{" "}
                        </label>
                        <label>
                          <input type="radio" name="serviceName"></input> {t("no")}{" "}
                        </label>
                      </td>
                      <td>
                        <InputText placeholder="" style={{ width: "180px" }}></InputText>
                      </td>
                      <td>
                        <InputText placeholder="" style={{ width: "100px" }}></InputText>
                      </td>
                      <td>
                        <InputText placeholder="" style={{ width: "100px" }}></InputText>
                      </td>
                      <td>
                        <InputText placeholder="" style={{ width: "100px" }}></InputText>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ clear: "both" }}></div>
              </div>
            </div>
            <div className="p-field p-col-12 p-md-12 p-ml-4">
              <div className="p-field p-col-2 p-md-2 float-right">
                <Button
                  className="btn btn-primary float-right"
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#1c80cf",
                    color: "#FFF",
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
}

export default SeniorCitizenModule;
