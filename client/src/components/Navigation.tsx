//@ts-nocheck
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Logo from '../assets/croppedLogo.png';
import { useState, useEffect } from 'react';
import ApiService from '../ApiService';
import { useSelector } from 'react-redux';

export default function Navigation() {
  let history = useHistory();
  const [balance, setBalance] = useState();

  const myState = useSelector((state: myReducersTypeof) => state.login);
  const loggedInUser = myState.data.userId;

  useEffect(() => {
    ApiService.getBalance(loggedInUser).then((data) => {
      console.log('data inside fetchBalanceFromDb ', data);
      setBalance(data.balance);
    });
  }, []);

  if (balance) {
    console.log('balance is ', balance);
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="md"
        style={{ backgroundColor: '#c8e8c7' }}
      >
        <div style={{ display: 'flex' }}>
          <Navbar.Brand
            style={{ cursor: 'pointer' }}
            onClick={() => history.push('/')}
          >
            <img
              style={{ marginLeft: '20px' }}
              alt=""
              src={Logo}
              width="100"
              height="100"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </div>
        <div style={{ display: 'flex', marginRight: '20px' }}>
          <Navbar.Toggle
            style={{ border: '0' }}
            onClick={() => history.push('/messages')}
          >
            {' '}
            <i
              style={{ fontSize: '30px' }}
              className="bi bi-chat"
            ></i> Messages{' '}
          </Navbar.Toggle>
          <Navbar.Toggle
            style={{ marginLeft: '20px', border: '0' }}
            aria-controls="responsive-navbar-nav"
          />
          {/* <div style={{display: 'flex', flexDirection:'column', border: '0px'}}>
              <p style={{fontSize: '12px'}}>Hello, UserX</p>
              <p style={{fontSize: '10px'}}>Balance: 5€</p>
            </div> */}
          {/* <Navbar.Toggle style={{border: '0'}} onClick={() => history.push('/messages')}> Logout </Navbar.Toggle> */}
        </div>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => history.push('/buy')}>
              <h4>Buy</h4>
            </Nav.Link>
            <Nav.Link onClick={() => history.push('/sell')}>
              <h4>Sell</h4>
            </Nav.Link>
            <Nav.Link onClick={() => history.push('/payments')}>
              <h4>Payments</h4>
            </Nav.Link>
            <Nav.Link onClick={() => history.push('/messages')}>
              <h4>Messages</h4>
            </Nav.Link>
            <Nav.Link onClick={() => history.push('/transactions')}>
              <h4>Transactions</h4>
            </Nav.Link>
            <h1>Balance:{balance}</h1>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
