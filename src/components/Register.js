import { useState } from "react";
import "../App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { API_URL } from "../config";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [userCreated, setUserCreated] = useState(null);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(null);
  const [displaynameErrorMessage, setDisplaynameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

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
      const res = await axios.post(`${API_URL}/users/register`, formData);
      console.log(res);
      if (res.status === 201) {
        setUserCreated(true);
        setDisplaynameErrorMessage(null);
        setUsernameErrorMessage(null);
        setEmailErrorMessage(null);
        setPasswordErrorMessage(null);
      }
    } catch (e) {
      setUserCreated(false);
      setDisplaynameErrorMessage(e.response.data.display_name);
      setUsernameErrorMessage(e.response.data.username);
      setEmailErrorMessage(e.response.data.email);
      setPasswordErrorMessage(e.response.data.password);
    }
  };

  return (
    <div className="App">
      <h1>Register</h1>
      {userCreated && <div>User Created</div>}
      {userCreated === false && <div>User registration unsuccessful</div>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          onChange={onChange}
        />
        {usernameErrorMessage && <div>{usernameErrorMessage}</div>}
        <input
          type="text"
          placeholder="Display name"
          name="display_name"
          onChange={onChange}
        />
        {displaynameErrorMessage && <div>{displaynameErrorMessage}</div>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Repeat Password"
          name="password_repeat"
          onChange={onChange}
        />
        {passwordErrorMessage && <div>{passwordErrorMessage}</div>}
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={onChange}
        />
        {emailErrorMessage && <div>{emailErrorMessage}</div>}
        <input
          type="url"
          placeholder="Profile picture"
          name="profile_picture"
          value=""
          onChange={onChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
