import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";

import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';


//import { WithContext as ReactTags } from 'react-tag-input';

import { useTranslation } from "react-i18next";
import FiscalYear from "../../utilities/components/FiscalYear";
import Source from "../../utilities/components/Source";

import { trackPromise } from "react-promise-tracker";
import Organization from "../../utilities/components/Organization";
import { RadioButton } from 'primereact/radiobutton';
import { TagFaces } from "@mui/icons-material";
import { listClasses } from "@mui/material";

function ModuleDetails() {
    const { t } = useTranslation();

    const [update, setUpdate] = useState("No");

    const [subTitle, setSubTitle] = useState("No");

    const [hideBtn, setHideBtn] = useState("No");

    const [subTitleList, setSubTitleList] = useState([]);

    const [organization, setOrganization] = useState("");
    const [organizationList, setOrganizationList] = useState([]);


    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm();
    const toast = useRef(null);
    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>;
    };

    useEffect(() => {
        // OrganizationService.getOrganizaitonListByUserRole().then((response) => {
        //     console.log("response organization", response.data);
        //     if (response.data.data) {
        //         console.log("response organization22", response.data);
        //         setOrganizationList(response.data.data);
        //         setHideBtn("Yes");
        //     } else {
        //         setHideBtn("No");
        //     }
        //  });
    }, []);

    const submitData = (data) => {

    };

    const updateData = (data) => {

    };

    const handleSubtitleChange = (e) => {
        
        console.log("subtitle", e);
        setSubTitleList(e);
        const list = subTitleList;
        console.log("list ", list);
        // subTitleList.forEach(data => {
        //     list.push({
        //         subtitle: data
        //     });
        // });
       // handleFinalLocationList(list);
        // handleConclusionList(list);
    };

    return (
        <>
            <Toast ref={toast} />
            <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
                <div className=" p-card-content">
                    <h4 className="p-pt-0">{t("childrenAdolescentModule")}</h4>
                </div>
            </Card>
            <Card className="p-mt-0" style={{ height: "72vh", overflowY: "auto" }}>
                <div className=" p-card-content">
                    <form className="p-grid p-fluid ">
                        <div className="p-grid p-col-12 p-md-12 ">
                            <div className="p-field p-col-12 p-md-12 float-left main-label">
                                {t("title")}
                            </div>
                            <div className="p-field p-col-12 p-md-6 float-left">
                                <Controller
                                    name="titleEng"
                                    control={control}
                                    autoFocus
                                    render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({
                                                "p-invalid": fieldState.invalid,
                                            })}
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.value);
                                            }}
                                            placeholder={t("english")}
                                        />
                                    )}
                                />
                            </div>
                            <div className="p-field p-col-12 p-md-6 float-left">
                                <Controller
                                    name="titleNep"
                                    control={control}
                                    autoFocus
                                    render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({
                                                "p-invalid": fieldState.invalid,
                                            })}
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.value);
                                            }}
                                            placeholder={t("nepali")}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="p-grid p-col-12 p-md-12 ">
                            <div className="p-field p-col-12 p-md-12 float-left main-label">
                                {t("description")}
                            </div>
                            <div className="p-field p-col-12 p-md-6 float-left">
                                <Controller
                                    name="descEng"
                                    control={control}
                                    autoFocus
                                    render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({
                                                "p-invalid": fieldState.invalid,
                                            })}
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.value);
                                            }}
                                            placeholder={t("english")}
                                        />
                                    )}
                                />
                            </div>
                            <div className="p-field p-col-12 p-md-6 float-left">
                                <Controller
                                    name="descNep"
                                    control={control}
                                    autoFocus
                                    render={({ field, fieldState }) => (
                                        <InputText
                                            id={field.name}
                                            {...field}
                                            className={classNames({
                                                "p-invalid": fieldState.invalid,
                                            })}
                                            value={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.value);
                                            }}
                                            placeholder={t("nepali")}
                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="p-grid p-col-12 p-md-12 ">
                                <div className="p-field p-col-12 p-md-12 float-left main-label">
                                    {t("subTitle")} :
                                </div>
                                <div className="p-field p-col-6 p-md-6 float-left">
                                    <RadioButton
                                        value="Yes"
                                        name="Yes"
                                        onChange={(e) => {
                                            setSubTitle(e.value);
                                        }}
                                        checked={subTitle === "Yes"}
                                    />
                                    {t("yes")}
                                </div>
                                <div className="p-field p-col-6 p-md-6 float-left">
                                    <RadioButton
                                        value="No"
                                        name="No"
                                        onChange={(e) => {
                                            setSubTitle(e.value);
                                        }}
                                        checked={subTitle === "No"}
                                    /> {t("no")}
                                </div>
                        </div>

                        {subTitle === "Yes"
                            ? (
                                <>
                                    <div className="p-grid p-col-12 p-md-12 ">
                                        <div className="p-field p-col-12 p-md-12 float-left main-label">
                                            {t("subTitle")} :
                                        </div>
                                        <div className="p-field p-col-12 p-md-12 float-left main-label">
                                            <TagsInput value={subTitleList} onChange={handleSubtitleChange} />
                                        </div>
                                    </div>
                                </>
                            )
                            : <></>
                        }

                        <div className="p-field p-col-12 p-md-12 ">
                            <div className="p-field p-col-10 p-md-10 float-left"></div>
                            {hideBtn === "No" ? (
                                <div className="p-field p-col-2 p-md-2 float-right">
                                    {update === "No" ? (
                                        <Button
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                background: "#1c80cf",
                                                color: "#FFF",
                                            }}
                                            label={t("submit")}
                                            onClick={handleSubmit(submitData)}
                                        />
                                    ) : (
                                        <Button
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                background: "#1c80cf",
                                                color: "#FFF",
                                            }}
                                            label={t("edit")}
                                            onClick={handleSubmit(updateData)}
                                        />
                                    )}
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </form>
                </div>
            </Card >
        </>
    );
}

export default ModuleDetails;
