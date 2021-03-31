const http = require('http')

var express = require('express')
const router = express.Router();
const CTF = require('./key_generation_CTF');
var keyGen = require('./key_generation_voter');
var hashGen = require('./hash');
var encryption = require('./voting_encryption');
var decryption = require('./voting_decryption');
// var jsbn = require('jsbn')
var body = require('body-parser')

var app = express()

const port = 3000
let cur_voter="";
let voters={};
let candidates={};
// let creator_perm=0;

module.exports = {voters, candidates};

app.get('/', function(req, res) {
    res.send('EVoting: Backend Server')
})

app.listen(port, function(res) {
    console.log('EVoting: Backend Server Listening on Port ' + port)
})

app.use(body.urlencoded({ extended: false }));
app.use(body.json());

app.get('/register', function(req,res){
    // if(voter){
    //     // redirect to voter registration and vote page
    // }
    // else{
    //     // redirect to administrator registration who would add candidates
    // }
    res.send('Working');
})

app.get('/voter_register/:id', function(req, res) {
    let voterID=req.params.id;
    //let sessionID = session_id;
    // let password=req.params.psw;
    // let permsn = req.params.perm; 
    if((voterID in voters)){
        res.send('Already registered');
    }
    else {
        var keys = new keyGen();
        var private_key = keys.pr();
        voters[voterID] = {
            // psw: password,
            // perm: permsn,
            public_key: keys.pu(),
            vote_attempts: 0
        }
        res.send('Successfully registered!\nYour private key is :\n' +private_key +'\nStore your key safely!');
    }
})

app.get('/admin_register/:id', function(req, res) {
    let voterID=req.params.id;
    // let password=req.params.psw;
    // let permsn = req.params.perm; 
    if((voterID in voters)){
        res.send('Already registered');
    }
    else {
        var keys = new keyGen();
        var private_key = keys.pr();
        voters[voterID] = {
            // psw: password,
            // perm: permsn,
            public_key: keys.pu(),
            vote_attempts: 0
        }
        // generate session link and send as response
        res.send('Successfully registered!\nYour private key is :\n' +private_key +'\nStore your key safely!');
    }
})

app.get('/add_candidate/:C/:name', function(req, res) {
    let voterID=cur_voter;
    let candidateID=req.params.C;
    let candidateName = req.params.name;
        // if(voterID == ""){
        //     res.send("login first");
        // }
    var hash = new hashGen(candidateID);
    var canIDhash = hash.hash();
    if(canIDhash in candidates){
        res.send("Candidate already present");
    }   
    else{
        candidates[canIDhash]={
            name : candidateName,
            totalvotes:0
        };
        res.send('Candidate added successfully!');
        // if(creator_perm == 1){           
        //     candidates[candidate]={totalvotes:0};
        //     res.send('candidate added succesfully!');
        // }
        // else{
        //     res.send("You are not permitted to add candidate");
        // }
    } 
})

// app.get('/login/:id/:psw', function(req, res) {
//     let voterID=req.params.id;
//     let password=req.params.psw;
//     if(voters[voterID].psw == password){
//         cur_voter = voterID;
//         creator_perm = voters[voterID].perm;
//         res.send('Logged in with ' + voterID);
//     }
//     else if(voterID in voters) res.send('wrong Id or Password');
//     else{
//         res.send("Not registered yet");
//     }
// })
app.get('/vote/:candidateID/:prkey', function(req, res) {
    let voterID=cur_voter;
   // let password=req.params.psw;
    //let candidate=req.params.candidateID;
    //let private_key = req.params.prkey;
    if(voterID == ""){
        res.send("Enter ID");
    }
    else if(voters[voterID].vote_attempts == 0){            
        // candidates[candidate].totalvotes++;
        // voters[voterID].vote_attempts++;
        // res.send('Your Vote has been counted');
        var hash = new hashGen(req.params.candidateID);
        var canIDhash = hash.hash();
        var encrypt = new encryption(canIDhash, req.params.prkey);
        var cipher = encrypt.digi_encrypted();

        var decrypt = new decryption(cipher, voters[voterID].public_key, voterID);
        encrypt.digi_encrypted();
    }
    else if(voters[voterID].vote_attempts>0){
        res.send("You have reached your max voting attempts");
    } 
    else{
        res.send('Invalid voter');
    }
})

app.get('/total_votes/:C', function(req, res) {
    let voterID=cur_voter;
    let candidate=req.params.C;
        if(voterID == ""){
            res.send("login first");
        }
        else if(candidate in candidates){
            res.send((candidates[candidate].totalvotes).toString());
        }   
        else{
             res.send("Invalid Candidate");  
        } 
})
// app.get('/logout', function(req, res) {
//     if(cur_voter == ""){
//         res.send("no login so no logout");
//     }
//     else{
//         cur_voter="";
//         creator_perm=0;
//         res.send('logged out');
//     }
// })
app.use("/", router);