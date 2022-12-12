import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../../utils/useLocalStorage";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import logo from '../../images/logo.png';

const LogInComponent = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useLocalState("", "jwt");
  const [role, setRole] = useLocalState("","role");

  function sendLoginReq() {
    const payload = {
      email: email,
      password: password,
    };
    fetch("/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.status === 200) return Promise.all([res.json(), res.headers]);
        return Promise.reject("Unable to logIn");
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        setRole(body.authority)
        window.location.href = "dashboard";
      })
      .catch((message) => {
        alert(message);
      });
  }
  return (
    <div id="loginForm">
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

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn className="mb-0 px-5 bg-success" size="lg" onClick={() => sendLoginReq()}>
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <a href="/registerDefault" className="link-danger">
                  Register regular user
                </a>
              </p>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Or{" "}
                <a href="/registerPerformer" className="link-danger">
                  Register performer user
                </a>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default LogInComponent;
