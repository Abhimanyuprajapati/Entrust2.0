import { bannerData } from "./bannerdata";
import toast, { Toaster } from "react-hot-toast";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import accreditation from "../../assets/allphoto/Accreditation.png";
import neural from "../../assets/allphoto/neural.png";
import centure from "../../assets/allphoto/20centure.png";

const API_URL = "http://10.10.7.81:8000/auth";

export const Entrust = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [forgot, setForgot] = useState(true);
  const [forgotemail, setForgotemail] = useState({ email: "" });
  const [register, setRegister] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (forgot) {
      setCredentials((prev) => ({ ...prev, [name]: value }));
    } else {
      setForgotemail((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateCredentials = ({ email, password }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (forgot && (!password || password.includes(" "))) {
      toast.error("Password cannot be empty or contain spaces");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCredentials(credentials)) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const json = await response.json();
      console.log("Response status:", response.status);
      console.log("Response JSON:", json);

      if (response.ok) {
        toast.success(json.message || "Login successful!");
        setTimeout(() => navigate("/dashboard"), 500);
      } else {
        toast.error(json.message || "Enter valid credentials");
      }
    } catch (error) {
      toast.error(`Connection error: ${error.message}`);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    if (!validateEmail(forgotemail.email)) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(forgotemail),
      });

      const json = await response.json();
      console.log("Response status:", response.status);
      console.log("Response JSON:", json);

      if (response.ok) {
        toast.success(json.message || "Reset instructions sent to email");
        setTimeout(() => navigate("/"), 500);
      } else {
        toast.error(json.message || "Enter a valid email");
      }
    } catch (error) {
      toast.error(`Connection error: ${error.message}`);
    }
  };

  const toggleForgotPassword = () => setForgot((prev) => !prev);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const [registerCredentials, setRegisterCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validateRegister = () => {
    let isValid = true;
    let errors = {};

    if (!registerCredentials.name.trim() || registerCredentials.name.trim().length < 2) {
      errors.name = "Name is required and must be at least 2 characters long";
      isValid = false;
      nameRef.current.scrollIntoView({ behavior: "smooth" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!registerCredentials.email) {
      errors.email = "Email is required";
      isValid = false;
      if (isValid) emailRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (!emailRegex.test(registerCredentials.email)) {
      errors.email = "Email is not valid";
      isValid = false;
      if (isValid) emailRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (!registerCredentials.password) {
      errors.password = "Password is required";
      isValid = false;
      if (isValid) passwordRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (registerCredentials.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
      if (isValid) passwordRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (/\s/.test(registerCredentials.password)) {
      errors.password = "Password must not contain spaces";
      isValid = false;
      if (isValid) passwordRef.current.scrollIntoView({ behavior: "smooth" });
    }

    setErrors(errors);
    return isValid;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegister()) {
      return;
    }
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerCredentials.name,
          email: registerCredentials.email,
          password: registerCredentials.password,
        }),
      });

      const json = await response.json();
      console.log("Response status:", response.status);
      console.log("Response JSON:", json);

      if (response.ok) {
        toast.success(json.message || "Registration successful!");
        setTimeout(() => {
            setRegister(true)
        }, 500);
      } else {
        toast.error(json.detail || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const onRegisterChange = (event) => {
    setRegisterCredentials({ ...registerCredentials, [event.target.name]: event.target.value });
  };

  const handleRegisterPage=()=>{
    setRegister(false)
  }

  const handleSignInPage =()=>{
    setRegister(true)
  }

  return (
    <>
      <div className="entrustPage">
        <div className="entrustHeader">
          <header>
            <span><img src={neural} width={200} height={100} alt="neural" className="neuralImg" /></span>
            <span><img src={centure} width={100} height={100} alt="centure" className="centureImg" /></span>
          </header>
        </div>

        <div className="entrustMain">
          {/* left side */}
          <div className="entrustCarousel">
            <div className="">
              <h1>Entrust 2.0</h1>
            </div>
            <div className="">
              <Carousel
                responsive={responsive}
                swipeable={false}
                draggable={false}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
              >
                {bannerData.map((item) => (
                  <div className="Carouseltextbox" key={item.id}>
                    <div className="Carouseltextmain">
                      <p>{item.text}</p>
                    </div>
                    <img
                      src={item.url}
                      alt="Banner"
                      width={900}
                      height={450}
                      className="Banner"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          {/* right side */}
          <div className="entrustLogin">
            {register ? (
              <>
                <div>
                  <form className="form w-100" onSubmit={forgot ? handleSubmit : handleForgot}>
                    {/* Heading */}
                    <div className="text-center mb-10">
                      <h1 className="text-gray-900 mb-3">{forgot ? "Sign In to Entrust" : "Forgot Password?"}</h1>
                      {forgot && (
                        <div className="text-gray-500 fw-semibold fs-4">
                          New Here? <Link onClick={handleRegisterPage} className="link-primary fw-bold">Create an Account</Link>
                        </div>
                      )}
                    </div>

                    {/* Input group: Email */}
                    <div className="fv-row mb-10">
                      <label className="form-label fs-6 fw-bold text-gray-900">Email</label>
                      <input
                        className="form-control form-control-lg form-control-solid"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={forgot ? credentials.email : forgotemail.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Input group: Password (only for login) */}
                    {forgot && (
                      <div className="fv-row mb-10">
                        <div className="d-flex flex-stack mb-2">
                          <label className="form-label fw-bold text-gray-900 fs-6 mb-0">Password</label>
                          <Link onClick={toggleForgotPassword} className="link-primary fs-6 fw-bold">Forgot Password?</Link>
                        </div>
                        <input
                          className="form-control form-control-lg form-control-solid"
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={credentials.password}
                          onChange={handleChange}
                          autoComplete="off"
                          required
                        />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="text-center">
                      <button className="btn btn-lg btn-primary w-100 mb-5">
                        <span className="indicator-label">{forgot ? "Continue" : "Submit"}</span>
                      </button>
                      {!forgot && (
                        <button type="button" className="btn btn-lg btn-light-primary fw-bold" onClick={toggleForgotPassword}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="accreditation">
                  <img src={accreditation} alt="Accreditation" width={500} height={100} className="accreditationimg" />
                </div>

                <div className="d-flex flex-center flex-wrap fs-6 p-5 pb-0 footer-mobile">
                  <div className="d-flex flex-center fw-semibold fs-6">
                    <a href="https://www.neuralit.com/about-us" className="text-muted text-hover-primary px-2" target="_blank" rel="noopener noreferrer">About</a>
                    <a href="https://www.neuralit.com/terms-of-use" className="text-muted text-hover-primary px-2" target="_blank" rel="noopener noreferrer">Terms of Use</a>
                    <a href="https://www.neuralit.com/privacy-statement" className="text-muted text-hover-primary px-2" target="_blank" rel="noopener noreferrer">Privacy Statement</a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <form
                    className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
                    onSubmit={handleRegisterSubmit}
                  >
                    <div className="mb-10 text-center">
                      <h1 className="text-gray-900 mb-3">Create an Account</h1>
                      &nbsp;&nbsp;
                      <div className="text-gray-500 fw-semibold fs-4">
                        Already have an account? &nbsp;&nbsp;
                        <Link onClick={handleSignInPage} className="link-primary fw-bold">
                          Sign in here
                        </Link>
                      </div>
                    </div>

                    {/* new section */}
                    <div className="alert alert-dark">
                      <div className="fv-row mb-10 fv-plugins-icon-container ">
                        <p
                          className="alert alert-dark bg-primary"
                          style={{ background: "#30a6b6;" }}
                        >
                          Account Information
                        </p>
                      </div>
                      <div className="row fv-row mb-7 fv-plugins-icon-container">
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            User Name *
                          </label>
                          <input
                            placeholder="enter user name"
                            className="form-control form-control-lg form-control-solid"
                            type="name"
                            name="name"
                            required
                            value={registerCredentials.name}
                            onChange={onRegisterChange}
                            autoComplete="off"
                            ref={nameRef}
                          />
                          {errors.name && (
                            <p style={{ color: "red" }}>{errors.name}</p>
                          )}
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            E-mail Address *
                          </label>
                          <input
                            placeholder="Enter Email"
                            className="form-control form-control-lg form-control-solid"
                            type="email"
                            name="email"
                            value={registerCredentials.email}
                            onChange={onRegisterChange}
                            required
                            autoComplete="off"
                            ref={emailRef}
                          />
                          {errors.email && (
                            <p style={{ color: "red" }}>{errors.email}</p>
                          )}
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>
                      <div className="row fv-row mb-7 fv-plugins-icon-container">
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Full Name *
                          </label>
                          <input
                            placeholder="enter full name"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="first-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Job Title
                          </label>
                          <input
                            placeholder="enter title"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="last-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>

                      <div className="fv-row mb-10 fv-plugins-icon-container">
                        <label className="form-check form-check-custom form-check-solid form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="toc"
                            onFocus={(e) => {
                              e.target.style.border = "1px solid black";
                              e.target.style.padding = "1px";
                              e.target.style.boxShadow =
                                "0 0 5px rgba(0, 0, 0, 0.5)";
                            }}
                            onBlur={(e) => {
                              e.target.style.border = "";
                              e.target.style.padding = "";
                              e.target.style.boxShadow = "";
                            }}
                          />
                          <span className="form-check-label fw-semibold text-gray-700 fs-6">
                            I am Authorized Signatory
                          </span>
                        </label>
                        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                      </div>

                      <div className="row fv-row mb-7 fv-plugins-icon-container">
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Authorized Signatory Fullname
                          </label>
                          <input
                            placeholder="enter authorized signatory fullname"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="first-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Authorized Signatory Job Title
                          </label>
                          <input
                            placeholder="enter authorized signatory job title"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="last-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>

                      <div className="row fv-row mb-7 fv-plugins-icon-container">
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Authorized Signatory E-MAIL ADDRESS
                          </label>
                          <input
                            placeholder="enter authorized signatory email address"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="last-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>
                    </div>

                    {/* new section */}
                    <div className="alert alert-dark fv-row mb-10 ">
                      <div className="fv-row mb-10 fv-plugins-icon-container">
                        <p
                          className="alert alert-dark bg-primary"
                          style={{ background: "#f4f4f4" }}
                        >
                          Organization Details
                        </p>
                      </div>
                      <div className="row fv-row mb-10 fv-plugins-icon-container">
                        <div className="col-xl-10">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Organization/Firm
                          </label>
                          <input
                            placeholder="enter organization/firm"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="first-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>

                      <div className="row fv-row mb-7 fv-plugins-icon-container">
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Address Line1
                          </label>
                          <input
                            placeholder="enter address"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="first-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Address Line2
                          </label>
                          <input
                            placeholder="enter address"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="last-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>

                      <div className="row fv-row mb-7 fv-plugins-icon-container">
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Postal Code
                          </label>
                          <input
                            placeholder="enter postal code"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="first-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Country
                          </label>
                          <input
                            placeholder="enter country"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="last-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>

                      <div className="row fv-row mb-7 fv-plugins-icon-container">
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            State
                          </label>
                          <input
                            placeholder="enter state"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="first-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            City
                          </label>
                          <input
                            placeholder="enter city"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="last-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>

                      <div className="row fv-row mb-7 fv-plugins-icon-container">
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Contact No
                          </label>
                          <input
                            placeholder="enter contact no."
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="first-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Website
                          </label>
                          <input
                            placeholder="enter website"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="last-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>
                    </div>

                    {/* new section */}
                    <div className="alert alert-dark">
                      <div className="fv-row mb-10 fv-plugins-icon-container">
                        <p
                          className="alert alert-dark fs-8 bg-primary"
                          style={{ background: "#f4f4f4" }}
                        >
                          Activation Code / Promo Code
                        </p>
                      </div>

                      <div className="row fv-row mb-7 fv-plugins-icon-container">
                        <div className="col-xl-6">
                          <label className="form-label fw-bold text-gray-900 fs-6">
                            Activation Code / Promo Code
                          </label>
                          <input
                            placeholder="enter code"
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            name="first-name"
                            autoComplete="off"
                          />
                          <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                        </div>
                      </div>
                    </div>

                    {/* new section */}
                    <div className="alert alert-dark">
                      <div className="fv-row mb-10 fv-plugins-icon-container">
                        <p
                          className="alert alert-dark fs-8 bg-primary"
                          style={{ background: "#f4f4f4" }}
                        >
                          Privacy{" "}
                        </p>
                      </div>

                      <div className="fv-row mb-10 fv-plugins-icon-container">
                        <label className="form-check form-check-custom form-check-solid form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="toc"
                            onFocus={(e) => {
                              e.target.style.border = "1px solid black";
                              e.target.style.padding = "1px";
                              e.target.style.boxShadow =
                                "0 0 5px rgba(0, 0, 0, 0.5)";
                            }}
                            onBlur={(e) => {
                              e.target.style.border = "";
                              e.target.style.padding = "";
                              e.target.style.boxShadow = "";
                            }}
                          />
                          <span className="form-check-label fw-semibold text-gray-700 fs-6">
                            I agree to receive communications from Neural IT*{" "}
                            <br />
                            By agreeing, you consent to allow Neural IT to store
                            and process the personal information submitted above
                            to provide you the content requested.
                          </span>
                        </label>
                        <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                      </div>
                    </div>

                    {/* this is bottom */}
                    <div
                      className="mb-10 fv-row fv-plugins-icon-container"
                      data-nit-password-meter="true"
                    >
                      <div className="mb-1">
                        <label className="form-label fw-bold text-gray-900 fs-6">
                          Create Password *
                        </label>
                        <div className="position-relative mb-3">
                          <input
                            placeholder="create password"
                            className="form-control form-control-lg form-control-solid"
                            type="password"
                            name="password"
                            value={registerCredentials.password}
                            onChange={onRegisterChange}
                            required="required"
                            autoComplete="off"
                            ref={passwordRef}
                          />
                          {errors.password && (
                            <p style={{ color: "red" }}>{errors.password}</p>
                          )}
                          <span
                            className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                            data-nit-password-meter-control="visibility"
                          >
                            <i className="nit_dt nit-eye-slash fs-2"></i>
                            <i className="nit_dt nit-eye fs-2 d-none"></i>
                          </span>
                        </div>
                        <div
                          className="d-flex align-items-center mb-3"
                          data-nit-password-meter-control="highlight"
                        >
                          <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                          <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                          <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                          <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
                        </div>
                      </div>
                      <div className="text-muted">
                        Use 8 or more characters with a mix of letters, numbers
                        & symbols.
                      </div>
                      <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback"></div>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        id="nit_sign_up_submit"
                        className="btn btn-lg btn-primary"
                      >
                        <span className="indicator-label">
                          Create new account
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
