import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

export default function Nav() {
  return (
    <>
      <>
        <style type="text/css">
          {`
.color-nav {
	background-color: '#eb4343'
}
    `}
        </style>
      </>
      <div>
        <Navbar
          className="color-nav"
          // style={{ paddingBottom: '40px' }}
          style={{ backgroundColor: '#e3f2fd', paddingBottom: '40px' }}
          expand="lg"
        >
          I-COMPOSTER
        </Navbar>
      </div>
    </>
  );
}
