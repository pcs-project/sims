import React, { useEffect, useState } from "react";
import { Image } from "primereact/image";

import Logo1 from "../../scafolding/assets/images/govLogo.png";
import { useTranslation } from "react-i18next";
import AddressService from "../../security/api/services/AddressService";
import OrganizationService from "../../security/api/services/OrganizationService";
import i18n from "../../il8n/il8n";
import { LANGUAGE } from "../constants/ITMISConstansts";
import "../../reports/api/assets/css/Report.css";
const TemplateHeader = () => {
    const { t } = useTranslation();

    const [organizationDetails, setOrganizationDetails] = useState({});
    const [fullAddressEngOrg, setFullAddressEngOrg] = useState();
    const [fullAddressNepOrg, setFullAddressNepOrg] = useState();

    useEffect(() => {
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
    }, []);

    return (
        <>
            {/* <div className="p-grid" style={{ justifyContent: "center" }}>
                <div className="p-col-12 p-md-12">
                    <div className="p-col-10 p-md-10 p-mt-3 logotext" 
                    style={{textAlign:"center",
                    marginTop: '-27px',
                                position: 'relative'}}>
                                    <Image src={Logo1} className="float-left" height={60} width={60} />
                        {
                            i18n.language == LANGUAGE.ENGLISH ?
                                <h4 style={{ color: "#d00000", paddingTop: "0px", fontSize: 20  }}>
                                    
                                    {organizationDetails.name}
                                    <br />
                                    {organizationDetails.subDetailsEng}
                                    <br/>
                                    {fullAddressEngOrg}
                                </h4>
                                :
                                <h4 style={{ color: "#d00000", paddingTop: "0px", fontSize: 16 }}>
                                    
                                    {organizationDetails.nameNep}
                                    <br />
                                    {organizationDetails.subDetailsNep}
                                    <br/>
                                    {fullAddressNepOrg}
                                </h4>
                        }
                    </div>
                </div>
            </div> */}
            <div className="p-col-12 p-md-12" style={{ display: "flex", flexDirection: "row", height: '18vh', alignItems: 'center', justifyContent:"center"}}>
                <div style={{ padding:"5px" }}>
                    <Image src={Logo1} height={60} width={60} />
                </div>
                <div >
                    {
                        i18n.language == LANGUAGE.ENGLISH ?
                            <h4 style={{ color: "#d00000", paddingTop: "0px", fontSize: 20,textAlign: "center" }}>

                                {organizationDetails.name}
                                <br />
                                {organizationDetails.subDetailsEng}
                                <br />
                                {fullAddressEngOrg}
                            </h4>
                            :
                            <h4 style={{ color: "#d00000", paddingTop: "0px", fontSize: 16 }}>

                                {organizationDetails.nameNep}
                                <br />
                                {organizationDetails.subDetailsNep}
                                <br />
                                {fullAddressNepOrg}
                            </h4>
                    }
                </div>
            </div>
        </>
    );
}

export default TemplateHeader;
