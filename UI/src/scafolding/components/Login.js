import React, { Component, useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import "../assets/css/Login.css";
import { useForm, Controller } from "react-hook-form";
import { Image } from "primereact/image";
import { Checkbox } from "primereact/checkbox";
import logo from "../assets/images/logo.png";
import AppProps from "../../AppProps";
import LoginService from "../api/services/LoginService";
import { Toast } from "primereact/toast";
import { useHistory } from "react-router";
import { classNames } from "primereact/utils";
const Login = () => {
  const toast = useRef(null);
  const history = useHistory();
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
    LoginService.auth(data.userName, data.password)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success Message",
            detail: "Login Successful",
            life: 3000,
          });
          setTimeout(function () {
            sessionStorage.clear();
            history.push("/");
          }, 3500000);
          setTimeout(() => {
            sessionStorage.setItem("token", response.data.access_token);
            sessionStorage.setItem("userName", data.userName);
            history.push("/sims/landingPage");
          }, 3000);
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
          // Request made and server responded
          console.log(error.response.data.error_description);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          toast.current.show({
            severity: "error",
            summary: "Error Message",
            detail: error.response.data.error_description,
            life: 3000,
          });
        } else if (error.request) {
          // The request was made but no response was received
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
      });
  };
  return (
    <>
      <Toast ref={toast} />{" "}
      <div
        className="p-grid"
        style={{ width: "100%", height: "100vh", justifyContent: "center", alignContent: "center" }}
      >
        <Card
          style={{ minWidth: 400, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div>
            <Image src={logo} height={60} width={300} imageClassName="p-mb-3" />

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-fluid">
                <div className="p-field ">
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
                        placeholder={"User Name"}
                      />
                    )}
                  />

                  {getFormErrorMessage("username")}
                </div>
                <div className="p-field">
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required." }}
                    render={({ field, fieldState }) => (
                      <Password
                        id={field.name}
                        {...field}
                        className="login-password input"
                        placeholder={"Password"}
                        toggleMask
                      />
                    )}
                  />
                  {getFormErrorMessage("password")}
                </div>
              </div>
              <div className="p-field  p-formgrid p-grid p-mb-0">
                <div className="p-col-12 p-md-6 p-field-checkbox">
                  <Checkbox inputId="remMe" className="p-mr-2 "></Checkbox>
                  <label htmlFor="remMe" style={{ fontSize: "12px" }}>
                    Remember me
                  </label>
                </div>
                <div
                  className="p-field p-col-12 p-md-6"
                  onClick={() =>
                    history.push({
                      pathname: "/error",
                    })
                  }
                >
                  <label style={{ float: "right", color: "#2196F3", fontSize: "12px" }}>
                    <span>
                      {" "}
                      <a href={"/error"}> Forgot your password? </a>
                      <Link to={`/error`}> Forgot your password? </Link>
                    </span>
                  </label>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Button
                  type="submit"
                  style={{ width: 150 }}
                  label="Login"
                  className="loginBtn p-button-rounded "
                />
              </div>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};
export default Login;
