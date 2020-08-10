import React from 'react';
import "./App.css";
import Logo from "./logo.svg";

function Header(props) {

  return (
    <header className="flex-container">
      <img src={Logo} alt="logo"></img>
      <h1>Header line of App {props.appName}!</h1>
    </header>
  );
}

export default Header;
