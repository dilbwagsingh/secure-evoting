import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components


// my components
import CastVote from "views/CastVote/CastVote.js";
import Response from "views/CastVote/voteResponse.js"
import CustomTables from "views/CastVote/Table.js";
import ApiCalls from "utils/apiCall.js"
import ResponseTokens from "utils/responseTokens.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
const useStyles = makeStyles(styles);
export default function Vote(props) {
  const classes = useStyles();
  const [isVotingDone,setIsVotingDone]=React.useState(false);
  
  const handleVote=(ID,prKey)=>{
    const fullName=localStorage.getItem("fullName");
    const voterID=localStorage.getItem("voterID");
    ApiCalls.Vote(ID,prKey,voterID)
    .then((data)=>{
      console.log(data);
      ResponseTokens.setVoteResponse(data)
      .then(()=>{
        setIsVotingDone(true);
      })
      .catch((err)=>{
        console.log(err);
      });
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  //console.log(props.rows);
  return (
    <div>
      <div className={classes.container}>
       {!isVotingDone && <CastVote rows={props.rows} Vote={handleVote}/>}
       {isVotingDone && 
        <>
        <div className={classes.space100} />
        <Response />
        </>
        }
       </div>
    </div>
  );
}
