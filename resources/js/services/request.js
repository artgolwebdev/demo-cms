const API_URL = 'http://localhost:8000/api/';
import AuthService from '../services/auth.service';
import { useRouter } from 'vue-router'
const router = useRouter()

export default  async function sendRequest(method,target,data=null,auth=null) {
    // default headers 
    let headers =  {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    // add token 
    if(auth != null){
        headers = {...headers , ...auth}
    }
    // prepare params 
    let params = {
        method : method , 
        headers: headers,
    }
    // attach body 
    if(data != null){
        params.body = JSON.stringify(data);
    }
    
    const _response = await fetch(API_URL + target, params)
    const response = await _response.json();

    // handle expired token 
    if(response.message && response.message=="Unauthenticated."){
        AuthService.logout();
        router.push('/')
    }

    return (response.status == "success") ? Promise.resolve(response) : Promise.reject(response);

  }