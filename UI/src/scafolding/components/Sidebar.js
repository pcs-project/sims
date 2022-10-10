import React, { Component, useState, useRef, useEffect } from "react";
import { Image } from "primereact/image";
import { ListBox } from "primereact/listbox";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { Link } from "react-router-dom";
import { DataScroller } from "primereact/datascroller";
import { Accordion, AccordionTab } from "primereact/accordion";
import "../assets/css/Sidebar.css";
import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import logo from "../assets/images/logo.png";
//import '../../node_modules/primeicons/primeicons.css';
import { Avatar } from "primereact/avatar";
import DropdownDemo from "./DropDown";
import { withRouter } from "react-router-dom";
import ModuleService from "../../security/api/services/ModuleService";
import { useHistory } from "react-router";
import LoginService from "../api/services/LoginService";
import OrganizationService from "../../security/api/services/OrganizationService";
import { useTranslation } from "react-i18next";
import UserCreationService from "../../UserCreation/api/services/UserCreationService";
import UserService from "../../security/api/services/UserService";
import i18n from "../../il8n/il8n";
import "font-awesome/css/font-awesome.min.css";
import { LANGUAGE } from "../../utilities/constants/ITMISConstansts";

import Manual from "../assets/User_Manual.pdf";

const Sidebar = () => {
  const { t } = useTranslation();
  const [nepLanguage, setNepLanguage] = useState(i18n.language == "en" ? false : true);

  const history = useHistory();
  const [menuList, setMenuList] = useState([]);
  const [organization, setOrganization] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [userLevel, setUserLevel] = useState();
  Array.prototype.sortBy = function (p) {
    return this.slice(0).sort(function (a, b) {
      return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
    });
  };

  const data = [
    {
      hasChild: 0,
      icon: "pi pi-th-large",
      id: 1,
      order: 1,
      parentId: 0,
      subMenu: [],
      title: "Dashboard",
      url: "/sims/dashboard",
    },

    {
      hasChild: 1,
      icon: "pi pi-lock",
      id: 2,
      order: 2,
      parentId: 0,
      subMenu: [
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 3,
          order: 1,
          parentId: 2,
          subMenu: [],
          title: "User Management",
          url: "/sims/user",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 4,
          order: 2,
          parentId: 2,
          subMenu: [],
          title: "Role Management",
          url: "/sims/role",
        },
        {
          hasChild: 0,
          icon: "pi pi-lock",
          id: 19,
          order: 3,
          parentId: 2,
          subMenu: [],
          title: "Social Service Management",
          url: "/sims/social-service-registration",
        },
      ],
      title: "Security",
    },
    {
      hasChild: 1,
      icon: "pi pi-lock",
      id: 5,
      order: 60,
      parentId: 0,
      subMenu: [
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 5,
          order: 1,
          parentId: 5,
          subMenu: [],
          title: "Disability Type",
          url: "/sims/disability-type-setup",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 6,
          order: 2,
          parentId: 5,
          subMenu: [],
          title: "Fiscal Year",
          url: "/sims/setup",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 8,
          order: 4,
          parentId: 5,
          subMenu: [],
          title: "Age Group",
          url: "/sims/setup",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 9,
          order: 5,
          parentId: 5,
          subMenu: [],
          title: "Rehabilitated To",
          url: "/sims/setup",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 11,
          order: 6,
          parentId: 5,
          subMenu: [],
          title: "Type of case",
          url: "/sims/setup",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 12,
          order: 7,
          parentId: 5,
          subMenu: [],
          title: "Disability ID Card Type",
          url: "/sims/setup",
        },
      ],
      title: "Setup",
    },
    // {
    //   hasChild: 0,
    //   icon: "pi pi-lock",
    //   id: 13,
    //   order: 10,
    //   parentId: 0,
    //   subMenu: [],
    //   title: "Women and Minorities",
    //   url: "/sims/cumulative-women-gender",
    // },
    {
      hasChild: 0,
      icon: "pi pi-lock",
      id: 501,
      order: 11,
      parentId: 0,
      subMenu: [],
      title: "Women and Minorities",
      url: "/sims/cumulative-women-gender",
    },
    // {
    //   hasChild: 0,
    //   icon: "pi pi-lock",
    //   id: 14,
    //   order: 15,
    //   parentId: 0,
    //   subMenu: [],
    //   title: "Children",
    //   url: "/sims/children-adolescent",
    // },
    {
      hasChild: 0,
      icon: "pi pi-lock",
      id: 502,
      order: 16,
      parentId: 0,
      subMenu: [],
      title: "Children",
      url: "/sims/children-adolescent",
    },
    // {
    //   hasChild: 0,
    //   icon: "pi pi-lock",
    //   id: 100,
    //   order: 18,
    //   parentId: 0,
    //   subMenu: [],
    //   title: "Disabled",
    //   url: "/sims/disabled",
    // },
    {
      hasChild: 0,
      icon: "pi pi-lock",
      id: 503,
      order: 19,
      parentId: 0,
      subMenu: [],
      title: "Disabled",
      url: "/sims/disabled",
    },
    // {
    //   hasChild: 0,
    //   icon: "pi pi-lock",
    //   id: 110,
    //   order: 20,
    //   parentId: 0,
    //   subMenu: [],
    //   title: "Senior Citizen",
    //   url: "/sims/senior-citizen",
    // },
    {
      hasChild: 0,
      icon: "pi pi-lock",
      id: 504,
      order: 21,
      parentId: 0,
      subMenu: [],
      title: "Senior Citizen",
      url: "/sims/senior-citizen",
    },
    // {
    //   hasChild: 0,
    //   icon: "pi pi-lock",
    //   id: 120,
    //   order: 25,
    //   parentId: 0,
    //   subMenu: [],
    //   title: "Child Home",
    //   url: "/sims/child-home-indicator",
    // },
    {
      hasChild: 0,
      icon: "pi pi-lock",
      id: 510,
      order: 26,
      parentId: 0,
      subMenu: [],
      title: "Child Home",
      url: "/sims/child-home-indicator",
    },
    // {
    //   hasChild: 0,
    //   icon: "pi pi-lock",
    //   id: 130,
    //   order: 30,
    //   parentId: 0,
    //   subMenu: [],
    //   title: "Child Correction Home",
    //   url: "/sims/juvenial-child-home-indicator",
    // },
    {
      hasChild: 0,
      icon: "pi pi-lock",
      id: 525,
      order: 31,
      parentId: 0,
      subMenu: [],
      title: "Child Correction Home",
      url: "/sims/juvenial-child-home-indicator",
    },
    // {
    //   hasChild: 0,
    //   icon: "pi pi-lock",
    //   id: 140,
    //   order: 35,
    //   parentId: 0,
    //   subMenu: [],
    //   title: "Old Age Home",
    //   url: "/sims/old-age-home-indicator",
    // },
    {
      hasChild: 0,
      icon: "pi pi-lock",
      id: 520,
      order: 36,
      parentId: 0,
      subMenu: [],
      title: "Old Age Home",
      url: "/sims/old-age-home-indicator",
    },
    {
      hasChild: 1,
      icon: "pi pi-lock",
      id: 15,
      order: 50,
      parentId: 0,
      subMenu: [
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 16,
          order: 1,
          parentId: 15,
          subMenu: [],
          title: "Disabled ID Card",
          url: "/sims/disability-IDCard-form",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 10006,
          order: 1,
          parentId: 15,
          subMenu: [],
          title: "Disabled ID Card List",
          url: "/sims/disability-IDCard-list",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 17,
          order: 2,
          parentId: 15,
          subMenu: [],
          title: "Senior Citizen ID Card",
          url: "/sims/senior-citizen-IDCard-form",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 100007,
          order: 2,
          parentId: 15,
          subMenu: [],
          title: "Senior Citizen ID List",
          url: "/sims/senior-citizen-IDCard-list",
        },
      ],
      title: "ID Card",
      url: "",
    },
    {
      hasChild: 1,
      icon: "pi pi-lock",
      id: 27,
      order: 40,
      parentId: 0,
      subMenu: [
        // {
        //   hasChild: 0,
        //   icon: "pi pi-file",
        //   id: 23,
        //   order: 1,
        //   parentId: 27,
        //   subMenu: [],
        //   title: "Shelter Home",
        //   url: "/sims/shelter-home-indicator",
        // },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 535,
          order: 2,
          parentId: 27,
          subMenu: [],
          title: "Shelter Home",
          url: "/sims/shelter-home-indicator",
        },
        // {
        //   hasChild: 0,
        //   icon: "pi pi-file",
        //   id: 28,
        //   order: 3,
        //   parentId: 27,
        //   subMenu: [],
        //   title: "Complaint Registration",
        //   url: "/sims/complaint-registration",
        // },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 537,
          order: 4,
          parentId: 27,
          subMenu: [],
          title: "Complaint Registration",
          url: "/sims/complaint-registration",
        },
      ],
      title: "Human Trafficking",
    },
    {
      hasChild: 1,
      icon: "pi pi-lock",
      id: 22,
      order: 55,
      parentId: 0,
      subMenu: [
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 200,
          order: 1,
          parentId: 22,
          subMenu: [],
          title: "Shelter Home",
          url: "/sims/shelter-home",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 1001,
          order: 3,
          parentId: 22,
          subMenu: [],
          title: "Shelter Home List",
          url: "/sims/shelter-home-list",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 201,
          order: 4,
          parentId: 22,
          subMenu: [],
          title: "Child Home",
          url: "/sims/child-home",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 1002,
          order: 5,
          parentId: 22,
          subMenu: [],
          title: "Child Home List",
          url: "/sims/child-home-list",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 205,
          order: 6,
          parentId: 22,
          subMenu: [],
          title: "Juvenile Correction Home",
          url: "/sims/juvenial-child-home",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 1005,
          order: 7,
          parentId: 22,
          subMenu: [],
          title: "Juvenile Correction Home List",
          url: "/sims/juvenile-child-home-list",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 206,
          order: 8,
          parentId: 22,
          subMenu: [],
          title: "Old Age Home",
          url: "/sims/old-age-home",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 1006,
          order: 9,
          parentId: 22,
          subMenu: [],
          title: "Old Age Home List",
          url: "/sims/old-age-home-list",
        },
      ],
      title: "Social Service",
    },
    {
      hasChild: 1,
      icon: "pi pi-lock",
      id: 207,
      order: 45,
      parentId: 0,
      subMenu: [
        // {
        //   hasChild: 0,
        //   icon: "pi pi-file",
        //   id: 301,
        //   order: 1,
        //   parentId: 207,
        //   subMenu: [],
        //   title: "Indicator",
        //   url: "/sims/labour-migration-indicator",
        // },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 540,
          order: 2,
          parentId: 207,
          subMenu: [],
          title: "Indicator",
          url: "/sims/labour-migration-indicator",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 302,
          order: 3,
          parentId: 207,
          subMenu: [],
          title: "Case form",
          url: "/sims/labour-migration",
        },
        {
          hasChild: 0,
          icon: "pi pi-file",
          id: 3002,
          order: 5,
          parentId: 207,
          subMenu: [],
          title: "Case form List",
          url: "/sims/labour-migration-list",
        },
      ],
      title: "Labour Migration",
    },
  ];
  useEffect(() => {
    LoginService.getMenu().then((response) => {
      const menuList = response.data.data.sortBy("order");
      const list = menuList.map(function (o) {
        var elem = {};
        elem.title = t(o.title);
        elem.itemId = o.title;
        elem.elemBefore = () => <i className={o.icon}></i>;
        if (o.hasChild == 1) {
          elem.subNav = o.subMenu.map(function (o2) {
            var elem2 = {};
            elem2.title = t(o2.title);
            elem2.itemId = o2.url;
            elem2.elemBefore = () => <i className={o2.icon}></i>;
            return elem2;
          });
        } else if (o.hasChild == 0 && o.url) {
          elem.itemId = o.url;
        } else {
        }
        return elem;
      });
      setMenuList(list);
    });
  }, [t]);
  useEffect(() => {
    // const menuList = data.sortBy("order");
    // // const list = list.push({
    // //   title: "DASHBOARD",
    // //   itemId: "/nta/dashboard",
    // //   elemBefore: () => <i className="pi pi-window"></i>,
    // // });
    // const list = menuList
    //   // .filter(function (o1) {
    //   //   if (o1.subMenu.length > 0) return o1;
    //   // })
    //   .map(function (o) {
    //     var elem = {};
    //     elem.title = t(o.title);
    //     elem.itemId = o.title;
    //     elem.elemBefore = () => <i className={o.icon}></i>;
    //     console.log("elem", elem);
    //     if (o.hasChild == 1) {
    //       console.log("o ", 0);
    //       elem.subNav = o.subMenu.map(function (o2) {
    //         var elem2 = {};
    //         elem2.title = t(o2.title);
    //         elem2.itemId = o2.url;
    //         elem2.elemBefore = () => <i className={o2.icon}></i>;
    //         return elem2;
    //       });
    //     } else if (o.hasChild == 0 && o.url) {
    //       elem.itemId = o.url;
    //     } else {
    //     }
    //     return elem;
    //   });
    // setMenuList(list);
    UserService.getUserLevel().then((response) => {
      if (response.data.data == "MINISTRY") {
        setUserLevel("MOWCSC");
      } else {
        setUserLevel(response.data.data);
      }
    });
    OrganizationService.getLoggedInUserOrganizaitonDetails().then((response) => {
      {
        i18n.language == LANGUAGE.ENGLISH
          ? setOrganization(response.data.data.name)
          : setOrganization(response.data.data.nameNep);
      }
    });
    data.sortBy("order");
    LoginService.getMenu().then((response) => {
      const menuList = response.data.data.sortBy("order");
      const list = menuList.map(function (o) {
        var elem = {};
        elem.title = t(o.title);
        elem.itemId = o.title;
        elem.elemBefore = () => <i className={o.icon}></i>;

        if (o.hasChild == 1) {
          elem.subNav = o.subMenu.map(function (o2) {
            var elem2 = {};
            elem2.title = t(o2.title);
            elem2.itemId = o2.url;
            elem2.elemBefore = () => <i className={o2.icon}></i>;
            return elem2;
          });
        } else if (o.hasChild == 0 && o.url) {
          elem.itemId = o.url;
        } else {
        }
        return elem;
      });
      setMenuList(list);
    });

    UserCreationService.getLoginUserDetails().then((response) => {
      console.log("userDetails", response.data.data);
      setUserDetails(response.data.data);
    });
  }, []);
  const handleLogOut = () => {
    sessionStorage.clear();
    history.push("/");
  };
  return (
    <>
      <div>
        <div className="profileBox">
          <div className="circleUser">
            <i className="pi pi-user" style={{ fontSize: "2em", color: "#FFFFFF" }}></i>
          </div>

          <p className="p-mt-1">
            {userLevel != "MOWCSW"
              ? sessionStorage.getItem("userName")
                ? sessionStorage.getItem("userName")
                : ""
              : ""}
          </p>
          <p>{userLevel}</p>
          <p className="username1">{organization}</p>
          <center className="p-mt-1">
            <button type="submit" className="btn btn-primary signout-btn" onClick={handleLogOut}>
              {" "}
              <i className="pi pi-sign-out"></i> Logout
            </button>
          </center>
          <div className="clear"></div>
        </div>
        <div className="datascroller-demo">
          <div
            className="card"
            style={{
              position: "relative",
              fontWeight: "bold",
              zIndex: "999",
            }}
          >
            <center>
              <a href={Manual} target="_blank">
                {t("userManual")}
              </a>
            </center>

            <Navigation
              // you can use your own router's api to get pathname
              activeItemId="/nta/dashboard"
              onSelect={({ itemId }) => {
                // maybe push to the route
                if (itemId.charAt(0) == "/")
                  history.push({
                    pathname: itemId,
                  });
              }}
              items={menuList}
            />
            <div className="clear"></div>
            {/* <p className="copyright">&copy; Nepal Telecommunications Authority</p> */}
            <div className="clear"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
