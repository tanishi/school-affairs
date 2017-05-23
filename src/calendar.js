"use strict"

import React from "react";
import ReactDom from "react-dom";
import DetailTask from "./DetailTask.js";


class Calendar extends React.Component {
  constructor(props){
    super();
  }

  CalcCalendar (props){
    const yy = props.date.yy;
    const mm = props.date.mm;

    const lastDate = new Date(yy, mm, 0);
    const date = new Date(yy, mm + 1, 0);

    const lastDateEndDate = lastDate.getDate();
    const lastDateEndDay = lastDate.getDay();
    const endDate = date.getDate();
    const endDay = date.getDay();

    let days = [];

    const SATURDAY = 6;
    const FIVEWEEK = 35;
    const SIXWEEK = 42;
    if (lastDateEndDay != SATURDAY){
      for (let i = lastDateEndDate - lastDateEndDay; i <= lastDateEndDate; i++){
        days.push(i);
      }
      for (let i = 1; i <= endDate; i++){
        days.push(i);
      }

      const dlen = days.length;

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
    let month = mm;
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
        Rows.push(<td id={id} key={id}><DetailTask day={days[j]} /></td>);
      }
      Tbody.push(<tr key={i}>{Rows}</tr>);
    }

    return (
        <tbody>
          {Tbody}
        </tbody>
        );
  }

  CalendarHead (props){
    const yy = props.date.yy;
    const mm = props.date.mm + 1;

    return (
        <div id="month">
          <span>{yy + " "}</span>
          {mm}
        </div>
        );
  }


  Today (){
    const today = ["日", "月", "火", "水", "木", "金", "土"];

    const Thead = today.map((t, i) => {
      return (<th key={t}>{t}</th>);
    });

    return (
        <thead>
          <tr>
            {Thead}
          </tr>
        </thead>
        );
  }


  render (){
    return (
        <div>
          {this.CalendarHead(this.props)}
          <table>
            {this.Today()}
            {this.CalcCalendar(this.props)}
          </table>
        </div>
        );
  }
}


module.exports = Calendar;

