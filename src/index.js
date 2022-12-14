import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link} from 'react-router-dom';

const App =() => {
const[registerUsername,setRegisterUsername] = useState('');
const[registerPassword,setRegisterPassword] = useState('');
const[loginUsername,setLoginUsername] = useState('');
const[loginPassword,setLoginPassword] = useState('');
const[user,setUser] = useState({});

useEffect(()=> {
  const token = window.localStorage.getItem('token');
  if(token){
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => response.json())
    .then(result => {
      const user = result.data
        setUser(user);
      })
      .catch(err => console.log(err));
  }
},[]);
  
  
  const login =(ev) =>{
    ev.preventDefault();
    
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/login', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user: {
      username: loginUsername,
      password: loginPassword
      }
  })
})
.then(response => response.json())
.then(result => {
  if(!result.success){
    throw result.error;
  }
    const token = result.data.token
    window.localStorage.setItem('token',token);
    fetch('https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/users/me', {
   headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
}).then(response => response.json())
  .then(result => {
    const user = result.data;
    setUser(user);
  })
  .catch(console.error);
    
   console.log(result);

    })
  .catch(err => console.log(err));
  }

  const register = (ev)=>{
    ev.preventDefault();
    fetch('https://strangers-things.herokuapp.com/api//2209-FTB-ET-WEB-AM/users/register', {
  method: "POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    user: {
      username: registerUsername,
      password: registerPassword
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

    }
     
    const logout = ()=> {
      window.localStorage.removeItem('token');
      setUser({});
    }


  return(
    <div>
      <h1>Starnger Things</h1>
      {
        user._id ? <div>Welcome {user.username} <button onClick={logout}>Logout</button></div> : null
      }
      {
        !user._id ? (
      <div>
      <form onSubmit = { register }>
        <input placeholder='unsername'
        value ={registerUsername} 
        onChange = {ev =>setRegisterUsername(ev.target.value)}
        />
        <input placeholder='password' 
        value ={registerPassword} 
        onChange = {ev =>setRegisterPassword(ev.target.value)}
        />
        <button>Register</button>
      </form>
      <form onSubmit = { login }>
        <input placeholder='unsername'
        value ={loginUsername} 
        onChange = {ev =>setLoginUsername(ev.target.value)}
        />
        <input placeholder='password' 
        value ={loginPassword} 
        onChange = {ev =>setLoginPassword(ev.target.value)}
        />
        <button>Login</button>
      </form>
      </div>) : null
      } 
    </div>
  )
   
 
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
