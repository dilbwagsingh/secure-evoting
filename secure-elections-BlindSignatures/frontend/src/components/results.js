import React, { Component } from "react";
import Candidate from "./Candidate";
import axios from "axios";

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      candidateList: [],
    };
  }

  getUpdatedCandidateList = () => {
    axios
      .get("/get-candidates")
      .then((response) => {
        // console.log(response.data);
        const data = response.data;
        const candidates = [];
        data.forEach((candidate) => {
          candidates.push({
            candidateName: candidate.candidateName,
            candidateID: candidate.candidateID ?? Math.random(),
            votesReceived: candidate.votesReceived,
          });
        });

        // Descending sort the candidates according to their votes received
        candidates.sort((candidate1, candidate2) => {
          return candidate2.votesReceived - candidate1.votesReceived;
        });
        // console.log(candidates);

        // Set the state
        this.setState({
          candidateList: candidates,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.getUpdatedCandidateList();
  };

  render() {
    const candidateElements = this.state.candidateList.map((candidate) => {
      return (
        // console.log(candidate)
        <Candidate key={candidate.candidateID} candidate={candidate} />
      );
    });
    return <div>{candidateElements}</div>;
  }
}
