import "../../App.css";
import { Link } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config.js";

const GroupLeft = ({ name, profile_picture }) => {
  return (
    <Container className="groupLeftContainer">
      {profile_picture ? (
        <img
          src={`${profile_picture}`}
          alt="profile_picture"
          className="bandProfilePicture"
        />
      ) : (
        <div className="spinnerContainer">
          <img
            className="spinner"
            src="https://i.stack.imgur.com/MnyxU.gif"
            alt="loading"
          />
        </div>
      )}

      <h3 className="bandName">{name}</h3>
      <p>Feed</p>
      <p>Band</p>
      <p>Media</p>
      <p>Members only</p>
    </Container>
  );
};

export default GroupLeft;
