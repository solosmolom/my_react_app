import React, { useState, useEffect } from "react";
import userIcon from './svgs/user.svg';
import clockIcon from './svgs/clock.svg';
import upActiveIcon from './svgs/upActive.svg';
import downActiveIcon from './svgs/downActive.svg';
import trashIcon from './svgs/trash.svg';
import duplicateIcon from './svgs/duplicate.svg';
import rightArrowIcon from './svgs/rightArrow.svg';
import greenCheckIcon from './svgs/greenCheck.svg';
import rect1280 from './imgs/Rectangle_1280.jpg';
import rect130 from './imgs/Rectangle_130.jpg';
import { Popup } from "./Popup";
import './App.css';

function TimeFormatter(props) {
  let totalSeconds = Math.round(props.duration);
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = totalSeconds - (hours * 3600) - (minutes * 60);
  let out = "";

  if (hours !== 0) out += hours + "h ";
  if (minutes !== 0) out += minutes + "m ";
  if (seconds !== 0) out += seconds + "s ";

  return <time>{out}</time>;
}

function DynamicTimeFormatter(props) {
  const [duration, setDuration] = useState(props.duration);

  useEffect(() => {
    const interval = setInterval(() => setDuration((d) => d - 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return <TimeFormatter duration={duration} />;
}

const deleteItem = (props) => {
  const message = props.message;
  const setMessage = props.setMessage;
  const job = props.item;
  const jobName = job.name;

  fetch('http://localhost:8080/api/v1/jobs/?name='+jobName, 
    {
      method: 'DELETE',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then((res)=>{
      if (res.status === 200) {
        const newMessage = message.filter((job) => job.name !== jobName);
        setMessage(newMessage);
      }
    });
}

const QueueItem = (props) => {
  const message = props.message;
  const setMessage = props.setMessage;
  const job = props.item;
  let index = props.index;


  const queueUp = (jobName, setUp) => {
    fetch('http://localhost:8080/api/v1/job/move/?name='+jobName+'&up='+setUp, 
      { 
        method: 'POST',
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }

  return (
    <>
      <span className="queueItemReorder">
        <button onClick={() => queueUp(job.name, true)}>
          <img src={upActiveIcon} alt="Up Active Icon"/>
        </button>
        <button onClick={() => queueUp(job.name, false)}>
          <img src={downActiveIcon} alt="Down Active Icon"/>
        </button>
      </span>
      <span className="queueItemImage"><img alt="queue item" src={rect130}></img></span>
      <span className="queueItemData">
        <div className="queuedItemDataLabel">{index++ + ". " + job.name}</div>
        <div className="queuedItemDataInfo">
          <img src={clockIcon} alt="Clock Icon"/>
          <TimeFormatter duration={job.duration} />
          <img src={userIcon} alt="User Icon"/>
          <span>Stanyslav Polotovsky</span>
        </div>
      </span>
      <span className="queueItemMore">
        <button onClick={() => deleteItem({message: message, setMessage:setMessage, item: job})}>
          <img src={trashIcon} alt="Trash Icon"/>
        </button>
        <button><img src={duplicateIcon} alt="Duplicate Icon"/></button>
        <button><img src={rightArrowIcon} alt="Right Arrow Icon"/></button>
      </span>
    </>
  );
}

const PrintingItem= (props) =>{
  const message = props.message;
  const setMessage = props.setMessage;
  const job = props.item;

  const cancelItem = (jobName) => {
    fetch('http://localhost:8080/api/v1/job/cancel/?name='+jobName, 
      {
        method: 'POST',
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then((res)=>{ if (res.status === 200) deleteItem(props); });
  }

  return (
    <>
      <div className="header">
        <span className="printingHeaderLabel">CURRENT PRINTING JOB |</span>
        <span className="printingHeaderTimeLeft"> 20% <DynamicTimeFormatter duration={job.duration} /></span>
        <button onClick={() => cancelItem({message: message, setMessage:setMessage, item: job})}>&#9612;&#9612;</button>
        <span className="printingHeaderBlue"></span>
      </div>
      <div className="printingDetails">
        <img alt="printing item" src={rect1280}></img>
        <span className="printingDetailsData">
          <h1>{job.name} {job.status}</h1>
          <h2>Mor Saubron</h2>
          <div className="printingDetailsTime">
            <span>
              <div>Start Time</div>
              <div>2/4/20, 3:28 PM</div>
            </span>
            <span>
              <div>End Time</div>
              <div>2/4/20, 7:15 PM</div>
            </span>
          </div>
        </span>
      </div>
      <div className="header">
        <span className="managerHeaderLabel">JOB MANAGER STATUS</span>
      </div>
      <ul className="managerData">
        <li>
          <span>Printer IP Address</span>
          <span><b>192.168.22.154</b></span>
        </li>
        <li>
          <span>Printer Name</span>
          <span><b>Boston J750</b></span>  
        </li>
        <li>
          <span>Status</span>
          <span><img src={greenCheckIcon} alt="Green Check Icon"/>Connected</span>
        </li>
        <li>
          <span>Embedded software</span>
          <span><img src={greenCheckIcon} alt="Green Check Icon"/>Connected</span>
        </li>
      </ul>
    </>
  );
}      

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/jobs/",
    {
      method: 'GET',
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then((res) => res.json())
      .then((data) => setMessage(data));
  }, []);


  const queueItems = message && message.length>0 && message.map((job, index) => ( job.status === "queued" ?
    <li className="queueItem" key={job.name}>
      <QueueItem message={message} setMessage={setMessage} item={job} index={index}/>
    </li>
  : null)
  );

  const printingItem = message && message.length>0 && message.map((job) => ( (job.status === "printing") || (job.status === "stopped") ?
    <div className="printing" key={job.name}>
      <PrintingItem message={message} setMessage={setMessage} item={job}/>
    </div>
    : null
    )
  );
  
  const [open, setOpen] = useState(false);
  
   return (
    <div className="App">
      <div className="leftContainer">
        {printingItem}
      </div>
      <span className="middleLine mainMiddleLine"></span>
      <div className="rightContainer">
        <div className="queue">  
          <div className="header">
            <span>QUEUE</span>
            <button onClick={() => setOpen(true)}>ADD A JOB</button>
          </div>
          <ul>{queueItems}</ul>
        </div>        
      </div>
      <div>
        {open ? <Popup message={message} setMessage={setMessage}  closePopup={() => setOpen(false)} /> : null}
      </div>
    </div>
  );
}

export default App;