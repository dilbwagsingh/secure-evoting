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
    ResponseTokens.getRegResponse()
    .then((reg)=>{
        setRes(reg);
        
    })
    .catch((err)=>{
        console.log(err);
    });
    function applyContent(res){
        let content=null;
        if(res === 'Already Registered'){
            content=(
            <>
            <h2>{res}</h2>
            </>
            );
        }
        else{
            content=(
                <>
                <h2>
                    Here is Your Private Key. 
                </h2>
                <pre>
                    {res}
                </pre>
                <p>
                    <b>Copy this Key and use it For Casting Vote.</b>
                </p>
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
                <p><b>Go to the Cast Vote Page for Casting the Vote.</b></p>
            </CardBody>
        </Card>
    );
}