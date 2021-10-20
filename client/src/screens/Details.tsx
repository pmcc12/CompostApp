//@ts-nocheck
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
import { login, newBalance } from '../state/actions/actionCreators';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import MyMap from '../components/Map';
import Slider from '../components/Slider';
import Navigation from '../components/Navigation';
import ApiService from '../ApiService';
import LoadingSpinner from '../components/Spinner';
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
  const [dataFetched, setDataFetched] = useState(false);
  const [myData, setMyData] = useState<sellerContent[]>([]);
  const [offerIndex, setofferIndex] = useState(0);

  const dispatch = useDispatch();

  // if(!authorization){
  //   console.log('not authorized!')
  //   return <Redirect to="login"/>
  // }
  let history = useHistory();
  const myState = useSelector((state: myReducersTypeof) => state.login);
  const myBalance = useSelector(
    (state: myReducersTypeof) => state.login.data.balance
  );

  const { userId } = useParams<detailsParams>();

  const loggedInUser = myState.data.userId;

  console.log('myState ', myState.data.userId);

  useEffect(() => {
    console.log('INSIDE USEEFFECT');
    /* setLoading to true will cause a re-render only once and if loading === false  */
    setLoading(true);
    // fetchBalanceFromDb();
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

  /* after updating state, useeffect will be called again. dataFetched ensures that we don't enter in a infinite loop of fetching and seting data. acts like a locker */

  const fetchBalanceFromDb = () => {
    console.log('fetchBalanceFromDb called');
    ApiService.getBalance(loggedInUser).then((data) => {
      console.log('data inside fetchBalanceFromDb ', data);
      dispatch(newBalance(data.balance));
    });
  };

  if (myData) {
    console.log('myData is ', myData);
  }

  const handleOrder = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buyerId = myState.data.userId;
    const orderQuantity = myData[offerIndex].availableQuantity;
    const productId = myData[offerIndex].productId;

    ApiService.putInCart(buyerId, productId, orderQuantity).then((data) => {
      ApiService.buyItem(buyerId, data.orderId).then((data) => {
        console.log('data returned from buyItem API call ', data);
        if (data.status === false) {
          history.push(`/topup/${myData[0].sellerId}`);
        } else if (data.orderResolved === true) {
          console.log('successful purchase');
          history.push('/success');
        }
      });
    });
  };

  // if (!myState.auth) {
  //   console.log('not authorized!');
  //   console.log(
  //     'authorization: ' +
  //       authorization +
  //       ' and my user name: ' +
  //       myState.data.username +
  //       ' and my user auth: ' +
  //       myState.auth
  //   );
  //   return <Redirect to="login" />;
  // }

  // console.log('Authorized inside details!');

  /* call to state to get the updated state */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('here in submit');
    // console.log(credentials);
    // dispatch(login(credentials))
  };

  const handlePrivateMessage = async () => {
    console.log('here in handlePrivateMessage');
    /* Need to verify if i already have already an open conversation */
    let chatArray = [];
    const getMyExistingChats = await ApiService.getAllInboxes(
      myState.data.userId
    ).then((data: any) => {
      chatArray = data.filter(
        (inboxChat) =>
          inboxChat.users[0].userId === +userId ||
          inboxChat.users[1].userId === +userId
      );
    });

    console.log(chatArray);
    /* if array is null, means the filter didn't found any matching element, and return an empty array */
    if (!chatArray.length) {
      /* No conversation was found, therefore we need to create a new one  */
      const myInboxRoomObject = await ApiService.postNewChatRoom({
        userId1: myState.data.userId,
        userId2: +userId,
      });
      history.push(`/messages/${myInboxRoomObject.inboxId}`);
    } else {
      /* there's an ongoing conversation */
      history.push(`/messages/${chatArray[0].inboxId}`);
    }
  };

  if (myData) {
  }

  return (
    <>
      {loading ? (
        LoadingSpinner
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
                <h2>User balance: {myBalance}</h2>

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

                <Button
                  variant="primary"
                  type="submit"
                  onClick={(event) => handleOrder(event)}
                >
                  Make Order
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => handlePrivateMessage()}
                >
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
