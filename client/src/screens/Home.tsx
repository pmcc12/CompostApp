import React from 'react';
import { Container, Button, Stack, Row, Col, Image } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';
import BackgroundImg from '../assets/backgroundHome.jpg'

type Props = {
  authorization: boolean;
};

const Home: React.FC<Props> = ({ authorization }) => {
  let history = useHistory();

  const myState = useSelector((state: myReducersTypeof) => state.login);

  if (!authorization) {
    return <Redirect to="login" />;
  }

  return (
    <>
      <Navigation />

      <Container style={{margin: '0px', padding: '0px'}}>
        <div>
          <Row style={{width:'100vw',height:'80vh', margin:'0px'}}>
            <Image
              src={BackgroundImg}
              style={{padding: '0px'}}
              className="img-fluid"
              alt="..."
            />
          </Row>
          <Row style={{ padding: '10px' }}>
            <Col lg={12}>
              <Stack gap={4}>
                <Button
                  variant="1"
                  size="lg"
                  onClick={() => history.push('/buy')}
                >
                  BUY
                </Button>
                <Button
                  variant="2"
                  size="lg"
                  onClick={() => history.push('/sell')}
                >
                  SELL
                </Button>
                <Button
                  variant="3"
                  size="lg"
                  onClick={() => history.push('/payments')}
                >
                  PAYMENTS
                </Button>
                <Button
                  variant="4"
                  size="lg"
                  onClick={() => history.push('/messages')}
                >
                  MESSAGES
                </Button>
                <Button
                  variant="5"
                  size="lg"
                  onClick={() => history.push('/transactions')}
                >
                  TRANSACTIONS
                </Button>
              </Stack>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Home;
