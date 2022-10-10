import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import "./App.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Image } from "primereact/image";
import SIMS from "./scafolding/assets/images/sims.jpg";
import { InputSwitch } from "primereact/inputswitch";

import dashboard from "./scafolding/components/Dashboard";
import SideBar from "../src/scafolding/components/Sidebar";

import LandingPage1 from "./landingPage/Components/LandingPage.js";

import DisabilityIDCardForm from "./IdCardForm/Components/DisabilityIDCardForm.js";
import DisabilityIDCard from "./IdCard/Components/DisabilityIDCard.js";
import SeniorCitizenIDCard from "./IdCard/Components/SeniorCitizenIDCard.js";
import SeniorCitizenIDCardForm from "./IdCardForm/Components/SeniorCitizenIDCardForm.js";

import UserCreationForm from "./UserCreation/Components/UserCreationForm.js";

import CumulativeWomenGender from "./CumulativeWomenGender/Components/CumulativeWomenGender.js";
import ChildrenAdolescentModule from "./ChildrenAdolescentModule/Components/ChildrenAdolescentModule.js";
import DisabledModule from "./DisabledModule/Components/DisabledModule.js";
import SeniorCitizenModule from "./SeniorCitizenModule/Components/SeniorCitizenModule";

import ShelterHomeIndicator from "./HumanTrafficking/components/ShelterHomeIndicator";
import SewaKendraIndicator from "./HumanTrafficking/components/SewaKendraIndicator";
import ComplaintRegistration from "./HumanTrafficking/components/ComplaintRegistration";
import ChildHomeIndicator from "./ChildHome/Components/ChildHomeIndicator";
import JuvenileChildHomeIndicator from "./ChildCorrectionHome/components/JuvenileChildHomeIndicator";
import OldAgeHomeIndicator from "./OldAgeHome/components/OldAgeHomeIndicator";
import LabourMigrationIndicator from "./LabourMigration/Components/LabourMigrationIndicator";

import CreateRole from "./security/components/createRole";

import ChildHome from "./SocialService/components/ChildHome";
import ChildHomeList from "./SocialService/components/ChildHomeList";

import ShelterHome from "./SocialService/components/ShelterHome";
import ShelterHomeList from "./SocialService/components/ShelterHomeList";
import JuvenileChildHomeList from "./SocialService/components/JuvenileChildHomeList";
import OldAgeHome from "./SocialService/components/OldAgeHome";
import OldAgeHomeList from "./SocialService/components/OldAgeHomeList";

import LabourMigration from "./LabourMigration/Components/LabourMigration";

import DisabilityType from "./setup/components/DisabilityType";
import FiscalYearSetup from "./setup/components/FiscalYearSetup";

import SocialServiceRegistration from "./security/components/SocialServiceRegistration";
import RoleCreation from "./UserCreation/Components/RoleCreation";

import i18n from "../src/il8n/il8n";
import { I18nextProvider } from "react-i18next";
import LabourMigrationList from "./LabourMigration/Components/LabourMigrationList";
import JuvenialChildHome from "./SocialService/components/JuvenileChildHome";
import DisabilityIDCardList from "./IdCard/Components/DisabilityIDCardList";
import { usePromiseTracker } from "react-promise-tracker";
import SeniorCitizenIdCardList from "./IdCard/Components/SeniorCitizenIdCardList1";

import ChildrenProvinceWiseReport from "./reports/components/ChildrenProvinceWiseReport";
import ChildrenLocalLevelWiseReport from "./reports/components/ChildrenLocalLevelWiseReport";
import WomenProvinceWiseReport from "./reports/components/WomenProvinceWiseReport";
import WomenLocalLevelWiseReport from "./reports/components/WomenLocalLevelWiseReport";
import DisabledProvinceWiseReport from "./reports/components/DisabledProvinceWiseReport";
import DisabledLocalLevelWiseReport from "./reports/components/DisabledLocalLevelWiseReport";
import SeniorCitizenProvinceWiseReport from "./reports/components/SeniorCitizenProvinceReport";
import SeniorCitizenLocalLevelWiseReport from "./reports/components/SeniorCitizenLocalLevelReport";
import LabourMigrationProvinceWiseReport from "./reports/components/LabourMigrationProvinceReport";
import LabourMigrationLocalLevelWiseReport from "./reports/components/LabourMigrationLocalLevelReport";
import ShelterHomeProvinceWiseReport from "./reports/components/ShelterHomeProvinceWiseReport";
import ShelterHomeLocalLevelReport from "./reports/components/ShelterHomeLocalLevelReport";
import ComplaintRegistrationProvinceWiseReport from "./reports/components/ComplaintRegistrationProvinceWise";
import ComplaintRegistrationLocalLevelWiseReport from "./reports/components/ComplaintRegistrationLocalLevelWise";
import IdcardProvinceWiseReport from "./reports/components/IdcardProvinceWise";
import IdcardLocalLevelWiseReport from "./reports/components/IdcardLocalLevelWise";

