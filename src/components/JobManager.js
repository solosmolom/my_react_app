import React from "react";
import { getIcon } from './../utils';
import './JobManager.css';

function JobManager () {
  return (
    <div className="manager">
      <div className="header">JOB MANAGER STATUS</div>
      <ul>
        <li>Printer IP Address<span>192.168.22.154</span></li>
        <li>Printer Name<span>Boston J750</span></li>
        <li>Status<span>{getIcon('greenCheck')}Connected</span></li>
        <li>Embedded software <span>{getIcon('greenCheck')}Connected</span></li>
      </ul>
    </div>
  );
}

export default JobManager;


