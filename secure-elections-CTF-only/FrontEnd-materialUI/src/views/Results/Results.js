import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
// my components
import ResultTables from "./Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);
export default function Results(props) {
  const classes = useStyles();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  return (
    <div>
        <div className={classes.space100} />
        <div 
          className={classes.pageHeader}
        >
        <div 
          className={classes.container}
        >
        <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card className={classes[cardAnimaton]}>
          <CardHeader color="primary" className={classes.cardHeader}>
                    <h2
                      style={{
                        textAlign: "center"
                      }}
                    >Results</h2>
          </CardHeader>

          <CardBody>
          <ResultTables rows={props.rows}/>
          </CardBody>
          </Card>
          </GridItem>
          </GridContainer>
          </div>  
        </div>
    </div>

  );
}
