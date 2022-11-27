import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import filterFetch from "../services/fetchService";
import { useLocalState } from "./useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);

  if (jwt) {
    filterFetch(`/api/auth/validate?token=${jwt}`,"get",jwt)
      .then((valid) => {
       setIsValid(valid);
       setIsLoading(false);
      });
  } else {
    return <Navigate to="/login" />;
  }

  return isLoading ? (<div>Loading...</div>) : isValid === true ? (children) : (<Navigate to="/login" />);
};

export default PrivateRoute;
