import React from "react";
import styles from "./form.module.css";

/* 
To dos-
1. Readup about how to implement assymetric key generation for verifing voter identity
*/

function Register() {
  return (
    <div className={styles.container}>
      <h3>Fill out your details:</h3>
      <form>
        <label>Name:</label> <br />
        <input type="text" id="name" name="user_name" spellCheck="false" />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;
