import React, {useEffect, useState} from 'react';
import './UserLoginComponent.css';
import axios from "axios";


export default function UserLogin(){
   function sendLogInRequest(){
        console.log("im working!");
    }
    return(
            <div id="logForm">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" />
                </div>
                <div>
                    <button id="submit" type="button" onClick={() => sendLogInRequest()}> Log in </button>
                </div>
            </div>);
}