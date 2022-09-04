import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Register from "./components/users/Register";
import Login from "./components/users/Login";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Group from "./components/groups/Group";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "./config";

function App() {
  const [accessToken, setAccessToken] = useState(localStorage.access);

  return (
    <>
      <NavBar accessToken={accessToken} setAccessToken={setAccessToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/groups/:groupID" element={<Group />} />
      </Routes>
    </>
  );
}

export default App;
