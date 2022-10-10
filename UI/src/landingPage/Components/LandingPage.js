import React, { useState, useEffect, Component, useRef } from "react";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Image } from "primereact/image";
import Logo from "../../scafolding/assets/images/logo.png";
import LogoSmall from "../../scafolding/assets/images/logo-small.png";
import NepalFlag from "../../scafolding/assets/images/nepal_flag.gif";
import Manual from "../../scafolding/assets/User_Manual.pdf";
import Api from "../../scafolding/assets/Api.pdf";
import Slider from "./carousel";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import i18n from "../../il8n/il8n";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "primereact/checkbox";
import { Chart } from "primereact/chart";

import { Toast } from "primereact/toast";
import { useHistory } from "react-router";
import LoginService from "../../scafolding/api/services/LoginService";
import { Password } from "primereact/password";
import { trackPromise } from "react-promise-tracker";
import { Link } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import ReportService from "../../reports/api/services/ReportService";

const LandingPage = () => {
  const [nepLanguage, setNepLanguage] = useState(i18n.language == "en" ? false : true);
  const history = useHistory();

  const [displayContact, setDisplayContact] = useState(false);
  const [displayResources, setDisplayResources] = useState(false);
  const [displayUnderConstruction, setDisplayUnderConstruction] = useState(false);
  const [position, setPosition] = useState('center');

  const [womenShowData, setWomenShowData] = useState([]);
  const [disabledShowData, setDisabledShowData] = useState([]);
  const [seniorCitizenShowData, setSeniorCitizenShowData] = useState([]);
  const [childrenShowData, setChildrenShowData] = useState([]);
  const [shelterHomeShowData, setShelterHomeShowData] = useState([]);
  const [labourMigrationShowData, setLabourMigrationShowData] = useState([]);

  const { t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const toast = useRef(null);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  const dialogFuncMap = {
    'displayContact': setDisplayContact,
    'displayResources': setDisplayResources,
    'displayUnderConstruction': setDisplayUnderConstruction
  }

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
              //t("male"), 
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
                  //  response.data[0].male_tip_survivors_rescued,
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
                  //  response.data[0].male_tip_survivors_suspected,
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
                  //  response.data[0].male_tip_survivors_intercepted,
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
      })
    );
  }, []);

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);
    if (position) {
      setPosition(position);
    }
  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  }

  const onSubmit = (data) => {
    trackPromise(
      LoginService.auth(data.userName, data.password)
        .then((response) => {
          console.log("response", response);
          if (response.status === 200) {
            setTimeout(function () {
              sessionStorage.clear();
              history.push("/");
            }, 3500000);
            setTimeout(() => {
              sessionStorage.setItem("token", response.data.access_token);
              sessionStorage.setItem("userName", data.userName);
              sessionStorage.setItem("expires_in", eval(Date.now()));
              sessionStorage.setItem("refresh_token", response.data.refresh_token);
            }, 2500);
            LoginService.getValidationForPassword(data.userName, response.data.access_token).then((response) => {
              console.log("validation response", response);
              if (response.data.httpStatus === "ACCEPTED") {
                console.log("ACCEPTED response");
                sessionStorage.setItem("validation", "ACCEPTED");
                setTimeout(function () {
                  history.push("/sims/dashboard");
                }, 3200);
              } else {
                sessionStorage.setItem("validation", "NOT ACCEPTED");
                setTimeout(function () {
                  history.push("/sims/change-user-password");
                }, 3200);
              }
              toast.current.show({
                severity: "success",
                summary: "Success Message",
                detail: "Login Successful",
                life: 3000,
              });
            });
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: "Login UnSuccessful",
              life: 3000,
            });
          }
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data.error_description);
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: error.response.data.error_description,
              life: 3000,
            });
          } else if (error.request) {
            console.log(error.request);
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: "Network Error",
              life: 3000,
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        })
    );
  };

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
    <>
      <Toast ref={toast} />

      <div className="wrapper" >
        <div className="topBar p-col-12 p-md-12" style={{ display: "flex", flexDirection: "row", height: '18vh', alignItems: 'center' }}>
          <div className="p-col" style={{ float: "left", color: "#fff", flex: "1" }}>
            <a
              href="https://mowcsc.gov.np/"
              target="_blank"
            >
              <Image height={95} src={LogoSmall} />
            </a>
          </div>
          <div className="officeName" style={{ flex: "4" }}>
            <h4 class="gov" >{t("nepGov")}</h4>
            <h1 class="office-name" >{t("ministryOfWCS")}</h1>
            <h4 class="office-address" >{t("mowcscAddress")}</h4>
          </div>
          <div
            className="p-col"
            style={{ color: "#000", flex: "1", display: 'flex', flexDirection: 'row' }}
          >
            <Image height={95} src={NepalFlag} style={{ color: "#000", flex: "1" }} />
            <div className="landing" style={{ marginTop: 0, marginRight: 0, textAlign: 'right', flex: "1", right: 12, }}>
              <span className="en "> EN </span>
              <InputSwitch
                checked={nepLanguage}
                onChange={(e) => {
                  setNepLanguage(e.value);
                  if (e.value) {
                    changeLanguage("np");
                  } else {
                    changeLanguage("en");
                  }
                }}

              />
              <span className="np"> ने </span>
            </div>
          </div>
          <div style={{ clear: "both" }}></div>
        </div>
        <div className="p-col-12 p-md-12" style={{ paddingRight: "0px", height: '77vh', marginTop: '17vh' }}>
          <div className="p-col-8 p-md-8" style={{ float: "left", maxHeight: '94%', overflowY: 'auto', marginTop: "15px" }}>
            {/* TODO CALL DASHBOARD */}
            <div className="p-col-12 p-md-4" style={{ float: 'left' }}>
              <Card className="margin-0">
                <h5>{t("Women and Minorities")}</h5>
                <div className="card flex justify-content-center">
                  <Chart type="bar" data={womenShowData} options={basicOptions} />
                </div>
              </Card>
            </div>
            <div className="p-col-12 p-md-4" style={{ float: 'left', maxHeight: '400px' }}>
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
            <div className="p-col-12 p-md-4" style={{ float: 'left' }}>
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
            <div className="p-col-12 p-md-4" style={{ float: 'left' }}>
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
            <div className="p-col-12 p-md-4" style={{ float: 'left' }}>
              <Card className="margin-0">
                <h5>{t("shelterHomeTIP")}</h5>
                <Chart
                  type="bar"
                  data={shelterHomeShowData}
                  options={volumeOptions}
                />
              </Card>
            </div>
            <div className="p-col-12 p-md-4" style={{ float: 'left' }}>
              <Card className="margin-0">
                <h5>{t("migrantLabour")}</h5>
                <div className="card flex justify-content-center">
                  <Chart type="pie" data={labourMigrationShowData} options={lightOptions} />
                </div>
              </Card>
            </div>
          </div>
          <div
            className="p-col-4 p-md-4"
            style={{
              background: "#a6b4cc", float: "right", height: "80vh",
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}
          >
            <p style={{}}>
              <center>
                <Image height={130} src={Logo} />
              </center>
            </p>
            <p>
              <center style={{ fontWeight: "bold", fontSize: '20px', color: '#134cb7' }}>
                {t("sims")}
              </center>
            </p>

            <div className="p-grid" style={{ placeContent: "center", marginTop: "3px" }}>
              <Card
                className="lgn"
                style={{
                  padding: 0,
                  minWidth: 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <p>
                      <center
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          fontFamily: "poppins",
                        }}
                      >
                        {" "}
                        {t("signInToAccessPortal")}
                      </center>
                    </p>
                    <div className="p-fluid p-mt-3">
                      <div className="p-field">
                        <p>
                          <strong>{t("userName")}</strong>
                        </p>
                        <Controller
                          name="userName"
                          control={control}
                          rules={{ required: "UserName is required." }}
                          render={({ field, fieldState }) => (
                            <InputText
                              id={field.name}
                              {...field}
                              autoFocus
                              className="rounded-input p-mb-1"
                              placeholder={t("userName")}
                            />
                          )}
                        />
                        {getFormErrorMessage("username")}
                      </div>

                      <div className="p-field">
                        <p>
                          <strong>{t("password")}</strong>
                        </p>
                        <Controller
                          name="password"
                          control={control}
                          rules={{ required: "Password is required." }}
                          render={({ field, fieldState }) => (
                            <Password
                              id={field.name}
                              {...field}
                              className="login-password input"
                              placeholder={t("password")}
                              toggleMask
                              feedback={false}
                            />
                          )}
                        />
                        {getFormErrorMessage("password")}
                      </div>
                    </div>

                    <div
                      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <Button
                        type="submit"
                        style={{ width: "150px", border: "none" }}
                        label={t("login")}
                        className=" loginBtn p-button-rounded "
                      />
                    </div>
                    <p>
                      <center style={{ color: "#000", marginTop: "3px" }}>
                        <Link to={`/sims/forgot-password`}> {t("forgetPassword")} ? </Link>
                      </center>
                    </p>
                    <p style={{
                      display: 'flex', flexDirection: 'row', justifyContent: 'center',
                      alignContent: 'center', textAlign: 'center', paddingTop: 5
                    }}>
                      <p className="landing-p" onClick={() => onClick('displayContact')}>
                        {t("contact")}
                      </p>
                      <Dialog header={t("contact")}
                        visible={displayContact}
                        style={{ width: '35vw' }}
                        onHide={() => onHide('displayContact')}>
                        <p style={{ textAlign: 'center', fontWeight: "bold" }}>
                          {t("nepGov")} <br />
                          {t("ministryOfWCS")} <br />
                          <i class="pi pi-globe" /> {t("mowcscAddress")} <br />
                          <i class="pi pi-phone" /> {t("mowcscContact")}<br />
                          <i class="pi pi-envelope" /> info@mowcsc.gov.np<br />
                        </p><p style={{ textAlign: 'center' }}><strong> {t("technicalHead")} :</strong> sims@mowcsc.gov.np</p>
                      </Dialog>
                      <p className="landing-p" onClick={() => onClick('displayUnderConstruction')}>
                        {t("FAQ")}
                        {/* ToDo Make Hyperlink and create a dialog with under construction */}
                      </p>
                      <Dialog header={t("underConstruction")}
                        visible={displayUnderConstruction}
                        style={{ width: '35vw' }}
                        onHide={() => onHide('displayUnderConstruction')}>

                      </Dialog>
                      <p className="landing-p" onClick={() => onClick('displayResources')}>
                        {t("resources")}
                      </p>
                      <Dialog header={t("resources")}
                        visible={displayResources}
                        style={{ width: '50vw', maxHeight: '600px' }}
                        onHide={() => onHide('displayResources')}>
                        {/* <p>
                          <strong>{t("1")}. {t("userManual")} : </strong>
                          <a href={Manual} target="_blank">{t("view")}</a>
                        </p> */}
                        <p>
                          <strong>{t("1")}. {t("api")} : </strong>
                          <a href={Api} target="_blank">{t("view")}</a>
                        </p>
                      </Dialog>
                    </p>
                  </form>
                </div>
              </Card>
            </div>
          </div>
          <div style={{ clear: "both" }}></div>
        </div>
        <div className="footer p-col-12 p-md-12" style={{ height: '5vh' }}>
          <div className="p-col" style={{ float: "left", color: "#fff", padding: "0px" }}>
            {" "}
            {t("allRightReserved")} &copy; {t("thisYear")}
          </div>
          {/* <div className="p-col" style={{ float: "right", color: "#fff", padding: "0px" }}>
            {" "}
            {t("poweredBy")} :{" "}
            <a
              href="https://pcs.com.np/"
              target="_blank"
              style={{
                float: "right",
                color: "rgb(255, 255, 255)",
                padding: " 0px",
                textDecoration: "none",
              }}
            >
              PCS
            </a>
          </div> */}
          <div style={{ clear: "both" }}></div>
        </div>
      </div>
    </>
  );
};
export default LandingPage;