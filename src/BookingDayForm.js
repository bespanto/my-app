import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as BookingEntriesSlice from "./redux/BookingEntriesSlice";
import * as DateUtils from "./DateUtils";

function BookingDayForm(props) {
  const dispatch = useDispatch();
  const bookingEntries = useSelector((state) =>
    BookingEntriesSlice.selectBookingEntries(state)
  );
  console.log(props.date.getFullYear());
  const actDateStr = props.date.getFullYear() + "-" + props.date.getMonth() + "-" + props.date.getDate()
  const bookingEntry = bookingEntries.find((item) => item.day === actDateStr);

  console.log(bookingEntry);
  const [editStart, setEditStart] = useState(
    bookingEntry === undefined ? "" : bookingEntry.start
  );
  const [editEnd, setEditEnd] = useState(
    bookingEntry === undefined ? "" : bookingEntry.end
  );
  const [editBreak, setEditBreak] = useState(
    bookingEntry === undefined ? "" : bookingEntry.break
  );

  function handleSubmit(e) {
    e.preventDefault()
    console.log("handleSubmit");
    dispatch(
      BookingEntriesSlice.editBookingEntry(
        {
        day: actDateStr,
        start: editStart,
        end: editEnd,
        break: editBreak,
      }
      )
    );
    props.closePopup();
  }

  function handleChange(event) {
    console.log(event.target.value);
    switch (event.target.name) {
      case "start":
        setEditStart(event.target.value);
        break;
      case "end":
        setEditEnd(event.target.value);
        break;
      case "break":
        setEditBreak(event.target.value);
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <p>{DateUtils.getDateString(props.date)}</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>Start</div>
          <div>
            <input
              id="start"
              name="start"
              type="text"
              maxLength="5"
              className="time-input"
              value={editStart}
              onChange={handleChange}
            />
          </div>
          <div>Ende</div>
          <div>
            <input
              name="end"
              type="text"
              maxLength="5"
              className="time-input"
              value={editEnd}
              onChange={handleChange}
            />
          </div>
          <div>Pause</div>
          <div>
            <input
              name="break"
              type="text"
              maxLength="5"
              className="time-input"
              value={editBreak}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <input
            type="submit"
            value={props.submitButtonValue}
            className="button"
          />
        </div>
      </form>
    </div>
  );
}

export default BookingDayForm;
