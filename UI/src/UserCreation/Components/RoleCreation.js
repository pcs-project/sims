import React, { useState, useEffect, Component } from "react";
import { PrimeIcons } from "primereact/api";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import AppProps from "../../AppProps";
import { InputSwitch } from "primereact/inputswitch";
import { Image } from "primereact/image";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import Logo1 from "../../scafolding/assets/images/govLogo.png";
import { AutoComplete } from "primereact/autocomplete";
import { Calendar } from "primereact/calendar";
import { CascadeSelect } from "primereact/cascadeselect";
import { Chips } from "primereact/chips";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";
import { TreeSelect } from "primereact/treeselect";
import { Password } from "primereact/password";
import RoleService from "../../security/api/services/RoleService";
import { useForm, Controller } from "react-hook-form";
import {
  MODULE_FUNCTION,
  MODULE_FUNCTION_FIELD,
  MODULE_FUNCTION_VALUE,
  STATUS,
  USER_LEVEL,
} from "../../utilities/constants/ITMISConstansts";
import { Fade } from "react-bootstrap";

import { confirmDialog } from "primereact/confirmdialog";
const RoleCreation = () => {
  const [roleList, setRoleList] = useState([]);
  const [moduleList, setModuleList] = useState([]);
  const [buttonLabel, setButtonLabel] = useState("Create");
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});
  const toast = useRef(null);
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };
  const onSubmit = (data) => {
    data.moduleList = moduleList;
    console.log("Data", JSON.stringify(data));
    buttonLabel == "Update"
      ? RoleService.updateRole(data.roleId, data).then((response) => {
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
      : RoleService.saveRole(data).then((response) => {
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
        });
  };
  useEffect(() => {
    RoleService.getAllParentModuleList().then((response) => {
      console.log(response.data.data);
      const list = [];
      response.data.data.forEach((module) => {
        if (module.subModuleList.length == 0) {
          module.view = 0;
          module.add = 0;
          module.edit = 0;
          module.delete = 0;
          module.appId = "ITMIS";
          module.parentModule = module.moduleId;
          list.push(module);
        } else {
          module.subModuleList.forEach((subModule) => {
            subModule.view = 0;
            subModule.add = 0;
            subModule.edit = 0;
            subModule.delete = 0;
            subModule.appId = "ITMIS";
            subModule.parentModule = module.moduleId;
            list.push(subModule);
          });
        }
      });
      console.log("list--", list);
      setModuleList(list);
    });

    // RoleService.getModuleList().then((response) => {
    //   response.data.data.map((module) => {
    //     module.view = 0;
    //     module.add = 0;
    //     module.edit = 0;
    //     module.delete = 0;
    //     module.appId = "ITMIS";
    //     return module;
    //   });
    //   setModuleList(response.data.data);
    // });
    RoleService.getAllRoleList().then((response) => {
      setRoleList(response.data.data);
    });
  }, []);
  const onEditorValueChange = (value, index, moduleName, field, parentModule) => {
    // console.log(value, index, moduleName);
    setModuleList(
      moduleList.map((module) => {
        if (module.moduleId !== moduleName || module.parentModule !== parentModule) return module;
        else {
          console.log("module", module);
          return {
            ...module,
            [field]: value == true ? index : 0,
          };
        }
      })
    );
  };
  const acceptUpdate = (role) => {
    console.log("role,", role);
    setButtonLabel("Update");
    reset({
      roleId: role.roleId,
      description: role.roleDescription,
      status: role.status,
    });
    RoleService.getAllModuleByRoleId(role.roleId).then((response) => {
      console.log(response.data.data);
      const list = [...moduleList];
      list.map((module) => {
        response.data.data.forEach((roleModule) => {
          if (
            (roleModule.moduleId == module.moduleId) &
            (roleModule.parentModule == module.parentModule)
          ) {
            console.log(MODULE_FUNCTION_VALUE[`${roleModule.funCd}`]);
            module[MODULE_FUNCTION_VALUE[`${roleModule.funCd}`]] = 1;
          }
        });
        return module;
      });
      setModuleList(list);
    });
  };
  const acceptDelete = (role) => {
    RoleService.deleteRole(role.roleId).then((response) => {
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
  const confirmUpdate = (role) => {
    confirmDialog({
      message: "Are you sure you want to Update?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => acceptUpdate(role),
      reject: () => rejectFunc(),
    });
  };
  const confirmDeleteRole = (role) => {
    confirmDialog({
      message: "Are you sure you want to Delete?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => acceptDelete(role),
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
          <h4 className="p-pt-0">Role Registration </h4>
        </div>
      </Card>
      <Card className="p-mt-0" style={{ height: "80vh", overflowY: "auto" }}>
        <div className=" datatable-scroll-demo">
          <div className="card p-col-12 p-md-6" style={{ float: "left" }}>
            <h4 style={{ paddingTop: "0px" }}> Role List</h4>

            <table border="1" className="ucTable" style={{ border: "1px solid #CCC" }}>
              <thead>
                <tr>
                  <th>SN </th>
                  <th>Role</th>
                  <th>Status </th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {roleList.map((role, i) => {
                  return (
                    <>
                      <tr>
                        <td>{i + 1} </td>
                        <td>{role.roleDescription}</td>
                        <td>{role.status}</td>
                        <td>
                          <i
                            className="pi pi-user-edit float-left"
                            onClick={(e) => confirmUpdate(role)}
                          ></i>
                          <i
                            className="pi pi-ban float-right"
                            onClick={(e) => confirmDeleteRole(role)}
                          ></i>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="card p-col-12 p-md-6" style={{ float: "left" }}>
            <h4 className="p-ml-3" style={{ paddingTop: "0px" }}>
              Role Creation
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left">Name :</div>
                <div class="p-field p-col-8 p-md-8 float-left">
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: "Name is required." }}
                    render={({ field, fieldState }) => (
                      <InputText
                        id={field.name}
                        {...field}
                        autoFocus
                        className="rounded-input p-mb-1"
                      />
                    )}
                  />
                  {getFormErrorMessage("description")}
                </div>
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-4 p-md-4 float-left">Status:</div>
                <div class="p-field p-col-8 p-md-8 float-left">
                  <Controller
                    name="status"
                    control={control}
                    rules={{ required: "Status is  required." }}
                    render={({ field, fieldState }) => (
                      console.log("field", field.value == STATUS.ACTIVE),
                      (
                        <div>
                          <RadioButton
                            inputId={STATUS.ACTIVE}
                            name={STATUS.ACTIVE}
                            value={STATUS.ACTIVE}
                            checked={field.value == STATUS.ACTIVE}
                            onChange={(e) => field.onChange(e.value)}
                          />
                          <label htmlFor={STATUS.ACTIVE} className="p-ml-1 p-mr-2">
                            {STATUS.ACTIVE}
                          </label>

                          <RadioButton
                            inputId={STATUS.INACTIVE}
                            name={STATUS.INACTIVE}
                            value={STATUS.INACTIVE}
                            checked={field.value === STATUS.INACTIVE}
                            onChange={(e) => field.onChange(e.value)}
                          />
                          <label htmlFor={STATUS.INACTIVE} className="p-ml-1 p-mr-2">
                            {STATUS.INACTIVE}
                          </label>
                        </div>
                      )
                    )}
                  />
                  {getFormErrorMessage("status")}
                </div>
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <table border="1" className="ucTable" style={{ border: "1px solid #CCC" }}>
                  <thead>
                    <tr>
                      <th>SN </th>
                      <th>Module</th>
                      <th>View </th>
                      <th>Add</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody>
                    {moduleList.map((module, i) => {
                      return (
                        <>
                          <tr>
                            <td>{i + 1} </td>
                            <td>
                              {module.moduleId}{" "}
                              {module.parentModule != module.moduleId
                                ? "(" + module.parentModule + ")"
                                : ""}
                            </td>
                            <td>
                              <Checkbox
                                onChange={(e) =>
                                  onEditorValueChange(
                                    e.checked,
                                    1,
                                    module.moduleId,
                                    MODULE_FUNCTION_FIELD.VIEW,
                                    module.parentModule
                                  )
                                }
                                checked={module.view == 1}
                              />
                            </td>
                            <td>
                              <Checkbox
                                onChange={(e) =>
                                  onEditorValueChange(
                                    e.checked,
                                    1,
                                    module.moduleId,
                                    MODULE_FUNCTION_FIELD.ADD,
                                    module.parentModule
                                  )
                                }
                                checked={module.add == 1}
                              />
                            </td>
                            <td>
                              <Checkbox
                                onChange={(e) =>
                                  onEditorValueChange(
                                    e.checked,
                                    1,
                                    module.moduleId,
                                    MODULE_FUNCTION_FIELD.EDIT,
                                    module.parentModule
                                  )
                                }
                                checked={module.edit == 1}
                              />
                            </td>
                            <td>
                              <Checkbox
                                onChange={(e) =>
                                  onEditorValueChange(
                                    e.checked,
                                    1,
                                    module.moduleId,
                                    MODULE_FUNCTION_FIELD.DELETE,
                                    module.parentModule
                                  )
                                }
                                checked={module.delete == 1}
                              />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-field p-col-12 p-md-12 float-left">
                <div class="p-field p-col-8 p-md-8 float-left"></div>

                <div class="p-field p-col-4 p-md-4 float-right p-pr-0">
                  <Button
                    style={{
                      background: "#4e70ae",
                      color: "#FFF",
                      width: "60%",
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

export default RoleCreation;
