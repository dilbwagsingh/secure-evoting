import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import image from "assets/img/bg7.jpg";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import ApiCalls from "utils/apiCall.js"
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles(styles);
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Admin() {
  const classes = useStyles();
  const [candidateName,setCandidateName]=React.useState('');
  const [candidateID,setCandidateID]=React.useState('');
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [successOpen,setSuccessOpen]=React.useState(false);
  const [successMessage,setSuccessMessage]=React.useState('');
  const [errorOpen,setErrorOpen]=React.useState(false);
  const [errorMessage,setErrorMessage]=React.useState('');
  const [touched,setTouched]=React.useState({
    candidateName:false,
    candidateID: false
  });
  const [canAdd,setCanAdd]=React.useState(false);
  const handleChange=(e)=>{
    //e.prevenDefault();
    //console.log(e.target.value);
    //console.log(e.target.type);
    if(e.target.id === 'candidateName'){
      let val = e.target.value;
      setCandidateName(val);
    }
    else if(e.target.id === 'candidateID'){
      let val = e.target.value;
      setCandidateID(val);
    }
    console.log(candidateName);
    console.log(candidateID);
  }
  const handleClose=()=>{
    setSuccessOpen(false);
    setErrorOpen(false);
    setSuccessMessage('');
    setErrorMessage('');
  }
  const handleAddCandidate=()=>{
    ApiCalls.AddCandidate(candidateName,candidateID)
    .then((data)=>{
      setSuccessMessage(data);
      setSuccessOpen(true);
      setCandidateID('');
      setCandidateName('');
    })
    .catch((err)=>{
      setErrorMessage(err.message);
      setErrorOpen(true);
      console.log(err);
    })
  }
  const handleBlur=(feild)=>(e)=>{
    console.log(feild);
    setTouched({...touched,[feild]: true});
  }
  setTimeout(function() {
    setCardAnimation("");
}, 700);
//console.log(touched) ;
function validate(candidateName,candidateID){
  const error={
    candidateName:'',
    candidateID:''
  }
  if(candidateName===''){
    error.candidateName='This Feild cannot be Empty';
  }
  if(candidateID===''){
    error.candidateID='This Feild cannot be Empty';
  }
  if(error.candidateName === '' && error.candidateID === '' && !canAdd){
    setCanAdd(true);
  }
  if(error.candidateName !== '' && error.candidateID !== '' && canAdd){
    setCanAdd(false);
  }
  return error;
}
const errors = validate(candidateName,candidateID);
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundAttachment:"fixed",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
            <Card className={classes[cardAnimaton]}>
                
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Add Candidate</h4>
                  </CardHeader>
                  <CardBody>
                  <form className={classes.form}>
                  <TextField
                      autoFocus
                      id="candidateName"
                      value={candidateName}
                      required
                      onChange={handleChange}
                      variant="standard"
                      label="Candidate Name"
                      fullWidth
                      helperText={
                        "This feild can't be left Empty."
                      }
                      error={Boolean(touched.candidateName && errors.candidateName)}
                      onBlur={handleBlur('candidateName')}
                      valid={errors.candidateName === ''?"true":"false"}
                      invalid={errors.candidateName !== ''?"true":"false"}
                    />
                    <TextField
                      autoFocus
                      id="candidateID"
                      value={candidateID}
                      required
                      onChange={handleChange}
                      variant="standard"
                      label="candidateID"
                      fullWidth
                      helperText={
                        "This feild can't be left Empty."
                      }
                      error={Boolean(touched.candidateID && errors.candidateID)}
                      onBlur={handleBlur("candidateID")}
                      valid={errors.candidateID === ''?"true":"false"}
                      invalid={errors.candidateID !== ''?"true":"false"}
                    />
                    </form>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="primary" size="lg" onClick={handleAddCandidate} disabled={!canAdd}>
                      Add Candidate
                    </Button>
                  </CardFooter>
                
              </Card>
              
            </GridItem>
          </GridContainer>
          <Snackbar open={successOpen} autoHideDuration={6000} onClose={handleClose}>
           <Alert onClose={handleClose} severity="success">
              {successMessage}
            </Alert>
          </Snackbar>
          <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
           <Alert onClose={handleClose} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar>
        </div>
      </div>
    </div>
  );
}
