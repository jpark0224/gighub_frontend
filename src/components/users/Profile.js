import { useState, useEffect } from "react";
import "../../App.css";
import "../../styles/Register.css";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Profile = ({ accessToken, setAccessToken, setRefreshToken }) => {
  const [formData, setFormData] = useState({});
  const [profileUpdated, setProfileUpdated] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(null);
  const [displayName, setDisplayName] = useState(null);

  let id = parseInt(localStorage.getItem("userID"));
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.access}`,
  };

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios
      .get(`${API_URL}/users/${id}`, {
        headers: headers,
      })
      .then((res) => {
        setUserData(res.data);
        setProfilePicturePreview(res.data.profile_picture);
        setDisplayName(res.data.display_name);
      });
  }, []);

  // const navigate = useNavigate();

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
      const res = await axios.put(
        `${API_URL}/users/profile/${id}`,
        getFormData(formData),
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.access}`,
          },
        }
      );
      console.log(res);
      if (res.status === 201) {
        setProfileUpdated(true);
      }
    } catch (e) {
      setProfileUpdated(false);
    }
  };

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
          {profileUpdated && <div>Profile Updated</div>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3 formGroup">
              <Form.Label>Display name</Form.Label>
              <input
                className="formControl"
                type="text"
                placeholder="Display name"
                name="display_name"
                onChange={onChange}
                // value={displayName ? displayName : ""}
              />
            </Form.Group>

            <Form.Group
              controlId="formFileSm"
              className="mb-3 profilePictureContainer"
            >
              <Form.Label>Profile picture</Form.Label>
              <div className="profilePictureInnerContainer">
                <img
                  src={
                    profilePicturePreview
                      ? profilePicturePreview
                      : "https://i.stack.imgur.com/MnyxU.gif"
                  }
                  className="profilePicture"
                  alt="profile"
                />
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
              <Button variant="outline-secondary">
                <a href="/">Cancel</a>
              </Button>
              <Button type="submit" variant="outline-dark">
                Save
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
