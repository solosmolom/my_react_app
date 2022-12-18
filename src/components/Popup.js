import React, { useState } from "react";
import { addJob } from './../jobsAPI';
import "./Popup.css";

const Select = ({title, options}) => {
  return (
    <>
      <h2>{title}</h2>
      <select>
        {options.map((optionValue) => 
          <option key={optionValue} value={optionValue}>{optionValue}</option>
        )}
      </select>
    </>
  );
}

function Popup({closePopup}) {

  const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const [jobName, setJobName] = useState();
  const [jobDuration, setJobDuration] = useState(randomIntFromInterval(10,10000));
  const handleSubmit = (event) => {
    event.preventDefault();
    if (jobName !== undefined && jobDuration !== undefined) {
      addJob(jobName,jobDuration);
      closePopup();
    }
  }

  return (
    <div className="popup">
      <div className="popupBody">
        <div className="newHeader">New Job<button onClick={closePopup}>&#9587;</button></div>
        <form onSubmit={handleSubmit}>
          <div className="formLeft">
            <h1>Job Details</h1>
            <h2>Name</h2>
            <input type="text" placeholder={"Type a name for this job..."} onChange={(e)=>setJobName(e.target.value)}/>
            <h2>Duration</h2>
            <input type="number" placeholder={"Enter a job Duration in seconds"} onChange={(e)=>setJobDuration(e.target.valueAsNumber)}/>
            <h2>Printer Operator</h2>
            <select>
              <option defaultValue hidden>Select a Printer Operator...</option>
              <option value="Boston J750">Boston J750</option>
              <option value="Boston J735">Boston J735</option>
            </select>
            <label>
              <input type="checkbox" defaultChecked={true} /> Priority job
            </label>
          </div>
          <div className="formRight">
            <h1>Job Prefrences</h1>
            <Select title="Surface Finish" options={["Glossy", "Matte"]} />
            <Select title="Vivid Materials" options={["Opaque", "Transparent"]} />
            <Select title="Strength" options={["Light", "Dark"]} />
            <Select title="Material in support" options={["White", "Black", "Red"]} />
            <p className="bottomFormCancelSave">
              <input type="button" value="Cancel" onClick={closePopup} />
              <input type="submit" value="Save" />
            </p>
          </div>
        </form>      
      </div>
    </div>
  );
}

export default Popup;
