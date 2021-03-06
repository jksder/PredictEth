import React from "react";

import { Navbar, Nav } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">PredictEth</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/random-number">Random Numbers</Nav.Link>
          <Nav.Link href="/news">News Bets</Nav.Link>
          <Nav.Link href="/user-events">User Events</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
