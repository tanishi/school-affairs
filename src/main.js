"use strict";

import React from "react";
import ReactDom from "react-dom";
import Calendar from "./calendar.js"

const SCHEME = "http";
const HOST = "localhost";
const PORT = "3000";
const USERID = "R0V7HfEavaVQGhCx";

async function getDeadlines(){
  const headers = new Headers({
  });
  const ops = {
    "mode": "cors"
  };

  const res = await fetch(SCHEME + "://" + HOST + ":" + PORT + "/" + USERID + "/status");
  return await res.json();
}

async function getDetailTask(taskID){
  const url = SCHEME + "://" + HOST + ":" + PORT + "/tasks/" + taskID;
  const res = await fetch(url);
  const task = await res.text();

  console.log(task);
}

(async function initialize(){
  const statuses = await getDeadlines();

  for (let i = 0; i < statuses.length; i++){
    const deadline = statuses[i].deadline;

    const dom = document.getElementById(deadline);
    dom.style.backgroundColor = "green";
    dom.eventParam = statuses[i]._id

    dom.addEventListener("click", function(event){
      getDetailTask(event.target.eventParam)
    }, false);
  }
})();

class App extends React.Component {

  constructor (){
    super();

    const d = new Date();
    this.state = {
      "d": d,
      "yy": d.getFullYear(),
      "mm": d.getMonth()
    };
  }

  render (){
    return (
      <div>
        <button id="leftButton" type="button" className="btn btn-default btn-lg">
          <span className="glyphicon glyphicon-arrow-left"></span>
        </button>
        <button id="rightButton" type="button" className="btn btn-default btn-lg">
          <span className="glyphicon glyphicon-arrow-right"></span>
        </button>
        <Calendar date={this.state}/>
      </div>
        );
  }
}

ReactDom.render(<App />, document.getElementById("container"));