import ConsolidatedReport from "./reports/components/ConsolidatedReport";

//Indicator Report
import WomenAndMinoritiesReport from "./reports/components/IndicatorReport/WomenAndMinorities";
import ChildrenReport from "./reports/components/IndicatorReport/ChildrenAndAdolescent";
import DisabledReport from "./reports/components/IndicatorReport/Disabled";
import SeniorCitizenReport from "./reports/components/IndicatorReport/SeniorCitizens";
import ChildHomeReport from "./reports/components/IndicatorReport/ChildHome";
import ChildCorrectionHomeReport from "./reports/components/IndicatorReport/ChildCorrectionHome";
import OldAgeHomeReport from "./reports/components/IndicatorReport/OldAgeHome";
import ShelterHomeReport from "./reports/components/IndicatorReport/ShelterHome";
import SewaKendraReport from "./reports/components/IndicatorReport/SewaKendra";
import LabourMigrationReport from "./reports/components/IndicatorReport/LabourMigration";
import ComplaintRegistrationReport from "./reports/components/IndicatorReport/ComplaintRegistration";

import ChangePassword from "./security/components/changePassword";
import ChangeUserPassword from "./security/components/ChangeUserPassword";
import RevertModule from "./RevertModule/components/RevertModule";
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       nepLanguage: i18n.language == "en" ? false : true,
//     };
//   }
//   render() {
//     return (
//       <>
//         <I18nextProvider i18n={i18n}>
//           <PrivateRouter>
//             <Switch>
//               <PrivateRoute exact path="/" component={LandingPage1} />
//               <PrivateRoute path="/sims/landingPage" component={LandingPage1} />
//               <div className="p-grid ">
//                 <div style={{ background: "#FFF", width: "100%", minHeight: "50px;" }}>
//                   <div className="p-col float-left">
//                     <Image src={Logo1} className="logo1" />
//                   </div>
//                   <div className="p-col-12 p-md-6 p-mt-4 float-left">
//                     <p style={{ textAlign: "right" }}>ITMIS</p>
//                   </div>
//                   <div className="p-col float-right" style={{ color: "#fff", textAlign: "right" }}>
//                     <p>
//                       <span className="en" style={{ color: "#000" }}>
//                         {" "}
//                         EN{" "}
//                       </span>
//                       <InputSwitch
//                         checked={this.state.nepLanguage}
//                         onChange={(e) => {
//                           this.setState({ nepLanguage: e.value });
//                           if (e.value) {
//                             i18n.changeLanguage("np");
//                           } else {
//                             i18n.changeLanguage("en");
//                           }
//                         }}
//                       />
//                       <span className="np" style={{ color: "#000", paddingLeft: "15px" }}>
//                         {" "}
//                         ने{" "}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//                 <div className="p-col-12 p-md-2 main-card">
//                   <SideBar />
//                 </div>

//                 <div
//                   id="kycForm"
//                   className="p-col-12 p-md-10"
//                   // style={{ marginLeft:' 200px'}}
//                 >
//                   <PrivateRoute path="/sims/SeniorCitizen" component={SeniorCitizen} />
//                   <PrivateRoute path="/sims/disability-IDCard-form" component={DisabilityIDCardForm} />
//                   <PrivateRoute path="/sims/disability-IDCard" component={DisabilityIDCard} />
//                   <PrivateRoute
//                     path="/sims/senior-citizen-IDCard-form"
//                     component={SeniorCitizenIDCardForm}
//                   />
//                   <PrivateRoute path="/sims/senior-citizen-IDCard" component={SeniorCitizenIDCard} />
//                   <PrivateRoute path="/sims/user" component={UserCreationForm} />
//                   <PrivateRoute path="/sims/role" component={RoleCreation} />
//                   <PrivateRoute path="/sims/senior-citizen" component={SeniorCitizenModule} />
//                   <PrivateRoute path="/sims/cumulative-women-gender" component={CumulativeWomenGender} />
//                   <PrivateRoute path="/sims/children-adolescent" component={ChildrenAdolescentModule} />
//                   <PrivateRoute path="/sims/disabled" component={DisabledModule} />
//                   <PrivateRoute path="/sims/child-home" component={ChildHome} />
//                   <PrivateRoute path="/sims/child-home-list" component={ChildHomeList} />

