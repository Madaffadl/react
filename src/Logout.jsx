import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    navigate("/login");
  }, [navigate, setIsLoggedIn]);

  return <div>Logging out...</div>;
};

export default Logout;
