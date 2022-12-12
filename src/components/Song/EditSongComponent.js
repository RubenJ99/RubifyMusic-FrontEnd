import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBFile,
  MDBInput,
  MDBRadio,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PerformerDashboardComponent from "../PerformerDashboard/PerformerDashboardComponent";
import PerformerNavbarComponent from "../PerformerDashboard/PerformerNavbar/PerformerNavbarComponent";

const EditSong = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [relDate, setRelDate] = useState("");
  const [isExplicit, setIsExplicit] = useState("");
  const [icon, setIcon] = useState("");
  const [audio, setAudio] = useState("");

  const updateSong = () =>{
    let IconObj  = {
        'lastModified'     : icon.lastModified,
        'lastModifiedDate' : icon.lastModifiedDate,
        'name'             : icon.name,
        'size'             : icon.size,
        'type'             : icon.type
     }; 
     let AudioObj  = {
        'lastModified'     : audio.lastModified,
        'lastModifiedDate' : audio.lastModifiedDate,
        'name'             : audio.name,
        'size'             : audio.size,
        'type'             : audio.type
     }; 
    const payload = {
        id : location.state.song.id,
        name : (name)?name:location.state.song.name,
        iconFile: IconObj.name,
        audioFile: AudioObj.name,
        releaseDate : (relDate)?relDate:location.state.song.releaseDate,
        explicitContent:(isExplicit)?true:false,
        performers: location.state.song.performers,
        categories: location.state.song.categories
    };

    fetch(`/api/v1/songs/${payload.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "put",
      body: JSON.stringify(payload),
    }).then((res) => {
        if (res.status === 200) navigate('/dashboard');
      });
    
      
  }

  if (location.state) {
    return (
      <div>
        <PerformerNavbarComponent />
        <MDBContainer fluid className="p-3 my-5 h-custom">
          <MDBRow>
            <MDBCol col="4" md="6">
              <MDBInput
                wrapperClass="mb-4"
                label={location.state.song.name}
                id="songName"
                type="text"
                size="lg"
                onChange={(e) => setName(e.target.value)}
                color="white"
              />
              <MDBInput
                wrapperClass="mb-4"
                label={location.state.song.releaseDate}
                id="relDate"
                type="text"
                size="lg"
                onChange={(e) => setRelDate(e.target.value)}
              />
              <MDBRadio
                wrapperClass="mb-4"
                name="isExplicit"
                id="isExplicit"
                value="1"
                label="isExplicit"
                onClick={(e) => setIsExplicit(e.target.value)}
              />
               <MDBInput
              wrapperClass="mb-4"
              label="icon"
              id="icon"
              type="file"
              size="lg"
              onChange={(e) => setIcon(e.target.files[0])}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="audio"
              id="audio"
              type="file"
              size="lg"
              onChange={(e) => setAudio(e.target.files[0])}
            />
            
              <div className="text-center text-md-start mt-4 pt-2">
                <MDBBtn
                  className="mb-0 px-5 bg-success"
                  size="lg"
                  onClick={() => updateSong()}
                >
                  Update
                </MDBBtn>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  } else {
    return (
      <>
        <PerformerNavbarComponent />
      </>
    );
  }
};

export default EditSong;
