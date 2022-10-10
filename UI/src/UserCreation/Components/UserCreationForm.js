import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import UserCreationService from "../api/services/UserCreationService";
import { useForm, Controller } from "react-hook-form";
import { USER_LEVEL } from "../../utilities/constants/ITMISConstansts";
import OrganizationService from "../../security/api/services/OrganizationService";
import RoleService from "../../security/api/services/RoleService";
import AddressService from "../../security/api/services/AddressService";
import UserService from "../../security/api/services/UserService";
import { Toast } from "primereact/toast";
import { confirmDialog } from "primereact/confirmdialog";
import { trackPromise } from "react-promise-tracker";
import { MultiSelectValueError } from "pdf-lib";
import { GestureOutlined } from "@mui/icons-material";
const UserCreationForm = () => {
  const [userList, setUserList] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [provincesList, setProvincesList] = useState([]);
  const [districtsList, setDistrictList] = useState([]);
  const [municipalitiesList, setMunicipalitiesList] = useState([]);
  const [wardList, setWardList] = useState([
    { wardId: 1 },
    { wardId: 2 },
    { wardId: 3 },
    { wardId: 4 },
    { wardId: 5 },
  ]);

  const [userLevelList, setUserLevelList] = useState([
    {
      value: "MINISTRY",
      engName: "MINISTRY",
      nepName: "MINISTRY",
    },
    {
      value: "PROVINCE",
      engName: "PROVINCE",
      nepName: "PROVINCE",
    },
    {
      value: "DISTRICT",
      engName: "DISTRICT",
      nepName: "DISTRICT",
    },
    {
      value: "LOCAL LEVEL",
      engName: "LOCAL LEVEL",
      nepName: "LOCAL LEVEL",
    },
    {
      value: "LOCAL LEVEL VERIFIER",
      engName: "LOCAL LEVEL VERIFIER",
      nepName: "LOCAL LEVEL VERIFIER",
    },
    {
      value: "WARD",
      engName: "WARD",
      nepName: "WARD",
    },
    {
      value: "SOCIAL SERVICE",
      engName: "SOCIAL SERVICE",
      nepName: "SOCIAL SERVICE",
    },
    {
      value: "OTHERS",
      engName: "OTHERS",
      nepName: "OTHERS",
    },
  ]);
  const [buttonLabel, setButtonLabel] = useState("Create");
  const toast = useRef(null);

  useEffect(() => {
    UserCreationService.getUserList().then((response) => {
      setUserList(response.data.data);
    });
    RoleService.getAllRoleList().then((response) => {
      setRoleList(response.data.data);
    });
    OrganizationService.getSocialServiceOrganization().then((response) => {
      setOrganizationList(response.data.data);
    });
    RoleService.getAllRoleList().then((response) => {
      setRoleList(response.data.data);
    });
    AddressService.getAllProvinces().then((response) => {
      setProvincesList(response.data.data);
    });
  }, []);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    setValue,
  } = useForm({
    province: "",
  });
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };
  const getRoleId = (role) => {
    RoleService.getRoleByRoleDesc(role).then((response) => {
      response.status == 200 && response.data.data
        ? setValue("role", response.data.data.roleId)
        : setValue("role", "");
    });
  };
  const onSubmit = (data) => {
    console.log("Data", JSON.stringify(data));
    trackPromise(
      buttonLabel == "Update"
        ? UserService.updateUser(data.userId, data)
            .then((response) => {
              if (response.status === 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Update Successful",
                  life: 3000,
                });
                window.location.reload(false);
              } else {
                toast.current.show({
                  severity: "error",
                  summary: "Error Message",
                  detail: "Update UnSuccessful",
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
        : UserService.saveUser(data)
            .then((response) => {
              if (response.status === 200) {
                toast.current.show({
                  severity: "success",
                  summary: "Success Message",
                  detail: "Save Successful",
                  life: 3000,
                });
                window.location.reload(false);
              } else {
                toast.current.show({
                  severity: "error",
                  summary: "Error Message",
                  detail: "Save UnSuccessful",
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
  const getDistrictValue = (provinceId) => {
    AddressService.getAllDistrictsByProvinceId(provinceId).then((response) => {
      setDistrictList(response.data.data);
    });
  };
  const getMunicipalitiesList = (districtId) => {
    AddressService.getAllMunicipalitiessByDistrictId(districtId).then((response) => {
      setMunicipalitiesList(response.data.data);
    });
  };
  const getTotalWard = (municipalityId) => {
    AddressService.getTotalWard(municipalityId).then((response) => {
      const totalWard = response.data.data;
      const list = [];
      for (var i = 1; i <= response.data.data; i++) {
        list.push({
          wardId: i,
        });
      }
      setWardList(list);
    });
  };
  const acceptUpdate = (user) => {
    console.log("user update", user);
    setButtonLabel("Update");
    if (user.address && user.address.province) getDistrictValue(user.address.province);
    if (user.address && user.address.district) getMunicipalitiesList(user.address.district);
    // user.address != null && user.address.province != null
    //   ? getDistrictValue(user.address.province)
    //   : getDistrictValue();
    // user.address != null && user.address.district != null
    //   ? getMunicipalitiesList(user.address.district)
    //   : getMunicipalitiesList();
    reset({
      userId: user.userId,
      fullName: user.fullName,
      userName: user.username,
      email: user.email,
      phoneNo: user.phoneNo,
      userLevel: user.userLevel,
      province: user.address ? parseInt(user.address.province) : 0,
      district: user.address ? parseInt(user.address.district) : 0,
      municipality: user.address ? parseInt(user.address.municipality) : 0,
      ward: user.address ? parseInt(user.address.ward) : 0,
      organizationId: user.organizationUser[0] ? user.organizationUser[0].organizationId : 0,
      role: user.userRole.length > 0 ? user.userRole[0].roleId : 0,
    });
  };

  const confirmUpdate = (user) => {
    confirmDialog({
      message: "Are you sure you want to Update?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => acceptUpdate(user),
      reject: () => rejectFunc(),
    });
  };

  const confirmReset = (user) => {
    confirmDialog({
      message: "Are you sure you want to Reset password?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => acceptReset(user),
      reject: () => rejectFunc(),
    });
  };
  const acceptReset = (user) => {
    UserService.resetUser(user.userId).then((response) => {
      if (response.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "Reset password Successful",
          life: 3000,
        });
         window.location.reload(false);
        setTimeout(() => {
          UserCreationService.getUserList().then((response) => {
            setUserList(response.data.data);
          });
        }, 3000);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Reset password UnSuccessful",
          life: 3000,
        });
      }
    });
  }

  const acceptDelete = (user) => {
    UserService.deleteUser(user.userId).then((response) => {
      if (response.status === 200) {
        toast.current.show({
          severity: "success",
          summary: "Success Message",
          detail: "Delete Successful",
          life: 3000,
        });
        window.location.reload(false);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Delete UnSuccessful",
          life: 3000,
        });
      }
    });
  };
  const confirmDeleteUser = (user) => {
    confirmDialog({
      message: "Are you sure you want to Delete?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => acceptDelete(user),
      reject: () => rejectFunc(),
    });
  };

  const rejectFunc = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className=" p-card-content">
          <h4 className="p-pt-0">User Registration </h4>
        </div>
      </Card>
      <Card className="p-mt-0" style={{ height: "80vh", overflowY: "auto" }}>
        <div className=" datatable-scroll-demo">
          <div className="card p-col-12 p-md-8" style={{ float: "left" }}>
            <h4 style={{ paddingTop: "0px" }}> User List</h4>
            <table border="1" className="ucTable" style={{ border: "1px solid #CCC" }}>
              <thead>
                <tr>
                  <th>SN </th>
                  <th>Name</th>
                  <th>UserName</th>
                  {/* <th>Email </th> */}
                  <th>Phone</th>
                  <th>User Level</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {userList.map((user, i) => {
                  return (
                    <tr>
                      <td>{i + 1} </td>
                      <td>{user.fullName} </td>
                      <td>{user.username} </td>
                      {/* <td>{user.email}</td> */}
                      <td>{user.phoneNo}</td>
                      <td>{user.userLevel}</td>
                      <td>
                        <i
                          className="pi pi-user-edit float-left" 
                          style={{ paddingRight: "5px" }}
                          onClick={(e) => confirmUpdate(user)}
                        ></i>
                        <i
                          className="pi pi-refresh float-left"
                          style={{ paddingRight: "5px", color: "red" }}
                          onClick={(e) => confirmReset(user)}
                        ></i>
                        <i
                          className="pi pi-trash float-right"
                          onClick={(e) => confirmDeleteUser(user)}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="card p-col-12 p-md-4" style={{ float: "left" }}>
            <h4 className="p-ml-3" style={{ paddingTop: "0px" }}>
              User Creation
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left">Name :</div>
                <div class="p-field p-col-8 p-md-8 float-left">
                  <Controller
                    name="fullName"
                    control={control}
                    rules={{ required: "FullName is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className="rounded-input p-mb-1"
                      />
                    )}
                  />
                  {getFormErrorMessage("fullName")}
                </div>
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left">Username :</div>
                <div class="p-field p-col-8 p-md-8 float-left">
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
                      />
                    )}
                  />
                  {getFormErrorMessage("userName")}
                </div>
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left">Email :</div>
                <div class="p-field p-col-8 p-md-8 float-left">
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className="rounded-input p-mb-1"
                      />
                    )}
                  />
                  {getFormErrorMessage("email")}
                </div>
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left">Phone :</div>
                <div class="p-field p-col-8 p-md-8 float-left">
                  <Controller
                    name="phoneNo"
                    control={control}
                    // rules={{ required: "Phone No is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        type="number"
                        id={field.name}
                        {...field}
                        autoFocus
                        className="rounded-input p-mb-1"
                        maxLength={10}
                      />
                    )}
                  />
                  {getFormErrorMessage("phoneNo")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left">User Level :</div>
                <div class="p-field p-col-8 p-md-8 float-left">
                  <Controller
                    name="userLevel"
                    control={control}
                    rules={{ required: "User Level is  required." }}
                    render={({ field, fieldState }) => (
                      // <div>
                      //   <RadioButton
                      //     inputId={USER_LEVEL.MINISTRY}
                      //     name={USER_LEVEL.MINISTRY}
                      //     value={USER_LEVEL.MINISTRY}
                      //     checked={field.value == USER_LEVEL.MINISTRY}
                      //     onChange={(e) => {
                      //       field.onChange(e.value);
                      //       //setRoleValue(e.value);
                      //     }}
                      //   />
                      //   <label htmlFor={USER_LEVEL.MINISTRY} className="p-ml-1 p-mr-2">
                      //     {USER_LEVEL.MINISTRY}
                      //   </label>

                      //   <RadioButton
                      //     inputId={USER_LEVEL.PROVINCE}
                      //     name={USER_LEVEL.PROVINCE}
                      //     value={USER_LEVEL.PROVINCE}
                      //     checked={field.value == USER_LEVEL.PROVINCE}
                      //     onChange={(e) => field.onChange(e.value)}
                      //   />
                      //   <label htmlFor={USER_LEVEL.PROVINCE} className="p-ml-1 p-mr-2">
                      //     {USER_LEVEL.PROVINCE}
                      //   </label>
                      //   <br></br>
                      //   <RadioButton
                      //     inputId={USER_LEVEL.DISTRICT}
                      //     name={USER_LEVEL.DISTRICT}
                      //     value={USER_LEVEL.DISTRICT}
                      //     checked={field.value == USER_LEVEL.DISTRICT}
                      //     onChange={(e) => field.onChange(e.value)}
                      //   />
                      //   <label htmlFor={USER_LEVEL.DISTRICT} className="p-ml-1 p-mr-2">
                      //     {USER_LEVEL.DISTRICT}
                      //   </label>
                      //   <RadioButton
                      //     inputId={USER_LEVEL.LOCAL_LEVEL}
                      //     name={USER_LEVEL.LOCAL_LEVEL}
                      //     checked={field.value == USER_LEVEL.LOCAL_LEVEL}
                      //     onChange={(e) => field.onChange(e.value)}
                      //   />
                      //   <label htmlFor={USER_LEVEL.LOCAL_LEVEL} className="p-ml-1 p-mr-2">
                      //     {USER_LEVEL.LOCAL_LEVEL}
                      //   </label>
                      //   <br></br>
                      //   <RadioButton
                      //     inputId={USER_LEVEL.WARD}
                      //     name={USER_LEVEL.WARD}
                      //     value={USER_LEVEL.WARD}
                      //     checked={field.value == USER_LEVEL.WARD}
                      //     onChange={(e) => field.onChange(e.value)}
                      //   />
                      //   <label htmlFor={USER_LEVEL.WARD}>{USER_LEVEL.WARD}</label>
                      // </div>
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        placeholder={"Select UserLevel"}
                        onChange={(e) => {
                          field.onChange(e.value);
                          getRoleId(e.value);
                        }}
                        style={{ width: "100%" }}
                        options={userLevelList}
                        optionLabel="engName"
                        optionValue="value"
                      />
                    )}
                  />
                  {getFormErrorMessage("userLevel")}
                </div>
              </div>
              {getValues("userLevel") != USER_LEVEL.MINISTRY &&
              getValues("userLevel") != USER_LEVEL.SOCIAL_SERVICE ? (
                <>
                  {" "}
                  <div className="p-field p-col-12 p-md-12 float-left">
                    <div class="p-field p-col-4 p-md-4 float-left">
                      <strong>Address</strong>
                    </div>
                  </div>
                  <div className="p-field p-col-12 p-md-12 float-left">
                    <div class="p-field p-col-4 p-md-4 float-left">Province :</div>
                    <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                      <Controller
                        name="province"
                        control={control}
                        rules={{ required: "Province is required." }}
                        render={({ field, fieldState }) => (
                          <Dropdown
                            id={field.name}
                            value={field.value}
                            placeholder={"Select Province"}
                            onChange={(e) => {
                              field.onChange(e.value);
                              getDistrictValue(e.value);
                            }}
                            style={{ width: "100%" }}
                            options={provincesList}
                            optionLabel="provinceDescEng"
                            optionValue="id"
                          />
                        )}
                      />
                      {getFormErrorMessage("province")}
                    </div>
                  </div>
                  {getValues("userLevel") != USER_LEVEL.PROVINCE ? (
                    <>
                      <div className="p-field p-col-12 p-md-12 float-left">
                        <div class="p-field p-col-4 p-md-4 float-left">District :</div>
                        <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                          <Controller
                            name="district"
                            control={control}
                            // rules={{ required: "District is required." }}
                            render={({ field, fieldState }) => (
                              <Dropdown
                                id={field.name}
                                value={field.value}
                                placeholder={"Select District"}
                                onChange={(e) => {
                                  field.onChange(e.value);
                                  getMunicipalitiesList(e.value);
                                }}
                                style={{ width: "100%" }}
                                options={districtsList}
                                optionLabel="districtDescEng"
                                optionValue="id"
                              />
                            )}
                          />
                          {getFormErrorMessage("district")}
                        </div>
                      </div>
                      {getValues("userLevel") != USER_LEVEL.DISTRICT ? (
                        <>
                          {" "}
                          <div className="p-field p-col-12 p-md-12 float-left">
                            <div class="p-field p-col-4 p-md-4 float-left">Municipal:</div>
                            <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                              <Controller
                                name="municipality"
                                control={control}
                                //  rules={{ required: "Municipal is required." }}
                                render={({ field, fieldState }) => (
                                  <Dropdown
                                    id={field.name}
                                    value={field.value}
                                    placeholder={"Select Municipality"}
                                    onChange={(e) => {
                                      field.onChange(e.value);
                                      getTotalWard(e.value);
                                    }}
                                    style={{ width: "100%" }}
                                    options={municipalitiesList}
                                    optionLabel="municipalityDescEng"
                                    optionValue="id"
                                  />
                                )}
                              />
                              {getFormErrorMessage("municipality")}
                            </div>
                          </div>
                          {getValues("userLevel") != USER_LEVEL.LOCAL_LEVEL && getValues("userLevel") != USER_LEVEL.LOCAL_LEVEL_VERIFIER ? (
                            <>
                              {" "}
                              <div className="p-field p-col-12 p-md-12 float-left">
                                <div class="p-field p-col-4 p-md-4 float-left">Ward :</div>
                                <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                                  <Controller
                                    name="ward"
                                    control={control}
                                    // rules={{ required: "Ward is required." }}
                                    render={({ field, fieldState }) => (
                                      <Dropdown
                                        id={field.name}
                                        value={field.value}
                                        placeholder={"Select Ward"}
                                        onChange={(e) => {
                                          field.onChange(e.value);
                                        }}
                                        style={{ width: "100%" }}
                                        options={wardList}
                                        optionLabel="wardId"
                                        optionValue="wardId"
                                      />
                                    )}
                                  />
                                  {getFormErrorMessage("ward")}
                                </div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
              {getValues("userLevel") == USER_LEVEL.SOCIAL_SERVICE ? (
                <>
                  {" "}
                  <div className="p-field p-col-12 p-md-12 float-left">
                    <div class="p-field p-col-4 p-md-4 float-left">Office :</div>
                    <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                      <Controller
                        name="organizationId"
                        control={control}
                        //   rules={{ required: "Office is required." }}
                        render={({ field, fieldState }) => (
                          <Dropdown
                            id={field.name}
                            value={field.value}
                            placeholder={"Select Office"}
                            onChange={(e) => {
                              field.onChange(e.value);
                            }}
                            style={{ width: "100%" }}
                            options={organizationList}
                            optionLabel="name"
                            optionValue="organizationId"
                          />
                        )}
                      />
                      {getFormErrorMessage("organizationId")}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {getValues("userLevel") == USER_LEVEL.OTHERS ? (
                <>
                  {" "}
                  <div className="p-field p-col-12 p-md-12 float-left">
                    <div class="p-field p-col-4 p-md-4 float-left">Office :</div>
                    <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                      <Controller
                        name="organizationAddress"
                        control={control}
                        //   rules={{ required: "Office is required." }}
                        render={({ field, fieldState }) => (
                          <InputText
                            id={field.name}
                            {...field}
                            autoFocus
                            className="rounded-input p-mb-1"
                          />
                        )}
                      />
                      {getFormErrorMessage("organizationAddress")}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left">Role :</div>
                <div class="p-field p-col-8 p-md-8 float-left p-pr-0">
                  <Controller
                    name="role"
                    control={control}
                    rules={{ required: "Role is required." }}
                    render={({ field, fieldState }) => (
                      <Dropdown
                        id={field.name}
                        value={field.value}
                        placeholder={"Select Role"}
                        onChange={(e) => {
                          field.onChange(e.value);
                        }}
                        style={{ width: "100%" }}
                        options={roleList}
                        optionLabel="roleDescription"
                        optionValue="roleId"
                      />
                    )}
                  />
                  {getFormErrorMessage("role")}
                </div>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-8 p-md-8 float-left"></div>

                <div class="p-field p-col-4 p-md-4 float-right p-pr-0">
                  <Button
                    style={{
                      background: "#4e70ae",
                      color: "#FFF",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    {buttonLabel}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div style={{ clear: "both" }}></div>
      </Card>
    </>
  );
};
export default UserCreationForm;
