import axios from 'axios';
//const baseUrl='http://localhost:5000';
class apiCalls{
  register=(fullName,VoterId)=> new Promise((resolve,reject)=>{
    const req={
        voterName: fullName,
        voterID: VoterId
    }
    //console.log(req);
	axios.post('/register',req)
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
    axios.get('/candidates')
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
  Vote=(candidateID,privateKey,voterID)=> new Promise((resolve,reject)=>{
    const req={
      voterID: voterID,
      voterPrivateKey: privateKey,
      candidateID: candidateID 
    }
    axios.post('/vote',req)
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
	
  })
  AddCandidate=(candidateName,candidateID)=>new Promise((resolve,reject)=>{
    const req={
      candidateID: candidateID,
      candidateName: candidateName
    }
    axios.post('/add-candidate',req)
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
  })

}
const ApiCalls=new apiCalls();
export default ApiCalls;
