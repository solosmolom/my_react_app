import React, { useState } from "react";
import Popup from "./Popup";
import { reorderJob, deleteJob } from './../jobsAPI';
import { timeFormat, getIcon } from './../utils';
import rect130 from './../imgs/Rectangle_130.jpg';
import './Queuejobs.css';

const QueueJob = ({job, index}) => {
  return (
    <><li key={job.name}>
      <button className="queueItemUp" onClick={() => reorderJob(job.name, true)}>{getIcon('up')}</button>
      <button className="queueItemDown" onClick={() => reorderJob(job.name, false)}>{getIcon('down')}</button>
      <img alt="queue item" src={rect130}></img>
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
      <button className="deleteJob" onClick={() => deleteJob(job.name)}>{getIcon('trash')}</button>
      <button className="duplicateJob">{getIcon('duplicate')}</button>
      <button className="arrowJob">{getIcon('rightArrow')}</button>
      </li>
    </>
  );
}

function QueueJobs({queue, setQueue}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mainRight">
          <div className="header">
            QUEUE
            <button onClick={() => setOpen(true)}>ADD A JOB</button>
          </div>
          <ul>
            {queue && queue.length>0 && queue.map((job, index) => (job.status === "queued") &&
              <QueueJob key={job.name} job={job} index={index}/>
            )}
          </ul>
          {open ? <Popup queue={queue} setQueue={setQueue}  closePopup={() => setOpen(false)} /> : null}
      </div>

    </>
  );
}

export default QueueJobs;