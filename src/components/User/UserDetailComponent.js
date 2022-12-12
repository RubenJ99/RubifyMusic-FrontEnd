import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AdminNavbarComponent from "../AdminDashboard/AdminNavbar/AdminNavbarComponent";
import DefaultNavbarComponent from "../DefaultDashboard/DefaultNavbar/DefaultNavbarComponent";
import PerformerNavbarComponent from "../PerformerDashboard/PerformerNavbar/PerformerNavbarComponent";

const UserDetail = () => {
  const location = useLocation();
    const [user,setUser] = useState("");

    useEffect(()=>{
        setUser(location.state.user);
    },[])
  return (
    <div>
        {
            (user.authority === "ROLE_DEFAULT")?(<DefaultNavbarComponent />)
            :(user.authority === "ROLE_PERFORMER")?(<PerformerNavbarComponent />):
            (<AdminNavbarComponent />)
        }
      <Table className="userDet" striped bordered hover variant="dark">
        <tbody>
            <tr>
                <td><img src={"data:image/jpeg;base64," + user.profilePicture} height="30" alt="user icon" loading="lazy" /></td>
            </tr>
            <tr>
                <td>{user.name}</td>
            </tr>
            <tr>
                <td>{user.surname}</td>
            </tr>
            <tr>
                <td>{user.email}</td>
            </tr>
            {
                (user.iban)?( <tr>
                    <td>{user.iban}</td>
                </tr>):""
           
            }
        </tbody>
      </Table>
    </div>
  );
};

export default UserDetail;
