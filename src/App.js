import React, { Component } from "react";
// import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

class App extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  onFileResult = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = async () => {
    var formdata = new FormData();
    formdata.append("body", "file");
    formdata.append("text", this.state.selectedFile);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:8000/transcriptions/",
        requestOptions
      );
      const result_1 = await response.text();
      return console.log(result_1);
    } catch (error) {
      return console.log("error", error);
    }
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>GeeksforGeeks</h1>
        <h3>File Upload using React!</h3>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
        <textarea readOnly={this.fileData()} />
      </div>
    );
  }
}

export default App;
