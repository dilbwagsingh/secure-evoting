import React, { Component } from "react";
import axios from "axios";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidateID: "",
      candidateName: "",
    };
  }

  onChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addCandidateHandler = (event) => {
    event.preventDefault();
    axios
      .post("/add-candidate", this.state)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <h3>Add Candidate:</h3>
        <form onSubmit={this.addCandidateHandler}>
          <label>Candidate name:</label> <br />
          <input
            type="text"
            id="candidateName"
            name="candidateName"
            value={this.state.candidateName}
            onChange={this.onChangeHandler}
            spellCheck="false"
          />
          <br />
          <label>Candidate ID:</label> <br />
          <input
            type="text"
            id="candidateID"
            name="candidateID"
            value={this.state.candidateID}
            onChange={this.onChangeHandler}
            spellCheck="false"
          />
          <br />
          <button>Add</button>
        </form>
      </div>
    );
  }
}
