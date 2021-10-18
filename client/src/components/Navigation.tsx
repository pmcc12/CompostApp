import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Logo from '../assets/croppedLogo.png'

export default function Navigation() {
  let history = useHistory();

  return (
    <>
      <Navbar collapseOnSelect expand="xxl" style={{backgroundColor: '#c8e8c7'}}>
        <Navbar.Brand style={{cursor: 'pointer'}} onClick={() => history.push('/')}>
          <img
            style={{marginLeft:'20px'}}
            alt=""
            src={Logo}
            width="100"
            height="100"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <div style={{display:'flex', marginRight:'20px'}}>
          <Navbar.Toggle style={{border: '0'}} aria-controls="basic-navbar-nav"> <i style={{fontSize: "30px"}} className="bi bi-chat"></i> </Navbar.Toggle>
          <Navbar.Toggle style={{marginLeft:'20px', border: '0'}} aria-controls="responsive-navbar-nav" />
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
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
      // <Navbar
      //   collapseOnSelect
      //   expand="xxl"
      //   style={{
      //     backgroundColor: '#c8e8c7',
      //   }}
      // >
      //   <Navbar.Brand onClick={() => history.push('/')}>
      //     <div>
      //       <img alt="" src={Logo} style={{margin: '10px'}} className="d-inline-block align-top"/>
      //     </div>
      //   </Navbar.Brand>
      //   <Container>
      //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      //     <Navbar.Collapse id="responsive-navbar-nav">
      //       <Nav>
      //         <Nav.Link onClick={() => history.push('/buy')}>
      //           <h3>Buy</h3>
      //         </Nav.Link>
      //         <Nav.Link onClick={() => history.push('/sell')}>
      //           <h3>Sell</h3>
      //         </Nav.Link>
      //         <Nav.Link onClick={() => history.push('/payments')}>
      //           <h3>Payments</h3>
      //         </Nav.Link>
      //         <Nav.Link onClick={() => history.push('/messages')}>
      //           <h3>Messages</h3>
      //         </Nav.Link>
      //         <Nav.Link onClick={() => history.push('/transactions')}>
      //           <h3>Transactions</h3>
      //         </Nav.Link>
      //       </Nav>
      //     </Navbar.Collapse>
      //   </Container>
      // </Navbar>
