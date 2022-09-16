import { useState } from "react";
import "../../App.css";
import "../../styles/Register.css";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const Profile = ({ accessToken, setAccessToken, setRefreshToken }) => {
  const [formData, setFormData] = useState({});
  const [profileUpdated, setProfileUpdated] = useState(null);

  // const navigate = useNavigate();

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
        setProfileUpdated(true);
      }
    } catch (e) {
      setProfileUpdated(false);
    }
  };

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
              />
            </Form.Group>

            <Form.Group
              controlId="formFileSm"
              className="mb-3 profilePictureContainer"
            >
              <Form.Label>Profile picture</Form.Label>
              <div className="profilePictureInnerContainer">
                <img
                  src="https://picsum.photos/100/100"
                  className="profilePicture"
                  alt="profile"
                ></img>
                <Form.Control
                  type="file"
                  size="sm"
                  className="formControl"
                  name="profile_picture"
                  onChange={onChange}
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
