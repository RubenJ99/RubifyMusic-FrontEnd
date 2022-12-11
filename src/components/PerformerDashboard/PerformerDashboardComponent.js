import jwtDecode from "jwt-decode";
import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../../utils/useLocalStorage";
import PerformerNavbarComponent from "./PerformerNavbar/PerformerNavbarComponent";

const PerformerDashboardComponent = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const decJwt = jwtDecode(jwt);
    fetch(`/api/v1/songs/performer/${decJwt.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authoritzation: jwt,
      },
      method: "get",
    })
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data) =>
        data ? setSongs(data._embedded.songDTOList) : setSongs([])
      );
  }, []);

  const deleteSong = (id) => {
    fetch(`/api/v1/songs/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authoritzation: jwt,
      },
      method: "delete",
    }).then((res) => {
      if (res.status === 200) window.location.reload(false);
    });
  };

  const moveToEdit = (song) => {
    navigate("/song-edit", {
      state: {
        song: song,
      },
    });
  };

  return (
    <div>
      <PerformerNavbarComponent />
      <Table className="songsTable" striped bordered hover variant="dark">
        <tbody>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Release date</th>
            <th>Has explicit content</th>
            <th>Categories</th>
          </tr>
          {songs.map((song, index) => (
            <tr key={index}>
              <td>
                <img
                  className="songImage"
                  src={process.env.PUBLIC_URL + "/musicAssets/" + song.iconFile}
                  alt="icon"
                />
              </td>
              <td>{song.name}</td>
              <td>{song.releaseDate}</td>
              <td>{song.explicitContent ? "Yes" : "No"}</td>
              <td>{song.categories.toString()}</td>
              <td>
                <MDBBtn
                  className="mb-0 px-5 bg-primary"
                  size="lg"
                  onClick={() => moveToEdit(song)}
                >
                  Edit
                </MDBBtn>
              </td>
              <td>
                <MDBBtn
                  className="mb-0 px-5 bg-danger"
                  size="lg"
                  onClick={() => deleteSong(song.id)}
                >
                  Delete
                </MDBBtn>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PerformerDashboardComponent;
