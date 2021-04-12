import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
// my components

import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);
export default function Home() {
  const classes = useStyles();
  return (
    <div>
        <div className={classes.section}>
            <div className={classes.container}>
                <p>this is home page</p>
            </div>
        </div>
    </div>
  );
}
