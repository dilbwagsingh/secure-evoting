import React from "react";

function Vote() {
  return (
    <div>
      <h3>Fill the required info:</h3>
      <form className="container">
        <label>Enter your choice:</label> <br />
        <input type="text" id="choice" name="choice" spellCheck="false" />
        <br />
        <label>Enter your private key:</label> <br />
        <input type="number" id="private_key" /> <br />
        <button>Vote</button>
      </form>
    </div>
  );
}

export default Vote;
