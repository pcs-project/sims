
import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { MultiSelect } from 'primereact/multiselect';
import { InputText } from "primereact/inputtext";

const Source = (props) => {
    const { t } = useTranslation();
    const sourceList = [
        { label: t("localLevelProfile"), value: 'पालिका प्रोफ़ाईल' },
        { label: t("censusData"), value: 'Census Data' },
        { label: t("civilRegistrationSection"), value: 'पंजीकरण साखा' },
        { label: t("womenChildrenServiceCenter"), value: 'नेपाल प्रहरी' },
        { label: t("others"), value: 'Other' }
    ];

    const [sourceVal, setSourceVal] = useState("No");

    useEffect(() => {
        if (props.value != null) {
            if (props.value.length > 0) {
                let val = props.value;
                (val.includes("Other") ? setSourceVal("Yes") : setSourceVal("No"))
            }
        }
    }, [props]);

    const handleSource = (value) => {
        (value.includes("Other") ?
            setSourceVal("Yes") :
            setSourceVal("No")
        )
        props.handleSourceState(value);
    }

    const handleSourceOther = (value) => {
        props.handleSourceOtherState(value);
    }

    return (
        <>
            <div class="p-field p-col-12 p-md-12 main-label" > {t("source")} </div>
            <div class="p-field p-col-12 p-md-12" >
                <MultiSelect
                    options={sourceList}
                    placeholder={t("select")}
                    value={props.value}
                    onChange={(e) => {
                        console.log("value", e.value);
                        handleSource(e.value);
                    }}
                />
            </div>

            {(sourceVal === "Yes") ?
                <div class="p-field p-col-12 p-md-12" >
                    <InputText
                        value={props.sourceOtherValue}
                        onChange={(e) => {
                            handleSourceOther(e.target.value);
                        }}
                    />
                </div>
                :
                <></>
            }
        </>
    )
}
export default Source;