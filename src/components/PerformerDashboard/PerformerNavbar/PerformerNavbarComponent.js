import jwtDecode from 'jwt-decode';
import { MDBCollapse, MDBContainer, MDBIcon, MDBInputGroup, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { useLocalState } from '../../../utils/useLocalStorage';
import logo from "../../../images/logo.png";
import { useNavigate } from 'react-router-dom';
const PerformerNavbarComponent = () => {
    const [showNav, setShowNav] = useState(false);
    const [jwt,setJwt] = useLocalState("","jwt");
    const [userId,setUserId] = useState(getUserFromJwt());
    const [user,setUser] = useState("");
    const navigate = useNavigate();

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

    const showProfile = () => {
      navigate("/user-detail", {
        state: {
          user: user,
        },
      })
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
                <MDBNavbarLink active href="/dashboard">
                  My songs
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink active href="/upload-song">
                  Upload new song
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink active href="/" className="link-danger" onClick={() => setJwt("")}>
                  LogOut
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
            <MDBInputGroup className="d-flex w-auto mb-1">
              <MDBNavbarBrand href="/user-detail" onClick={()=>{showProfile()}}>
                <img src={"data:image/jpeg;base64," + user.profilePicture} height="30" alt="user icon" loading="lazy" />
              </MDBNavbarBrand>
            </MDBInputGroup>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );
};

export default PerformerNavbarComponent;