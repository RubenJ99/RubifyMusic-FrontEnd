import jwtDecode from 'jwt-decode';
import { MDBBtn } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useLocalState } from '../../utils/useLocalStorage';
import DefaultNavbarComponent from '../DefaultDashboard/DefaultNavbar/DefaultNavbarComponent';

const LikedSongs = () => {
    const [jwt,setJwt] = useLocalState("","jwt");
    const [likedSongs, setLikedSongs] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const decJwt = jwtDecode(jwt);
        fetch(`/api/v1/songs/likedSongs/${decJwt.id}`,{
            headers: {
                "Content-Type": "application/json",
                "Authoritzation" : jwt
              },
              method: "get"
        }).then((res) => {
            if(res.status === 200) return res.json()
        }).then((data) => {
            setLikedSongs(data._embedded.songDTOList);
        })
    },[]);

    function redirectDetails(song) {
        navigate("/song-details", {
          state: {
            song: song,
          },
        });
    }
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
              {likedSongs.map((song, index) => (
                <tr key={index}>
                  <td>
                    <a href="" onClick={() => redirectDetails(song)}>
                      <img
                        className="songImage"
                        src={
                          process.env.PUBLIC_URL + "/musicAssets/" + song.iconFile
                        }
                        alt="icon"
                      />
                    </a>
                  </td>
                  <td>{song.name}</td>
                  <td>{song.releaseDate}</td>
                  <td>{song.explicitContent ? "Yes" : "No"}</td>
                  <td>{song.categories.toString()}</td>
                  <td>{song.performers.toString()}</td>
                  <td>
                    <audio controls>
                      <source
                        src={
                          process.env.PUBLIC_URL +
                          "/musicAssets/" +
                          song.audioFile
                        }
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
    );
};
export default LikedSongs;