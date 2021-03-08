import React from "react";
import styles from "./form.module.css";

function Admin() {
  return (
    <div className={styles.container}>
      <h3>Details:</h3>
      <form>
        <label>Username:</label> <br />
        <input type="text" id="username" spellCheck="false" />
        <br />
        <label>Password:</label> <br />
        <input type="password" id="password" spellCheck="false" />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Admin;
