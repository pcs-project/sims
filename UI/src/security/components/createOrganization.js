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
const CreateOrganization = () => {
  const [organizationList, setOrganizationList] = useState([]);
  const [organizationTypeList, setOrganizationTypeList] = useState([
    { label: "NTA", value: "NTA" },
    { label: "ISP", value: "ISP" },
    { label: "Operator", value: "Operator" },
    { label: "CIB", value: "CIB" },
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
      <i className="pi pi-phone" /> Organization
    </h3>
  );
  const getFormErrorMessage = (name) => {
    return errors[name] && <small className="p-error">{errors[name].message}</small>;
  };
  useEffect(() => {
    OrganizationService.getOrganizaitonDetails().then((response) => {
      setOrganizationList(response.data.data);
      // console.log(response.data);
    });
  }, []);
  const onSubmit = (data) => {
    OrganizationService.saveOrganizaitonDetails(data).then((response) => {
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
  return (
    <>
      <Toast ref={toast} />
      <Card header={header} className=" p-col-11 ">
        <form className="p-grid p-fluid " onSubmit={handleSubmit(onSubmit)}>
          <div className="p-field p-col-12 p-md-12">
            <p className="section-title">General Info</p>
          </div>
          <div className="p-field p-col-12 p-md-4 stick-right">
            <label className="p-col-12 p-md-12" htmlFor="name">
              <Label text="Organization Name" textNep="Name" />{" "}
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Organization Name is required." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({
                    "p-invalid": fieldState.invalid,
                  })}
                  placeholder={"Organization Name"}
                />
              )}
            />
            {getFormErrorMessage("name")}
          </div>
          <div className="p-field p-col-12 p-md-4 stick-left stick-right">
            <label className="p-col-12 p-md-12" htmlFor="address">
              <Label text=" Address" textNep="Address" />{" "}
            </label>
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({
                    "p-invalid": fieldState.invalid,
                  })}
                  placeholder={"Address"}
                />
              )}
            />
            {getFormErrorMessage("address")}
          </div>
          <div className="p-field p-col-12 p-md-4 stick-left">
            <label className="p-col-12 p-md-12" htmlFor="organizationType">
              <Label text=" Organization Type" textNep="Organization Type" />{" "}
            </label>
            <Controller
              name="organizationType"
              control={control}
              rules={{ required: "Organization Type is required." }}
              render={({ field, fieldState }) => (
                <Dropdown
                  id={field.name}
                  placeholder={"Select Organization Type"}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={organizationTypeList}
                  optionLabel="label"
                />
              )}
            />
            {getFormErrorMessage("organizationType")}
          </div>

          <div className="p-col-12 p-md-12">
            <Button
              label="Submit"
              icon="pi pi-check"
              className="p-button-sm pull-right submitBtn"
            />
          </div>
          <DataTable
            value={organizationList}
            showGridlines
            // paginator
            // rows={10}
            // rowsPerPageOptions={[5, 10, 25]}
          >
            <Column field="name" header="Name"></Column>
            <Column field="address" header="Address"></Column>
            <Column field="organizationType" header="Organization Type"></Column>
          </DataTable>
        </form>
      </Card>
    </>
  );
};
export default CreateOrganization;
