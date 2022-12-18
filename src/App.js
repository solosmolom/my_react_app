import React, { useState, useEffect } from "react";
import { getJobs } from './jobsAPI';
import QueueJobs from './components/QueueJobs';
import PrintingJob from './components/PrintingJob';
import './App.css';

const SERVER_UPDATE_INTERVAL = 1000;

function App() {
  const [queue, setQueue] = useState();

  function useInterval() {
    useEffect(() => {
      if (SERVER_UPDATE_INTERVAL !== null) {
        let id = setInterval(() => getJobs(setQueue), SERVER_UPDATE_INTERVAL);
        return () => clearInterval(id);
      }
    }, []);
  }

  useInterval();
  
   return (
    <div className="App">
      <PrintingJob queue={queue} />
      <QueueJobs queue={queue} setQueue={setQueue} />
    </div>
  );
}

export default App;