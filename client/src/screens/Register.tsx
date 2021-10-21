import React from 'react';
import '../css/Register.css'
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  Spinner,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import { useState } from 'react';
import { register } from '../state/actions/actionCreators';
import { useHistory } from 'react-router-dom';
import MyMap from '../components/Map';
import { Icoordinates } from '../state/actions';
import EntryImage from '../assets/backgroundLogin_Register.jpg';

export const Register = () => {
  let history = useHistory();
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: '',
    location: {
      availability: false,
      error: false,
      //default location set to: Faro,Portugal
      latitude: 37.016774457030294,
      longitude: -7.930970191955566,
    },
  });

  /* My location handler */
  if (!form.location.availability && !form.location.error) {
    navigator.geolocation.getCurrentPosition(
      (location: any) => {
        setForm((prevForm) => ({
          ...prevForm,
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            availability: true,
            error: false,
          },
        }));
      },
      (error: any) => {
        setForm((prevState) => ({
          ...prevState,
          error: true,
        }));
      }
    );
  }

  const myState = useSelector((state: myReducersTypeof) => state.login);

  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('here in submit');
    console.log(form);
    await dispatch(register(form));
    /* we need to access our user login in order to save the JWT Token in localStorage()*/
    history.push('/login');
  };

  const handleCurrentLocationMap = (userSelectedLocation: Icoordinates) => {
    console.log('handleCurrent called!');
    console.log(userSelectedLocation);
    setForm((prevForm) => ({
      ...prevForm,
      location: {
        latitude: userSelectedLocation.latitude,
        longitude: userSelectedLocation.longitude,
        availability: form.location.availability,
        error: false,
      },
    }));
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('here');
    console.log(event.currentTarget.value);
    const buffer = event.currentTarget.value;
    setForm((prev) => ({
      ...prev,
      email: buffer,
    }));
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('here');
    console.log(event.currentTarget.value);
    const buffer = event.currentTarget.value;
    setForm((prevCred) => ({
      ...prevCred,
      password: buffer,
    }));
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('here');
    console.log(event.currentTarget.value);
    const buffer = event.currentTarget.value;
    setForm((prevCred) => ({
      ...prevCred,
      username: buffer,
    }));
  };

  return (
    <div className="screen-wrapper">
      {form.location.availability ? (
        <Container fluid className="main-container">

          <Row className="image-container">
           <Image
             src={EntryImage}
             className="img-fluid"
             alt="..."
           />
         </Row>
        <div className="form-wrapperR">
          <div className="form-container">

              <Form
                onSubmit={(event) =>
                  handleSubmit(event as React.FormEvent<HTMLFormElement>)
                }
              >
                      <h2>Register Screen</h2>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          onChange={(event) =>
                            handleEmail(event as React.ChangeEvent<HTMLInputElement>)
                          }
                        />
                      </Form.Group>
      
                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          onChange={(event) =>
                            handlePassword(
                              event as React.ChangeEvent<HTMLInputElement>
                            )
                          }
                        />
                      </Form.Group>
                    </Row>
      
                    <Form.Group className="mb-3" controlId="formGridAddress1">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        placeholder="HandsomeJoe1954"
                        onChange={(event) =>
                          handleUsername(event as React.ChangeEvent<HTMLInputElement>)
                        }
                      />
                    </Form.Group>
      
                    {/* <MyMap latitude={form.location.latitude} longitude={form.location.longitude} availability={form.location.availability} error={form.location.error}/> */}
                    {/* <MyMap location={form.location}/> */}
                      <MyMap
                        location={{
                          availability: form.location.availability,
                          error: form.location.error,
                          latitude: form.location.latitude,
                          longitude: form.location.longitude,
                        }}
                        locationUpdater={handleCurrentLocationMap}
                        inRegister={true}
                        inDetailsOrSell={false}
                        inBuy={false}
                        inDetail={false}
                        inSell={false}
                      />
      
                    <div className="d-grid gap-2">
                      <Button className="btn-submit" variant="primary" type="submit">
                        Register
                      </Button>
                    </div>
                </Form>
            </div>
        </div>
        </Container>
        ) : (
          <Container className="vh-100 d-flex flex-column ">
            <Row className="h-50"></Row>
            <Row>
              <Col xs={6} md={4}></Col>
              <Col xs={6} md={4}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </Col>
              <Col xs={6} md={4}></Col>
            </Row>
          </Container>
        )}
    </div>
  );
};

