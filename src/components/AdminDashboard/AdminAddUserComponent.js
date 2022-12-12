import { MDBBtn, MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useLocalState } from "../../utils/useLocalStorage";
import AdminNavbarComponent from "./AdminNavbar/AdminNavbarComponent";

const AdminAddUserComponent = () => {
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [jwt,setJwt] = useLocalState("","jwt");

    const addAdmin = () => {
        const payload = {
            name: name,
            email: email,
            password: password,
            surname: "",
            iban : "",
            expirationDate : "",
            nameOnCard : "",
            profilePicture: "",
            authority : "ROLE_ADMIN",
        }
        fetch("/api/auth/register", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(payload),    
        }).then((res) => {
            if (res.status === 200) return Promise.all([res.json(), res.headers]);
            return Promise.reject("Unable to register");
          })
          .then(([body, headers]) => {
            window.location.href = "dashboard";
          })
          .catch((message) => {
            alert(message);
          });
    }

  return (
    <div>
      <AdminNavbarComponent />
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col="4" md="6">
          <MDBInput
              wrapperClass="mb-4"
              label="Name"
              id="name"
              type="text"
              size="lg"
              onChange={(e) => setName(e.target.value)}
              color="white"
            />
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
              <MDBBtn className="mb-0 px-5 bg-black" size="lg" onClick={() => addAdmin()}>
                Add admin user
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default AdminAddUserComponent;
