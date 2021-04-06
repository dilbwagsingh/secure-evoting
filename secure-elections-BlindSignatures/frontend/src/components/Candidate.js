import React from "react";

export default function Candidate({ candidate }) {
  return (
    <div>
      <h3>
        {candidate.candidateName} ----- {candidate.votesReceived}
      </h3>
    </div>
  );
}
