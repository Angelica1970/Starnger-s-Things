import React ,{useState}from 'react';


const Register = () => {
    const[username,setUsername] = useState('');
    const[password,setPassword] = useState('');

    const register = (ev)=>{
        ev.preventDefault();
        fetch('https://strangers-things.herokuapp.com/api//2209-FTB-ET-WEB-AM/users/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password
        }
      })
    }).then(response => response.json())
      .then(result => {
        if(!result.success){
          throw result.error
        }
        console.log(result);
      })
      .catch(err => console.log(err));
    };


return(
<form onSubmit = { register }>
<input placeholder='unsername'
value ={username} 
onChange = {ev =>setRegisterUsername(ev.target.value)}
/>
<input placeholder='password' 
value ={password} 
onChange = {ev =>setRegisterPassword(ev.target.value)}
/>
<button>Register</button>
</form>
);
};







export default Register;