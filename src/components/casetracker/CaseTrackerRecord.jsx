import React from "react";

export const CaseTrackerRecord = () => {
  return (
    <>
      <div className="col-xl-12">
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
                    <th className="p-0 pb-3 min-w-100px text-end">ESTIMATE</th>
                    <th className="p-0 pb-3 min-w-150px text-end pe-7">
                      STATUS
                    </th>
                    <th className="p-0 pb-3 w-100px text-end pe-1">TYPE</th>
                    <th className="p-0 pb-3 w-50px text-end">VIEW</th>
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
                      <span className="text-gray-600 fw-bold fs-6">$150</span>
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
                      <span className="text-gray-600 fw-bold fs-6">$120</span>
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
                      <span className="text-gray-600 fw-bold fs-6">$120</span>
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
                      <span className="text-gray-600 fw-bold fs-6">$145</span>
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
                      <span className="text-gray-600 fw-bold fs-6">$160</span>
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
    </>
  );
};
