import "../App.css";
import { Link } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config.js";

const Home = () => {
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get(`${API_URL}/groups/`).then((res) => setGroupData(res.data));
    console.log(groupData);
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div className="verticalCenter">
      <Container className="bandCardsContainer">
        <Row xs={2} md={3} lg={4} className="g-4">
          {groupData.map((group) => (
            <Col lg={true} key={group.name}>
              <Link to={`/groups/${group.id}`}>
                <Card style={{ width: "15rem" }}>
                  <Card.Img
                    className="cardImage"
                    variant="top"
                    src={`${group.profile_picture}`}
                  />
                  <Card.Body>
                    <Card.Title className="cardGroupName">
                      {group.name}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
