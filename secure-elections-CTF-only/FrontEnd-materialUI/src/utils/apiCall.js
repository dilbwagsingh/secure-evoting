import axios from 'axios';
import setRegResponse from './responseTokens.js';
const baseUrl='http://localhost:3002';
export default function register(fullName,Email,VoterId){
    const req={
        voterName: fullName,
        voterID: VoterId
    }
    console.log(req);
	axios.post(baseUrl + '/register',req)
    .then(response =>{
      //setRegResponse(response.data);
      console.log(response.data);
    })
    .catch(error =>{
      console.log(error)
    })
	
};

