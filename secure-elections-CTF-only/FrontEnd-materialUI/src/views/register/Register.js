import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
// @material-ui/icons
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import RegisterCard from "views/register/registerCard.js";
import Response from "views/register/response.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import ResponseTokens from "utils/responseTokens.js";
import image from "assets/img/bg7.jpg";
import ApiCalls from 'utils/apiCall.js';


class Register extends React.Component {
  
  constructor(props){
    super(props);
    
    this.handleButton=this.handleButton.bind(this);
    this.handleInput=this.handleInput.bind(this);
    this.response = (<Response />);
    
    this.state={
      isRegistered: true,
      fullName:"",
      VoterId:""
    }
    this.register = (<RegisterCard onClick={this.handleButton} onChange={this.handleInput}/>);
  }
  handleInput=(fullName,VoterId)=>{
   // e.preventDefault();
   this.setState((state)=>{
    state.fullName=fullName;
    state.VoterId=VoterId;
    return state;
   });
   
   console.log(this.state);
  }
  handleButton=()=>{
    let tmp=this.state;
    tmp.isRegistered=false;
    localStorage.setItem("fullName", this.state.fullName);
    localStorage.setItem("voterID", this.state.VoterId);
    ApiCalls.register(this.state.fullName,this.state.VoterId)
    .then((data)=>{
      ///console.log(data);
      ResponseTokens.setRegResponse(data)
      .then(()=>{
        //console.log(data);
        this.setState(tmp);
      })
      .catch((err)=>{
        console.log(err);
      });
      
    })
     .catch((err)=>{
       console.log(err);
     }); 

  }
  render(){
    const {classes}=this.props;
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
            <GridItem xs={12} sm={12} md={8}>
            {!(this.state.isRegistered) && this.response}
              {this.state.isRegistered && this.register}
              
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
}
Register.prototypes={
  classes:PropTypes.object.isRequired
}
export default withStyles(styles)(Register);