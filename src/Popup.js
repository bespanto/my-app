import React from 'react';
import "./App.css";

function Popup(props) {
  const {children} = props;
  return (
    <div className='popup'>
      <div className='popup-content'>
        {children}
        <div>
          <button onClick={(e) => props.showPopup(false)} className="button">Close</button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
