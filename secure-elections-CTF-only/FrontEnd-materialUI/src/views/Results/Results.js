import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
// my components
import ResultTables from "./Table.js"
import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);
export default function Results(props) {
  const classes = useStyles();
  return (
    <div>
        <div className={classes.space100} />
        <div 
          className={classes.container}
        >
          <h2
            style={{
              color: "white",
              textAlign: "center"
            }}
          >
            Choose Candidates
          </h2>
          <div className={classes.space70} />
              <ResultTables rows={props.rows}/>
          </div>
          <div className={classes.space400} />
    </div>

  );
}
