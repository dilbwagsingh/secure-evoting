import React, { Component } from "react";
import Voter from "./Voter";
import axios from "axios";

export default class Voters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      voterList: [],
    };
  }

  getUpdatedVoterList = () => {
    axios
      .get("/get-voters")
      .then((response) => {
        // console.log(response.data);
        const voters = [];
        const data = response.data;
        data.forEach((voter) => {
          voters.push({
            voterID: voter.voterID,
            voterName: voter.voterName,
            voteCasted: voter.voteCasted,
          });
        });

        this.setState({
          voterList: voters,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.getUpdatedVoterList();
  };

  render() {
    const voterElements = this.state.voterList.map((voter) => {
      return <Voter key={voter.voterID} voter={voter} />;
    });

    return <div>{voterElements}</div>;
  }
}
