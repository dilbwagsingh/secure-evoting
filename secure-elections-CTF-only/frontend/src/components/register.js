import React from "react";

/* 
To dos-
1. Replace hardcoded constituency options with backend API call
2. Readup about how to implement assymetric key generation for verifing voter identity

*/

function Register() {
  return (
    <div>
      <div>
        <h3>Fill out your details:</h3>
        <form
          className="container"
          action="/server-side-register-page"
          method="post"
        >
          <label>Name:</label> <br />
          <input type="text" id="name" name="user_name" spellCheck="false" />
          <br />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
