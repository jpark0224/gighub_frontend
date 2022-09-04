import "../../App.css";
import { Link } from "react-router-dom";
import { Stack, Form, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config.js";
import moment from "moment";

const Comment = ({ contents, created_by, created_at, liked_user }) => {
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
      <Container className="singleCommentContainer">
        <Stack direction="vertical" gap={1}>
          <Stack direction="horizontal" gap={2}>
            <img
              src="https://images.nightcafe.studio//assets/profile.png?tr=w-640,c-at_max"
              alt="user_profile_picture"
              className="createCommentProfilePicture"
            />
            <Stack direction="horizontal" gap={2} className="comment">
              <div className="commentDisplayName">
                {created_by.display_name}
              </div>
              {/* {created_by.profile_picture} */}
              {contents}
              {/* {liked_user} */}
            </Stack>
          </Stack>
          <Stack direction="horizontal">
            <img
              className="commentLikeIcon"
              src={likeImage}
              onClick={changeImage}
            ></img>
            <button className="replyButton dot">Reply</button>
            <div className="created_at dot">{convertTime(created_at)}</div>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Comment;