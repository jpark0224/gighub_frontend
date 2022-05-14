import "../../App.css";
import { Link } from "react-router-dom";
import { Stack, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config.js";
import moment from "moment";
import Comment from "./Comment.js";

const Post = ({ created_by, created_at, contents, picture, id }) => {
  const [likeImage, setLikeImage] = useState(
    "https://www.svgrepo.com/show/220662/like.svg"
  );
  const [likeClicked, setLikeClicked] = useState(false);

  function convertTime(created_at) {
    var str = created_at;
    var date = moment(str);
    var dateComponent = date.utc().format("YYYY-MM-DD");
    var timeComponent = date.utc().format("HH:mm:ss");
    return `${dateComponent} ${timeComponent}`;
  }

  function changeImage() {
    if (likeClicked == false) {
      setLikeClicked(true);
      setLikeImage("https://www.svgrepo.com/show/221146/like.svg");
    } else {
      setLikeClicked(false);
      setLikeImage("https://www.svgrepo.com/show/220662/like.svg");
    }
  }

  return (
    <>
      <div className="post">
        <Stack>
          <div className="postInfo">
            <Stack direction="horizontal" gap={3}>
              <img
                src="https://images.nightcafe.studio//assets/profile.png?tr=w-640,c-at_max"
                alt="user_profile_picture"
                className="createPostProfilePicture"
              />
              <div>{created_by}</div>
            </Stack>
            <Form.Text className="text-muted">
              {convertTime(created_at)}
            </Form.Text>
          </div>
          <hr />
          <div className="postContents">
            <p>{picture}</p>
            <p>{contents}</p>
          </div>
          <hr />

          <div className="likes">
            <img
              className="likeIcon"
              src={likeImage}
              onClick={changeImage}
            ></img>
          </div>
          <hr />
          <div className="commentForm">
            <Comment id={id} />
          </div>
        </Stack>
      </div>
    </>
  );
};

export default Post;
