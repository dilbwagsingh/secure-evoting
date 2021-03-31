const CTF = require('./key_generation_CTF');
var nodeRSA = require('node-rsa');
var crypto = require('crypto');
var backend = require('./backend');

module.exports = function(cipher, puKey, voterID){

    //decrypt using CTF's private key
    this.priCTF = new nodeRSA(CTF.prCTF);
    this.decrypted = priCTF.decrypt(cipher, 'utf8');

    // split cipher into msg and digital signature
    this.msg = this.decrypted.substr(0,64);
    this.digi_sign = this.decrypted.substr(64, this.decrypted.length);

    //verification
    this.verifier = crypto.createVerify('RSA-SHA256');
    this.verifier.write(this.msg);
    this.verifier.end();

    this.result = this.verifier.verify(puKey, this.digi_sign, 'base64');

    this.digi_decrypted = function(){
        if(this.result == true){
            backend.candidates[this.msg].totalvotes++;
            backend.voters[voterID].vote_attempts++;
        }
        else{
            return "Incorrect";
        }
    }
}