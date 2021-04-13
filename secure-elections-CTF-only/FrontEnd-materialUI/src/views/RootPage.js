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
import Admin from "views/Admin/admin.js";
import image from "assets/img/bg7.jpg";
import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import ApiCalls from "utils/apiCall.js";

 class RootPage extends React.Component {
   constructor(props){
     super(props);
     this.state={
       customRender: <Home />,
       rows: []
     }
   }
  
  handleCastVote=()=>{
    ApiCalls.getCandidates()
      .then((candidateList)=>{
          //console.log(candidateList);
          this.setState((state)=>{
            state.rows=candidateList;
            return state;
          });
          this.setState((state)=>{
            state.customRender = <CastVote rows={this.state.rows}/>
            return state;
          });
     })
      .catch((err)=>{
        console.log(err);
     });
    
  }
  handleHome=()=>{
    this.setState((state)=>{
      state.customRender = <Home />
      return state;
    });
  }
  handleRegister=()=>{
    this.setState((state)=>{
      state.customRender = <Register />
      return state;
    });
  }
  handleResults=()=>{
    ApiCalls.getCandidates()
      .then((candidateList)=>{
          //console.log(candidateList);
          this.setState((state)=>{
            state.rows=candidateList;
            return state;
          });
          this.setState((state)=>{
            state.customRender = <Results rows={this.state.rows}/>
            return state;
          });
     })
      .catch((err)=>{
        console.log(err);
     });
  }
  handleAdmin=()=>{
    this.setState((state)=>{
      state.customRender = <Admin />
    });
  }
  render(){
    const {classes}=this.props;
    return (
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundAttachment:"fixed",
          backgroundPosition: "top center"
        }}
      >
          <Header
            brand="Secure Evoting Using Blind Signatures"
            color="primary"
            fixed
            changeColorOnScroll={{
                height: 50,
                color: "transparent"
            }}
            rightLinks={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Button
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
                    className={classes.navLink}
                    onClick={this.handleAdmin}
                    color="transparent"
                    id="Results"
                  >
                    Results
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    className={classes.navLink}
                    onClick={this.handleAdmin}
                    color="transparent"
                    id="Admin"
                  >
                    Admin
                  </Button>
                </ListItem>
              </List>
            }
          />
        <div>
          {this.state.customRender}
        </div> 
      </div>
  );}
}
RootPage.propTypes={
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(RootPage);