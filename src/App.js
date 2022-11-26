import './App.css';

import { useLocalState } from './components/utils/useLocalStorage';
import { useEffect } from 'react';


function App() {
const [jwt, setJwt] = useLocalState("","jwt");

useEffect(() => {
    if(!jwt){
        const payload = {
            email : "test@test.com",
            password: "1234"
        }

        fetch("/api/auth/login",{
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(payload),
        })
        .then(res => Promise.all([res.json(),res.headers]))
        .then(([body,headers]) => {
            setJwt(headers.get("authorization"));
        }).catch(err => console.error(err));
    }
},[]);

  return (
          <div className="main-container">
              <h1>Bienvenido a Rubify</h1>
          </div>
  );
}

export default App;
