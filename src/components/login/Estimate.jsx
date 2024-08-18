
import React, { useState } from "react";
import ReactDOM from "react-dom";

export const Estimate = ({onClose}) => {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    services: [],
    pages: 0,
    addOns: [],
    deliveryType: 0,
  });

  const handleServiceChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevState) => {
      const newServices = checked
        ? [...prevState.services, value]
        : prevState.services.filter((service) => service !== value);
      return { ...prevState, services: newServices };
    });
  };

  const handleAddOnChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevState) => {
      const newAddOns = checked
        ? [...prevState.addOns, value]
        : prevState.addOns.filter((addOn) => addOn !== value);
      return { ...prevState, addOns: newAddOns };
    });
  };

  const handleDeliveryChange = (event) => {
    setFormData({ ...formData, deliveryType: event.target.value });
  };

  const handlePagesChange = (event) => {
    setFormData({ ...formData, pages: event.target.value });
  };

  const calculateTotalEstimate = () => {
    const serviceCost = formData.services.reduce(
      (total, service) => total + parseFloat(service),
      0
    );
    const addOnCost = formData.addOns.reduce(
      (total, addOn) => total + parseFloat(addOn),
      0
    );
    const pages = parseFloat(formData.pages);
    const deliveryCost = parseFloat(formData.deliveryType);
    return (serviceCost + addOnCost) * pages + deliveryCost;
  };

  const navigate = (direction) => {
    if (direction === 1 && step < 5) {
      setStep(step + 1);
    } else if (direction === -1 && step > 1) {
      setStep(step - 1);
    }
  };
  
  return (
    <>
      <div className="modal show" style={{ display: "block" }} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered mw-900px">

        {/* <div className="modal-content">
          <div className="modal-header">
            <h2>Estimate your Medical Review Cost Today!</h2>
            <button
              className="btn btn-sm btn-icon btn-active-color-primary"
              onClick={onClose}
            >
              <i className="nit-dt nit-cross fs-1"></i>
            </button>
          </div>

          <div className="modal-body py-lg-10 px-lg-10">
           
            <div className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid">
              <div className="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px">
                <div className="stepper-nav ps-lg-10">
                  <div className="stepper-item current">
                    <div className="stepper-wrapper">
                      <div className="stepper-icon w-40px h-40px">
                        <i className="nit-dt nit-check stepper-check fs-2"></i>
                        <span className="stepper-number">1</span>
                      </div>
                      <div className="stepper-label">
                        <h3 className="stepper-title">Desired Services</h3>
                        <div className="stepper-desc">Select service type</div>
                      </div>
                    </div>
                    <div className="stepper-line h-40px"></div>
                  </div>

                  <div className="stepper-item">
                    <div className="stepper-wrapper">
                      <div className="stepper-icon w-40px h-40px">
                        <i className="nit-dt nit-check stepper-check fs-2"></i>
                        <span className="stepper-number">2</span>
                      </div>
                      <div className="stepper-label">
                        <h3 className="stepper-title">Pages</h3>
                        <div className="stepper-desc">Enter number of pages</div>
                      </div>
                    </div>
                    <div className="stepper-line h-40px"></div>
                  </div>

                  
                </div>
              </div>

              <div className="flex-row-fluid py-lg-5 px-lg-15">
                <form className="form fv-plugins-bootstrap5 fv-plugins-framework">
                  <div className="current" data-nit-stepper-element="content">
                    <div className="w-100">
                      <div className="fv-row mb-10 fv-plugins-icon-container">
                        <label className="required fs-5 fw-semibold mb-2">
                          Please select desired services
                        </label>

                        <label className="d-flex flex-stack mb-5 cursor-pointer">
                          <span className="d-flex align-items-center me-2">
                            <span className="symbol symbol-50px me-6">
                              <span className="symbol-label bg-light-primary">
                                <i className="nit-dt nit-sort fs-1 text-primary"></i>
                              </span>
                            </span>
                            <span className="d-flex flex-column">
                              <span className="fw-bold fs-6">
                                Sectioning/Sorting Medical Records
                              </span>
                              <span className="fs-7 text-muted">
                                Sectioning/Sorting will be calculated at $0.10
                                per page
                              </span>
                            </span>
                          </span>
                          <span className="form-check form-check-custom form-check-solid">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="calc_sectioning"
                              value="0.10"
                            />
                          </span>
                        </label>

                      
                      </div>
                    </div>
                  </div>
                 
                </form>
              </div>
            </div>
          </div>
        </div> */}



        <div className="modal-content">
        <div className="modal-header">
            <h2>Estimate your Medical Review Cost Today!</h2>
            <button
              className="btn btn-sm btn-icon btn-active-color-primary"
              onClick={onClose}
            >
              <i className="nit-dt nit-cross fs-1"></i>
            </button>
          </div>

                    <div className="modal-body py-lg-10 px-lg-10">
                      <div
                        className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
                        id="nit_modal_create_app_stepper"
                      >
                        <div className="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px">
                          <div className="stepper-nav ps-lg-10">
                            <div
                              className={`stepper-item ${step === 1 ? "current" : ""}`}
                              id="nav-stepper-1"
                            >
                              <div className="stepper-wrapper">
                                <div className="stepper-icon w-40px h-40px">
                                  <i className="nit-dt nit-check stepper-check fs-2"></i>
                                  <span className="stepper-number">1</span>
                                </div>
                                <div className="stepper-label">
                                  <h3 className="stepper-title">Desired Services</h3>
                                  <div className="stepper-desc">Select service type</div>
                                </div>
                              </div>
                              <div className="stepper-line h-40px"></div>
                            </div>

                            <div
                              className={`stepper-item ${step === 2 ? "current" : ""}`}
                              id="nav-stepper-2"
                            >
                              <div className="stepper-wrapper">
                                <div className="stepper-icon w-40px h-40px">
                                  <i className="nit-dt nit-check stepper-check fs-2"></i>
                                  <span className="stepper-number">2</span>
                                </div>
                                <div className="stepper-label">
                                  <h3 className="stepper-title">Pages</h3>
                                  <div className="stepper-desc">Enter number of pages</div>
                                </div>
                              </div>
                              <div className="stepper-line h-40px"></div>
                            </div>

                            <div
                              className={`stepper-item ${step === 3 ? "current" : ""}`}
                              id="nav-stepper-3"
                            >
                              <div className="stepper-wrapper">
                                <div className="stepper-icon w-40px h-40px">
                                  <i className="nit-dt nit-check stepper-check fs-2"></i>
                                  <span className="stepper-number">3</span>
                                </div>
                                <div className="stepper-label">
                                  <h3 className="stepper-title">Add-on Services</h3>
                                  <div className="stepper-desc">
                                    Select additional services
                                  </div>
                                </div>
                              </div>
                              <div className="stepper-line h-40px"></div>
                            </div>

                            <div
                              className={`stepper-item ${step === 4 ? "current" : ""}`}
                              id="nav-stepper-4"
                            >
                              <div className="stepper-wrapper">
                                <div className="stepper-icon w-40px h-40px">
                                  <i className="nit-dt nit-check stepper-check fs-2"></i>
                                  <span className="stepper-number">4</span>
                                </div>
                                <div className="stepper-label">
                                  <h3 className="stepper-title">Delivery Type</h3>
                                  <div className="stepper-desc">
                                    Select priority of work
                                  </div>
                                </div>
                              </div>
                              <div className="stepper-line h-40px"></div>
                            </div>

                            <div
                              className={`stepper-item ${step === 5 ? "current" : ""}`}
                              id="nav-stepper-5"
                            >
                              <div className="stepper-wrapper">
                                <div className="stepper-icon w-40px h-40px">
                                  <i className="nit-dt nit-check stepper-check fs-2"></i>
                                  <span className="stepper-number">5</span>
                                </div>
                                <div className="stepper-label">
                                  <h3 className="stepper-title">Total Estimation</h3>
                                  <div className="stepper-desc">
                                    Calculated based on input
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex-row-fluid py-lg-5 px-lg-15">
                          <form className="form">
                            {step === 1 && (
                              <div id="nav-content-1">
                                <div className="w-100">
                                  <div className="fv-row mb-10">
                                    <label className="required fs-5 fw-semibold mb-2">
                                      Please select desired services
                                    </label>
                                    <label className="d-flex flex-stack mb-5 cursor-pointer">
                                      <span className="d-flex align-items-center me-2">
                                        <span className="symbol symbol-50px me-6">
                                          <span className="symbol-label bg-light-primary">
                                            <i className="nit-dt nit-sort fs-1 text-primary"></i>
                                          </span>
                                        </span>
                                        <span className="d-flex flex-column">
                                          <span className="fw-bold fs-6">
                                            Sectioning/Sorting Medical Records
                                          </span>
                                          <span className="fs-7 text-muted">
                                            Sectioning/Sorting will be calculated at $0.10
                                            per page
                                          </span>
                                        </span>
                                      </span>
                                      <span className="form-check form-check-custom form-check-solid">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="calc_sectioning"
                                          value="0.10"
                                          onChange={handleServiceChange}
                                        />
                                      </span>
                                    </label>

                                    <label className="d-flex flex-stack mb-5 cursor-pointer">
                                      <span className="d-flex align-items-center me-2">
                                        <span className="symbol symbol-50px me-6">
                                          <span className="symbol-label bg-light-danger">
                                            <i className="nit-dt nit-bookmark fs-1 text-danger"></i>
                                          </span>
                                        </span>
                                        <span className="d-flex flex-column">
                                          <span className="fw-bold fs-6">
                                            Hyperlinked Index Report
                                          </span>
                                          <span className="fs-7 text-muted">
                                            Including of hyperlinked index will cost you
                                            $0.10 per page
                                          </span>
                                        </span>
                                      </span>
                                      <span className="form-check form-check-custom form-check-solid">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="calc_hyperlink"
                                          value="0.10"
                                          onChange={handleServiceChange}
                                        />
                                      </span>
                                    </label>

                                  
                                  </div>
                                </div>
                              </div>
                            )}

                            {step === 2 && (
                              <div id="nav-content-2">
                                <div className="w-100">
                                  <div className="fv-row mb-10">
                                    <label className="required fs-5 fw-semibold mb-2">
                                      Number of Pages
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control form-control-lg form-control-solid"
                                      id="number_of_pages"
                                      value={formData.pages}
                                      onChange={handlePagesChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {step === 3 && (
                              <div id="nav-content-3">
                                <div className="w-100">
                                  <div className="fv-row mb-10">
                                    <label className="required fs-5 fw-semibold mb-2">
                                      Please select Add-on services
                                    </label>

                                    <label className="d-flex flex-stack mb-5 cursor-pointer">
                                      <span className="d-flex align-items-center me-2">
                                        <span className="fw-bold fs-6">
                                          Demonstrative Medical Image
                                        </span>
                                      </span>
                                      <span className="form-check form-check-custom form-check-solid">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id="calc_demonstrative"
                                          value="2.00"
                                          onChange={handleAddOnChange}
                                        />
                                      </span>
                                    </label>

                            
                                  </div>
                                </div>
                              </div>
                            )}

                            {step === 4 && (
                              <div id="nav-content-4">
                                <div className="w-100">
                                  <div className="fv-row mb-10">
                                    <label className="fs-5 fw-semibold mb-4">
                                      <span className="required">Delivery Type</span>
                                    </label>

                                    <label className="d-flex flex-stack cursor-pointer mb-5">
                                      <span className="d-flex align-items-center me-2">
                                        <span className="symbol symbol-50px me-6">
                                          <span className="symbol-label bg-light-danger">
                                            <i className="nit-dt nit-delivery-time bg-light-danger fs-2x"></i>
                                          </span>
                                        </span>
                                        <span className="d-flex flex-column">
                                          <span className="fw-bold fs-6">
                                            Standard Delivery
                                          </span>
                                          <span className="fs-7 text-muted">
                                            Usually takes around 5-7 days
                                          </span>
                                        </span>
                                      </span>
                                      <span className="form-check form-check-custom form-check-solid">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="delivery_type"
                                          value="0"
                                          onChange={handleDeliveryChange}
                                          defaultChecked
                                        />
                                      </span>
                                    </label>

                                    <label className="d-flex flex-stack cursor-pointer mb-5">
                                      <span className="d-flex align-items-center me-2">
                                        <span className="symbol symbol-50px me-6">
                                          <span className="symbol-label bg-light-success">
                                            <i className="nit-dt nit-airplane text-success fs-2x"></i>
                                          </span>
                                        </span>
                                        <span className="d-flex flex-column">
                                          <span className="fw-bold fs-6">
                                            Expedited Delivery
                                          </span>
                                          <span className="fs-7 text-muted">
                                            Usually takes around 24-72 hrs
                                          </span>
                                        </span>
                                      </span>
                                      <span className="form-check form-check-custom form-check-solid">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="delivery_type"
                                          value="25"
                                          onChange={handleDeliveryChange}
                                        />
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            )}

                            {step === 5 && (
                              <div id="nav-content-5">
                                <div className="w-100 text-center">
                                  <h1 className="fw-bold text-gray-900 mb-3">
                                    Great Move!
                                  </h1>
                                  <div className="text fw-semibold fs-3">
                                    Your estimated total cost is around $
                                    <span id="total_estimate">
                                      {calculateTotalEstimate().toFixed(2)}
                                    </span>
                                    . <br />
                                    &nbsp;
                                    <br />
                                    To discuss a custom plan tailored to your needs, feel
                                    free to call our team at +1 1111-111-111.
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="d-flex flex-stack pt-10">
                              <div className="me-2">
                                {step > 1 && (
                                  <button
                                    type="button"
                                    className="btn btn-lg btn-primary"
                                    id="prevBtn"
                                    onClick={() => navigate(-1)}
                                  >
                                    <i className="nit-dt nit-arrow-left fs-3 me-1"></i>
                                    Back
                                  </button>
                                )}
                              </div>
                              <div>
                                {step < 5 && (
                                  <button
                                    type="button"
                                    className="btn btn-lg btn-primary"
                                    id="nextBtn"
                                    onClick={() => navigate(1)}
                                  >
                                    Continue
                                    <i className="nit-dt nit-arrow-right fs-3 ms-1 me-0"></i>
                                  </button>
                                )}
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
    </>
  )
}





// import React, { useState } from "react";

// export const Estimate = () => {
    // const [step, setStep] = useState(1);
    // const [formData, setFormData] = useState({
    //   services: [],
    //   pages: 0,
    //   addOns: [],
    //   deliveryType: 0,
    // });
  
    // const handleServiceChange = (event) => {
    //   const { value, checked } = event.target;
    //   setFormData((prevState) => {
    //     const newServices = checked
    //       ? [...prevState.services, value]
    //       : prevState.services.filter((service) => service !== value);
    //     return { ...prevState, services: newServices };
    //   });
    // };
  
    // const handleAddOnChange = (event) => {
    //   const { value, checked } = event.target;
    //   setFormData((prevState) => {
    //     const newAddOns = checked
    //       ? [...prevState.addOns, value]
    //       : prevState.addOns.filter((addOn) => addOn !== value);
    //     return { ...prevState, addOns: newAddOns };
    //   });
    // };
  
    // const handleDeliveryChange = (event) => {
    //   setFormData({ ...formData, deliveryType: event.target.value });
    // };
  
    // const handlePagesChange = (event) => {
    //   setFormData({ ...formData, pages: event.target.value });
    // };
  
    // const calculateTotalEstimate = () => {
    //   const serviceCost = formData.services.reduce(
    //     (total, service) => total + parseFloat(service),
    //     0
    //   );
    //   const addOnCost = formData.addOns.reduce(
    //     (total, addOn) => total + parseFloat(addOn),
    //     0
    //   );
    //   const pages = parseFloat(formData.pages);
    //   const deliveryCost = parseFloat(formData.deliveryType);
    //   return (serviceCost + addOnCost) * pages + deliveryCost;
    // };
  
    // const navigate = (direction) => {
    //   if (direction === 1 && step < 5) {
    //     setStep(step + 1);
    //   } else if (direction === -1 && step > 1) {
    //     setStep(step - 1);
    //   }
    // };
//   return (
//     <>

//                 <div
//                 className="modal fade"
//                 id="nit_modal_add_offer"
//                 tabIndex="-1"
//                 style={{ display: "none" }}
//                 aria-hidden="true"
//               >
                // <div className="modal-dialog modal-dialog-centered mw-900px">
                //   <div className="modal-content">
                //     <div className="modal-header">
                //       <h2>Estimate your Medical Review Cost Today!</h2>
                //       <div
                //         className="btn btn-sm btn-icon btn-active-color-primary"
                //         data-bs-dismiss="modal"
                //       >
                //         <i className="nit-dt nit-cross fs-1"></i>
                //       </div>
                //     </div>

                //     <div className="modal-body py-lg-10 px-lg-10">
                //       <div
                //         className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid"
                //         id="nit_modal_create_app_stepper"
                //       >
                //         <div className="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px">
                //           <div className="stepper-nav ps-lg-10">
                //             <div
                //               className={`stepper-item ${step === 1 ? "current" : ""}`}
                //               id="nav-stepper-1"
                //             >
                //               <div className="stepper-wrapper">
                //                 <div className="stepper-icon w-40px h-40px">
                //                   <i className="nit-dt nit-check stepper-check fs-2"></i>
                //                   <span className="stepper-number">1</span>
                //                 </div>
                //                 <div className="stepper-label">
                //                   <h3 className="stepper-title">Desired Services</h3>
                //                   <div className="stepper-desc">Select service type</div>
                //                 </div>
                //               </div>
                //               <div className="stepper-line h-40px"></div>
                //             </div>

                //             <div
                //               className={`stepper-item ${step === 2 ? "current" : ""}`}
                //               id="nav-stepper-2"
                //             >
                //               <div className="stepper-wrapper">
                //                 <div className="stepper-icon w-40px h-40px">
                //                   <i className="nit-dt nit-check stepper-check fs-2"></i>
                //                   <span className="stepper-number">2</span>
                //                 </div>
                //                 <div className="stepper-label">
                //                   <h3 className="stepper-title">Pages</h3>
                //                   <div className="stepper-desc">Enter number of pages</div>
                //                 </div>
                //               </div>
                //               <div className="stepper-line h-40px"></div>
                //             </div>

                //             <div
                //               className={`stepper-item ${step === 3 ? "current" : ""}`}
                //               id="nav-stepper-3"
                //             >
                //               <div className="stepper-wrapper">
                //                 <div className="stepper-icon w-40px h-40px">
                //                   <i className="nit-dt nit-check stepper-check fs-2"></i>
                //                   <span className="stepper-number">3</span>
                //                 </div>
                //                 <div className="stepper-label">
                //                   <h3 className="stepper-title">Add-on Services</h3>
                //                   <div className="stepper-desc">
                //                     Select additional services
                //                   </div>
                //                 </div>
                //               </div>
                //               <div className="stepper-line h-40px"></div>
                //             </div>

                //             <div
                //               className={`stepper-item ${step === 4 ? "current" : ""}`}
                //               id="nav-stepper-4"
                //             >
                //               <div className="stepper-wrapper">
                //                 <div className="stepper-icon w-40px h-40px">
                //                   <i className="nit-dt nit-check stepper-check fs-2"></i>
                //                   <span className="stepper-number">4</span>
                //                 </div>
                //                 <div className="stepper-label">
                //                   <h3 className="stepper-title">Delivery Type</h3>
                //                   <div className="stepper-desc">
                //                     Select priority of work
                //                   </div>
                //                 </div>
                //               </div>
                //               <div className="stepper-line h-40px"></div>
                //             </div>

                //             <div
                //               className={`stepper-item ${step === 5 ? "current" : ""}`}
                //               id="nav-stepper-5"
                //             >
                //               <div className="stepper-wrapper">
                //                 <div className="stepper-icon w-40px h-40px">
                //                   <i className="nit-dt nit-check stepper-check fs-2"></i>
                //                   <span className="stepper-number">5</span>
                //                 </div>
                //                 <div className="stepper-label">
                //                   <h3 className="stepper-title">Total Estimation</h3>
                //                   <div className="stepper-desc">
                //                     Calculated based on input
                //                   </div>
                //                 </div>
                //               </div>
                //             </div>
                //           </div>
                //         </div>

                //         <div className="flex-row-fluid py-lg-5 px-lg-15">
                //           <form className="form">
                //             {step === 1 && (
                //               <div id="nav-content-1">
                //                 <div className="w-100">
                //                   <div className="fv-row mb-10">
                //                     <label className="required fs-5 fw-semibold mb-2">
                //                       Please select desired services
                //                     </label>
                //                     <label className="d-flex flex-stack mb-5 cursor-pointer">
                //                       <span className="d-flex align-items-center me-2">
                //                         <span className="symbol symbol-50px me-6">
                //                           <span className="symbol-label bg-light-primary">
                //                             <i className="nit-dt nit-sort fs-1 text-primary"></i>
                //                           </span>
                //                         </span>
                //                         <span className="d-flex flex-column">
                //                           <span className="fw-bold fs-6">
                //                             Sectioning/Sorting Medical Records
                //                           </span>
                //                           <span className="fs-7 text-muted">
                //                             Sectioning/Sorting will be calculated at $0.10
                //                             per page
                //                           </span>
                //                         </span>
                //                       </span>
                //                       <span className="form-check form-check-custom form-check-solid">
                //                         <input
                //                           className="form-check-input"
                //                           type="checkbox"
                //                           id="calc_sectioning"
                //                           value="0.10"
                //                           onChange={handleServiceChange}
                //                         />
                //                       </span>
                //                     </label>

                //                     <label className="d-flex flex-stack mb-5 cursor-pointer">
                //                       <span className="d-flex align-items-center me-2">
                //                         <span className="symbol symbol-50px me-6">
                //                           <span className="symbol-label bg-light-danger">
                //                             <i className="nit-dt nit-bookmark fs-1 text-danger"></i>
                //                           </span>
                //                         </span>
                //                         <span className="d-flex flex-column">
                //                           <span className="fw-bold fs-6">
                //                             Hyperlinked Index Report
                //                           </span>
                //                           <span className="fs-7 text-muted">
                //                             Including of hyperlinked index will cost you
                //                             $0.10 per page
                //                           </span>
                //                         </span>
                //                       </span>
                //                       <span className="form-check form-check-custom form-check-solid">
                //                         <input
                //                           className="form-check-input"
                //                           type="checkbox"
                //                           id="calc_hyperlink"
                //                           value="0.10"
                //                           onChange={handleServiceChange}
                //                         />
                //                       </span>
                //                     </label>

                                  
                //                   </div>
                //                 </div>
                //               </div>
                //             )}

                //             {step === 2 && (
                //               <div id="nav-content-2">
                //                 <div className="w-100">
                //                   <div className="fv-row mb-10">
                //                     <label className="required fs-5 fw-semibold mb-2">
                //                       Number of Pages
                //                     </label>
                //                     <input
                //                       type="text"
                //                       className="form-control form-control-lg form-control-solid"
                //                       id="number_of_pages"
                //                       value={formData.pages}
                //                       onChange={handlePagesChange}
                //                     />
                //                   </div>
                //                 </div>
                //               </div>
                //             )}

                //             {step === 3 && (
                //               <div id="nav-content-3">
                //                 <div className="w-100">
                //                   <div className="fv-row mb-10">
                //                     <label className="required fs-5 fw-semibold mb-2">
                //                       Please select Add-on services
                //                     </label>

                //                     <label className="d-flex flex-stack mb-5 cursor-pointer">
                //                       <span className="d-flex align-items-center me-2">
                //                         <span className="fw-bold fs-6">
                //                           Demonstrative Medical Image
                //                         </span>
                //                       </span>
                //                       <span className="form-check form-check-custom form-check-solid">
                //                         <input
                //                           className="form-check-input"
                //                           type="checkbox"
                //                           id="calc_demonstrative"
                //                           value="2.00"
                //                           onChange={handleAddOnChange}
                //                         />
                //                       </span>
                //                     </label>

                            
                //                   </div>
                //                 </div>
                //               </div>
                //             )}

                //             {step === 4 && (
                //               <div id="nav-content-4">
                //                 <div className="w-100">
                //                   <div className="fv-row mb-10">
                //                     <label className="fs-5 fw-semibold mb-4">
                //                       <span className="required">Delivery Type</span>
                //                     </label>

                //                     <label className="d-flex flex-stack cursor-pointer mb-5">
                //                       <span className="d-flex align-items-center me-2">
                //                         <span className="symbol symbol-50px me-6">
                //                           <span className="symbol-label bg-light-danger">
                //                             <i className="nit-dt nit-delivery-time bg-light-danger fs-2x"></i>
                //                           </span>
                //                         </span>
                //                         <span className="d-flex flex-column">
                //                           <span className="fw-bold fs-6">
                //                             Standard Delivery
                //                           </span>
                //                           <span className="fs-7 text-muted">
                //                             Usually takes around 5-7 days
                //                           </span>
                //                         </span>
                //                       </span>
                //                       <span className="form-check form-check-custom form-check-solid">
                //                         <input
                //                           className="form-check-input"
                //                           type="radio"
                //                           name="delivery_type"
                //                           value="0"
                //                           onChange={handleDeliveryChange}
                //                           defaultChecked
                //                         />
                //                       </span>
                //                     </label>

                //                     <label className="d-flex flex-stack cursor-pointer mb-5">
                //                       <span className="d-flex align-items-center me-2">
                //                         <span className="symbol symbol-50px me-6">
                //                           <span className="symbol-label bg-light-success">
                //                             <i className="nit-dt nit-airplane text-success fs-2x"></i>
                //                           </span>
                //                         </span>
                //                         <span className="d-flex flex-column">
                //                           <span className="fw-bold fs-6">
                //                             Expedited Delivery
                //                           </span>
                //                           <span className="fs-7 text-muted">
                //                             Usually takes around 24-72 hrs
                //                           </span>
                //                         </span>
                //                       </span>
                //                       <span className="form-check form-check-custom form-check-solid">
                //                         <input
                //                           className="form-check-input"
                //                           type="radio"
                //                           name="delivery_type"
                //                           value="25"
                //                           onChange={handleDeliveryChange}
                //                         />
                //                       </span>
                //                     </label>
                //                   </div>
                //                 </div>
                //               </div>
                //             )}

                //             {step === 5 && (
                //               <div id="nav-content-5">
                //                 <div className="w-100 text-center">
                //                   <h1 className="fw-bold text-gray-900 mb-3">
                //                     Great Move!
                //                   </h1>
                //                   <div className="text fw-semibold fs-3">
                //                     Your estimated total cost is around $
                //                     <span id="total_estimate">
                //                       {calculateTotalEstimate().toFixed(2)}
                //                     </span>
                //                     . <br />
                //                     &nbsp;
                //                     <br />
                //                     To discuss a custom plan tailored to your needs, feel
                //                     free to call our team at +1 1111-111-111.
                //                   </div>
                //                 </div>
                //               </div>
                //             )}

                //             <div className="d-flex flex-stack pt-10">
                //               <div className="me-2">
                //                 {step > 1 && (
                //                   <button
                //                     type="button"
                //                     className="btn btn-lg btn-primary"
                //                     id="prevBtn"
                //                     onClick={() => navigate(-1)}
                //                   >
                //                     <i className="nit-dt nit-arrow-left fs-3 me-1"></i>
                //                     Back
                //                   </button>
                //                 )}
                //               </div>
                //               <div>
                //                 {step < 5 && (
                //                   <button
                //                     type="button"
                //                     className="btn btn-lg btn-primary"
                //                     id="nextBtn"
                //                     onClick={() => navigate(1)}
                //                   >
                //                     Continue
                //                     <i className="nit-dt nit-arrow-right fs-3 ms-1 me-0"></i>
                //                   </button>
                //                 )}
                //               </div>
                //             </div>
                //           </form>
                //         </div>
                //       </div>
                //     </div>
                //   </div>
//                 </div>
//               </div>

 
//     </>
//   )
// }

