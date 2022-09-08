import "../../App.css";
import { Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Container,
  Form,
  Button,
  Stack,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config.js";
import Post from "./Post.js";
import jwt_decode from "jwt-decode";

const GroupFeed = ({ name, id }) => {
  // posts
  const [postData, setPostData] = useState([]);

  // create a post
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  // const [accessToken, setAccessToken] = useState(localStorage.access);

  const navigate = useNavigate();

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    loadPostData();
  }, [id]);

  const loadPostData = async () => {
    if (id) {
      axios
        .get(`${API_URL}/posts/?group=${id}`)
        .then((res) => setPostData(res.data));
    } else {
      setPostData([]);
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      group: {
        name: `${name}`,
      },
      picture: "",
      [e.target.name]: e.target.value,
    });
    console.log({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // let tokenData = localStorage.acesss;
    // setAccessToken(tokenData);

    console.log(localStorage.access);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.access}`,
    };

    console.log(headers);

    try {
      const res = await axios.post(`${API_URL}/posts/`, formData, {
        headers: headers,
      });
      console.log(res);
      // if (res.status === 201) {
      // update posts data
      // }
      loadPostData();
      console.log(postData.slice(0).reverse());
    } catch (e) {
      if (e.response.status === 403) {
        setErrorMessage("Please log in to post.");
      }
      console.log(e);
    }

    e.target.reset();
  };

  return (
    <Container className="groupFeedContainer">
      <Container className="createdPostContainer">
        {errorMessage && <div>{errorMessage}</div>}
        <Form className="createPost" onSubmit={onSubmit}>
          <Form.Group
            className="md-3 createPostForm"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>
              <Stack direction="horizontal" gap={3}>
                <img
                  src="https://images.nightcafe.studio//assets/profile.png?tr=w-640,c-at_max"
                  alt="user_profile_picture"
                  className="createPostProfilePicture"
                />
                Create a Post
              </Stack>
            </Form.Label>
            <Form.Control
              className="createPostFormField"
              placeholder="Share on Gighub..."
              as="textarea"
              rows={5}
              onChange={onChange}
              name="contents"
            />
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Control type="file" size="sm" />
          </Form.Group>
          <div className="buttonContainer">
            <Button variant="outline-dark" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>

      {/* posts */}
      <Container className="postsContainer">
        {postData.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </Container>
    </Container>
  );
};

export default GroupFeed;
