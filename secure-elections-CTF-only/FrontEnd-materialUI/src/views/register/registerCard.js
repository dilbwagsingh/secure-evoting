import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles(styles);
export default function RegisterCard(props){
    const classes = useStyles();
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [fullName,setFullName]=React.useState('');
    const [voterID,setVoterID]=React.useState('');
    const [touched,setTouched]=React.useState({
      name: false,
      ID: false
    });
    const [canRegister,setCanRegister]=React.useState(false);
    const handleChange=(e)=>{
      //e.prevenDefault();
      //console.log(e.target.value);
      //console.log(e.target.type);
      if(e.target.id === 'fullName'){
        let val = e.target.value;
        setFullName(val);
      }
      else if(e.target.id === 'voterID'){
        let val = e.target.value;
        setVoterID(val);
      }
      //console.log(state);
      props.onChange(fullName,voterID);
    }
    const handleBlur=(feild)=>()=>{
      setTouched({...touched,[feild]:true});
    }
    function validate(fullName,voterID){
      const error={
        fullName:'',
        voterID:''
      }
      if(fullName===''){
        error.fullName='This Feild cannot be Empty';
      }
      if(voterID===''){
        error.voterID='This Feild cannot be Empty';
      }
      if(error.fullName === '' && error.voterID === '' && !canRegister){
        setCanRegister(true);
      }
      if(error.fullName !== '' && error.voterID !== '' && canRegister){
        setCanRegister(false);
      }
      return error;
    }
    const errors = validate(fullName,voterID);
    setTimeout(function() {
        setCardAnimation("");
    }, 700);
    return(
        <Card className={classes[cardAnimaton]}>
                
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Register</h4>
                  </CardHeader>
                  <CardBody>
                  <form className={classes.form}>
                  <TextField
                      autoFocus
                      id="fullName"
                      value={fullName}
                      required
                      onChange={handleChange}
                      variant="standard"
                      label="Full Name ..."
                      fullWidth
                      helperText={
                        "This feild can't be left Empty."
                      }
                      error={Boolean(touched.name && errors.fullName)}
                      onBlur={handleBlur('name')}
                      valid={errors.fullName === ''?"true":"false"}
                      invalid={errors.fullName !== ''?"true":"false"}
                    />
                     <TextField
                      autoFocus
                      id="voterID"
                      value={voterID}
                      required
                      onChange={handleChange}
                      variant="standard"
                      label="VoterID"
                      fullWidth
                      helperText={
                        "This feild can't be left Empty."
                      }
                      error={Boolean(touched.ID && errors.voterID)}
                      onBlur={handleBlur('ID')}
                      valid={errors.voterID === ''?"true":"false"}
                      invalid={errors.voterID !== ''?"true":"false"}
                    />
                    </form>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={props.onClick} disabled={!canRegister}>
                      Register
                    </Button>
                  </CardFooter>
                
              </Card>
    );
}