import axios from 'axios';
const baseUrl='http://localhost:3002';
class apiCalls{
  register=(fullName,VoterId)=> new Promise((resolve,reject)=>{
    const req={
        voterName: fullName,
        voterID: VoterId
    }
    console.log(req);
	axios.post(baseUrl + '/register',req)
    .then(response =>{
      //setRegResponse(response.data);
      if(response){
        //console.log(response.data);
        resolve(response.data)
      }
      else{
        reject(response);
      }
    })
    .catch(error =>{
      console.log(error)
      reject(error);
    })
	
});
getCandidates=()=> new Promise((resolve,reject)=>{
axios.get(baseUrl + '/candidates')
  .then(response =>{
    //setRegResponse(response.data);
    if(response){
      //console.log(response.data);
      resolve(response.data)
    }
    else{
      reject(response);
    }
  })
  .catch(error =>{
    console.log(error)
    reject(error);
  })

});
}
const ApiCalls=new apiCalls();
export default ApiCalls;
