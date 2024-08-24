import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAuth } from "../../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export const AddNewProject = () => {
  // State variables for all the inputs
  const { createProject } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [excludeFromReferralInvoice, setExcludeFromReferralInvoice] =
    useState(false);
  const [billStatementFor, setBillStatementFor] = useState("All");
  const [setValue, setSetValue] = useState(0);
  const [splitEstimate, setSplitEstimate] = useState(false);
  const [enableTimeEstimateSetup, setEnableTimeEstimateSetup] = useState(false);
  const [invoiceOption, setInvoiceOption] = useState("NA");
  const [groupName, setGroupName] = useState("");
  const [threshold, setThreshold] = useState("0");
  const [isSigningEnabled, setIsSigningEnabled] = useState(false);
  const [matterType, setMatterType] = useState("");
  const [isCasebodyDefaultOpen, setIsCasebodyDefaultOpen] = useState(false);
  const [isCaseBillingChecked, setIsCaseBillingChecked] = useState(false);
  const [commentLimitValue, setCommentLimitValue] = useState(0);
  const [isBatchable, setIsBatchable] = useState(false);
  const [billingType, setBillingType] = useState("Resource Based");
  const [ratePerMin, setRatePerMin] = useState("");
  const [freeMaxCases, setFreeMaxCases] = useState("0");
  const [caseReopen, setCaseReopen] = useState("No");
  const [separateInvoice, setSeparateInvoice] = useState("No");
  const [newTimerView, setNewTimerView] = useState("No");
  const [splitComment, setSplitComment] = useState("No");
  const [displayTimerSeconds, setDisplayTimerSeconds] = useState("Disabled");
  const [dueDateNotification, setDueDateNotification] = useState("Disabled");
  const [commentFetchDocuments, setCommentFetchDocuments] =
    useState("Disabled");
  const [caseMRRRequest, setCaseMRRRequest] = useState("Disabled");
  const [fileDeliveryCheck, setFileDeliveryCheck] = useState("Disabled");
  const [caseClosureDeliveryCheck, setCaseClosureDeliveryCheck] =
    useState("Disabled");
  const [enableBookmarkModule, setEnableBookmarkModule] = useState(false);
  const [enableReviewSheet, setEnableReviewSheet] = useState(false);
  const [enablePFSModule, setEnablePFSModule] = useState(false);
  const [checkList, setCheckList] = useState("");
  const [file, setFile] = useState(null);

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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSave = async () => {
    // const formData = new FormData();
    // formData.append("file", file);
    const data = {
      title,
      body,
      notifications: selectedTags.map((tag) => users.indexOf(tag) + 1), // Assuming notifications are indices of the users
      no_notifications: selectedTags.length === 0,
      exclude_from_referral_invoice: excludeFromReferralInvoice,
      bill_statement_for: billStatementFor,
      set_value: setValue,
      split_estimate: splitEstimate,
      enable_time_estimate_setup: enableTimeEstimateSetup,
      configure_for: invoiceOption,
      project_group_config: groupName,
      enable_signing: isSigningEnabled,
      pfs_matter_type: matterType || null,
      open_casebody_default: isCasebodyDefaultOpen,
      case_billing_check: isCaseBillingChecked,
      comments_limit: parseInt(commentLimitValue),
      is_batchable: isBatchable,
      billing_type: billingType,
      ratemin: ratePerMin || null,
      free_max_cases: freeMaxCases,
      case_reopen: caseReopen === "Yes",
      separate_invoice: separateInvoice === "Yes",
      new_timer_view: newTimerView === "Yes",
      enable_quality_check: splitComment === "Yes(Mandatory)",
      display_timer_seconds: displayTimerSeconds === "Enabled",
      due_date_notification: dueDateNotification === "Enabled",
      comment_fetch_documents: commentFetchDocuments === "Enabled",
      case_mrr_request: caseMRRRequest === "Enabled",
      file_delivery_check: fileDeliveryCheck === "Enabled",
      case_closure_delivery_check: caseClosureDeliveryCheck === "Enabled",
      enable_review_sheet: enableReviewSheet,
      enable_pfs_module: enablePFSModule,
      krqnnq: null, // You can update this with actual data if needed
      checklist_message: checkList,
      checklist_file: null,
    };

    // console.log(data);

    try {
      const response = await createProject(data);
      toast.success(
        `Project created successfully! ID: ${response.data.project_id}`
      );
    } catch (error) {
      toast.error(`Failed to create project: ${error.message}`);
    }
  };

  return (
    <>
      <div className="card card-flush card-modify">
        <div>
          <div>
            <label className="required form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control mb-2"
              placeholder="Project Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="required form-label">Body</label>
            <input
              type="text"
              name="body"
              className="form-control mb-2"
              placeholder="Project Message"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <div>
            <label className="required form-label">Notifications:</label>
            <div className="notification-tags">
              <div className="tags-container">
                {users.map((user) => (
                  <div
                    key={user}
                    className={`tag ${
                      selectedTags.includes(user) ? "selected" : ""
                    } form-check`}
                    onClick={() => toggleTag(user)}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedTags.includes(user)}
                      onChange={() => toggleTag(user)}
                    />
                    <label>{user}</label>
                  </div>
                ))}
              </div>

              <div className="controls">
                <div className="form-check-sm">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notifyAll"
                    onChange={(e) =>
                      setSelectedTags(e.target.checked ? users : [])
                    }
                    checked={selectedTags.length === users.length}
                  />
                  <label htmlFor="notifyAll" className="form-check-label">
                    Notify all users
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="noNotifications"
                    onChange={(e) => e.target.checked && setSelectedTags([])}
                  />
                  <label htmlFor="noNotifications" className="form-check-label">
                    Do not send notifications for this update
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="deselectAll"
                    onChange={(e) => e.target.checked && setSelectedTags([])}
                    checked={selectedTags.length === 0}
                  />
                  <label htmlFor="deselectAll" className="form-check-label">
                    De-Select All
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional settings accordions */}
      <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        {/* Referral Invoice */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <label className="required form-label">Project Referral</label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={excludeFromReferralInvoice}
                onChange={(e) =>
                  setExcludeFromReferralInvoice(e.target.checked)
                }
              />
              <span className="form-check-label fw-semibold text-gray-700 fs-6">
                Exclude from Referral Invoice
              </span>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <Accordion
          defaultActiveKey="0"
          className="card card-flush accordionCard"
        >
          {/* Billable Statement */}
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <label className="required form-label">
                Define Billable Statement
              </label>
            </Accordion.Header>
            <Accordion.Body>
              <div className="billable-statement form-check-custom mb-4">
                <input
                  className="form-check-input"
                  type="radio"
                  id="all"
                  name="billStatement"
                  value="all"
                  checked={billStatementFor === "All"}
                  onChange={(e) => setBillStatementFor(e.target.value)}
                />
                <label htmlFor="all">All</label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  id="delivered"
                  name="billStatement"
                  value="Delivered Only"
                  checked={billStatementFor === "Delivered Only"}
                  onChange={(e) => setBillStatementFor(e.target.value)}
                />
                <label htmlFor="delivered">Delivered Only</label>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        {/* Estimate Unit */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <label className="required form-label">Estimate Unit</label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="mb-4">
              <label htmlFor="setValue">Set Value</label> <br />
              <input
                type="text"
                id="setValue"
                placeholder="0"
                value={setValue}
                onChange={(e) => setSetValue(Number(e.target.value))}
              />
            </div>
            <div>
              <input
                type="checkbox"
                id="splitEstimate"
                checked={splitEstimate}
                onChange={(e) => setSplitEstimate(e.target.checked)}
              />
              <label htmlFor="splitEstimate">Split Estimate</label>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        {/* Time Estimate Approval Setup */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <label className="required form-label">
              Time Estimate Approval Setup
            </label>
          </Accordion.Header>
          <Accordion.Body>
            <input
              className="form-check-input"
              type="checkbox"
              checked={enableTimeEstimateSetup}
              onChange={(e) => setEnableTimeEstimateSetup(e.target.checked)}
            />
            <span className="form-check-label fw-semibold text-gray-700 fs-6">
              Enable Setup
            </span>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        {/* Project Wise Invoice Configuration */}
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            <label className="required form-label">
              Project Wise Invoice Configuration
            </label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="form-group">
              <label className="mb-4">CONFIGURE FOR</label>
              <div className="mb-4">
                <input
                  className="form-check-input"
                  type="radio"
                  id="na"
                  name="invoiceConfig"
                  value="NA"
                  checked={invoiceOption === "NA"}
                  onChange={(e) => setInvoiceOption(e.target.value)}
                />
                <label htmlFor="na">NA</label>
              </div>
              <div className="mb-4">
                <input
                  className="form-check-input"
                  type="radio"
                  id="individual"
                  name="invoiceConfig"
                  value="Individual Invoice"
                  checked={invoiceOption === "Individual Invoice"}
                  onChange={(e) => setInvoiceOption(e.target.value)}
                />
                <label htmlFor="individual">Individual Invoice</label>
              </div>
              <div className="mb-4">
                <input
                  className="form-check-input"
                  type="radio"
                  id="projectGroup"
                  name="invoiceConfig"
                  value="Project-Group Invoice"
                  checked={invoiceOption === "Project-Group Invoice"}
                  onChange={(e) => setInvoiceOption(e.target.value)}
                />
                <label htmlFor="projectGroup">Project-Group Invoice</label>
              </div>
            </div>

            {invoiceOption === "Project-Group Invoice" && (
              <div className="form-group">
                <label>CREATE NEW PROJECT-GROUP & CONFIGURE</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter project group name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        {/* MRR Setting */}
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            <label className="required form-label">MRR Setting</label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="form-group">
              <label>RESERVED CHARGE THRESHOLD:</label> <br />
              <input
                type="text"
                placeholder="Enter threshold value"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        {/* E-Signature Setting */}
        <Accordion.Item eventKey="6">
          <Accordion.Header>
            <label className="required form-label">E-Signature Setting</label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="form-group">
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isSigningEnabled}
                  onChange={(e) => setIsSigningEnabled(e.target.checked)}
                />
                Enable Signing
              </label>
            </div>
            <div className="form-group">
              <label>PFS MATTER TYPE:</label>
              <select
                value={matterType}
                onChange={(e) => setMatterType(e.target.value)}
                disabled={!isSigningEnabled}
              >
                <option value="">Choose</option>
                <option value="Risperdal - SF">Risperdal - SF</option>
                <option value="Invega">Invega</option>
                <option value="Fluoroquinolone">Fluoroquinolone</option>
                <option value="Risperdal-Invega">Risperdal-Invega</option>
                <option value="Xarelto">Xarelto</option>
                <option value="TVM">TVM</option>
                <option value="Ethicon">Ethicon</option>
                <option value="Bard">Bard</option>
                <option value="Boston">Boston</option>
                <option value="AMS">AMS</option>
                <option value="Januvia">Januvia</option>
              </select>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        {/* Case Setting */}
        <Accordion.Item eventKey="7">
          <Accordion.Header>
            <label className="required form-label">Case Setting</label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="form-group">
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isCasebodyDefaultOpen}
                  onChange={(e) => setIsCasebodyDefaultOpen(e.target.checked)}
                />
                Open Casebody Default?
              </label>
            </div>
            <div className="form-group">
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isCaseBillingChecked}
                  onChange={(e) => setIsCaseBillingChecked(e.target.checked)}
                />
                Case Billing Check?
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        {/* Comment Settings */}
        <Accordion.Item eventKey="8">
          <Accordion.Header>
            <label className="required form-label">Comment Settings</label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="form-group">
              <label>COMMENTS LIMIT:</label> <br />
              <input
                type="number"
                placeholder="Enter comments limit"
                value={commentLimitValue}
                onChange={(e) => setCommentLimitValue(e.target.value)}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        {/* Checklist Settings */}
        <Accordion.Item eventKey="9">
          <Accordion.Header>
            <label className="required form-label">Checklist Settings</label>
          </Accordion.Header>
          <Accordion.Body>
            <input
              type="text"
              name="checklist_message"
              className="form-control mb-2"
              placeholder="Checklist Message"
              value={checkList}
              onChange={(e) => setCheckList(e.target.value)}
            />
            <div>
              <label className="required form-label">File</label> <br />
              <input
                type="file"
                name="file"
                placeholder="File"
                required
                onChange={handleFileChange}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        {/* Project Settings */}
        <Accordion.Item eventKey="10">
          <Accordion.Header>
            <label className="required form-label">Project Settings</label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="form-group">
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={isBatchable}
                  onChange={() => setIsBatchable(!isBatchable)}
                />
                Is Batchable?
              </label>
            </div>

            <div className="form-group">
              <label>BILLING TYPE:</label>
              <select
                value={billingType}
                onChange={(e) => setBillingType(e.target.value)}
              >
                <option value="Resource Based">Resource Based</option>
                <option value="Time Based">Time Based</option>
              </select>
            </div>

            <div className="form-group">
              <label>RATE/MIN:</label> <br />
              <input
                type="text"
                placeholder="Enter rate per min"
                value={ratePerMin}
                onChange={(e) => setRatePerMin(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>FREE MAX CASES:</label> <br />
              <input
                type="text"
                placeholder="Enter free max cases"
                value={freeMaxCases}
                onChange={(e) => setFreeMaxCases(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="pb-2">CASE REOPEN?:</label>
              <div className="mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id="caseReopenYes"
                  name="caseReopen"
                  value="Yes"
                  checked={caseReopen === "Yes"}
                  onChange={() => setCaseReopen("Yes")}
                />
                <label htmlFor="caseReopenYes">Yes</label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  id="caseReopenNo"
                  name="caseReopen"
                  value="No"
                  checked={caseReopen === "No"}
                  onChange={() => setCaseReopen("No")}
                />
                <label htmlFor="caseReopenNo">No</label>
              </div>
            </div>

            <div className="form-group">
              <label className="pb-2">SEPARATE INVOICE?:</label>
              <div className="mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id="separateInvoiceYes"
                  name="separateInvoice"
                  value="Yes"
                  checked={separateInvoice === "Yes"}
                  onChange={() => setSeparateInvoice("Yes")}
                />
                <label htmlFor="separateInvoiceYes">Yes</label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  id="separateInvoiceNo"
                  name="separateInvoice"
                  value="No"
                  checked={separateInvoice === "No"}
                  onChange={() => setSeparateInvoice("No")}
                />
                <label htmlFor="separateInvoiceNo">No</label>
              </div>
            </div>

            <div className="form-group">
              <label className="pb-2">NEW TIMER VIEW?:</label>
              <div className="mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id="newTimerViewYes"
                  name="newTimerView"
                  value="Yes"
                  checked={newTimerView === "Yes"}
                  onChange={() => setNewTimerView("Yes")}
                />
                <label htmlFor="newTimerViewYes">Yes</label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  id="newTimerViewNo"
                  name="newTimerView"
                  value="No"
                  checked={newTimerView === "No"}
                  onChange={() => setNewTimerView("No")}
                />
                <label htmlFor="newTimerViewNo">No</label>
              </div>
            </div>

            <div className="form-group">
              <label className="pb-2">ENABLE SPLIT COMMENT:</label>
              <div className="mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id="splitCommentNo"
                  name="splitComment"
                  value="No"
                  checked={splitComment === "No"}
                  onChange={() => setSplitComment("No")}
                />
                <label htmlFor="splitCommentNo">No</label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  id="splitCommentYes"
                  name="splitComment"
                  value="Yes(Mandatory)"
                  checked={splitComment === "Yes(Mandatory)"}
                  onChange={() => setSplitComment("Yes(Mandatory)")}
                />
                <label htmlFor="splitCommentYes">Yes(Mandatory)</label>
              </div>
            </div>

            <div className="form-group">
              <label className="pb-2">DISPLAY TIMER SECOND(S):</label>
              <div className="mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id="displayTimerDisabled"
                  name="displayTimerSeconds"
                  value="Disabled"
                  checked={displayTimerSeconds === "Disabled"}
                  onChange={() => setDisplayTimerSeconds("Disabled")}
                />
                <label htmlFor="displayTimerDisabled">Disabled</label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  id="displayTimerEnabled"
                  name="displayTimerSeconds"
                  value="Enabled"
                  checked={displayTimerSeconds === "Enabled"}
                  onChange={() => setDisplayTimerSeconds("Enabled")}
                />
                <label htmlFor="displayTimerEnabled">Enabled</label>
              </div>
            </div>

            <div className="form-group">
              <label className="pb-2">DUE DATE NOTIFICATION:</label>
              <div className="mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id="dueDateNotificationDisabled"
                  name="dueDateNotification"
                  value="Disabled"
                  checked={dueDateNotification === "Disabled"}
                  onChange={() => setDueDateNotification("Disabled")}
                />
                <label htmlFor="dueDateNotificationDisabled">Disabled</label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  id="dueDateNotificationEnabled"
                  name="dueDateNotification"
                  value="Enabled"
                  checked={dueDateNotification === "Enabled"}
                  onChange={() => setDueDateNotification("Enabled")}
                />
                <label htmlFor="dueDateNotificationEnabled">Enabled</label>
              </div>
            </div>

            <div className="form-group">
              <label className="pb-2">COMMENT FETCH DOCUMENTS:</label>
              <div className="mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id="commentFetchDisabled"
                  name="commentFetchDocuments"
                  value="Disabled"
                  checked={commentFetchDocuments === "Disabled"}
                  onChange={() => setCommentFetchDocuments("Disabled")}
                />
                <label htmlFor="commentFetchDisabled">Disabled</label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  id="commentFetchEnabled"
                  name="commentFetchDocuments"
                  value="Enabled"
                  checked={commentFetchDocuments === "Enabled"}
                  onChange={() => setCommentFetchDocuments("Enabled")}
                />
                <label htmlFor="commentFetchEnabled">Enabled</label>
              </div>
            </div>
            <div className="form-group">
              <label className="pb-2">CASE MRR REQUEST:</label>
              <div className="mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id="caseMRRDisabled"
                  name="caseMRRRequest"
                  value="Disabled"
                  checked={caseMRRRequest === "Disabled"}
                  onChange={() => setCaseMRRRequest("Disabled")}
                />
                <label htmlFor="caseMRRDisabled">Disabled</label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  id="caseMRREnabled"
                  name="caseMRRRequest"
                  value="Enabled"
                  checked={caseMRRRequest === "Enabled"}
                  onChange={() => setCaseMRRRequest("Enabled")}
                />
                <label htmlFor="caseMRREnabled">Enabled</label>
              </div>
            </div>

            <div className="form-group">
              <label className="pb-2">FILE DELIVERY CHECK:</label>
              <div className="mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id="fileDeliveryDisabled"
                  name="fileDeliveryCheck"
                  value="Disabled"
                  checked={fileDeliveryCheck === "Disabled"}
                  onChange={() => setFileDeliveryCheck("Disabled")}
                />
                <label htmlFor="fileDeliveryDisabled">Disabled</label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  id="fileDeliveryEnabled"
                  name="fileDeliveryCheck"
                  value="Enabled"
                  checked={fileDeliveryCheck === "Enabled"}
                  onChange={() => setFileDeliveryCheck("Enabled")}
                />
                <label htmlFor="fileDeliveryEnabled">Enabled</label>
              </div>
            </div>

            <div className="form-group">
              <label className="pb-2">CASE CLOSURE DELIVERY CHECK:</label>
              <div className="mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  id="caseClosureDeliveryDisabled"
                  name="caseClosureDeliveryCheck"
                  value="Disabled"
                  checked={caseClosureDeliveryCheck === "Disabled"}
                  onChange={() => setCaseClosureDeliveryCheck("Disabled")}
                />
                <label htmlFor="caseClosureDeliveryDisabled">Disabled</label>
              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  id="caseClosureDeliveryEnabled"
                  name="caseClosureDeliveryCheck"
                  value="Enabled"
                  checked={caseClosureDeliveryCheck === "Enabled"}
                  onChange={() => setCaseClosureDeliveryCheck("Enabled")}
                />
                <label htmlFor="caseClosureDeliveryEnabled">Enabled</label>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        {/* MRS Integration Settings */}
        <Accordion.Item eventKey="11">
          <Accordion.Header>
            <label className="required form-label">
              MRS Integration Settings
            </label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="form-group">
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={enableBookmarkModule}
                  onChange={() =>
                    setEnableBookmarkModule(!enableBookmarkModule)
                  }
                />
                Enable Bookmark Module
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        {/* Review Sheet Integration Settings */}
        <Accordion.Item eventKey="12">
          <Accordion.Header>
            <label className="required form-label">
              Review Sheet Integration Settings
            </label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="form-group">
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={enableReviewSheet}
                  onChange={() => setEnableReviewSheet(!enableReviewSheet)}
                />
                Enable Review Sheet?
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        {/* PFS Integration Settings */}
        <Accordion.Item eventKey="13">
          <Accordion.Header>
            <label className="required form-label">
              PFS Integration Settings
            </label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="form-group">
              <label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={enablePFSModule}
                  onChange={() => setEnablePFSModule(!enablePFSModule)}
                />
                Enable PFS Module
              </label>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="form-group">
        <button onClick={handleSave} className="btn btn-sm btn-primary me-2">
          Submit
        </button>
      </div>

      <Toaster />
    </>
  );
};
