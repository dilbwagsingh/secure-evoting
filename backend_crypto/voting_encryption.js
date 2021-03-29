const CTF = require('./key_generation_CTF');
var nodeRSA = require('node-rsa');
var crypto = require('crypto');
var backend = require('./backend');

module.exports = function(msg, prKey){
    //signing
    this.signer = crypto.createSign('RSA-SHA256');
    this.signer.write(msg);
    this.signer.end();

    //signature
    this.signature = this.signer.sign(prKey, 'base64');

    //encrypt using CTF's public key
    this.message = this.msg + this.signature;
    this.pubCTF = new nodeRSA(CTF.puCTF);
    this.encrypted = pubCTF.encrypt(message, 'base64');

    this.digi_encrypted = function(){
        return this.encrypted;
    }
}