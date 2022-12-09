import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DefaultNavbarComponent from "./DefaultNavbar/DefaultNavbarComponent";


const DefaultDashboardComponent = () => {
  const[songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    fetch("/api/v1/songs",{
      headers: {
        "Content-Type": "application/json",
      },
      method: "get",
    }).then((res) => {
      if (res.status === 200) return res.json();
    }).then((data) => {
      setSongs(data._embedded.songDTOList);
    }
    );
  },[])

function redirectDetails(song){
  navigate("/song-details",{
    state:{
      song: song
    }
  })
}


if(songs){
  return (
    <div>
      <DefaultNavbarComponent />
      <Table className="songsTable" striped bordered hover variant="dark">
        <tbody>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Release date</th>
            <th>Has explicit content</th>
            <th>Singers</th>
            <th>Categories</th>
            <th>Play</th>
          </tr>
          {
            songs.map((song,index) => 
              <tr key={index}>
                <td>
                  <a href="" onClick={() => redirectDetails(song)}>
                    <img className="songImage" src={process.env.PUBLIC_URL + '/musicAssets/' + song.iconFile} alt="icon"/>
                  </a>
                </td>
                <td>{song.name}</td>
                <td>{song.releaseDate}</td>
                <td>{(song.explicitContent)?"Yes":"No"}</td>
                <td>{song.categories.toString()}</td>
                <td>{song.performers.toString()}</td>
                <td>
                <audio controls>
                    <source src={process.env.PUBLIC_URL + '/musicAssets/' + song.audioFile} type="audio/mpeg" />
                  Your browser does not support the audio element.
                  </audio>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  );
}else{
  return (
    <div>Loading...</div>
  )
}
  
};

export default DefaultDashboardComponent;
