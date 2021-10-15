import React from 'react';
import { Container, Button, Stack, Row, Col, Image } from 'react-bootstrap';
import Navigation from '../components/Navigation';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { myReducersTypeof } from '../state/reducers';

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

      <style type="text/css">
        {`

		.btn-1 {
			background-color: #9ab1a3;
      color: white;
		}

		.btn-2 {
			background-color: #b1bdc9
		}

		.btn-3 {
			background-color: #fed971
		}

		.btn-4 {
			background-color: #a97351
		}

		.btn-5 {
			background-color: #cb1515
		}

    .btn-lg {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
      </style>

      <Container>
        <div className="row justify-content-center mt-5">
          <Row className="row justify-content-center mt-5">
            <Image
              src="https://media.istockphoto.com/photos/get-sowing-get-growing-picture-id889031338?s=612x612"
              className="img-fluid"
              alt="..."
            />
          </Row>
          <h1>My user id: {myState.data.username}</h1>
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
