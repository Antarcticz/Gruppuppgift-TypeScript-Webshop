import React, { useEffect } from 'react';
import './Header.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useUserAuth } from '../../context/AuthContext';

const RedditHeader: React.FC = () => {
  const { user, logOut, googleSignIn } = useUserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
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
          {user ? (
            <>
              
              <button type="button" className="btn btn-secondary mr-1" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-primary mr-1" onClick={handleGoogleSignIn}>
              Sign in with Google
            </button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default RedditHeader;
