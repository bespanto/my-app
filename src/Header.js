import React from 'react';
import "./App.css";

function Header(props) {

  return (
    <header className="flex-container">
      <img src="logo.svg" alt="logo"></img>
      <h1>Header line of App {props.appName}!</h1>
    </header>
  );
}

export default Header;
