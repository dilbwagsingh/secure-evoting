const BS = require("blind-signatures");
const nodeRSA = require("node-rsa");
const { createHash } = require("crypto");
const { PassThrough } = require("stream");

// retruns a voterID which has a fixed length of 64
const generateVoterID = () => {
  const RANGE = 2 ** 53;
  const x = Math.floor(Math.random() * RANGE);
  const hash = createHash("sha256");
  return hash.update(x.toString()).digest("hex").toString();
};

const generateCTFKeys = () => {
  const signingKey = BS.keyGeneration({
    b: 1024,
  }); /* Weird bug- if you reduce the key soze to say 128/256 bits the verification in the later stage fails(the ok variable below) */
  const CTFKey = new nodeRSA({ b: 1024 });

  return { signingKey, CTFKey };
};

const blindVote = (vote, n_CTF, e_CTF) => {
  const blind = BS.blind({
    message: vote,
    N: n_CTF,
    E: e_CTF,
  });
  const blindedVote = blind.blinded;
  const blindingFactor = blind.r;
  return { blindedVote, blindingFactor };
};

const signBlindedVote = (blindedVote, signingKey) => {
  const signedBlindedVote = BS.sign({
    blinded: blindedVote,
    key: signingKey,
  });
  return signedBlindedVote;
};

const unblindAndVerifySignature = (
  signedBlindedVote,
  blindingFactor,
  n_CTF,
  e_CTF,
  vote
) => {
  const signedUnblindedVote = BS.unblind({
    signed: signedBlindedVote,
    N: n_CTF,
    r: blindingFactor,
  });

  const ok = BS.verify({
    unblinded: signedUnblindedVote,
    N: n_CTF,
    E: e_CTF,
    message: vote,
  });

  return { ok, signedUnblindedVote };
};

const verifyVoteFormat = (decryptedVote, registeredVoters) => {
  const receivedVoterID = decryptedVote.slice(0, 64);
  const candidateVotedFor = decryptedVote.slice(64);

  let registered = false;
  registeredVoters.forEach((registeredVoter) => {
    if (registeredVoter.voterID.indexOf(receivedVoterID) !== -1) {
      registered = true;
    }
  });

  if (registered) {
    return { registered, receivedVoterID, candidateVotedFor };
  }

  return { registered: false, receivedVoterID: null, candidateVotedFor: null };
};

const verifySignatureCTF = (candidateVotedFor, signingKey, allCandidates) => {
  let verdict = false,
    votedCandidate = null;
  allCandidates.forEach((candidate) => {
    const ok = BS.verify2({
      unblinded: candidateVotedFor,
      key: signingKey,
      message: candidate,
    });
    if (ok) votedCandidate = candidate;
    verdict |= ok;
  });

  return { verdict, votedCandidate };
};

module.exports = {
  generateVoterID,
  blindVote,
  generateCTFKeys,
  signBlindedVote,
  unblindAndVerifySignature,
  verifyVoteFormat,
  verifySignatureCTF,
};
