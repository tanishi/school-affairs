"use strict";

import React from "react";
import ReactDom from "react-dom";

const CalendarHead = (props) => {
}

const Today = () => {
  const today = ["日", "月", "火", "水", "木", "金", "土"];

  const Thead = today.map((e) => {
    return (<th>{e}</th>);
  });

  return (
      <thead>
        <tr>
          {Thead}
        </tr>
      </thead>
      )
}

const CalcCalendar = () => {
  const d = new Date();
  const yy = d.getFullYear();
  const mm = d.getMonth() + 1;

  const lastDate = new Date(yy, mm - 1, 0);
  const date = new Date(yy, mm, 0);

  const lastDateEndDate = lastDate.getDate();
  const lastDateEndDay = lastDate.getDay();

  const endDate = date.getDate();
  const endDay = date.getDay();

  let days = [];

  if (lastDateEndDay != 6){
    for (let i = lastDateEndDate - lastDateEndDay; i <= lastDateEndDate; i++){
      days.push(i);
    }
    for (let i = 1; i <= endDate; i++){
      days.push(i);
    }

    const dlen = days.length;
    const FIVEWEEK = 35;
    const SIXWEEK = 42;

    if (dlen < FIVEWEEK){
      for (let i = 1; i <= FIVEWEEK - dlen; i++){
        days.push(i);
      }
    }
    else if (dlen > FIVEWEEK){
      for (let i = 1; i <= SIXWEEK - dlen; i++){
        days.push(i);
      }
    }
  }
  else {
    for (let i = 1; i <= endDate; i++){
      days.push(i);
    }
    for (let i = 1; i <= FIVEWEEK - endDate; i++){
      days.push(i);
    }
  }

  const WEEK = 7;

  const rows = days.length / WEEK;

  let Tbody = [];
  for (let i = 0; i < rows; i++){
    let Rows = [];
    for (let j = i * WEEK; j < i * WEEK + WEEK; j++){
      Rows.push(<td>{days[j]}</td>);
    }
    Tbody.push(<tr>{Rows}</tr>);
  }

  return (
      <tbody>
        {Tbody}
      </tbody>
      );
}

const CalendarBody = () => {
  return (
      <table>
        <Today />
        <CalcCalendar />
      </table>
      );
}

const Calendar = () => {
  return (
      <CalendarBody />
      )
}

const headers = new Headers({
});
const ops = {
  "mode": "cors"
};

fetch("http://localhost:3000/0/status", ops)
  .then((res) => {
    return res.text();
  })
  .then((json) => {
    console.log(json)
  });

ReactDom.render(<Calendar />, document.getElementById("container"));
