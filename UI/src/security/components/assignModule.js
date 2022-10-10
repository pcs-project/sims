import { Card } from "primereact/card";
import { useForm, Controller } from "react-hook-form";
import Input from "../../input/Input";
import Label from "../../other/label";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Password } from "primereact/password";
import UserService from "../api/services/UserService";
import RoleService from "../api/services/RoleService";
import { Checkbox } from "primereact/checkbox";
import ModuleService from "../api/services/ModuleService";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
const AssignModule = () => {
  const [moduleList, setModuleList] = useState([]);
  const [userModuleList, setUserModuleList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [user, setUser] = useState([]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});
  const toast = useRef(null);
  const header = () => (
    <h3 className="p-col-12 p-md-12 text-center  ">
      <i className="pi pi-users" /> Assign Module
    </h3>
  );
  const updateModuleStatus = (module) => {
    console.log("module", module);
    switch (module.funCd) {
      case "1":
        module["view"] = module.isAccessible;
        break;
      case "2":
        module["add"] = module.isAccessible;
        break;
      case "3":
        module["edit"] = module.isAccessible;
        break;
      case "4":
        module["delete"] = module.isAccessible;
        break;
      default:
        break;
    }
    return module;
  };
  const getUserModule = (user) => {
    const list = [...moduleList];
    list.map((module) => {
      module.view = null;
      module.add = null;
      module.edit = null;
      module.delete = null;
      return module;
    });
    ModuleService.getModuleListByUserId(user).then((response) => {
      list
        .filter(function (o1) {
          return response.data.data.map(function (o2) {
            if (o1.moduleId == o2.moduleId) {
              o1.isAccessible = o2.isAccessible;
              o1.funCd = o2.funCd;
              o1 = updateModuleStatus(o1);
            }
            return o1;
          });
        })
        .map(function (o) {
          return o;
        });
      setUserModuleList(list);
    });
  };
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };

  const onSubmit = (data) => {};
  const accept = (e, data) => {
    ModuleService.saveUserModuleFunc(data).then((response) => {
      if (response.status === 200) {
        // toast.current.show({
        //   severity: "success",
        //   summary: "Success Message",
        //   detail: "Update Successful",
        //   life: 3000,
        // });
        console.log("user", user);
        getUserModule(user);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Update UnSuccessful",
          life: 3000,
        });
      }
    });
  };

  const reject = (e) => {
    toast.current.show({
      severity: "info",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };
  const confirm = (data) => {
    confirmDialog({
      message: "Are you sure you want to Update?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: (e) => accept(e, data),
      reject: (e) => reject(e),
    });
  };
  const onEditorValueChange = (value, funCd, rowData) => {
    var data = {};
    data.moduleId = rowData.moduleId;
    data.funCd = funCd;
    data.userId = user;
    data.isAccessible = value;
    data.appId = rowData.application.appId;
    confirm(data);
  };

  useEffect(() => {
    UserService.getUserList().then((response) => {
      setUserList(response.data.data);
    });

    RoleService.getModuleList().then((response) => {
      //  setModuleList(response.data.data);

      const list = response.data.data.map((module, i) => {
        module.rowIndex = i;
        module.view = null;
        module.add = null;
        module.edit = null;
        module.delete = null;
        return module;
      });
      setModuleList(list);
      setUserModuleList(list);
    });
  }, []);
  const viewBodyTemplate = (rowData) => {
    return (
      <>
        <Checkbox
          onChange={(e) => onEditorValueChange(e.checked, "1", rowData)}
          checked={rowData.view}
        ></Checkbox>
      </>
    );
  };
  const addBodyTemplate = (rowData) => {
    return (
      <>
        <Checkbox
          onChange={(e) => onEditorValueChange(e.checked, "2", rowData)}
          checked={rowData.add}
        ></Checkbox>
      </>
    );
  };
  const editBodyTemplate = (rowData) => {
    return (
      <>
        <Checkbox
          onChange={(e) => onEditorValueChange(e.checked, "3", rowData)}
          checked={rowData.edit}
        ></Checkbox>
      </>
    );
  };
  const deleteBodyTemplate = (rowData) => {
    return (
      <>
        <Checkbox
          onChange={(e) => onEditorValueChange(e.checked, "4", rowData)}
          checked={rowData.delete}
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
          <div className="p-field p-col-12 p-md-4 stick-left">
            <label className="p-col-12 p-md-12" htmlFor="userId">
              <Label text="User Name" textNep="User Name" />{" "}
            </label>
            <Controller
              name="userId"
              control={control}
              rules={{ required: "User Name  is required." }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  placeholder={"Select User Name"}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.value);
                    setUser(e.value.userId);
                    getUserModule(e.value.userId);
                  }}
                  options={userList}
                  optionLabel="fullName"
                />
              )}
            />
            {getFormErrorMessage("userId")}
          </div>
          <div className="card p-mt-5">
            <DataTable
              value={userModuleList}
              showGridlines
              // paginator
              // rows={10}
              // rowsPerPageOptions={[5, 10, 25]}
            >
              {/* <Column field="application.appId" header="App Id"></Column> */}
              <Column field="moduleId" header="Module"></Column>
              <Column field="view" header="View" body={viewBodyTemplate}></Column>
              <Column field="add" header="Add" body={addBodyTemplate}></Column>
              <Column field="edit" header="Edit" body={editBodyTemplate}></Column>
              <Column field="delete" header="Delete" body={deleteBodyTemplate}></Column>
            </DataTable>
          </div>
        </form>
      </Card>
    </>
  );
};
export default AssignModule;
