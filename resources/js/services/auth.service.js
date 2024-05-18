import authHeader from './auth.header.js'
import sendRequest from './request.js'


class AuthService {
   login(user) {    
      return sendRequest("POST","auth/login",{
        email: user.email,
        password: user.password
      })
      .then((response)=>{
        if (response.token) {
          localStorage.setItem('token', JSON.stringify(response.token));
        }
        return response;  
      })
      
  }
  
  me(){
    return sendRequest("GET","auth/me",null,authHeader());
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return (localStorage.getItem('token')) ? true : false;
  }

  register(user) {
    return sendRequest("POST","auth/register",{
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation
    })
    .then((response)=>{
      if(response.token){
        localStorage.setItem('token',JSON.stringify(response.token));
      }
      return response;
    })
  }
}

export default new AuthService();