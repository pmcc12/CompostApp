import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function Navigation() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="sm"
        style={{
          backgroundColor: '#dbc1a3',
          paddingBottom: '30px',
        }}
      >
        <Navbar.Brand href="./home">I-COMPOSTER</Navbar.Brand>
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="/buy">Buy</Nav.Link>
              <Nav.Link href="/sell">Sell</Nav.Link>
              <Nav.Link href="/payments">Payments</Nav.Link>
              <Nav.Link href="/messages">Messages</Nav.Link>
              <Nav.Link href="/transactions">Transactions</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
