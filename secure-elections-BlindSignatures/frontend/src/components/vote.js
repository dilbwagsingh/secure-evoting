import React, { Component } from "react";
import axios from "axios";
import styles from "./form.module.css";

export default class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      votedFor: "",
      candidateID: "",
      voterID: "",
    };
  }

  onChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onCastVoteHandler = (event) => {
    event.preventDefault();
    // console.log(this.state);
    axios
      .post("/cast-vote", this.state)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  render() {
    const { votedFor, candidateID, voterID } = this.state;
    return (
      <div className={styles.container}>
        <h3>Voting Draft:</h3>
        <form onSubmit={this.onCastVoteHandler}>
          <label>Candidate Name:</label> <br />
          <input
            type="text"
            id="votedFor"
            name="votedFor"
            value={votedFor}
            onChange={this.onChangeHandler}
            spellCheck="false"
          />
          <br />
          <label>Candidate ID:</label> <br />
          <input
            type="text"
            id="candidateID"
            name="candidateID"
            value={candidateID}
            onChange={this.onChangeHandler}
            spellCheck="false"
          />
          <br />
          <label>Your Voter ID:</label> <br />
          <input
            type="text"
            id="voterID"
            name="voterID"
            value={voterID}
            onChange={this.onChangeHandler}
            spellCheck="false"
          />
          <br />
          <button>Vote</button>
        </form>
      </div>
    );
  }
}
