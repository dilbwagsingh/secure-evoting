import React from "react";
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import PropTypes from 'prop-types';
// core components
import Header from "components/Header/Header.js";
import Button from "components/CustomButtons/Button.js";
// my components
import Home from "views/homePage/Home.js";
import Register from "views/register/Register.js";
import CastVote from "views/CastVote/CastVote.js";
import Results from "views/Results/Results.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";


 class RootPage extends React.Component {
   constructor(props){
     super(props);
     this.state={
       customRender: <Home />
     }
   }
  
  handleCastVote=()=>{
    this.setState((state)=>{
      state.customRender = <CastVote />
    });
  }
  handleHome=()=>{
    this.setState((state)=>{
      state.customRender = <Home />
    });
  }
  handleRegister=()=>{
    this.setState((state)=>{
      state.customRender = <Register />
    });
  }
  handleResults=()=>{
    this.setState((state)=>{
      state.customRender = <Results />
    });
  }
  render(){
    const {classes}=this.props;
    return (
      <div>
          <Header
            brand="Secure Evoting Using Blind Signatures"
            color="info"
            rightLinks={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={this.handleHome}
                    color="transparent"
                    id="Home"
                  >
                    Home
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={this.handleRegister}
                    color="transparent"
                    id="Register"
                  >
                    Register
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={this.handleCastVote}
                    color="transparent"
                    id="Cast Vote"
                  >
                    Cast Vote
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={this.handleResults}
                    color="transparent"
                    id="Results"
                  >
                    Results
                  </Button>
                </ListItem>
              </List>
            }
          />
        {this.state.customRender} 
      </div>
  );}
}
RootPage.propTypes={
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(RootPage);