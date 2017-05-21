"use strict";

import React from "react";
import ReactDom from "react-dom";
import Calendar from "./calendar.js"

const SCHEME = "http";
const HOST = "localhost";
const PORT = "3000";

function getDetailTask(){
  return fetch(SCHEME + "://" + HOST + ":" + PORT + "/task/" + taskID)
    .then((res) => {
      return res.json();
    });
}

function getDeadlines(){
  const userID = "R0V7HfEavaVQGhCx";
  const headers = new Headers({
  });
  const ops = {
    "mode": "cors"
  };

  return fetch(SCHEME + "://" + HOST + ":" + PORT + "/" + userID + "/status")
    .then((res) => {
      return res.json();
    })
}

(async function initialize(){
  const statuses = await getDeadlines();

  for (let i = 0; i < statuses.length; i++){
    const deadline = statuses[i].deadline;
    console.log(deadline);

    document.getElementById(deadline).style.backgroundColor = "green";
  }
})();

const App = () => (
    <div>
      <button id="leftButton" type="button" className="btn btn-default btn-lg">
        <span className="glyphicon glyphicon-arrow-left"></span>
      </button>
      <button id="rightButton" type="button" className="btn btn-default btn-lg">
        <span className="glyphicon glyphicon-arrow-right"></span>
      </button>
      <Calendar />
    </div>
    );

ReactDom.render(<App />, document.getElementById("container"));

