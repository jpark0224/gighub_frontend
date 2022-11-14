import { useState, useEffect } from "react";
import "../../App.css";
import "../../styles/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import signUpLeft from "../../assets/sign-up-left.png";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [userCreated, setUserCreated] = useState(null);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState(null);
  const [displaynameErrorMessage, setDisplaynameErrorMessage] = useState(null);
  const [emailErrorMessage, setEmailErrorMessage] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  const navigate = useNavigate();

  const onChange = (e) => {
    if (e.target.name === "profile_picture") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
    console.log({ ...formData });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const getFormData = (object) =>
      Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
      }, new FormData());
    try {
      const res = await axios.post(
        `${API_URL}/users/register`,
        getFormData(formData),
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      if (res.status === 201) {
        setUserCreated(true);
        setDisplaynameErrorMessage(null);
        setUsernameErrorMessage(null);
        setEmailErrorMessage(null);
        setPasswordErrorMessage(null);
        navigate("/login");
        console.log("registration successful");
      }
    } catch (e) {
      setUserCreated(false);
      setDisplaynameErrorMessage(e.response.data.display_name);
      setUsernameErrorMessage(e.response.data.username);
      setEmailErrorMessage(e.response.data.email);
      setPasswordErrorMessage(e.response.data.password);
    }
  };

  // fetch default profile picture and set preview
  useEffect(() => {
    axios
      .get(`${API_URL}/media/blank-profile-picture.jpeg`)
      .then(
        setProfilePicturePreview(`${API_URL}/media/blank-profile-picture.jpeg`)
      );
  }, []);

  // render profile picture preview on file change
  useEffect(() => {
    if (formData.profile_picture) {
      const objectUrl = URL.createObjectURL(formData.profile_picture);
      setProfilePicturePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [formData.profile_picture]);

  return (
    <Container fluid className="registerContainer">
      <Row className="registerRow ">
        <Col>
          {userCreated && <div>User Created</div>}
          {userCreated === false && <div>User registration unsuccessful</div>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3 formGroup">
              <Form.Label>Username *</Form.Label>
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
              <Form.Label>Display name *</Form.Label>

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
              <Form.Label>Email *</Form.Label>

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
              <Form.Label>Password *</Form.Label>

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

            <Form.Group
              controlId="formFileSm"
              className="mb-3 profilePictureContainer"
            >
              <Form.Label>Profile picture</Form.Label>
              <div className="profilePictureInnerContainer">
                <img
                  src={profilePicturePreview}
                  className="profilePicture"
                  alt="profile"
                ></img>
                <Form.Control
                  type="file"
                  size="sm"
                  className="formControl"
                  name="profile_picture"
                  onChange={onChange}
                  accept="image/png, image/jpeg"
                />
              </div>
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
