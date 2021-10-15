import React from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Stack,
  FloatingLabel,
  InputGroup,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import { useState } from 'react';
import { login } from '../state/actions/actionCreators';
import { Redirect, useHistory } from 'react-router-dom';
import MyMap from '../components/Map';
import Navigation from '../components/Navigation';
import ApiService from '../ApiService';
// Image Form
import ImgUpload from '../components/ImgUpload';

type Props = {
  authorization: boolean;
};

export const Sell: React.FC<Props> = ({authorization}) => {
  // START
   const [selectedFiles, setSelectedFiles] = useState([])
  // END
  let history = useHistory();
  
  const [userOffer, setUserOffer] = useState({
    userId: 0,
    title: '',
    images: '',
    desc: '',
    retailPrice: 0,
    negotiable: false,
    availableQuantity: 0,
    readyDate: '',
    categoryId: 0,
  });

  const myState = useSelector((state: myReducersTypeof) => state.login);

  console.log('on sell');
  console.log(myState);

  /* Will be important to access the user session data (which will be stored in login variable), such as the location which will be displayed */

  if (!myState.auth) {
    console.log('not authorized!');
    console.log(
      'authorization: ' +
        authorization +
        ' and my user name: ' +
        myState.data.username +
        ' and my user auth: ' +
        myState.auth
    );
    return <Redirect to="login" />;
  }

  /* call to state to get the updated state */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('here in submit');
    console.log(userOffer);
    const status = await ApiService.submitUserOffer({...userOffer, userId: myState.data.userId, images: selectedFiles[0]});
    if(status){
      history.push("/");
    }
    // dispatch(login(credentials))
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('here in title');
    console.log(event.currentTarget.value);
    const buffer = event.currentTarget.value;
    setUserOffer((prevCred) => ({
      ...prevCred,
      title: buffer,
    }));
  };

  const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('here in images');
    console.log(event.currentTarget.value);
    console.log(typeof event.currentTarget.value);
    const buffer = event.currentTarget.value;
    setUserOffer((prevCred) => ({
      ...prevCred,
      images: buffer,
    }));
  };

  const handleDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('here in description');
    console.log(event.currentTarget.value);
    const buffer = event.currentTarget.value;
    setUserOffer((prevCred) => ({
      ...prevCred,
      desc: buffer,
    }));
  };

  const handleRetailPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('here in retail price');
    console.log(+event.currentTarget.value);
    console.log(typeof +event.currentTarget.value);
    const buffer = event.currentTarget.value;
    setUserOffer((prevCred) => ({
      ...prevCred,
      retailPrice: +buffer,
    }));
  };

  const handleNegotiable = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log('here in negotiable');
    console.log(event.currentTarget.value);
    const buffer = event.currentTarget.value;
    setUserOffer((prevCred) => ({
      ...prevCred,
      negotiable: !prevCred.negotiable,
    }));
  };

  const handleAvailableQuantity = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log('here in availably quantity');
    console.log(event.currentTarget.value);
    const buffer = event.currentTarget.value;
    setUserOffer((prevCred) => ({
      ...prevCred,
      availableQuantity: +buffer,
    }));
  };

  const handleSIunit = (event: React.FormEvent<HTMLSelectElement>) => {
    console.log('here in SI unit');
    console.log(event.currentTarget.value);
    const buffer = event.currentTarget.value;
    let word = '';
    switch (event.currentTarget.value) {
      case '1':
        word = 'Kg';
        break;

      case '2':
        word = 'Unit';
        break;

      case '3':
        word = 'Liters';
        break;

      default:
        break;
    }

    console.log('my si: ' + word);
  };

  const handleReadyDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('here in ready date');
    console.log(event.currentTarget.value);
    console.log(typeof event.currentTarget.value);
    const buffer = event.currentTarget.value;
    setUserOffer((prevCred) => ({
      ...prevCred,
      readyDate: buffer,
    }));
  };

  const handleCategory = (event: React.FormEvent<HTMLSelectElement>) => {
    console.log('here in category');
    console.log(event.currentTarget.value);
    const buffer = event.currentTarget.value;
    setUserOffer((prevCred) => ({
      ...prevCred,
      categoryId: +buffer,
    }));
  };

  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Col xs={0} md={1} lg={2}></Col>
          <Col xs={12} md={10} lg={8}>
            <Stack gap={2} className="col-md-4 mx-auto">
              <h1>Sell Screen</h1>
            </Stack>
            <Form
              onSubmit={(event) =>
                handleSubmit(event as React.FormEvent<HTMLFormElement>)
              }
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Offer Tittle</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  onChange={(event) =>
                    handleTitle(event as React.ChangeEvent<HTMLInputElement>)
                  }
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(event) =>
                    handleCategory(event as React.FormEvent<HTMLSelectElement>)
                  }
                >
                  <option>Please Select the Product Category</option>
                  <option value="1">Juice Fertilizer</option>
                  <option value="2">Soil Fertilizers</option>
                  <option value="3">Vermicompost</option>
                  <option value="4">Activators for Compost</option>
                  <option value="5">Worms</option>
                  <option value="6">Brown Material</option>
                  <option value="7">Compost Case</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e: any) =>
                    setSelectedFiles(e.target.files)
                    // handleImages(event as React.ChangeEvent<HTMLInputElement>)
                  }
                />
              </Form.Group>
              {/* <ImgUpload />  */}
              <Form.Group controlId="formFile" className="mb-3">
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Product Description"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    onChange={(event) =>
                      handleDescription(
                        event as React.ChangeEvent<HTMLInputElement>
                      )
                    }
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <InputGroup className="mb-3">
                  <InputGroup.Text>€</InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Price per Unit"
                    onChange={(event) =>
                      handleRetailPrice(
                        event as React.ChangeEvent<HTMLInputElement>
                      )
                    }
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Negotiable"
                  onClick={(event) =>
                    handleNegotiable(
                      event as React.MouseEvent<HTMLInputElement>
                    )
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Row className="g-2">
                  <Col xs={10} md={10} lg={10}>
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Quantity"
                    >
                      <Form.Control
                        type="number"
                        placeholder="1 liter"
                        onChange={(event) =>
                          handleAvailableQuantity(
                            event as React.ChangeEvent<HTMLInputElement>
                          )
                        }
                      />
                    </FloatingLabel>
                  </Col>
                  <Col xs={2} md={2} lg={2}>
                    <FloatingLabel controlId="floatingSelectGrid" label="SI">
                      <Form.Select
                        aria-label="Floating label select example"
                        onChange={(event) =>
                          handleSIunit(
                            event as React.FormEvent<HTMLSelectElement>
                          )
                        }
                      >
                        <option value="1">Kg</option>
                        <option value="2">Unit</option>
                        <option value="3">Liters</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ready for Pickup</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={new Date().toISOString().slice(0, 16)}
                  min={new Date().toISOString().slice(0, 16)}
                  placeholder="Availability"
                  onChange={(event) =>
                    handleReadyDate(
                      event as React.ChangeEvent<HTMLInputElement>
                    )
                  }
                />
              </Form.Group>

              <MyMap
                location={{
                  availability: true,
                  error: false,
                  latitude: myState.data.location.latitude,
                  longitude: myState.data.location.longitude,
                }}
                inRegister={false}
                inDetailsOrSell={true}
                inBuy={false}
                inDetail={false}
              />

              <Button variant="primary" type="submit">
                Load my offer
              </Button>
            </Form>
          </Col>
          <Col xs={0} md={1} lg={2}></Col>
        </Row>
      </Container>
    </>
  );
};

//                         <Button variant="primary" type="submit">
//                             Submit
//                         </Button>
//                     </Form>
//                 </Col>
//                 <Col xs={0} md={1} lg={2}></Col>
//             </Row>
//         </Container>
//     )
// }

//37.0245632 ; -7.9265792

/*
id="datetime-local"
        label="Next appointment"
        type="datetime-local"
*/
