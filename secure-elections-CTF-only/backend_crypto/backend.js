const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { getKeys } = require("./key_generation_CTF");
const keygenVoter = require("./key_generation_voter");
const { hash } = require("./hash");
const { signAndEncrypt } = require("./voting_encryption");
const { decryptAndVerify } = require("./voting_decryption");

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

const db = "mongodb://localhost:27017/CTFOnlySecureElections";
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

const voterSchema = new Schema({
  voterName: String,
  voterID: String,
  voterPublicKey: String,
  voteCasted: {
    type: Boolean,
    default: false,
  },
});
const candidateSchema = new Schema({
  candidateName: String,
  candidateID: String,
  votesReceived: {
    type: Number,
    default: 0,
  },
});

const candidateCollection = mongoose.model("Result", candidateSchema);
const voterCollection = mongoose.model("Voter", voterSchema);

app.get("/voters", async (req, res) => {
  const voters = await voterCollection.find();
  return res.json(voters);
});

app.get("/candidates", async (req, res) => {
  const candidatesList = await candidateCollection.find();
  return res.json(candidatesList);
});

app.post("/add-candidate", async (req, res) => {
  const candidateName = req.body.candidateName;
  const candidateID = hash(req.body.candidateID);
  const newCandidate = new candidateCollection({
    candidateName: candidateName,
    candidateID: candidateID,
  });

  const allCandidates = await candidateCollection.find();
  for (let i = 0; i < allCandidates.length; ++i) {
    if (allCandidates[i].candidateID === candidateID) {
      return res.json("This candidate ID has been used already");
    }
  }

  await newCandidate.save();
  return res.json("New candidate registered");
});

app.post("/register", async (req, res) => {
  const voterName = req.body.voterName;
  const voterID = hash(req.body.voterID);
  const voters = await voterCollection.find({ voterID: voterID });
  if (voters.length) return res.json("Already Registered");

  const keys = new keygenVoter();
  const voterPrivateKey = keys.pr().toString();
  const voterPublicKey = keys.pu().toString();
  const newVoter = new voterCollection({
    voterName: voterName,
    voterID: voterID,
    voterPublicKey: voterPublicKey,
  });

  const allVoters = await voterCollection.find();
  for (let i = 0; i < allVoters.length; i++) {
    const element = allVoters[i].voterID;
    if (element.voterID === voterID)
      return res.json("Already Registered!!");
  }

  await newVoter.save();
  console.log(req.body.voterID);
  return res.json(
    `${voterPrivateKey}`
  );
});

app.post("/vote", async function (req, res) {
  const voterID = hash(req.body.voterID);
  const voterPrivateKey = req.body.voterPrivateKey;
  /* No hash here because we will get the hashed version itself */
  const candidateID = req.body.candidateID;
  const { CTFPubKey, CTFPrKey } = getKeys();

  const voter = await voterCollection.find({ voterID: voterID });
  console.log(req.body.voterID);
  let eligible = false;
  if (voter.length && !voter[0].voteCasted) eligible = true;
  if (!eligible)
    return res.json("Either you already voted or you are not registered!!!");

  const queryObject = await voterCollection.find(
    { voterID: voterID },
    "voterPublicKey"
  );
  const voterPublicKey = queryObject[0].voterPublicKey;
  const vote = signAndEncrypt(candidateID, voterPrivateKey, CTFPubKey);
  const result = decryptAndVerify(vote, voterPublicKey, CTFPrKey);

  if (result) {
    await candidateCollection.findOneAndUpdate(
      { candidateID: candidateID },
      { $inc: { votesReceived: 1 } }
    );
    await voterCollection.findOneAndUpdate(
      { voterID: voterID },
      { voteCasted: true }
    );
  } else {
    return res.json("Voting failed");
  }

  return res.json("Vote Casted");
});

app.listen(PORT, () => {
  console.log("EVoting: Backend Server Listening on Port " + PORT);
});
