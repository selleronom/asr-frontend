import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTranscription from "./components/AddTranscription";
import Transcription from "./components/Transcription";
import TranscriptionsList from "./components/TranscriptionsList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/transcription" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/transcription"} className="nav-link">
              Items
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route exact path={["/", "/transcription"]} component={TranscriptionsList} />
          <Route exact path="/add" component={AddTranscription} />
          <Route path="/transcription/:id" component={Transcription} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;