// return (
//   <div className="screen-wrapper" style={{  backgroundColor: '#282c34'}}>
//     {form.location.availability ? (
//       <Container fluid className="main-container" style={{margin:'0px', padding:'0px', position:'relative'}}>

//         <Row className="image-container" style={{width:'100vw',height:'100vh', margin:'0px',  position:'relative'}}>
//          <Image
//            src={EntryImage}
//            style={{padding: '0px', objectFit: 'cover', width: "100%", height: "100%"}}
//            className="img-fluid"
//            alt="..."
//          />
//        </Row>
//       <div className="form-wrapper" style={{width:'100%',position:'absolute',top:'5vh',display:'flex', justifyContent:'center'}}>
//         <div className="form-container" style={{backgroundColor:'#FFFFFF', borderRadius: '10px', margin:'10px', padding:'20px'}}>

//             <Form
//               onSubmit={(event) =>
//                 handleSubmit(event as React.FormEvent<HTMLFormElement>)
//               }
//             >
//                     <h2 style={{textAlign:'center'}}>Register Screen</h2>
//                   <Row className="mb-3">
//                     <Form.Group as={Col} controlId="formGridEmail">
//                       <Form.Label>Email</Form.Label>
//                       <Form.Control
//                         type="email"
//                         placeholder="Enter email"
//                         onChange={(event) =>
//                           handleEmail(event as React.ChangeEvent<HTMLInputElement>)
//                         }
//                       />
//                     </Form.Group>
    
//                     <Form.Group as={Col} controlId="formGridPassword">
//                       <Form.Label>Password</Form.Label>
//                       <Form.Control
//                         type="password"
//                         placeholder="Password"
//                         onChange={(event) =>
//                           handlePassword(
//                             event as React.ChangeEvent<HTMLInputElement>
//                           )
//                         }
//                       />
//                     </Form.Group>
//                   </Row>
    
//                   <Form.Group className="mb-3" controlId="formGridAddress1">
//                     <Form.Label>Username</Form.Label>
//                     <Form.Control
//                       placeholder="HandsomeJoe1954"
//                       onChange={(event) =>
//                         handleUsername(event as React.ChangeEvent<HTMLInputElement>)
//                       }
//                     />
//                   </Form.Group>
    
//                   {/* <MyMap latitude={form.location.latitude} longitude={form.location.longitude} availability={form.location.availability} error={form.location.error}/> */}
//                   {/* <MyMap location={form.location}/> */}
//                     <MyMap
//                       location={{
//                         availability: form.location.availability,
//                         error: form.location.error,
//                         latitude: form.location.latitude,
//                         longitude: form.location.longitude,
//                       }}
//                       locationUpdater={handleCurrentLocationMap}
//                       inRegister={true}
//                       inDetailsOrSell={false}
//                       inBuy={false}
//                       inDetail={false}
//                       inSell={false}
//                     />
    
//                   <div className="d-grid gap-2">
//                     <Button className="btn-submit" style={{marginTop:'10px'}} variant="primary" type="submit">
//                       Register
//                     </Button>
//                   </div>
//               </Form>
//           </div>
//       </div>
//       </Container>
//       ) : (
//         <Container className="vh-100 d-flex flex-column ">
//           <Row className="h-50"></Row>
//           <Row>
//             <Col xs={6} md={4}></Col>
//             <Col xs={6} md={4}>
//               <Spinner animation="border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </Spinner>
//             </Col>
//             <Col xs={6} md={4}></Col>
//           </Row>
//         </Container>
//       )}
//   </div>
// );
