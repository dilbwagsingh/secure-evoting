const nodeRSA = require("node-rsa");
const crypto = require("crypto");

const decryptAndVerify = (msg, voterPubKey, cPrKey) => {
  // decrypt using CTF's private key
  const CTFPrKey = new nodeRSA(cPrKey);
  const vote = CTFPrKey.decrypt(msg, "utf-8");

  const candidateID = vote.substr(0, 64);
  const signature = vote.substr(64, vote.length);

  //verification
  const verifier = crypto.createVerify("RSA-SHA256");
  verifier.write(candidateID);
  verifier.end();

  const result = verifier.verify(voterPubKey, signature, "base64");

  return result;
};

module.exports = { decryptAndVerify };
