import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import logo from '../../images/logo.png';
import { useLocalState } from '../../utils/useLocalStorage';

const RegisterDefComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName] = useState("");
  const [surname,setSurname] = useState("");
  const [icon, setIcon] = useState("");

  const [jwt, setJwt] = useLocalState("", "jwt");

  async function setImage(file){
    const b64 = await convertToB64(file);
   
    setIcon(b64);
  }

  function convertToB64(file){
    return new Promise((resolve,reject) => {
      const fr = new FileReader();

      fr.readAsDataURL(file);

      fr.onload = () => resolve(fr.result.substr(fr.result.indexOf(',') + 1));
      fr.onerror = (err) => reject(err);
     
    })
  }

  function sendRegisterReq(){
    const payload = {
        email : email,
        password : password,
        name: name,
        surname: surname,
        iban : "",
        expirationDate : "",
        nameOnCard : "",
        profilePicture: icon,
        authority : "ROLE_DEFAULT",
    };

    fetch("/api/auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.status === 200) return Promise.all([res.json(), res.headers]);
        return Promise.reject("Unable to register");
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href = "dashboard";
      })
      .catch((message) => {
        alert(message);
      });
  }

    return (
        <div id="RegisterForm">
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>

        <MDBCol col='10' md='6'>
          <img src={logo} className="img-fluid" alt="Logo" />
        </MDBCol>



          <MDBCol col="4" md="6">

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="email"
              type="email"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
              color="white"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="password"
              type="password"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
            />
             <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="name"
              type="text"
              size="lg"
              onChange={(e) => setName(e.target.value)}
            />
             <MDBInput
              wrapperClass="mb-4"
              label="Surname"
              id="surname"
              type="text"
              size="lg"
              onChange={(e) => setSurname(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="ProfileIcon"
              id="profileicon"
              type="file"
              size="lg"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn className="mb-0 px-5 bg-info" size="lg" onClick={() => sendRegisterReq()}>
                Register
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    );
};

export default RegisterDefComponent;