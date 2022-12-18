const FETCH_BASE_URL = 'http://localhost:8080/api/v1/job';
const FETCH_HEADERS = { 
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export function reorderJob(jobName, setUp) {
  fetch(FETCH_BASE_URL+'/move/?name='+jobName+'&up='+setUp, 
    { 
      method: 'POST',
      headers : FETCH_HEADERS
    })
    .then((res) => (res.status === 200) ?
      console.log("job reorderd successfully")
      : console.log("error occurred (status code: " + res.status + ")"));
}

export function cancelJob(jobName) {
  fetch(FETCH_BASE_URL+'/cancel/?name='+jobName, 
    {
      method: 'POST',
      headers : FETCH_HEADERS
    })
    .then((res) => {
      if (res.status === 200) {
        console.log("job canceled successfully");
      } else
        console.log("error occurred (status code: " + res.status + ")");
    });
}

export function deleteJob(jobName) {
  fetch(FETCH_BASE_URL+'s/?name='+jobName, 
    {
      method: 'DELETE',
      headers : FETCH_HEADERS
    })
    .then((res) => (res.status === 200) ?
      console.log("job deleted successfully")
      : console.log("error occurred (status code: " + res.status + ")"));
}

export function getJobs(setQueue) {
  fetch(FETCH_BASE_URL+'s/',
    {
      method: 'GET',
      headers : FETCH_HEADERS
    })
    .then((res) => res.json())
    .then((data) => setQueue(data));
}

export function addJob(jobName, jobDuration) {
  fetch(FETCH_BASE_URL+'s/', 
  { 
    method: 'POST',
    headers : FETCH_HEADERS,
    body: JSON.stringify({
        "name": jobName,
        "duration": jobDuration
    })
  })
  .then((res) => (res.status === 200) ?
    console.log("job added successfully")
    : console.log("error occurred (status code: " + res.status + ")"));
}
