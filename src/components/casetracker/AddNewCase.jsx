import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";

export const AddNewCase = () => {
  const [project, setProject] = useState("");
  const [assignedTo, setAssignedTo] = useState("Unassigned");
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("Normal");
  const [type, setType] = useState("Task");

  // this is notification
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

  // submit button
  const handleSave = () => {
    alert("Settings have been saved.");
  };

  ///////////////////////

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

  ///////////////////
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

  //////////////////////////////////////////
  const [showBenchmarking, setShowBenchmarking] = useState(false);
  const [base, setBase] = useState("");
  const [benchmark, setBenchmark] = useState("");

  const toggleBenchmarking = () => {
    setShowBenchmarking(!showBenchmarking);
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
            <div className="d-flex align-items-center gap-20">
              <div>
                <label className="required form-label">Due Date</label>
                <br />
                <input
                  type="date"
                  name="due date"
                  title="The due date for this case"
                  placeholder="Project Name"
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
            <div>
              <label>Project:</label>
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                required
              >
                <option value="">--Choose--</option>
                <option value="Project 1">Project 1</option>
                <option value="Project 2">Project 2</option>
              </select>
            </div>

            <div>
              <label>Assign To:</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              >
                <option value="Unassigned">Unassigned</option>
                <option value="User 1">User 1</option>
                <option value="User 2">User 2</option>
              </select>
            </div>

            <div>
              <div>
                <label>Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label>Priority:</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label>Type:</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
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
            <div className="form-group">
              <label>Estimated Time</label> <br />
              <input type="text" placeholder="Estimated Time" />
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
                    <div className="benchmarking-section">
                      <h3>Benchmarking</h3>
                      <div>
                        <label>Base:</label>
                        <select
                          value={base}
                          onChange={(e) => setBase(e.target.value)}
                        >
                          <option value="">Choose</option>
                          <option value="Option1">Option 1</option>
                          <option value="Option2">Option 2</option>
                        </select>
                      </div>
                      <div>
                        <label>Benchmark:</label>
                        <input
                          type="text"
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
                    <div>
                      <div className="col-xs-5">
                        <select
                          name="from[]"
                          id="multiselect"
                          className="form-control"
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

                      <div className="col-xs-2">
                        <button
                          type="button"
                          id="multiselect_rightAll"
                          style={{ backgroundColor: "red", color: "white" }}
                          onClick={moveAllRight}
                        >
                          <i className="glyphicon glyphicon-forward"></i>
                        </button>
                        <button
                          type="button"
                          id="multiselect_rightSelected"
                          onClick={moveRightSelected}
                        >
                          <i className="glyphicon glyphicon-chevron-right"></i>
                        </button>
                        <button
                          type="button"
                          id="multiselect_leftSelected"
                          onClick={moveLeftSelected}
                        >
                          <i className="glyphicon glyphicon-chevron-left"></i>
                        </button>
                        <button
                          type="button"
                          id="multiselect_leftAll"
                          onClick={moveAllLeft}
                        >
                          <i className="glyphicon glyphicon-backward"></i>
                        </button>
                      </div>

                      <div className="col-xs-5">
                        <select
                          name="to[]"
                          id="multiselect_to"
                          className="form-control"
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

            <div>
              <div>
                <input
                  type="checkbox"
                  id="isFreeCase"
                  checked={isFreeCase}
                  onChange={() => setIsFreeCase(!isFreeCase)}
                />
                <label htmlFor="isFreeCase">Is Free Case</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  id="isSampleCase"
                  checked={isSampleCase}
                  onChange={() => setIsSampleCase(!isSampleCase)}
                />
                <label htmlFor="isSampleCase">Is Sample Case</label>
              </div>

              <div>
                <label>Page Count:</label>
                <input
                  type="text"
                  value={pageCount}
                  onChange={(e) => setPageCount(e.target.value)}
                />
              </div>

              <div>
                <label>Case Plus Variable Values:</label>
                <div>
                  <input
                    type="text"
                    name="fixedValue"
                    placeholder="Fixed Value"
                    value={variableValues.fixedValue}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="variable1"
                    placeholder="Variable Value 1"
                    value={variableValues.variable1}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="variable2"
                    placeholder="Variable Value 2"
                    value={variableValues.variable2}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="variable3"
                    placeholder="Variable Value 3"
                    value={variableValues.variable3}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="variable4"
                    placeholder="Variable Value 4"
                    value={variableValues.variable4}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="variable5"
                    placeholder="Variable Value 5"
                    value={variableValues.variable5}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="variable6"
                    placeholder="Variable Value 6"
                    value={variableValues.variable6}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="variable7"
                    placeholder="Variable Value 7"
                    value={variableValues.variable7}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="finalizeCaseEstimate"
                    checked={finalizeCaseEstimate}
                    onChange={() =>
                      setFinalizeCaseEstimate(!finalizeCaseEstimate)
                    }
                  />
                  <label htmlFor="finalizeCaseEstimate">
                    Finalize Case Estimate
                  </label>
                </div>
              </div>

              <div>
                <label>Followup Date:</label>
                <input
                  type="date"
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
            <label className=" form-label">Attach Files To This Case</label>
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
              <input type="file" id="myfile" name="myfile" />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="form-group">
        <button onClick={handleSave} className="btn btn-sm btn-primary me-2">
          Submit
        </button>
      </div>

    </>
  );
};
