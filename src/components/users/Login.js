import { useState } from "react";
import "../../App.css";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/token/`, formData);
      console.log(res);
      if (res.status === 200) {
        console.log(process.env.NODE_ENV);
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        setAccessToken(res.data.access);
        setRefreshToken(res.data.refresh);
        setUserLoggedIn(true);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
      setUserLoggedIn(false);
      if (e.response.data.username) {
        setUsernameErrorMessage(e.response.data.username);
      }
      if (e.response.data.password) {
        setPasswordErrorMessage(e.response.data.password);
      }
    }
  };

  return (
    <div className="App">
      <h1>Login</h1>
      {userLoggedIn && <div>User login successful</div>}
      {userLoggedIn === false && (
        <div>No account found with the given credentials.</div>
      )}
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>

          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            onChange={onChange}
          />
          {usernameErrorMessage && <div>{usernameErrorMessage}</div>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
          />
          {passwordErrorMessage && <div>{passwordErrorMessage}</div>}
        </Form.Group>

        <Button type="submit" variant="outline-dark">
          Log in
        </Button>
      </Form>
    </div>
  );
};

export default Login;
