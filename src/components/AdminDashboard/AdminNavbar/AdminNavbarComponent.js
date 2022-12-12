import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import logo from "../../../images/logo.png";
import { useLocalState } from "../../../utils/useLocalStorage";
import jwtDecode from "jwt-decode";

const AdminNavbarComponent = () => {
  const [showNav, setShowNav] = useState(false);
  const [jwt,setJwt] = useLocalState("","jwt");
  const [userId,setUserId] = useState(getUserFromJwt());
  const [user,setUser] = useState("");

  useEffect(()=>{
    fetch(`/api/v1/users/${userId}`,{
        headers: {
            "Content-Type": "application/json",
            "Authoritzation" : jwt
          },
          method: "get"
    }).then(res => {
        if (res.status === 200) return (res.json());
    }).then(data => {
        setUser(data);
    })
  },[])

  function getUserFromJwt(){
    if(jwt) {
      const decJwt = jwtDecode(jwt);
      return decJwt.id;
    }
    return [];
  }
  
  return (
    <MDBNavbar expand="lg" light bgColor="light" sticky>
      <MDBContainer fluid>
        <MDBNavbarBrand href="/dashboard">
          <img src={logo} height="30" alt="app logo" loading="lazy" />
        </MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNav(!showNav)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav}>
          <MDBNavbarNav>
            <MDBNavbarItem>
              <MDBNavbarLink active href="/add-user">
                Add admin user
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active href="/" className="link-danger" onClick={() => setJwt("")}>
                LogOut
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default AdminNavbarComponent;
