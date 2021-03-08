import React from "react";
import styles from "./form.module.css";

function Vote() {
  return (
    <div className={styles.container}>
      <h3>Voting Draft:</h3>
      <form >
        <label>Choice:</label> <br />
        <input type="text" id="choice" name="choice" spellCheck="false" />
        <br />
        <label>Private key:</label> <br />
        <input type="text" id="private_key" /> <br />
        <button>Vote</button>
      </form>
    </div>
  );
}

export default Vote;
