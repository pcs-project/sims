import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";

import Logo1 from "../../scafolding/assets/images/govLogo.png";
import Stamp from "../../scafolding/assets/images/stamp.png";
import Photo from "../../scafolding/assets/images/photo.png";
import Signature from "../../scafolding/assets/images/signature.png";
import "./IDCard.css";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";
import AddressService from "../../security/api/services/AddressService";
import OrganizationService from "../../security/api/services/OrganizationService";
import { englishToNepaliNumber, nepaliToEnglishNumber } from "nepali-number";
import {
  DISABILITY_BY_NATURE_NEPALI,
  DISABILITY_BY_SEVERITY_NEPALI,
  GENDER_NEPALI,
  ID_CATEGORY_NEPALI,
} from "../../utilities/constants/ITMISConstansts";
function SeniorCitizenIDCard(props) {
  const idCardDetails = props.location.state.data;
  const { t } = useTranslation();
  const [fullAddressEng, setFullAddressEng] = useState();
  const [fullAddressNep, setFullAddressNep] = useState();
  const [organizationDetails, setOrganizationDetails] = useState({});
  const [fullAddressEngOrg, setFullAddressEngOrg] = useState();
  const [fullAddressNepOrg, setFullAddressNepOrg] = useState();

  const [printModal, setPrintModal] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const footer = (
    <div>
      <Button label={t("ho")} icon="pi pi-check" onClick={async () => {
        await setIsCopy(true);
        await printFunction();
      }} />
      <Button label={t("haina")} icon="pi pi-times" onClick={async () => {
        await setIsCopy(false);
        await printFunction();
      }} />
    </div>
  );

  const printFunction = () => {
    window.print()
  }

  const onHide = () => {
    setPrintModal(false);
  }

  const convertIdToNepali = (data) => {
    const idArray = data.split("_");
    const idNepali =
      englishToNepaliNumber(idArray[0]) +
      "_" +
      englishToNepaliNumber(idArray[1]) +
      "_" +
      englishToNepaliNumber(idArray[2]) +
      "_" +
      englishToNepaliNumber(idArray[3]);

    return idNepali;
  };
  useEffect(() => {
    console.log("props.location.state.data", props.location.state.data);
    idCardDetails.idCardNepaliNo = convertIdToNepali(idCardDetails.id);
    AddressService.getFullAddressEng(
      props.location.state.data.seniorCitizenAddressDetails.province,
      props.location.state.data.seniorCitizenAddressDetails.district,
      props.location.state.data.seniorCitizenAddressDetails.municipality,
      props.location.state.data.seniorCitizenAddressDetails.wardNo
    ).then((response) => {
      setFullAddressEng(response.data.data);
    });
    AddressService.getFullAddressNep(
      props.location.state.data.seniorCitizenAddressDetails.province,
      props.location.state.data.seniorCitizenAddressDetails.district,
      props.location.state.data.seniorCitizenAddressDetails.municipality,
      props.location.state.data.seniorCitizenAddressDetails.wardNo
    ).then((response) => {
      setFullAddressNep(response.data.data);
    });
    OrganizationService.getLoggedInUserOrganizaitonDetails().then((response) => {
      console.log(response.data.data);
      setOrganizationDetails(response.data.data);
      AddressService.getFullAddressEng(
        response.data.data.organizationAddress.province,
        response.data.data.organizationAddress.district,
        response.data.data.organizationAddress.municipality,
        0
      ).then((response) => {
        setFullAddressEngOrg(response.data.data);
      });
      AddressService.getFullAddressNep(
        response.data.data.organizationAddress.province,
        response.data.data.organizationAddress.district,
        response.data.data.organizationAddress.municipality,
        0
      ).then((response) => {
        setFullAddressNepOrg(response.data.data);
      });
    });
  }, [props]);
  return (
    <>
      <Card
        style={{ display: "flex", justifyContent: "center", margin: "16px", borderRadius: "8px" }}
      >
        <div className="section-to-print">
          <div className="page">
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <Image style={{ paddingRight: "7px" }} width={50} height={50} src={Logo1} />
                  </div>
                </div>
                <div style={{ width: "250px" }}>
                  <center>
                    <h4 style={{ color: "#d00000", paddingTop: "0px", fontSize: 10 }}>
                      <br /> {organizationDetails.nameNep} <br />{" "}
                      {organizationDetails.subDetailsNep} <br />
                      {fullAddressNepOrg}
                    </h4>
                  </center>
                  <div
                    style={{
                      flex: 1,
                      marginTop: "5px",
                      background: "#d00000",
                      color: "#FFF",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      fontSize: 13,
                    }}
                  >
                    ज्येष्ठ नागरिक परिचयपत्र
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <Image
                    style={{ paddingLeft: "15px", paddingTop: "10px" }}
                    width={60}
                    height={72}
                    src={
                      "data:image/jpg;base64," +
                      idCardDetails.seniorCitizenIdCardPhotoInformation.fileData
                    }
                  />
                </div>
              </div>
              <div>
                <div style={{ width: "100%", float: "left", fontSize: 10, paddingLeft: 2 }}>
                  <div style={{ float: "left", width: "20%" }}>आईडी कार्ड नं.</div>
                  <div style={{ float: "left", width: "65%" }}>
                    : {idCardDetails.idCardNepaliNo}
                  </div>
                  {isCopy ?
                    <div style={{ width: "15%", float: "right" }}>
                      <strong>प्रतिलिपि</strong>
                    </div>
                    :
                    <></>
                  }
                  <div style={{ float: "left", width: "20%" }}>व्यक्तिको पूरा नाम</div>
                  <div style={{ float: "left", width: "50%" }}>
                    : {idCardDetails.firstNameNep +
                      " " +
                      (idCardDetails.middleNameNep ? idCardDetails.middleNameNep : "") +
                      " " +
                      idCardDetails.lastNameNep}
                  </div>
                  <div style={{ width: "30%", float: "right" }}>
                    लिङ्ग : {GENDER_NEPALI[idCardDetails.gender]}
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", float: "left", fontSize: 10, paddingLeft: 2 }}>
                <div style={{ width: "70%", float: "left" }}>
                  नागरिकता नं : {englishToNepaliNumber(idCardDetails.citizenshipNo)}{" "}
                </div>
                <div style={{ width: "30%", float: "right" }}>
                  रक्त समूह : {idCardDetails.bloodGroup}{" "}
                </div>
                <div style={{ width: "70%", float: "left" }}>
                  रोग: {idCardDetails.disease ? "छ" : "छैन"}{" "}
                </div>
                <div style={{ width: "30%", float: "right" }}>
                  उमेर : {englishToNepaliNumber(idCardDetails.age)}
                </div>
                ठेगाना : {fullAddressNep} <br />
                पति/पत्नीको नाम: {idCardDetails.fatherMotherGaurdianNameEng}
                {idCardDetails.husbandWifefNameNep +
                  " " +
                  (idCardDetails.husbandWifemNameNep ? idCardDetails.husbandWifemNameNep : "") +
                  " " +
                  idCardDetails.husbandWifelNameNep}
                <br />
                {/* उपलब्ध सहुलियत र सुविधा : {idCardDetails.availableConcession} */}
                {/* <br /> */}
                हेरचाह गर्ने घर / ज्येष्ठ नागरिक घर जानकारी ::{" "}
                {idCardDetails.careTakerSenCitHomeNep}
                <br />
              </div>
              <div style={{ width: "100%", fontSize: 10, paddingLeft: 2 }}>
                <div style={{ width: "50%", float: "left" }}>
                  {/* <strong style={{ fontSize: 11 }}>अक्षमता को प्रकार</strong> <br />
                  प्रकृतिको आधारमा :{" "}
                  {DISABILITY_BY_NATURE_NEPALI[idCardDetails.typeOfDisabilityByNature]} <br />
                  गम्भीरताको आधारमा :{" "}
                  {DISABILITY_BY_SEVERITY_NEPALI[idCardDetails.typeOfDisabilityBySeverity]} <br /> */}
                  <div style={{ paddingTop: 50 }}>............................</div>
                  परिचयपत्र बाहकको हस्ताक्षर
                </div>
                <div
                  style={{
                    width: "50%",
                    float: "right",
                    textAlign: "right",
                    paddingRight: 10,
                  }}
                >
                  <strong style={{ fontSize: 11 }}>स्वीकृत गर्ने </strong> <br />
                  <div style={{ paddingTop: 10 }}>.......................... </div>
                  हस्ताक्षर <br />
                  {idCardDetails.seniorCitizenApprovedDetails.nameNep} <br />
                  {idCardDetails.seniorCitizenApprovedDetails.designationNep}
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: "50px" }}></div>

          <div className="page" style={{ paddingTop: "0px" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                  <div>
                    {" "}
                    <Image width={50} height={50} src={Logo1} />{" "}
                  </div>
                </div>
                <div style={{ flex: 4 }}>
                  {/* <center>
                    <h4 style={{ color: "#d00000", paddingTop: "0px", fontSize: 11 }}>
                      <br /> {organizationDetails.name} <br /> {organizationDetails.subDetailsEng}
                      <br />
                      {fullAddressEngOrg}
                    </h4>
                  </center> */}
                  <center>
                    <h4 style={{ color: "#d00000", paddingTop: "0px", fontSize: 10 }}>
                      <br /> {organizationDetails.name} <br /> {organizationDetails.subDetailsEng}{" "}
                      <br />
                      {fullAddressEngOrg}
                    </h4>
                  </center>
                  <div
                    style={{
                      flex: 1,
                      background: "#d00000",
                      color: "#FFF",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      fontSize: 13,
                    }}
                  >
                    Senior Citizen ID Card
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    paddingLeft: "15px",
                    paddingTop: "10px",
                    width: "48px",
                    height: "90px",
                  }}
                >
                  <Image
                    style={{}}
                    width={60}
                    height={72}
                    src={
                      "data:image/jpg;base64," +
                      idCardDetails.seniorCitizenIdCardPhotoInformation.fileData
                    }
                  />
                </div>
              </div>
              <div style={{ width: "100%", float: "left", fontSize: 10, paddingLeft: 2 }}>
                <div style={{ width: "80%", float: "left", fontSize: 10, paddingLeft: 2 }}>
                  <div style={{ width: "70%", float: "left" }}>
                    ID Card No. : {idCardDetails.id}
                  </div>
                  <div style={{ width: "30%", float: "right" }}>
                    {/* ID Card Type : {idCardDetails.idCardType}{" "} */}
                  </div>
                  <div style={{ width: "70%", float: "left" }}>
                    Full Name :{" "}
                    {idCardDetails.firstNameEng +
                      " " +
                      (idCardDetails.middleNameEng ? idCardDetails.middleNameEng : "") +
                      " " +
                      idCardDetails.lastNameEng}{" "}
                  </div>
                  <div style={{ width: "25%", float: "right" }}>
                    Gender: {idCardDetails.gender}{" "}
                  </div>
                  <div style={{ width: "75%", float: "left" }}>
                    Citizenship No. : {idCardDetails.citizenshipNo}{" "}
                  </div>
                  <div style={{ width: "25%", float: "right" }}>
                    Blood Group: {idCardDetails.bloodGroup}{" "}
                  </div>
                  <div style={{ width: "75%", float: "left" }}>
                    Disease : {idCardDetails.disease}{" "}
                  </div>
                  <div style={{ width: "25%", float: "right" }}>Age : {idCardDetails.age} </div>
                </div>
              </div>
              <div style={{ width: "100%", float: "left", fontSize: 10, paddingLeft: 2 }}>
                Address: {fullAddressEng} <br />
                Husband/Wife Name: {idCardDetails.fatherMotherGaurdianNameEng}
                {idCardDetails.husbandWifefNameEng +
                  " " +
                  (idCardDetails.husbandWifemNameEng ? idCardDetails.husbandWifemNameEng : "") +
                  " " +
                  idCardDetails.husbandWifelNameEng}
                <br />
                {/* Available Concession and facilities:
                {idCardDetails.availableConcession.toString()} */}
                {/* <br /> */}
                Care taker home/Senior Citizen home information :
                {idCardDetails.careTakerSenCitHomeEng}
              </div>
            </div>

            <div style={{ width: "100%", fontSize: 10, paddingLeft: 2 }}>
              <div style={{ width: "50%", float: "left" }}>
                {/* <strong style={{ fontSize: 11 }}>Types of Disability</strong> <br />
                On the basis of Nature: {idCardDetails.typeOfDisabilityByNature} <br />
                On the basis of Severity: {idCardDetails.typeOfDisabilityBySeverity} <br /> */}
                <div style={{ paddingTop: 45 }}>............................</div>
                Signature of ID card holder
              </div>
              <div
                style={{
                  width: "50%",
                  float: "right",
                  textAlign: "right",
                  paddingRight: 10,
                }}
              >
                <strong style={{ fontSize: 11 }}>Approved By</strong> <br />
                <div style={{ paddingTop: 10 }}>.......................... </div>
                Signature <br />
                {idCardDetails.seniorCitizenApprovedDetails.nameEng} <br />
                {idCardDetails.seniorCitizenApprovedDetails.designationEng}
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div style={{ alignContent: "center" }}>
        <Button
          style={{ padding: "10px", margin: "10px" }}
          label="Print"
          className="p-button-raised p-button-rounded "
          onClick={() => setPrintModal(true)}
        />

        <Dialog header={t("isIdCardACopy")}
          footer={footer}
          visible={printModal}
          style={{ width: '50vw' }}
          onHide={() => onHide()}>
        </Dialog>
      </div>
    </>
  );
}

export default SeniorCitizenIDCard;
