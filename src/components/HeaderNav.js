import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function HeaderNav() {
  return (
    <header>
      <Navbar bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src="./earth.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Where In The World
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}

export default HeaderNav;