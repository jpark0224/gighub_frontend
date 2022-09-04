import "../../App.css";
import { Link } from "react-router-dom";
import { Form, Button, Stack } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config.js";
import Post from "./Post.js";
import jwt_decode from "jwt-decode";

const Comment = ({ id }) => {
  // posts
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get(`${API_URL}/posts/`).then((res) => setPostData(res.data));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  // create a post
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  // const [accessToken, setAccessToken] = useState(localStorage.access);

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({
      ...formData,
      post: {
        id: `${id}`,
      },
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
      const res = await axios.post(`${API_URL}/comments/`, formData, {
        headers: headers,
      });
      console.log(res);
      if (res.status === 201) {
        // update posts data
        setPostData(postData);
      }
    } catch (e) {
      if (e.response.status === 403) {
        setErrorMessage("Please log in to comment.");
      }
      console.log(e);
    }
  };

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      <Form className="commentForm" onSubmit={onSubmit}>
        <Stack direction="horizontal" gap={3}>
          <Form.Group
            className="md-3 createPostForm"
            controlId="exampleForm.ControlTextarea1"
          >
            <Stack direction="horizontal" gap={3}>
              <Form.Label>
                <img
                  src="https://images.nightcafe.studio//assets/profile.png?tr=w-640,c-at_max"
                  alt="user_profile_picture"
                  className="createPostProfilePicture"
                />
              </Form.Label>
              <Form.Control
                placeholder="Leave a comment"
                as="textarea"
                rows={1}
                onChange={onChange}
                name="contents"
              />
            </Stack>
          </Form.Group>
          <Button variant="outline-dark" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </>
  );
};

export default Comment;
