import React, { Component } from "react";
import axios from "axios";
import styles from "./Form.module.css";

export default class Vote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      votedFor: "",
      candidateID: "",
      voterID: "",
    };
  }

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

  onChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onCastVoteHandler = async (event) => {
    event.preventDefault();
    if (
      this.state.candidateID !== "" &&
      this.state.votedFor !== "" &&
      this.state.votedFor !== ""
    ) {
      const response = await axios.post("/cast-vote", this.state);
      this.notificationHandler(response.data);
    } else {
      this.notificationHandler("Incorrect details");
    }
  };

  render() {
    const { votedFor, candidateID, voterID } = this.state;
    return (
      <div className={styles.container}>
        <h3>Voting Draft:</h3>
        <form onSubmit={this.onCastVoteHandler}>
          <div className={styles.fields}>
            <input
              type="text"
              id="votedFor"
              name="votedFor"
              value={votedFor}
              onChange={this.onChangeHandler}
              spellCheck="false"
              placeholder="Candidate Name"
            />
            <input
              type="text"
              id="candidateID"
              name="candidateID"
              value={candidateID}
              onChange={this.onChangeHandler}
              spellCheck="false"
              placeholder="Candidate ID"
            />
            <input
              type="text"
              id="voterID"
              name="voterID"
              value={voterID}
              onChange={this.onChangeHandler}
              spellCheck="false"
              placeholder="Voter ID"
            />
          </div>
          <button className={styles.submitbtn}>Vote</button>
        </form>
      </div>
    );
  }
}
