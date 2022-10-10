import React, { useState } from "react";

import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";

const GbvViolence = (props) => {
    const { t } = useTranslation();
    const [violenceType, setViolenceType] = useState();

    const violenceList = [
        { label: t("homeBased"), value: "Home Based" },
        { label: t("publicOfficesOrPlacesBased"), value: "Public offices or places Based" },
        { label: t("schoolBased"), value: "School Based" },
        { label: t("officeBased"), value: "Office Based" },
        { label: t("workPlaceBased"), value: "Work place Based" },
        { label: t("others"), value: "Others" },
    ];
    return (<>
        <Card className='p-mb-1' style={{ borderRadius: '8px 8px 0px 0px', background: '#f7f7f8' }}>
            <div className=' p-card-content'>
                <h3 className='p-pt-0'> {t("gbvCase")}</h3>
            </div>
        </Card>

        <Card className='p-mt-0'>
            <div className=' p-card-content'>
                <div className="p-grid p-col-12 p-md-12 ">
                    <div className="p-col-12 p-md-6">
                        <div className="p-field p-col-12 p-md-12 float-left main-label">
                            {t("typeOfViolence")}
                        </div>
                        <div className="p-field p-col-12 p-md-12 float-left">
                            <Dropdown
                                name="violenceType"
                                placeholder={t("select")}
                                {...props.register("violenceType"
                                    // , {
                                    //     required: "Violence Type is Required",
                                    // }
                                )}
                                value={props.getValues("violenceType")}
                                options={violenceList}
                                onChange={(e) => {
                                    props.setValue("violenceType", e.value);
                                    setViolenceType(e.value);
                                }}
                            />
                            {props.error.violenceType && props.error.violenceType.type === "required" && (
                                <small className="p-error">{props.error.violenceType.message}</small>
                            )}
                        </div>
                    </div>
                    {(props.getValues("violenceType") === "Others") ?
                        <div className="p-col-12 p-md-6">
                            <div className="p-field p-col-12 p-md-12 float-left main-label">
                                {t("pleaseSpDetails")}
                            </div>
                            <div className="p-field p-col-12 p-md-12 float-left">
                                <InputText
                                    name="violenceTypeDetail"
                                    {...props.register("violenceTypeDetail"
                                        // , {
                                        //   required: "Violence Type Detail is Required",
                                        // }
                                    )}
                                    onChange={(e) => {
                                      props.setValue("violenceTypeDetail", e.target.value);
                                    }}
                                />
                                {props.error.violenceTypeDetail && props.error.violenceTypeDetail.type === "required" && (
                                    <small className="p-error">{props.error.violenceTypeDetail.message}</small>
                                )}
                            </div>
                        </div>
                        : <></>
                    }
                </div>
            </div>
        </Card>
    </>

    );
};
export default GbvViolence;
