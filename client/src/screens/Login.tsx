import React from 'react';
// import '../css/Login.css'
import { Form, Button, Container, Row, Col, Stack, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import EntryImage from '../assets/backgroundLogin_Register.jpg';
import { login } from '../state/actions/actionCreators';

export const Login = () => {
  let history = useHistory();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  /* Define  */

  const myState = useSelector((state: myReducersTypeof) => state.login);

  if (myState.auth) {
    history.push('/');
  }

  const registerState = useSelector(
    (state: myReducersTypeof) => state.register
  );

  const dispatch = useDispatch();

  /* call to state to get the updated state */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('here in submit');
    console.log(credentials);
    await dispatch(login(credentials));
    if(myState.auth){
      history.push("/");
    }
  };

  //event: any ?
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('here');
    console.log(event.currentTarget.value);
    const buffer = event.currentTarget.value;
    setCredentials((prev) => ({
      ...prev,
      email: buffer,
    }));
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('here');
    console.log(event.currentTarget.value);
    const buffer = event.currentTarget.value;
    setCredentials((prevCred) => ({
      ...prevCred,
      password: buffer,
    }));
  };
  // const Form: React.FC<FormProps>= ({ children, handleFormSubmit }) => (
  //     <form onSubmit={handleFormSubmit}>{children}</form>)

  return (
    <div className="screen">
      <Container fluid className="main-container">
      <Row className="bg-wrapper">
            <Image
              src={EntryImage}
              className="img-fluid"
              alt="..."
            />
        </Row>
        <div className="login-wrapper">
          
          <div className="form-wrapper">
              <h5>Please enter your user credentials</h5>
            <Form
              onSubmit={(event) =>
                handleSubmit(event as React.FormEvent<HTMLFormElement>)
              }
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(event) =>
                    handleEmail(event as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(event) =>
                    handlePassword(event as React.ChangeEvent<HTMLInputElement>)
                  }
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>
              <span>Don't have a account yet? <a href="/register">Register Here</a></span>
              {/* </Col> */}
            </Form>
          </div>

          <div className="message-wrapper">
            <h2>Your Journey start here...</h2>
            <p>Join the first ECOmmerce platform</p>
            <p>And contribute for a more sustainable society</p>
          </div>
        </div>
      </Container>
    </div>
  );
};
// return (
//   <div className="screen" style={{  backgroundColor: '#282c34'}}>
//     <Container fluid className="main-container" style={{margin:'0px', padding:'0px', position:'relative'}}>
//     <Row className="bg-wrapper" style={{width:'100vw',height:'100vh', margin:'0px',  position:'relative'}}>
//           <Image
//             src={EntryImage}
//             style={{padding: '0px', objectFit: 'cover', width: "100%", height: "100%", opacity:'0.4'}}
//             className="img-fluid"
//             alt="..."
//           />
//       </Row>
//       <div className="login-wrapper" style={{position:'absolute',top:'20vh',display:'flex', flexDirection:'row'}}>
        
//         <div className="form-wrapper" style={{backgroundColor:'#FFFFFF', borderRadius: '10px', width:'400px',marginLeft:'100px',marginRight:'100px', padding:'20px'}}>
//             <h5 style={{textAlign:'center'}}>Please enter your user credentials</h5>
//           <Form
//             onSubmit={(event) =>
//               handleSubmit(event as React.FormEvent<HTMLFormElement>)
//             }
//           >
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>Email address</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Enter email"
//                 onChange={(event) =>
//                   handleEmail(event as React.ChangeEvent<HTMLInputElement>)
//                 }
//               />
//               <Form.Text className="text-muted">
//                 We'll never share your email with anyone else.
//               </Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Password"
//                 onChange={(event) =>
//                   handlePassword(event as React.ChangeEvent<HTMLInputElement>)
//                 }
//               />
//             </Form.Group>
//             <div className="d-grid gap-2">
//               <Button variant="primary" type="submit">
//                 Login
//               </Button>
//             </div>
//             <span>Don't have a account yet? <a href="/register">Register Here</a></span>
//             {/* </Col> */}
//           </Form>
//         </div>

//         <div className="message-wrapper" style={{marginTop:'100px', color: '#FFFFEF', fontFamily:'"Nunito",sans-serif', fontWeight: 'bold'}}>
//           <h2 style={{fontWeight:'bolder'}}>Your Journey start here...</h2>
//           <p style={{color:'#FFFFEF', marginBottom:'0px'}}>Join the first ECOmmerce platform</p>
//           <p>And contribute for a more sustainable society</p>
//         </div>
//       </div>
//     </Container>
//   </div>
// );