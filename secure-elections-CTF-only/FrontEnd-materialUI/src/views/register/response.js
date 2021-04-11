import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
const useStyles = makeStyles(styles);
export default function Response(){
    const classes = useStyles();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    return(
        <Card className={classes[cardAnimaton]}>
            <CardBody>
                <h3>Registered!!</h3>
                <p>Go to the Cast Vote Page for Casting the Vote</p>
            </CardBody>
        </Card>
    );
}