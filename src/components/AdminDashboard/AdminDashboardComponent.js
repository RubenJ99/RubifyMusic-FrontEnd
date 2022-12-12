import { fixRequestBody } from "http-proxy-middleware";
import jwtDecode from "jwt-decode";
import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocalState } from "../../utils/useLocalStorage";
import AdminNavbarComponent from "./AdminNavbar/AdminNavbarComponent";

const AdminDashboardComponent = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [users, setUsers] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const decJwt = jwtDecode(jwt);
    fetch("/api/v1/users", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "get",
    })
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((data) => {
        data = data.filter((usr) => usr.id !== decJwt.id);
        setUsers(data);
      });
  }, []);

  const deleteUser = (id) =>{
    fetch(`/api/v1/users/${id}`,{
        headers: {
            "Content-Type": "application/json",
            "Authoritzation" : jwt
        },
        method: "delete",
    }).then(res => {if(res.status === 200) navigate("/dashboard")})
  }

  if(users){
    return (
        <div>
          <AdminNavbarComponent />
          <Table className="songsTable" striped bordered hover variant="dark">
            <tbody>
              <tr>
                <th>Profile picture</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Iban</th>
                <th>Rol</th>
              </tr>
              {users.map((user,index) => (
                <tr key={index}>
                  <td>
                    <img
                      height="70"
                      src={"data:image/jpeg;base64," + user.profilePicture}
                      alt="profpict"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.email}</td>
                  <td>{user.iban}</td>
                  <td>{user.authority.authority}</td>
                  <td>
                    {(user.authority.authority === 'ROLE_ADMIN')?
                    (<MDBBtn
                        disabled
                        className="mb-0 px-5 bg-danger"
                        size="lg"
                      >
                        Ban
                      </MDBBtn>):(<MDBBtn
                        
                        className="mb-0 px-5 bg-danger"
                        size="lg"
                        onClick={() => deleteUser(user.id)}
                      >
                        Ban
                      </MDBBtn>)}
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
  }
 
};

export default AdminDashboardComponent;