//                   <PrivateRoute path="/sims/shelter-home" component={ShelterHome} />
//                   <PrivateRoute path="/sims/shelter-home-list" component={ShelterHomeList} />
//                   <PrivateRoute path="/sims/juvenial-child-home" component={JuvenileChildHome} />
//                   <PrivateRoute path="/sims/juvenile-child-home-list" component={JuvenileChildHomeList} />
//                   <PrivateRoute path="/sims/old-age-home" component={OldAgeHome} />
//                   <PrivateRoute path="/sims/old-age-home-list" component={OldAgeHomeList} />
//                   <PrivateRoute path="/sims/shelter-home-indicator" component={ShelterHomeIndicator} />
//                   <PrivateRoute path="/sims/child-home-indicator" component={ChildHomeIndicator} />
//                   <PrivateRoute
//                     path="/sims/juvenial-child-home-indicator"
//                     component={JuvenileChildHomeIndicator}
//                   />
//                   <PrivateRoute path="/sims/old-age-home-indicator" component={OldAgeHomeIndicator} />
//                   <PrivateRoute path="/sims/complaint-registration" component={ComplaintRegistration} />
//                   <PrivateRoute
//                     path="/sims/labour-migration-indicator"
//                     component={LabourMigrationIndicator}
//                   />
//                   <PrivateRoute path="/sims/labour-migration" component={LabourMigration} />
//                   <PrivateRoute path="/sims/labour-migration-list" component={LabourMigrationList} />

//                   <PrivateRoute exact path="/sims/dashboard" component={dashboard} />

//                   <PrivateRoute path="/sims/disability-type-setup" component={DisabilityType} />
//                   <PrivateRoute path="/sims/setup" component={FiscalYearSetup} />

//                   <PrivateRoute path="/nta/role" component={CreateRole} />
//                   <PrivateRoute
//                     path="/sims/social-service-registration"
//                     component={SocialServiceRegistration}
//                   />
//                   {/* Security */}
//                   {/* <PrivateRoute path="/nta/organization" component={CreateOrganization} />
//                 <PrivateRoute path="/nta/user" component={CreateUser} />
//                 <PrivateRoute path="/sims/role" component={CreateRole} />
//                 <PrivateRoute path="/sims/change-password" component={ChangePassword} />
//                 <PrivateRoute path="/sims/assign-module" component={AssignModule} /> */}
//                 </div>
//               </div>
//             </Switch>
//           </PrivateRouter>
//         </I18nextProvider>
//       </>
//     );
//   }
// }

// export default App;
import LoadingOverlay from "react-loading-overlay";
import RingLoader from "react-spinners/RingLoader";

import Auth from "./Auth";
import Layout from "./Layout";
//import ChangePassword from "./security/components/changePassword";
import ForgotPassword from "./utilities/components/ForgotPassword";
import Organization from "./security/components/organization";
import SynchronizationModule from "./security/components/synchronizationModule";
import { t } from "i18next";
import SmartDisabilityIdCard from "./IdCard/Components/SmartDisabilityIdCard";
import SmartSeniorCitizenIDCard from "./IdCard/Components/SmartSeniorCitizenIdCard";

