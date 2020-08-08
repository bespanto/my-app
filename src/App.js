import React from "react";
import Header from "./Header";
import Main from "./Main";
import "./App.css";

function App() {


  return (
    <div className="App">
      <header className="Box">
        <Header appName={"My App"} />
      </header>
      <main className="Box">
        <Main firstName={"Max"} />
      </main>
    </div>
  );
}

export default App;
