import React from "react";
import { useSelector } from "react-redux";
import * as UiStateSlice from "./redux/UiStateSlice";
import "./App.css";

function Popup(props) {
  const { children } = props;
  const uiState = useSelector((state) => UiStateSlice.selectUiState(state))
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="menu">
          <div className="menu-left"></div>
          <div className="menu-right">
            <input
              type="button"
              value="x"
              className="button"
              onClick={(e) => props.handleClose()}
            ></input>
          </div>
        </div>
        <div className="error">{uiState.currentError}</div>
        {children}
        <div></div>
      </div>
    </div>
  );
}

export default Popup;
