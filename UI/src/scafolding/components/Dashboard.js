import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Chart } from "primereact/chart";
import "primeflex/primeflex.css";
import Sidebar from "./Sidebar";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useHistory } from "react-router";
import "../assets/css/DataScrollerDemo.css";
import { Card } from "primereact/card";
import { trackPromise } from "react-promise-tracker";
import ReportService from "../../reports/api/services/ReportService";
import AddressService from "../../security/api/services/AddressService";
import { useTranslation } from "react-i18next";
import i18n from "../../il8n/il8n";
import { LANGUAGE } from "../../utilities/constants/ITMISConstansts";

const Dashboard = () => {

    const { t } = useTranslation();

    const [childrenShowData, setChildrenShowData] = useState([]);
    const [womenShowData, setWomenShowData] = useState([]);
    const [disabledShowData, setDisabledShowData] = useState([]);
    const [seniorCitizenShowData, setSeniorCitizenShowData] = useState([]);
    const [shelterHomeShowData, setShelterHomeShowData] = useState([]);
    const [labourMigrationShowData, setLabourMigrationShowData] = useState([]);
    const [complaintRegistrationShowData, setComplaintRegistrationShowData] = useState([]);
    const [idcardShowData, setIdcardShowData] = useState([]);

    const [provinceList, setProvinceList] = useState([]);

    const location = useLocation();
    const history = useHistory();
    const methods = useForm();
    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        reset,
        setValue,
        getValues,
    } = methods;
    const toast = useRef(null);
    const getFormErrorMessage = (name) => {
        return (
            errors[name] && <small className="p-error">{errors[name].message}</small>
        );
    };

    // useEffect(() => {
    //     {
    //         i18n.language == LANGUAGE.ENGLISH
    //         ? window.location.reload()
    //         : window.location.reload();
    //     }
    // }, [t]);

    useEffect(() => {
        trackPromise(
            ReportService.getChildrenCumulativeData().then((response) => {
                if (response.data.length > 0) {
                    console.log("response.data", response.data);
                    console.log("boys data", response.data[0].boys_count);
                    let childData = {
                        labels: [t("boys"), t("girls"), t("others")],
                        datasets: [
                            {
                                label: t("population"),
                                backgroundColor: '#6e98e5',
                                hoverBackgroundColor: "#5980c8",
                                data: [
                                    response.data[0].boys_population,
                                    response.data[0].girls_population,
                                    response.data[0].others_population
                                ]
                            },
                            {
                                label: t("birthCertificateissued"),
                                backgroundColor: '#0f6ad1',
                                hoverBackgroundColor: "#1958a0",
                                data: [
                                    response.data[0].boys_birth_cert_isssued,
                                    response.data[0].girls_birth_cert_isssued,
                                    response.data[0].others_birth_cert_isssued
                                ]
                            },
                        ],
                    }
                    setChildrenShowData(childData);
                }
            }),

            ReportService.getWomenCumulativeData().then((response) => {
                if (response.data.length > 0) {
                    console.log("response.data", response.data);
                    let womData = {
                        labels: [t("unmarried"), t("divorcee"), t("widow"), t("separated")],
                        datasets: [
                            {
                                type: 'bar',
                                label: t("total"),
                                data: [
                                    response.data[0].singled_women,
                                    response.data[0].divorcee_women,
                                    response.data[0].widowed_women,
                                    response.data[0].separated_women
                                ],
                                backgroundColor: [
                                    "#90cd93"
                                ],
                                hoverBackgroundColor: [
                                    "#90cd93"
                                ]
                            },
                        ],
                    }
                    setWomenShowData(womData);
                }
            }),

            ReportService.getDisabledCumulativeData().then((response) => {
                if (response.data.length > 0) {
                    console.log("response.data", response.data);
                    let disData = {
                        labels: [t("children"), t("adult"), t("Senior Citizen")],
                        datasets: [
                            {
                                type: 'bar',
                                label: t("categoryKa"),
                                backgroundColor: '#FF6384',
                                hoverBackgroundColor: "#FF6384",
                                data: [
                                    response.data[0].disabled_children_ka,
                                    response.data[0].disabled_adult_ka,
                                    response.data[0].disabled_senior_citizen_ka
                                ],
                            },
                            {
                                type: 'bar',
                                label: t("categoryKha"),
                                backgroundColor: '#36A2EB',
                                hoverBackgroundColor: "#36A2EB",
                                data: [
                                    response.data[0].disabled_children_kha,
                                    response.data[0].disabled_adult_kha,
                                    response.data[0].disabled_senior_citizen_kha
                                ]
                            },
                            {
                                type: 'bar',
                                label: t("categoryGa"),
                                backgroundColor: '#FFCE56',
                                hoverBackgroundColor: "#FFCE56",
                                data: [
                                    response.data[0].disabled_children_ga,
                                    response.data[0].disabled_adult_ga,
                                    response.data[0].disabled_senior_citizen_ga
                                ]
                            },
                            {
                                type: 'bar',
                                label: t("categoryGha"),
                                backgroundColor: '#0f6ad1',
                                hoverBackgroundColor: "#0f6ad1",
                                data: [
                                    response.data[0].disabled_children_gha,
                                    response.data[0].disabled_adult_gha,
                                    response.data[0].disabled_senior_citizen_gha
                                ]
                            },
                        ],
                    }
                    setDisabledShowData(disData);
                }
            }),

            ReportService.getSeniorCitizenCumulativeData().then((response) => {
                if (response.data.length > 0) {
                    console.log("response.data", response.data);
                    let scData = {
                        labels: [t("male"), t("female"), t("others")],
                        datasets: [
                            {
                                label: t("population"),
                                backgroundColor: '#FF6384',
                                hoverBackgroundColor: "#FF6384",
                                data: [
                                    response.data[0].male_count,
                                    response.data[0].female_count,
                                    response.data[0].others_count
                                ],
                            },
                            {
                                label: t("citizenGettingSSA"),
                                backgroundColor: '#36A2EB',
                                hoverBackgroundColor: "#36A2EB",
                                data: [
                                    response.data[0].male_senior_getting_spa,
                                    response.data[0].female_senior_getting_spa,
                                    response.data[0].others_senior_getting_spa
                                ]
                            },
                        ],
                    }
                    setSeniorCitizenShowData(scData);
                }
            }),

            ReportService.getShelterHomeCumulativeData().then((response) => {
                if (response.data.length > 0) {
                    console.log("response.data", response.data);
                    let shData = {
                        labels: [
                            // t("male"), 
                            t("female"),
                            t("others")
                        ],
                        datasets: [
                            {
                                type: 'bar',
                                label: t("rescued"),
                                backgroundColor: '#FF6384',
                                hoverBackgroundColor: "#FF6384",
                                data: [
                                    // response.data[0].male_tip_survivors_rescued,
                                    response.data[0].female_tip_survivors_rescued,
                                    response.data[0].others_tip_survivors_rescued
                                ],
                            },
                            {
                                type: 'bar',
                                label: t("suspected"),
                                backgroundColor: '#36A2EB',
                                hoverBackgroundColor: "#36A2EB",
                                data: [
                                    //   response.data[0].male_tip_survivors_suspected,
                                    response.data[0].female_tip_survivors_suspected,
                                    response.data[0].others_tip_survivors_suspected
                                ]
                            },
                            {
                                type: 'bar',
                                label: t("intercepted"),
                                backgroundColor: '#FFCE56',
                                hoverBackgroundColor: "#FFCE56",
                                data: [
                                    // response.data[0].male_tip_survivors_intercepted,
                                    response.data[0].female_tip_survivors_intercepted,
                                    response.data[0].others_tip_survivors_intercepted
                                ]
                            },
                        ],
                    }
                    setShelterHomeShowData(shData);
                }
            }),

            ReportService.getLabourMigrationCumulativeData().then((response) => {
                if (response.data.length > 0) {
                    console.log("response.data", response.data);
                    let lmData = {
                        labels: [t("male"), t("female"), t("others")],
                        datasets: [
                            {
                                data: [
                                    response.data[0].male_migrant_labour,
                                    response.data[0].female_migrant_labour,
                                    response.data[0].other_migrant_labour
                                ],
                                backgroundColor: [
                                    "#FF6384",
                                    "#36A2EB",
                                    "#FFCE56"
                                ],
                                hoverBackgroundColor: [
                                    "#FF6384",
                                    "#36A2EB",
                                    "#FFCE56"
                                ]
                            },
                        ],
                    }
                    setLabourMigrationShowData(lmData);
                }
            }),

            ReportService.getComplaintRegistrationCumulativeData().then((response) => {
                if (response.data.length > 0) {
                    console.log("response.data", response.data);
                    let crData = {
                        labels: [t("tip"), t("gbv")],
                        datasets: [
                            {
                                label: t("caseProsecutedByCourt"),
                                backgroundColor: '#0f6ad1',
                                hoverBackgroundColor: "#1958a0",
                                data: [
                                    response.data[0].tip_case_prosecuted_by_court,
                                    response.data[0].district_case_prosecuted_by_court
                                ]
                            },
                            {
                                label: t("caseDecidedByCourt"),
                                backgroundColor: '#6e98e5',
                                hoverBackgroundColor: "#5980c8",
                                data: [
                                    response.data[0].tip_case_decided_by_court,
                                    response.data[0].district_case_decided_by_court
                                ]
                            },
                        ],
                    }
                    setComplaintRegistrationShowData(crData);
                }
            }),

            ReportService.getIdCardProvinceData().then((response) => {
                if (response.data.length > 0) {
                    console.log("id card ", response.data);
                    let provList = [], idcardData = [];
                    AddressService.getAllProvinces().then((res) => {
                        provList = res.data.data;

                        res.data.data.forEach(provList => {
                            var found = false;
                            response.data.forEach(data => {
                                if (provList.id == data.province_id) {
                                    found = true;
                                    idcardData.push({
                                        province_id: data.province_id,
                                        province_desc_eng: data.province_desc_eng,
                                        province_desc_nep: data.province_desc_nep,
                                        disabled: data.disabled,
                                        senior_citizen: data.senior_citizen
                                    });
                                    console.log("card 1", idcardData);
                                    return;
                                }
                            })
                            if (found === false) {
                                idcardData.push({
                                    province_id: provList.id,
                                    province_desc_eng: provList.provinceDescEng,
                                    province_desc_nep: provList.provinceDescNep,
                                    disabled: 0,
                                    senior_citizen: 0
                                });
                                console.log("card 2", idcardData);
                            }
                        });

                        let idData = {
                            labels: [
                                i18n.language == LANGUAGE.ENGLISH ? idcardData[0].province_desc_eng : idcardData[0].province_desc_nep,
                                i18n.language == LANGUAGE.ENGLISH ? idcardData[1].province_desc_eng : idcardData[1].province_desc_nep,
                                i18n.language == LANGUAGE.ENGLISH ? idcardData[2].province_desc_eng : idcardData[2].province_desc_nep,
                                i18n.language == LANGUAGE.ENGLISH ? idcardData[3].province_desc_eng : idcardData[3].province_desc_nep,
                                i18n.language == LANGUAGE.ENGLISH ? idcardData[4].province_desc_eng : idcardData[4].province_desc_nep,
                                i18n.language == LANGUAGE.ENGLISH ? idcardData[5].province_desc_eng : idcardData[5].province_desc_nep,
                                i18n.language == LANGUAGE.ENGLISH ? idcardData[6].province_desc_eng : idcardData[6].province_desc_nep
                            ],
                            datasets: [
                                {
                                    type: 'bar',
                                    label: t("Disabled"),
                                    backgroundColor: '#FF6384',
                                    hoverBackgroundColor: "#FF6384",
                                    data: [
                                        idcardData[0].disabled,
                                        idcardData[1].disabled,
                                        idcardData[2].disabled,
                                        idcardData[3].disabled,
                                        idcardData[4].disabled,
                                        idcardData[5].disabled,
                                        idcardData[6].disabled
                                    ],
                                },
                                {
                                    type: 'bar',
                                    label: t("Senior Citizen"),
                                    backgroundColor: '#36A2EB',
                                    hoverBackgroundColor: "#36A2EB",
                                    data: [
                                        idcardData[0].senior_citizen,
                                        idcardData[1].senior_citizen,
                                        idcardData[2].senior_citizen,
                                        idcardData[3].senior_citizen,
                                        idcardData[4].senior_citizen,
                                        idcardData[5].senior_citizen,
                                        idcardData[6].senior_citizen
                                    ]
                                }
                            ],
                        }
                        setIdcardShowData(idData);

                    });
                }
            })
        );
    }, []);



    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            animation: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        let volumeOptions = {
            maintainAspectRatio: false,
            animation: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                legend: {
                    labels: {
                        color: "#495057",
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: "#495057",
                    },
                    grid: {
                        color: "#ebedef",
                    },
                    labels: {},
                },
            },
            tooltips: {
                displayColors: false,
                titleFontSize: 16,
                bodyFontSize: 14,
                xPadding: 10,
                yPadding: 10,
                callbacks: {
                    label: (tooltipItem, data) => {
                        return `$ ${tooltipItem.value}`;
                    },
                },
            },
        };

        let lightOptions = {
            animation: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        };

        return {
            basicOptions,
            volumeOptions,
            lightOptions
        };
    }

    const { basicOptions, volumeOptions, lightOptions } = getLightTheme();

    return (
        <Container>
            <div className="p-grid">
                {
                    <div className="main-card p-col-2">
                        <Sidebar />
                    </div>
                }
                <div className="p-grid p-col-10 p30 content card">
                    <div className="p-col-6 titleHeading">
                        <h3 style={{ paddingTop: '0px' }}>
                            {" "}
                            <i className="pi pi-table"></i> {t("Dashboard")}
                        </h3>
                    </div>
                    <div className="p-col-12" style={{ float: 'left' }}>
                        <div className="p-col-4" style={{ float: 'left' }} onClick={() =>
                            history.push({
                                pathname: "/sims/women-province-wise"
                            })
                        }>
                            <Card className="margin-0">
                                <h5>{t("Women and Minorities")}</h5>
                                <div className="card flex justify-content-center">
                                    <Chart type="bar" data={womenShowData} options={basicOptions} />
                                </div>
                            </Card>
                        </div>

                        <div className="p-col-4" style={{ float: 'left' }} onClick={() =>
                            history.push({
                                pathname: "/sims/children-province-wise"
                            })
                        }>
                            <Card className="margin-0" >
                                <h5>{t("Children")}</h5>
                                <Chart
                                    type="bar"
                                    data={childrenShowData}
                                    options={basicOptions}
                                    background="#000"
                                />
                            </Card>
                        </div>


                        <div className="p-col-4" style={{ float: 'left' }} onClick={() =>
                            history.push({
                                pathname: "/sims/disabled-province-wise"
                            })
                        }>
                            <Card className="margin-0">
                                <h5>{t("Disabled")}</h5>
                                <Chart
                                    type="bar"
                                    data={disabledShowData}
                                    options={volumeOptions}
                                    background="#000"
                                />
                            </Card>
                        </div>

                        <div className="p-col-4" style={{ float: 'left' }} onClick={() =>
                            history.push({
                                pathname: "/sims/senior-citizen-province-wise"
                            })
                        }>
                            <Card className="margin-0">
                                <h5>{t("Senior Citizen")}</h5>
                                <Chart
                                    type="bar"
                                    data={seniorCitizenShowData}
                                    options={basicOptions}
                                    background="#000"
                                />
                            </Card>
                        </div>

                        <div className="p-col-4" style={{ float: 'left' }} onClick={() =>
                            history.push({
                                pathname: "/sims/shelter-home-province-wise"
                            })
                        }>
                            <Card className="margin-0">
                                <h5>{t("shelterHomeTIP")}</h5>
                                <Chart
                                    type="bar"
                                    data={shelterHomeShowData}
                                    options={volumeOptions}
                                />
                            </Card>
                        </div>

                        <div className="p-col-4" style={{ float: 'left' }} onClick={() =>
                            history.push({
                                pathname: "/sims/labour-migration-province-wise"
                            })
                        }>
                            <Card className="margin-0">
                                <h5>{t("migrantLabour")}</h5>
                                <div className="card flex justify-content-center">
                                    <Chart type="pie" data={labourMigrationShowData} options={lightOptions} />
                                </div>
                            </Card>
                        </div>

                        <div className="p-col-6" style={{ float: 'left' }} onClick={() =>
                            history.push({
                                pathname: "/sims/complaint-registration-province-wise"
                            })
                        }>
                            <Card className="margin-0">
                                <h5>{t("Complaint Registration")}</h5>
                                <Chart
                                    type="bar"
                                    data={complaintRegistrationShowData}
                                    options={basicOptions}
                                />
                            </Card>
                        </div>

                        <div className="p-col-6" style={{ float: 'left' }} onClick={() =>
                            history.push({
                                pathname: "/sims/id-card-province-wise"
                            })
                        }>
                            <Card className="margin-0">
                                <h5>{t("ID Card")}</h5>
                                <Chart
                                    type="bar"
                                    data={idcardShowData}
                                    options={volumeOptions}
                                />
                            </Card>
                        </div>

                    </div>

                    <div className="p-col-6" style={{ float: 'left' }}>

                    </div>

                </div>
            </div>
        </Container>
    );
}

export default Dashboard;
