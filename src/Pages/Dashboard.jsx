import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/media/logos/neuralit-logo.png";
import userProfile from "../assets/media/users/user-profile.jpg";
import menuHeaderBg from "../assets/media/misc/menu-header-bg.jpg";
import logoLight from "../assets/media/logos/neuralit-logo.png";
import logoDark from "../assets/media/logos/neuralit-logo-dark.png";
import chart2 from "../assets/media/charts/chart2.jpg";
import accountManager from "../assets/media/widgets/account-manager.jpg";
import autopay from "../assets/media/widgets/autopay.png";
import user1 from "../assets/media/users/user1.jpg";
import user2 from "../assets/media/users/user2.jpg";
import user3 from "../assets/media/users/user3.jpg";
import user4 from "../assets/media/users/user4.jpg";
import user5 from "../assets/media/users/user5.jpg";
import user6 from "../assets/media/users/user6.jpg";
import { useAuth } from "../../context/AuthContext";

export const Dashboard = () => {
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
        setTimeout(() => navigate("/login"), 500);
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

  // add new project
  const [selectedTags, setSelectedTags] = useState([]);
  const users = [
    "abdullah.p",
    "abhishek.gu",
    "abid.k",
    "aditi.s",
    "afzal.s",
    "aishwarya.po",
    "akshay.p",
    "alan.p",
    "amol.d",
    "amol.y",
    "apurv.k",
    "archana.k",
    "asha.p",
    "ashok.w",
    "avijeet.s",
    "avudaiyappan.j",
    "bharat.j",
    "ddepam",
    "devendra.m",
    "dinesh.z",
    "divya.s",
    "gayatri.k",
    "harshika.p",
    "help",
    "hiten.b",
    "imran.i",
    "ishant.n",
    "javed.m",
    "jayshri.d",
    "jyoti.t",
  ];
  const toggleTag = (tag) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };
  const isSelected = (tag) => selectedTags.includes(tag);

  // Billable Statement
  const [selectedOption, setSelectedOption] = useState("all");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // project wise configure
  const [invoiceOption, setInvoiceOption] = useState("NA");
  const [groupName, setGroupName] = useState("");

  const handleInvoiceOptionChange = (event) => {
    setInvoiceOption(event.target.value);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  // MRR setting
  const [threshold, setThreshold] = useState("0");
  const handleInputChange = (event) => {
    setThreshold(event.target.value);
  };

  //ESignatureSetting
  const [isSigningEnabled, setIsSigningEnabled] = useState(false);
  const [matterType, setMatterType] = useState("");
  const handleCheckboxChange = (event) => {
    setIsSigningEnabled(event.target.checked);
  };
  const handleSelectChange = (event) => {
    setMatterType(event.target.value);
  };
  const matterTypes = [
    "Choose",
    "Risperdal - SF",
    "Invega",
    "Fluoroquinolone",
    "Risperdal-Invega",
    "Xarelto",
    "TVM",
    "Ethicon",
    "Bard",
    "Boston",
    "AMS",
    "Januvia",
  ];

  // Case setting
  const [isCasebodyDefaultOpen, setIsCasebodyDefaultOpen] = useState(false);
  const [isCaseBillingChecked, setIsCaseBillingChecked] = useState(false);
  const handleCasebodyDefaultChange = (event) => {
    setIsCasebodyDefaultOpen(event.target.checked);
  };
  const handleCaseBillingCheckChange = (event) => {
    setIsCaseBillingChecked(event.target.checked);
  };

  // commit setting
  const [commentLimitValue, setCommentLimitValue] = useState("0");
  const handleCommentLimitChange = (event) => {
    setCommentLimitValue(event.target.value);
  };

  // this is project setting 

  const [isBatchable, setIsBatchable] = useState(false); // Default unchecked
  const [billingType, setBillingType] = useState('Resource Based'); // Default dropdown value
  const [ratePerMin, setRatePerMin] = useState(''); // Empty input for rate
  const [freeMaxCases, setFreeMaxCases] = useState('23'); // Default value
  const [caseReopen, setCaseReopen] = useState('Yes'); // Default "Yes" selected
  const [separateInvoice, setSeparateInvoice] = useState('No'); // Default "No" selected
  const [newTimerView, setNewTimerView] = useState('Yes'); // Default "Yes" selected
  const [caseImplantStatus, setCaseImplantStatus] = useState('Inactive'); // Default "Inactive" selected
  const [qualityCheck, setQualityCheck] = useState('Active'); // Default "Active" selected
  const [splitComment, setSplitComment] = useState('Yes(Mandatory)'); // Default "Yes(Mandatory)" selected

  // New states for additional sections
  const [displayTimerSeconds, setDisplayTimerSeconds] = useState('Enabled'); // Default "Enabled" selected
  const [dueDateNotification, setDueDateNotification] = useState('Disabled'); // Default "Disabled" selected
  const [commentFetchDocuments, setCommentFetchDocuments] = useState('Disabled'); // Default "Disabled" selected
  const [caseMRRRequest, setCaseMRRRequest] = useState('Enabled'); // Default "Enabled" selected
  const [automateFileSync, setAutomateFileSync] = useState('Enabled'); // Default "Enabled" selected
  const [fileDeliveryCheck, setFileDeliveryCheck] = useState('Enabled'); // Default "Enabled" selected
  const [caseClosureDeliveryCheck, setCaseClosureDeliveryCheck] = useState('Enabled'); // Default "Enabled" selected
  const [caseReopenPrepaid, setCaseReopenPrepaid] = useState('Yes'); 

    // State for the checkboxes
    const [enableBookmarkModule, setEnableBookmarkModule] = useState(false);
    const [enableReviewSheet, setEnableReviewSheet] = useState(false);
  
    // State for the URL path setting
    const [urlPath, setUrlPath] = useState(''); // Default value
  
    const handleBookmarkModuleChange = () => {
      setEnableBookmarkModule(!enableBookmarkModule);
    };
  
    const handleReviewSheetChange = () => {
      setEnableReviewSheet(!enableReviewSheet);
    };
  
    const handleUrlPathChange = (event) => {
      setUrlPath(event.target.value);
    };

     
  // State for the checkbox
  const [enablePFSModule, setEnablePFSModule] = useState(false);

  const handlePFSModuleChange = () => {
    setEnablePFSModule(!enablePFSModule);
  };

  const handleSave = () => {
    // Here you would handle the save action, e.g., making an API call or updating the state
    alert('Settings have been saved.');
  };


  ////////////////////////////////////////////////////

  const navigate1 = useNavigate();
  const CaseTracker=()=>{
    navigate1("/casetracker")
  }
  
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
                          <div className="menu-item" onClick={CaseTracker}>
                            <a className="menu-link" href="#">
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
                            <a className="menu-link" href="#">
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
                            <a className="menu-link" href="#">
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
                            <a className="menu-link" href="#">
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
                        Dashboard
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
                        Dashboard
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








              <div
                className="app-main flex-column flex-row-fluid"
                id="nit_app_main"
              >
                <div className="d-flex flex-column flex-column-fluid">
                  <div
                    id="nit_app_content"
                    className="app-content flex-column-fluid"
                  >
                    <div
                      id="nit_app_content_container"
                      className="app-container container-fluid"
                    >
                      <div className="row gx-5 gx-xl-10 mb-xl-10">
                        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-10">
                          <div
                            className="card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-center border-0 h-md-50 mb-5 mb-xl-10"
                            style={{ backgroundColor: "#080655" }}
                          >
                            <div className="card-header pt-5">
                              <div className="card-title d-flex flex-column">
                                <span className="fs-2hx fw-bold text-white me-2 lh-1 ls-n2">
                                  81
                                </span>
                                <span className="text-white opacity-50 pt-1 fw-semibold fs-6">
                                  Open Cases
                                </span>
                              </div>
                            </div>

                            <div className="card-body d-flex align-items-end pt-0">
                              <div className="d-flex align-items-center flex-column mt-3 w-100">
                                <div className="d-flex justify-content-between fw-bold fs-6 text-white opacity-50 w-100 mt-auto mb-2">
                                  <span>60 In Progress</span> <span>74%</span>
                                </div>
                                <div className="h-8px mx-3 w-100 bg-light-danger rounded">
                                  <div
                                    className="bg-danger rounded h-8px"
                                    role="progressbar"
                                    style={{ width: "74%" }}
                                    aria-valuenow="50"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card card-flush h-md-50 mb-5 mb-xl-10">
                            <div className="card-header pt-5">
                              <div className="card-title d-flex flex-column">
                                <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">
                                  27
                                </span>
                                <span className="text-gray-500 pt-1 fw-semibold fs-6">
                                  New Case Submitted
                                </span>
                              </div>
                            </div>

                            <div className="card-body d-flex flex-column justify-content-end pe-0">
                              <span className="fs-6 fw-bolder text-gray-800 d-block mb-2">
                                Team Working on Cases
                              </span>

                              <div className="symbol-group symbol-hover flex-nowrap">
                                <div
                                  className="symbol symbol-35px symbol-circle"
                                  data-bs-toggle="tooltip"
                                  title="Alan Warden"
                                >
                                  <img
                                    alt="Pic"
                                    src={user1}
                                  />
                                </div>
                                <div
                                  className="symbol symbol-35px symbol-circle"
                                  data-bs-toggle="tooltip"
                                  title="Michael Eberon"
                                >
                                  <img
                                    alt="Pic"
                                    src={user2}
                                  />
                                </div>
                                <div
                                  className="symbol symbol-35px symbol-circle"
                                  data-bs-toggle="tooltip"
                                  title="Susan Redwood"
                                >
                                  <img
                                    alt="Pic"
                                    src={user3}
                                  />
                                </div>
                                <div
                                  className="symbol symbol-35px symbol-circle"
                                  data-bs-toggle="tooltip"
                                  title="Melody Macy"
                                >
                                  <img
                                    alt="Pic"
                                    src={user4}
                                  />
                                </div>
                                <div
                                  className="symbol symbol-35px symbol-circle"
                                  data-bs-toggle="tooltip"
                                  title="Perry Matthew"
                                >
                                  <img
                                    alt="Pic"
                                    src={user5}
                                  />
                                </div>
                                <div
                                  className="symbol symbol-35px symbol-circle"
                                  data-bs-toggle="tooltip"
                                  title="Barry Walter"
                                >
                                  <img
                                    alt="Pic"
                                    src={user6}
                                  />
                                </div>
                                <a
                                  href="#"
                                  className="symbol symbol-35px symbol-circle"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modal_view_users"
                                >
                                  <span className="symbol-label bg-dark text-gray-300 fs-8 fw-bold">
                                    +10
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-10">
                          <div className="card card-flush h-md-50 mb-5 mb-xl-10">
                            <div className="card-header pt-5">
                              <div className="card-title d-flex flex-column">
                                <div className="d-flex align-items-center">
                                  <span className="fs-4 fw-semibold text-gray-500 me-1 align-self-start">
                                    $
                                  </span>
                                  <span className="fs-2hx fw-bold text-gray-900 me-2 lh-1 ls-n2">
                                    2,150
                                  </span>
                                  <span className="badge badge-light-success fs-base">
                                    <i className="nit-dt nit-arrow-up fs-5 text-success ms-n1">
                                      <span className="path1"></span>
                                      <span className="path2"></span>
                                    </i>
                                    2.2%
                                  </span>
                                </div>
                                <span className="text-gray-500 pt-1 fw-semibold fs-6">
                                  Total Balance in June
                                </span>
                              </div>
                            </div>

                            <div className="card-body pt-0 pb-0 d-flex flex-wrap align-items-center">
                              <div className="card-body d-flex align-items-end pt-0 pb-0">
                                <img
                                  alt="Pic"
                                  src={chart2}
                                  className="align-items-center w-90px"
                                />
                              </div>

                              <div className="d-flex flex-column content-justify-center flex-row-fluid">
                                <div className="d-flex fw-semibold align-items-center">
                                  <div className="bullet w-8px h-3px rounded-2 bg-success me-3"></div>
                                  <div className="text-gray-500 flex-grow-1 me-4">
                                    Credit This Month
                                  </div>
                                  <div className="fw-bolder text-gray-700 text-xxl-end">
                                    $4,030
                                  </div>
                                </div>

                                <div className="d-flex fw-semibold align-items-center my-2">
                                  <div className="bullet w-8px h-3px rounded-2 bg-primary me-3"></div>
                                  <div className="text-gray-500 flex-grow-1 me-4">
                                    Allocated
                                  </div>
                                  <div className="fw-bolder text-gray-700 text-xxl-end">
                                    $2,080
                                  </div>
                                </div>

                                <div className="d-flex fw-semibold align-items-center">
                                  <div
                                    className="bullet w-8px h-3px rounded-2 me-3"
                                    style={{ backgroundColor: "#767986" }}
                                  ></div>
                                  <div className="text-gray-500 flex-grow-1 me-4">
                                    Refund
                                  </div>
                                  <div className="fw-bolder text-gray-700 text-xxl-end">
                                    $200
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="card card-flush h-lg-50">
                            <div className="card-header pt-5">
                              <h3 className="card-title text-gray-800">
                                Highlights
                              </h3>
                            </div>

                            <div className="card-body pt-5">
                              <div className="d-flex flex-stack">
                                <div className="text-gray-700 fw-semibold fs-6 me-2">
                                  Avg. Allocation
                                </div>
                                <div className="d-flex align-items-senter">
                                  <i className="nit-dt nit-arrow-up-right fs-2 text-success me-2">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                  </i>
                                  <span className="text-gray-900 fw-bolder fs-6">
                                    $7,820
                                  </span>
                                </div>
                              </div>

                              <div className="separator separator-dashed my-3"></div>

                              <div className="d-flex flex-stack">
                                <div className="text-gray-700 fw-semibold fs-6 me-2">
                                  Avg. Refund
                                </div>
                                <div className="d-flex align-items-senter">
                                  <i className="nit-dt nit-arrow-down-right fs-2 text-danger me-2">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                  </i>
                                  <span className="text-gray-900 fw-bolder fs-6">
                                    $245
                                  </span>
                                </div>
                              </div>

                              <div className="separator separator-dashed my-3"></div>

                              <div className="d-flex flex-stack">
                                <div className="text-gray-700 fw-semibold fs-6 me-2">
                                  Avg. Fund Required
                                </div>
                                <div className="d-flex align-items-senter">
                                  <i className="nit-dt nit-arrow-up-right fs-2 text-success me-2">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                  </i>
                                  <span className="text-gray-900 fw-bolder fs-6">
                                    $2,105
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12 col-xl-12 col-xxl-6 mb-10 mb-xl-0">
                          <div className="card h-md-100">
                            <div className="card-header border-0 pt-5">
                              <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold text-gray-900">
                                  What’s up Today
                                </span>
                                <span className="text-muted mt-1 fw-semibold fs-7">
                                  Total 2 deliveries
                                </span>
                              </h3>

                              <div className="card-toolbar">
                                <a href="#" className="btn btn-sm btn-light">
                                  Upcoming Events
                                </a>
                              </div>
                            </div>

                            <div className="card-body pt-7 px-0">
                              <ul className="nav nav-stretch nav-pills nav-pills-custom nav-pills-active-custom d-flex justify-content-between mb-8 px-5">
                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger"
                                    data-bs-toggle="tab"
                                    href="#cal_event_21"
                                  >
                                    <span className="fs-7 fw-semibold">Sa</span>
                                    <span className="fs-6 fw-bold">21</span>
                                  </a>
                                </li>

                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger"
                                    data-bs-toggle="tab"
                                    href="#cal_event_22"
                                  >
                                    <span className="fs-7 fw-semibold">Su</span>
                                    <span className="fs-6 fw-bold">22</span>
                                  </a>
                                </li>

                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger active"
                                    data-bs-toggle="tab"
                                    href="#cal_event_23"
                                  >
                                    <span className="fs-7 fw-semibold">Tu</span>
                                    <span className="fs-6 fw-bold">23</span>
                                  </a>
                                </li>

                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger"
                                    data-bs-toggle="tab"
                                    href="#cal_event_24"
                                  >
                                    <span className="fs-7 fw-semibold">Tu</span>
                                    <span className="fs-6 fw-bold">24</span>
                                  </a>
                                </li>

                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger"
                                    data-bs-toggle="tab"
                                    href="#cal_event_25"
                                  >
                                    <span className="fs-7 fw-semibold">We</span>
                                    <span className="fs-6 fw-bold">25</span>
                                  </a>
                                </li>

                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger"
                                    data-bs-toggle="tab"
                                    href="#cal_event_26"
                                  >
                                    <span className="fs-7 fw-semibold">Th</span>
                                    <span className="fs-6 fw-bold">26</span>
                                  </a>
                                </li>

                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger"
                                    data-bs-toggle="tab"
                                    href="#cal_event_27"
                                  >
                                    <span className="fs-7 fw-semibold">
                                      Fri
                                    </span>
                                    <span className="fs-6 fw-bold">27</span>
                                  </a>
                                </li>

                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger"
                                    data-bs-toggle="tab"
                                    href="#cal_event_28"
                                  >
                                    <span className="fs-7 fw-semibold">Sa</span>
                                    <span className="fs-6 fw-bold">28</span>
                                  </a>
                                </li>

                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger"
                                    data-bs-toggle="tab"
                                    href="#cal_event_29"
                                  >
                                    <span className="fs-7 fw-semibold">Su</span>
                                    <span className="fs-6 fw-bold">29</span>
                                  </a>
                                </li>

                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px py-4 px-3 btn-active-danger"
                                    data-bs-toggle="tab"
                                    href="#cal_event_30"
                                  >
                                    <span className="fs-7 fw-semibold">Mo</span>
                                    <span className="fs-6 fw-bold">30</span>
                                  </a>
                                </li>
                              </ul>

                              <div className="tab-content mb-2 px-9">
                                <div
                                  className="tab-pane fade show active"
                                  id="cal_event_23"
                                >
                                  <div className="d-flex align-items-center mb-6">
                                    <span
                                      data-element="bullet"
                                      className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-info"
                                    ></span>

                                    <div className="flex-grow-1 me-5">
                                      <div className="text-gray-800 fw-semibold fs-2">
                                        Case# 992346
                                      </div>
                                      <div className="text-gray-700 fw-semibold fs-6">
                                        Demand Letter: Jamie Morgan
                                      </div>
                                      <div className="text-gray-500 fw-semibold fs-7">
                                        Assigned to
                                        <a
                                          href="#"
                                          className="text-primary opacity-75-hover fw-semibold"
                                        >
                                          Kenneth J. Hilliard
                                        </a>
                                      </div>
                                    </div>

                                    <a
                                      href="#"
                                      className="btn btn-sm btn-light"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modal_cal_event"
                                    >
                                      View
                                    </a>
                                  </div>

                                  <div className="d-flex align-items-center mb-6">
                                    <span
                                      data-element="bullet"
                                      className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-warning"
                                    ></span>

                                    <div className="flex-grow-1 me-5">
                                      <div className="text-gray-800 fw-semibold fs-2">
                                        Case# 991324
                                      </div>
                                      <div className="text-gray-700 fw-semibold fs-6">
                                        Medical Record Review: Chris Patton
                                      </div>
                                      <div className="text-gray-500 fw-semibold fs-7">
                                        Assigned to
                                        <a
                                          href="#"
                                          className="text-primary opacity-75-hover fw-semibold"
                                        >
                                          Patrick S. Lombardi
                                        </a>
                                      </div>
                                    </div>

                                    <a
                                      href="#"
                                      className="btn btn-sm btn-light"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modal_cal_event"
                                    >
                                      View
                                    </a>
                                  </div>

                                  <div className="d-flex align-items-center mb-6">
                                    <span
                                      data-element="bullet"
                                      className="bullet bullet-vertical d-flex align-items-center min-h-70px mh-100 me-4 bg-success"
                                    ></span>

                                    <div className="flex-grow-1 me-5">
                                      <div className="text-gray-800 fw-semibold fs-2">
                                        Memorial Day
                                      </div>
                                      <div className="text-gray-700 fw-semibold fs-6">
                                        Neural IT Team may not be available
                                        today
                                      </div>
                                      <div className="text-gray-500 fw-semibold fs-7">
                                        Visit Holiday
                                        <a
                                          href="#"
                                          className="text-primary opacity-75-hover fw-semibold"
                                        >
                                          Calendar
                                        </a>
                                      </div>
                                    </div>

                                    <a
                                      href="#"
                                      className="btn btn-sm btn-light"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modal_cal_event"
                                    >
                                      View
                                    </a>
                                  </div>
                                </div>

                                <div
                                  className="modal fade"
                                  id="modal_cal_event"
                                  tabindex="-1"
                                  style={{ zIndex: 1050 }}
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog modal-fullscreen p-9">
                                    <div className="modal-content modal-rounded">
                                      <div className="modal-header">
                                        <h2>Event Details</h2>
                                        <div
                                          className="btn btn-sm btn-icon btn-active-color-primary"
                                          data-bs-dismiss="modal"
                                        >
                                          <i className="nit-dt nit-cross fs-1">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                          </i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
                        <div className="col-xxl-6">
                          <div className="card card-flush h-md-100">
                            <div className="card-body py-9">
                              <div className="row gx-9 h-100">
                                <div className="col-sm-6 mb-10 mb-sm-0">
                                  <div
                                    className="bgi-no-repeat bgi-position-center bgi-size-cover card-rounded min-h-400px min-h-sm-100 h-100"
                                    style={{
                                      backgroundSize: "100% 100%",
                                      backgroundImage: `url(${accountManager})`,
                                    }}
                                  ></div>
                                </div>

                                <div className="col-sm-6">
                                  <div className="d-flex flex-column h-100">
                                    <div className="mb-7">
                                      <div className="d-flex flex-stack mb-6">
                                        <div className="flex-shrink-0 me-5">
                                          <span className="text-gray-500 fs-7 fw-bold me-2 d-block lh-1 pb-1">
                                            My Account Manager
                                          </span>
                                          <span className="text-gray-800 fs-1 fw-bold">
                                            Bradley M. Cravens
                                          </span>
                                        </div>
                                      </div>

                                      <div className="d-flex align-items-center flex-wrap d-grid gap-2">
                                        <div className="d-flex align-items-center me-5 me-xl-13">
                                          <div className="symbol symbol-30px symbol-circle me-3">
                                            <i className="nit-dt bi-phone fs-5 me-1">
                                              <span className="path1"></span>
                                              <span className="path2"></span>
                                            </i>
                                          </div>

                                          <div className="m-0">
                                            <span className="fw-semibold text-gray-500 d-block fs-8">
                                              Call Now
                                            </span>
                                            <a
                                              href="tel:+1 516 559 111"
                                              className="fw-bold text-gray-800 text-hover-primary fs-7"
                                            >
                                              +1 516 559 111
                                            </a>
                                          </div>
                                        </div>

                                        <div className="d-flex align-items-center me-5 me-xl-13">
                                          <div className="symbol symbol-30px symbol-circle me-3">
                                            <i className="nit-dt nit-sms fs-5 me-1">
                                              <span className="path1"></span>
                                              <span className="path2"></span>
                                            </i>
                                          </div>

                                          <div className="m-0">
                                            <span className="fw-semibold text-gray-500 d-block fs-8">
                                              Email
                                            </span>
                                            <a
                                              href="mailto:+1 516 559 111"
                                              className="fw-bold text-gray-800 text-hover-primary fs-7"
                                            >
                                              BCravens@neuralit.com
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="mb-6">
                                      <span className="fw-semibold text-gray-600 fs-6 mb-8 d-block">
                                        Email entrust@neuralit.com for quick
                                        assistance.
                                      </span>

                                      <div className="d-flex">
                                        <div className="border align-items-center border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-4 me-6 mb-3">
                                          <i className="nit-dt nit-plus fs-5 me-1"></i>
                                          <div className="fw-semibold text-gray-500">
                                            Raise Ticket
                                          </div>
                                        </div>

                                        <div className="border border-gray-300 border-dashed rounded min-w-100px w-100 py-2 px-4 mb-3">
                                          <i className="nit-dt bi-ticket-detailed fs-5 me-1"></i>
                                          <div className="fw-semibold text-gray-500">
                                            View Tickets
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="d-flex flex-stack mt-auto bd-highlight">
                                      <a
                                        href="#"
                                        className="d-flex align-items-center text-primary opacity-75-hover fs-6 fw-semibold"
                                      >
                                        Book Bradley's Calendar
                                        <i className="nit-dt nit-exit-right-corner fs-4 ms-1">
                                          <span className="path1"></span>
                                          <span className="path2"></span>
                                        </i>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-xxl-6">
                          <div
                            className="card border-0 h-md-100"
                            data-bs-theme="light"
                            style={{
                              background:
                                "linear-gradient(112.14deg, #00d2ff 0%, #3a7bd5 100%)",
                            }}
                          >
                            <div className="card-body">
                              <div className="row align-items-center h-100">
                                <div className="col-7 ps-xl-13">
                                  <div className="text-white mb-6 pt-6 w-400px">
                                    <span className="fs-4 fw-semibold me-2 d-block lh-1 pb-2 opacity-75">
                                      Get best offer
                                    </span>
                                    <span className="fs-2qx fw-bold">
                                      Medical Record Retrieval starts at $30
                                    </span>
                                  </div>

                                  <span className="fw-semibold text-white fs-6 mb-8 d-block opacity-75 w-400px">
                                    Streamline your practice with our
                                    comprehensive medical-legal outsourcing
                                    solutions
                                  </span>

                                  <div className="d-flex align-items-center flex-wrap d-grid gap-2 mb-10 mb-xl-20">
                                    <div className="d-flex align-items-center me-5 me-xl-13">
                                      <div className="symbol symbol-30px symbol-circle me-3">
                                        <span
                                          className="symbol-label"
                                          style={{ background: "#35c7ff" }}
                                        >
                                          <i className="nit-dt nit-abstract-41 fs-5 text-white">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                          </i>
                                        </span>
                                      </div>

                                      <div className="text-white">
                                        <span className="fw-semibold d-block fs-8 opacity-75">
                                          Free Sample
                                        </span>
                                        <span className="fw-bold fs-7">
                                          Up to 500
                                        </span>
                                      </div>
                                    </div>

                                    <div className="d-flex align-items-center">
                                      <div className="symbol symbol-30px symbol-circle me-3">
                                        <span
                                          className="symbol-label"
                                          style={{ background: "#35c7ff" }}
                                        >
                                          <i className="nit-dt nit-abstract-26 fs-5 text-white">
                                            <span className="path1"></span>
                                            <span className="path2"></span>
                                          </i>
                                        </span>
                                      </div>

                                      <div className="text-white">
                                        <span className="fw-semibold opacity-75 d-block fs-8">
                                          Discount
                                        </span>
                                        <span className="fw-bold fs-7">
                                          Flat 15%
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="d-flex flex-column flex-sm-row d-grid gap-2">
                                    <a
                                      href="#"
                                      className="btn btn-success flex-shrink-0 me-lg-2"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modal_current_offer"
                                    >
                                      Current Offers
                                    </a>
                                    <a
                                      href="#"
                                      className="btn btn-primary flex-shrink-0"
                                      style={{
                                        background: "rgba(255, 255, 255, 0.2)",
                                      }}
                                      data-bs-toggle="modal"
                                      data-bs-target="#modal_our_services"
                                    >
                                      Our Services
                                    </a>
                                  </div>

                                  <div
                                    className="modal fade"
                                    id="modal_current_offer"
                                    tabindex="-1"
                                    style={{ zIndex: 1050 }}
                                    aria-hidden="true"
                                  >
                                    <div className="modal-dialog modal-fullscreen p-9">
                                      <div className="modal-content modal-rounded">
                                        <div className="modal-header">
                                          <h2>Offer June, 2024</h2>
                                          <div
                                            className="btn btn-sm btn-icon btn-active-color-primary"
                                            data-bs-dismiss="modal"
                                          >
                                            <i className="nit-dt nit-cross fs-1">
                                              <span className="path1"></span>
                                              <span className="path2"></span>
                                            </i>
                                          </div>
                                        </div>

                                        <div className="modal-body py-lg-10 px-lg-10">
                                          <img
                                            src="https://www.neuralit.com/sites/default/files/2024-05/Website%20hero%20banner_2.png"
                                            style={{ width: "95%" }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className="modal fade"
                                    id="modal_our_services"
                                    tabindex="-1"
                                    style={{ zIndex: 1050 }}
                                    aria-hidden="true"
                                  >
                                    <div className="modal-dialog modal-fullscreen p-9">
                                      <div className="modal-content modal-rounded">
                                        <div className="modal-header">
                                          <h2>Neural IT - Services</h2>
                                          <div
                                            className="btn btn-sm btn-icon btn-active-color-primary"
                                            data-bs-dismiss="modal"
                                          >
                                            <i className="nit-dt nit-cross fs-1">
                                              <span className="path1"></span>
                                              <span className="path2"></span>
                                            </i>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
                        <div className="col-xl-4">
                          <div className="card card-flush h-md-100">
                            <div className="card-header pt-5 mb-6">
                              <h3 className="card-title align-items-start flex-column">
                                <div className="d-flex align-items-center mb-2">
                                  <span className="fs-3 fw-semibold text-gray-500 align-self-start me-1">
                                    $
                                  </span>
                                  <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2">
                                    2,172
                                  </span>
                                  <span className="badge badge-light-success fs-base">
                                    <i className="nit-dt nit-arrow-up fs-5 text-success ms-n1">
                                      <span className="path1"></span>
                                      <span className="path2"></span>
                                    </i>
                                    6.1%
                                  </span>
                                </div>
                                <span className="fs-6 fw-semibold text-gray-500">
                                  Avg. Fund Utilization
                                </span>
                              </h3>

                              <div className="card-toolbar">
                                <button
                                  className="btn btn-icon btn-color-gray-500 btn-active-color-primary justify-content-end"
                                  data-menu-trigger="click"
                                  data-menu-placement="bottom-end"
                                  data-menu-overflow="true"
                                >
                                  <i className="nit-dt nit-dots-square fs-1 text-gray-500 me-n1">
                                    <span className="path1"></span>
                                    <span className="path2"></span>
                                    <span className="path3"></span>
                                    <span className="path4"></span>
                                  </i>
                                </button>

                                <div
                                  className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold w-200px"
                                  data-menu="true"
                                >
                                  <div className="menu-item px-3">
                                    <div className="menu-content fs-6 text-gray-900 fw-bold px-3 py-4">
                                      Quick Actions
                                    </div>
                                  </div>

                                  <div className="separator mb-3 opacity-75"></div>

                                  <div className="menu-item px-3">
                                    <a href="#" className="menu-link px-3">
                                      New Ticket
                                    </a>
                                  </div>
                                  <div className="menu-item px-3">
                                    <a href="#" className="menu-link px-3">
                                      New Customer
                                    </a>
                                  </div>
                                  <div
                                    className="menu-item px-3"
                                    data-menu-trigger="hover"
                                    data-menu-placement="right-start"
                                  >
                                    <a href="#" className="menu-link px-3">
                                      <span className="menu-title">
                                        New Group
                                      </span>
                                      <span className="menu-arrow"></span>
                                    </a>

                                    <div className="menu-sub menu-sub-dropdown w-175px py-4">
                                      <div className="menu-item px-3">
                                        <a href="#" className="menu-link px-3">
                                          Admin Group
                                        </a>
                                      </div>
                                      <div className="menu-item px-3">
                                        <a href="#" className="menu-link px-3">
                                          Staff Group
                                        </a>
                                      </div>
                                      <div className="menu-item px-3">
                                        <a href="#" className="menu-link px-3">
                                          Member Group
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="menu-item px-3">
                                    <a href="#" className="menu-link px-3">
                                      New Contact
                                    </a>
                                  </div>
                                  <div className="separator mt-3 opacity-75"></div>
                                  <div className="menu-item px-3">
                                    <div className="menu-content px-3 py-3">
                                      <a
                                        className="btn btn-primary btn-sm px-4"
                                        href="#"
                                      >
                                        Generate Reports
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="card-body py-0 px-0">
                              <ul className="nav d-flex justify-content-between mb-3 mx-9">
                                <li className="nav-item mb-3">
                                  <a
                                    className="nav-link btn btn-flex flex-center btn-active-danger btn-color-gray-600 btn-active-color-white rounded-2 w-45px h-35px active"
                                    data-bs-toggle="tab"
                                    id="nit_charts_widget_35_tab_1"
                                    href="#nit_charts_widget_35_tab_content_1"
                                  >
                                    1d
                                  </a>
                                </li>
                                <li className="nav-item mb-3">
                                  <a
                                    className="nav-link btn btn-flex flex-center btn-active-danger btn-color-gray-600 btn-active-color-white rounded-2 w-45px h-35px"
                                    data-bs-toggle="tab"
                                    id="nit_charts_widget_35_tab_2"
                                    href="#nit_charts_widget_35_tab_content_2"
                                  >
                                    5d
                                  </a>
                                </li>
                                <li className="nav-item mb-3">
                                  <a
                                    className="nav-link btn btn-flex flex-center btn-active-danger btn-color-gray-600 btn-active-color-white rounded-2 w-45px h-35px"
                                    data-bs-toggle="tab"
                                    id="nit_charts_widget_35_tab_3"
                                    href="#nit_charts_widget_35_tab_content_3"
                                  >
                                    1m
                                  </a>
                                </li>
                                <li className="nav-item mb-3">
                                  <a
                                    className="nav-link btn btn-flex flex-center btn-active-danger btn-color-gray-600 btn-active-color-white rounded-2 w-45px h-35px"
                                    data-bs-toggle="tab"
                                    id="nit_charts_widget_35_tab_4"
                                    href="#nit_charts_widget_35_tab_content_4"
                                  >
                                    6m
                                  </a>
                                </li>
                                <li className="nav-item mb-3">
                                  <a
                                    className="nav-link btn btn-flex flex-center btn-active-danger btn-color-gray-600 btn-active-color-white rounded-2 w-45px h-35px"
                                    data-bs-toggle="tab"
                                    id="nit_charts_widget_35_tab_5"
                                    href="#nit_charts_widget_35_tab_content_5"
                                  >
                                    1y
                                  </a>
                                </li>
                              </ul>

                              <div className="tab-content mt-n6">
                                <div
                                  className="tab-pane fade active show"
                                  id="nit_charts_widget_35_tab_content_1"
                                >
                                  <div className="table-responsive mx-9 mt-n6">
                                    <table className="table align-middle gs-0 gy-4">
                                      <thead>
                                        <tr>
                                          <th className="min-w-50px">Time</th>
                                          <th className="min-w-50px">Case</th>
                                          <th
                                            className="text-end min-w-50px pr-0"
                                            style={{ paddingRight: 0 }}
                                          >
                                            Transaction
                                          </th>
                                          <th className="text-end min-w-50px">
                                            Balance
                                          </th>
                                        </tr>
                                      </thead>

                                      <tbody>
                                        <tr>
                                          <td>
                                            <span className="text-gray-600 fw-bold fs-6">
                                              14:00
                                            </span>
                                          </td>
                                          <td>
                                            <a
                                              href="#"
                                              className="text-primary opacity-75-hover fs-6"
                                            >
                                              93252
                                            </a>
                                          </td>
                                          <td className="pe-0 text-end">
                                            <span className="fw-bold fs-6 text-danger">
                                              $ -118.50
                                            </span>
                                          </td>
                                          <td className="pe-0 text-end">
                                            <span className="text-gray-600 fw-bold fs-6">
                                              $1,898.81
                                            </span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <span className="text-gray-600 fw-bold fs-6">
                                              13:30
                                            </span>
                                          </td>
                                          <td>
                                            <a
                                              href="#"
                                              className="text-primary opacity-75-hover fs-6"
                                            >
                                              93252
                                            </a>
                                          </td>
                                          <td className="pe-0 text-end">
                                            <span className="fw-bold fs-6 text-danger">
                                              $ -128.33
                                            </span>
                                          </td>
                                          <td className="pe-0 text-end">
                                            <span className="text-gray-600 fw-bold fs-6">
                                              $2,017.32
                                            </span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <span className="text-gray-600 fw-bold fs-6">
                                              12:10
                                            </span>
                                          </td>
                                          <td>
                                            <a
                                              href="#"
                                              className="text-primary opacity-75-hover fs-6"
                                            >
                                              Fund
                                            </a>
                                          </td>
                                          <td className="pe-0 text-end">
                                            <span className="fw-bold fs-6 text-success">
                                              $ +500.00
                                            </span>
                                          </td>
                                          <td className="pe-0 text-end">
                                            <span className="text-gray-600 fw-bold fs-6">
                                              $2,145.65
                                            </span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <span className="text-gray-600 fw-bold fs-6">
                                              11:45
                                            </span>
                                          </td>
                                          <td>
                                            <a
                                              href="#"
                                              className="text-primary opacity-75-hover fs-6"
                                            >
                                              93252
                                            </a>
                                          </td>
                                          <td className="pe-0 text-end">
                                            <span className="fw-bold fs-6 text-danger">
                                              $ -108.15
                                            </span>
                                          </td>
                                          <td className="pe-0 text-end">
                                            <span className="text-gray-600 fw-bold fs-6">
                                              $1,645.65
                                            </span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <span className="text-gray-600 fw-bold fs-6">
                                              11:30
                                            </span>
                                          </td>
                                          <td>
                                            <a
                                              href="#"
                                              className="text-primary opacity-75-hover fs-6"
                                            >
                                              Refund
                                            </a>
                                          </td>
                                          <td className="pe-0 text-end">
                                            <span className="fw-bold fs-6 text-success">
                                              $ +27.20
                                            </span>
                                          </td>
                                          <td className="pe-0 text-end">
                                            <span className="text-gray-600 fw-bold fs-6">
                                              $1,753.80
                                            </span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td
                                            className="pe-0 text-end"
                                            colspan="4"
                                          >
                                            <a
                                              className="btn btn-sm btn-light"
                                              href="#"
                                            >
                                              Load More
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-8">
                          <div className="card card-flush h-md-100">
                            <div className="card-header pt-7">
                              <h3 className="card-title align-items-start flex-column">
                                <span className="card-label fw-bold text-gray-800">
                                  Open Cases
                                </span>
                                <span className="text-gray-500 mt-1 fw-semibold fs-6">
                                  Total 208 open cases
                                </span>
                              </h3>

                              <div className="card-toolbar">
                                <a href="" className="btn btn-sm btn-light">
                                  Filter
                                </a>
                              </div>
                            </div>

                            <div className="card-body pt-6">
                              <div className="table-responsive">
                                <table className="table table-row-dashed align-middle gs-0 gy-3 my-0">
                                  <thead>
                                    <tr className="fs-7 fw-bold text-gray-500 border-bottom-0">
                                      <th className="p-0 pb-3 min-w-175px text-start">
                                        CASE TITLE
                                      </th>
                                      <th className="p-0 pb-3 min-w-100px text-end pe-3">
                                        CASE DATE
                                      </th>
                                      <th className="p-0 pb-3 min-w-100px text-end">
                                        ESTIMATE
                                      </th>
                                      <th className="p-0 pb-3 min-w-150px text-end pe-7">
                                        STATUS
                                      </th>
                                      <th className="p-0 pb-3 w-100px text-end pe-1">
                                        TYPE
                                      </th>
                                      <th className="p-0 pb-3 w-50px text-end">
                                        VIEW
                                      </th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="d-flex justify-content-start flex-column">
                                            <a
                                              href="#"
                                              className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                                            >
                                              #144527
                                            </a>
                                            <span className="text-gray-500 fw-semibold d-block fs-7">
                                              George D. Ray
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="text-gray-600 fw-bold fs-6">
                                          06/24/2024
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="text-gray-600 fw-bold fs-6">
                                          $150
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="badge py-3 px-3 fs-7 badge-light-primary">
                                          In Process
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="badge badge-light-success fs-base">
                                          DL
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <a
                                          href="#"
                                          className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"
                                        >
                                          <i className="nit-dt nit-black-right fs-2 text-gray-500"></i>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="d-flex justify-content-start flex-column">
                                            <a
                                              href="#"
                                              className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                                            >
                                              #144511
                                            </a>
                                            <span className="text-gray-500 fw-semibold d-block fs-7">
                                              Robert I. Towns
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="text-gray-600 fw-bold fs-6">
                                          06/22/2024
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="text-gray-600 fw-bold fs-6">
                                          $120
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="badge py-3 px-3 fs-7 badge-light-primary">
                                          In Process
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="badge badge-light-success fs-base">
                                          DL
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <a
                                          href="#"
                                          className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"
                                        >
                                          <i className="nit-dt nit-black-right fs-2 text-gray-500"></i>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="d-flex justify-content-start flex-column">
                                            <a
                                              href="#"
                                              className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                                            >
                                              #144221
                                            </a>
                                            <span className="text-gray-500 fw-semibold d-block fs-7">
                                              Jason A. Scott
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="text-gray-600 fw-bold fs-6">
                                          06/20/2024
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="text-gray-600 fw-bold fs-6">
                                          $120
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="badge py-3 px-4 fs-7 badge-light-warning">
                                          On Hold
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="badge badge-light-success fs-base">
                                          DL
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <a
                                          href="#"
                                          className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"
                                        >
                                          <i className="nit-dt nit-black-right fs-2 text-gray-500"></i>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="d-flex justify-content-start flex-column">
                                            <a
                                              href="#"
                                              className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                                            >
                                              #144210
                                            </a>
                                            <span className="text-gray-500 fw-semibold d-block fs-7">
                                              Eduardo M. Reyes
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="text-gray-600 fw-bold fs-6">
                                          05/20/2024
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="text-gray-600 fw-bold fs-6">
                                          $145
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="badge py-3 px-3 fs-7 badge-light-primary">
                                          In Process
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="badge badge-light-success fs-base">
                                          MED
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <a
                                          href="#"
                                          className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"
                                        >
                                          <i className="nit-dt nit-black-right fs-2 text-gray-500"></i>
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <div className="d-flex align-items-center">
                                          <div className="d-flex justify-content-start flex-column">
                                            <a
                                              href="#"
                                              className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                                            >
                                              #142115
                                            </a>
                                            <span className="text-gray-500 fw-semibold d-block fs-7">
                                              Ronald J. Taggart
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="text-gray-600 fw-bold fs-6">
                                          05/19/2024
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="text-gray-600 fw-bold fs-6">
                                          $160
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="badge py-3 px-4 fs-7 badge-light-warning">
                                          On Hold
                                        </span>
                                      </td>
                                      <td className="text-end pe-0">
                                        <span className="badge badge-light-success fs-base">
                                          DL
                                        </span>
                                      </td>
                                      <td className="text-end">
                                        <a
                                          href="#"
                                          className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"
                                        >
                                          <i className="nit-dt nit-black-right fs-2 text-gray-500"></i>
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row g-5 g-xl-10">
                        <div className="col-xl-4">
                          <div className="card h-md-100" dir="ltr">
                            <div className="card-body d-flex flex-column flex-center">
                              <div className="mb-2">
                                <h1 className="fw-semibold text-gray-800 text-center lh-lg">
                                  Have your tired getting low fund
                                  notifications?{" "}
                                  <span className="fw-bolder">
                                    {" "}
                                    Schedule Auto Pay
                                  </span>
                                </h1>

                                <div className="py-10 text-center">
                                  <img
                                    src={autopay}
                                    className="theme-light-show w-200px"
                                    alt=""
                                  />
                                </div>
                              </div>

                              <div className="text-center mb-1">
                                <a
                                  className="btn btn-sm btn-primary me-2"
                                  data-bs-target="#modal_new_card"
                                  data-bs-toggle="modal"
                                >
                                  <i className="la la-credit-card fs-2"></i> Add
                                  Card
                                </a>
                                <a className="btn btn-sm btn-light" href="">
                                  <i className="la la-cc-visa fs-2"></i> Manage
                                  Auto-Pay
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-8">
                          <div className="card h-md-100">
                            <div className="card-header position-relative py-0 border-bottom-1">
                              <h3 className="card-title text-gray-800 fw-bold">
                                Upcoming Deliveries
                              </h3>

                              <ul className="nav nav-stretch nav-pills nav-pills-custom d-flex mt-4">
                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn btn-color-gray-500 flex-center px-3 active"
                                    data-timeline-widget-4="tab"
                                    data-bs-toggle="tab"
                                    href="#nit_timeline_widget_4_tab_day"
                                  >
                                    <span className="nav-text fw-semibold fs-4 mb-3">
                                      Day
                                    </span>
                                    <span className="bullet-custom position-absolute z-index-2 w-100 h-1px top-100 bottom-n100 bg-primary rounded"></span>
                                  </a>
                                </li>

                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn btn-color-gray-500 flex-center px-3"
                                    data-timeline-widget-4="tab"
                                    data-bs-toggle="tab"
                                    href=""
                                  >
                                    <span className="nav-text fw-semibold fs-4 mb-3">
                                      Week
                                    </span>
                                    <span className="bullet-custom position-absolute z-index-2 w-100 h-1px top-100 bottom-n100 bg-primary rounded"></span>
                                  </a>
                                </li>

                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn btn-color-gray-500 flex-center px-3"
                                    data-timeline-widget-4="tab"
                                    data-bs-toggle="tab"
                                    href=""
                                  >
                                    <span className="nav-text fw-semibold fs-4 mb-3">
                                      Month
                                    </span>
                                    <span className="bullet-custom position-absolute z-index-2 w-100 h-1px top-100 bottom-n100 bg-primary rounded"></span>
                                  </a>
                                </li>

                                <li className="nav-item p-0 ms-0">
                                  <a
                                    className="nav-link btn btn-color-gray-500 flex-center px-3"
                                    data-timeline-widget-4="tab"
                                    data-bs-toggle="tab"
                                    href=""
                                  >
                                    <span className="nav-text fw-semibold fs-4 mb-3">
                                      Year
                                    </span>
                                    <span className="bullet-custom position-absolute z-index-2 w-100 h-1px top-100 bottom-n100 bg-primary rounded"></span>
                                  </a>
                                </li>
                              </ul>
                            </div>

                            <div className="card-body pb-0">
                              <div className="tab-content">
                                <div className="table-responsive">
                                  <table className="table table-row-dashed align-middle gs-0 gy-3 my-0">
                                    <thead>
                                      <tr className="fs-7 fw-bold text-gray-500 border-bottom-0">
                                        <th className="p-0 pb-3 min-w-175px text-start">
                                          CASE TITLE
                                        </th>
                                        <th className="p-0 pb-3 min-w-100px text-end pe-3">
                                          CASE DATE
                                        </th>
                                        <th className="p-0 pb-3 min-w-100px text-end pe-4">
                                          DUE DATE
                                        </th>
                                        <th className="p-0 pb-3 min-w-150px text-end pe-7">
                                          STATUS
                                        </th>
                                        <th className="p-0 pb-3 w-100px text-end pe-1">
                                          TYPE
                                        </th>
                                        <th className="p-0 pb-3 w-50px text-end">
                                          VIEW
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="d-flex justify-content-start flex-column">
                                              <a
                                                href="#"
                                                className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                                              >
                                                #144527
                                              </a>
                                              <span className="text-gray-500 fw-semibold d-block fs-7">
                                                George D. Ray
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="text-gray-600 fw-bold fs-6">
                                            06/24/2024
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="text-gray-600 fw-bold fs-6">
                                            06/26/2024
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="badge py-3 px-3 fs-7 badge-light-primary">
                                            In Process
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="badge badge-light-success fs-base">
                                            DL
                                          </span>
                                        </td>
                                        <td className="text-end">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"
                                          >
                                            <i className="nit-dt nit-black-right fs-2 text-gray-500"></i>
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="d-flex justify-content-start flex-column">
                                              <a
                                                href="#"
                                                className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                                              >
                                                #144511
                                              </a>
                                              <span className="text-gray-500 fw-semibold d-block fs-7">
                                                Robert I. Towns
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="text-gray-600 fw-bold fs-6">
                                            06/22/2024
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="text-gray-600 fw-bold fs-6">
                                            06/26/2024
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="badge py-3 px-3 fs-7 badge-light-primary">
                                            In Process
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="badge badge-light-success fs-base">
                                            DL
                                          </span>
                                        </td>
                                        <td className="text-end">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"
                                          >
                                            <i className="nit-dt nit-black-right fs-2 text-gray-500"></i>
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="d-flex justify-content-start flex-column">
                                              <a
                                                href="#"
                                                className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                                              >
                                                #144221
                                              </a>
                                              <span className="text-gray-500 fw-semibold d-block fs-7">
                                                Jason A. Scott
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="text-gray-600 fw-bold fs-6">
                                            06/20/2024
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="text-gray-600 fw-bold fs-6">
                                            06/26/2024
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="badge py-3 px-4 fs-7 badge-light-warning">
                                            On Hold
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="badge badge-light-success fs-base">
                                            DL
                                          </span>
                                        </td>
                                        <td className="text-end">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"
                                          >
                                            <i className="nit-dt nit-black-right fs-2 text-gray-500"></i>
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="d-flex justify-content-start flex-column">
                                              <a
                                                href="#"
                                                className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                                              >
                                                #144210
                                              </a>
                                              <span className="text-gray-500 fw-semibold d-block fs-7">
                                                Eduardo M. Reyes
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="text-gray-600 fw-bold fs-6">
                                            05/20/2024
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="text-gray-600 fw-bold fs-6">
                                            06/26/2024
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="badge py-3 px-3 fs-7 badge-light-primary">
                                            In Process
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="badge badge-light-success fs-base">
                                            MED
                                          </span>
                                        </td>
                                        <td className="text-end">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"
                                          >
                                            <i className="nit-dt nit-black-right fs-2 text-gray-500"></i>
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="d-flex align-items-center">
                                            <div className="d-flex justify-content-start flex-column">
                                              <a
                                                href="#"
                                                className="text-gray-800 fw-bold text-hover-primary mb-1 fs-6"
                                              >
                                                #142115
                                              </a>
                                              <span className="text-gray-500 fw-semibold d-block fs-7">
                                                Ronald J. Taggart
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="text-gray-600 fw-bold fs-6">
                                            05/19/2024
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="text-gray-600 fw-bold fs-6">
                                            06/26/2024
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="badge py-3 px-4 fs-7 badge-light-warning">
                                            On Hold
                                          </span>
                                        </td>
                                        <td className="text-end pe-0">
                                          <span className="badge badge-light-success fs-base">
                                            DL
                                          </span>
                                        </td>
                                        <td className="text-end">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary w-30px h-30px"
                                          >
                                            <i className="nit-dt nit-black-right fs-2 text-gray-500"></i>
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div id="nit_app_footer" className="app-footer">
                      <div className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
                        <div className="text-gray-900 order-2 order-md-1">
                          <span className="text-muted fw-semibold me-1">
                            2024©
                          </span>
                          <a
                            href="https://www.neuralit.com"
                            target="_blank"
                            className="text-gray-800 text-hover-primary"
                          >
                            Neural IT
                          </a>
                        </div>

                        <ul className="menu menu-gray-600 menu-hover-primary fw-semibold order-1">
                          <li className="menu-item">
                            <a
                              href="https://www.neuralit.com/about-us"
                              target="_blank"
                              className="menu-link px-2"
                            >
                              About
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="https://www.neuralit.com/terms-of-use"
                              target="_blank"
                              className="menu-link px-2"
                            >
                              Terms of Use
                            </a>
                          </li>
                          <li className="menu-item">
                            <a
                              href="https://www.neuralit.com/privacy-statement"
                              target="_blank"
                              className="menu-link px-2"
                            >
                              Privacy Statement
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>*

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
