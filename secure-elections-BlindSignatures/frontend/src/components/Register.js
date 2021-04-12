import React, { Component } from "react";
import axios from "axios";
import styles from "./Form.module.css";

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      voterID: "",
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

  notificationHandler = (msg) => {
    // Notification body.
    const notification = document.createElement("div");
    // notification.className = "notification";

    notification.style.display = "flex";
    // notification.style.maxWidth = "370px";
    notification.style.width = "370px";
    notification.style.backgroundColor = "#fff";
    notification.style.border = "2px solid #fff";
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "10000000";
    notification.style.position = "fixed";
    notification.style.alignItems = "center";
    notification.style.justifyContent = "center";
    notification.style.top = "1px";
    notification.style.padding = "2px";
    notification.style.right = "1px";

    // Notification text.
    const notificationText = document.createElement("p");
    notificationText.innerHTML = msg;
    notification.appendChild(notificationText);

    // Add to current page.
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
  };

  registerHandler = async (event) => {
    event.preventDefault();
    const response = await axios.post("/register", this.state);
    console.log(response);

    this.notificationHandler(response.data);
    // const span = document.createElement("span");
    // span.innerText = response.data;
  };

  render() {
    const { voterName } = this.state;
    return (
      <div className={styles.container}>
        <h3>Fill out your details:</h3>
        <form onSubmit={this.registerHandler}>
          <div className={styles.fields}>
            <input
              type="text"
              id="voterName"
              name="voterName"
              value={voterName}
              onChange={this.onChangeHandler}
              spellCheck="false"
              placeholder="Voter Name"
              className={styles.voterName}
            />
            <input
              type="text"
              id="voterID"
              name="voterID"
              value={this.state.voterID ?? ""}
              spellCheck="false"
              readOnly={true}
              placeholder="Click on the button to get your voter ID"
            />
            <button onClick={this.getVoterIDHandler}>Get</button>
          </div>
          <button className={styles.submitbtn}>Register</button>
        </form>
      </div>
    );
  }
}
