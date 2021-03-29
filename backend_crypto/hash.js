var crypto = require('crypto');

module.exports = function(message){
    this.sha = crypto.createHash('sha256').update(message).digest('hex');
    this.hash = function(){
        return this.sha;
    }
}