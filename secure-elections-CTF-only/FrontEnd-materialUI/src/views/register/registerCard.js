import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
const useStyles = makeStyles(styles);
export default function RegisterCard(props){
    const classes = useStyles();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [state, setState] = React.useState({
      fullName:'',
      Email:'',
      VoterId:''
    });
    const handleChange=(e)=>{
      //console.log(e.target.value);
      //console.log(e.target.type);
      if(e.target.type === 'email'){
        //console.log(e.target.value);
        let val = e.target.value;
        setState((state)=>{
          state.Email = val;
         // console.log(state.fullName);
          return state;
        });
      }
      else if(e.target.type === 'text'){
        let val = e.target.value;
        setState((state)=>{
          state.fullName = val;
         // console.log(state.fullName);
          return state;
        });
      }
      else if(e.target.type === 'password'){
        let val = e.target.value;
        setState((state)=>{
          state.VoterId = val
          return state;
        });
      }
      props.onChange(state.fullName,state.Email,state.VoterId);
    }
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    return(
        <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h4>Register</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Full Name..."
                      id="first"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        onChange: handleChange
                       // value: state.fullName
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        //value: state.Email,
                        onChange: handleChange
                      }}
                    />
                    <CustomInput
                      labelText="Voter ID..."
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                       // value: state.VoterId,
                        onChange: handleChange
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={props.onClick}>
                      Register
                    </Button>
                  </CardFooter>
                </form>
              </Card>
    );
}