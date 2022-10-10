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

import QRCode from "qrcode.react";

function SmartSeniorCitizenIDCard(props) {
  const idCardDetails = props.location.state.data;
  const { t } = useTranslation();
  const [fullAddressEng, setFullAddressEng] = useState();
  const [fullAddressNep, setFullAddressNep] = useState();
  const [organizationDetails, setOrganizationDetails] = useState({});
  const [fullAddressEngOrg, setFullAddressEngOrg] = useState();
  const [fullAddressNepOrg, setFullAddressNepOrg] = useState();
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
      setQrCodeDetailsEng({
        name:
          idCardDetails.firstNameEng +
          " " +
          (idCardDetails.middleNameEng ? idCardDetails.middleNameEng : "") +
          " " +
          idCardDetails.lastNameEng,
        address: fullAddressEng
        // citizenshipNo: idCardDetails.citizenshipNo
      });
      setQrCodeDetailsNep({
        name:
          idCardDetails.firstNameNep +
          " " +
          (idCardDetails.middleNameNep ? idCardDetails.middleNameNep : "") +
          " " +
          idCardDetails.lastNameNep,
        address: fullAddressNep
        //   citizenshipNo: idCardDetails.citizenshipNo != null ? englishToNepaliNumber(idCardDetails.citizenshipNo) : ""
      });
    });
  }, [props]);
  return (
    <>
      <Card
        style={{ display: "flex", justifyContent: "center", margin: "16px", borderRadius: "8px" }}
      >
        <div className="section-to-print">

          <div
            className="page"
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
                    ज्येष्ठ नागरिक परिचयपत्र
                  </div>
                </div>

                <div style={{ marginTop: "5px", alignItems: "right" }}>
                  <div>
                    <Image
                      width={30}
                      height={30}
                      src={
                        "data:image/jpg;base64," +
                        idCardDetails.seniorCitizenIdCardPhotoInformation.fileData
                      }
                    />
                  </div>
                </div>
              </div>

              <div style={{ padding: 0, fontSize: 9 }}>
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
                  <div style={{ float: "left", width: "25%" }}>व्यक्तिको पूरा नाम</div>
                  <div style={{ float: "left", width: "50%" }}>
                    : {idCardDetails.firstNameNep +
                      " " +
                      (idCardDetails.middleNameNep ? idCardDetails.middleNameNep : "") +
                      " " +
                      idCardDetails.lastNameNep}
                  </div>
                  <div style={{ float: "left", width: "10%" }}>लिङ्ग</div>
                  <div style={{ float: "left", width: "15%" }}>: {GENDER_NEPALI[idCardDetails.gender]}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "25%" }}>नागरिकता नं.</div>
                  <div style={{ float: "left", width: "45%" }}>: {idCardDetails.citizenshipNo != null ? englishToNepaliNumber(idCardDetails.citizenshipNo) : ""}</div>
                  <div style={{ float: "left", width: "15%" }}>रक्त समूह</div>
                  <div style={{ float: "left", width: "15%" }}>: {idCardDetails.bloodGroup}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "25%" }}>रोग</div>
                  <div style={{ float: "left", width: "50%" }}>: {idCardDetails.disease ? "छ" : "छैन"}</div>
                  <div style={{ float: "left", width: "10%" }}>उमेर</div>
                  <div style={{ float: "left", width: "15%" }}>: {englishToNepaliNumber(idCardDetails.age)}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "15%" }}>ठेगाना</div>
                  <div style={{ float: "left", width: "75%" }}>: {fullAddressNep}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "40%" }}>पति/पत्नीको नाम</div>
                  <div style={{ float: "left", width: "60%" }}>: {idCardDetails.fatherMotherGaurdianNameEng}
                    {idCardDetails.husbandWifefNameNep +
                      " " +
                      (idCardDetails.husbandWifemNameNep ? idCardDetails.husbandWifemNameNep : "") +
                      " " +
                      idCardDetails.husbandWifelNameNep}
                  </div>
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
                      paddingTop: 35,
                    }}
                  >
                    <div style={{ flex: 1 }}>हस्ताक्षर : ...............................</div>
                  </div>
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <QRCode
                    style={{ fontWeight: "bold" }}
                    size={60}
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
                    <div style={{ flex: 4 }}>{idCardDetails.seniorCitizenApprovedDetails.nameNep}</div>
                    <div style={{ flex: 4 }}>
                      {idCardDetails.seniorCitizenApprovedDetails.designationNep}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: "50px" }}></div>

          <div
            className="page"
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
                    <center> {organizationDetails.name}</center>
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
                    Senior Citizen ID Card
                  </div>
                </div>

                <div style={{ marginTop: "5px", alignItems: "right" }}>
                  <div>
                    <Image
                      width={30}
                      height={30}
                      src={
                        "data:image/jpg;base64," +
                        idCardDetails.seniorCitizenIdCardPhotoInformation.fileData
                      }
                    />
                  </div>
                </div>
              </div>

              <div style={{ padding: 0, fontSize: 9 }}>
                <div>
                  <div style={{ float: "left", width: "20%" }}>ID Card No.</div>
                  <div style={{ float: "left", width: "80%" }}>: {idCardDetails.id}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "20%" }}>Full Name</div>
                  <div style={{ float: "left", width: "50%" }}>
                    : {idCardDetails.firstNameEng +
                      " " +
                      (idCardDetails.middleNameEng ? idCardDetails.middleNameEng : "") +
                      " " +
                      idCardDetails.lastNameEng}
                  </div>
                  <div style={{ float: "left", width: "15%" }}>Gender</div>
                  <div style={{ float: "left", width: "15%" }}>: {idCardDetails.gender}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "25%" }}>CitizenShip No.</div>
                  <div style={{ float: "left", width: "40%" }}>: {idCardDetails.citizenshipNo}</div>
                  <div style={{ float: "left", width: "20%" }}>BloodGroup</div>
                  <div style={{ float: "left", width: "15%" }}>: {idCardDetails.bloodGroup}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "25%" }}>Disease</div>
                  <div style={{ float: "left", width: "45%" }}>: {idCardDetails.disease}</div>
                  <div style={{ float: "left", width: "15%" }}>Age</div>
                  <div style={{ float: "left", width: "15%" }}>: {idCardDetails.age}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "15%" }}>Address</div>
                  <div style={{ float: "left", width: "75%" }}>: {fullAddressEng}</div>
                </div>
                <div>
                  <div style={{ float: "left", width: "40%" }}>Husband/Wife Name</div>
                  <div style={{ float: "left", width: "60%" }}>: {idCardDetails.fatherMotherGaurdianNameEng}
                    {idCardDetails.husbandWifefNameEng +
                      " " +
                      (idCardDetails.husbandWifemNameEng ? idCardDetails.husbandWifemNameEng : "") +
                      " " +
                      idCardDetails.husbandWifelNameEng}</div>
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
                    <div style={{ flex: 1 }}>Signature : ...............................</div>
                  </div>
                </div>
                <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <QRCode
                    style={{ fontWeight: "bold" }}
                    size={50}
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
                    <div style={{ flex: 4 }}>{idCardDetails.seniorCitizenApprovedDetails.nameEng}</div>
                    <div style={{ flex: 4 }}>
                      {idCardDetails.seniorCitizenApprovedDetails.designationEng}
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

export default SmartSeniorCitizenIDCard;
