import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config.js";

//https://react-bootstrap.netlify.app/components/navbar/
function NavBar({ accessToken, setAccessToken, setUserID }) {
  // const [storageToken,updateStorageToken] = useState(localStorage.token)
  const [groupData, setGroupData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get(`${API_URL}/groups/`).then((res) => setGroupData(res.data));
    console.log(groupData);
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  useEffect(() => console.log("navbar rerendered"), [accessToken]);

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Gighub</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Bands" id="basic-nav-dropdown">
                {groupData.map((group) => (
                  <NavDropdown.Item
                    key={group.name}
                    onClick={() => {
                      navigate(`/groups/${group.id}`);
                    }}
                  >
                    {group.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>

            <Nav>
              {accessToken ? (
                <>
                  <LinkContainer to="/profile">
                    <Nav.Link>
                      <Button variant="outline-dark">Profile</Button>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <Nav.Link>
                      <Button
                        onClick={() => {
                          localStorage.removeItem("access");
                          setAccessToken(localStorage.access);
                          localStorage.removeItem("userID");
                          setUserID(localStorage.userID);
                        }}
                        variant="outline-dark"
                      >
                        Log Out
                      </Button>
                    </Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <Button variant="outline-dark">Sign Up</Button>
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/login">
                    <Nav.Link>
                      <Button variant="outline-dark">Sign In</Button>
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default NavBar;
