import React from "react";

/* 
To dos-
1. Replace hardcoded constituency options with backend API call
2. Readup about how to implement assymetric key generation for verifing voter identity

*/

function Register() {
  return (
    <div>
      <form class="container" action="/server-side-form-page" method="post">
        <label>Name:</label> <br />
        <input type="text" id="name" name="user_name" spellCheck="false" />
        <br />
        <label htmlFor="aadhar">Aadhar number:</label> <br />
        <input type="number" id="aadhar" name="aadhar_number" /> <br />
        <p>
          <label>Select list</label>
          <select id="myList">
            <option value="1">one</option>
            <option value="2">two</option>
            <option value="3">three</option>
            <option value="4">four</option>
          </select>
        </p>
      </form>
    </div>
  );
}

export default Register;
