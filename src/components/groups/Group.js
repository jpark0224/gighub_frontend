import GroupLeft from "./GroupLeft";
import GroupRight from "./GroupRight";
import GroupFeed from "./GroupFeed";

import "../../App.css";
import { Link } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config.js";

const Group = () => {
  const [groupData, setGroupData] = useState([]);
  const { groupID } = useParams();

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios
      .get(`${API_URL}/groups/${groupID}`)
      .then((res) => setGroupData(res.data));
  }, [groupID]);

  return (
    <>
      <Container className="feedContainer">
        <Row>
          <Col md="auto" className="groupLeftColumn">
            <GroupLeft {...groupData} />
          </Col>
          <Col md="auto">
            <GroupFeed {...groupData} />
          </Col>
          {/* <Col>
          <GroupRight {...groupData} />
        </Col> */}
        </Row>
      </Container>
      <footer></footer>
    </>
  );
};

export default Group;
