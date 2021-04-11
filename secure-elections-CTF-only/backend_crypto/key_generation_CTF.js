const nodeRSA = require("node-rsa");

const getKeys = () => {
  const key = new nodeRSA({ b: 1024 });

  const CTFPubKey = key.exportKey("public");
  const CTFPrKey = key.exportKey("private");

  return { CTFPubKey, CTFPrKey };
};

module.exports = { getKeys };
