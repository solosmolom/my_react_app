import React from "react";
import { reorderJob, deleteJob } from './../jobsAPI';
import { timeFormat, getIcon } from './../utils';
import rect130 from './../imgs/Rectangle_130.jpg';
import './Queuejobs.css';

function queueItemReorder(job, index, total) {  
  return (
    <>
      <button 
        className="queueItemUp" 
        disabled={(index === 1) && "disabled"} 
        onClick={() => reorderJob(job.name, true)}>
        {getIcon('up')}
      </button>
      <button 
        className="queueItemDown" 
        disabled={(index === total - 1) && "disabled"} 
        onClick={() => reorderJob(job.name, false)}>
        {getIcon('down')}
      </button>
    </>
  );
}

function queueItemData(job, index) {  
  return (
    <>
      <div className="queuedItemDataLabel">
        <span>{index + "."}</span>
        <span>{job.name}</span>
      </div>
      <div className="queuedItemDataInfo">
        {getIcon('clock')}
        {timeFormat(job.duration)}
        {getIcon('user')}
        <span>Stanyslav Polotovsky</span>
      </div>
    </>
  );
}

function queueItemNav(job) {  
  return (
    <>
      <button className="deleteJob" onClick={() => deleteJob(job.name)}>{getIcon('trash')}</button>
      <button className="duplicateJob">{getIcon('duplicate')}</button>
      <button className="arrowJob">{getIcon('rightArrow')}</button>
    </>
  );
}

const QueueItem = ({job, index, total}) => {
  return (
    <li key={job.name}>
      {queueItemReorder(job, index, total)}
      <img alt="queue item" src={rect130}></img>
      {queueItemData(job, index)}
      {queueItemNav(job)}
    </li>
  );
}

function QueueJobs({queue, setJobForm}) {
  return (
    <div className="queue">
        <div className="header">
          QUEUE
          <button onClick={() => setJobForm(true)}>ADD A JOB</button>
        </div>
        <ul>
          {queue && queue.length>0 && queue.map((job, index) => (job.status === "queued") &&
            <QueueItem key={job.name} job={job} index={index} total={queue.length}/>
          )}
        </ul>
    </div>
  );
}

export default QueueJobs;