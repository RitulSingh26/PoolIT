
import React from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import { useUser } from "../UserContext";
import "./header.css"

const Headers = () => {
  const navigate = useNavigate();
  
  const {userData ,setUserData}= useUser();

  const logout = () => {
    if (userData.googleId){
    window.open("http://localhost:5000/logout", "_self");
    }
    else{
      setUserData({});
      navigate("/");
    }
  };
 

  return (
    <header>
      <nav>
        <div className="left">
          <h1>PoolIT</h1>
        </div>
        <div className="right">
          <ul>
            <li className="button">
              <NavLink to="/">Home</NavLink>
            </li>
            {userData && Object.keys(userData).length > 0 ? (
              <>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/upload">Upload</NavLink>
                </li>
                <li onClick={logout}>Logout</li>
                <li>
                  <img src={userData.image} style={{ width: "50px", borderRadius: "50%" }} alt="" />
                </li>
                <li style={{ color: "black", fontWeight: "bold" }}>{userData.name}</li>
              </>
            ) : (
              <>
              <li className="button">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li  className="button">
                <NavLink to="/signup">Signup</NavLink>
              </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Headers;
