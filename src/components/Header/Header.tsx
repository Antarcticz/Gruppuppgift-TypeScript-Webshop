import React, { useEffect, useState } from "react";
import "./Header.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { auth } from "../../firebase/config";

const RedditHeader: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setIsLoggedIn(false);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar id="navbar" bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Fortunate Forum</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home / Threads</Nav.Link>
            <Nav.Link href="/ask">Ask Question</Nav.Link>
          </Nav>
          {isLoggedIn ? (
            <Button
              variant="info"
              className="btn btn-secondary mr-1"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="primary"
              className="btn btn-secondary mr-1"
              href="/signIn"
            >
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default RedditHeader;
