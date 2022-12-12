import { MDBBtn } from "mdb-react-ui-kit";
import React from "react";
import { Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import DefaultDashboardComponent from "../DefaultDashboard/DefaultDashboardComponent";
import DefaultNavbarComponent from "../DefaultDashboard/DefaultNavbar/DefaultNavbarComponent";

const SongDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const back = () => {
    navigate('/dashboard');
  }

  return (
    <>
    <DefaultNavbarComponent />
    <div class="parent">
      <div class="div1">
        <img
          className="div1"
          src={
            process.env.PUBLIC_URL +
            "/musicAssets/" +
            location.state.song.iconFile
          }
          alt="icon"
        />
      </div>
      <div class="div2">{location.state.song.name}<span>
        <MDBBtn className="mb-0 px-5 bg-danger" size="lg" onClick={() => back()}>
                Back
              </MDBBtn></span></div>
      <div class="div3">
        <audio controls>
          <source
            src={
              process.env.PUBLIC_URL +
              "/musicAssets/" +
              location.state.song.audioFile
            }
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
    </>
    
  );
};

export default SongDetails;
