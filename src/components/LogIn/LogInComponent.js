import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalState } from '../../utils/useLocalStorage';

const LogInComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useLocalState("","jwt");

  function sendLoginReq(){
    const payload = {
      email: email,
      password: password
    };
    fetch("/api/auth/login",{
      headers:{
        "Content-Type" : "application/json",
      },
      method: "post",
      body: JSON.stringify(payload)
    })
    .then((res) => {
      if(res.status === 200) return Promise.all([res.json(), res.headers]);
      return Promise.reject("Unable to logIn");
    })
    .then(([body,headers]) => {
      setJwt(headers.get("authorization"));
     window.location.href = "authenticated";
    })
    .catch((message) => {
      alert(message);
    })
  }
  return (
    <>
    <div>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div>
      <button id="submit" type="button" onClick={() => sendLoginReq()}>
        Login
      </button>
    </div>
  </>
  );
};

export default LogInComponent;