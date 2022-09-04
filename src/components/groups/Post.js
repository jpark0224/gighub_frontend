import "../../App.css";
import { Link } from "react-router-dom";
import { Stack, Form, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config.js";
import moment from "moment";
import CommentForm from "./CommentForm.js";
import Comment from "./Comment.js";

const Post = ({
  created_by,
  created_at,
  contents,
  picture,
  id,
  comments_on_post,
}) => {
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

  console.log(comments_on_post);

  return (
    <>
      <div className="post">
        <Stack>
          <div className="postInfo">
            <Stack direction="horizontal" gap={2}>
              <img
                src="https://images.nightcafe.studio//assets/profile.png?tr=w-640,c-at_max"
                alt="user_profile_picture"
                className="createPostProfilePicture"
              />
              <div className="postDisplayName">{created_by.display_name}</div>
            </Stack>
            <div className="created_at">{convertTime(created_at)}</div>
          </div>
          <div className="postContents">
            <p>{picture}</p>
            <p>{contents}</p>
          </div>
          <div className="likesContainer">
            <img
              className="likeIcon"
              src={likeImage}
              onClick={changeImage}
            ></img>
          </div>
          <div>
            {comments_on_post.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>
          <Container className="commentFormContainer">
            <div className="commentForm">
              <CommentForm id={id} />
            </div>
          </Container>
        </Stack>
      </div>
    </>
  );
};

export default Post;
