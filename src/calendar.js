"use strict";

import React from "react";
import ReactDom from "react-dom";

const SCHEME = "http";
const HOST = "localhost";
const PORT = "3000";

const CalendarHead = () => {
  const d = new Date();
  const mm = d.getMonth() + 1;

  return (<div id="month">{mm}</div>);
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
  let m = 0;
  let month = mm - 1;
  for (let i = 0; i < rows; i++){
    let Rows = [];
    for (let j = i * WEEK; j < i * WEEK + WEEK; j++){
      if (m == 0 && days[j] == 1){
        month++;
        m++;
      }
      else if (m == 1 && days[j] == 1){
        month++;
      }

      const id = "0" + month + days[j];
      Rows.push(<td id={id}>{days[j]}</td>);
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
      <div>
        <CalendarHead />
        <CalendarBody />
      </div>
      )
}

module.exports = Calendar;

