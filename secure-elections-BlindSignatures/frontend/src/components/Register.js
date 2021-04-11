import React, { Component } from "react";
import axios from "axios";
import styles from "./Form.module.css";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      voterID: null,
      voterName: "",
    };
  }

  getVoterIDHandler = (event) => {
    event.preventDefault();
    axios.get("/get-voterid").then((response) => {
      this.setState({
        voterID: response.data,
      });
    });
  };

  onChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  registerHandler = (event) => {
    event.preventDefault();
    axios
      .post("/register", this.state)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  render() {
    const { voterName } = this.state;
    return (
      <div className={styles.container}>
        <h3>Fill out your details:</h3>
        <form onSubmit={this.registerHandler}>
          <label>Voter name:</label> <br />
          <input
            type="text"
            id="voterName"
            name="voterName"
            value={voterName}
            onChange={this.onChangeHandler}
            spellCheck="false"
          />
          <br />
          <button onClick={this.getVoterIDHandler}>Generate Voter ID</button>
          <br />
          <span type="text" id="voterID" name="voterID">
            {this.state.voterID}
          </span>
          <br />
          <button>Register</button>
        </form>
      </div>
    );
  }
}
