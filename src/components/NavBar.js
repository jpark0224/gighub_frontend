import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config.js";

//https://react-bootstrap.netlify.app/components/navbar/
function NavBar({ accessToken, setAccessToken }) {
  // const [storageToken,updateStorageToken] = useState(localStorage.token)
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get(`${API_URL}/groups/`).then((res) => setGroupData(res.data));
    console.log(groupData);
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

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
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                {groupData.map((element, i) => (
                  <NavDropdown.Item key={element.name}>
                    {element.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>

            <Nav>
              {accessToken ? (
                <>
                  <NavDropdown title="Profile">
                    <NavDropdown.Item
                      onClick={() => {
                        // navigate("/users/myprofile/changePassword");
                      }}
                    >
                      Change Password
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        localStorage.removeItem("access");
                        setAccessToken(localStorage.access);
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
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
