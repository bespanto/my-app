import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as BookingEntriesSlice from "./redux/BookingEntriesSlice";
import Popup from "./Popup";
import shortid from 'shortid';
import "./App.css";


function Month(props) {
  const [now, setNow] = useState(new Date());
  const [popupIsVisible, setPopupIsVisible] = useState(false);
  const bookingEntries = useSelector((state) => BookingEntriesSlice.selectBookingEntries(state))

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

  function getDayComponents() {
    let days = [];
    for (let index = 0; index < getDaysOfMonth(now.getFullYear(), now.getMonth()); index++) {
      const day = index + 1;
      const actDate = new Date(now.getFullYear(), now.getMonth(), day)
      const actDateStr = now.getFullYear() + "-" + now.getMonth() + "-" + day;
      const bookingEntry = bookingEntries.get(actDateStr);
      days.push(<Day
        key={shortid.generate()}
        date={actDate}
        start={bookingEntry !== undefined ? bookingEntry.start : ''}
        end={bookingEntry !== undefined ? bookingEntry.end : ''}
        break={bookingEntry !== undefined ? bookingEntry.break : ''}
        showPopup={showPopup}/>);
    }
    return days;
  }

  function monthDown(e) {
    e.preventDefault();
    if(now.getMonth() === 0)
    setNow(new Date(now.getFullYear()-1, 11))
  else
    setNow(new Date(now.getFullYear(), now.getMonth()-1))
  }

  function monthUp(e) {
    e.preventDefault();
    if(now.getMonth() === 11)
      setNow(new Date(now.getFullYear()+1, 0))
    else
      setNow(new Date(now.getFullYear(), now.getMonth()+1))
  }
  
  function showPopup(){
    console.log('showPopup');
    setPopupIsVisible(true);
  }

  function closePopup(){
    console.log('closePopup');
    setPopupIsVisible(false);
  }

function closePopupWithSave(objToSave){
  console.log('closePopupWithSave' + objToSave);
  closePopup();
}

  return (
    <div className="month">
      <div>
        <div className="row day">
          <div className="col-2">
            <input type="button" value="<" className="button" onClick={(e) => monthDown(e)}></input>
          </div>
          <div className="col-8">{getMonthName(now)} {now.getFullYear()}</div>
          <div className="col-2">
            <input type="button" value=">" className="button" onClick={(e) => monthUp(e)}></input></div>
        </div>
        <div className="row">
          <div className="col-2 text-center small">Start</div>
          <div className="col-2 text-center day-item small">Ende</div>
          <div className="col-2 text-center day-item small">Pause</div>
          <div className="col-2 text-center day-item small">Ist</div>
          <div className="col-2 text-center day-item small">+/-</div>
          <div className="col-2 text-center day-item small"></div>
        </div>
      </div>
      <div>
        {getDayComponents()}
      </div>
      {popupIsVisible &&
        <Popup handleClose={closePopup} handleSave={closePopupWithSave}>
          <div>
            Popup
          </div>
        </Popup>}
    </div>
  );
}

function Day(props) {

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

  return (
    <div className="row day">
      <div className="col-12">{getWeekday(props.date)}, {props.date.getDate()}.</div>
      <div className="col-2 text-center text-muted">{props.start === '' ? '--:--' : props.start}</div>
      <div className="col-2 text-center text-muted day-item">{props.end === '' ? '--:--' : props.end}</div>
      <div className="col-2 text-center text-muted day-item">{props.break === '' ? '--:--' : props.break}</div>
      <div className="col-2 text-center text-muted day-item">--:--</div>
      <div className="col-2 text-center text-muted day-item">--:--</div>
      <div className="col-2 text-center day-item small">
      <input type="button" value="Edit" className="button-small" onClick={() => props.showPopup()}></input>
      </div>
    </div>
  );
}


export default Month;
