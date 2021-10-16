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
  Spinner,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import { useState, useEffect } from 'react';
import { login } from '../state/actions/actionCreators';
import { Redirect, useParams } from 'react-router-dom';
import MyMap from '../components/Map';
import Slider from '../components/Slider';
import Navigation from '../components/Navigation';
import ApiService from '../ApiService';
import {
  IuserProducts,
  sellerContent,
  sellerData,
} from '../state/actions/index';

type Props = {
  authorization: boolean;
};

type detailsParams = {
  userId: string;
};

export const Details: React.FC<Props> = ({ authorization }) => {
  /* Will be important to access the user session data (which will be stored in login variable), such as location, picture, etc.. */
  const [loading, setLoading] = useState(true);
  const [buttonPushed, setButtonPushed] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const [myData, setMyData] = useState<sellerContent[]>([]);
  const [offerIndex, setofferIndex] = useState(0);
  // if(!authorization){
  //   console.log('not authorized!')
  //   return <Redirect to="login"/>
  // }
  const myState = useSelector((state: myReducersTypeof) => state.login);
  const { userId } = useParams<detailsParams>();

  useEffect(() => {
    console.log('inside useeffect');
    /* setLoading to true will cause a re-render only once and if loading === false  */
    setLoading(true);
    console.log('my userid:');
    console.log(+userId);
    /* after updating state, useeffect will be called again. dataFetched ensures that we don't enter in a infinite loop of fetching and seting data. acts like a locker */
    if (!dataFetched) {
      ApiService.getOwnUserOffers(+userId)
        .then((data: any) => setMyData(data))
        .then(() => {
          setLoading(false);
        });
      setDataFetched(true);
    }
  }, []);

  console.log('AUTHORIZED IN SELL!');

  /* call to state to get the updated state */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('here in submit');
    // console.log(credentials);
    // dispatch(login(credentials))
  };

  return (
    <>
      {loading ? (
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
      ) : (
        <>
          <Navigation />
          <Container>
            <Row>
              <Col xs={0} md={1} lg={2}></Col>
              <Col xs={12} md={10} lg={8}>
                <Stack gap={2} className="col-md-4 mx-auto">
                  <h1>Details Screen</h1>
                  <h2>
                    {' '}
                    {myData[offerIndex]
                      ? myData[offerIndex].seller.username
                      : 'John Doe'}
                  </h2>{' '}
                  have {myData.length} offers available
                </Stack>

                <Slider
                  setOfferByIndex={setofferIndex}
                  offerAmount={myData.length}
                />

                <h1>Title: {myData[offerIndex].title}</h1>

                <h2>
                  Description: <span>{myData[offerIndex].desc}</span>
                </h2>

                <h2>
                  Price: {myData[offerIndex].retailPrice} € (
                  {myData[offerIndex].negotiable ? 'Non-' : null}Negotiable)
                </h2>

                <h2>
                  Quantity available: {myData[offerIndex].availableQuantity}
                </h2>

                <br />
                <br />

                <MyMap
                  location={{
                    availability: true,
                    error: false,
                    latitude: myData[offerIndex].seller.location.latitude,
                    longitude: myData[offerIndex].seller.location.longitude,
                  }}
                  inRegister={false}
                  inDetailsOrSell={true}
                  inBuy={false}
                  inDetail={true}
                  inSell={false}
                  username={myData[offerIndex].seller.username}
                  productTitle={myData[offerIndex].title}
                />

                <Button variant="primary" type="submit">
                  Make Order
                </Button>
                <Button variant="primary" type="submit">
                  Text Message
                </Button>
              </Col>
              <Col xs={0} md={1} lg={2}></Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};
