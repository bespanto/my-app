import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BookingEntriesSlice from "./redux/BookingEntriesSlice";
import * as DateUtils from "./DateUtils";
import "./App.css";

function Day(props) {
  const bookingEntries = useSelector((state) =>
    BookingEntriesSlice.selectBookingEntries(state)
  );
  const actDateStr = props.date.getFullYear() + "-" + props.date.getMonth() + "-" + props.date.getDate()
  const bookingEntry = bookingEntries.find((item) => item.day === actDateStr);

  return (
    <div className="row day">
      <div className="col-12">
        {DateUtils.getWeekday(props.date)}, {props.date.getDate()}.
      </div>
      <div className="col-2 text-center text-muted">
        {bookingEntry === undefined ? "--:--" : bookingEntry.start}
      </div>
      <div className="col-2 text-center text-muted day-item">
        {bookingEntry === undefined ? "--:--" : bookingEntry.end}
      </div>
      <div className="col-2 text-center text-muted day-item">
        {bookingEntry === undefined ? "--:--" : bookingEntry.break}
      </div>
      <div className="col-2 text-center text-muted day-item">--:--</div>
      <div className="col-2 text-center text-muted day-item">--:--</div>
      <div className="col-2 text-center day-item small">
        <input
          type="button"
          value="Edit"
          className="button-small"
          onClick={() => props.showPopup(props.date)}
        ></input>
      </div>
    </div>
  );
}

export default Day;
