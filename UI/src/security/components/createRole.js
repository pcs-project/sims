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
import RoleService from "../api/services/RoleService";
import { Checkbox } from "primereact/checkbox";
const CreateRole = () => {
  const [moduleList, setModuleList] = useState([]);
  const [statusList, setStatusList] = useState([
    { label: "Active ", value: "active" },
    { label: "InActive", value: "inActive" },
  ]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});
  const toast = useRef(null);
  const header = () => (
    <h3 className="p-col-12 p-md-12 text-center  ">
      <i className="pi pi-phone" /> Role
    </h3>
  );
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };
  useEffect(() => {
    RoleService.getModuleList().then((response) => {
      //  setModuleList(response.data.data);
      console.log("response", response.data.data);
      const list = response.data.data.map((module, i) => {
        module.rowIndex = i;
        module.view = 0;
        module.add = 0;
        module.edit = 0;
        module.delete = 0;
        return module;
      });
      setModuleList(list);
    });
  }, []);
  const onSubmit = (data) => {
    console.log("data", data);
    data.appId = "App1";
    data.moduleList = moduleList;
    RoleService.saveRole(data).then((response) => {
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
  const onEditorValueChange = (value, field, rowIndex) => {
    const list = [...moduleList];
    list[rowIndex][field] = value === true ? 1 : 0;
    setModuleList(list);
  };
  const viewBodyTemplate = (rowData) => {
    return (
      <>
        <Checkbox
          onChange={(e) => onEditorValueChange(e.checked, "view", rowData.rowIndex)}
          checked={rowData.view === 1}
        ></Checkbox>
      </>
    );
  };
  const addBodyTemplate = (rowData) => {
    return (
      <>
        <Checkbox
          onChange={(e) => onEditorValueChange(e.checked, "add", rowData.rowIndex)}
          checked={rowData.add === 1}
        ></Checkbox>
      </>
    );
  };
  const editBodyTemplate = (rowData) => {
    return (
      <>
        <Checkbox
          onChange={(e) => onEditorValueChange(e.checked, "edit", rowData.rowIndex)}
          checked={rowData.edit === 1}
        ></Checkbox>
      </>
    );
  };
  const deleteBodyTemplate = (rowData) => {
    return (
      <>
        <Checkbox
          onChange={(e) => onEditorValueChange(e.checked, "delete", rowData.rowIndex)}
          checked={rowData.delete === 1}
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
          <div className="p-field p-col-12 p-md-6 stick-right">
            <label className="p-col-12 p-md-12" htmlFor="description">
              <Label text="Role " textNep="Role " />
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Role  is required." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  autoFocus
                  className={classNames({
                    "p-invalid": fieldState.invalid,
                  })}
                  placeholder={"Role "}
                />
              )}
            />
            {getFormErrorMessage("description")}
          </div>
          <div className="p-field p-col-12 p-md-6 stick-left">
            <label className="p-col-12 p-md-12" htmlFor="status">
              <Label text="Status" textNep="Status" />{" "}
            </label>
            <Controller
              name="status"
              control={control}
              rules={{ required: "Status  is required." }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  autoFocus
                  placeholder={"Select Status"}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={statusList}
                  optionLabel="label"
                />
              )}
            />
            {getFormErrorMessage("status")}
          </div>
          <div className="card p-mt-5">
            <DataTable
              value={moduleList}
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
          <div className="p-col-12 p-md-12">
            <Button
              label="Submit"
              icon="pi pi-check"
              className="p-button-sm pull-right submitBtn"
            />
          </div>
        </form>
      </Card>
    </>
  );
};
export default CreateRole;
