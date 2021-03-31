const nodeRSA = require('node-rsa');

const key = new nodeRSA({b : 1024});

const puCTF = key.exportKey('public');
const prCTF = key.exportKey('private');

let public = new nodeRSA(puCTF);
let private = new nodeRSA(prCTF);

module.exports = {puCTF, prCTF};