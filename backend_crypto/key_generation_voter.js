const nodeRSA = require('node-rsa');

module.exports= function() {
    this.key = new nodeRSA({ b : 1024 });

    this.puVoter = this.key.exportKey('public');
    this.prVoter = this.key.exportKey('private');

    // this.public = new nodeRSA(this.puVoter);
    // this.private = new nodeRSA(this.prVoter);

    this.pu = () =>{
        return this.puVoter;
    }
    this.pr = () =>{
        return this.prVoter;
    }
};