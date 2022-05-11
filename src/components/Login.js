import { useState } from "react";
import "../App.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [userCreated, setUserCreated] = useState(null);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(null);
  const [displaynameErrorMessage, setDisplaynameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);

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
      const res = await axios.post(
        "http://localhost:8000/users/register",
        formData
      );
      console.log(res);
      if (res.status === 201) {
        setUserCreated(true);
      }
    } catch (e) {
      setUserCreated(false);
      setDisplaynameErrorMessage(e.response.data.display_name);
      setUsernameErrorMessage(e.response.data.username);
      setEmailErrorMessage(e.response.data.email);
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
        <input
          type="radio"
          name="is_artist"
          value="False"
          onChange={onChange}
        />
        <label htmlFor="is_artist"> is_artist </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Login;
