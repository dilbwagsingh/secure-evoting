

class responseTokens{
    constructor(){
        this.RegResponse=null;
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
}
const ResponseTokens=new responseTokens();
export default ResponseTokens;
