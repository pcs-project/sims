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
//import QRCode from "react-qr-code";
import QRCode from "qrcode.react";

function SmartDisabilityIdCard(props) {
  const { t } = useTranslation();
  const idCardDetails = props.location.state.data;
  const [fullAddressEng, setFullAddressEng] = useState();
  const [fullAddressNep, setFullAddressNep] = useState();
  const [dob, setDob] = useState();
  const [organizationDetails, setOrganizationDetails] = useState({});
  const [fullAddressEngOrg, setFullAddressEngOrg] = useState();
  const [fullAddressNepOrg, setFullAddressNepOrg] = useState();
  const [cardColor, setCardColor] = useState();
  const [qrCodeDetailsEng, setQrCodeDetailsEng] = useState();
  const [qrCodeDetailsNep, setQrCodeDetailsNep] = useState();

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
      ID_CATEGORY_NEPALI[idArray[3]] +
      "_" +
      englishToNepaliNumber(idArray[4]);
    return idNepali;
  };

  const convertDOBNepToNepali = (data) => {
    const dobNepArray = data.split("-");
    const dobNep =
      englishToNepaliNumber(dobNepArray[0]) +
      "-" +
      englishToNepaliNumber(dobNepArray[1]) +
      "-" +
      englishToNepaliNumber(dobNepArray[2]);
    return dobNep;
  };
  useEffect(() => {
    const idCardDetails = props.location.state.data;
    console.log("====", idCardDetails);
    idCardDetails.idCardNepaliNo = convertIdToNepali(idCardDetails.id);
    AddressService.getFullAddressEng(
      props.location.state.data.disabledAddressDetails.province,
      props.location.state.data.disabledAddressDetails.district,
      props.location.state.data.disabledAddressDetails.municipality,
      props.location.state.data.disabledAddressDetails.wardNo
    ).then((response) => {
      setFullAddressEng(response.data.data);
    });
    AddressService.getFullAddressNep(
      props.location.state.data.disabledAddressDetails.province,
      props.location.state.data.disabledAddressDetails.district,
      props.location.state.data.disabledAddressDetails.municipality,
      props.location.state.data.disabledAddressDetails.wardNo
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
      setQrCodeDetailsEng({
        name:
          idCardDetails.firstNameEng +
          " " +
          (idCardDetails.middleNameEng ? idCardDetails.middleNameEng : "") +
          " " +
          idCardDetails.lastNameEng,
        address: fullAddressEng,
        //    citizenshipNo: idCardDetails.citizenshipNo,
        DOB: idCardDetails.dobEng
      });
      setQrCodeDetailsNep({
        name:
          idCardDetails.firstNameNep +
          " " +
          (idCardDetails.middleNameNep ? idCardDetails.middleNameNep : "") +
          " " +
          idCardDetails.lastNameNep,
        address: fullAddressNep,
        //  citizenshipNo: idCardDetails.citizenshipNo != null ? englishToNepaliNumber(idCardDetails.citizenshipNo) : "",
        DOB: convertDOBNepToNepali(idCardDetails.dobEng)
      });
    });

    switch (props.location.state.data.idCardType) {
      case "ka":
        setCardColor("#f4a0a0");
        break;
      case "kha":
        setCardColor("#8a8ae4");
        break;
      case "ga":
        setCardColor("#f3f36f");
        break;
      case "gha":
        setCardColor("White");
        break;
      default:
        setCardColor("rgb(255, 255, 255)");
    }

    let dobValue = props.location.state.data.dobEng;
    let dobArr = dobValue.split("T");
    setDob(dobArr[0]);
  }, [props]);

  return (
    <>
      <Card
        style={{ display: "flex", justifyContent: "center", margin: "16px", borderRadius: "8px" }}
      >
        <div className="section-to-print-smart">
          <div
            className="smart-page"
            style={{
              background: "cardColor",
              margin: "0px auto",
              width: "75.5mm",
              height: "47.5mm",
              paddingTop: "0px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ alignItems: "center", marginTop: "5px" }}>
                  <div>
                    <Image width={30} height={30} src={Logo1} />
                  </div>
                </div>
                <div style={{ flex: 3, flexDirection: "column", paddingRight: 10 }}>
                  <div
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      fontSize: 9,
                      color: "#d00000",
                    }}
                  >
                    <center> {organizationDetails.nameNep}</center>
                  </div>
                  <div
                    style={{
                      flex: 4,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      fontSize: 9,
                      color: "#d00000",
                    }}
                  >
                    <center>
                      {organizationDetails.subDetailsNep}
                      <br />
                      {fullAddressNepOrg}
                    </center>
                  </div>
                  <div
                    style={{
                      height: 11,
                      flex: 1,
                      background: "#d00000",
                      color: "#FFF",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      fontSize: 9,
                    }}
                  >
                    अपाङ्गता परिचय पत्र
                  </div>
                </div>

                <div style={{ marginTop: "5px", alignItems: "right" }}>
                  <div>
                    <Image
                      width={30}
                      height={30}
                      src={
                        "data:image/jpg;base64," +
                        idCardDetails.disabledIdCardPhotoInformation.fileData
                      }
                    />
                  </div>
                </div>
              </div>

              <div style={{ paddingTop: 0, fontSize: 9 }}>
                <div>
                  <div style={{ float: "left", width: "25%" }}>आईडी कार्ड नं.</div>
                  <div style={{ float: "left", width: "60%" }}>
                    : {idCardDetails.idCardNepaliNo}
                  </div>
                  {isCopy ?
                    <div style={{ width: "15%", float: "right" }}>
                      <strong>प्रतिलिपि</strong>
                    </div>
                    :
                    <></>
                  }
                </div>
                <div>
                  <div style={{ float: "left", width: "25%" }}> व्यक्तिको पूरा नाम </div>
                  <div style={{ float: "right", width: "75%" }}>
                    : {idCardDetails.firstNameNep +
                      " " +
                      (idCardDetails.middleNameNep ? idCardDetails.middleNameNep : "") +
                      " " +
                      idCardDetails.lastNameNep}
                  </div>
                </div>

                <div>
                  <div style={{ float: "left", width: "25%" }}>नागरिकता नं.</div>
                  <div style={{ float: "left", width: "45%" }}>: {idCardDetails.citizenshipNo != null ? englishToNepaliNumber(idCardDetails.citizenshipNo) : ""}</div>
                  <div style={{ float: "left", width: "15%" }}>लिङ्ग</div>
                  <div style={{ float: "left", width: "15%" }}>: {GENDER_NEPALI[idCardDetails.gender]}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "25%" }}>जन्म मिति</div>
                  <div style={{ float: "left", width: "40%" }}>: {convertDOBNepToNepali(idCardDetails.dobNep)}</div>
                  <div style={{ float: "left", width: "20%" }}>रक्त समूह</div>
                  <div style={{ float: "left", width: "15%" }}>: {idCardDetails.bloodGroup}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "15%" }}>ठेगाना</div>
                  <div style={{ float: "left", width: "75%" }}>: {fullAddressNep}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "45%" }}>बुबा/आमा/अभिभावकको नाम</div>
                  <div style={{ float: "left", width: "55%" }}>: {idCardDetails.fatherMotherGaurdianNameNep}</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingRight: 2 }}>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      fontSize: 9,
                      paddingTop: 25,
                    }}
                  >
                    <div style={{ flex: 1 }}>हस्ताक्षर : ...............................</div>
                  </div>
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <QRCode
                    style={{ fontWeight: "bold" }}
                    size={55}
                    value={JSON.stringify(qrCodeDetailsNep)}
                  />
                </div>
                <div
                  style={{
                    flex: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      fontSize: 9,
                    }}
                  >
                    <div style={{ flex: 4 }}>
                      <strong>स्वीकृत गर्ने</strong>
                    </div>
                    <div style={{ flex: 4, paddingTop: 0 }}>..........................</div>
                    <div style={{ flex: 4 }}>{idCardDetails.disabledApprovedDetails.nameNep}</div>
                    <div style={{ flex: 4 }}>
                      {idCardDetails.disabledApprovedDetails.designationNep}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: "50px" }}></div>

          <div
            className="smart-page"
            style={{
              background: "cardColor",
              margin: "0px auto",
              width: "75.5mm",
              height: "47.5mm",
              paddingTop: "0px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ alignItems: "center", marginTop: "5px" }}>
                  <div>
                    {" "}
                    <Image width={30} height={30} src={Logo1} style={{}} />
                  </div>
                </div>
                <div style={{ flex: 3, flexDirection: "column", paddingRight: 10 }}>
                  <div
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      fontSize: 9,
                      color: "#d00000",
                    }}
                  >
                    <center>{organizationDetails.name}</center>
                  </div>
                  <div
                    style={{
                      flex: 4,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      fontSize: 9,
                      color: "#d00000",
                    }}
                  >
                    <center>
                      {organizationDetails.subDetailsEng}
                      <br />
                      {fullAddressEngOrg}
                    </center>
                  </div>
                  <div
                    style={{
                      height: 11,
                      flex: 1,
                      background: "#d00000",
                      color: "#FFF",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                      fontSize: 9,
                    }}
                  >
                    Disability ID Card
                  </div>
                </div>

                <div style={{ marginTop: "5px", alignItems: "right" }}>
                  <div style={{ background: "white" }}>
                    <Image
                      width={30}
                      height={30}
                      src={
                        "data:image/jpg;base64," +
                        idCardDetails.disabledIdCardPhotoInformation.fileData
                      }
                    />
                  </div>
                </div>
              </div>

              <div style={{ paddingTop: 0, fontSize: 9 }}>
                <div>
                  <div style={{ float: "left", width: "20%" }}>ID Card No.</div>
                  <div style={{ float: "right", width: "80%" }}>: {idCardDetails.id}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "20%" }}>Full Name</div>
                  <div style={{ float: "left", width: "80%" }}>
                    : {idCardDetails.firstNameEng +
                      " " +
                      (idCardDetails.middleNameEng ? idCardDetails.middleNameEng : "") +
                      " " +
                      idCardDetails.lastNameEng}
                  </div>
                </div>
                <div>
                  <div style={{ float: "left", width: "25%" }}>CitizenShip No.</div>
                  <div style={{ float: "left", width: "45%" }}>: {idCardDetails.citizenshipNo}</div>
                  <div style={{ float: "left", width: "15%" }}>Gender</div>
                  <div style={{ float: "left", width: "15%" }}>: {idCardDetails.gender}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "25%" }}>DOB</div>
                  <div style={{ float: "left", width: "40%" }}>: {idCardDetails.dobEng}</div>
                  <div style={{ float: "left", width: "20%" }}>BloodGroup</div>
                  <div style={{ float: "left", width: "15%" }}>: {idCardDetails.bloodGroup}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "15%" }}>Address</div>
                  <div style={{ float: "left", width: "75%" }}>: {fullAddressEng}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "45%" }}>Father/Mother/Guardian name</div>
                  <div style={{ float: "left", width: "55%" }}>: {idCardDetails.fatherMotherGaurdianNameEng}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", paddingRight: 2 }}>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      fontSize: 9,
                      paddingTop: 23,
                    }}
                  >
                    <div style={{ flex: 1 }}>Signature : ...............................</div>
                  </div>
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <QRCode
                    style={{ fontWeight: "bold" }}
                    size={42}
                    value={JSON.stringify(qrCodeDetailsEng)}
                  />
                </div>
                <div
                  style={{
                    flex: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      fontSize: 9,
                    }}
                  >
                    <div style={{ flex: 4 }}>
                      <strong>Approved By</strong>
                    </div>
                    <div style={{ flex: 4, paddingTop: 0 }}>..........................</div>
                    <div style={{ flex: 4 }}>{idCardDetails.disabledApprovedDetails.nameEng}</div>
                    <div style={{ flex: 4 }}>
                      {idCardDetails.disabledApprovedDetails.designationEng}
                    </div>
                  </div>
                </div>
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

export default SmartDisabilityIdCard;
