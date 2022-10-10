import { Card } from "primereact/card";
import { useForm, Controller } from "react-hook-form";
import Input from "../../input/Input";
import Label from "../../other/label";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import OrganizationService from "../api/services/OrganizationService";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";
import UserService from "../api/services/UserService";
import RoleService from "../api/services/RoleService";
import { Checkbox } from "primereact/checkbox";
import { trackPromise } from "react-promise-tracker";
const CreateUser = () => {
  const [organizationList, setOrganizationList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [userList, setUserList] = useState([]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});
  const toast = useRef(null);
  const header = () => (
    <h3 className="p-col-12 p-md-12 text-center  ">
      <i className="pi pi-users" /> User
    </h3>
  );
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };
  useEffect(() => {
    OrganizationService.getOrganizaitonDetailsByLoggedUser().then((response) => {
      setOrganizationList(response.data.data);
      if (response.data.data.length == 1) {
        console.log(response.data.data[0]);
        reset({
          organization: response.data.data[0],
        });
      }
      // console.log(response.data);
    });
    UserService.getUserList().then((response) => {
      setUserList(response.data.data);
    });

    RoleService.getRoleList().then((response) => {
      const list = response.data.data.map((role, i) => {
        var newRole = {};
        newRole.rowIndex = i;
        newRole.roleId = role.roleId;
        newRole.selected = null;
        newRole.roleDescription = role.roleDescription;
        newRole.fromDate = null;
        newRole.toDate = null;
        return newRole;
      });
      setRoleList(list);
    });
  }, []);

  const onSubmit = (data) => {
    const selectedRoleList = [...roleList.filter((role) => role.selected === true)];
    data.organizationId = data.organization.organizationId;
    //data.roleList = selectedRoleList;
    data.roleList = [];
    console.log(JSON.stringify(data));
    // trackPromise(
    UserService.saveUser(data)
      .then((response) => {
        if (response.status === 200) {
          toast.current.show({
            severity: "success",
            summary: "Success Message",
            detail: "Save Successful",
            life: 3000,
          });
          reset({
            fullName: " ",
            userName: " ",
            email: "",
            phoneNo: " ",
            password: "",
          });
          setRoleList();
          const list = roleList.map((role) => {
            role.selected = null;
            role.roleDescription = role.roleDescription;
            role.fromDate = null;
            role.toDate = null;
            return role;
          });
          setRoleList(list);
        } else {
          alert("44444444");
          toast.current.show({
            severity: "error",
            summary: "Error Message",
            detail: "Save UnSuccessful",
            life: 3000,
          });
        }
      })
      .catch(function (error) {
        alert("32423");
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
      });
    // );
  };
  const onEditorValueChange = (value, field, rowIndex) => {
    const list = [...roleList];
    list[rowIndex][field] = value;
    setRoleList(list);
  };
  const selectBodyTemplate = (rowData) => {
    return (
      <>
        <Checkbox
          onChange={(e) => onEditorValueChange(e.checked, "selected", rowData.rowIndex)}
          checked={rowData.selected}
        ></Checkbox>
      </>
    );
  };
  return (
    <>
      <Toast ref={toast} />
      <Card header={header} className=" p-col-11 ">
        <form className="p-grid p-fluid " onSubmit={handleSubmit(onSubmit)}>
          <div className="p-field p-col-12 p-md-12">
            <p className="section-title">General Info</p>
          </div>
          <div className="p-field p-col-12 p-md-4 stick-right">
            <label className="p-col-12 p-md-12" htmlFor="fullName">
              <Label text="Full Name" textNep="Full Name" />
            </label>
            <Controller
              name="fullName"
              control={control}
              rules={{ required: "Full Name is required." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({
                    "p-invalid": fieldState.invalid,
                  })}
                  placeholder={"Full Name"}
                />
              )}
            />
            {getFormErrorMessage("fullName")}
          </div>
          <div className="p-field p-col-12 p-md-4 stick-left stick-right">
            <label className="p-col-12 p-md-12" htmlFor="userName">
              <Label text="User Name" textNep="User Name" />
            </label>
            <Controller
              name="userName"
              control={control}
              rules={{ required: "User Name is required." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({
                    "p-invalid": fieldState.invalid,
                  })}
                  placeholder={"User Name"}
                />
              )}
            />
            {getFormErrorMessage("userName")}
          </div>
          <div className="p-field p-col-12 p-md-4 stick-left">
            <label className="p-col-12 p-md-12" htmlFor="organization">
              <Label text="Organization Name" textNep="Organization Name" />{" "}
            </label>
            <Controller
              name="organization"
              control={control}
              rules={{ required: "Organization  is required." }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  placeholder={"Select Organization"}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={organizationList}
                  disabled={organizationList.length == 1}
                  optionLabel="name"
                />
              )}
            />
            {getFormErrorMessage("organization")}
          </div>
          <div className="p-field p-col-12 p-md-4  stick-right">
            <label className="p-col-12 p-md-12" htmlFor="email">
              <Label text="Email" textNep="Email" />
            </label>
            <span className="p-float-label p-input-icon-right ">
              <i className="pi pi-envelope p-mt-3" />
            </span>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address. E.g. example@email.com",
                },
              }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({
                    "p-invalid": fieldState.invalid,
                  })}
                  placeholder={"Email"}
                />
              )}
            />
            {getFormErrorMessage("email")}
          </div>
          <div className="p-field p-col-12 p-md-4 stick-left stick-right">
            <label className="p-col-12 p-md-12" htmlFor="phoneNo">
              <Label text="Phone No" textNep="Phone No" />
            </label>
            <span className="p-float-label p-input-icon-right ">
              <i className="pi pi-mobile p-mt-3" />
            </span>
            <Controller
              name="phoneNo"
              control={control}
              rules={{ required: "Phone No is required." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({
                    "p-invalid": fieldState.invalid,
                  })}
                  placeholder={"Phone No"}
                />
              )}
            />
            {getFormErrorMessage("phoneNo")}
          </div>
          <div className="p-field p-col-12 p-md-4 stick-left ">
            <label className="p-col-12 p-md-12" htmlFor="password">
              <Label text="Password" textNep="Password" />{" "}
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required." }}
              render={({ field, fieldState }) => (
                <Password
                  id={field.name}
                  {...field}
                  className={classNames({
                    "p-invalid": fieldState.invalid,
                  })}
                  placeholder={"Password"}
                  toggleMask
                />
              )}
            />
            {getFormErrorMessage("password")}
          </div>
          <div className="p-col-12 p-md-12">
            <Button
              label="Submit"
              icon="pi pi-check"
              className="p-button-sm pull-right submitBtn"
            />
          </div>
          <div className="card p-mt-5">
            {/* <DataTable
              value={roleList}
              showGridlines
              // paginator
              // rows={10}
              // rowsPerPageOptions={[5, 10, 25]}
            >
              <Column
                field="select"
                header="Select"
                body={selectBodyTemplate}
                style={{ width: "80px" }}
              />

              <Column field="roleDescription" header="Role "></Column>
            </DataTable> */}
            <DataTable
              value={userList}
              showGridlines
              // paginator
              // rows={10}
              // rowsPerPageOptions={[5, 10, 25]}
            >
              <Column field="username" header="User Name " />
              <Column field="fullName" header="Full Name " />
              <Column field="email" header="Email " />
              <Column field="phoneNo" header="Phone No" />
            </DataTable>
          </div>
        </form>
      </Card>
    </>
  );
};
export default CreateUser;
