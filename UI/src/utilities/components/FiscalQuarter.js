
import React, { useState } from "react";

import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from "react-i18next";

const FiscalQuarter = (props) => {
    const { t } = useTranslation();
    const fiscalYearList = [
        { label: t("2072/73"), value: '2072-73' },
        { label: t("2073/74"), value: '2073-74' },
        { label: t("2074/75"), value: '2074-75' },
        { label: t("2075/76"), value: '2075-76' },
        { label: t("2076/77"), value: '2076-77' },
        { label: t("2077/78"), value: '2077-78' },
        { label: t("2078/79"), value: '2078-79' },
        { label: t("2079/80"), value: '2079-80' },
        { label: t("2080/81"), value: '2080-81' },
        { label: t("2081/82"), value: '2081-82' }
    ];
    const quarterList = [
        { label: t("ShrawanAshwin"), value: 'Shrawan-Ashwin' },
        { label: t("KartikPoush"), value: 'Kartik-Poush' },
        { label: t("MaghChaitra"), value: 'Magh-Chaitra' },
        { label: t("BaishakAshad"), value: 'Baishak-Ashad' }
    ];

    const handleFiscalYear = (e) => {
        console.log("content  ", e.value);
        props.handleFiscalYearState(e.value);
    }

    const handleQuarter = (e) => {
        console.log("content  ", e.value);
        props.handleQuarterState(e.value);
    }

    return (
        <>
            <div class="p-field p-col-12 p-md-12" style={{ justifyContent: "center" }}>
                <div className="p-field p-col-12 p-md-3 float-left main-label"> {t("fiscalYear")}<span style={{ color: "#d00000"}}> * </span></div>
                <div className="p-field p-col-12 p-md-3 float-left">
                    <Dropdown value={props.fiscalYearValue}
                        options={fiscalYearList}
                        onChange={handleFiscalYear}
                        placeholder={t("select")} />
                </div>
                <div className="p-field p-col-12 p-md-3 float-left main-label">{t("quarter")}<span style={{ color: "#d00000"}}> * </span></div>
                <div className="p-field p-col-12 p-md-3 float-left">
                    <Dropdown value={props.quarterValue}
                        options={quarterList}
                        onChange={handleQuarter}
                        placeholder={t("select")} />
                </div>
            </div>
        </>
    )

}
export default FiscalQuarter;