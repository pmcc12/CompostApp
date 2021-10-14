import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {useHistory} from 'react-router-dom'

export default function Navigation() {

  let history = useHistory();

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
        <Navbar.Brand onClick={() => history.push('/')}>
          <h1>I-COMPOSTER</h1>
        </Navbar.Brand>
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link onClick={()=>history.push("/buy")}>Buy</Nav.Link>
              <Nav.Link onClick={()=>history.push("/sell")}>Sell</Nav.Link>
              <Nav.Link onClick={()=>history.push("/payments")}>Payments</Nav.Link>
              <Nav.Link onClick={()=>history.push("/messages")}>Messages</Nav.Link>
              <Nav.Link onClick={()=>history.push("/details/1")}>Details(Transactions)</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
