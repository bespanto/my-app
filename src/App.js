import React from "react";
import Header from "./Header";
import Main from "./Main";
import "./App.css";

function App() {


  return (
    <div className="App">
        <Header appName={"My App"} />
        <Main />
    </div>
  );
}

export default App;
