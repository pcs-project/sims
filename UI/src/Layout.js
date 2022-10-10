import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Auth from "../src/Auth";
import AppProps from "./AppProps";
import { ConfirmDialog } from "primereact/confirmdialog";
import DisabilityIDCardForm from "./IdCardForm/Components/DisabilityIDCardForm";
import SeniorCitizenIDCardForm from "./IdCardForm/Components/SeniorCitizenIDCardForm";
import SeniorCitizenIDCard from "./IdCard/Components/SeniorCitizenIDCard";
import UserCreationForm from "./UserCreation/Components/UserCreationForm";
import RoleCreation from "./UserCreation/Components/RoleCreation";
import SeniorCitizenModule from "./SeniorCitizenModule/Components/SeniorCitizenModule";
import ChildrenAdolescentModule from "./ChildrenAdolescentModule/Components/ChildrenAdolescentModule";
import ChildHome from "./SocialService/components/ChildHome";
import ChildHomeList from "./SocialService/components/ChildHomeList";
import DisabledModule from "./DisabledModule/Components/DisabledModule";
import ShelterHome from "./SocialService/components/ShelterHome";
import ShelterHomeList from "./SocialService/components/ShelterHomeList";
import JuvenialChildHome from "./SocialService/components/JuvenileChildHome";
import JuvenileChildHomeList from "./SocialService/components/JuvenileChildHomeList";
import OldAgeHome from "./SocialService/components/OldAgeHome";
import OldAgeHomeList from "./SocialService/components/OldAgeHomeList";
import ShelterHomeIndicator from "./HumanTrafficking/components/ShelterHomeIndicator";
import SewaKendraIndicator from "./HumanTrafficking/components/SewaKendraIndicator";
import ChildHomeIndicator from "./ChildHome/Components/ChildHomeIndicator";
import JuvenileChildHomeIndicator from "./ChildCorrectionHome/components/JuvenileChildHomeIndicator";
import OldAgeHomeIndicator from "./OldAgeHome/components/OldAgeHomeIndicator";
import ComplaintRegistration from "./HumanTrafficking/components/ComplaintRegistration";
import LabourMigration from "./LabourMigration/Components/LabourMigration";
import LabourMigrationList from "./LabourMigration/Components/LabourMigrationList";
import DisabilityType from "./setup/components/DisabilityType";
import FiscalYearSetup from "./setup/components/FiscalYearSetup";
import CreateRole from "./security/components/createRole";
import SocialServiceRegistration from "./security/components/SocialServiceRegistration";
import DisabilityIDCardList from "./IdCard/Components/DisabilityIDCardList";
import SeniorCitizenIdCardList from "./IdCard/Components/SeniorCitizenIdCardList1";
import CumulativeWomenGender from "./CumulativeWomenGender/Components/CumulativeWomenGender.js";
import LabourMigrationIndicator from "./LabourMigration/Components/LabourMigrationIndicator";
import dashboard from "./scafolding/components/Dashboard";

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
import IdleTimer from "react-idle-timer";
import DisabilityIDCard from "./IdCard/Components/DisabilityIDCard";
import ChangePassword from "./security/components/changePassword";
import Organization from "./security/components/organization";
import SynchronizationModule from "./security/components/synchronizationModule";
import RevertModule from "./RevertModule/components/RevertModule";
import SmartDisabilityIdCard from "./IdCard/Components/SmartDisabilityIdCard";
import SmartSeniorCitizenIDCard from "./IdCard/Components/SmartSeniorCitizenIdCard";

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

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeout: 1000 * 60 * 5,
      showModal: false,
      showSessionModal: false,
      userLoggedIn: false,
      isTimedOut: false,
    };

    this.idleTimer = null;
    this.onAction = this._onAction.bind(this);
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.checkSessionExpired = this.checkSessionExpired.bind(this);
    this.handleSessionClose = this.handleSessionClose.bind(this);
  }

  checkSessionExpired() {
    if (Date.now() - sessionStorage.getItem("expires_in") > 3500000) {
      // this.setState({
      //   showSessionModal: true,
      // });
      this.handleSessionClose();
    }
  }
  handleSessionClose() {
    this.setState({ showSessionModal: false });
    let formData = new FormData();
    formData.append("refresh_token", sessionStorage.getItem("refresh_token"));
    formData.append("grant_type", "refresh_token");
    console.log("formData", formData);
    fetch(AppProps.API_BASE_URL + "/security/oauth/token", {
      method: "POST",
      headers: {
        Authorization: "Basic aXRtaXM6aXRtaXM=",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("json: ", json);
        if (json.access_token) {
          //  this.setState({ showModal: false, showSessionModal: false });
          Auth.authenticate();
          sessionStorage.setItem("token", json.access_token);
          sessionStorage.setItem("refresh_token", json.refresh_token);
          sessionStorage.setItem("expires_in", eval(Date.now()));
        } else {
          //toast.error("Error. Please Login!!!");
          this.props.history.push("/");
        }
      })
      .catch((error) => console.error(error));
  }

  handleClose() {
    //  this.handleSessionClose();
    // this.setState({ showModal: false, showSessionModal: false });
    this.setState({ showModal: false });
  }

  handleLogout() {
    this.setState({ showModal: false, showSessionModal: false });
    sessionStorage.clear();
    Auth.signout();
    this.props.history.push("/");
  }

  _onAction(e) {
    this.setState({ isTimedOut: false });
  }

  _onActive(e) {
    this.setState({ isTimedOut: false });
  }

  _onIdle(e) {
    const isTimedOut = this.state.isTimedOut;

    if (isTimedOut) {
      sessionStorage.clear();
      // this.setState({ showModal: false, showSessionModal: false });
      this.props.history.push("/");
    } else {
      this.setState({ showModal: true });
      // this.IdleTimeOutModal();
      this.idleTimer.reset();
      this.setState({ isTimedOut: true });
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.checkSessionExpired(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { match } = this.props;
    return (
      <>
        <IdleTimer
          ref={(ref) => {
            this.idleTimer = ref;
          }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          onAction={this.onAction}
          debounce={250}
          timeout={this.state.timeout}
        />

        <div className="">
          <Switch>
            <PrivateRoute path="/sims/disability-IDCard-form" component={DisabilityIDCardForm} />
            <PrivateRoute path="/sims/disability-IDCard" component={DisabilityIDCard} />
            <PrivateRoute
              path="/sims/senior-citizen-IDCard-form"
              component={SeniorCitizenIDCardForm}
            />
            <PrivateRoute path="/sims/senior-citizen-IDCard" component={SeniorCitizenIDCard} />
            <PrivateRoute path="/sims/user" component={UserCreationForm} />
            <PrivateRoute path="/sims/role" component={RoleCreation} />
            <PrivateRoute path="/sims/senior-citizen" component={SeniorCitizenModule} />
            <PrivateRoute path="/sims/cumulative-women-gender" component={CumulativeWomenGender} />
            <PrivateRoute path="/sims/children-adolescent" component={ChildrenAdolescentModule} />
            <PrivateRoute path="/sims/child-home" component={ChildHome} />
            <PrivateRoute path="/sims/child-home-list" component={ChildHomeList} />
            <PrivateRoute path="/sims/disabled" component={DisabledModule} />

            <PrivateRoute path="/sims/shelter-home" component={ShelterHome} />
            <PrivateRoute path="/sims/shelter-home-list" component={ShelterHomeList} />
            <PrivateRoute path="/sims/juvenial-child-home" component={JuvenialChildHome} />
            <PrivateRoute path="/sims/juvenile-child-home-list" component={JuvenileChildHomeList} />
            <PrivateRoute path="/sims/old-age-home" component={OldAgeHome} />
            <PrivateRoute path="/sims/old-age-home-list" component={OldAgeHomeList} />
            <PrivateRoute path="/sims/shelter-home-indicator" component={ShelterHomeIndicator} />
            <PrivateRoute path="/sims/sewa-kendra-indicator" component={SewaKendraIndicator} />
            <PrivateRoute path="/sims/child-home-indicator" component={ChildHomeIndicator} />
            <PrivateRoute
              path="/sims/juvenial-child-home-indicator"
              component={JuvenileChildHomeIndicator}
            />
            <PrivateRoute path="/sims/old-age-home-indicator" component={OldAgeHomeIndicator} />
            <PrivateRoute path="/sims/complaint-registration" component={ComplaintRegistration} />
            <PrivateRoute
              path="/sims/labour-migration-indicator"
              component={LabourMigrationIndicator}
            />
            <PrivateRoute path="/sims/labour-migration" component={LabourMigration} />
            <PrivateRoute path="/sims/labour-migration-list" component={LabourMigrationList} />

            <PrivateRoute exact path="/sims/dashboard" component={dashboard} />

            <PrivateRoute path="/sims/disability-type-setup" component={DisabilityType} />
            <PrivateRoute path="/sims/setup" component={FiscalYearSetup} />

            <PrivateRoute path="/nta/role" component={CreateRole} />
            <PrivateRoute
              path="/sims/social-service-registration"
              component={SocialServiceRegistration}
            />
            {/* Security */}
            {/* <Route path="/nta/organization" component={CreateOrganization} />
                <Route path="/nta/user" component={CreateUser} />
                <Route path="/sims/role" component={CreateRole} />
                <Route path="/sims/change-password" component={ChangePassword} />
                <Route path="/sims/assign-module" component={AssignModule} /> */}
            <PrivateRoute path="/sims/disability-IDCard-list" component={DisabilityIDCardList} />
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
            <PrivateRoute path="/sims/women-province-wise" component={WomenProvinceWiseReport} />
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
            <PrivateRoute path="/sims/change-password" component={ChangePassword} />
            <PrivateRoute path="/sims/organization-list" component={Organization} />
            <PrivateRoute path="/sims/synchronization-module" component={SynchronizationModule} />
            <PrivateRoute path="/sims/revert-module" component={RevertModule} />
            <PrivateRoute path="/sims/disability-IDCard-smart" component={SmartDisabilityIdCard} />
            <PrivateRoute
              path="/sims/senior-citizen-IDCard-smart"
              component={SmartSeniorCitizenIDCard}
            />

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
          </Switch>
        </div>
        <ConfirmDialog
          visible={this.state.showModal}
          onHide={(e) => {
            this.handleClose(e);
          }}
          message="You Have Been Idle!You Will Get Timed Out. You want to stay?"
          header="You Have Been Idle!"
          icon="pi pi-exclamation-triangle"
          accept={(e) => this.handleClose(e)}
          reject={(e) => this.handleLogout(e)}
        />
        <ConfirmDialog
          visible={this.state.showSessionModal}
          onHide={(e) => {
            this.setState({
              showSessionModal: false,
            });
            //this.handleSessionClose();
          }}
          message="You Session will expire. You want to stay?"
          header="You Session is going to Expire!"
          icon="pi pi-exclamation-triangle"
          accept={() => this.handleSessionClose()}
          reject={(e) => this.handleLogout(e)}
        />
      </>
    );
  }
}

Layout.propTypes = {
  match: PropTypes.any.isRequired,
  history: PropTypes.func.isRequired,
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.getAuth() ? (
        <Component {...props} />
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
export default Layout;
