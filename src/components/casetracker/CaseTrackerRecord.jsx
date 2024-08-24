import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext"; // Adjust the import path according to your project structure

export const CaseTrackerRecord = () => {
  const [cases, setCases] = useState([]);
  const { getAllCases } = useAuth();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await getAllCases(); // Call the function from auth file
        setCases(response.data); // Assuming response.data contains the array of cases
      } catch (error) {
        console.error("Error fetching cases:", error.message);
      }
    };

    fetchCases(); // Fetch the cases when the component mounts
  }, []); // Empty dependency array means this useEffect runs once when the component mounts

  return (
    <>
      <div className="col-xl-12">
        <div className="custom-card custom-card-flush h-md-100">
          <div className="custom-card-header pt-7">
            <h3 className="custom-card-title align-items-start flex-column">
              <span className="custom-card-label fw-bold text-gray-800">
                View Cases
              </span>
            </h3>
          </div>
          <div className="custom-card-body pt-6">
            <div className="table-responsive">
              {" "}
              {/* This container makes the table horizontally scrollable */}
              <table className="custom-table">
                <thead>
                  <tr className="fs-7 fw-bold text-gray-500 border-bottom-0">
                    <th className="p-0 pb-3 text-start">Case ID</th>
                    <th className="p-0 pb-3 text-start">Client ID</th>
                    <th className="p-0 pb-3 text-start">Title</th>
                    <th className="p-0 pb-3 text-start">Username</th>
                    <th className="p-0 pb-3 text-start">Case Title</th>
                    <th className="p-0 pb-3 text-start">Case Sub Title</th>
                    <th className="p-0 pb-3 text-start">File</th>
                    <th className="p-0 pb-3 text-start">Case Body</th>
                    <th className="p-0 pb-3 text-start">Due Date</th>
                    <th className="p-0 pb-3 text-start">Date Delivered</th>
                    <th className="p-0 pb-3 text-start">Status</th>
                    <th className="p-0 pb-3 text-start">Priority</th>
                    <th className="p-0 pb-3 text-start">Created At</th>
                    <th className="p-0 pb-3 text-start">Updated At</th>
                    <th className="p-0 pb-3 text-start">Case Closed</th>
                    <th className="p-0 pb-3 text-start">Closed At</th>
                    <th className="p-0 pb-3 text-start">Case Archived</th>
                    <th className="p-0 pb-3 text-start">Archived At</th>
                    <th className="p-0 pb-3 text-start">Case Deleted</th>
                    <th className="p-0 pb-3 text-start">Deleted At</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((caseItem) => (
                    <tr key={caseItem.case_id} className="custom-table-row">
                      <td>{caseItem.case_id}</td>
                      <td>{caseItem.client_id}</td>
                      <td>{caseItem.title}</td>
                      <td>{caseItem.username}</td>
                      <td>{caseItem.case_title}</td>
                      <td>{caseItem.case_sub_title}</td>
                      <td>{caseItem.file}</td>
                      <td>{caseItem.case_body}</td>
                      <td>
                        {new Date(caseItem.due_date).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(caseItem.date_delivered).toLocaleDateString()}
                      </td>
                      <td>{caseItem.status_name}</td>
                      <td>{caseItem.priority_name}</td>
                      <td>{new Date(caseItem.created_at).toLocaleString()}</td>
                      <td>
                        {caseItem.updated_at
                          ? new Date(caseItem.updated_at).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>{caseItem.case_closed ? "Yes" : "No"}</td>
                      <td>
                        {caseItem.closed_at
                          ? new Date(caseItem.closed_at).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>{caseItem.case_archived ? "Yes" : "No"}</td>
                      <td>
                        {caseItem.archived_at
                          ? new Date(caseItem.archived_at).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>{caseItem.case_deleted ? "Yes" : "No"}</td>
                      <td>
                        {caseItem.deleted_at
                          ? new Date(caseItem.deleted_at).toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
