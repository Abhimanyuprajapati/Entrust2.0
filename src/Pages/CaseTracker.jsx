import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/media/logos/neuralit-logo.png";
import userProfile from "../assets/media/users/user-profile.jpg";
import menuHeaderBg from "../assets/media/misc/menu-header-bg.jpg";
import logoLight from "../assets/media/logos/neuralit-logo.png";
import logoDark from "../assets/media/logos/neuralit-logo-dark.png";
import { useAuth } from "../../context/AuthContext";
import { AddNewProject } from "../components/casetracker/AddNewProject";
import { AddNewCase } from "../components/casetracker/AddNewCase";
import { CaseTrackerRecord } from "../components/casetracker/CaseTrackerRecord";

export const CaseTracker = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const defaultThemeMode = "light";

  const [themeMode, setThemeMode] = useState(() => {
    let initialThemeMode = defaultThemeMode;
    if (document.documentElement) {
      if (document.documentElement.hasAttribute("data-bs-theme-mode")) {
        initialThemeMode =
          document.documentElement.getAttribute("data-bs-theme-mode");
      } else if (localStorage.getItem("data-bs-theme") !== null) {
        initialThemeMode = localStorage.getItem("data-bs-theme");
      }
    }

    if (initialThemeMode === "system") {
      initialThemeMode = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
    }

    return initialThemeMode;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", themeMode);
    localStorage.setItem("data-bs-theme", themeMode);
  }, [themeMode]);

  const handleThemeChange = (mode) => {
    setThemeMode(mode);
  };

  const Logout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        toast.success(response.data.message || "Logout successful!");
        setTimeout(() => navigate("/"), 500);
      } else {
        toast.error(response.data.message || "Logout failed");
      }
    } catch (error) {
      toast.error(error.message || "Logout error");
    }
  };

  // this is slider navbar adding new feature in reports
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
  const toggleSubMenu = () => {
    console.log("hiii");
    setIsSubMenuVisible(!isSubMenuVisible);
  };

  // this is case tracker page

  const [activeComponent, setActiveComponent] = useState("CaseTrackerRecord");

  const renderComponent = () => {
    switch (activeComponent) {
        case "CaseTrackerRecord":
            return <CaseTrackerRecord />;
        case "AddNewProject":
            return <AddNewProject />;
        case "AddNewCase":
            return <AddNewCase />;
        default:
            return <CaseTrackerRecord />;
    }
  };


  const ProjectTracker=()=>{
    navigate1("/")
  }

  return (
    <>
      <div
        id="nit_app_body"
        data-app-layout="light-sidebar"
        data-app-sidebar-enabled="true"
        data-app-sidebar-fixed="true"
        data-app-sidebar-push-header="true"
        data-app-sidebar-push-toolbar="true"
        data-app-sidebar-push-footer="true"
        className="safari-mode app-default"
      >
        {/* this is main body */}
        <div
          className="d-flex flex-column flex-root app-root"
          id="nit_app_root"
        >
          <div
            className="app-page flex-column flex-column-fluid"
            id="nit_app_page"
          >
            <div
              className="app-wrapper flex-column flex-row-fluid"
              id="nit_app_wrapper"
            >
              {/* this is the side nav */}
              <div
                id="nit_app_sidebar"
                className="app-sidebar flex-column"
                data-nit-drawer="true"
                data-nit-drawer-name="app-sidebar"
                data-nit-drawer-activate="{default: true, lg: false}"
                data-nit-drawer-overlay="true"
                data-nit-drawer-width="250px"
                data-nit-drawer-direction="start"
                data-nit-drawer-toggle="#nit_app_sidebar_mobile_toggle"
                style={{ zIndex: 100 }}
              >
                <div
                  className="app-sidebar-logo d-none d-lg-flex flex-stack flex-shrink-0 px-8"
                  id="nit_app_sidebar_logo"
                >
                  <a href="#">
                    <img
                      alt="Logo"
                      src={logoLight}
                      className="theme-light-show h-60px"
                    />
                    <img
                      alt="Logo"
                      src={logoDark}
                      className="theme-dark-show h-60px"
                    />
                  </a>
                </div>

                <div className="separator d-none d-lg-block"></div>

                <div className="app-sidebar-toolbar d-flex flex-stack py-6 px-8">
                  <select
                    className="form-select form-select-custom fw-bold"
                    data-control="select2"
                    data-placeholder="Select Project"
                    data-hide-search="true"
                  >
                    <option value="1" selected>
                      Upload Files
                    </option>
                    <option value="2">Add New Case</option>
                    <option value="3">Add New Project</option>
                    <option value="4">Manage Cards</option>
                  </select>

                  <a
                    href="#"
                    className="btn btn-icon btn-custom fw-bold flex-shrink-0 ms-3"
                    data-bs-toggle="modal"
                    data-bs-target="#modal_quick_action_upload"
                  >
                    <i className="nit-dt nit-plus fs-1"></i>
                  </a>
                </div>

                <div className="separator"></div>

                <div
                  className="app-sidebar-menu hover-scroll-y my-5 my-lg-5 mx-3"
                  id="nit_app_sidebar_menu_wrapper"
                  data-nit-scroll="true"
                  data-nit-scroll-height="auto"
                  data-nit-scroll-dependencies="#nit_app_sidebar_toolbar, #nit_app_sidebar_footer"
                  data-nit-scroll-offset="0"
                >
                  <div
                    className="menu menu-column menu-sub-indention menu-active-bg fw-semibold"
                    id="#nit_sidebar_menu"
                    data-nit-menu="true"
                  >
                    <div
                      data-nit-menu-trigger="click"
                      className="menu-item here show menu-accordion"
                    >
                      <span className="menu-link">
                        <span className="menu-icon">
                          <i className="nit-dt nit-chart-pie-3 fs-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                          </i>
                        </span>
                        <span className="menu-title">Dashboards</span>
                        <span className="menu-arrow"></span>
                      </span>

                      <div className="menu-sub menu-sub-accordion">
                        <div className="menu-item">
                          <a className="menu-link active" href="#">
                            <span className="menu-icon">
                              <i className="nit-dt nit-chart fs-2">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </i>
                            </span>
                            <span className="menu-title">Overview</span>
                          </a>
                        </div>
                        <div className="menu-item">
                          <a className="menu-link" href="#">
                            <span className="menu-icon">
                              <i className="nit-dt nit-bill fs-2">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                                <span className="path4"></span>
                                <span className="path5"></span>
                                <span className="path6"></span>
                              </i>
                            </span>
                            <span className="menu-title">Invoices</span>
                          </a>
                        </div>
                        <div className="menu-item">
                          <a className="menu-link" href="#">
                            <span className="menu-icon">
                              <i className="nit-dt nit-shield-tick fs-2">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </i>
                            </span>
                            <span className="menu-title">Approvals</span>
                          </a>
                        </div>
                        <div className="menu-item">
                          <a className="menu-link" href="#">
                            <span className="menu-icon">
                              <i className="nit-dt nit-document fs-2">
                                <span className="path1"></span>
                                <span className="path2"></span>
                              </i>
                            </span>
                            <span className="menu-title">Delivered</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`menu-item menu-accordion ${
                        isSubMenuVisible ? "show" : ""
                      }`}
                    >
                      <span className="menu-link" onClick={toggleSubMenu}>
                        <span className="menu-icon">
                          <i className="nit-dt nit-chart-simple fs-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                          </i>
                        </span>
                        <span className="menu-title">Reports</span>
                        <span className="menu-arrow"></span>
                      </span>

                      {/* Conditionally render the submenu */}
                      {isSubMenuVisible && (
                        <div>
                          <div className="menu-item">
                            <a className="menu-link">
                              <span className="menu-icon">
                                <i className="nit-dt nit-rocket fs-2">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                              </span>
                              <span className="menu-title">Case Tracker</span>
                            </a>
                          </div>
                          <div className="menu-item" onClick={ProjectTracker}>
                            <a className="menu-link" >
                              <span className="menu-icon">
                                <i className="nit-dt nit-rocket fs-2">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                              </span>
                              <span className="menu-title">Project Tracker</span>
                            </a>
                          </div>
                          <div className="menu-item">
                            <a className="menu-link" >
                              <span className="menu-icon">
                                <i className="nit-dt nit-file-added fs-2">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                              </span>
                              <span className="menu-title">
                                Delivered Cases
                              </span>
                            </a>
                          </div>
                          <div className="menu-item">
                            <a className="menu-link">
                              <span className="menu-icon">
                                <i className="nit-dt nit-credit-cart fs-2">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                              </span>
                              <span className="menu-title">
                                Financial Activity
                              </span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="menu-item pt-5">
                      <div className="menu-content">
                        <span className="menu-heading fw-bold text-uppercase fs-7">
                          Help
                        </span>
                      </div>
                    </div>
                    <div className="menu-item">
                      <a className="menu-link" href="#">
                        <span className="menu-icon">
                          <i className="nit-dt nit-briefcase fs-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </span>
                        <span className="menu-title">My Services</span>
                      </a>
                    </div>
                    <div className="menu-item">
                      <a className="menu-link" href="#">
                        <span className="menu-icon">
                          <i className="nit-dt nit-map fs-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                          </i>
                        </span>
                        <span className="menu-title">Explore Services</span>
                      </a>
                    </div>
                    <div className="menu-item">
                      <a className="menu-link" href="#">
                        <span className="menu-icon">
                          <i className="nit-dt nit-chart fs-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </span>
                        <span className="menu-title">Quick Help</span>
                      </a>
                    </div>
                    <div className="menu-item">
                      <a className="menu-link" href="#">
                        <span className="menu-icon">
                          <i className="nit-dt nit-badge fs-2">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                          </i>
                        </span>
                        <span className="menu-title">About Neural IT</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="app-sidebar-user d-flex flex-stack py-2 px-8">
                  <div className="d-flex me-5">
                    <div className="me-5">
                      <div
                        className="symbol symbol-40px cursor-pointer"
                        data-nit-menu-trigger="{default: 'click', lg: 'hover'}"
                        data-nit-menu-placement="bottom-start"
                        data-nit-menu-overflow="true"
                      >
                        <img src={userProfile} alt="" />
                      </div>

                      <div
                        className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
                        data-nit-menu="true"
                      >
                        <div className="menu-item px-3">
                          <div className="menu-content d-flex align-items-center px-3">
                            <div className="symbol symbol-50px me-5">
                              <img alt="Profile" src={userProfile} />
                            </div>

                            <div className="d-flex flex-column">
                              <div className="fw-bold d-flex align-items-center fs-5">
                                John Lambert
                                <span className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">
                                  Admin
                                </span>
                              </div>
                              <a
                                href="#"
                                className="fw-semibold text-muted text-hover-primary fs-7"
                              >
                                JLambert@neuralit.com
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="separator my-2"></div>

                        <div className="menu-item px-5">
                          <a href="#" className="menu-link px-5">
                            {" "}
                            My Profile{" "}
                          </a>
                        </div>

                        <div className="menu-item px-5">
                          <a href="#" className="menu-link px-5">
                            <span className="menu-text">My Projects</span>
                            <span className="menu-badge">
                              <span className="badge badge-light-danger badge-circle fw-bold fs-7">
                                3
                              </span>
                            </span>
                          </a>
                        </div>

                        <div
                          className="menu-item px-5"
                          data-nit-menu-trigger="{default: 'click', lg: 'hover'}"
                          data-nit-menu-placement="right-end"
                          data-nit-menu-offset="-15px, 0"
                        >
                          <a href="#" className="menu-link px-5">
                            <span className="menu-title">My Subscription</span>
                            <span className="menu-arrow"></span>
                          </a>

                          <div className="menu-sub menu-sub-dropdown w-175px py-4">
                            <div className="menu-item px-3">
                              <a href="" className="menu-link px-5">
                                {" "}
                                Demand Letter{" "}
                              </a>
                            </div>

                            <div className="menu-item px-3">
                              <a href="" className="menu-link px-5">
                                {" "}
                                Medical Retrieval{" "}
                              </a>
                            </div>

                            <div className="menu-item px-3">
                              <a href="" className="menu-link px-5">
                                {" "}
                                Claim Validation{" "}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="menu-item px-5">
                          <a href="" className="menu-link px-5">
                            {" "}
                            My Activity Log{" "}
                          </a>
                        </div>

                        <div className="separator my-2"></div>

                        <div className="menu-item px-5">
                          <a href="" className="menu-link px-5">
                            {" "}
                            Sign Out{" "}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="me-2">
                      <a
                        href="#"
                        className="app-sidebar-username text-gray-800 text-hover-primary fs-6 fw-semibold lh-0"
                      >
                        John Lambert
                      </a>
                      <span className="app-sidebar-deckription text-gray-500 fw-semibold d-block fs-8">
                        Account Manager
                      </span>
                    </div>
                  </div>

                  <a
                    onClick={Logout}
                    className="btn btn-icon btn-active-color-primary btn-icon-custom-color me-n4"
                    data-bs-toggle="tooltip"
                    title="Logout"
                  >
                    <i className="nit-dt nit-entrance-left fs-2 text-gray-500">
                      <span className="path1"></span>
                      <span className="path2"></span>
                    </i>
                  </a>
                </div>
              </div>

              {/* this is for case Tracker components */}
              {/* header parts */}
              <div id="nit_app_header" className="app-header">
                <div
                  className="app-container container-fluid d-flex align-items-stretch justify-content-between"
                  id="nit_app_header_container"
                >
                  <div
                    className="d-flex align-items-center d-lg-none ms-n2 me-2"
                    title="Show sidebar menu"
                  >
                    <div
                      className="btn btn-icon btn-active-color-primary w-35px h-35px"
                      id="nit_app_sidebar_mobile_toggle"
                    >
                      <i className="nit-dt nit-abstract-14 fs-2hx">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                    </div>
                  </div>

                  <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
                    <a href="#" className="d-lg-none">
                      <img alt="Logo" src={logo} className="h-25px" />
                    </a>
                  </div>

                  <div
                    className="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
                    id="nit_app_header_wrapper"
                  >
                    {/* this is header section text */}
                    <div
                      data-swapper="true"
                      data-swapper-mode="{default: 'prepend', lg: 'prepend'}"
                      data-swapper-parent="{default: '#nit_app_content_container', lg: '#nit_app_header_wrapper'}"
                      className="page-title d-flex flex-column justify-content-center flex-wrap me-3 mb-5 mb-lg-0"
                    >
                      <h1 className="page-heading d-flex text-gray-900 fw-bold fs-3 flex-column justify-content-center my-0">
                        Case Tracker
                      </h1>

                      <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
                        <li className="breadcrumb-item text-muted">
                          <a
                            href=""
                            className="breadcrumb-link text-muted text-hover-primary"
                          >
                            Home
                          </a>
                        </li>

                        <li className="breadcrumb-item">
                          <span className="bullet bg-gray-300 w-5px h-2px"></span>
                        </li>

                        <li className="breadcrumb-item text-muted">
                          Case Tracker
                        </li>
                      </ul>
                    </div>

                    {/* this is header section  */}
                    <div className="app-navbar align-items-center flex-shrink-0">
                      {/*  search section  */}
                      <div
                        id="nit_header_search"
                        className="header-search d-flex align-items-center w-lg-250px"
                        data-nit-search-keypress="true"
                        data-nit-search-min-length="2"
                        data-nit-search-enter="enter"
                        data-nit-search-layout="menu"
                        data-nit-search-responsive="lg"
                        data-nit-menu-trigger="auto"
                        data-nit-menu-permanent="true"
                        data-nit-menu-placement="bottom-end"
                        data-nit-menu-attach="parent"
                      >
                        <div
                          data-nit-search-element="toggle"
                          className="search-toggle-mobile d-flex d-lg-none align-items-center"
                        >
                          <div className="d-flex btn btn-custom btn-outline btn-icon btn-icon-gray-700 btn-active-icon-primary">
                            <i className="nit-dt nit-magnifier fs-1">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                          </div>
                        </div>

                        <form
                          data-nit-search-element="form"
                          className="d-none d-lg-block w-100 position-relative mb-5 mb-lg-0"
                          autoComplete="off"
                        >
                          <i className="nit-dt nit-magnifier fs-2 fs-lg-3 text-gray-800 position-absolute top-50 translate-middle-y ms-5">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>

                          <input
                            type="text"
                            className="search-input form-control form-control-solid ps-13"
                            name="search"
                            value=""
                            placeholder="Search..."
                            data-nit-search-element="input"
                          />

                          <span
                            className="position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-5"
                            data-nit-search-element="spinner"
                          >
                            <span className="spinner-border h-15px w-15px align-middle text-gray-500"></span>
                          </span>

                          <span
                            className="btn btn-flush btn-active-color-primary position-absolute top-50 end-0 translate-middle-y lh-0 d-none me-4"
                            data-nit-search-element="clear"
                          >
                            <i className="nit-dt nit-cross fs-2 fs-lg-1 me-0">
                              <span className="path1"></span>
                              <span className="path2"></span>
                            </i>
                          </span>
                        </form>

                        <div
                          data-nit-search-element="content"
                          className="menu menu-sub menu-sub-dropdown py-7 px-7 overflow-hidden w-400px w-md-450px"
                        >
                          <div data-nit-search-element="wrapper">
                            <div className="" data-nit-search-element="main">
                              <form
                                data-nit-search-element="advanced-options-form"
                                className="pt-1"
                              >
                                <h3 className="fw-semibold text-gray-900 mb-7">
                                  Advanced Search
                                </h3>

                                <div className="mb-5">
                                  <input
                                    type="text"
                                    className="form-control form-control-sm form-control-solid"
                                    placeholder="Contains the word"
                                    name="query"
                                  />
                                </div>

                                <div className="mb-5">
                                  <div className="nav-group nav-group-fluid">
                                    <label>
                                      <input
                                        type="radio"
                                        className="btn-check"
                                        name="type"
                                        value="has"
                                        checked="checked"
                                      />
                                      <span className="btn btn-sm btn-color-muted btn-active btn-active-primary">
                                        All
                                      </span>
                                    </label>

                                    <label>
                                      <input
                                        type="radio"
                                        className="btn-check"
                                        name="type"
                                        value="users"
                                      />
                                      <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                                        Case Name
                                      </span>
                                    </label>

                                    <label>
                                      <input
                                        type="radio"
                                        className="btn-check"
                                        name="type"
                                        value="orders"
                                      />
                                      <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                                        Details
                                      </span>
                                    </label>

                                    <label>
                                      <input
                                        type="radio"
                                        className="btn-check"
                                        name="type"
                                        value="projects"
                                      />
                                      <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                                        Projects
                                      </span>
                                    </label>
                                  </div>
                                </div>

                                <div className="mb-5">
                                  <input
                                    type="text"
                                    name="assignedto"
                                    className="form-control form-control-sm form-control-solid"
                                    placeholder="Assigned to"
                                    value=""
                                  />
                                </div>

                                <div className="mb-5">
                                  <input
                                    type="text"
                                    name="casestatus"
                                    className="form-control form-control-sm form-control-solid"
                                    placeholder="Case Status"
                                    value=""
                                  />
                                </div>

                                <div className="mb-5">
                                  <div className="nav-group nav-group-fluid">
                                    <label>
                                      <input
                                        type="radio"
                                        className="btn-check"
                                        name="attachment"
                                        value="has"
                                        checked="checked"
                                      />
                                      <span className="btn btn-sm btn-color-muted btn-active btn-active-primary">
                                        Has attachment
                                      </span>
                                    </label>

                                    <label>
                                      <input
                                        type="radio"
                                        className="btn-check"
                                        name="attachment"
                                        value="any"
                                      />
                                      <span className="btn btn-sm btn-color-muted btn-active btn-active-primary px-4">
                                        Any
                                      </span>
                                    </label>
                                  </div>
                                </div>

                                <div className="mb-5">
                                  <select
                                    name="timezone"
                                    aria-label="Select a Timezone"
                                    data-control="select2"
                                    data-dropdown-parent="#nit_header_search"
                                    data-placeholder="date_period"
                                    className="form-select form-select-sm form-select-solid"
                                  >
                                    <option value="next">
                                      Within the next
                                    </option>
                                    <option value="last">
                                      Within the last
                                    </option>
                                    <option value="between">Between</option>
                                    <option value="on">On</option>
                                  </select>
                                </div>

                                <div className="row mb-8">
                                  <div className="col-6">
                                    <input
                                      type="number"
                                      name="date_number"
                                      className="form-control form-control-sm form-control-solid"
                                      placeholder="Lenght"
                                      value=""
                                    />
                                  </div>

                                  <div className="col-6">
                                    <select
                                      name="date_typer"
                                      aria-label="Select a Timezone"
                                      data-control="select2"
                                      data-dropdown-parent="#nit_header_search"
                                      data-placeholder="Period"
                                      className="form-select form-select-sm form-select-solid"
                                    >
                                      <option value="days">Days</option>
                                      <option value="weeks">Weeks</option>
                                      <option value="months">Months</option>
                                      <option value="years">Years</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="d-flex justify-content-end">
                                  <a
                                    href="#"
                                    className="btn btn-sm fw-bold btn-primary"
                                    data-nit-search-element="advanced-options-form-search"
                                  >
                                    Search
                                  </a>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* quick links section  */}
                      <div className="app-navbar-item ms-2 ms-lg-4">
                        <a
                          href="#"
                          className="btn btn-custom btn-icon btn-outline btn-icon-gray-700 btn-active-icon-primary"
                          data-nit-menu-trigger="click"
                          data-nit-menu-attach="parent"
                          data-nit-menu-placement="bottom-end"
                          data-nit-menu-flip="bottom"
                        >
                          <i className="nit-dt nit-element-11 fs-2x">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                          </i>
                        </a>

                        <div
                          className="menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px"
                          data-nit-menu="true"
                        >
                          <div
                            className="d-flex flex-column flex-center bgi-no-repeat rounded-top px-9 py-5"
                            style={{
                              backgroundImage: `url(${menuHeaderBg})`,
                            }}
                          >
                            <h3 className="text-white fw-semibold mb-3">
                              Quick Links
                            </h3>
                          </div>

                          <div className="row g-0">
                            <div className="col-6">
                              <a
                                href="#"
                                className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end border-bottom"
                              >
                                <i className="nit-dt nit-dollar fs-3x text-primary mb-2">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                  <span className="path3"></span>
                                </i>
                                <span className="fs-5 fw-semibold text-gray-800 mb-0">
                                  Accounting
                                </span>
                                <span className="fs-7 text-gray-500">
                                  View Invoices
                                </span>
                              </a>
                            </div>

                            <div className="col-6">
                              <a
                                href="#"
                                className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-bottom"
                              >
                                <i className="nit-dt nit-sms fs-3x text-primary mb-2">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                <span className="fs-5 fw-semibold text-gray-800 mb-0">
                                  Administration
                                </span>
                                <span className="fs-7 text-gray-500">
                                  Manage Settings
                                </span>
                              </a>
                            </div>

                            <div className="col-6">
                              <a
                                href="#"
                                className="d-flex flex-column flex-center h-100 p-6 bg-hover-light border-end"
                              >
                                <i className="nit-dt nit-abstract-41 fs-3x text-primary mb-2">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                <span className="fs-5 fw-semibold text-gray-800 mb-0">
                                  Projects
                                </span>
                                <span className="fs-7 text-gray-500">
                                  My Cases
                                </span>
                              </a>
                            </div>

                            <div className="col-6">
                              <a
                                href="#"
                                className="d-flex flex-column flex-center h-100 p-6 bg-hover-light"
                              >
                                <i className="nit-dt nit-briefcase fs-3x text-primary mb-2">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                                <span className="fs-5 fw-semibold text-gray-800 mb-0">
                                  Team
                                </span>
                                <span className="fs-7 text-gray-500">
                                  Manage Users
                                </span>
                              </a>
                            </div>
                          </div>

                          <div className="py-2 text-center border-top">
                            &nbsp;
                          </div>
                        </div>
                      </div>

                      {/* this is dark and light mode section */}
                      <div className="app-navbar-item ms-2 ms-lg-4">
                        <a
                          href="#"
                          className="btn btn-custom btn-outline btn-icon btn-icon-gray-700 btn-active-icon-primary"
                          data-nit-menu-trigger="{default:'click', lg: 'hover'}"
                          data-nit-menu-attach="parent"
                          data-nit-menu-placement="bottom-end"
                        >
                          <i
                            className={`nit-dt nit-night-day theme-light-show fs-2qx ${
                              themeMode === "light" ? "active" : ""
                            }`}
                          >
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                            <span className="path6"></span>
                            <span className="path7"></span>
                            <span className="path8"></span>
                            <span className="path9"></span>
                            <span className="path10"></span>
                          </i>
                          <i
                            className={`nit-dt nit-moon theme-dark-show fs-1 ${
                              themeMode === "dark" ? "active" : ""
                            }`}
                          >
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </a>

                        <div
                          className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-gray-500 menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px"
                          data-nit-menu="true"
                          data-nit-element="theme-mode-menu"
                        >
                          <div className="menu-item px-3 my-0">
                            <a
                              href="#"
                              className="menu-link px-3 py-2"
                              data-nit-element="mode"
                              data-nit-value="light"
                              onClick={() => handleThemeChange("light")}
                            >
                              <span
                                className="menu-icon"
                                data-nit-element="icon"
                              >
                                <i className="nit-dt nit-night-day fs-2">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                  <span className="path3"></span>
                                  <span className="path4"></span>
                                  <span className="path5"></span>
                                  <span className="path6"></span>
                                  <span className="path7"></span>
                                  <span className="path8"></span>
                                  <span className="path9"></span>
                                  <span className="path10"></span>
                                </i>
                              </span>
                              <span className="menu-title"> Light </span>
                            </a>
                          </div>

                          <div className="menu-item px-3 my-0">
                            <a
                              href="#"
                              className="menu-link px-3 py-2"
                              data-nit-element="mode"
                              data-nit-value="dark"
                              onClick={() => handleThemeChange("dark")}
                            >
                              <span
                                className="menu-icon"
                                data-nit-element="icon"
                              >
                                <i className="nit-dt nit-moon fs-2">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                </i>
                              </span>
                              <span className="menu-title"> Dark </span>
                            </a>
                          </div>

                          <div className="menu-item px-3 my-0">
                            <a
                              href="#"
                              className="menu-link px-3 py-2"
                              data-nit-element="mode"
                              data-nit-value="system"
                              onClick={() => handleThemeChange("system")}
                            >
                              <span
                                className="menu-icon"
                                data-nit-element="icon"
                              >
                                <i className="nit-dt nit-screen fs-2">
                                  <span className="path1"></span>
                                  <span className="path2"></span>
                                  <span className="path3"></span>
                                  <span className="path4"></span>
                                </i>
                              </span>
                              <span className="menu-title"> System </span>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* this is notification section */}
                      <div className="app-navbar-item ms-2 ms-lg-4">
                        <a
                          href="#"
                          className="btn btn-custom btn-outline btn-icon btn-icon-gray-700 btn-active-icon-primary"
                          data-nit-menu-trigger="click"
                          data-nit-menu-attach="parent"
                          data-nit-menu-placement="bottom-end"
                          data-nit-menu-flip="bottom"
                        >
                          <i className="nit-dt nit-notification-status fs-2qx">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                          </i>
                          <span
                            className="bullet bullet-dot bg-danger h-8px w-8px translate-middle animation-blink"
                            style={{ marginLeft: "-6px", marginTop: "-10px" }}
                          ></span>
                        </a>

                        <div
                          className="menu menu-sub menu-sub-dropdown menu-column w-250px w-lg-325px"
                          data-nit-menu="true"
                        >
                          <div
                            className="d-flex flex-column flex-center bgi-no-repeat rounded-top px-9 py-5"
                            style={{
                              backgroundImage: `url(${menuHeaderBg})`,
                            }}
                          >
                            <h3 className="text-white fw-semibold mb-3">
                              Notifications
                              <span className="fs-8 opacity-75 ps-3">
                                5 records
                              </span>
                            </h3>
                          </div>

                          <div className="row g-0 p-3">
                            <div className="d-flex flex-stack py-4">
                              <div className="d-flex align-items-center me-2">
                                <span className="w-60px badge badge-light-success me-4">
                                  #12348
                                </span>

                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-semibold"
                                >
                                  New Case Submitted
                                </a>
                              </div>

                              <span className="badge badge-light fs-8">
                                Just now
                              </span>
                            </div>

                            <div className="d-flex flex-stack py-4">
                              <div className="d-flex align-items-center me-2">
                                <span className="w-60px badge badge-light-danger me-4">
                                  #12346
                                </span>

                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-semibold"
                                >
                                  Fund allocated of $115.
                                </a>
                              </div>

                              <span className="badge badge-light fs-8">
                                2 Hrs
                              </span>
                            </div>

                            <div className="d-flex flex-stack py-4">
                              <div className="d-flex align-items-center me-2">
                                <span className="w-60px badge badge-light-warning me-4">
                                  #12345
                                </span>

                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-semibold"
                                >
                                  Refund of $15
                                </a>
                              </div>

                              <span className="badge badge-light fs-8">
                                4 Hrs
                              </span>
                            </div>

                            <div className="d-flex flex-stack py-4">
                              <div className="d-flex align-items-center me-2">
                                <span className="w-60px badge badge-light-success me-4">
                                  #12216
                                </span>

                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-semibold"
                                >
                                  New Case Submitted
                                </a>
                              </div>

                              <span className="badge badge-light fs-8">
                                5 Hrs
                              </span>
                            </div>

                            <div className="d-flex flex-stack py-4">
                              <div className="d-flex align-items-center me-2">
                                <span className="w-60px badge badge-light-success me-4">
                                  #12349
                                </span>

                                <a
                                  href="#"
                                  className="text-gray-800 text-hover-primary fw-semibold"
                                >
                                  Case Delivered
                                </a>
                              </div>

                              <span className="badge badge-light fs-8">
                                1 Day
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* this is profile section */}
                      <div
                        className="app-navbar-item ms-1 ms-lg-4"
                        id="nit_header_user_menu_toggle"
                      >
                        <div
                          className="btn btn-outline btn-icon cursor-pointer symbol symbol-35px"
                          data-nit-menu-trigger="{default: 'click', lg: 'hover'}"
                          data-nit-menu-attach="parent"
                          data-nit-menu-placement="bottom-end"
                        >
                          <img
                            src={userProfile}
                            className="rounded-3"
                            alt="user"
                          />
                        </div>

                        <div
                          className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px"
                          data-nit-menu="true"
                        >
                          <div className="menu-item px-3">
                            <div className="menu-content d-flex align-items-center px-3">
                              <div className="symbol symbol-50px me-5">
                                <img alt="User" src={userProfile} />
                              </div>

                              <div className="d-flex flex-column">
                                <div className="fw-bold d-flex align-items-center fs-5">
                                  John Lambert
                                  <span className="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">
                                    Admin
                                  </span>
                                </div>
                                <a
                                  href="#"
                                  className="fw-semibold text-muted text-hover-primary fs-7"
                                >
                                  JLambert@neuralit.com
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="separator my-2"></div>

                          <div className="menu-item px-5">
                            <a href="profile.html" className="menu-link px-5">
                              My Profile
                            </a>
                          </div>

                          <div className="menu-item px-5">
                            <a href="projects.html" className="menu-link px-5">
                              <span className="menu-text">My Projects</span>
                              <span className="menu-badge">
                                <span className="badge badge-light-danger badge-circle fw-bold fs-7">
                                  3
                                </span>
                              </span>
                            </a>
                          </div>

                          <div
                            className="menu-item px-5"
                            data-nit-menu-trigger="{default: 'click', lg: 'hover'}"
                            data-nit-menu-placement="left-start"
                            data-nit-menu-offset="-15px, 0"
                          >
                            <a href="#" className="menu-link px-5">
                              <span className="menu-title">
                                My Subscription
                              </span>
                              <span className="menu-arrow"></span>
                            </a>

                            <div className="menu-sub menu-sub-dropdown w-175px py-4">
                              <div className="menu-item px-3">
                                <a href="" className="menu-link px-5">
                                  {" "}
                                  Demand Letter{" "}
                                </a>
                              </div>

                              <div className="menu-item px-3">
                                <a href="" className="menu-link px-5">
                                  Medical Retrieval
                                </a>
                              </div>

                              <div className="menu-item px-3">
                                <a href="" className="menu-link px-5">
                                  Claim Validation
                                </a>
                              </div>
                            </div>
                          </div>

                          <div className="menu-item px-5">
                            <a
                              href="activity-log.html"
                              className="menu-link px-5"
                            >
                              My Activity Log
                            </a>
                          </div>

                          <div className="separator my-2"></div>

                          <div className="menu-item px-5">
                            <a href="" className="menu-link px-5">
                              {" "}
                              Sign Out{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* //////////////////////// */}

              {/* this is case tracker components  */}
              <div>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => setActiveComponent("CaseTrackerRecord")}
                >
                  Show Cases
                </button>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => setActiveComponent("AddNewProject")}
                >
                  Add New Project
                </button>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => setActiveComponent("AddNewCase")}
                >
                  Add New Case
                </button>
              </div>
              <br />

              <div className="component-display">{renderComponent()}</div>
            </div>
          </div>

          <div
            id="nit_scrolltop"
            className="scrolltop"
            data-nit-scrolltop="true"
          >
            <i className="nit-dt nit-arrow-up">
              <span className="path1"></span>
              <span className="path2"></span>
            </i>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
