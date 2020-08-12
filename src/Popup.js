import React from 'react';
import "./App.css";

function Popup(props) {
  return (
    <div className='popup'>
      <div className='popup-content'>
        <h3>{props.text}</h3>
        <button onClick={(e) => props.closePopup(false)} className="button">close me</button>
      </div>
    </div>
  );
}

export default Popup;
