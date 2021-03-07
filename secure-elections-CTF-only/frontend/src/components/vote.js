import React from "react";

function Vote() {
  return (
    <div>
      <form class="container">
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
