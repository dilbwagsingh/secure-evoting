import React from "react";

function Admin() {
  return (
    <div>
      <form
        className="container"
        action="/server-side-admin-login-page"
        method="post"
      >
        <label>Username:</label> <br />
        <input type="text" id="username" spellCheck="false" />
        <br />
        <label>Password:</label> <br />
        <input type="text" id="password" spellCheck="false" />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
}

export default Admin;
