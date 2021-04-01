/* 
  CTF has the Database stored
  Database model- (say name is blindSecureElections)
  We require 2 collections -> one for results and one for voters
  Results will have 2 fields -> candidate name and votes received till now
  voters will have 3 fields -> Name(String), VoterId(String) and voteCasted(boolean, default to false)

  Frontend architechture-
  A get-signed votes from CTF page which has a form asking for voterID, and vote

  
  On clicking vote->
    the vote will be blinded and sent to CTF
    CTF will sign the vote
    vote will be unblinded
    sign of CTF will be verified
    encrypt the vote with voterID and cast it
    CTF decrypts the vote
    checks if the voterId is registered
    Then records the vote and updates database.
  

*/

const { sign } = require("blind-signatures");
const express = require("express");
const mongoose = require("mongoose");
const nodeRSA = require("node-rsa");

const {
  generateVoterID,
  blindVote,
  generateCTFKeys,
  signBlindedVote,
  unblindAndVerifySignature,
  verifySignatureCTF,
  verifyVoteFormat,
} = require("./util");
const app = express();

app.use(express.json());

const db = "mongodb://localhost:27017/blindSecureElections";
const Schema = mongoose.Schema;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("------------Connected to MongoDB--------------");
  })
  .catch((err) => {
    console.log(err);
  });

// Add candidateID for name clashes
const resultSchema = new Schema({
  candidateName: String,
  votesReceived: {
    type: Number,
    default: 0,
  },
});
const voterSchema = new Schema({
  voterName: String,
  voterID: String,
  voteCasted: {
    type: Boolean,
    default: false,
  },
});
const CTFSchema = new Schema({
  signingKeyPublic: String,
  signingKeyPrivate: String,
  castingKeyPublic: String,
  castingKeyPrivate: String,
});

const resultCollection = mongoose.model("Result", resultSchema);
const voterCollection = mongoose.model("Voter", voterSchema);
const CTFCollection = mongoose.model("CTF", CTFSchema);

app.get("/voters", async (req, res) => {
  const voters = await voterCollection.find();
  return res.json(voters);
});

app.post("/add-candidate", async (req, res) => {
  const newCandidate = new resultCollection({
    candidateName: req.body.candidateName,
  });
  await newCandidate.save();
  return res.json("New candidate resigtered");
});

app.get("/results", async (req, res) => {
  const results = await resultCollection.find();
  return res.json(results);
});

app.get("/ctf-public-keys", async (req, res) => {
  const keys = await CTFCollection.find();
  return res.json(keys);
});

app.get("/get-voterid", async (req, res) => {
  const voterID = generateVoterID();
  return res.json(voterID);
});

app.post("/register", async (req, res) => {
  const newVoter = new voterCollection({
    voterName: req.body.voterName,
    voterID: req.body.voterID,
  });
  await newVoter.save();
  return res.json("Voter registered Successfully!!!");
});

app.post("/cast-vote", async (req, res) => {
  const voterName = req.body.voterName;
  const voterID = req.body.voterID;
  const vote = req.body.votedFor;

  let registeredVoters = await voterCollection.find();
  for (let i = 0; i < registeredVoters.length; ++i) {
    if (registeredVoters[i].voterID.indexOf(voterID) >= 0)
      return res.json("You already voted once!!!");
  }

  const { signingKey, CTFKey } = generateCTFKeys();
  const publicKeyCTF = new nodeRSA(CTFKey.exportKey("public"));
  const privateKeyCTF = new nodeRSA(CTFKey.exportKey("private"));
  const n_CTF = signingKey.keyPair.n.toString();
  const e_CTF = signingKey.keyPair.e.toString();
  const { blindedVote, blindingFactor } = blindVote(vote, n_CTF, e_CTF);

  const signedBlindedVote = signBlindedVote(blindedVote, signingKey);
  const newVoter = new voterCollection({
    voterName: voterName,
    voterID: voterID,
  });
  await newVoter.save();
  registeredVoters = await voterCollection.find();

  const value = unblindAndVerifySignature(
    signedBlindedVote,
    blindingFactor,
    n_CTF,
    e_CTF,
    vote
  );

  const signatureOk = value.ok;
  const signedUnblindedVote = value.signedUnblindedVote;

  console.assert(
    signatureOk === true,
    "Verification failed, check the bit length of the signing key!!!"
  );

  const voteString = voterID + signedUnblindedVote;
  const encryptedVote = publicKeyCTF.encrypt(voteString, "base64");

  const decryptedVote = privateKeyCTF.decrypt(encryptedVote, "utf-8");
  const { registered, receivedVoterID, candidateVotedFor } = verifyVoteFormat(
    decryptedVote,
    registeredVoters
  );

  if (registered) {
    const results = await resultCollection.find();
    const allCandidates = [];
    results.forEach((result) => {
      allCandidates.push(result.candidateName);
    });
    const { verdict, votedCandidate } = verifySignatureCTF(
      candidateVotedFor,
      signingKey,
      allCandidates
    );

    if (verdict) {
      // update candidate vote count in DB
      await resultCollection.findOneAndUpdate(
        { candidateName: votedCandidate },
        { $inc: { votesReceived: 1 } }
      );
      // update voter's voted status
      await voterCollection.findOneAndUpdate(
        { voterID: voterID },
        { voteCasted: true }
      );
      return res.json("Successful!!!");
    }
  }

  return res.json("Unsuccessful!!!");
});

app.get("*", (req, res) => {
  res.json("You missed all valid routes!!!");
});

app.listen(3001, () => {
  console.log("App running at http://localhost:3001");
});
