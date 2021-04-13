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
  const handleVoteButton=()=>{
    setVote(true);
  }
  const handleSelectCandidate=(ID)=>{
    console.log(ID);
  }
  //console.log(props.rows);
  return (
    <div>
        <div className={classes.space200} />
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
              <CustomTables selectCandidate={handleSelectCandidate} rows={props.rows}/>
              <div className={classes.space70} />
              <div className={classes.section} style={{textAlign: "center"}}>
                <Button
                  color="primary"
                  onClick={handleVoteButton}
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
                    <CustomInput
                      labelText="Your Message"
                      id="message"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.textArea
                      }}
                      inputProps={{
                        type: "msg"
                      }}
                    />
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>
                    <Button
                      onClick={() => setVote(false)}
                      color="primary"
                      simple
                    >
                      Rechose
                    </Button>
                    <Button color="primary">
                      Vote
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
        </div>
    </div>
  );
}
