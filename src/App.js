import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "./App.css";

function App() {


  return (
    <div className="App">
        <Header appName={"My App"} />
        <Main firstName={"Max"} />
        <Footer />
    </div>
  );
}

export default App;
