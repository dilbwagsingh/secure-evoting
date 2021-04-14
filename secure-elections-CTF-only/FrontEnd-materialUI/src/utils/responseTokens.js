

class responseTokens{
    constructor(){
        this.RegResponse=null;
        this.voteResponse=null;
    }
    
    setRegResponse=(res)=> new Promise((resolve,reject)=>{
    if(res){
        this.RegResponse=res;
        //console.log(this.RegResponse);
        resolve();
    }
    else {
        reject();
    }    
});
    getRegResponse=()=>new Promise((resolve,reject)=>{
    //console.log(this.RegResponse);
        if(this.RegResponse)resolve(this.RegResponse);
        else reject(this.RegResponse);
    });
    setVoteResponse=(res)=>new Promise((resolve,reject)=>{
        if(res){
            this.voteResponse=res;
            resolve();
        }
        else{
            reject();
        }
    })
    getVoteResponse=()=>new Promise((resolve,reject)=>{
        //console.log(this.RegResponse);
            if(this.voteResponse)resolve(this.voteResponse);
            else reject(this.voteResponse);
    });
}
const ResponseTokens=new responseTokens();
export default ResponseTokens;
