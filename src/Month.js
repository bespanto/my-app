import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BookingEntriesSlice from "./redux/BookingEntriesSlice";
import * as DateUtils from "./DateUtils";
import Day from "./Day";
import Popup from "./Popup";
import BookingDayForm from "./BookingDayForm";
import shortid from "shortid";
import "./App.css";

function Month(props) {
  const [editDate, setEditDate] = useState('');
  const [now, setNow] = useState(new Date());
  const [popupIsVisible, setPopupIsVisible] = useState(false);
  const bookingEntries = useSelector((state) =>
    BookingEntriesSlice.selectBookingEntries(state)
  );

  function getDayComponents() {
    let days = [];
    for (
      let index = 0;
      index < DateUtils.getDaysInMonth(now.getFullYear(), now.getMonth());
      index++
    ) {
      const day = index + 1;
      const actDate = new Date(now.getFullYear(), now.getMonth(), day);
      days.push(
        <Day
          key={shortid.generate()}
          date={actDate}
          // start={bookingEntry !== undefined ? bookingEntry.start : ""}
          // end={bookingEntry !== undefined ? bookingEntry.end : ""}
          // break={bookingEntry !== undefined ? bookingEntry.break : ""}
          showPopup={showPopup}
        />
      );
    }
    return days;
  }

  function monthDown(e) {
    e.preventDefault();
    if (now.getMonth() === 0) setNow(new Date(now.getFullYear() - 1, 11));
    else setNow(new Date(now.getFullYear(), now.getMonth() - 1));
  }

  function monthUp(e) {
    e.preventDefault();
    if (now.getMonth() === 11) setNow(new Date(now.getFullYear() + 1, 0));
    else setNow(new Date(now.getFullYear(), now.getMonth() + 1));
  }

  function showPopup(date) {
    console.log("showPopup: " + date);
    setEditDate(date);
    setPopupIsVisible(true);
  }

  function closePopup() {
    console.log("closePopup");
    setPopupIsVisible(false);
  }

  return (
    <div className="month">
      <div>
        <div className="row day">
          <div className="col-2">
            <input
              type="button"
              value="<"
              className="button"
              onClick={(e) => monthDown(e)}
            ></input>
          </div>
          <div className="col-8">
            {DateUtils.getMonthName(now)} {now.getFullYear()}
          </div>
          <div className="col-2">
            <input
              type="button"
              value=">"
              className="button"
              onClick={(e) => monthUp(e)}
            ></input>
          </div>
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
      <div>{getDayComponents()}</div>
      {popupIsVisible && (
        <Popup handleClose={closePopup}>
          <BookingDayForm
            date={editDate}
            submitButtonValue="Save"
            closePopup={closePopup}
          />
        </Popup>
      )}
    </div>
  );
}

export default Month;
