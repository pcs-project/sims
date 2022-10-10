
import React, { useState } from "react";

import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from "react-i18next";

const Organization = (props) => {
    const { t } = useTranslation();
    const OrganizationList = [
        { label: '2078/79', value: '2078-79' },
        { label: '2079/80', value: '2079-80' }
    ];

    const handleOrganization = (e) => {
        console.log("content  ", e.value);
        props.handleOrganizationState(e.value);
    }
    
    return (
        <>
            <div class="p-field p-col-12 p-md-12"
                style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}>
                <div class="p-field " style={{ display: "flex", alignSelf: "center" }}> {t("organizationList")} :</div>
                <div class="" style={{ flex: 0.3 }}>
                    <Dropdown value={props.value}
                        options={OrganizationList}
                        onChange={handleOrganization}
                        placeholder={t("select")} />
                </div>
            </div>
        </>
    )
}
export default Organization;