import jwtDecode from "jwt-decode";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRadio,
  MDBRow,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../../utils/useLocalStorage";
import PerformerNavbarComponent from "../PerformerDashboard/PerformerNavbar/PerformerNavbarComponent";

const NewSong = () => {
    const navigate = useNavigate();
    const [jwt,setJwt] = useLocalState("","jwt");
    const [name, setName] = useState("");
    const [relDate, setRelDate] = useState("");
    const [isExplicit, setIsExplicit] = useState("");
    const [icon, setIcon] = useState("");
    const [cat,setCat] = useState("");
    const [audio, setAudio] = useState("");
    
    const [cats, setCats] = useState("");

    useEffect(() => {
        fetch('/api/v1/categories',{
            headers: {
                "Content-Type": "application/json",
              },
              method: "get",
        }).then(res => res.json()).then(data => setCats(data))
    },[]);

    const uploadSong = () => {
        const decJwt = jwtDecode(jwt);
        const payload = {
            name:name,
            iconFile:icon.name,
            audioFile:audio.name,
            releaseDate:relDate,
            explicitContent:(isExplicit)?true:false,
            performerId:decJwt.id,
            categoryId:cat,
        }
        fetch('/api/v1/songs',{
            headers: {
                "Content-Type": "application/json",
                "Authoritzation" : jwt
              },
              method: "post",
              body:JSON.stringify(payload)
        }).then(res => {
            if(res.status === 201) navigate('/dashboard')
        })
    }

    if(cats){
        return (
            <div>
              <PerformerNavbarComponent />
              <MDBContainer fluid className="p-3 my-5 h-custom">
                <MDBRow>
                  <MDBCol col="4" md="6">
                    <MDBInput
                      wrapperClass="mb-4"
                      label="name"
                      id="songName"
                      type="text"
                      size="lg"
                      onChange={(e) => setName(e.target.value)}
                      color="white"
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="releaseDate"
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
                    <select name="cats" onChange={(e) => setCat(e.target.value)}>
                    {
                        cats.map((cate,index) => (
                            <option value={cate.id} key={index}>{cate.name}</option>
                        ))
                    }
                    </select>
                    
                    <div className="text-center text-md-start mt-4 pt-2">
                      <MDBBtn
                        className="mb-0 px-5 bg-success"
                        size="lg"
                        onClick={() => uploadSong()}
                      >
                        Upload
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            </div>
          );
    }
  
};

export default NewSong;
