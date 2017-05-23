"use strict";

import React from "react";
import ReactDom from "react-dom";
import { Modal, Button } from "react-bootstrap";
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

class App extends React.Component {

  constructor (){
    super();

    const d = new Date();
    this.state = {
      "d": d,
      "yy": d.getFullYear(),
      "mm": d.getMonth()
    };
    this.initialize();
  }

  async initialize(){
    const statuses = await getDeadlines();

    for (let i = 0; i < statuses.length; i++){
      const deadline = statuses[i].deadline;

      const dom = document.getElementById(deadline);
      if (dom){
        dom.style.backgroundColor = "orange";
        dom.eventParam = statuses[i]._id

        dom.addEventListener("click", function(event){
          getDetailTask(event.target.eventParam)
        }, false);
      }
    }
  };


  moveMonth(idx){
    let mm = this.state.mm;
    if (mm + idx < 0){
      this.setState({
        "yy": this.state.yy - 1,
        "mm": 11
      });
    }
    else if (mm + idx > 11){
      this.setState({
        "yy": this.state.yy + 1,
        "mm": 0
      });
    }
    else {
      this.setState({
        "mm": mm + idx
      });
    }
    this.initialize();
  }

  render (){
    return (
      <div>
        <button id="leftButton" type="button" className="btn btn-default btn-lg"
          onClick={e => this.moveMonth(-1)}>
          <span className="glyphicon glyphicon-arrow-left"></span>
        </button>
        <button id="rightButton" type="button" className="btn btn-default btn-lg"
          onClick={e => this.moveMonth(1)}>
          <span className="glyphicon glyphicon-arrow-right"></span>
        </button>
        <Calendar date={this.state}/>
      </div>
        );
  }
}

ReactDom.render(<App />, document.getElementById("container"));

