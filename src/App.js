import React, { useState, useEffect } from "react";
import PrintingJob from './components/PrintingJob';
import QueueJobs from './components/QueueJobs';
import JobManager from './components/JobManager';
import Popup from './components/Popup';
import { getJobs } from './jobsAPI';
import './App.css';

const SERVER_UPDATE_INTERVAL = 1000;

function App() {
  const [queue, setQueue] = useState();
  const [jobForm, setJobForm] = useState(false);

  useEffect(() => {
    if (SERVER_UPDATE_INTERVAL !== null) {
      let id = setInterval(() => getJobs(setQueue), SERVER_UPDATE_INTERVAL);
      return () => clearInterval(id);
    }
  }, []);

   return (
    <div className="App">
      <div className="mainLeft">
        <PrintingJob queue={queue} />
        <JobManager />
      </div>
      <div className="mainRight">
        <QueueJobs queue={queue} setJobForm={setJobForm} />      
      </div>
      {jobForm ? <Popup setJobForm={setJobForm} /> : null}
    </div>
  );
}

export default App;