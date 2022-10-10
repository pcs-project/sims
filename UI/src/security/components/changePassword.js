import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { classNames } from "primereact/utils";
import { Toast } from "primereact/toast";

import { useTranslation } from "react-i18next";

import { trackPromise } from "react-promise-tracker";
import Label from "../../other/label";
import { Password } from "primereact/password";
import { Divider } from "primereact/divider";
import { useHistory } from "react-router";
import UserCreationService from "../../UserCreation/api/services/UserCreationService";

const ChangePassword = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [newPassword, setNewPassword] = useState();
  const [reEnterPassword, setReEnterPassword] = useState();
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
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="p-mt-2">Suggestions</p>
      <ul className="p-pl-2 p-ml-2 p-mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );
  const reEnterPasswordHeader =
    newPassword === reEnterPassword ? <h6>Password Match</h6> : <h6>Password Doesnot Match</h6>;

  const onSubmit = (data) => {
    trackPromise(
      UserCreationService.changePassword(data.password, data.newPassword, data.reEnterPassword)
        .then((response) => {
          if (response.status === 200) {
            toast.current.show({
              severity: "success",
              summary: "Success Message",
              detail: "Update Successful",
              life: 3000,
            });
            setTimeout(() => {
              history.push("/");
            }, 3000);
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: "Update UnSuccessful",
              life: 3000,
            });
          }
        })
        .catch((error) => {
          // We want to handle globally
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
      <Toast ref={toast} />
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className=" p-card-content">
          <h4 className="p-pt-0">Change Password</h4>
        </div>
      </Card>
      <Card
        className="p-mt-0"
        style={{
          height: "72vh",
          overflowY: "auto",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className=" p-card-content">
          <form className="p-grid p-fluid " onSubmit={handleSubmit(onSubmit)}>
            <div className="p-field p-col-12 p-md-4 stick-left ">
              <label className="p-col-12 p-md-12" htmlFor="password">
                <Label text="Old Password" textNep="Password" />
              </label>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Old Password is required." }}
                render={({ field, fieldState }) => (
                  <Password
                    id={field.name}
                    {...field}
                    className={classNames({
                      "p-invalid": fieldState.invalid,
                    })}
                    placeholder={"Old Password"}
                    feedback={false}
                  />
                )}
              />
              {getFormErrorMessage("password")}
            </div>
            <div className="p-field p-col-12 p-md-8 stick-left "></div>

            <div className="p-field p-col-12 p-md-4 stick-left ">
              <label className="p-col-12 p-md-12" htmlFor="newPassword">
                <Label text="New Password" textNep="New Password" />
              </label>
              <Controller
                name="newPassword"
                control={control}
                rules={{ required: "New Password is required." }}
                render={({ field, fieldState }) => (
                  (
                    <Password
                      id={field.name}
                      {...field}
                      className={classNames({
                        "p-invalid": fieldState.invalid,
                      })}
                      placeholder={"New Password"}
                      toggleMask
                      header={passwordHeader}
                      footer={passwordFooter}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setNewPassword(e.target.value);
                      }}
                    />
                  )
                )}
              />
              {getFormErrorMessage("newPassword")}
            </div>
            <div className="p-field p-col-12 p-md-8 stick-left "></div>
            <div className="p-field p-col-12 p-md-4 stick-left ">
              <label className="p-col-12 p-md-12" htmlFor="reEnterPassword">
                <Label text="Re Enter Password" textNep="Re Enter Password" />
              </label>
              <Controller
                name="reEnterPassword"
                control={control}
                rules={{ required: "Re Password is required." }}
                render={({ field, fieldState }) => (
                  <Password
                    id={field.name}
                    {...field}
                    className={classNames({
                      "p-invalid": fieldState.invalid,
                    })}
                    placeholder={"Re Enter Password"}
                    toggleMask
                    header={reEnterPasswordHeader}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      setReEnterPassword(e.target.value);
                    }}
                  />
                )}
              />
              {getFormErrorMessage("reEnterPassword")}
            </div>
            <div className="p-field p-col-12 p-md-12 stick-left">
              <div className="p-field p-col-4 p-md-4 stick-left">
                <Button
                  label="Submit"
                //onClick={handleSubmit(submitData)}
                />
              </div>
            </div>
          </form>
        </div>
      </Card>
    </>
  );
};
export default ChangePassword;
