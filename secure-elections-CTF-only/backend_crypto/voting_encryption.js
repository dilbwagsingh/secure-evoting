const nodeRSA = require("node-rsa");
const crypto = require("crypto");

const signAndEncrypt = (candidateID, voterPrKey, CTFPubKey) => {
  //sign using voter's private key
  const sign = crypto.createSign("RSA-SHA256");
  sign.write(candidateID);
  sign.end();
  const signature = sign.sign(voterPrKey, "base64");

  const msg = candidateID + signature;

  // encrypt using CTF's public key
  const pubKey = new nodeRSA(CTFPubKey);
  const encrypted = pubKey.encrypt(msg, "base64");

  return encrypted;
};

module.exports = {
  signAndEncrypt,
};
