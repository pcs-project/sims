import React, { useState, useEffect, Component, useRef } from "react";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Image } from "primereact/image";
import LogoGov from "../../scafolding/assets/images/govLogo.png";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import i18n from "../../il8n/il8n";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";

import { Toast } from "primereact/toast";

import { Password } from "primereact/password";
import { trackPromise } from "react-promise-tracker";
import { Link } from "react-router-dom";
import UserCreationService from "../../UserCreation/api/services/UserCreationService";
const ForgotPassword = () => {
  const { t } = useTranslation();
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
  const onSubmit = (data) => {
    trackPromise(
      UserCreationService.sendNewPassword(data.email)
        .then((response) => {
          if (response.status === 200) {
            toast.current.show({
              severity: "success",
              summary: "Success Message",
              detail: "Email Sent Successful",
              life: 3000,
            });
            window.location.reload(false);
          }
        })
        .catch((error) => {
          error.handleGlobally && error.handleGlobally();
          toast.current.show({
            severity: "error",
            summary: "Error Message",
            detail: error.response.data.msg,
            life: 3000,
          });
        })
    );
  };
  return (
    <>
      {" "}
      <Toast ref={toast} />
      <div
        className="p-col-12 p-md-12"
        style={{ background: "#a6b4cc", float: "right", height: "100vh" }}
      >
        <p style={{ marginTop: "25px", paddingTop: "50px" }}>
          <center>
            <Image src={LogoGov} />
          </center>
        </p>
        <p>
          <center style={{ color: "#d00000", fontWeight: "bold" }}>
            {t("nepGov")}
            <br></br>
            {t("ministryOfWCS")}
          </center>
        </p>

        <div className="p-grid" style={{ justifyContent: "center", alignContent: "center" }}>
          <Card
            className="forgetPassword lgn"
            style={{
              minWidth: 200,
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
                      fontSize: "23px",
                      fontWeight: "bold",
                      marginTop: "5px",
                      fontFamily: "poppins",
                    }}
                  >
                    {" "}
                    {t("forgetPassword")} ?
                  </center>
                </p>

                <div className="p-fluid p-mt-3 ">
                  <div className="p-field">
                    <p>
                      <strong>{t("email")}</strong>
                    </p>
                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: "Email is required." }}
                      render={({ field, fieldState }) => (
                        <InputText
                          id={field.name}
                          {...field}
                          autoFocus
                          className="rounded-input p-mb-1 "
                          placeholder={"Enter your Email"}
                        />
                      )}
                    />
                    {getFormErrorMessage("email")}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    style={{ width: "150px", border: "none" }}
                    label={t("sendEmail")}
                    className=" loginBtn p-button-rounded "
                  />
                </div>
                <p>
                  <center style={{ color: "#000", marginTop: "15px" }}>
                    {" "}
                    <Link to={`/`}>
                      <i
                        class="pi pi-arrow-left"
                        style={{ fontSize: "1rem", marginRight: "5px" }}
                      ></i>
                      {t("backToLogin")}?{" "}
                    </Link>
                  </center>
                </p>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
