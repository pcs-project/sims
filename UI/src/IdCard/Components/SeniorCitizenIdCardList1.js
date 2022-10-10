import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import React, { useEffect, useState, useRef } from "react";
import { Card } from "primereact/card";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { ACTION, ID_CARD_SIZE, LANGUAGE } from "../../utilities/constants/ITMISConstansts";
import DisabledIdCardService from "../api/services/DisabledIdCardService";
import { Toast } from "primereact/toast";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import AddressService from "../../security/api/services/AddressService";
import { Button } from "primereact/button";
import SeniorCitizenIdCardService from "../api/services/SeniorCitizenIdCardService";
import { trackPromise } from "react-promise-tracker";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import i18n from "../../il8n/il8n";
const SeniorCitizenIdCardList = () => {
  const { t } = useTranslation();
  const [seniorCitizenIdCardList, setSeniorCitizenIdCardList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [cardTypeModal, setCardTypeModal] = useState(false);
  const [cardSize, setCardSize] = useState();
  const [idCardNo, setIdCardNo] = useState();
  const history = useHistory();
  const toast = useRef(null);
  const options = {
    filter: true,
    filterType: "dropdown",
    responsive: "vertical",
    tableBodyHeight: "600px",
    tableBodyMaxHeight: "",
    fixedSelectColumn: false,
    selectableRows: false,
  };
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues,
  } = useForm({
    mode: "all",
  });
  const columns = [
    {
      name: "fullName",
      label: t("name"),
      options: {
        // customBodyRender: (value, tableMeta, updateValue) => {
        //   console.log(tableMeta.rowData[0] + tableMeta.rowData[1] + tableMeta.rowData[2]);
        //   return (
        //     tableMeta.rowData[0] +
        //     " " +
        //     (tableMeta.rowData[1] ? tableMeta.rowData[1] : "") +
        //     " " +
        //     tableMeta.rowData[2]
        //   );
        // },
      },
    },
    // {
    //   name: "middleNameEng",
    //   label: "Name",
    //   options: {
    //     display: false,
    //     filter: false,
    //     sort: false,
    //   },
    // },
    // {
    //   name: "lastNameEng",
    //   label: "Name",
    //   options: {
    //     display: false,
    //     filter: false,
    //     sort: false,
    //   },
    // },
    {
      name: "gender",
      label: t("gender"),
      options: {},
    },
    {
      name: "citizenshipNo",
      label: t("citizenshipNo"),
      options: {},
    },
    {
      name: "bloodGroup",
      label: t("bloodGroup"),
      options: {},
    },
    {
      name: "age",
      label: t("age"),
      options: {},
    },
    {
      name: "id",
      label: t("actions"),
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <React.Fragment>
              <i
                className="pi pi-pencil tooltip-icon p-mr-2 "
                data-pr-tooltip="Update Details"
                data-pr-position="right"
                data-pr-at="right+5 top"
                data-pr-my="left center-2"
                onClick={() =>
                  history.push({
                    pathname: "/sims/senior-citizen-IDCard-form",
                    state: {
                      id: value,
                      action: ACTION.UPDATE,
                    },
                  })
                }
              />

              <i
                className="pi pi-eye tooltip-icon "
                data-pr-tooltip="View Details"
                data-pr-position="right"
                data-pr-at="right+5 top"
                data-pr-my="left center-2"
                onClick={() => {
                  // SeniorCitizenIdCardService.getSeniorCitizenIdCardDetailsById(value).then(
                  //   (response) => {
                  //     if (response.status === 200) {
                  //       history.push({
                  //         pathname: "/sims/senior-citizen-IDCard",
                  //         state: {
                  //           data: response.data.data,
                  //         },
                  //       });
                  //     } else {
                  //       toast.current.show({
                  //         severity: "error",
                  //         summary: "Error Message",
                  //         detail: "Update UnSuccessful",
                  //         life: 3000,
                  //       });
                  //     }
                  //   }
                  // );
                  setCardTypeModal(true);
                  setIdCardNo(value);
                }}
              />
            </React.Fragment>
          );
        },
      },
    },
  ];
  useEffect(() => {
    trackPromise(
      SeniorCitizenIdCardService.getAllSeniorCitizenIdCardList().then((response) => {
        console.log("response.data.data", response.data.data);
        setSeniorCitizenIdCardList(response.data.data);
      })
    );

    AddressService.getAllDistrict().then((response) => {
      console.log("response.data.data", response.data.data);
      setDistrictList(response.data.data);
    });
  }, []);

  const onSubmit = (data) => {
    console.log("data", data);
    trackPromise(
      DisabledIdCardService.searchDisabledIdCardDetails(data.name, data.district, data.diust).then(
        (response) => {
          if (response.status === 200) {
            setSeniorCitizenIdCardList(response.data.data);
          } else {
            toast.current.show({
              severity: "error",
              summary: "Error Message",
              detail: "Update UnSuccessful",
              life: 3000,
            });
          }
        }
      )
    );
  };
  const onHide = () => {
    setCardTypeModal(false);
  };
  const idCardPage = () => {
    trackPromise(
      SeniorCitizenIdCardService.getSeniorCitizenIdCardDetailsById(idCardNo).then((response) => {
        if (response.status === 200) {
          cardSize == ID_CARD_SIZE.NORMAL
            ? history.push({
                pathname: "/sims/senior-citizen-IDCard",
                state: {
                  data: response.data.data,
                },
              })
            : history.push({
                pathname: "/sims/senior-citizen-IDCard-smart",
                state: {
                  data: response.data.data,
                },
              });
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error Message",
            detail: "Update UnSuccessful",
            life: 3000,
          });
        }
      })
    );
  };
  return (
    <>
      <Toast ref={toast} />
      <Card className="p-mb-1" style={{ borderRadius: "8px 8px 0px 0px", background: "#f7f7f8" }}>
        <div className=" p-card-content">
          <h4 className="p-pt-0"> {t("Senior Citizen ID Card List")}</h4>
        </div>
      </Card>
      <Card className="p-mt-0">
        <form className="p-grid p-fluid p-mt-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="p-grid p-col-12 p-md-12 ">
            <div className="p-col-4 p-md-4">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("name")}:</div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="name"
                  control={control}
                  // rules={{ required: "Disability By Nature is required." }}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                  )}
                />
              </div>
            </div>
            <div className="p-col-4 p-md-4">
              <div className="p-field p-col-12 p-md-12 float-left main-label">{t("district")}:</div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="district"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Dropdown
                      id={field.name}
                      value={field.value}
                      placeholder={t("select")}
                      onChange={(e) => {
                        field.onChange(e.value);
                      }}
                      style={{ width: "100%" }}
                      options={districtList}
                      optionLabel={
                        i18n.language == LANGUAGE.ENGLISH ? "districtDescEng" : "districtDescNep"
                      }
                      optionValue="id"
                    />
                  )}
                />
              </div>
            </div>
            <div className="p-col-4 p-md-4">
              <div className="p-field p-col-12 p-md-12 float-left main-label">
                {t("citizenshipNo")}:
              </div>
              <div className="p-field p-col-12 p-md-12 float-left">
                <Controller
                  name="citizenshipNo"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputText id={field.name} {...field} className="rounded-input p-mb-1" />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="p-field p-col-12 p-md-12 float-left">
            <div class="p-field p-col-10 p-md-10 float-left">&nbsp;</div>
            <div class="p-field p-col-2 p-md-2 float-right">
              <Button
                style={{
                  background: "#4e70ae",
                  color: "#FFF",
                  justifyContent: "center",
                }}
                // onClick={() => idCardPage()}
              >
                Generate
              </Button>
            </div>
          </div>
        </form>
        <div className=" p-card-content">
          <ThemeProvider
            theme={createTheme({
              overrides: {
                MUIDataTableToolbar: { root: { display: "none" } },
              },
            })}
          >
            <MUIDataTable
              //   title={"Labour Migration List"}
              data={seniorCitizenIdCardList}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </div>
        <Dialog
          header="Card Type"
          visible={cardTypeModal}
          style={{ width: "15vw" }}
          modal
          onHide={onHide}
        >
          <div className="col-12 p-mb-2">
            <Checkbox
              inputId="cb1"
              value="Smart Card Size"
              onChange={(e) => {
                setCardSize(ID_CARD_SIZE.SMART);
              }}
              checked={cardSize == ID_CARD_SIZE.SMART}
            ></Checkbox>
            <label htmlFor="cb1" className="p-checkbox-label p-ml-2">
              Smart Card Size
            </label>
          </div>
          <div className="col-12 p-mb-2">
            <Checkbox
              inputId="cb2"
              value="Normal Size"
              onChange={(e) => {
                setCardSize(ID_CARD_SIZE.NORMAL);
              }}
              checked={cardSize == ID_CARD_SIZE.NORMAL}
            ></Checkbox>
            <label htmlFor="cb2" className="p-checkbox-label p-ml-2">
              Normal Size
            </label>
          </div>

          <Button
            style={{ background: "#4e70ae", color: "#FFF", justifyContent: "center" }}
            onClick={idCardPage}
          >
            Generate
          </Button>
        </Dialog>
      </Card>
    </>
  );
};
export default SeniorCitizenIdCardList;
