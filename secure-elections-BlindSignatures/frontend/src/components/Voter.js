import React from "react";

export default function Voter({ voter }) {
  return (
    <div>
      <h3>
        {voter.voterName} ----- {voter.voteCasted ? "Yes" : "No"}
      </h3>
    </div>
  );
}
