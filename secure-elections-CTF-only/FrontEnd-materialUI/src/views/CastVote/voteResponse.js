import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import ResponseTokens from 'utils/responseTokens.js';
const useStyles = makeStyles(styles);
export default function Response(){
    const classes = useStyles();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    const [res,setRes]=React.useState(null);
    ResponseTokens.getVoteResponse()
    .then((reg)=>{
        console.log(reg);
        setRes(reg);
        
    })
    .catch((err)=>{
        console.log(err);
    });
    function applyContent(res){
        let content=null;
        if(res === 'Voting failed'){
            content=(
            <>
            <h2>{res}</h2>
            <p>You have Entered Wrong Private Key</p>
            </>
            );
        }
        else{
            content=(
                <>
                <h2>{res}</h2>
                </>
            );
        }
        return content;
    }
    const comp=applyContent(res);
    return(
        <Card className={classes[cardAnimaton]}>
            <CardBody>
                <div>{comp}</div>
                <p>Go to the Results Page to see Voting Results</p>
            </CardBody>
        </Card>
    );
}