const App = () => {
  const { promiseInProgress } = usePromiseTracker();
  //  const [nepLanguage, setNepLanguage] = useState(i18n.language == "en" ? false : true);

  const [nepLanguage, setNepLanguage] = useState(i18n.language == "np" ? true : false);
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <LoadingOverlay active={promiseInProgress} spinner={<RingLoader />}>
          <Router>
            <Switch>
              <Route exact path="/" component={LandingPage1} />
              <Route path="/sims/landingPage" component={LandingPage1} />
              <Route path="/sims/change-user-password" component={ChangeUserPassword} />
              <Route path="/sims/forgot-password" component={ForgotPassword} />
              <div className="p-grid">
                <div style={{ background: "#FFF", width: "100%", minHeight: "50px;" }}>
                  <div className="p-mt-2 float-left">
                    <Image src={SIMS} className="logo1" height={70} width={70} />
                  </div>
                  <div className="p-col-12 p-md-6 p-mt-4 float-left">
                    <h3 class="office-name" style={{ color: "#134cb7" }}>
                      {t("sims")}
                    </h3>
                  </div>
                  <div
                    className="p-col float-right p-mt-2"
                    style={{ color: "#fff", textAlign: "right", marginRight: "14px" }}
                  >
                    <p>
                      <span className="en" style={{ color: "#000" }}>
                        {" "}
                        EN{" "}
                      </span>
                      <InputSwitch
                        checked={nepLanguage}
                        onChange={(e) => {
                          setNepLanguage(e.value);
                          if (e.value) {
                            i18n.changeLanguage("np");
                          } else {
                            i18n.changeLanguage("en");
                          }
                        }}
                      />
                      <span className="np" style={{ color: "#000", paddingLeft: "15px" }}>
                        {" "}
                        ने{" "}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="p-col-12 p-md-2 main-card">
                  <SideBar />
                </div>

                <div
                  id="kycForm"
                  className="p-col-12 p-md-10"
                // style={{ marginLeft:' 200px'}}
                >
                  <PrivateRoute
                    path="/sims/disability-IDCard-form"
                    component={DisabilityIDCardForm}
                  />
                  <PrivateRoute path="/sims/disability-IDCard" component={DisabilityIDCard} />
                  <PrivateRoute
                    path="/sims/senior-citizen-IDCard-form"
                    component={SeniorCitizenIDCardForm}
                  />
                  <PrivateRoute
                    path="/sims/senior-citizen-IDCard"
                    component={SeniorCitizenIDCard}
                  />
                  <PrivateRoute path="/sims/user" component={UserCreationForm} />
                  <PrivateRoute path="/sims/role" component={RoleCreation} />
                  <PrivateRoute path="/sims/senior-citizen" component={SeniorCitizenModule} />
                  <PrivateRoute
                    path="/sims/cumulative-women-gender"
                    component={CumulativeWomenGender}
                  />
                  <PrivateRoute
                    path="/sims/children-adolescent"
                    component={ChildrenAdolescentModule}
                  />
                  <PrivateRoute path="/sims/child-home" component={ChildHome} />
                  <PrivateRoute path="/sims/child-home-list" component={ChildHomeList} />
                  <PrivateRoute path="/sims/disabled" component={DisabledModule} />

                  <PrivateRoute path="/sims/shelter-home" component={ShelterHome} />
                  <PrivateRoute path="/sims/shelter-home-list" component={ShelterHomeList} />
                  <PrivateRoute path="/sims/juvenial-child-home" component={JuvenialChildHome} />
                  <PrivateRoute
                    path="/sims/juvenile-child-home-list"
                    component={JuvenileChildHomeList}
                  />
                  <PrivateRoute path="/sims/old-age-home" component={OldAgeHome} />
                  <PrivateRoute path="/sims/old-age-home-list" component={OldAgeHomeList} />
                  <PrivateRoute
                    path="/sims/shelter-home-indicator"
                    component={ShelterHomeIndicator}
                  />
                  <PrivateRoute
                    path="/sims/sewa-kendra-indicator"
                    component={SewaKendraIndicator}
                  />
                  <PrivateRoute path="/sims/child-home-indicator" component={ChildHomeIndicator} />
                  <PrivateRoute
                    path="/sims/juvenial-child-home-indicator"
                    component={JuvenileChildHomeIndicator}
                  />
                  <PrivateRoute
                    path="/sims/old-age-home-indicator"
                    component={OldAgeHomeIndicator}
                  />
                  <PrivateRoute
                    path="/sims/complaint-registration"
                    component={ComplaintRegistration}
                  />
                  <PrivateRoute
                    path="/sims/labour-migration-indicator"
                    component={LabourMigrationIndicator}
                  />
                  <PrivateRoute path="/sims/labour-migration" component={LabourMigration} />
                  <PrivateRoute
                    path="/sims/labour-migration-list"
                    component={LabourMigrationList}
                  />

                  <PrivateRoute exact path="/sims/dashboard" component={dashboard} />

                  <PrivateRoute path="/sims/disability-type-setup" component={DisabilityType} />
                  <PrivateRoute path="/sims/setup" component={FiscalYearSetup} />

                  <PrivateRoute path="/nta/role" component={CreateRole} />
                  <PrivateRoute
                    path="/sims/social-service-registration"
                    component={SocialServiceRegistration}
                  />
                  {/* Security */}
                  {/* <PrivateRoute path="/nta/organization" component={CreateOrganization} />
                <PrivateRoute path="/nta/user" component={CreateUser} />
                <PrivateRoute path="/sims/role" component={CreateRole} />
                <PrivateRoute path="/sims/change-password" component={ChangePassword} />
                <PrivateRoute path="/sims/assign-module" component={AssignModule} /> */}
                  <PrivateRoute
                    path="/sims/disability-IDCard-list"
                    component={DisabilityIDCardList}
                  />
                  <PrivateRoute
                    path="/sims/senior-citizen-IDCard-list"
                    component={SeniorCitizenIdCardList}
                  />

                  <PrivateRoute
                    path="/sims/children-province-wise"
                    component={ChildrenProvinceWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/children-local-level-wise"
                    component={ChildrenLocalLevelWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/women-province-wise"
                    component={WomenProvinceWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/women-local-level-wise"
                    component={WomenLocalLevelWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/disabled-province-wise"
                    component={DisabledProvinceWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/disabled-local-level-wise"
                    component={DisabledLocalLevelWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/senior-citizen-province-wise"
                    component={SeniorCitizenProvinceWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/senior-citizen-local-level-wise"
                    component={SeniorCitizenLocalLevelWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/labour-migration-province-wise"
                    component={LabourMigrationProvinceWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/labour-migration-local-level-wise"
                    component={LabourMigrationLocalLevelWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/shelter-home-province-wise"
                    component={ShelterHomeProvinceWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/shelter-home-local-level-wise"
                    component={ShelterHomeLocalLevelReport}
                  />
                  <PrivateRoute
                    path="/sims/complaint-registration-province-wise"
                    component={ComplaintRegistrationProvinceWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/complaint-registration-local-level-wise"
                    component={ComplaintRegistrationLocalLevelWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/id-card-province-wise"
                    component={IdcardProvinceWiseReport}
                  />
                  <PrivateRoute
                    path="/sims/id-card-local-level-wise"
                    component={IdcardLocalLevelWiseReport}
                  />

                  <PrivateRoute path="/sims/report/consolidated" component={ConsolidatedReport} />

                  {/* Indicator report */}
                  <PrivateRoute
                    path="/sims/report/women-minorities"
                    component={WomenAndMinoritiesReport}
                  />
                  <PrivateRoute path="/sims/report/children" component={ChildrenReport} />
                  <PrivateRoute path="/sims/report/disabled" component={DisabledReport} />
                  <PrivateRoute path="/sims/report/senior-citizen" component={SeniorCitizenReport} />
                  <PrivateRoute path="/sims/report/child-home" component={ChildHomeReport} />
                  <PrivateRoute
                    path="/sims/report/child-correction-home"
                    component={ChildCorrectionHomeReport}
                  />
                  <PrivateRoute path="/sims/report/old-age-home" component={OldAgeHomeReport} />
                  <PrivateRoute path="/sims/report/shelter-home" component={ShelterHomeReport} />
                  <PrivateRoute path="/sims/report/sewa-kendra" component={SewaKendraReport} />
                  <PrivateRoute path="/sims/report/labour-migration" component={LabourMigrationReport} />
                  <PrivateRoute
                    path="/sims/report/complaint-registration"
                    component={ComplaintRegistrationReport}
                  />
                  {/*  Indicator report */}

                  <PrivateRoute path="/sims/change-password" component={ChangePassword} />
                  <PrivateRoute path="/sims/organization-list" component={Organization} />
                  <Route path="/sims/synchronization-module" component={SynchronizationModule} />
                  <PrivateRoute path="/sims/revert-module" component={RevertModule} />
                  <PrivateRoute
                    path="/sims/disability-IDCard-smart"
                    component={SmartDisabilityIdCard}
                  />
                  <PrivateRoute
                    path="/sims/senior-citizen-IDCard-smart"
                    component={SmartSeniorCitizenIDCard}
                  />
                </div>
              </div>
            </Switch>
          </Router>
        </LoadingOverlay>
      </I18nextProvider>
    </>
  );
};
export default App;

function PrivateRoute({ component: Component, ...restOfProps }) {
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        Auth.getAuth() ? (
          <Layout {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
}
