import React, { Component } from "react";
import axios from "axios";
import styles from "./Form.module.css";

export default class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidateID: "",
      candidateName: "",
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

  addCandidateHandler = async (event) => {
    event.preventDefault();
    if (this.state.candidateID !== "" && this.state.candidateName !== "") {
      const response = await axios.post("/add-candidate", this.state);
      this.notificationHandler(response.data);
    } else {
      this.notificationHandler("Incorrect details");
    }
  };

  render() {
    return (
      <div className={styles.container}>
        <h3>Add Candidate:</h3>
        <form onSubmit={this.addCandidateHandler}>
          <div className={styles.fields}>
            <input
              type="text"
              id="candidateName"
              name="candidateName"
              value={this.state.candidateName}
              onChange={this.onChangeHandler}
              spellCheck="false"
              placeholder="Candidate Name"
            />
            <input
              type="text"
              id="candidateID"
              name="candidateID"
              value={this.state.candidateID}
              onChange={this.onChangeHandler}
              spellCheck="false"
              placeholder="Candidate ID"
            />
          </div>
          <button className={styles.submitbtn}>Add</button>
        </form>
      </div>
    );
  }
}
