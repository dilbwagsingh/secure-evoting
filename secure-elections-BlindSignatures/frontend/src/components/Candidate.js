import React from "react";

export default function Candidate({ candidate }) {
  return (
    <div>
      <h3>
        {candidate.candidateID} ------ {candidate.candidateName} -----{" "}
        {candidate.votesReceived}
      </h3>
    </div>
  );
}
