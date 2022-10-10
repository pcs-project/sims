import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PhotoUpload from "../../IdCardForm/Components/PhotoUpload";
import { FORM_MODE, YES_NO } from "../constants/ITMISConstansts";

const OldIdExist = (props) => {
  const { t } = useTranslation();
  const [oldIdExist, setOldIdExist] = useState();
  return (
    <>
      {" "}
      <div className="p-grid p-col-12 p-md-12 ">
        <div class="p-col-12 p-md-6">
          <div className="p-field p-col-12 p-md-12 float-left main-label">{t("oldIdExist")} </div>
          <div className="p-field p-col-6 p-md-6 float-left">
            <RadioButton
              value={YES_NO.YES}
              name={YES_NO.YES}
              onChange={(e) => {
                props.setValue("oldIdExist", YES_NO.YES);
                setOldIdExist(e.value);
              }}
              checked={props.getValues("oldIdExist") === YES_NO.YES}
            /> {t("cha")}
          </div>
          <div className="p-field p-col-6 p-md-6 float-left">
            <RadioButton
              value={YES_NO.NO}
              name={YES_NO.NO}
              onChange={(e) => {
                props.setValue("oldIdExist", YES_NO.NO);
                setOldIdExist(e.value);
              }}
              checked={props.getValues("oldIdExist") === YES_NO.NO}
            /> {t("chaina")}
          </div>
        </div>
      </div>
      {props.getValues("oldIdExist") === "Yes" ? (
        //    <>

        //       <div className="p-field p-col-6 p-md-6 float-left main-label">
        //         {t("oldIdCardNo")}
        //       </div>
        //       <div className="p-field p-col-6 p-md-6 float-left">
        //         <InputText
        //           name="oldIdCardNo"
        //           placeholder={t("oldIdCardNo")}
        //           value={props.getValues("oldIdCardNo")}
        //           {...props.register("oldIdCardNo"
        //           , {
        //             required: "Old Id Card No is Required",
        //           }
        //           )}
        //           onChange={(e) => {
        //             props.setValue("oldIdCardNo", e.target.value);

        //           }}
        //         />
        //         {props.error.oldIdCardNo && props.error.oldIdCardNo.type === "required" && (
        //           <small className="p-error">{props.error.oldIdCardNo.message}</small>
        //         )}
        //       </div>
        //       </>
        <div className="p-grid p-col-12 p-md-12 ">
          <div className="p-col-4 p-md-4">
            <div className="p-field p-col-12 p-md-12 float-left main-label">
              {t("oldIdCardNo")}:
            </div>
            <div className="p-field p-col-12 p-md-12 float-left">
              <InputText
                name="oldIdCardNo"
                placeholder={t("oldIdCardNo")}
                value={props.getValues("oldIdCardNo")}
                {...props.register("oldIdCardNo", {
                  required: "Old Id Card No is Required",
                })}
                onChange={(e) => {
                  props.setValue("oldIdCardNo", e.target.value);
                }}
              />
              {props.error.oldIdCardNo && props.error.oldIdCardNo.type === "required" && (
                <small className="p-error">{props.error.oldIdCardNo.message}</small>
              )}
            </div>
          </div>
          <div className="p-col-4 p-md-4">
            <div className="p-field p-col-12 p-md-12 float-left main-label">
              {t("oldIdCardImage")}:
            </div>
            <div className="p-field p-col-12 p-md-12 float-left">
              <PhotoUpload
                name="oldIdCardImage"
                className="rounded-input p-mb-1"
                uploadHandler={(value) => {
                  props.setValue("oldIdCardImage", value);
                }}
              />
              {/* {props.error.oldIdCardNo && props.error.oldIdCardNo.type === "required" && (
              <small className="p-error">{props.error.oldIdCardNo.message}</small>
            )}  */}
            </div>
          </div>
          <div className="p-field p-col-2 p-md-2 float-left p-mr-3 p-mt-4">
            {props.getValues("oldIdPhoto") !== undefined &&
            props.getValues("dataStatus") === FORM_MODE.UPDATE ? (
              <Image
                width={150}
                height={120}
                src={"data:image/jpg;base64," + props.getValues("oldIdPhoto")}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default OldIdExist;
