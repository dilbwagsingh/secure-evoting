import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Button from "components/CustomButtons/Button.js";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from '@material-ui/core/TextField';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import image from "assets/img/bg7.jpg";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
// my components
import CustomTables from "views/CastVote/Table.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";
export default function CastVote(props) {
  const classes = useStyles();
  const [vote,setVote]=React.useState(false);
  const [privateKey,setPrivateKey]=React.useState('');
  const [touched,setTouched]=React.useState(false);
  const [canVote,setCanVote]=React.useState(false);
  const [candidateID,setCandidateID]=React.useState('');
  const [isChoiceDone,setIsChoiceDone]=React.useState(false);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const handleVoteButton=()=>{
    setVote(true);
  }
  const handleSelectCandidate=(ID)=>{
      setCandidateID(ID);
      if(!isChoiceDone){
        setIsChoiceDone(true);
      }
  }
  
  const handleBlur=(e)=>{
    setTouched(true);
  }
  const handleFinalVote=()=>{
    props.Vote(candidateID,privateKey);
  }
  function validate(key){
    const error={
      prKey:''
    }
    if(key===''){
      error.prKey='This Feild cannot be Empty';
    }
    if(error.prKey === '' && !canVote){
      setCanVote(true);
    }
    if(error.prKey !== '' && canVote){
      setCanVote(false);
    }
    return error;
  }
  const handleOnChange=(e)=>{
    setPrivateKey(e.target.value);
    console.log(privateKey);
  }
  const errors = validate(privateKey);
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  //console.log(props.rows);
  return (
    <div>
        <div className={classes.space200} />
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
                    <h2
                      style={{
                        textAlign: "center"
                      }}
                    >Choose Candidates</h2>
                  </CardHeader>
          <CardBody>
          <div className={classes.space70} />
              <CustomTables selectCandidate={handleSelectCandidate} rows={props.rows}/>
              <div className={classes.space70} />
              <div className={classes.section} style={{textAlign: "center"}}>
                <Button
                  color="primary"
                  onClick={handleVoteButton}
                  disabled={!isChoiceDone}
                >
                  Vote
                </Button>
                <Dialog
                  classes={{
                    root: classes.center,
                    paper: classes.modal
                  }}
                  open={vote}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setVote(false)}
                  aria-labelledby="classic-modal-slide-title"
                  aria-describedby="classic-modal-slide-description"
                >
                  <DialogTitle
                    id="classic-modal-slide-title"
                    disableTypography
                    className={classes.modalHeader}
                  >
                  <h4 className={classes.modalTitle} style={{textAlign: "center"}}>Enter Your Private Key</h4>
                  </DialogTitle>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                  >
                  <form autoComplete="off"  >
                    <TextField
                      autoFocus
                      id="message"
                      value={privateKey}
                      required
                      onChange={handleOnChange}
                      variant="filled"
                      label="Private Key"
                      fullWidth
                      helperText={
                        "This feild can't be left Empty."
                      }
                      error={Boolean(touched && errors.prKey)}
                      onBlur={handleBlur}
                      valid={errors.prKey === ''?"true":"false"}
                      invalid={errors.prKey !== ''?"true":"false"}
                    />
                  </form>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Button
                      onClick={() => setVote(false)}
                      color="primary"
                      simple
                    >
                      Rechose
                    </Button>
                    <Button color="primary" disabled={!canVote} onClick={handleFinalVote}>
                      Vote
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
              </CardBody>
              </Card>
              </GridItem>
          </GridContainer>
              </div>
        </div>
        
    </div>
  );
}
