import React, { useState } from 'react';
import "./App.css";

function Month(props) {

  const [now, setNow] = useState(new Date());
  const [monthOfNow, setMonthOfNow] = useState(now.getMonth());
  const [yearOfNow, setYearOfNow] = useState(now.getFullYear());

  function getWeekday(date) {
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[date.getDay()];
  }

  function getMonthName(date) {
    var month = new Array(12);
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    return month[date.getMonth()];
  }

  function getDaysOfMonth(year, month) {
    return 32 - new Date(year, month, 32).getDate()
  }

function getDayComponents(){
  let days = [];
  for (let index = 0; index < getDaysOfMonth(now.getFullYear(), now.getMonth()); index++) {
    days.push(<Day dayOfMonth={index+1} weekday={getWeekday(new Date(yearOfNow, monthOfNow, index+1))}/>);
  }
  return days;
}

  return (
    <div className="month">
      <div className="row day">
        <div className="col-2">&lt;</div>
        <div className="col-8">{getMonthName(now)} {yearOfNow}</div>
        <div className="col-2">&gt;</div>
      </div>
      <div className="row">
        <div className="col-2 text-center small">Start</div>
        <div className="col-2 text-center day-item small">Ende</div>
        <div className="col-2 text-center day-item small">Pause</div>
        <div className="col-2 text-center day-item small">Ist</div>
        <div className="col-2 text-center day-item small">+/-</div>
        <div className="col-2 text-center day-item small"></div>
      </div>
      {getDayComponents()}
    </div>
  );
}

function Day(props) {
  return (
    <div className="row day">
      <div className="col-12">{props.weekday}, {props.dayOfMonth}.</div>
      <div className="col-2 text-center text-muted">--:--</div>
      <div className="col-2 text-center text-muted day-item">--:--</div>
      <div className="col-2 text-center text-muted day-item">--:--</div>
      <div className="col-2 text-center text-muted day-item">--:--</div>
      <div className="col-2 text-center text-muted day-item">--:--</div>
      <div className="col-2 text-center day-item small">Edit</div>
    </div>
  );
}


export default Month;
