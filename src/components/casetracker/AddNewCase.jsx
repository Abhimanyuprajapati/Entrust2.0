import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAuth } from "../../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export const AddNewCase = () => {
  const { createCase, uploadFile } = useAuth();
  const [project, setProject] = useState("");
  const [assignedTo, setAssignedTo] = useState("Unassigned");
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Normal");
  const [type, setType] = useState("Task");
  const [dueDate, setDueDate] = useState("");
  const [dateDelivered, setDateDelivered] = useState("");

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

  const [leftItems, setLeftItems] = useState([
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 5" },
    { id: 3, name: "Item 2" },
    { id: 4, name: "Item 4" },
    { id: 5, name: "Item 3" },
  ]);

  const [rightItems, setRightItems] = useState([]);
  const [selectedLeft, setSelectedLeft] = useState([]);
  const [selectedRight, setSelectedRight] = useState([]);

  const handleSelectLeft = (e) => {
    const options = Array.from(e.target.options);
    const selected = options
      .filter((option) => option.selected)
      .map((option) => parseInt(option.value));
    setSelectedLeft(selected);
  };

  const handleSelectRight = (e) => {
    const options = Array.from(e.target.options);
    const selected = options
      .filter((option) => option.selected)
      .map((option) => parseInt(option.value));
    setSelectedRight(selected);
  };

  const moveRightSelected = () => {
    const newRightItems = [
      ...rightItems,
      ...leftItems.filter((item) => selectedLeft.includes(item.id)),
    ];
    const newLeftItems = leftItems.filter(
      (item) => !selectedLeft.includes(item.id)
    );
    setLeftItems(newLeftItems);
    setRightItems(newRightItems);
    setSelectedLeft([]);
  };

  const moveLeftSelected = () => {
    const newLeftItems = [
      ...leftItems,
      ...rightItems.filter((item) => selectedRight.includes(item.id)),
    ];
    const newRightItems = rightItems.filter(
      (item) => !selectedRight.includes(item.id)
    );
    setLeftItems(newLeftItems);
    setRightItems(newRightItems);
    setSelectedRight([]);
  };

  const moveAllRight = () => {
    setRightItems([...rightItems, ...leftItems]);
    setLeftItems([]);
  };

  const moveAllLeft = () => {
    setLeftItems([...leftItems, ...rightItems]);
    setRightItems([]);
  };

  const [isFreeCase, setIsFreeCase] = useState(false);
  const [isSampleCase, setIsSampleCase] = useState(false);
  const [pageCount, setPageCount] = useState("");
  const [variableValues, setVariableValues] = useState({
    fixedValue: "",
    variable1: "",
    variable2: "",
    variable3: "",
    variable4: "",
    variable5: "",
    variable6: "",
    variable7: "",
  });
  const [finalizeCaseEstimate, setFinalizeCaseEstimate] = useState(false);
  const [followUpDate, setFollowUpDate] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVariableValues({
      ...variableValues,
      [name]: value,
    });
  };

  const [base, setBase] = useState("");
  const [benchmark, setBenchmark] = useState("");

  const [files, setFiles] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // Convert FileList to an array
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Append new files to the existing files
  };

  // Handle file upload
  const handleSubmit = async () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    // Append the filepath to the FormData object
    formData.append("filepath", "/home/neuralit/TestingUploads");

    try {
      const response = await uploadFile(formData);
      toast.success("Files uploaded successfully");
      console.log("Upload response:", response);
    } catch (error) {
      toast.error("Error uploading files");
      console.error("Upload error:", error);
    }
  };

  const handleSave = async () => {
    handleSubmit();

    try {
      const data = {
        project_id:
          project === "Project 1" ? 1 : project === "Project 2" ? 2 : 0,
        client_id: 790,
        case_title: document.querySelector('input[name="title"]').value,
        case_sub_title: document.querySelector('input[name="subtitle"]').value,
        case_body: document.querySelector('input[name="body"]').value,
        due_date: dueDate,
        date_delivered: dateDelivered,
        assign_to:
          assignedTo === "User 1" ? 1 : assignedTo === "User 2" ? 2 : 0,
        case_status: status === "Open" ? 0 : status === "In Progress" ? 1 : 2,
        case_priority: priority === "Normal" ? 0 : priority === "High" ? 1 : 2,
        created_by: 1,
        updated_by: 0,
        tags: selectedTags,
        type: type,
        is_free_case: isFreeCase,
        is_sample_case: isSampleCase,
        page_count: pageCount,
        variable_values: variableValues,
        finalize_case_estimate: finalizeCaseEstimate,
        follow_up_date: followUpDate,
        right_items: rightItems.map((item) => item.id),
        benchmarking: {
          base,
          benchmark,
        },
      };

      console.log(data);

      const response = await createCase(data);
      if (response.status === 200 || response.status === 201) {
        toast.success("Case created successfully!");
      } else {
        toast.error("Failed to save the case. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(`Failed to process: ${error.message}`);
    }
  };

  return (
    <>
      <div className="card card-flush card-modify">
        <div>
          <label className="required form-label">Title</label>
          <input
            type="text"
            name="title"
            className="form-control mb-2"
            placeholder="Case Title"
          />
        </div>
      </div>

      <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <label className="required form-label">Case Information</label>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <label className="required form-label">Sub Title</label>
              <input
                type="text"
                name="subtitle"
                className="form-control mb-2"
                placeholder="Additional Information Related To The Current Task"
              />
            </div>
            <div>
              <label className="required form-label">File</label>
              <input
                type="text"
                name="file"
                className="form-control mb-2"
                placeholder="File"
              />
            </div>
            <div className="d-flex align-items-center gap-5">
              <div>
                <label className="required form-label">Due Date</label>
                <br />
                <input
                  type="date"
                  name="due date"
                  title="The due date for this case"
                  placeholder="Project Name"
                  class="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div>
                <label className="required form-label">Date Delivered</label>
                <br />
                <input
                  type="date"
                  name="due date"
                  title="The delivery date for this case"
                  placeholder="Project Name"
                  class="form-control"
                  value={dateDelivered}
                  onChange={(e) => setDateDelivered(e.target.value)}
                />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <label className="required form-label">Project</label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="form-group mb-3">
              <label className="form-label">Project:</label>
              <select
                className="form-select"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                required
              >
                <option value="">--Choose--</option>
                <option value="Project 1">Project 1</option>
                <option value="Project 2">Project 2</option>
              </select>
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Assign To:</label>
              <select
                className="form-select"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              >
                <option value="Unassigned">Unassigned</option>
                <option value="User 1">User 1</option>
                <option value="User 2">User 2</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4 mb-3">
                <label className="form-label">Status:</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="form-group col-md-4 mb-3">
                <label className="form-label">Priority:</label>
                <select
                  className="form-select"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="form-group col-md-4 mb-3">
                <label className="form-label">Type:</label>
                <select
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="Task">Task</option>
                  <option value="Bug">Bug</option>
                  <option value="Feature">Feature</option>
                </select>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <label className="required form-label">Time Estimated</label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="form-group mb-3">
              <label className="form-label">Estimated Time</label> <br />
              <input
                type="text"
                className="form-control"
                placeholder="Estimated Time"
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <label className=" form-label">Custom Fields</label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="custom-fields">
              <Accordion
                defaultActiveKey="0"
                className="card card-flush accordionCard"
              >
                <Accordion.Item>
                  <Accordion.Header>
                    <label className=" form-label">Benchmarking</label>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="benchmarking-section mb-4">
                      <h3 className="mb-3">Benchmarking</h3>

                      <div className="form-group mb-3">
                        <label className="form-label">Base:</label>
                        <select
                          className="form-select"
                          value={base}
                          onChange={(e) => setBase(e.target.value)}
                        >
                          <option value="">Choose</option>
                          <option value="Option1">Option 1</option>
                          <option value="Option2">Option 2</option>
                        </select>
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label">Benchmark:</label>
                        <input
                          type="text"
                          className="form-control"
                          value={benchmark}
                          onChange={(e) => setBenchmark(e.target.value)}
                        />
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div>
              <Accordion
                defaultActiveKey="0"
                className="card card-flush accordionCard"
              >
                <Accordion.Item>
                  <Accordion.Header>
                    <label className=" form-label">Type</label>
                  </Accordion.Header>
                  <Accordion.Body>
                    Service Type:
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="col-5">
                        <select
                          name="from[]"
                          id="multiselect"
                          className="form-select"
                          size="8"
                          multiple="multiple"
                          onChange={handleSelectLeft}
                        >
                          {leftItems.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-2 d-flex flex-column justify-content-center align-items-center gap-2">
                        <button
                          type="button"
                          id="multiselect_rightAll"
                          className="btn btn-sm btn-primary me-2"
                          onClick={moveAllRight}
                        >
                          <i className="glyphicon glyphicon-forward">
                            Move All
                          </i>
                        </button>
                        <button
                          type="button"
                          id="multiselect_rightSelected"
                          className="btn btn-secondary"
                          onClick={moveRightSelected}
                        >
                          <i className="glyphicon glyphicon-chevron-right">
                            {" "}
                            {">>"}{" "}
                          </i>
                        </button>
                        <button
                          type="button"
                          id="multiselect_leftSelected"
                          className="btn btn-secondary"
                          onClick={moveLeftSelected}
                        >
                          <i className="glyphicon glyphicon-chevron-left">
                            {"<<"}
                          </i>
                        </button>
                        <button
                          type="button"
                          id="multiselect_leftAll"
                          className="btn btn-sm btn-primary me-2"
                          onClick={moveAllLeft}
                        >
                          <i className="glyphicon glyphicon-backward">
                            Remove All
                          </i>
                        </button>
                      </div>
                      <div className="col-5">
                        <select
                          name="to[]"
                          id="multiselect_to"
                          className="form-select"
                          size="8"
                          multiple="multiple"
                          onChange={handleSelectRight}
                        >
                          {rightItems.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>

            <div className="form-section">
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  id="isFreeCase"
                  className="form-check-input"
                  checked={isFreeCase}
                  onChange={() => setIsFreeCase(!isFreeCase)}
                />
                <label htmlFor="isFreeCase" className="form-check-label">
                  Is Free Case
                </label>
              </div>

              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  id="isSampleCase"
                  className="form-check-input"
                  checked={isSampleCase}
                  onChange={() => setIsSampleCase(!isSampleCase)}
                />
                <label htmlFor="isSampleCase" className="form-check-label">
                  Is Sample Case
                </label>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Page Count:</label>
                <input
                  type="text"
                  className="form-control"
                  value={pageCount}
                  onChange={(e) => setPageCount(e.target.value)}
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Case Plus Variable Values:</label>
                <div className="d-flex flex-wrap gap-2">
                  <input
                    type="text"
                    name="fixedValue"
                    className="form-control"
                    placeholder="Fixed Value"
                    value={variableValues.fixedValue}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="variable1"
                    className="form-control"
                    placeholder="Variable Value 1"
                    value={variableValues.variable1}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="variable2"
                    className="form-control"
                    placeholder="Variable Value 2"
                    value={variableValues.variable2}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <input
                    type="text"
                    name="variable3"
                    className="form-control"
                    placeholder="Variable Value 3"
                    value={variableValues.variable3}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="variable4"
                    className="form-control"
                    placeholder="Variable Value 4"
                    value={variableValues.variable4}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="variable5"
                    className="form-control"
                    placeholder="Variable Value 5"
                    value={variableValues.variable5}
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <input
                    type="text"
                    name="variable6"
                    className="form-control"
                    placeholder="Variable Value 6"
                    value={variableValues.variable6}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="variable7"
                    className="form-control"
                    placeholder="Variable Value 7"
                    value={variableValues.variable7}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-check mt-3">
                  <input
                    type="checkbox"
                    id="finalizeCaseEstimate"
                    className="form-check-input"
                    checked={finalizeCaseEstimate}
                    onChange={() =>
                      setFinalizeCaseEstimate(!finalizeCaseEstimate)
                    }
                  />
                  <label
                    htmlFor="finalizeCaseEstimate"
                    className="form-check-label"
                  >
                    Finalize Case Estimate
                  </label>
                </div>
              </div>

              <div style={{ width: "169px" }}>
                <label className="required form-label">Followup Date:</label>
                <input
                  type="date"
                  className="form-control"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                />
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="card card-flush card-modify form-floating">
        <div>
          <label className="required form-label">Body</label>
          <input
            type="textarea"
            name="body"
            className="form-control mb-2"
            placeholder="Project Message"
          />
        </div>
      </div>

      <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <label className="required form-label">Notifications</label>
          </Accordion.Header>
          <Accordion.Body>
            <div className="tags-container">
              {users.map((user) => (
                <div
                  key={user}
                  className={`tag ${
                    isSelected(user) ? "selected" : ""
                  } form-check`}
                  onClick={() => toggleTag(user)}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={isSelected(user)}
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
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey="0" className="card card-flush accordionCard">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <label className="form-label">Attach Files To This Case</label>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <label htmlFor="notifyAll" className="form-check-label">
                Changes made to the attachments are not permanent until you save
                this post. The first "listed" file will be included in RSS
                feeds. Files must be smaller than 10240 MB and have one of the
                following extensions: au avi bzip2 csv doc docx flv gif graffle
                gz htm html iso jpeg jpg kml kmz mov mp2 mp3 mp4 odp ods odt
                pages patch pdf png pps ppt pptx psd rar svg swf template tif
                tgz txt vsd wav wmv xls xlsx zip 7z.
              </label>
              <input
                type="file"
                id="myfile"
                name="myfile"
                multiple
                onChange={handleFileChange}
              />
            </div>
            {files.length > 0 && (
              <div>
                <p>Files to be uploaded:</p>
                <ul>
                  {Array.from(files).map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
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

// File-Path to Upload Cases (Testing): /home/neuralit/TestingUploads
// File-Path to Upload Cases (Production): /neuralit/files/case_files
