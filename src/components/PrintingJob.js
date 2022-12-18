import React from "react";
import { cancelJob, deleteJob } from './../jobsAPI';
import { timeFormat, getIcon } from './../utils';
import rect1280 from './../imgs/Rectangle_1280.jpg';
import './PrintingJob.css';

function headerButton(job) {
  return (job.status === "printing") ?
    <button className="printingCancel" onClick={() => cancelJob(job.name)}>{getIcon('pause')}</button>
    : <button className="printingDelete" onClick={() => deleteJob(job.name)}>{getIcon('trash')}</button>;
}

function PrintingJob ({queue}) {
  if (queue && queue.length>0) {
    const job = queue[0];

    return (
      <div className="mainLeft">
        <div className="header">
          <span className="printingHeaderLabel">CURRENT PRINTING JOB |</span>
          <span className="printingHeaderTimeLeft"> 20% {timeFormat(job.duration)}</span>
          {headerButton(job)}
          <span className="printingHeaderBlue"></span>
        </div>
        <div className="printingDetails">
          <img alt="printing item" src={rect1280}></img>
          <h1>{job.name} {job.status}</h1>
          <h2>Mor Saubron</h2>
          <span>
            <div>Start Time</div>
            <div>2/4/20, 3:28 PM</div>
          </span>
          <span>
            <div>End Time</div>
            <div>2/4/20, 7:15 PM</div>
          </span>
        </div>
        <div className="header jobManagerHeader">JOB MANAGER STATUS</div>
        <ul>
          <li>Printer IP Address<span>192.168.22.154</span></li>
          <li>Printer Name<span>Boston J750</span></li>
          <li>Status<span>{getIcon('greenCheck')}Connected</span></li>
          <li>Embedded software <span>{getIcon('greenCheck')}Connected</span></li>
        </ul>
      </div>
    );
  }
  return null;
}

export default PrintingJob;
