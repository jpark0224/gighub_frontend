import { useState } from "react";
import "../../App.css";
import "../../styles/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [userCreated, setUserCreated] = useState(null);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(null);
  const [displaynameErrorMessage, setDisplaynameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);

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
      const res = await axios.post(`${API_URL}/users/register`, formData);
      console.log(res);
      if (res.status === 201) {
        setUserCreated(true);
        setDisplaynameErrorMessage(null);
        setUsernameErrorMessage(null);
        setEmailErrorMessage(null);
        setPasswordErrorMessage(null);
        navigate("/users/login");
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
    <Container fluid className="registerContainer">
      {userCreated && <div>User Created</div>}
      {userCreated === false && <div>User registration unsuccessful</div>}
      <Row className="registerRow ">
        <Col className="registerLeft">Left</Col>
        <Col>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3 formGroup">
              <Form.Label>Username</Form.Label>
              <input
                className="formControl"
                type="text"
                placeholder="Username"
                name="username"
                onChange={onChange}
              />
              {usernameErrorMessage && <div>{usernameErrorMessage}</div>}
            </Form.Group>
            <Form.Group className="mb-3 formGroup">
              <Form.Label>Display name</Form.Label>

              <input
                className="formControl"
                type="text"
                placeholder="Display name"
                name="display_name"
                onChange={onChange}
              />
              {displaynameErrorMessage && <div>{displaynameErrorMessage}</div>}
            </Form.Group>
            <Form.Group className="mb-3 formGroup">
              <Form.Label>Password</Form.Label>

              <input
                className="formControl passwordForm"
                type="password"
                placeholder="********"
                name="password"
                onChange={onChange}
              />
              <input
                className="formControl"
                type="password"
                placeholder="********"
                name="password_repeat"
                onChange={onChange}
              />
              {passwordErrorMessage && <div>{passwordErrorMessage}</div>}
            </Form.Group>

            <Form.Group className="mb-3 formGroup">
              <Form.Label>Email</Form.Label>

              <input
                className="formControl"
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChange}
              />
              {emailErrorMessage && <div>{emailErrorMessage}</div>}
            </Form.Group>

            <Form.Group className="mb-3 formGroup">
              <Form.Label>Profile picture</Form.Label>

              <input
                className="formControl"
                type="url"
                placeholder="Profile picture"
                name="profile_picture"
                value=""
                onChange={onChange}
              />
            </Form.Group>

            <div className="formButtonContainer">
              <Button type="submit" variant="outline-dark">
                Register
              </Button>
              <a className="signInLink" href="/login">
                I am already a member
              </a>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
