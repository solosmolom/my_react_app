import React from "react";
import { useState } from 'react';

import "./Popup.css";

export const Popup = (props) => {
  const message = props.message;
  const setMessage = props.setMessage;
  const closePopup = props.closePopup;

  const [jobName, setJobName] = useState();
  const [jobDuration, setJobDuration] = useState();

  const addNewJob = () => {
    if (jobName !== undefined && jobDuration !== undefined) {
      fetch('http://localhost:8080/api/v1/jobs/', 
      { 
        method: 'POST',
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
            "duration": jobDuration,
            "name": jobName
        })
      })
        .then((res) => res.json())
        .then((data) => {
          const newMessage = message.concat([data]);
          setMessage(newMessage);
        });
       closePopup();
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewJob();
  }

  return (
    <div className="popup">
      <div className="popupBody">
        <div className="newHeader">
          <span>New job</span>
          <button onClick={closePopup}>&#9587;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="leftForm">
            <h1>Job Details</h1>
            <h2>Name</h2>
            <input type="text" placeholder={"Type a name for this job..."} onChange={(e)=>setJobName(e.target.value)} />
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
          <span className="middleLine newFormMiddleLine"></span>
          <div className="rightForm">
            <h1>Job Prefrences</h1>
            <h2>Surface Finish</h2>
            <select value={"Glossy"} onChange={()=>{}}>
              <option value="Glossy">Glossy</option>
              <option value="Matte">Matte</option>
            </select>
            <h2>Vivid Materials</h2>
            <select value={"Opaque"} onChange={()=>{}}>
              <option value="Opaque">Opaque</option>
              <option value="Transparent">Transparent</option>
            </select>
            <h2>Strength</h2>
            <select value={"Light"} onChange={()=>{}}>
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
            <h2>Material in support</h2>
            <select value={"White"} onChange={()=>{}}>
              <option value="White">White</option>
              <option value="Black">Black</option>
              <option value="Red">Red</option>
            </select>
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