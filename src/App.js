import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Profile from "./components/users/Profile";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Group from "./components/groups/Group";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "./config";

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.access);
  const [refreshToken, setRefreshToken] = useState(localStorage.refresh);
  const [userID, setUserID] = useState(localStorage.userID);

  return (
    <>
      <NavBar
        accessToken={accessToken}
        setAccessToken={setAccessToken}
        setUserID={setUserID}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login
              accessToken={accessToken}
              refreshToken={refreshToken}
              setAccessToken={setAccessToken}
              setRefreshToken={setRefreshToken}
              userID={userID}
              setUserID={setUserID}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              accessToken={accessToken}
              refreshToken={refreshToken}
              setAccessToken={setAccessToken}
              setRefreshToken={setRefreshToken}
              userID={userID}
              setUserID={setUserID}
            />
          }
        />
        <Route path="/groups/:groupID" element={<Group />} />
      </Routes>
    </>
  );
}

export default App;
