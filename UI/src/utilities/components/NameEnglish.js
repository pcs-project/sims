// import React, { useState, useRef } from "react";

// import { InputText } from "primereact/inputtext";
// import { useTranslation } from "react-i18next";
// import { MultiSelectValueError } from "pdf-lib";
// import Nepali from "nepalify-react";
// const NameEnglish = (props) => {
//   const { t } = useTranslation();

//   return (
//     <>
//       <div className="p-field p-col-12 p-md-12 ">
//         <div className="p-field p-col-12 p-md-12 float-left main-label">{t("name")} </div>
//         <div className="p-field p-col-3 p-md-3 float-left">
//           <InputText
//             name="firstNameEng"
//             placeholder={t("fNameEng")}
//             //  value={props.firstNameNep}
//             value={props.getValues("firstNameEng")}
//             {...props.register("firstNameEng", {
//               required: "First Name English is Required",
//             })}
//             onChange={(e) => {
//               props.setValue("firstNameEng", e.target.value);
//             }}
//           />
//           {props.error.firstNameEng && props.error.firstNameEng.type === "required" && (
//             <small className="p-error">{props.error.firstNameEng.message}</small>
//           )}
//         </div>
//         <div className="p-field p-col-3 p-md-3 float-left">
//           <InputText
//             name="middleNameEng"
//             placeholder={t("mNameEng")}
//             // value={props.firstNameNep}
//             value={props.getValues("middleNameEng")}
//             {...props.register("middleNameEng", {
//               // required: "Middle Name English is Required",
//             })}
//             onChange={(e) => {
//               props.setValue("middleNameEng", e.target.value);
//             }}
//           />
//           {props.error.middleNameEng && props.error.middleNameEng.type === "required" && (
//             <small className="p-error">{props.error.middleNameEng.message}</small>
//           )}
//         </div>
//         <div className="p-field p-col-3 p-md-3 float-left">
//           <InputText
//             name="lastNameEng"
//             placeholder={t("lNameEng")}
//             // value={props.firstNameNep}
//             value={props.getValues("lastNameEng")}
//             {...props.register("lastNameEng", {
//               required: "Last Name English is Required",
//             })}
//             onChange={(e) => {
//               props.setValue("lastNameEng", e.target.value);
//             }}
//           />
//           {props.error.lastNameEng && props.error.lastNameEng.type === "required" && (
//             <small className="p-error">{props.error.lastNameEng.message}</small>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };
// export default NameEnglish;
import React, { useState, useRef, useEffect } from "react";

import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";

const NameEnglish = (props) => {
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
        <div className="p-field p-col-12 p-md-12 float-left main-label">
          {t("name")} ({t("english")})<span style={{ color: "#d00000"}}> * </span>
        </div>
        <div className="p-field p-col-3 p-md-3 float-left">
          <InputText
            name="firstNameEng"
            placeholder={t("fNameEng")}
            value={props.getValues("firstNameEng")}
            {...props.register("firstNameEng", {
              required: "First Name is Required",
            })}
            onChange={(e) => {
							if(check(e.target.value))
							{
								e.target.value = "";
							}
              props.setValue("firstNameEng", e.target.value);
              setName(e.target.value);
            }}
          />
          {props.error.firstNameEng && props.error.firstNameEng.type === "required" && (
            <small className="p-error">{props.error.firstNameEng.message}</small>
          )}
        </div>
        <div className="p-field p-col-3 p-md-3 float-left">
          <InputText
            name="middleNameEng"
            placeholder={t("mNameEng")}
            value={props.getValues("middleNameEng")}
            {...props.register("middleNameEng", {
              // required: "Middle Name is Required",
            })}
            onChange={(e) => {
							if(check(e.target.value))
							{
								e.target.value = "";
							}
              props.setValue("middleNameEng", e.target.value);
              setName(e.target.value);
            }}
          />
          {props.error.middleName && props.error.middleName.type === "required" && (
            <small className="p-error">{props.error.middleName.message}</small>
          )}
        </div>
        <div className="p-field p-col-3 p-md-3 float-left">
          <InputText
            name="lastNameEng"
            placeholder={t("lNameEng")}
            value={props.getValues("lastNameEng")}
            {...props.register("lastNameEng", {
              required: "Last Name is Required",
            })}
            onChange={(e) => {
							if(check(e.target.value))
							{
								e.target.value = "";
							}
              props.setValue("lastNameEng", e.target.value);
              setName(e.target.value);
            }}
          />
          {props.error.lastNameEng && props.error.lastNameEng.type === "required" && (
            <small className="p-error">{props.error.lastNameEng.message}</small>
          )}
        </div>
      </div>
    </div>
  );
};
export default NameEnglish;
