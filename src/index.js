import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link} from 'react-router-dom';
import Login from './Login';
import Register from './Register.';

const App =() => {
const[registerUsername,setRegisterUsername] = useState('');
const[registerPassword,setRegisterPassword] = useState('');

const[user,setUser] = useState({});

const exchangeTokenForUser = ()=> {
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
};
useEffect(()=> {
  exchangeTokenForUser();
},[]);
  
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
      < Register />
      <Login exchangeTokenForUser = {exchangeTokenForUser}/>
      </div>
    ) : null
      } 
    </div>
  )
   
 
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
