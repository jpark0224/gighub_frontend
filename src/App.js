import { useState } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

const Home = () => {
  return (
    <>
      <h1>App</h1>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </>
  );
};

export default App;
