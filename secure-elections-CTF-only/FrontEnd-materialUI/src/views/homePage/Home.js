import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
// my components

import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";

const useStyles = makeStyles(styles);
export default function Home() {
  const classes = useStyles();
  return (
    <div>
        <div className={classes.space100} />
        <div className={classes.section}>
            <div className={classes.container}
              style={{
                color: "white"
              }}
            >
              <b><p class="c2"><span class="c9"><h2><b>INTRODUCTION</b></h2></span></p><p class="c2"><span class="c1">This is our implementation of secure elections using a single Central Tabulating Facility which records the votes received. This protocol satisfies two of the basic requirements of a secure voting protocol &rarr; &nbsp;</span></p><ol class="c5 lst-kix_mpqmezt6fjib-0 start" start="1"><li class="c2 c3"><span class="c1">Only authorized voters can vote. </span></li><li class="c2 c3"><span class="c1">No one can vote more than once. Each voter signs his vote with his private key and hence the CTF will know who voted and how many times. Thus, this guarantees the fulfilment of above two requirements. </span></li></ol><p class="c0"><span class="c1"></span></p><p class="c2"><span class="c1">Feel free to try this out!</span></p><p class="c0"><span class="c1"></span></p><p class="c2"><span class="c8"><h2><b>PROCEDURE</b></h2></span></p><p class="c0"><span class="c1"></span></p><ol class="c5 lst-kix_fumdiub5ekxm-0 start" start="1"><li class="c2 c6 li-bullet-0"><span class="c1">Register: Enter your full name and voter ID and get yourself registered. &nbsp;Now, the private and public keys are generated for the voter using the RSA algorithm. You get a private key which you have to securely store for further use. This serves as your sign for the vote. Now you are added to the database using hashed voter ID as unique identification. Now, head on to the Cast Vote page.</span></li><li class="c2 c6 li-bullet-0"><span class="c1">Cast Vote: Select the candidate to whom you want to vote for from the displayed list of candidates and their hashed candidate IDs. Now, enter your private key which serves as signature to your vote. If you have registered and not voted earlier, your votes gets casted successfully. This vote is encrypted using CTF&rsquo;s public key for confidentiality. Now, the CTF decrypts it using its private key (CTF also has a public, private key pair generated using RSA algorithm) and checks for the authenticity of the vote by decrypting the signature with the voter&rsquo;s public key it has. Now, head on to the results page to see how many votes each candidate has got till now.</span></li><li class="c2 c6 li-bullet-0"><span class="c1">Results: You get to see the list of candidates, the corresponding unique hashed candidate IDs and the votes received till now.</span></li><li class="c2 c6 li-bullet-0"><span class="c1">Add Candidate: You can add a competing candidate to the list of candidates using this page. You have to provide the candidate name and a new ID to them. If the ID is not existing previously in the database, the candidate and his hashed ID gets added &nbsp;to the list successfully, else provide a different ID.</span></li></ol><p class="c0"><span class="c1"></span></p><p class="c0"><span class="c7"></span></p></b>
            </div>
        </div>
    </div>
  );
}
