//@ts-nocheck
import { Navbar,Popover, Container, Nav, NavDropdown, OverlayTrigger, Form, FormControl, Button, Col, Image, Row, DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Logo from '../assets/croppedLogo.png';
import LogoAlt1 from '../assets/logo/logo_alt_1.png';
import Profile from '../assets/default-avatar.jpeg';
import CircleLogoAlt1 from '../assets/logo/circleLogo_alt_1.png';
import { useState, useEffect } from 'react';
import ApiService from '../ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../state/actions/actionCreators'

export default function Navigation() {
   const dispatch = useDispatch();
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

  const popover = (
    <Popover id="popover-basic">
      <Button variant="outline-success" onClick={() => dispatch(logout())}>Logout</Button>
    </Popover>
  );

  return (
    <>
      {/* <Navbar
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
      </Navbar> */}


{/* navbar_color_option: #778d81 */}
      {/* NEW */}
      <Navbar bg="light" expand="lg" >
        <Container fluid  style={{ justifyContent: 'space-between'}}>
          <Navbar.Brand onClick={()=>history.push("/")}>
            <Col xs={6} md={4}>
              <Image  src={Logo}  
                style={{ marginLeft: '20px' }}
                alt=""
                src={CircleLogoAlt1}
                width="50"
                width="50"
                className="d-inline-block align-top"
                roundedCircle
              />
            </Col>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '250px' }}
              navbarScroll
              as="ul"
            >
              <Nav.Item as="li">
                <Nav.Link onClick={() => history.push('/buy')}>
                  <strong>Buy</strong>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link onClick={() => history.push('/sell')}>
                  <strong>Sell</strong>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link onClick={() => history.push('/payments')}>
                  <strong>Payments</strong>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link onClick={() => history.push('/messages')}>
                  <strong>Messages</strong>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link onClick={() => history.push('/transactions')}>
                  <strong>Transactions</strong>
                </Nav.Link>
              </Nav.Item>
              {/* <NavDropdown title="Dropdown" id="nav-dropdown">
                    <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
                  </NavDropdown> */}
            </Nav>
            <div class="user-detail right" style={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px'}}>
                <div class="details" style={{ display: 'flex',  flexDirection:'column', paddingRight: '10px'}}>
                      <span style={{ color:'rgba(0,0,0,.55)' }} >
                          Hello,&nbsp;<strong>{myState.data.username}</strong>
                      </span>
                  <span style={{ color:'rgba(0,0,0,.55)' }} >
                    Balance:&nbsp;€&nbsp;<strong>{balance}</strong>
                    </span>
                </div>
                <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                  <Image 
                      width="50"
                      src={Profile}
                      alt="Logout"
                      roundedCircle
                  />
                   
                </OverlayTrigger>
              </div>
           </Navbar.Collapse>
              {/* <Col >
                <Navbar.Text>
                  Hello,  {myState.data.username.slice(5)}
                </Navbar.Text>
                <br/>
                <Navbar.Text>
                  <strong>Balance</strong>:  {balance}
                </Navbar.Text>
              </Col>
              <Col xs={6} md={4} style={{ marginRight: '20px' }}>
                <Image 
                className="d-inline-block align-top"
                  width="50"
                  width="50" 
                  src={LogoAlt1} 
                  roundedCircle 
                  />
              </Col> */}

              
         
        </Container>
      </Navbar>

    </>
  );
}

{/* <div style={{display: 'flex', flexDirection:'column', border: '0px'}}>
              <p style={{fontSize: '12px'}}>Hello, UserX</p>
              <p style={{fontSize: '10px'}}>Balance: 5€</p>
            </div> 
<Navbar.Toggle style={{border: '0'}} onClick={() => history.push('/messages')}> Logout </Navbar.Toggle>  */}